/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { Dispatch, useEffect, useRef } from 'react';
import { headerItemHovered, mainFontColor, moduleBackground } from '../Resources/Colors';
import { SliderComponent } from '../Components/Slider';
import { SortingData, sortingAlgorithms } from '../Resources/Sorting Page Resources/SortingData';
import { useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { useDispatch } from 'react-redux';
import {
  SortingBarProps,
  SortingBarStateEnum,
  updatingSortingAlgorithmStateAction,
  updatingSortingBarsStateAction,
  updatingSortingInputStateAction,
  updatingIsAlgorithmRunningStateAction,
  updatingHasAlgorithmStartedState,
} from '../Store/Sorting Page/SortingAlgorithmStateManagement';
import { store } from '../App';
import { AnyAction } from 'redux';

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
      barsCopy.push({ barHeight: parseInt(stringArrayInput[i]), barID: i });
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
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          ::placeholder {
            font-size: 16px;
            font-style: italic;
          }
        `}
        ref={ref}
        type="text"
        placeholder="Type several numbers..."
        value={algorithmState.sortingInput}
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

const PlayButton = () => {
  const sliderState = useSelector((state: AppState) => state.sliderComponentState);
  const algorithmState = useSelector((state: AppState) => state.sortingAlgorithmState);
  const dispatch = useDispatch();
  let stepTime = useRef<number>(0);

  useEffect(() => {
    stepTime.current = 400 - 30 * (sliderState.initialSliderValue - 1);
  }, [sliderState.initialSliderValue]);

  const handleStartButtonClick = () => {
    dispatch(updatingIsAlgorithmRunningStateAction(true));
    if (!algorithmState.hasAlgorithmStarted) {
      dispatch(updatingHasAlgorithmStartedState(true));
      executeBubbleSortAlgorithm(dispatch, algorithmState.sortingBars, stepTime);
    }
  };

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
      onClick={handleStartButtonClick}
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
  const algorithmState = useSelector((state: AppState) => state.sortingAlgorithmState);

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
            background: ${headerItemHovered};
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
          width: 8px;
          height: 8px;
          background: white;
        `}
      ></div>
    </div>
  );
};

const CompleteButton = () => {
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

const GenerateInputComponent = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    handleGenerateElements();
  }, []);

  const handleGenerateElements = () => {
    let sortingBars: SortingBarProps[] = [];
    let newInput: string = '';
    if (inputRef.current === null) return;

    for (let i = 0; i < parseInt(inputRef.current?.value); i++) {
      let random: number = Math.floor(Math.random() * 100);
      let stringValue = random.toString();
      newInput += `${stringValue} `;
      sortingBars.push({ barHeight: random, barID: i });
    }

    dispatch(updatingSortingInputStateAction(newInput.trim()));
    dispatch(updatingSortingBarsStateAction(sortingBars));
  };

  const handleEnterKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    handleGenerateElements();
  };

  const validateInput = (currentInput: string) => {
    if (inputRef.current === null) return;

    let inputNumber: number = parseInt(currentInput);
    if (inputNumber > 25) inputRef.current.value = '25';
    else inputRef.current.value = currentInput;
  };

  return (
    <div
      css={css`
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        width: 73px;
      `}
    >
      <div onClick={handleGenerateElements}>
        <RefreshButton />
      </div>
      <input
        css={css`
          width: 40px;
          font-size: 13px;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          ::placeholder {
            font-style: italic;
          }
        `}
        min={0}
        max={25}
        ref={inputRef}
        type="number"
        defaultValue={10}
        onInput={() => validateInput(inputRef.current?.value as string)}
        onKeyUp={handleEnterKeyUp}
      />
    </div>
  );
};

const ControlAlgorithmButtons = () => {
  const sliderState = useSelector((state: AppState) => state.sortingAlgorithmState);

  return (
    <div
      css={css`
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        width: 250px;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          width: 72px;
        `}
      >
        {sliderState.isAlgorithmRunning ? <PauseButton /> : <PlayButton />}
        <StopButton />
        <CompleteButton />
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
          isSelected={algorithm.sortingType === algorithmState.sortingAlgorithm}
          onClick={() => dispatch(updatingSortingAlgorithmStateAction(algorithm.sortingType))}
        />
      ))}
    </div>
  );
};

const SortingBar = ({ barHeight, barID, barState = SortingBarStateEnum.Unselected, leftOffset: newLeftOffset }: SortingBarProps) => {
  let divRef = React.useRef<HTMLDivElement>(null);
  const sliderState = useSelector((state: AppState) => state.sliderComponentState);

  useEffect(() => {
    if (divRef.current === null) return;
    if (newLeftOffset === undefined) return;

    let transformTime = 280 - 30 * sliderState.initialSliderValue;
    let translateLength = newLeftOffset - divRef.current.offsetLeft;
    divRef.current.style.transition = `transform ease-in ${transformTime}ms`;
    divRef.current.style.transform = `translateX(${translateLength}px)`;
  }, [newLeftOffset, sliderState.initialSliderValue]);

  useEffect(() => {
    if (divRef.current === null) return;

    divRef.current.style.transition = `transform ease-in 0ms`;
    divRef.current.style.transform = `translateX(0px)`;
  }, [barHeight]);

  return (
    <div
      css={css`
        position: relative;
      `}
      id={barID.toString()}
      ref={divRef}
    >
      <div
        css={css`
          display: ${isNaN(barHeight) ? 'none' : ''};
          background-color: white;
          width: 25px;
          height: ${barHeight * 4}px;
          position: relative;
          background-color: ${barState === SortingBarStateEnum.Unselected ? 'white' : 'orange'};
        `}
      ></div>
      <div
        css={css`
          display: flex;
          justify-content: center;
          color: white;
          font-size: 20px;
          color: ${barState === SortingBarStateEnum.Unselected ? 'white' : 'orange'};
        `}
      >
        {barHeight}
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
          <ControlAlgorithmButtons />
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
              justify-content: space-between;
              width: ${algorithmState.sortingBars.length * 35}px;
              position: absolute;
            `}
          >
            {algorithmState.sortingBars.map((bar, index) => (
              <SortingBar key={index} barID={bar.barID} barHeight={bar.barHeight} barState={bar.barState} leftOffset={bar.leftOffset} />
            ))}
          </div>
        </div>

        <SliderComponent />
      </div>
    </div>
  );
};

const waitForContinuation = () => {
  return new Promise<void>((resolve) => {
    let unsubscribe = store.subscribe(() => {
      if (store.getState().sortingAlgorithmState.isAlgorithmRunning) {
        unsubscribe();
        resolve();
      }
    });
  });
};

const executeBubbleSortAlgorithm = async (
  dispatch: Dispatch<AnyAction>,
  sortingBars: SortingBarProps[],
  stepTime: React.MutableRefObject<number>,
) => {
  let length = sortingBars.length;
  let barsCopy = [...sortingBars];

  for (let i = 0; i < length - 1; i++) {
    let isSwapped: boolean = false;
    for (let j = 0; j < length - i - 1; j++) {
      barsCopy = [...barsCopy];
      barsCopy[j] = { barHeight: barsCopy[j].barHeight, barState: SortingBarStateEnum.Selected, barID: barsCopy[j].barID };
      barsCopy[j + 1] = { barHeight: barsCopy[j + 1].barHeight, barState: SortingBarStateEnum.Selected, barID: barsCopy[j + 1].barID };
      dispatch(updatingSortingBarsStateAction(barsCopy));
      await new Promise((resolve) => setTimeout(resolve, stepTime.current));
      if (!store.getState().sortingAlgorithmState.isAlgorithmRunning) await waitForContinuation();

      if (barsCopy[j].barHeight <= barsCopy[j + 1].barHeight) {
        barsCopy = [...barsCopy];
        barsCopy[j] = { barHeight: barsCopy[j].barHeight, barState: SortingBarStateEnum.Unselected, barID: barsCopy[j].barID };
        barsCopy[j + 1] = { barHeight: barsCopy[j + 1].barHeight, barState: SortingBarStateEnum.Unselected, barID: barsCopy[j + 1].barID };
        dispatch(updatingSortingBarsStateAction(barsCopy));
        continue;
      }

      barsCopy = [...barsCopy];
      let currentLeftOffset = document.getElementById(barsCopy[j].barID.toString())?.offsetLeft;
      let nextLeftOffset = document.getElementById(barsCopy[j + 1].barID.toString())?.offsetLeft;
      let tempID = barsCopy[j].barID;
      barsCopy[j] = {
        barHeight: barsCopy[j].barHeight,
        barState: SortingBarStateEnum.Selected,
        barID: barsCopy[j + 1].barID,
        leftOffset: nextLeftOffset,
      };
      barsCopy[j + 1] = {
        barHeight: barsCopy[j + 1].barHeight,
        barState: SortingBarStateEnum.Selected,
        barID: tempID,
        leftOffset: currentLeftOffset,
      };
      dispatch(updatingSortingBarsStateAction(barsCopy));
      await new Promise((resolve) => setTimeout(resolve, stepTime.current));
      if (!store.getState().sortingAlgorithmState.isAlgorithmRunning) await waitForContinuation();

      barsCopy = [...barsCopy];
      var tempBar = barsCopy[j];
      barsCopy[j] = {
        barHeight: barsCopy[j + 1].barHeight,
        barState: SortingBarStateEnum.Unselected,
        barID: barsCopy[j + 1].barID,
      };
      barsCopy[j + 1] = {
        barHeight: tempBar.barHeight,
        barState: SortingBarStateEnum.Unselected,
        barID: tempBar.barID,
      };
      dispatch(updatingSortingBarsStateAction(barsCopy));

      isSwapped = true;
    }
    if (!isSwapped) return;
  }
};
