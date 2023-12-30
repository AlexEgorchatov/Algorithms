/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useRef } from 'react';
import {
  checkedColor,
  completionColor,
  errorMessageColor,
  mainFontColor,
  moduleBackground,
  pivotColor,
} from '../Resources/Colors';
import { SliderComponent } from '../Components/Slider';
import { sortingAlgorithmsData } from '../Core/Data/SortingData';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../Store/Store';
import {
  updateSortingBarsStateAction,
  updateSortingInputStateAction,
  updatingIsInputNanState,
  updateIsInputOverMaxState,
} from '../Store/Sorting Module/SortingModuleStateManagement';
import { updateWindowWidthStateAction } from '../Store/Shared/WindowStateManagement';
import { ActionBar } from '../Components/ActionBar';
import {
  algorithmContext,
  algorithmIterationBaseTime,
  animationContext,
  minAnimationContainerHeight,
  minAppWidth,
} from '../Core/Helper';
import { ResetButton } from '../Components/ResetButton';
import { SortingAlgorithmsManager } from '../Core/Other/SortingAlgorithmsManager';
import { AnimationManager } from '../Core/Other/AnimationManager';
import { SortingBarStateEnum } from '../Resources/Enumerations';
import { AlgorithmsList } from '../Components/AlgorithmsList';
import { ISortingBarProps } from '../Core/Interfaces/ISortingBarProps';
import { updateCanAnimationBeStartedStateAction } from '../Store/Shared/AnimationStateManagement';
import { WarningMessageComponent } from '../Components/WarningMessage';

let sortingAlgorithmManager: SortingAlgorithmsManager = new SortingAlgorithmsManager(
  sortingAlgorithmsData[0].algorithm,
);
let sortingAnimationManager: AnimationManager = new AnimationManager(sortingAlgorithmManager);

let validSortingInput: string = '';
const sortingBarWidth: number = 35;
const getMaxBarsNumber = (windowWidth: number): number => {
  return Math.floor(Math.max(windowWidth, minAppWidth) / sortingBarWidth);
};

const SortingInputComponent = () => {
  const sortingModuleState = useSelector((state: AppState) => state.sortingModuleState);
  const animationState = useSelector((state: AppState) => state.animationState);
  const windowState = useSelector((state: AppState) => state.windowState);
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);

  const processInput = (currentInput: string) => {
    dispatch(updateSortingInputStateAction(currentInput));
    validSortingInput = '';
    let stringArrayInput = currentInput.split(' ');
    let sortingBars: ISortingBarProps[] = [];
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
    if (sortingBars.length !== 0) dispatch(updateCanAnimationBeStartedStateAction(true));
    else dispatch(updateCanAnimationBeStartedStateAction(false));

    dispatch(updateSortingBarsStateAction(sortingBars));
    sortingAlgorithmManager.isStateUpdated = true;
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
        min-height: 60px;
      `}
    >
      <input
        css={css`
          height: 20px;
          font-size: 16px;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
          ::placeholder {
            font-size: 16px;
            font-style: italic;
          }
        `}
        ref={ref}
        type="text"
        placeholder="Type several numbers..."
        value={sortingModuleState.sortingInput}
        onInput={() => processInput(ref.current?.value as string)}
        disabled={animationState.hasAnimationStarted}
      />

      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          font-size: 13px;
          color: white;
          font-weight: bold;
          height: 34px;
        `}
      >
        Ex:
        <div
          css={css`
            margin-left: 3px;
            margin-right: 5px;
            color: ${sortingModuleState.isInputNan ? errorMessageColor : 'white'};
          `}
        >
          "32 0 9 82".
        </div>
        <div
          css={css`
            margin-right: 5px;
          `}
        >
          Maximum recommended number of elements is {getMaxBarsNumber(windowState.windowWidth)}.
        </div>
        <div
          css={css`
            color: ${sortingModuleState.isInputOverMax ? errorMessageColor : 'white'};
            margin-right: 5px;
          `}
        >
          Maximum value is 99.
        </div>
        <div
          css={css`
            display: ${sortingModuleState.isInputNan || sortingModuleState.isInputOverMax
              ? 'flex'
              : 'none'};
            color: ${errorMessageColor};
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
  const animationState = useSelector((state: AppState) => state.animationState);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    generateElements();
  }, []);

  const generateElements = () => {
    if (animationState.hasAnimationStarted) return;
    if (inputRef.current === null) return;

    let sortingBars: ISortingBarProps[] = [];
    let newInput: string = '';

    if (getMaxBarsNumber(windowState.windowWidth) < parseInt(inputRef.current.value))
      inputRef.current.value = getMaxBarsNumber(windowState.windowWidth).toString();

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
    dispatch(updateCanAnimationBeStartedStateAction(true));
    sortingAlgorithmManager.isStateUpdated = true;
  };

  const handleEnterKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    generateElements();
  };

  const validateInput = (currentInput: string) => {
    if (inputRef.current === null) return;

    let maxBarsNumber: number = getMaxBarsNumber(windowState.windowWidth);
    inputRef.current.value =
      parseInt(currentInput) > maxBarsNumber
        ? maxBarsNumber.toString()
        : parseInt(currentInput) < 1
        ? '1'
        : currentInput;
  };

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 73px;
        min-width: 73px;
      `}
    >
      <ResetButton resetFunction={generateElements} />
      <input
        css={css`
          width: 40px;
          height: 14px;
          font-size: 13px;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
          ::placeholder {
            font-style: italic;
          }
        `}
        min={1}
        max={getMaxBarsNumber(windowState.windowWidth)}
        ref={inputRef}
        type="number"
        defaultValue={10}
        onInput={() => validateInput(inputRef.current?.value as string)}
        onKeyUp={handleEnterKeyUp}
        disabled={animationState.hasAnimationStarted}
      />
    </div>
  );
};

const SortingBarComponent = ({
  barHeight,
  barID,
  barState = SortingBarStateEnum.Unselected,
  leftOffset,
}: ISortingBarProps) => {
  let divRef = useRef<HTMLDivElement>(null);
  const sliderState = useSelector((state: AppState) => state.sliderComponentState);
  const animationState = useSelector((state: AppState) => state.animationState);

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

  const getColor = () => {
    switch (barState) {
      case SortingBarStateEnum.Unselected:
        return 'white';

      case SortingBarStateEnum.Selected:
        return checkedColor;

      case SortingBarStateEnum.Pivot:
        return pivotColor;

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
        height: 26%;
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
          justify-content: space-evenly;
        `}
      >
        <SortingInputComponent />
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: flex-start;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: flex-end;
              justify-content: space-between;
              min-width: 250px;
            `}
          >
            <animationContext.Provider value={{ animationManager: sortingAnimationManager }}>
              <ActionBar />
            </animationContext.Provider>
            <GenerateInputComponent />
          </div>

          <WarningMessageComponent message="Input is empty, animation is disabled." />
        </div>
      </div>
    </div>
  );
};

const AnimationComponent = () => {
  const sortingModuleState = useSelector((state: AppState) => state.sortingModuleState);

  return (
    <div
      css={css`
        height: 74%;
      `}
    >
      <div
        css={css`
          height: 6%;
          margin-left: 10px;
        `}
      >
        <algorithmContext.Provider value={{ algorithmManager: sortingAlgorithmManager }}>
          <AlgorithmsList data={sortingAlgorithmsData} />
        </algorithmContext.Provider>
      </div>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          background-color: ${moduleBackground};
          height: 94%;
          min-height: 500px;
        `}
      >
        <div
          css={css`
            display: flex;
            height: 70%;
            min-height: ${minAnimationContainerHeight}px;
            justify-content: center;
            align-items: flex-end;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: flex-end;
              justify-content: space-between;
              width: ${sortingModuleState.sortingBars.length * sortingBarWidth}px;
            `}
          >
            {sortingModuleState.sortingBars.map((bar, index) => (
              <SortingBarComponent
                key={index}
                barID={bar.barID}
                barHeight={bar.barHeight}
                barState={bar.barState}
                leftOffset={bar.leftOffset}
              />
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
          <animationContext.Provider value={{ animationManager: sortingAnimationManager }}>
            <SliderComponent />
          </animationContext.Provider>
        </div>
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
