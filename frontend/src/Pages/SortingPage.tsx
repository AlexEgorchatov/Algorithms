/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useRef } from 'react';
import { completionColor, errorMessageColor, headerItemHovered, mainFontColor, moduleBackground, pivotColor } from '../Resources/Colors';
import { SliderComponent } from '../Components/Slider';
import { SortingData, sortingAlgorithmsData } from '../Core/Data/SortingData';
import { useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { useDispatch } from 'react-redux';
import {
  updateSortingBarsStateAction,
  updateSortingInputStateAction,
  updateSelectedSortingAlgorithmState,
  updatingIsInputNanState,
  updateIsInputOverMaxState,
  updateIsStateUpdatedState,
} from '../Store/Sorting Page/SortingPageStateManagement';
import { updateWindowWidthStateAction } from '../Store/Shared/WindowStateManagement';
import { ActionBar } from '../Components/ActionBar';
import { minAppWidth } from '../App';
import { animationContext } from '../Core/Helper';
import { RefreshButton } from '../Components/RefreshButton';
import { SortingAlgorithmBase } from '../Core/Abstractions/AlgorithmBase';
import { SortingAlgorithmManager } from '../Core/Other/SortingAlgorithmManager';

export enum SortingBarStateEnum {
  Unselected = 0,
  Selected = 1,
  Pivot = 2,
  Completed = 999,
}
export interface SortingBarProps {
  barHeight: number;
  barID?: number;
  barState?: SortingBarStateEnum;
  leftOffset?: number;
}
export let selectedSortingAlgorithm: SortingAlgorithmBase = sortingAlgorithmsData[0].sortingAlgorithm;

let validSortingInput: string = '';
const sortingBarWidth: number = 35;
const getMaxBarsNumber = (windowWidth: number): number => {
  return Math.floor(Math.max(windowWidth, minAppWidth) / sortingBarWidth);
};

interface AlgorithmListProps {
  data: SortingData[];
}

interface AlgorithmProps {
  title: string;
  isSelected: boolean;
  sortingAlgorithm: SortingAlgorithmBase;
}

const SortingInputComponent = () => {
  const sortingPageState = useSelector((state: AppState) => state.sortingPageState);
  const algorithmState = useSelector((state: AppState) => state.animationState);
  const windowState = useSelector((state: AppState) => state.windowState);
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);

  const processInput = (currentInput: string) => {
    dispatch(updateSortingInputStateAction(currentInput));
    validSortingInput = '';
    let stringArrayInput = currentInput.split(' ');
    let sortingBars: SortingBarProps[] = [];
    let isOverMax: boolean = false;
    let isNotDigit: boolean = false;
    let ID: number = 0;
    for (let i = 0; i < stringArrayInput.length; i++) {
      if (stringArrayInput[i] === '') continue;
      let currentNumber: number = parseInt(stringArrayInput[i]);
      if (isNaN(currentNumber)) {
        isNotDigit = true;
        continue;
      }
      if (currentNumber > 99) {
        isOverMax = true;
        currentNumber = 99;
      }

      validSortingInput += `${currentNumber} `;
      sortingBars.push({ barHeight: currentNumber, barID: ID++ });
    }

    if (isNotDigit) dispatch(updatingIsInputNanState(true));
    else dispatch(updatingIsInputNanState(false));
    if (isOverMax) dispatch(updateIsInputOverMaxState(true));
    else dispatch(updateIsInputOverMaxState(false));
    dispatch(updateSortingBarsStateAction(sortingBars));
    dispatch(updateIsStateUpdatedState(true));
  };

  const fixInput = () => {
    dispatch(updateSortingInputStateAction(validSortingInput));
    dispatch(updatingIsInputNanState(false));
    dispatch(updateIsInputOverMaxState(false));
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
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          ::placeholder {
            font-size: 16px;
            font-style: italic;
          }
        `}
        ref={ref}
        type="text"
        placeholder="Type several numbers..."
        value={sortingPageState.sortingInput}
        onInput={() => processInput(ref.current?.value as string)}
        disabled={algorithmState.hasAnimationStarted}
      />

      <div>
        <div
          css={css`
            display: flex;
            color: white;
            font-size: 13px;
            min-width: 520px;
            font-weight: bold;
          `}
        >
          Ex:
          <div
            css={css`
              margin-left: 5px;
              color: ${sortingPageState.isInputNan ? errorMessageColor : 'white'};
            `}
          >
            "32 0 9 82"
          </div>
          . Maximum recommended number of elements is {getMaxBarsNumber(windowState.windowWidth)}.
          <div
            css={css`
              margin-left: 5px;
              color: ${sortingPageState.isInputOverMax ? errorMessageColor : 'white'};
            `}
          >
            Maximum value is 99
          </div>
          .
        </div>
        <div
          css={css`
            visibility: ${sortingPageState.isInputNan || sortingPageState.isInputOverMax ? 'visible' : 'hidden'};
            display: flex;
            color: ${errorMessageColor};
            font-size: 13px;
            font-weight: bold;
          `}
        >
          Input has invalid format,
          <div
            css={css`
              margin-left: 5px;
              cursor: pointer;
              text-decoration: underline;
            `}
            onClick={fixInput}
          >
            Fix
          </div>
        </div>
      </div>
    </div>
  );
};

const GenerateInputComponent = () => {
  const windowState = useSelector((state: AppState) => state.windowState);
  const algorithmState = useSelector((state: AppState) => state.animationState);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    handleGenerateElements();
  }, []);

  const handleGenerateElements = () => {
    if (algorithmState.hasAnimationStarted) return;
    if (inputRef.current === null) return;

    let sortingBars: SortingBarProps[] = [];
    let newInput: string = '';

    for (let i = 0; i < parseInt(inputRef.current.value); i++) {
      let random: number = Math.floor(Math.random() * 100);
      let stringValue = random.toString();
      newInput += `${stringValue} `;
      sortingBars.push({ barHeight: random, barID: i });
    }

    newInput = newInput.trim();
    validSortingInput = newInput;
    dispatch(updateSortingInputStateAction(newInput));
    dispatch(updateSortingBarsStateAction(sortingBars));
    dispatch(updatingIsInputNanState(false));
    dispatch(updateIsInputOverMaxState(false));
    dispatch(updateIsStateUpdatedState(true));
  };

  const handleEnterKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    handleGenerateElements();
  };

  const validateInput = (currentInput: string) => {
    if (inputRef.current === null) return;

    let maxBarsNumber: number = getMaxBarsNumber(windowState.windowWidth);
    inputRef.current.value = parseInt(currentInput) > maxBarsNumber ? maxBarsNumber.toString() : currentInput;
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
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          ::placeholder {
            font-style: italic;
          }
        `}
        min={0}
        max={getMaxBarsNumber(windowState.windowWidth)}
        ref={inputRef}
        type="number"
        defaultValue={10}
        onInput={() => validateInput(inputRef.current?.value as string)}
        onKeyUp={handleEnterKeyUp}
        disabled={algorithmState.hasAnimationStarted}
      />
    </div>
  );
};

const AlgorithmComponent = ({ title, isSelected, sortingAlgorithm }: AlgorithmProps) => {
  const algorithmState = useSelector((state: AppState) => state.animationState);
  const sortingPageState = useSelector((state: AppState) => state.sortingPageState);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (algorithmState.hasAnimationStarted) return;
    dispatch(updateSelectedSortingAlgorithmState(sortingAlgorithm.sortingAlgorithm));
    selectedSortingAlgorithm = sortingAlgorithm;
    if (!sortingPageState.isStateUpdated) {
      dispatch(updateSortingBarsStateAction(SortingAlgorithmManager.initialState));
      selectedSortingAlgorithm.setFinalState();
    }
  };

  return (
    <div
      css={css`
        font-size: 20px;
        color: ${isSelected ? '' : 'white'};
        margin-right: 10px;
        cursor: ${algorithmState.hasAnimationStarted && !isSelected ? 'default' : 'pointer'};
        opacity: ${algorithmState.hasAnimationStarted && !isSelected ? '0.5' : '1'};
        :hover {
          ${!algorithmState.hasAnimationStarted &&
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
  const sortingPageState = useSelector((state: AppState) => state.sortingPageState);

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
          isSelected={algorithm.sortingAlgorithm.sortingAlgorithm === sortingPageState.selectedSortingAlgorithm}
          sortingAlgorithm={algorithm.sortingAlgorithm}
        />
      ))}
    </div>
  );
};

const SortingBarComponent = ({ barHeight, barID, barState = SortingBarStateEnum.Unselected, leftOffset: newLeftOffset }: SortingBarProps) => {
  let divRef = useRef<HTMLDivElement>(null);
  const sliderState = useSelector((state: AppState) => state.sliderComponentState);
  const algorithmState = useSelector((state: AppState) => state.animationState);
  const algorithmAnimationBaseTime: number = 280;

  useEffect(() => {
    if (divRef.current === null) return;
    if (newLeftOffset === undefined) return;

    let transformTime = algorithmAnimationBaseTime - 30 * sliderState.sliderValue;
    let translateLength = newLeftOffset - divRef.current.offsetLeft;
    divRef.current.style.transition = `transform ease-in ${transformTime}ms`;
    divRef.current.style.transform = `translateX(${translateLength}px)`;
  }, [newLeftOffset, sliderState.sliderValue]);

  useEffect(() => {
    if (divRef.current === null) return;

    divRef.current.style.transition = `transform ease-in 0ms`;
    divRef.current.style.transform = `translateX(0px)`;
  }, [barHeight, algorithmState.hasAnimationStarted, barState]);

  const getColor = () => {
    switch (barState) {
      case SortingBarStateEnum.Unselected:
        return 'white';

      case SortingBarStateEnum.Selected:
        return 'orange';

      case SortingBarStateEnum.Pivot:
        return `${pivotColor}`;

      case SortingBarStateEnum.Completed:
        return completionColor;

      default:
        return 'white';
    }
  };

  return (
    <div
      css={css`
        position: relative;
      `}
      id={barID?.toString()}
      ref={divRef}
    >
      <div
        css={css`
          display: ${isNaN(barHeight) ? 'none' : ''};
          background-color: white;
          width: 25px;
          height: ${barHeight * 4}px;
          position: relative;
          background-color: ${getColor()};
        `}
      ></div>
      <div
        css={css`
          display: flex;
          justify-content: center;
          color: white;
          font-size: 20px;
          color: ${getColor()};
        `}
      >
        {barHeight}
      </div>
    </div>
  );
};

const SettingsComponent = () => {
  return (
    <div
      css={css`
        margin: 0px 10px;
        height: 25%;
        min-height: 200px;
        display: block;
      `}
    >
      <div
        css={css`
          height: 20%;
          min-height: 40px;
        `}
      >
        Sorting
      </div>
      <div
        css={css`
          height: 80%;
          min-height: 118px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        `}
      >
        <SortingInputComponent />
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
            <animationContext.Provider
              value={{
                startAlgorithm: () => SortingAlgorithmManager.startAlgorithm(),
                stopAlgorithm: () => SortingAlgorithmManager.stopAlgorithm(),
                completeAlgorithm: () => SortingAlgorithmManager.completeAlgorithm(),
              }}
            >
              <ActionBar />
            </animationContext.Provider>
          </div>
          <GenerateInputComponent />
        </div>
        <AlgorithmsList data={sortingAlgorithmsData} />
      </div>
    </div>
  );
};

const AnimationComponent = () => {
  const sortingPageState = useSelector((state: AppState) => state.sortingPageState);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        background-color: ${moduleBackground};
        height: 75%;
        min-height: 500px;
      `}
    >
      <div
        css={css`
          display: flex;
          height: 70%;
          min-height: 425px;
          justify-content: center;
          align-items: flex-end;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            width: ${sortingPageState.sortingBars.length * sortingBarWidth}px;
          `}
        >
          {sortingPageState.sortingBars.map((bar, index) => (
            <SortingBarComponent key={index} barID={bar.barID} barHeight={bar.barHeight} barState={bar.barState} leftOffset={bar.leftOffset} />
          ))}
        </div>
      </div>
      <div
        css={css`
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;
        `}
      >
        <animationContext.Provider
          value={{
            startAlgorithm: () => SortingAlgorithmManager.startAlgorithm(),
            stopAlgorithm: () => SortingAlgorithmManager.stopAlgorithm(),
            completeAlgorithm: () => SortingAlgorithmManager.completeAlgorithm(),
          }}
        >
          <SliderComponent />
        </animationContext.Provider>
      </div>
    </div>
  );
};

export const SortingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleWindowResize = () => {
      dispatch(updateWindowWidthStateAction(window.innerWidth));
    };

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div
      css={css`
        color: ${mainFontColor};
        font-size: 30px;
        text-align: left;
        overflow: auto;
        height: 100%;
      `}
    >
      <SettingsComponent />
      <AnimationComponent />
    </div>
  );
};
