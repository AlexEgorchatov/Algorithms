/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { ModuleTitle } from '../Components/Module';
import { ModulePlaceholder } from '../Components/ModulePlaceHolder';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../Store/Store';
import { updatingSortingModuleStateAction } from '../Store/Home Page/SortingModuleStateManagement';

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

export const SortingModule = ({ title }: ModuleTitle) => {
  const sortingState = useSelector((state: AppState) => state.sortingModuleState);
  const dispatch = useDispatch();
  const timeoutID = React.useRef(-1);
  const stepTime: number = 80;
  const animationCompleteTime: number = 500;

  const resetComponentState = () => {
    dispatch(updatingSortingModuleStateAction());
  };

  const awaitCancellation = (resolve: (parameter: unknown) => void, awaitTime: number) => {
    timeoutID.current = window.setTimeout(resolve, awaitTime);
  };

  const handleModuleMouseEnter = async () => {
    let length = sortingState.initialHeights.length;
    let heightsCopy = [...sortingState.initialHeights];

    for (let i = 0; i < length - 1; i++) {
      let isSwapped: boolean = false;

      for (let j = 0; j < length - i - 1; j++) {
        if (heightsCopy[j] <= heightsCopy[j + 1]) continue;

        let tempHeight = heightsCopy[j];
        heightsCopy[j] = heightsCopy[j + 1];
        heightsCopy[j + 1] = tempHeight;
        dispatch(updatingSortingModuleStateAction(heightsCopy));
        await new Promise((resolve) => awaitCancellation(resolve, stepTime));
        heightsCopy = [...heightsCopy];
        isSwapped = true;
      }

      if (!isSwapped) {
        await new Promise((resolve) => awaitCancellation(resolve, animationCompleteTime));
        resetComponentState();
        i = -1;
        await new Promise((resolve) => awaitCancellation(resolve, stepTime * 2));
        heightsCopy = [...sortingState.initialHeights];
      }
    }
  };

  const handleModuleMouseLeave = () => {
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
          {sortingState.initialHeights.map((height, index) => (
            <SortingBar key={index} height={height} />
          ))}
        </div>
      </ModulePlaceholder>
    </div>
  );
};
