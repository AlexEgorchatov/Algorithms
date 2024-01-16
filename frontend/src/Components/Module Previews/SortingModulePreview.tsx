/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../Store/Store';
import { IModulePreviewTitle } from '../../Core/Interfaces/IModuleTitle';
import { updateSortingModulePreviewHeightsStateAction } from '../../Store/Home Page/Module Previews/SortingModulePreviewStateManagement';
import { ModulePreviewPlaceholder } from '../ModulePreviewPlaceHolder';

export const defaultSortingPreviewState: number[] = [180, 100, 120, 140, 160];

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

export const SortingModulePreview = ({ title }: IModulePreviewTitle) => {
  const sortingState = useSelector((state: AppState) => state.sortingModulePreviewState);
  const dispatch = useDispatch();
  const timeoutID = React.useRef(-1);
  const stepTime: number = 80;
  const animationCompleteTime: number = 500;

  const resetComponentState = () => {
    dispatch(updateSortingModulePreviewHeightsStateAction(defaultSortingPreviewState));
  };

  const awaitCancellation = (resolve: (parameter: unknown) => void, awaitTime: number) => {
    timeoutID.current = window.setTimeout(resolve, awaitTime);
  };

  const handleModuleMouseEnter = async () => {
    let length = sortingState.heights.length;
    let heightsCopy = [...sortingState.heights];

    for (let i = 0; i < length - 1; i++) {
      let isSwapped: boolean = false;

      for (let j = 0; j < length - i - 1; j++) {
        if (heightsCopy[j] <= heightsCopy[j + 1]) continue;

        let tempHeight = heightsCopy[j];
        heightsCopy[j] = heightsCopy[j + 1];
        heightsCopy[j + 1] = tempHeight;
        dispatch(updateSortingModulePreviewHeightsStateAction(heightsCopy));
        heightsCopy = [...heightsCopy];
        await new Promise((resolve) => awaitCancellation(resolve, stepTime));
        isSwapped = true;
      }

      if (!isSwapped) {
        await new Promise((resolve) => awaitCancellation(resolve, animationCompleteTime));
        resetComponentState();
        heightsCopy = [...sortingState.heights];
        i = -1;
        await new Promise((resolve) => awaitCancellation(resolve, stepTime * 2));
      }
    }
  };

  const handleModuleMouseLeave = () => {
    clearTimeout(timeoutID.current);
    resetComponentState();
  };

  return (
    <div onMouseEnter={handleModuleMouseEnter} onMouseLeave={handleModuleMouseLeave}>
      <ModulePreviewPlaceholder title={title}>
        <div
          css={css`
            margin: 0px 10px 0px 10px;
            height: 200px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          `}
        >
          {sortingState.heights.map((height, index) => (
            <SortingBar key={index} height={height} />
          ))}
        </div>
      </ModulePreviewPlaceholder>
    </div>
  );
};
