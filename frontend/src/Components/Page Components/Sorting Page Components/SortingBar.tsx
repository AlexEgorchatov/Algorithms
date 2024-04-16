/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useRef } from 'react';
import { ISortingBarProps } from '../../../Core/Interfaces/ISortingBarProps';
import { SortingBarStateEnum } from '../../../Resources/Enumerations';
import { useSelector } from 'react-redux';
import { AppState } from '../../../Redux/Store';
import { checkedColor, completionColor, pivotColor } from '../../../Resources/Colors';
import { algorithmIterationBaseTime } from '../../../Resources/Constants';

export const SortingBarComponent = ({
  barHeight,
  barID,
  barState = SortingBarStateEnum.Unselected,
  leftOffset,
}: ISortingBarProps) => {
  let divRef = useRef<HTMLDivElement>(null);
  const sliderState = useSelector((state: AppState) => state.sliderComponentState);
  const animationState = useSelector((state: AppState) => state.animationState);
  const colors = {
    [SortingBarStateEnum.Unselected]: 'white',
    [SortingBarStateEnum.Selected]: checkedColor,
    [SortingBarStateEnum.Pivot]: pivotColor,
    [SortingBarStateEnum.Completed]: completionColor,
  };

  useEffect(() => {
    if (divRef.current === null) return;
    if (leftOffset === undefined) return;

    let transformTime = animationState.isAnimationFinalizing
      ? algorithmIterationBaseTime - 50
      : algorithmIterationBaseTime - 50 - 50 * (sliderState.sliderValue - 1);
    let translateLength = leftOffset - divRef.current.offsetLeft;
    divRef.current.style.transition = `transform ease-in ${transformTime}ms`;
    divRef.current.style.transform = `translateX(${translateLength}px)`;
  }, [leftOffset, sliderState.sliderValue]);

  useEffect(() => {
    if (divRef.current === null) return;

    divRef.current.style.transition = `transform ease-in 0ms`;
    divRef.current.style.transform = `translateX(0px)`;
  }, [barHeight, animationState.hasAnimationStarted, barState]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin-top: auto;
        height: 100%;
      `}
      id={barID?.toString()}
      ref={divRef}
    >
      <div
        css={css`
          display: ${isNaN(barHeight) ? 'none' : ''};
          background-color: white;
          width: 25px;
          height: calc((100% - 27px) / 100 * ${barHeight});
          background-color: ${colors[barState] ?? 'white'};
        `}
      ></div>
      <div
        css={css`
          display: flex;
          justify-content: center;
          color: white;
          font-size: 20px;
          color: ${colors[barState] ?? 'white'};
        `}
      >
        {barHeight}
      </div>
    </div>
  );
};
