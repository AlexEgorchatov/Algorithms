/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { AlgorithmBase } from '../Core/Abstractions/AlgorithmBase';
import { AppState } from '../Store/Store';
import { headerItemHovered } from '../Resources/Colors';
import { algorithmContext } from '../Core/Helper';
import { IAlgorithmData } from '../Core/Interfaces/IAlgorithmData';

interface AlgorithmListProps {
  data: IAlgorithmData[];
}

interface AlgorithmProps {
  title: string;
  isSelected: boolean;
  algorithm: AlgorithmBase;
}

const AlgorithmComponent = ({ title, isSelected, algorithm }: AlgorithmProps) => {
  const { algorithmManager } = useContext(algorithmContext);
  const algorithmState = useSelector((state: AppState) => state.animationState);

  const handleClick = () => {
    if (algorithmState.hasAnimationStarted) return;
    if (algorithmManager.selectedAlgorithm === algorithm) return;

    algorithmManager.selectedAlgorithm = algorithm;
    algorithmManager.updateStoreSelectedAlgorithmName();
    if (!algorithmManager.isStateUpdated) {
      //If input was not changed, reset state and calculate the final state for selected algorithm
      algorithmManager.resetToInitialState();
      algorithmManager.selectedAlgorithm.setFinalState();
    }
  };

  return (
    <div
      css={css`
        font-size: 20px;
        color: ${isSelected ? '' : 'white'};
        margin-right: 10px;
        cursor: ${algorithmState.hasAnimationStarted && !isSelected ? 'default' : 'pointer'};
        opacity: ${algorithmState.hasAnimationStarted && !isSelected ? '0.5' : '1'};
        :hover {
          ${!algorithmState.hasAnimationStarted &&
          `
            color: ${!isSelected ? `${headerItemHovered}` : ''};
          `}
        }
      `}
      onClick={handleClick}
    >
      {title}
    </div>
  );
};

export const AlgorithmsList = ({ data }: AlgorithmListProps) => {
  const { algorithmManager } = useContext(algorithmContext);
  useSelector(algorithmManager.getStoreSelector); //This line is needed for selected algorithm UI update

  return (
    <div
      css={css`
        display: flex;
      `}
    >
      {data.map((dataItem, index) => (
        <AlgorithmComponent
          key={index}
          title={dataItem.title}
          isSelected={dataItem.algorithm.constructor.name === algorithmManager.selectedAlgorithm.constructor.name}
          algorithm={dataItem.algorithm}
        />
      ))}
    </div>
  );
};
