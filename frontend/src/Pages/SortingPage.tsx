/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useRef } from 'react';
import { headerItemHovered, mainFontColor, moduleBackground } from '../Resources/Colors';
import { SliderComponent } from '../Components/Slider';
import { SortingData, sortingAlgorithms } from '../Resources/Sorting Page Resources/SortingData';
import { useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { useDispatch } from 'react-redux';
import {
  SortingBarProps,
  SortingBarStateEnum,
  updatingSortingBarsStateAction,
  updatingSortingInputStateAction,
  updatingIsAlgorithmRunningStateAction,
  updatingHasAlgorithmStartedState,
  updatingSelectedSortingAlgorithmState,
} from '../Store/Sorting Page/SortingAlgorithmStateManagement';
import { handleStartAlgorithmButtonClick } from '../Resources/Helper';
import { SortingAlgorithmBase, SortingAlgorithmTypeEnum } from '../Resources/Algorithms/AlgorithmBase';
import { BubbleSort } from '../Resources/Algorithms/SortingAlgorithms';

export let SelectedAlgorithm: SortingAlgorithmBase = new BubbleSort(SortingAlgorithmTypeEnum.BubbleSort);
export let InitialSortingBars: SortingBarProps[];
export let FinalSortingBars: SortingBarProps[];

interface AlgorithmListProps {
  data: SortingData[];
}

interface AlgorithmProps {
  title: string;
  isSelected: boolean;
  sortingAlgorithm: SortingAlgorithmBase;
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
        disabled={algorithmState.hasAlgorithmStarted}
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
  const algorithmState = useSelector((state: AppState) => state.sortingAlgorithmState);

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
        cursor: ${!algorithmState.hasAlgorithmStarted ? 'pointer' : 'default'};
        opacity: ${!algorithmState.hasAlgorithmStarted ? '1' : '0.5'};
        :hover {
          ${!algorithmState.hasAlgorithmStarted &&
          `
            color: ${headerItemHovered};
            & > div {
              color: ${headerItemHovered};
            }
          `}
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
  const algorithmState = useSelector((state: AppState) => state.sortingAlgorithmState);
  const dispatch = useDispatch();

  const handleStopButtonClick = () => {
    if (!algorithmState.hasAlgorithmStarted) return;

    dispatch(updatingHasAlgorithmStartedState(false));
    dispatch(updatingIsAlgorithmRunningStateAction(false));
    dispatch(updatingSortingBarsStateAction(InitialSortingBars));
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
  const algorithmState = useSelector((state: AppState) => state.sortingAlgorithmState);
  const dispatch = useDispatch();

  const handleCompleteButtonClick = () => {
    if (!algorithmState.hasAlgorithmStarted) return;

    dispatch(updatingHasAlgorithmStartedState(false));
    dispatch(updatingIsAlgorithmRunningStateAction(false));
    dispatch(updatingSortingBarsStateAction(FinalSortingBars));
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

const GenerateInputComponent = () => {
  const algorithmState = useSelector((state: AppState) => state.sortingAlgorithmState);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    handleGenerateElements();
  }, []);

  const handleGenerateElements = () => {
    if (algorithmState.hasAlgorithmStarted) return;

    let sortingBars: SortingBarProps[] = [];
    let newInput: string = '';
    if (inputRef.current === null) return;

    for (let i = 0; i < parseInt(inputRef.current?.value); i++) {
      let random: number = Math.floor(Math.random() * 100);
      let stringValue = random.toString();
      newInput += `${stringValue} `;
      sortingBars.push({ barHeight: random, barState: SortingBarStateEnum.Unselected, barID: i });
    }

    let sortingBarsCopy = [...sortingBars];
    dispatch(updatingSortingInputStateAction(newInput.trim()));
    dispatch(updatingSortingBarsStateAction(sortingBars));
    InitialSortingBars = [...sortingBars];
    FinalSortingBars = sortingBarsCopy.sort((a, b) => a.barHeight - b.barHeight);
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
          height: 16px;
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
        disabled={algorithmState.hasAlgorithmStarted}
      />
    </div>
  );
};

const ActionBar = () => {
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

const AlgorithmComponent = ({ title, isSelected, sortingAlgorithm }: AlgorithmProps) => {
  const algorithmState = useSelector((state: AppState) => state.sortingAlgorithmState);
  const dispatch = useDispatch();

  const handleClick = () => {
    SelectedAlgorithm = sortingAlgorithm;
    dispatch(updatingSelectedSortingAlgorithmState(sortingAlgorithm.sortingAlgorithmType));
  };

  return (
    <div
      css={css`
        font-size: 20px;
        color: ${isSelected ? '' : 'white'};
        margin-right: 10px;
        cursor: ${algorithmState.hasAlgorithmStarted && !isSelected ? 'default' : 'pointer'};
        opacity: ${algorithmState.hasAlgorithmStarted && !isSelected ? '0.5' : '1'};
        :hover {
          ${!algorithmState.hasAlgorithmStarted &&
          `
            color: ${!isSelected ? `${headerItemHovered}` : ''};
          `}
        }
      `}
      onClick={handleClick}
    >
      {title}
    </div>
  );
};

const AlgorithmsList = ({ data }: AlgorithmListProps) => {
  const algorithmState = useSelector((state: AppState) => state.sortingAlgorithmState);

  return (
    <div
      css={css`
        display: flex;
      `}
    >
      {data.map((algorithm, index) => (
        <AlgorithmComponent
          key={index}
          title={algorithm.title}
          isSelected={algorithm.sortingAlgorithm.sortingAlgorithmType === algorithmState.selectedSortingAlgorithmType}
          sortingAlgorithm={algorithm.sortingAlgorithm}
        />
      ))}
    </div>
  );
};

const SortingBar = ({ barHeight, barID, barState = SortingBarStateEnum.Unselected, leftOffset: newLeftOffset }: SortingBarProps) => {
  let divRef = React.useRef<HTMLDivElement>(null);
  const sliderState = useSelector((state: AppState) => state.sliderComponentState);
  const algorithmState = useSelector((state: AppState) => state.sortingAlgorithmState);

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
  }, [barHeight, algorithmState.hasAlgorithmStarted]);

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
          <ActionBar />
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
