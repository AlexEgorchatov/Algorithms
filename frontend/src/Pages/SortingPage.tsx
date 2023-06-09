/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useRef } from 'react';
import { headerItemHovered, mainFontColor, moduleBackground } from '../Resources/Colors';
import { SliderComponent } from '../Components/Slider';
import { SortingData, sortingAlgorithms } from '../Resources/Sorting Page Resources/SortingData';
import { useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { useDispatch } from 'react-redux';
import {
  updatingSortingAlgorithmStateAction,
  updatingSortingGenerateInputStateAction,
  updatingSortingHeightsStateAction,
  updatingSortingInputStateAction,
} from '../Store/Sorting Page/SortingAlgorithmStateManagement';
import { updatingPauseVisibilityStateAction } from '../Store/Shared/SliderComponentStateManagement';

interface SortingBarProps {
  height: number;
}

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
    let heightsCopy = currentInput.split(' ');
    if (isNaN(parseInt(heightsCopy[heightsCopy.length - 1]))) heightsCopy.pop();
    dispatch(updatingSortingHeightsStateAction(heightsCopy));
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
  const dispatch = useDispatch();

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
        onClick={() => dispatch(updatingPauseVisibilityStateAction(true))}
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

  const validateInput = (currentInput: string) => {
    let inputNumber: number = parseInt(currentInput);
    if (inputNumber / 100 > 1 || inputNumber > 25) return;

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
        max={25}
        ref={ref}
        type="number"
        value={algorithmState.initialSortingGenerateInput}
        onInput={() => validateInput(ref.current?.value as string)}
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

const SortingBar = ({ height }: SortingBarProps) => {
  return (
    <div>
      <div
        css={css`
          display: ${isNaN(height) ? 'none' : ''};
          background-color: white;
          width: 25px;
          height: ${height * 4}px;
          position: relative;
        `}
      ></div>
      <div
        css={css`
          display: flex;
          justify-content: center;
          color: white;
          font-size: 20px;
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
              width: ${algorithmState.initialSortingHeights.length * 40}px;
            `}
          >
            {algorithmState.initialSortingHeights.map((height, index) => (
              <SortingBar key={index} height={parseInt(height)} />
            ))}
          </div>
        </div>

        <SliderComponent />
      </div>
    </div>
  );
};

/*
1 2 91 90 10 9 29 27 2 71 27 12 51 17 10 11 2 49 71 16
*/
