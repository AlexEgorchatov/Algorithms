/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { headerItemHovered } from '../Resources/Colors';
import { Fragment, useContext } from 'react';
import { animationContext } from '../Core/Helper';
import { useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { useDispatch } from 'react-redux';
import { updateIsAnimationRunningStateAction } from '../Store/Shared/AnimationStateManagement';

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
        cursor: ${animationState.canAnimationBeStarted ? 'pointer' : 'default'};
        opacity: ${animationState.canAnimationBeStarted ? '1' : '0.5'};
        :hover {
          ${animationState.canAnimationBeStarted &&
          `
              color: ${headerItemHovered};
              & > div {
                background: ${headerItemHovered};
              }
            `}
        }
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
        cursor: pointer;
        :hover {
          color: ${headerItemHovered};
          & > div {
            color: ${headerItemHovered};
          }
        }
      `}
      onClick={() => dispatch(updateIsAnimationRunningStateAction(false))}
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
  const algorithmState = useSelector((state: AppState) => state.animationState);

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
        cursor: ${algorithmState.hasAnimationStarted ? 'pointer' : 'default'};
        opacity: ${algorithmState.hasAnimationStarted ? '1' : '0.5'};
        :hover {
          ${algorithmState.hasAnimationStarted &&
          `
              color: ${headerItemHovered};
              & > div {
                background: ${headerItemHovered};
              }
            `}
        }
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
  const algorithmState = useSelector((state: AppState) => state.animationState);

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
        cursor: ${algorithmState.hasAnimationStarted ? 'pointer' : 'default'};
        opacity: ${algorithmState.hasAnimationStarted ? '1' : '0.5'};
        :hover {
          ${algorithmState.hasAnimationStarted &&
          `
              color: ${headerItemHovered};
              & > div {
                color: ${headerItemHovered};
              }
            `}
        }
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
  const algorithmState = useSelector((state: AppState) => state.animationState);

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        width: 72px;
      `}
    >
      {algorithmState.isAnimationRunning ? <PauseButton /> : <PlayButton />}
      <StopButton />
      <CompleteButton />
    </div>
  );
};
