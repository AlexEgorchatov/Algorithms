/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { IModule } from '../Module';
import { ModulePlaceholder } from '../ModulePlaceHolder';

interface Props {
  height: number;
}

const SortingBar = ({ height }: Props) => {
  return (
    <div
      css={css`
        background-color: white;
        width: 25px;
        height: ${height}px;
        position: relative;
      `}
    ></div>
  );
};

export const SortingModule = ({ title }: IModule) => {
  const initialState: number[] = [180, 100, 120, 140, 160];
  const [heights, setHeights] = React.useState<number[]>(initialState);
  const isMouseOver = React.useRef(false);
  const timeoutID = React.useRef(-1);
  const stepTime: number = 80;
  const animationCompleteTime: number = 500;

  const resetComponentState = () => {
    setHeights(initialState);
  };

  const awaitCancellation = (resolve: (parameter: unknown) => void, awaitTime: number) => {
    timeoutID.current = window.setTimeout(resolve, awaitTime);
  };

  const handleModuleMouseEnter = async () => {
    let length = heights.length;
    let heightsCopy = [...heights];
    isMouseOver.current = true;

    for (let i = 0; i < length - 1; i++) {
      let isSwapped: boolean = false;

      for (let j = 0; j < length - i - 1; j++) {
        if (heightsCopy[j] <= heightsCopy[j + 1]) continue;

        var tempHeight = heightsCopy[j];
        heightsCopy[j] = heightsCopy[j + 1];
        heightsCopy[j + 1] = tempHeight;
        setHeights(heightsCopy);
        await new Promise((resolve) => awaitCancellation(resolve, stepTime));

        heightsCopy = [...heightsCopy];
        isSwapped = true;
      }

      if (!isSwapped) {
        await new Promise((resolve) => awaitCancellation(resolve, animationCompleteTime));
        resetComponentState();
        i = -1;
        await new Promise((resolve) => awaitCancellation(resolve, stepTime * 2));
        heightsCopy = [...heights];
      }
    }
  };

  const handleModuleMouseLeave = () => {
    isMouseOver.current = false;
    clearTimeout(timeoutID.current);
    resetComponentState();
  };

  return (
    <div onMouseEnter={handleModuleMouseEnter} onMouseLeave={handleModuleMouseLeave}>
      <ModulePlaceholder title={title}>
        <div
          css={css`
            margin: 0px 10px 0px 10px;
            height: 200px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          `}
        >
          {heights.map((height, index) => (
            <SortingBar key={index} height={height} />
          ))}
        </div>
      </ModulePlaceholder>
    </div>
  );
};
