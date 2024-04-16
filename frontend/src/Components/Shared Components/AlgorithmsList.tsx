/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { AlgorithmBase } from '../../Core/Abstractions/AlgorithmBase';
import { AppState } from '../../Redux/Store';
import { headerItemHovered } from '../../Resources/Colors';
import { algorithmContext, isTouchDevice } from '../../Core/Helpers/GeneralHelper';
import { IAlgorithmData } from '../../Core/Interfaces/IAlgorithmData';
import { algorithmsListComponentHeight } from '../../Resources/Constants';

interface AlgorithmListProps {
  data: IAlgorithmData[];
}

interface AlgorithmProps {
  algorithm: AlgorithmBase;
}

const AlgorithmComponent = ({ algorithm }: AlgorithmProps) => {
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
        color: ${algorithm.title === algorithmManager.selectedAlgorithm.title ? '' : 'white'};
        margin-right: 10px;
        opacity: ${animationState.hasAnimationStarted &&
        algorithm.title !== algorithmManager.selectedAlgorithm.title
          ? '0.5'
          : '1'};
        ${!isTouchDevice &&
        `
          cursor: ${
            animationState.hasAnimationStarted &&
            algorithm.title !== algorithmManager.selectedAlgorithm.title
              ? 'default'
              : 'pointer'
          };
          :hover {
            ${
              !animationState.hasAnimationStarted &&
              `
                color: ${
                  algorithm.title !== algorithmManager.selectedAlgorithm.title
                    ? `${headerItemHovered}`
                    : ''
                };
              `
            }
          }
        `}
      `}
      onClick={handleClick}
    >
      {algorithm.title}
    </div>
  );
};

export const AlgorithmsList = ({ data }: AlgorithmListProps) => {
  return (
    <div
      css={css`
        display: flex;
        min-height: ${algorithmsListComponentHeight}px;
        margin-left: 10px;
      `}
    >
      {data.map((dataItem, index) => (
        <AlgorithmComponent key={index} algorithm={dataItem.algorithm} />
      ))}
    </div>
  );
};
