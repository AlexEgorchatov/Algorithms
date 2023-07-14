/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { headerItemHovered } from '../Resources/Colors';
import { handleStartAlgorithmButtonClick } from '../Resources/Helper';
import { useDispatch, useSelector } from 'react-redux';
import {
  updatingHasAlgorithmStartedState,
  updatingIsAlgorithmRunningStateAction,
  updatingSortingBarsStateAction,
} from '../Store/Sorting Page/SortingPageStateManagement';
import { AppState } from '../Store/Store';
import { finalSortingBars, initialSortingBars } from '../Pages/SortingPage';
import React, { Fragment } from 'react';

const PlayButton = () => {
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
        cursor: pointer;
        :hover {
          color: ${headerItemHovered};
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
      onClick={handleStartAlgorithmButtonClick}
    ></div>
  );
};

const PauseButton = () => {
  const dispatch = useDispatch();

  const handlePauseButtonClick = () => {
    dispatch(updatingIsAlgorithmRunningStateAction(false));
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
        cursor: pointer;
        :hover {
          color: ${headerItemHovered};
          & > div {
            color: ${headerItemHovered};
          }
        }
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
  const algorithmState = useSelector((state: AppState) => state.sortingPageState);
  const dispatch = useDispatch();

  const handleStopButtonClick = () => {
    if (!algorithmState.hasAlgorithmStarted) return;

    dispatch(updatingHasAlgorithmStartedState(false));
    dispatch(updatingIsAlgorithmRunningStateAction(false));
    dispatch(updatingSortingBarsStateAction(initialSortingBars));
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
        cursor: ${algorithmState.hasAlgorithmStarted ? 'pointer' : 'default'};
        opacity: ${algorithmState.hasAlgorithmStarted ? '1' : '0.5'};
        :hover {
          ${algorithmState.hasAlgorithmStarted &&
          `
              color: ${headerItemHovered};
              & > div {
                background: ${headerItemHovered};
              }
            `}
        }
      `}
      onClick={handleStopButtonClick}
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
  const algorithmState = useSelector((state: AppState) => state.sortingPageState);
  const dispatch = useDispatch();

  const handleCompleteButtonClick = () => {
    if (!algorithmState.hasAlgorithmStarted) return;

    dispatch(updatingHasAlgorithmStartedState(false));
    dispatch(updatingIsAlgorithmRunningStateAction(false));
    dispatch(updatingSortingBarsStateAction(finalSortingBars));
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
        cursor: ${algorithmState.hasAlgorithmStarted ? 'pointer' : 'default'};
        opacity: ${algorithmState.hasAlgorithmStarted ? '1' : '0.5'};
        :hover {
          ${algorithmState.hasAlgorithmStarted &&
          `
              color: ${headerItemHovered};
              & > div {
                color: ${headerItemHovered};
              }
            `}
        }
      `}
      onClick={handleCompleteButtonClick}
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
  const sliderState = useSelector((state: AppState) => state.sortingPageState);

  return (
    <Fragment>
      {sliderState.isAlgorithmRunning ? <PauseButton /> : <PlayButton />}
      <StopButton />
      <CompleteButton />
    </Fragment>
  );
};
