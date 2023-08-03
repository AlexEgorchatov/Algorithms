/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useRef } from 'react';
import { headerItemHovered, mainFontColor, moduleBackground } from '../Resources/Colors';
import { StringMatchingData, stringMatchingAlgorithms } from '../Resources/String Matching Page Resources/StringMatchingData';
import { StringMatchingAlgorithmBase, StringMatchingAlgorithmEnum } from '../Resources/Algorithms/AlgorithmBase';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { NaivePatternMatching } from '../Resources/Algorithms/StringMatchingAlgorithms';
import {
  updatingIsSearchingAlgorithmRunningStateAction,
  updatingSelectedStringMatchingAlgorithmState,
  updatingStringMatchingInputState,
  updatingStringMatchingPatternLengthState,
  updatingStringMatchingPatternState,
} from '../Store/String Matching Page/StringMatchingPageStateManagement';
import { updatingWindowHeightStateAction, updatingWindowWidthStateAction } from '../Store/Shared/WindowStateManagement';
import { animationContext, handleCompleteSearch, handleStartSearch, handleStopSearch } from '../Resources/Helper';
import { ActionBar } from '../Components/ActionBar';
import { SliderComponent } from '../Components/Slider';
import { RefreshButton } from '../Components/RefreshButton';
import { minAppWidth } from '../App';

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
    dispatch(updatingSelectedStringMatchingAlgorithmState(stringMatchingAlgorithm.stringMatchingAlgorithm));
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
          isSelected={algorithm.stringMatchingAlgorithm.stringMatchingAlgorithm === algorithmState.selectedStringMatchingAlgorithm}
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
    dispatch(updatingStringMatchingPatternState(ref.current?.value));
    dispatch(updatingStringMatchingPatternLengthState(ref.current?.value.length));
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
        onInput={handlePatternChange}
        disabled={stringMatchingPageState.hasSearchingAlgorithmStarted}
        maxLength={50}
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
        Ex: "Pattern 123". Characters typed: {stringMatchingPageState.stringMatchingPatternLength}/50.
      </div>
    </div>
  );
};

const StringMatchingInputComponent = () => {
  const stringMatchingPageState = useSelector((state: AppState) => state.stringMatchingPageState);
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //TODO: doesn't work, fix it later
    return /[A-Za-z0-9]/.test(e.key);
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
        placeholder="Type some text..."
        onKeyDown={handleInputKeyDown}
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
        Ex: "Search in this text". Maximum recommended number of elements is ##.
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
        <p
          css={css`
            display: inline;
            word-break: break-all;
            align-items: flex-start;
            margin: 0px;
            color: white;
            height: 130px;
          `}
        >
          Pattern: {stringMatchingPageState.stringMatchingPattern}
        </p>
        <p
          css={css`
            display: inline;
            word-break: break-all;
            align-items: flex-start;
            margin: 0px;
            color: white;
          `}
        >
          Input: {stringMatchingPageState.stringMatchingInput}
        </p>
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

// const getMaxInputLength = (windowWidth: number): number => {
//   return Math.floor(Math.max(windowWidth, minAppWidth) / sortingBarWidth);
// };
