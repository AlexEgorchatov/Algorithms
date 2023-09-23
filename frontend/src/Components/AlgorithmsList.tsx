/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { AlgorithmBase } from '../Core/Abstractions/AlgorithmBase';
import { AppState, store } from '../Store/Store';
import { headerItemHovered } from '../Resources/Colors';
import { algorithmContext } from '../Core/Helper';
import { ModuleData } from '../Core/Interfaces/ModuleDataInterface';

interface AlgorithmListProps {
  data: ModuleData[];
}

interface AlgorithmProps {
  title: string;
  isSelected: boolean;
  algorithm: AlgorithmBase<any>;
}

const AlgorithmComponent = ({ title, isSelected, algorithm }: AlgorithmProps) => {
  const { algorithmManager } = useContext(algorithmContext);
  const algorithmState = useSelector((state: AppState) => state.animationState);

  const handleClick = () => {
    if (algorithmState.hasAnimationStarted) return;

    algorithmManager.selectedAlgorithm = algorithm;
    algorithmManager.updateStoreSelectedAlgorithmName();
    if (!algorithmManager.isStateUpdated) {
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
  useSelector(algorithmManager.getStoreSelector);

  return (
    <div
      css={css`
        display: flex;
      `}
    >
      {data.map((algorithm, index) => (
        <AlgorithmComponent
          key={index}
          title={algorithm.title}
          isSelected={algorithm.algorithm.constructor.name === store.getState().sortingPageState.selectedSortingAlgorithm}
          algorithm={algorithm.algorithm}
        />
      ))}
    </div>
  );
};
