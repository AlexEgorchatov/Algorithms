/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { headerItemHovered, mainFontColor, moduleBackground } from '../Resources/Colors';
import { StringMatchingData, stringMatchingAlgorithms } from '../Resources/String Matching Page Resources/StringMatchingData';
import { StringMatchingAlgorithmBase, StringMatchingAlgorithmEnum } from '../Resources/Algorithms/AlgorithmBase';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { NaivePatternMatching } from '../Resources/Algorithms/StringMatchingAlgorithms';
import {
  updatingIsSearchingAlgorithmRunningStateAction,
  updatingSelectedStringMatchingAlgorithmState,
} from '../Store/String Matching Page/StringMatchingPageStateManagement';
import { updatingWindowHeightStateAction, updatingWindowWidthStateAction } from '../Store/Shared/WindowStateManagement';
import { animationContext, handleCompleteSearch, handleStartSearch, handleStopSearch } from '../Resources/Helper';
import { ActionBar } from '../Components/ActionBar';
import { SliderComponent } from '../Components/Slider';
import { RefreshButton } from '../Components/RefreshButton';

export let selectedStringMatchingAlgorithm: StringMatchingAlgorithmBase = new NaivePatternMatching(StringMatchingAlgorithmEnum.Naive);

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
        <input
          css={css`
            vertical-align: super;
            height: 15px;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            font-size: 14px;
          `}
          defaultValue="pattern"
          type="text"
        />
        <input
          css={css`
            height: 15px;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            font-size: 14px;
          `}
          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id egestas est. Curabitur nec lobortis diam, eu fringilla augue. Pellentesque ac metus finibus, convallis augue non, maximus lacus. Quisque in porta nisi. Mauris felis metus, tincidunt quis neque ac, feugiat sagittis erat. Aliquam vehicula augue gravida massa rhoncus, ut egestas nisi lacinia. Vivamus condimentum lorem turpis, eget tristique leo viverra tincidunt. Suspendisse ut augue a odio hendrerit molestie. Aliquam facilisis eu lacus sit amet accumsan. Praesent a libero convallis, pulvinar libero a, iaculis turpis. Phasellus viverra, mauris et dictum fermentum, velit ligula ullamcorper erat, ut pulvinar ex diam sit amet libero. Aliquam vitae est lectus. Sed mollis consequat finibus"
        />
        <div
          css={css`
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            width: 202px;
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
          `}
        ></div>
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
