/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { headerItemHovered } from '../../Resources/Colors';
import { useContext } from 'react';
import { animationContext, isTouchDevice } from '../../Core/Helper';
import { useSelector } from 'react-redux';
import { AppState } from '../../Redux/Store';
import { useDispatch } from 'react-redux';
import { updateIsAnimationRunningStateAction } from '../../Redux/Shared/AnimationStateManagement';

const PlayButton = () => {
  const { animationManager } = useContext(animationContext);
  const animationState = useSelector((state: AppState) => state.animationState);

  return (
    <div
      css={css`
        box-sizing: border-box;
        position: relative;
        display: flex;
        width: 22px;
        height: 22px;
        border: 2px solid;
        border-radius: 4px;
        color: white;
        opacity: ${animationState.canAnimationBeStarted && !animationState.isAnimationFinalizing
          ? '1'
          : '0.5'};
        ${!isTouchDevice &&
        `
          cursor: ${
            animationState.canAnimationBeStarted && !animationState.isAnimationFinalizing
              ? 'pointer'
              : 'default'
          };
          :hover {
            ${
              animationState.canAnimationBeStarted &&
              !animationState.isAnimationFinalizing &&
              `
                color: ${headerItemHovered};
                & > div {
                  background: ${headerItemHovered};
                }
              `
            }
          }
        `}

        ::before {
          content: '';
          display: block;
          box-sizing: border-box;
          position: absolute;
          width: 0;
          height: 10px;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 8px solid;
          top: 3px;
          left: 6px;
        }
      `}
      onClick={() => animationManager.startAnimation()}
    ></div>
  );
};

const PauseButton = () => {
  const dispatch = useDispatch();
  const animationState = useSelector((state: AppState) => state.animationState);

  const handlePauseButtonClick = () => {
    if (animationState.isAnimationFinalizing) return;

    dispatch(updateIsAnimationRunningStateAction(false));
  };

  return (
    <div
      css={css`
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
        position: relative;
        display: flex;
        width: 22px;
        height: 22px;
        border: 2px solid;
        border-radius: 4px;
        color: white;
        opacity: ${!animationState.isAnimationFinalizing ? '1' : '0.5'};
        ${!isTouchDevice &&
        `
          cursor: ${!animationState.isAnimationFinalizing ? 'pointer' : 'default'};
          :hover {
            ${
              !animationState.isAnimationFinalizing &&
              `
                color: ${headerItemHovered};
                & > div {
                  color: ${headerItemHovered};
                }
              `
            }
          }
        `}
      `}
      onClick={handlePauseButtonClick}
    >
      <div
        css={css`
          box-sizing: border-box;
          position: relative;
          transform: scale(var(--ggs, 1));
          width: 8px;
          height: 10px;
          border-left: 3px solid;
          border-right: 3px solid;
          color: white;
        `}
      ></div>
    </div>
  );
};

const StopButton = () => {
  const { animationManager } = useContext(animationContext);
  const animationState = useSelector((state: AppState) => state.animationState);

  return (
    <div
      css={css`
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
        position: relative;
        display: flex;
        width: 22px;
        height: 22px;
        border: 2px solid;
        border-radius: 4px;
        color: white;
        opacity: ${animationState.hasAnimationStarted && !animationState.isAnimationFinalizing
          ? '1'
          : '0.5'};
        ${!isTouchDevice &&
        `
          cursor: ${
            animationState.hasAnimationStarted && !animationState.isAnimationFinalizing
              ? 'pointer'
              : 'default'
          };
          :hover {
            ${
              animationState.hasAnimationStarted &&
              !animationState.isAnimationFinalizing &&
              `
                color: ${headerItemHovered};
                & > div {
                  background: ${headerItemHovered};
                }
              `
            }
          }
        `}
      `}
      onClick={() => animationManager.stopAnimation()}
    >
      <div
        css={css`
          box-sizing: border-box;
          position: relative;
          display: block;
          transform: scale(var(--ggs, 1));
          width: 8px;
          height: 8px;
          background: white;
        `}
      ></div>
    </div>
  );
};

const CompleteButton = () => {
  const { animationManager } = useContext(animationContext);
  const animationState = useSelector((state: AppState) => state.animationState);

  return (
    <div
      css={css`
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
        position: relative;
        display: flex;
        width: 22px;
        height: 22px;
        border: 2px solid;
        border-radius: 4px;
        color: white;
        opacity: ${animationState.hasAnimationStarted && !animationState.isAnimationFinalizing
          ? '1'
          : '0.5'};
        ${!isTouchDevice &&
        `
          cursor: ${
            animationState.hasAnimationStarted && !animationState.isAnimationFinalizing
              ? 'pointer'
              : 'default'
          };
          :hover {
            ${
              animationState.hasAnimationStarted &&
              !animationState.isAnimationFinalizing &&
              `
                color: ${headerItemHovered};
                & > div {
                  color: ${headerItemHovered};
                }
              `
            }
          }
        `}
      `}
      onClick={() => animationManager.completeAnimation()}
    >
      <div
        css={css`
          width: 10px;
          display: flex;
        `}
      >
        <div
          css={css`
            content: '';
            display: block;
            box-sizing: border-box;
            position: absolute;
            width: 0;
            height: 10px;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-left: 8px solid;
          `}
        />
        <div
          css={css`
            position: relative;
            width: 3px;
            height: 10px;
            background: currentColor;
            left: 8px;
          `}
        ></div>
      </div>
    </div>
  );
};

export const ActionBar = () => {
  const animationState = useSelector((state: AppState) => state.animationState);

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        width: 82px;
      `}
    >
      {animationState.isAnimationRunning ? <PauseButton /> : <PlayButton />}
      <StopButton />
      <CompleteButton />
    </div>
  );
};
