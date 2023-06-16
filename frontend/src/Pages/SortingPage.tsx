/**@jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import React, { useEffect, useRef } from 'react';
import { headerItemHovered, mainFontColor, moduleBackground } from '../Resources/Colors';
import { SliderComponent } from '../Components/Slider';
import { SortingData, sortingAlgorithms } from '../Resources/Sorting Page Resources/SortingData';
import { useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { useDispatch } from 'react-redux';
import {
  SortingBarProps,
  SortingBarState,
  updatingSortingAlgorithmStateAction,
  updatingSortingGenerateInputStateAction,
  updatingSortingHeightsStateAction as updatingSortingBarsStateAction,
  updatingSortingInputStateAction,
} from '../Store/Sorting Page/SortingAlgorithmStateManagement';
import { updatingPauseVisibilityStateAction } from '../Store/Shared/SliderComponentStateManagement';

interface AlgorithmListProps {
  data: SortingData[];
}

interface AlgorithmProps {
  title: string;
  isSelected: boolean;
  onClick: React.MouseEventHandler;
}

const SortingInput = () => {
  const algorithmState = useSelector((state: AppState) => state.sortingAlgorithmState);
  const dispatch = useDispatch();
  const inputRegex: RegExp = /^[0-9]{0,2}(\s[0-9]{1,2}){0,24}(\s)?$/;
  const ref = useRef<HTMLInputElement>(null);
  const validateInput = (currentInput: string) => {
    let isValid: boolean = inputRegex.test(currentInput);
    if (!isValid) return;

    dispatch(updatingSortingInputStateAction(currentInput));
    let stringArrayInput = currentInput.split(' ');
    if (isNaN(parseInt(stringArrayInput[stringArrayInput.length - 1]))) stringArrayInput.pop();
    let barsCopy: SortingBarProps[] = [];
    for (let i = 0; i < stringArrayInput.length; i++) {
      barsCopy.push({ height: parseInt(stringArrayInput[i]) });
    }
    dispatch(updatingSortingBarsStateAction(barsCopy));
  };

  return (
    <div
      css={css`
        display: grid;
        width: 100%;
      `}
    >
      <input
        css={css`
          height: 20px;
          font-size: 16px;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
          ::placeholder {
            font-size: 16px;
            font-style: italic;
          }
        `}
        ref={ref}
        type="text"
        placeholder="Type several numbers..."
        value={algorithmState.initialSortingInput}
        onInput={() => validateInput(ref.current?.value as string)}
      />
      <div
        css={css`
          color: white;
          font-size: 13px;
        `}
      >
        Ex: "12 32 89 29". Maximum number of elements is 25.
      </div>
    </div>
  );
};

const RefreshButton = () => {
  return (
    <div
      css={css`
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        position: relative;
        display: flex;
        transform: scale(var(--ggs, 1));
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
          & > span {
            visibility: visible;
          }
        }
      `}
    >
      <div
        css={css`
          box-sizing: border-box;
          position: relative;
          display: block;
          transform: scale(var(--ggs, 1));
          width: 12px;
          height: 12px;
          border: 2px solid;
          border-right-color: transparent;
          border-radius: 100px;
          color: white;
          ::before {
            content: '';
            display: block;
            box-sizing: border-box;
            position: absolute;
            width: 6px;
            height: 6px;
            border-top: 2px solid;
            border-right: 2px solid;
            top: -3px;
            right: -1px;
            transform: rotate(68deg);
          }
        `}
      ></div>
    </div>
  );
};

const PlayPauseButton = () => {
  const sliderState = useSelector((state: AppState) => state.sliderComponentState);
  const algorithmState = useSelector((state: AppState) => state.sortingAlgorithmState);
  const dispatch = useDispatch();
  const stepTime: number = 100;
  const animationCompleteTime: number = 1000;

  const awaitCancellation = (resolve: (parameter: unknown) => void, awaitTime: number) => {
    window.setTimeout(resolve, awaitTime);
  };

  const executeBubbleSortAlgorithm = async () => {
    let length = algorithmState.initialSortingBars.length;
    let barsCopy = [...algorithmState.initialSortingBars];

    for (let i = 0; i < length - 1; i++) {
      let isSwapped: boolean = false;
      for (let j = 0; j < length - i - 1; j++) {
        if (barsCopy[j].height <= barsCopy[j + 1].height) continue;

        let tempBar = barsCopy[j];
        barsCopy[j] = { height: barsCopy[j + 1].height, barState: SortingBarState.Selected };
        barsCopy[j + 1] = { height: tempBar.height, barState: SortingBarState.Selected };
        dispatch(updatingSortingBarsStateAction(barsCopy));

        await new Promise((resolve) => awaitCancellation(resolve, stepTime));
        barsCopy = [...barsCopy];
        barsCopy[j] = { height: barsCopy[j].height, barState: SortingBarState.Unselected };
        barsCopy[j + 1] = { height: barsCopy[j + 1].height, barState: SortingBarState.Unselected };
        isSwapped = true;
        await new Promise((resolve) => awaitCancellation(resolve, stepTime));
      }
      if (!isSwapped) {
        await new Promise((resolve) => awaitCancellation(resolve, animationCompleteTime));
        await new Promise((resolve) => awaitCancellation(resolve, stepTime * 2));
      }
    }
  };

  const handleStartButtonClick = () => {
    dispatch(updatingPauseVisibilityStateAction(true));
    executeBubbleSortAlgorithm();
  };

  return (
    <div>
      <div
        css={css`
          box-sizing: border-box;
          position: relative;
          display: ${sliderState.initialPauseVisible ? 'none' : 'flex'};
          width: 22px;
          height: 22px;
          border: 2px solid;
          border-radius: 4px;
          color: white;
          cursor: pointer;
          :hover {
            color: ${headerItemHovered};
            & > span {
              visibility: visible;
            }
          }
          ::before {
            content: '';
            display: block;
            box-sizing: border-box;
            position: absolute;
            width: 0;
            height: 10px;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-left: 6px solid;
            top: 4px;
            left: 7px;
          }
        `}
        onClick={handleStartButtonClick}
      ></div>
      <div
        css={css`
          box-sizing: border-box;
          justify-content: center;
          align-items: center;
          position: relative;
          display: ${sliderState.initialPauseVisible ? 'flex' : 'none'};
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
            & > span {
              visibility: visible;
            }
          }
        `}
        onClick={() => dispatch(updatingPauseVisibilityStateAction(false))}
      >
        <div
          css={css`
            box-sizing: border-box;
            position: relative;
            transform: scale(var(--ggs, 1));
            width: 10px;
            height: 12px;
            border-left: 4px solid;
            border-right: 4px solid;
            color: white;
          `}
        ></div>
      </div>
    </div>
  );
};

const GenerateInputComponent = () => {
  const algorithmState = useSelector((state: AppState) => state.sortingAlgorithmState);
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    handleGenerateElements();
  }, []);

  const handleGenerateElements = () => {
    let newHeights: SortingBarProps[] = [];
    let newInput: string = '';

    for (let i = 0; i < parseInt(algorithmState.initialSortingGenerateInput); i++) {
      let random: number = Math.floor(Math.random() * 100);
      let stringValue = random.toString();
      newInput += `${stringValue} `;
      newHeights.push({ height: random });
    }

    dispatch(updatingSortingInputStateAction(newInput.trim()));
    dispatch(updatingSortingBarsStateAction(newHeights));
  };

  const handleEnterKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    handleGenerateElements();
  };

  const validateInput = (currentInput: string) => {
    let inputNumber: number = parseInt(currentInput);
    if (inputNumber > 25) return;

    dispatch(updatingSortingGenerateInputStateAction(currentInput));
  };

  return (
    <div
      css={css`
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        width: 125px;
      `}
    >
      <div
        css={css`
          box-sizing: border-box;
          position: relative;
          align-items: center;
          display: flex;
          height: 22px;
          font-size: 16px;
          transform: scale(var(--ggs, 1));
          border: 2px solid;
          border-radius: 4px;
          color: white;
          padding: 2px;
          cursor: pointer;
          :hover {
            color: ${headerItemHovered};
            & > span {
              visibility: visible;
            }
          }
        `}
        onClick={handleGenerateElements}
      >
        Generate
      </div>
      <input
        css={css`
          width: 40px;
          font-size: 13px;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
          ::placeholder {
            font-style: italic;
          }
        `}
        min={0}
        max={25}
        ref={ref}
        type="number"
        value={algorithmState.initialSortingGenerateInput}
        onInput={() => validateInput(ref.current?.value as string)}
        onKeyUp={handleEnterKeyUp}
      />
    </div>
  );
};

const AlgorithmControls = () => {
  return (
    <div
      css={css`
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        width: 210px;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          width: 47px;
        `}
      >
        <PlayPauseButton />
        <RefreshButton />
      </div>
      <GenerateInputComponent />
    </div>
  );
};

const Algorithm = ({ title, isSelected, onClick }: AlgorithmProps) => {
  return (
    <div
      css={css`
        cursor: pointer;
        font-size: 20px;
        color: ${isSelected ? '' : 'white'};
        margin-right: 10px;
        :hover {
          color: ${!isSelected ? `${headerItemHovered}` : ''};
        }
      `}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

const AlgorithmsList = ({ data }: AlgorithmListProps) => {
  const algorithmState = useSelector((state: AppState) => state.sortingAlgorithmState);
  const dispatch = useDispatch();

  return (
    <div
      css={css`
        width: 99%;
        display: flex;
      `}
    >
      {data.map((algorithm) => (
        <Algorithm
          key={algorithm.sortingType}
          title={algorithm.title}
          isSelected={algorithm.sortingType === algorithmState.initialSortingAlgorithm}
          onClick={() => dispatch(updatingSortingAlgorithmStateAction(algorithm.sortingType))}
        />
      ))}
    </div>
  );
};

const SortingBar = ({ height, barState = SortingBarState.Unselected }: SortingBarProps) => {
  const swap = keyframes`
    0%{

    }
    100%{
      
    }
  `;

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <div
        css={css`
          display: ${isNaN(height) ? 'none' : ''};
          background-color: white;
          width: 25px;
          height: ${height * 4}px;
          position: relative;
          background-color: ${barState === SortingBarState.Unselected ? 'white' : 'orange'};
        `}
      ></div>
      <div
        css={css`
          display: flex;
          justify-content: center;
          color: white;
          font-size: 20px;
          color: ${barState === SortingBarState.Unselected ? 'white' : 'orange'};
        `}
      >
        {height}
      </div>
    </div>
  );
};

export const SortingPage = () => {
  const algorithmState = useSelector((state: AppState) => state.sortingAlgorithmState);
  const dispatch = useDispatch();

  return (
    <div
      css={css`
        color: ${mainFontColor};
        font-size: 36px;
        text-align: left;
        overflow: auto;
        height: 87vh;
        min-height: 87vh;
      `}
    >
      <div
        css={css`
          padding: 10px;
        `}
      >
        <div
          css={css`
            padding-bottom: 10px;
            margin-top: -10px;
          `}
        >
          Sorting
        </div>
        <div
          css={css`
            height: 120px;
            display: grid;
            align-content: space-between;
          `}
        >
          <SortingInput />
          <AlgorithmControls />
          <AlgorithmsList data={sortingAlgorithms} />
        </div>
      </div>
      <div
        css={css`
          display: flex;
          height: 626px;
          flex-direction: column;
          background-color: ${moduleBackground};
        `}
      >
        <div
          css={css`
            display: flex;
            height: 550px;
            justify-content: center;
            align-items: flex-end;
            margin-bottom: 100px;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: flex-end;
              justify-content: space-evenly;
              width: ${algorithmState.initialSortingBars.length * 40}px;
            `}
          >
            {algorithmState.initialSortingBars.map((bar, index) => (
              <SortingBar key={index} height={bar.height} barState={bar.barState} />
            ))}
          </div>
        </div>

        <SliderComponent />
      </div>
    </div>
  );
};
