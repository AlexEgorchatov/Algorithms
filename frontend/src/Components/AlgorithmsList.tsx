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
  algorithm: AlgorithmBase;
}

const AlgorithmComponent = ({ title, algorithm }: AlgorithmProps) => {
  const { algorithmManager } = useContext(algorithmContext);
  const animationState = useSelector((state: AppState) => state.animationState);

  const handleClick = () => {
    if (animationState.hasAnimationStarted) return;
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
        color: ${algorithm.constructor.name === algorithmManager.selectedAlgorithm.constructor.name
          ? ''
          : 'white'};
        margin-right: 10px;
        cursor: ${animationState.hasAnimationStarted &&
        algorithm.constructor.name !== algorithmManager.selectedAlgorithm.constructor.name
          ? 'default'
          : 'pointer'};
        opacity: ${animationState.hasAnimationStarted &&
        algorithm.constructor.name !== algorithmManager.selectedAlgorithm.constructor.name
          ? '0.5'
          : '1'};
        :hover {
          ${!animationState.hasAnimationStarted &&
          `
            color: ${
              algorithm.constructor.name !== algorithmManager.selectedAlgorithm.constructor.name
                ? `${headerItemHovered}`
                : ''
            };
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
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      {data.map((dataItem, index) => (
        <AlgorithmComponent key={index} title={dataItem.title} algorithm={dataItem.algorithm} />
      ))}
    </div>
  );
};
