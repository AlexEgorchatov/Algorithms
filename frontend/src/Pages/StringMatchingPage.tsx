/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useRef } from 'react';
import { errorMessageColor, headerItemHovered, mainFontColor, moduleBackground } from '../Resources/Colors';
import { StringMatchingData, stringMatchingAlgorithms } from '../Resources/String Matching Page Resources/StringMatchingData';
import { StringMatchingAlgorithmBase, StringMatchingAlgorithmEnum } from '../Resources/Algorithms/AlgorithmBase';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { NaivePatternMatching } from '../Resources/Algorithms/StringMatchingAlgorithms';
import {
  updatingIsSearchingAlgorithmRunningStateAction,
  updatingSelectedSearchingAlgorithmState,
  updatingStringMatchingAnimationPatternState,
  updatingStringMatchingInputState,
  updatingStringMatchingPatternState,
} from '../Store/String Matching Page/StringMatchingPageStateManagement';
import { updatingWindowWidthStateAction } from '../Store/Shared/WindowStateManagement';
import { animationContext, handleCompleteSearch, handleStartSearch, handleStopSearch } from '../Resources/Helper';
import { ActionBar } from '../Components/ActionBar';
import { SliderComponent } from '../Components/Slider';
import { RefreshButton } from '../Components/RefreshButton';
import { minAppWidth } from '../App';

const characterWidth: number = 16.5;
const inputTextWidth: number = 115.5;
const maxInputLinesNumber: number = 8;

interface AlgorithmListProps {
  data: StringMatchingData[];
}

interface AlgorithmProps {
  title: string;
  isSelected: boolean;
  stringMatchingAlgorithm: StringMatchingAlgorithmBase;
}

const AlgorithmComponent = ({ title, isSelected, stringMatchingAlgorithm }: AlgorithmProps) => {
  const algorithmState = useSelector((state: AppState) => state.sortingPageState);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (algorithmState.hasSortingAlgorithmStarted) return;
    selectedStringMatchingAlgorithm = stringMatchingAlgorithm;
    dispatch(updatingSelectedSearchingAlgorithmState(stringMatchingAlgorithm.stringMatchingAlgorithm));
  };

  return (
    <div
      css={css`
        font-size: 20px;
        color: ${isSelected ? '' : 'white'};
        margin-right: 10px;
        cursor: ${algorithmState.hasSortingAlgorithmStarted && !isSelected ? 'default' : 'pointer'};
        opacity: ${algorithmState.hasSortingAlgorithmStarted && !isSelected ? '0.5' : '1'};
        :hover {
          ${!algorithmState.hasSortingAlgorithmStarted &&
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
  const algorithmState = useSelector((state: AppState) => state.stringMatchingPageState);

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
          isSelected={algorithm.stringMatchingAlgorithm.stringMatchingAlgorithm === algorithmState.selectedSearchingAlgorithm}
          stringMatchingAlgorithm={algorithm.stringMatchingAlgorithm}
        />
      ))}
    </div>
  );
};

const StringMatchingPatternComponent = () => {
  const stringMatchingPageState = useSelector((state: AppState) => state.stringMatchingPageState);
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);

  const handlePatternChange = () => {
    if (ref.current === null) return;

    dispatch(updatingStringMatchingPatternState(ref.current.value));
    if (ref.current.value.length <= maxPatternLength) {
      dispatch(updatingStringMatchingAnimationPatternState(ref.current.value));
    }
  };

  return (
    <div
      css={css`
        width: 100%;
        display: grid;
      `}
    >
      <input
        css={css`
          height: 20px;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          font-size: 16px;
          ::placeholder {
            font-size: 16px;
            font-style: italic;
          }
        `}
        ref={ref}
        type="text"
        placeholder="Type a pattern to search..."
        value={stringMatchingPageState.stringMatchingPattern}
        onChange={handlePatternChange}
        disabled={stringMatchingPageState.hasSearchingAlgorithmStarted}
      />
      <div
        css={css`
          display: flex;
          color: white;
          font-size: 13px;
          min-width: 520px;
          font-weight: bold;
        `}
      >
        Ex: "Pattern 123". Maximum number of elements:
        <div
          css={css`
            color: white;
            margin-left: 3px;
            color: ${stringMatchingPageState.isPatternLengthOverMax ? errorMessageColor : 'white'};
          `}
        >
          {stringMatchingPageState.stringMatchingPatternLength}/{maxPatternLength}
        </div>
        .
        <div
          css={css`
            visibility: ${stringMatchingPageState.isPatternLengthOverMax ? 'visible' : 'hidden'};
            display: flex;
            color: ${errorMessageColor};
            margin-left: 5px;
          `}
        >
          Input has invalid format,
          <div
            css={css`
              margin-left: 5px;
              cursor: pointer;
              text-decoration: underline;
            `}
            onClick={() => dispatch(updatingStringMatchingPatternState(stringMatchingPageState.stringMatchingAnimationPattern))}
          >
            Fix
          </div>
        </div>
      </div>
    </div>
  );
};

const StringMatchingInputComponent = () => {
  const stringMatchingPageState = useSelector((state: AppState) => state.stringMatchingPageState);
  const windowState = useSelector((state: AppState) => state.windowState);
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div
      css={css`
        width: 100%;
        display: grid;
      `}
    >
      <input
        css={css`
          height: 20px;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          font-size: 16px;
          ::placeholder {
            font-size: 16px;
            font-style: italic;
          }
        `}
        ref={ref}
        type="text"
        placeholder="Type some text..."
        value={stringMatchingPageState.stringMatchingInput}
        onInput={() => dispatch(updatingStringMatchingInputState(ref.current?.value))}
        disabled={stringMatchingPageState.hasSearchingAlgorithmStarted}
      />
      <div
        css={css`
          display: flex;
          color: white;
          font-size: 13px;
          min-width: 520px;
          font-weight: bold;
        `}
      >
        Ex: "Input 123". Maximum recommended number of elements: {stringMatchingPageState.stringMatchingInputLength}/{getMaxInputLength(windowState.windowWidth)}.
      </div>
    </div>
  );
};

const SettingsComponent = () => {
  const stringMatchingPageState = useSelector((state: AppState) => state.stringMatchingPageState);
  const dispatch = useDispatch();

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
        String Matching
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
        <StringMatchingPatternComponent />
        <StringMatchingInputComponent />
        <div
          css={css`
            height: 65px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: flex-end;
              justify-content: space-between;
              width: 199px;
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
                  isAlgorithmRunning: stringMatchingPageState.isSearchingAlgorithmRunning,
                  hasAlgorithmStarted: stringMatchingPageState.hasSearchingAlgorithmStarted,
                  startButtonClick: handleStartSearch,
                  pauseButtonClick: () => dispatch(updatingIsSearchingAlgorithmRunningStateAction(false)),
                  stopButtonClick: handleStopSearch,
                  completeButtonClick: handleCompleteSearch,
                }}
              >
                <ActionBar />
              </animationContext.Provider>
            </div>
            <RefreshButton />
          </div>
          <AlgorithmsList data={stringMatchingAlgorithms} />
        </div>
      </div>
    </div>
  );
};

const AnimationComponent = () => {
  const stringMatchingPageState = useSelector((state: AppState) => state.stringMatchingPageState);
  const dispatch = useDispatch();

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
          flex-direction: column;
          height: 70%;
          min-height: 425px;
          padding: 0px 20px;
        `}
      >
        <div
          css={css`
            display: inline;
            word-break: break-all;
            align-items: flex-start;
            color: white;
            height: 120px;
            font-family: monospace;
            white-space: pre-wrap;
          `}
        >
          <span
            css={css`
              font-weight: 700;
              margin-right: 16px;
            `}
          >
            Pattern:
          </span>
          {stringMatchingPageState.stringMatchingAnimationPattern}
        </div>
        <div
          css={css`
            display: inline;
            word-break: break-all;
            align-items: flex-start;
            color: white;
            max-height: 290px;
            font-family: monospace;
            white-space: pre-wrap;
            overflow-y: auto;
          `}
        >
          <span
            css={css`
              font-weight: 700;
              margin-right: 16px;
            `}
          >
            Input:
          </span>
          {stringMatchingPageState.stringMatchingInput}
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
            isAlgorithmRunning: stringMatchingPageState.isSearchingAlgorithmRunning,
            hasAlgorithmStarted: stringMatchingPageState.hasSearchingAlgorithmStarted,
            startButtonClick: handleStartSearch,
            pauseButtonClick: () => dispatch(updatingIsSearchingAlgorithmRunningStateAction(false)),
            stopButtonClick: handleStopSearch,
            completeButtonClick: handleCompleteSearch,
          }}
        >
          <SliderComponent />
        </animationContext.Provider>
      </div>
    </div>
  );
};

export const StringMatchingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleWindowResize = () => {
      dispatch(updatingWindowWidthStateAction(window.innerWidth));
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

export let selectedStringMatchingAlgorithm: StringMatchingAlgorithmBase = new NaivePatternMatching(StringMatchingAlgorithmEnum.Naive);
export const maxPatternLength: number = 60;

const getMaxInputLength = (windowWidth: number): number => {
  return Math.floor(((Math.max(minAppWidth, windowWidth) - 40) * maxInputLinesNumber - inputTextWidth) / characterWidth);
};
