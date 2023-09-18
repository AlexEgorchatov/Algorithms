/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppState } from '../Store/Store';
import { updateSliderValueStateAction } from '../Store/Shared/SliderComponentStateManagement';
import { animationContext } from '../Core/Helper';
import { updateIsAnimationRunningStateAction } from '../Store/Shared/AnimationStateManagement';

const PlayButton = () => {
  const { animationManager } = useContext(animationContext);

  return (
    <div
      css={css`
        box-sizing: border-box;
        position: relative;
        color: white;
        transform: scale(var(--ggs, 1));
        width: 12px;
        height: 16px;
        cursor: pointer;
        :hover {
          color: black;
        }
      `}
      onClick={() => animationManager.startAnimation}
    >
      <div
        css={css`
          content: '';
          display: block;
          box-sizing: border-box;
          position: absolute;
          width: 0;
          height: 10px;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 15px solid;
        `}
      ></div>
    </div>
  );
};

const PauseButton = () => {
  const dispatch = useDispatch();

  return (
    <div
      css={css`
        box-sizing: border-box;
        position: relative;
        transform: scale(var(--ggs, 1));
        width: 12px;
        height: 16px;
        border-left: 4px solid;
        border-right: 4px solid;
        color: white;

        cursor: pointer;
        :hover {
          color: black;
        }
      `}
      onClick={() => dispatch(updateIsAnimationRunningStateAction(false))}
    ></div>
  );
};

const StopButton = () => {
  const { animationManager } = useContext(animationContext);

  const algorithmState = useSelector((state: AppState) => state.animationState);

  return (
    <div
      css={css`
        box-sizing: border-box;
        position: relative;
        display: block;
        transform: scale(var(--ggs, 1));
        width: 16px;
        height: 16px;
        background: white;
        cursor: ${algorithmState.hasAnimationStarted ? 'pointer' : 'default'};
        opacity: ${algorithmState.hasAnimationStarted ? '1' : '0.5'};
        :hover {
          ${algorithmState.hasAnimationStarted &&
          `
            background: black;
          `}
        }
      `}
      onClick={() => animationManager.stopAnimation}
    ></div>
  );
};

const CompleteButton = () => {
  const { animationManager } = useContext(animationContext);
  const algorithmState = useSelector((state: AppState) => state.animationState);

  return (
    <div
      css={css`
        width: 15px;
        position: relative;
        display: flex;
        color: white;
        cursor: ${algorithmState.hasAnimationStarted ? 'pointer' : 'default'};
        opacity: ${algorithmState.hasAnimationStarted ? '1' : '0.5'};
        :hover {
          ${algorithmState.hasAnimationStarted &&
          `
            & > div {
              color: black;
            }
          `}
        }
      `}
      onClick={() => animationManager.completeAnimation}
    >
      <div
        css={css`
          content: '';
          display: block;
          box-sizing: border-box;
          position: absolute;
          width: 0;
          height: 15px;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 15px solid;
        `}
      />
      <div
        css={css`
          position: relative;
          width: 4px;
          height: 16px;
          background: currentColor;
          left: 15px;
        `}
      ></div>
    </div>
  );
};

const Slider = () => {
  const sliderState = useSelector((state: AppState) => state.sliderComponentState);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSliderChange = () => {
    if (inputRef.current == null) return;
    let inputValue: number = parseInt(inputRef.current.value);
    dispatch(updateSliderValueStateAction(inputValue));
  };

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        max-width: 190px;
        color: white;
        line-height: 100%;
        align-items: flex-end;
      `}
    >
      <input
        css={css`
          width: 155px;
          appearance: none;
          -webkit-appearance: none;
          height: 12px;
          ::-webkit-slider-thumb {
            appearance: none;
            -webkit-appearance: none;
            width: 25px;
            height: 12px;
            background: #333;
            cursor: pointer;
            :hover {
              background: black;
            }
          }
        `}
        ref={inputRef}
        type="range"
        min="1"
        max="5"
        step="1"
        value={sliderState.sliderValue}
        onChange={handleSliderChange}
      />
      <div
        css={css`
          cursor: default;
          margin-bottom: 1px;
        `}
      >
        <b>x{sliderState.sliderValue}</b>
      </div>
    </div>
  );
};

const SliderButtons = () => {
  const algorithmState = useSelector((state: AppState) => state.animationState);

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        max-width: 155px;
      `}
    >
      {algorithmState.isAnimationRunning ? <PauseButton /> : <PlayButton />}
      <StopButton />
      <CompleteButton />
    </div>
  );
};

export const SliderComponent = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 185px;
        padding-left: 20px;
        height: 45px;
      `}
    >
      <Slider />
      <SliderButtons />
    </div>
  );
};
