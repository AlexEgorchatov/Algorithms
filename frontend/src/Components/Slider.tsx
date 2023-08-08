/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { useDispatch } from 'react-redux';
import { updateHasAlgorithmStartedStateAction, updateIsAlgorithmRunningStateAction, updateSliderValueStateAction } from '../Store/Shared/SliderComponentStateManagement';
import { useContext, useRef } from 'react';
import { animationContext } from '../Resources/Helper';

const PlayButton = () => {
  const { startButtonClick } = useContext(animationContext);
  const sliderState = useSelector((state: AppState) => state.sliderComponentState);
  const dispatch = useDispatch();

  const handlePlayButtonClick = () => {
    dispatch(updateIsAlgorithmRunningStateAction(true));
    if (sliderState.hasAlgorithmStarted) return;

    dispatch(updateHasAlgorithmStartedStateAction(true));
    startButtonClick();
  };

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
      onClick={handlePlayButtonClick}
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
      onClick={() => dispatch(updateIsAlgorithmRunningStateAction(false))}
    ></div>
  );
};

const StopButton = () => {
  const { stopButtonClick } = useContext(animationContext);
  const sliderState = useSelector((state: AppState) => state.sliderComponentState);
  const dispatch = useDispatch();

  const handleStopButtonClick = () => {
    if (!sliderState.hasAlgorithmStarted) return;

    dispatch(updateHasAlgorithmStartedStateAction(false));
    dispatch(updateIsAlgorithmRunningStateAction(false));
    stopButtonClick();
  };

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
        cursor: ${sliderState.hasAlgorithmStarted ? 'pointer' : 'default'};
        opacity: ${sliderState.hasAlgorithmStarted ? '1' : '0.5'};
        :hover {
          ${sliderState.hasAlgorithmStarted &&
          `
            background: black;
          `}
        }
      `}
      onClick={handleStopButtonClick}
    ></div>
  );
};

const CompleteButton = () => {
  const { completeButtonClick } = useContext(animationContext);
  const sliderState = useSelector((state: AppState) => state.sliderComponentState);
  const dispatch = useDispatch();

  const handleCompleteButtonClick = () => {
    if (!sliderState.hasAlgorithmStarted) return;

    dispatch(updateHasAlgorithmStartedStateAction(false));
    dispatch(updateIsAlgorithmRunningStateAction(false));
    completeButtonClick();
  };

  return (
    <div
      css={css`
        width: 15px;
        position: relative;
        display: flex;
        color: white;
        cursor: ${sliderState.hasAlgorithmStarted ? 'pointer' : 'default'};
        opacity: ${sliderState.hasAlgorithmStarted ? '1' : '0.5'};
        :hover {
          ${sliderState.hasAlgorithmStarted &&
          `
            & > div {
              color: black;
            }
          `}
        }
      `}
      onClick={handleCompleteButtonClick}
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
        value={sliderState.initialSliderValue}
        onChange={handleSliderChange}
      />
      <div
        css={css`
          cursor: default;
          margin-bottom: 1px;
        `}
      >
        <b>x{sliderState.initialSliderValue}</b>
      </div>
    </div>
  );
};

const SliderButtons = () => {
  const sliderState = useSelector((state: AppState) => state.sliderComponentState);

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        max-width: 155px;
      `}
    >
      {sliderState.isAlgorithmRunning ? <PauseButton /> : <PlayButton />}
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
