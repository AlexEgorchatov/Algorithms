/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { useDispatch } from 'react-redux';
import { updatingPauseVisibilityStateAction, updatingSliderValueStateAction } from '../Store/Shared/SliderComponentStateManagement';
import { useRef } from 'react';

const StopButton = () => {
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
        cursor: pointer;
        :hover {
          background: black;
        }
      `}
    ></div>
  );
};

const PlayButton = () => {
  const sliderState = useSelector((state: AppState) => state.sliderComponentState);
  const dispatch = useDispatch();

  return (
    <div
      css={css`
        box-sizing: border-box;
        position: relative;
        display: ${sliderState.initialPauseVisible ? 'none' : 'block'};
        color: white;
        transform: scale(var(--ggs, 1));
        width: 15px;
        height: 16px;
        left: 3px;
        cursor: pointer;
        :hover {
          color: black;
        }
      `}
      onClick={() => dispatch(updatingPauseVisibilityStateAction(true))}
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
  const sliderState = useSelector((state: AppState) => state.sliderComponentState);
  const dispatch = useDispatch();

  return (
    <div
      css={css`
        box-sizing: border-box;
        position: relative;
        display: ${sliderState.initialPauseVisible ? 'block' : 'none'};
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
      onClick={() => dispatch(updatingPauseVisibilityStateAction(false))}
    ></div>
  );
};

const CompleteButton = () => {
  const subButtonStyle = css`
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 0;
    height: 15px;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 15px solid;
  `;

  return (
    <div
      css={css`
        transform: scale(var(--ggs, 1));
        width: 35px;
        display: flex;
        color: white;
        cursor: pointer;
        :hover {
          color: black;
        }
      `}
    >
      <div css={subButtonStyle} />
      <div css={subButtonStyle} style={{ left: '15px' }} />
      <div
        css={css`
          position: relative;
          width: 4px;
          height: 16px;
          background: currentColor;
          left: 30px;
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
    dispatch(updatingSliderValueStateAction(inputValue));
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
        max-width: 160px;
      `}
    >
      <StopButton />
      {sliderState.initialPauseVisible ? <PauseButton /> : <PlayButton />}
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
        padding: 15px 15px 15px 45px;
        height: 45px;
      `}
    >
      <Slider />
      <SliderButtons />
    </div>
  );
};
