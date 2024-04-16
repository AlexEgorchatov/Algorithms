/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../Redux/Store';
import { useEffect, useRef } from 'react';
import {
  updateIsInputOverMaxState,
  updateSortingBarsStateAction,
  updateSortingInputStateAction,
  updatingIsInputNanState,
} from '../../../Redux/Sorting Module/SortingModuleStateManagement';
import { ISortingBarProps } from '../../../Core/Interfaces/ISortingBarProps';
import { updateCanAnimationBeStartedStateAction } from '../../../Redux/Shared/AnimationStateManagement';
import { errorMessageColor } from '../../../Resources/Colors';
import { ResetButton } from '../../Shared Components/ResetButton';
import { minAppWidth, sortingBarWidth } from '../../../Resources/Constants';
import { isTouchDevice } from '../../../Core/Helpers/GeneralHelper';
import { SortingAlgorithmsManager } from '../../../Core/Other/SortingAlgorithmsManager';

let validSortingInput: string = '';
const getMaxBarsNumber = (windowWidth: number): number => {
  return Math.floor(Math.max(windowWidth, minAppWidth) / sortingBarWidth);
};

interface InputProps {
  sortingAlgorithmManager: SortingAlgorithmsManager;
}

export const GenerateInputComponent = ({ sortingAlgorithmManager }: InputProps) => {
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

export const SortingInputComponent = ({ sortingAlgorithmManager }: InputProps) => {
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

    dispatch(updatingIsInputNanState(isNotDigit));
    dispatch(updateIsInputOverMaxState(isOverMax));
    dispatch(updateCanAnimationBeStartedStateAction(sortingBars.length !== 0));
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
              ${!isTouchDevice &&
              `
                  cursor: pointer;
                `}
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
