/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { mainFontColor, moduleBackground } from '../Resources/Colors';
import { algorithmContext, animationContext } from '../Core/Helper';
import { ActionBar } from '../Components/ActionBar';
import { RefreshButton } from '../Components/RefreshButton';
import { pathFindingAlgorithmsData } from '../Core/Data/PathFindingData';
import { AnimationManager } from '../Core/Other/AnimationManager';
import { PathFindingAlgorithmsManager } from '../Core/Other/PathFindingAlgorithmsManager';
import { AlgorithmsList } from '../Components/AlgorithmsList';
import { SliderComponent } from '../Components/Slider';

let pathFindingAlgorithmManager: PathFindingAlgorithmsManager = new PathFindingAlgorithmsManager(pathFindingAlgorithmsData[0].algorithm);
let pathFindingAnimationManager: AnimationManager = new AnimationManager(pathFindingAlgorithmManager);

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
        Path Finding
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
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: flex-start;
          `}
        >
          <animationContext.Provider value={{ animationManager: pathFindingAnimationManager }}>
            <ActionBar />
          </animationContext.Provider>
          <RefreshButton refreshFunction={() => {}} />
        </div>
      </div>
    </div>
  );
};

const AnimationComponent = () => {
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
        <algorithmContext.Provider value={{ algorithmManager: pathFindingAlgorithmManager }}>
          <AlgorithmsList data={pathFindingAlgorithmsData} />
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
            min-height: 425px;
            justify-content: center;
            align-items: flex-end;
          `}
        >
          {/* <div
            css={css`
              display: flex;
              align-items: flex-end;
              justify-content: space-between;
              width: ${sortingModuleState.sortingBars.length * sortingBarWidth}px;
            `}
          >
            {sortingModuleState.sortingBars.map((bar, index) => (
              <SortingBarComponent key={index} barID={bar.barID} barHeight={bar.barHeight} barState={bar.barState} leftOffset={bar.leftOffset} />
            ))}
          </div> */}
        </div>
        <div
          css={css`
            display: flex;
            justify-content: flex-start;
            align-items: flex-end;
          `}
        >
          <animationContext.Provider value={{ animationManager: pathFindingAnimationManager }}>
            <SliderComponent />
          </animationContext.Provider>
        </div>
      </div>
    </div>
  );
};

export const PathFindingPage = () => {
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
