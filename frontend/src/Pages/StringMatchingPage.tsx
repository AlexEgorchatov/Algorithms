/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useRef } from 'react';
import { mainFontColor, moduleBackground } from '../Resources/Colors';
import { stringMatchingAlgorithmsData } from '../Core/Data/StringMatchingData';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../Redux/Store';
import {
  updateStringMatchingAnimationInputState,
  updateStringMatchingInputState,
  updateStringMatchingPatternState,
} from '../Redux/String Matching Module/StringMatchingModuleStateManagement';
import { algorithmContext, animationContext } from '../Core/Helpers/GeneralHelper';
import { ActionBar } from '../Components/Shared Components/ActionBar';
import { SliderComponent } from '../Components/Shared Components/Slider';
import { ResetButton } from '../Components/Shared Components/ResetButton';
import { StringMatchingAlgorithmsManager } from '../Core/Other/StringMatchingAlgorithmsManager';
import { AnimationManager } from '../Core/Other/AnimationManager';
import { AlgorithmsList } from '../Components/Shared Components/AlgorithmsList';
import { WarningMessageComponent } from '../Components/Shared Components/WarningMessage';
import {
  algorithmsListComponentHeight,
  animationEmptySpaceHeight,
  renderedInput,
  renderedPattern,
  settingsComponentHeight,
} from '../Resources/Constants';
import {
  StringMatchingInputComponent,
  StringMatchingPatternComponent,
} from '../Components/Page Components/String Matching Components/StringMatchingInputHandlers';
import { StringMatchingCharacterComponent } from '../Components/Page Components/String Matching Components/Character';

let stringMatchingAlgorithmManager: StringMatchingAlgorithmsManager =
  new StringMatchingAlgorithmsManager(stringMatchingAlgorithmsData[0].algorithm);
let stringMatchingAnimationManager: AnimationManager = new AnimationManager(
  stringMatchingAlgorithmManager,
);

const SettingsComponent = () => {
  const stringMatchingModuleState = useSelector(
    (state: AppState) => state.stringMatchingModuleState,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    resetState();
  }, []);

  const resetState = () => {
    dispatch(updateStringMatchingPatternState(renderedPattern));
    dispatch(updateStringMatchingInputState(renderedInput));
    if (
      stringMatchingModuleState.stringMatchingInput === renderedInput &&
      stringMatchingAlgorithmManager.initialState.length > 0
    )
      dispatch(
        updateStringMatchingAnimationInputState(stringMatchingAlgorithmManager.initialState),
      );
  };

  return (
    <div
      css={css`
        margin: 0px 10px;
        min-height: ${settingsComponentHeight}px;
        display: block;
      `}
    >
      String Matching
      <div
        css={css`
          height: 80%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        `}
      >
        <StringMatchingPatternComponent
          stringMatchingAlgorithmManager={stringMatchingAlgorithmManager}
        />
        <StringMatchingInputComponent
          stringMatchingAlgorithmManager={stringMatchingAlgorithmManager}
        />
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
              min-width: 200px;
            `}
          >
            <animationContext.Provider value={{ animationManager: stringMatchingAnimationManager }}>
              <ActionBar />
            </animationContext.Provider>
            <ResetButton resetFunction={resetState} />
          </div>

          <WarningMessageComponent
            message={stringMatchingModuleState.stringMatchingWarningMessage}
          />
        </div>
      </div>
    </div>
  );
};

const AnimationComponent = () => {
  const stringMatchingModuleState = useSelector(
    (state: AppState) => state.stringMatchingModuleState,
  );
  const patternRef = useRef<HTMLDivElement>(null);

  return (
    <div
      css={css`
        height: calc(100% - ${settingsComponentHeight}px);
      `}
    >
      <algorithmContext.Provider value={{ algorithmManager: stringMatchingAlgorithmManager }}>
        <AlgorithmsList data={stringMatchingAlgorithmsData} />
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
            display: block;
            height: calc(100% - ${animationEmptySpaceHeight}px);
            padding: 0px 20px;
            color: white;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-wrap: wrap;
              align-content: flex-start;
              font-family: monospace;
              margin-bottom: 20px;
            `}
            ref={patternRef}
          >
            <span
              css={css`
                font-weight: 700;
                width: 150px;
              `}
            >
              Pattern:
            </span>
            {stringMatchingModuleState.stringMatchingAnimationPattern.map((character, index) => (
              <StringMatchingCharacterComponent
                key={index}
                character={character.character}
                characterState={character.characterState}
              />
            ))}
          </div>
          <div
            css={css`
              display: flex;
              flex-wrap: wrap;
              max-height: calc(100% - ${patternRef.current?.offsetHeight}px - 20px);
              font-family: monospace;
              overflow-y: auto;
            `}
          >
            <span
              css={css`
                font-weight: 700;
                width: 115.5px;
              `}
            >
              Input:
            </span>
            {stringMatchingModuleState.stringMatchingAnimationInput.map((character, index) => (
              <StringMatchingCharacterComponent
                key={index}
                character={character.character}
                characterState={character.characterState}
              />
            ))}
          </div>
        </div>

        <animationContext.Provider value={{ animationManager: stringMatchingAnimationManager }}>
          <SliderComponent />
        </animationContext.Provider>
      </div>
    </div>
  );
};

export const StringMatchingPage = () => {
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
