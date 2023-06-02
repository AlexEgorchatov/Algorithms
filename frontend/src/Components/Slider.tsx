/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const PlayButton = () => {
  return (
    <div
      css={css`
        box-sizing: border-box;
        position: relative;
        display: block;
        transform: scale(var(--ggs, 1));
        width: 15px;
        height: 25px;
      `}
    >
      {' '}
      <div
        css={css`
          content: '';
          display: block;
          box-sizing: border-box;
          position: absolute;
          width: 0;
          height: 15px;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-left: 15px solid;
        `}
      ></div>
    </div>
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
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 15px solid;
  `;

  return (
    <div
      css={css`
        transform: scale(var(--ggs, 1));
        width: 35px;
        display: flex;
      `}
    >
      <div css={subButtonStyle} />
      <div css={subButtonStyle} style={{ left: '15px' }} />
      <div
        css={css`
          position: relative;
          width: 5px;
          height: 20px;
          background: currentColor;
          left: 30px;
        `}
      ></div>
    </div>
  );
};

const ResetButton = () => {
  const subButtonStyle = css`
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 0;
    height: 15px;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 15px solid;
  `;

  return (
    <div
      css={css`
        transform: scale(var(--ggs, 1));
        width: 35px;
        display: flex;
      `}
    >
      <div
        css={css`
          position: relative;
          width: 5px;
          height: 20px;
          background: currentColor;
        `}
      ></div>
      <div css={subButtonStyle} style={{ right: '15px' }}></div>
      <div css={subButtonStyle} style={{ right: '0px' }}></div>
    </div>
  );
};

export const Slider = () => {
  let [sliderValue, setSliderValue] = React.useState<number>(1);

  const handleSliderChange = () => {
    let input = document.getElementById('inputId');
    setSliderValue(parseInt((input! as HTMLInputElement).value));
  };

  return (
    <div
      css={css`
        width: 250px;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          max-width: 160px;
          color: black;
          line-height: 100%;
        `}
      >
        <input id="inputId" type="range" min="1" max="5" step="1" value={sliderValue} onChange={() => handleSliderChange()} />
        <div>x{sliderValue}</div>
      </div>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          max-width: 160px;
        `}
      >
        <ResetButton />
        <PlayButton />
        <CompleteButton />
      </div>
    </div>
  );
};
