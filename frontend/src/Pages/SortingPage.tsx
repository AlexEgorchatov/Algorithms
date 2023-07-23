/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useRef } from 'react';
import { completionColor, errorMessageColor, headerItemHovered, mainFontColor, moduleBackground, pivotColor } from '../Resources/Colors';
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
  updatingSelectedSortingAlgorithmState,
  updatingIsInputNanState,
  updatingIsInputOverMaxState,
} from '../Store/Sorting Page/SortingPageStateManagement';
import { SortingAlgorithmBase, SortingAlgorithmTypeEnum } from '../Resources/Algorithms/AlgorithmBase';
import { BubbleSort } from '../Resources/Algorithms/SortingAlgorithms';
import { updatingWindowHeightStateAction, updatingWindowWidthStateAction } from '../Store/Shared/WindowStateManagement';
import { ActionBar } from '../Components/ActionBar';
import { minAppWidth } from '../App';
import { algorithmAnimationBaseTime } from '../Resources/Helper';

export let selectedAlgorithm: SortingAlgorithmBase = new BubbleSort(SortingAlgorithmTypeEnum.BubbleSort);
export let initialSortingBars: SortingBarProps[];
export let finalSortingBars: SortingBarProps[];
let validSortingInput: string = '';
const sortingBarWidth: number = 35;

interface AlgorithmListProps {
  data: SortingData[];
}

interface AlgorithmProps {
  title: string;
  isSelected: boolean;
  sortingAlgorithm: SortingAlgorithmBase;
}

const SortingInputComponent = () => {
  const algorithmState = useSelector((state: AppState) => state.sortingPageState);
  const windowState = useSelector((state: AppState) => state.windowState);
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);

  const processInput = (currentInput: string) => {
    dispatch(updatingSortingInputStateAction(currentInput));
    validSortingInput = '';
    let stringArrayInput = currentInput.split(' ');
    let sortingBars: SortingBarProps[] = [];
    let isOverMax: boolean = false;
    let ID: number = 0;
    for (let i = 0; i < stringArrayInput.length; i++) {
      let currentNumber: number = parseInt(stringArrayInput[i]);
      if (isNaN(currentNumber)) continue;
      if (currentNumber > 99) {
        isOverMax = true;
        currentNumber = 99;
      }

      validSortingInput += `${currentNumber} `;
      sortingBars.push({ barHeight: currentNumber, barID: ID++ });
    }

    if (!/^[0-9\s]*$/.test(currentInput)) dispatch(updatingIsInputNanState(true));
    else dispatch(updatingIsInputNanState(false));
    if (isOverMax) dispatch(updatingIsInputOverMaxState(true));
    else dispatch(updatingIsInputOverMaxState(false));

    let sortingBarsCopy = [...sortingBars];
    initialSortingBars = [...sortingBars];
    finalSortingBars = sortingBarsCopy.sort((a, b) => a.barHeight - b.barHeight);

    dispatch(updatingSortingBarsStateAction(sortingBars));
  };

  const fixInput = () => {
    dispatch(updatingSortingInputStateAction(validSortingInput));
    dispatch(updatingIsInputNanState(false));
    dispatch(updatingIsInputOverMaxState(false));
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
        onInput={() => processInput(ref.current?.value as string)}
        disabled={algorithmState.hasAlgorithmStarted}
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
              color: ${algorithmState.isInputNan ? errorMessageColor : 'white'};
            `}
          >
            32 0 9 82
          </div>
          . Maximum recommended number of elements is {getMaxBarsNumber(windowState.windowWidth)}.
          <div
            css={css`
              margin-left: 5px;
              color: ${algorithmState.isInputOverMax ? errorMessageColor : 'white'};
            `}
          >
            Maximum value is 99
          </div>
          .
        </div>
        <div
          css={css`
            visibility: ${algorithmState.isInputNan || algorithmState.isInputOverMax ? 'visible' : 'hidden'};
            display: flex;
            color: ${errorMessageColor};
            font-size: 13px;
            font-weight: bold;
          `}
        >
          Input has invalid format.
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

const RefreshButton = () => {
  const algorithmState = useSelector((state: AppState) => state.sortingPageState);

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

const GenerateInputComponent = () => {
  const algorithmState = useSelector((state: AppState) => state.sortingPageState);
  const windowState = useSelector((state: AppState) => state.windowState);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    handleGenerateElements();
  }, []);

  const handleGenerateElements = () => {
    if (algorithmState.hasAlgorithmStarted) return;
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
    let sortingBarsCopy = [...sortingBars];
    validSortingInput = newInput;
    dispatch(updatingSortingInputStateAction(newInput));
    dispatch(updatingSortingBarsStateAction(sortingBars));
    dispatch(updatingIsInputNanState(false));
    dispatch(updatingIsInputOverMaxState(false));
    initialSortingBars = [...sortingBars];
    finalSortingBars = sortingBarsCopy.sort((a, b) => a.barHeight - b.barHeight);
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
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
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
        disabled={algorithmState.hasAlgorithmStarted}
      />
    </div>
  );
};

const AlgorithmComponent = ({ title, isSelected, sortingAlgorithm }: AlgorithmProps) => {
  const algorithmState = useSelector((state: AppState) => state.sortingPageState);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (algorithmState.hasAlgorithmStarted) return;
    selectedAlgorithm = sortingAlgorithm;
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
  const algorithmState = useSelector((state: AppState) => state.sortingPageState);

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
  const algorithmState = useSelector((state: AppState) => state.sortingPageState);

  useEffect(() => {
    if (divRef.current === null) return;
    if (newLeftOffset === undefined) return;

    let transformTime = algorithmAnimationBaseTime - 30 * sliderState.initialSliderValue;
    let translateLength = newLeftOffset - divRef.current.offsetLeft;
    divRef.current.style.transition = `transform ease-in ${transformTime}ms`;
    divRef.current.style.transform = `translateX(${translateLength}px)`;
  }, [newLeftOffset, sliderState.initialSliderValue]);

  useEffect(() => {
    if (divRef.current === null) return;

    divRef.current.style.transition = `transform ease-in 0ms`;
    divRef.current.style.transform = `translateX(0px)`;
  }, [barHeight, algorithmState.hasAlgorithmStarted, barState]);

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
          height: 50px;
          min-height: 50px;
        `}
      >
        Sorting
      </div>
      <div
        css={css`
          height: 70%;
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
            <ActionBar />
          </div>
          <GenerateInputComponent />
        </div>
        <AlgorithmsList data={sortingAlgorithms} />
      </div>
    </div>
  );
};

const AnimationComponent = () => {
  const algorithmState = useSelector((state: AppState) => state.sortingPageState);

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
            width: ${algorithmState.sortingBars.length * sortingBarWidth}px;
          `}
        >
          {algorithmState.sortingBars.map((bar, index) => (
            <SortingBar key={index} barID={bar.barID} barHeight={bar.barHeight} barState={bar.barState} leftOffset={bar.leftOffset} />
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
        <SliderComponent />
      </div>
    </div>
  );
};

export const SortingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleWindowResize = () => {
      dispatch(updatingWindowWidthStateAction(window.innerWidth));
      dispatch(updatingWindowHeightStateAction(window.outerHeight));
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
        font-size: 36px;
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

const getMaxBarsNumber = (windowWidth: number): number => {
  return Math.floor(Math.max(windowWidth, minAppWidth) / sortingBarWidth);
};
