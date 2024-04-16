/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { mainFontColor, moduleBackground } from '../Resources/Colors';
import { SliderComponent } from '../Components/Shared Components/Slider';
import { sortingAlgorithmsData } from '../Core/Data/SortingData';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../Redux/Store';
import { updateWindowWidthStateAction } from '../Redux/Shared/WindowStateManagement';
import { ActionBar } from '../Components/Shared Components/ActionBar';
import { algorithmContext, animationContext } from '../Core/Helpers/GeneralHelper';
import { SortingAlgorithmsManager } from '../Core/Other/SortingAlgorithmsManager';
import { AnimationManager } from '../Core/Other/AnimationManager';
import { AlgorithmsList } from '../Components/Shared Components/AlgorithmsList';
import { WarningMessageComponent } from '../Components/Shared Components/WarningMessage';
import {
  algorithmsListComponentHeight,
  animationEmptySpaceHeight,
  settingsComponentHeight,
  sortingBarWidth,
} from '../Resources/Constants';
import {
  GenerateInputComponent,
  SortingInputComponent,
} from '../Components/Page Components/Sorting Components/SortingInputHandlers';
import { SortingBarComponent } from '../Components/Page Components/Sorting Components/SortingBar';

let sortingAlgorithmManager: SortingAlgorithmsManager = new SortingAlgorithmsManager(
  sortingAlgorithmsData[0].algorithm,
);
let sortingAnimationManager: AnimationManager = new AnimationManager(sortingAlgorithmManager);

const SettingsComponent = () => {
  return (
    <div
      css={css`
        margin: 0px 10px;
        min-height: ${settingsComponentHeight}px;
        display: block;
      `}
    >
      Sorting
      <div
        css={css`
          height: 80%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
        `}
      >
        <SortingInputComponent sortingAlgorithmManager={sortingAlgorithmManager} />
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
            <GenerateInputComponent sortingAlgorithmManager={sortingAlgorithmManager} />
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
        height: calc(100% - ${settingsComponentHeight}px);
      `}
    >
      <algorithmContext.Provider value={{ algorithmManager: sortingAlgorithmManager }}>
        <AlgorithmsList data={sortingAlgorithmsData} />
      </algorithmContext.Provider>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          background-color: ${moduleBackground};
          height: calc(100% - ${algorithmsListComponentHeight}px);
          min-height: 300px;
        `}
      >
        <div
          css={css`
            display: flex;
            height: calc(100% - ${animationEmptySpaceHeight}px);
            justify-content: center;
          `}
        >
          <div
            css={css`
              display: flex;
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

        <animationContext.Provider value={{ animationManager: sortingAnimationManager }}>
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
        display: flex;
        flex-direction: column;
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
