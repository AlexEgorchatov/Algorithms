/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useRef } from 'react';
import { errorMessageColor, mainFontColor, moduleBackground, pivotColor } from '../Resources/Colors';
import { stringMatchingAlgorithmsData } from '../Core/Data/StringMatchingData';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import {
  StringMatchingModuleState,
  updateStringMatchingAnimationInputState,
  updateStringMatchingAnimationPatternState,
  updateStringMatchingInputState,
  updateStringMatchingPatternState,
  updateWarningMessageState,
} from '../Store/String Matching Module/StringMatchingModuleStateManagement';
import { algorithmContext, animationContext } from '../Core/Helper';
import { ActionBar } from '../Components/ActionBar';
import { SliderComponent } from '../Components/Slider';
import { RefreshButton } from '../Components/RefreshButton';
import { StringMatchingAlgorithmsManager } from '../Core/Other/StringMatchingAlgorithmsManager';
import { AnimationManager } from '../Core/Other/AnimationManager';
import { StringMatchingCharacterStateEnum } from '../Resources/Enumerations';
import { AlgorithmsList } from '../Components/AlgorithmsList';
import { IStringMatchingCharacterProps } from '../Core/Interfaces/IStringMatchingCharacterProps';
import { WarningMessageComponent } from '../Components/WarningMessage';
import { updateCanAnimationBeStartedStateAction } from '../Store/Shared/AnimationStateManagement';

let stringMatchingAlgorithmManager: StringMatchingAlgorithmsManager = new StringMatchingAlgorithmsManager(stringMatchingAlgorithmsData[0].algorithm);
let stringMatchingAnimationManager: AnimationManager = new AnimationManager(stringMatchingAlgorithmManager);

export const maxStringMatchingInputLength: number = 200;
export const maxStringMatchingPatternLength: number = 60;
export const renderedPattern: string = 'was';
export const renderedInput: string =
  "Was it a whisper or was it the wind? He wasn't quite sure. He thought he heard a voice but at this moment all he could hear was the wind rustling the leaves of the trees all around him.";

const processStringMatchingInput = (input: string): IStringMatchingCharacterProps[] => {
  let stringArrayInput = input.split('');
  let stringMatchingCharacters: IStringMatchingCharacterProps[] = [];

  for (let i = 0; i < stringArrayInput.length; i++) {
    stringMatchingCharacters.push({ character: stringArrayInput[i] });
  }

  return stringMatchingCharacters;
};

const StringMatchingPatternComponent = () => {
  const stringMatchingModuleState = useSelector((state: AppState) => state.stringMatchingModuleState);
  const algorithmState = useSelector((state: AppState) => state.animationState);
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (stringMatchingModuleState.stringMatchingPattern.length <= maxStringMatchingPatternLength) {
      dispatch(updateStringMatchingAnimationPatternState(processStringMatchingInput(stringMatchingModuleState.stringMatchingPattern)));
      dispatch(updateStringMatchingAnimationInputState(processStringMatchingInput(stringMatchingModuleState.stringMatchingInput)));
      stringMatchingAlgorithmManager.isStateUpdated = true;

      if (stringMatchingModuleState.stringMatchingPattern.length === 0) {
        dispatch(updateCanAnimationBeStartedStateAction(false));
        dispatch(updateWarningMessageState('At least one textbox is empty, animation is disabled'));
      } else if (stringMatchingModuleState.stringMatchingInput.length < stringMatchingModuleState.stringMatchingPattern.length) {
        dispatch(updateCanAnimationBeStartedStateAction(false));
        dispatch(updateWarningMessageState('Input is shorter than pattern, animation is disabled'));
      } else dispatch(updateCanAnimationBeStartedStateAction(true));
    }
  }, [stringMatchingModuleState.stringMatchingPattern]);

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
        value={stringMatchingModuleState.stringMatchingPattern}
        onChange={() => dispatch(updateStringMatchingPatternState(ref.current?.value))}
        disabled={algorithmState.hasAnimationStarted}
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
            color: ${stringMatchingModuleState.stringMatchingPattern.length > maxStringMatchingPatternLength ? errorMessageColor : 'white'};
          `}
        >
          {stringMatchingModuleState.stringMatchingPattern.length}/{maxStringMatchingPatternLength}
        </div>
        .
        <div
          css={css`
            visibility: ${stringMatchingModuleState.stringMatchingPattern.length > maxStringMatchingPatternLength ? 'visible' : 'hidden'};
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
            onClick={() => dispatch(updateStringMatchingPatternState(stringMatchingModuleState.stringMatchingAnimationPattern.map((i) => i.character).join('')))}
          >
            Fix
          </div>
        </div>
      </div>
    </div>
  );
};

const StringMatchingInputComponent = () => {
  const stringMatchingModuleState = useSelector((state: AppState) => state.stringMatchingModuleState);
  const algorithmState = useSelector((state: AppState) => state.animationState);
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (stringMatchingModuleState.stringMatchingInput.length <= maxStringMatchingInputLength) {
      dispatch(updateStringMatchingAnimationInputState(processStringMatchingInput(stringMatchingModuleState.stringMatchingInput)));
      stringMatchingAlgorithmManager.isStateUpdated = true;

      if (stringMatchingModuleState.stringMatchingInput.length === 0) {
        dispatch(updateCanAnimationBeStartedStateAction(false));
        dispatch(updateWarningMessageState('At least one textbox is empty, animation is disabled'));
      } else if (stringMatchingModuleState.stringMatchingInput.length < stringMatchingModuleState.stringMatchingPattern.length) {
        dispatch(updateCanAnimationBeStartedStateAction(false));
        dispatch(updateWarningMessageState('Input is shorter than pattern, animation is disabled'));
      } else dispatch(updateCanAnimationBeStartedStateAction(true));
    }
  }, [stringMatchingModuleState.stringMatchingInput]);

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
        value={stringMatchingModuleState.stringMatchingInput}
        onInput={() => dispatch(updateStringMatchingInputState(ref.current?.value))}
        disabled={algorithmState.hasAnimationStarted}
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
        Ex: "Input 123". Maximum number of elements:
        <div
          css={css`
            color: white;
            margin-left: 3px;
            color: ${stringMatchingModuleState.stringMatchingInput.length > maxStringMatchingInputLength ? errorMessageColor : 'white'};
          `}
        >
          {stringMatchingModuleState.stringMatchingInput.length}/{maxStringMatchingInputLength}
        </div>
        .
        <div
          css={css`
            visibility: ${stringMatchingModuleState.stringMatchingInput.length > maxStringMatchingInputLength ? 'visible' : 'hidden'};
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
            onClick={() => dispatch(updateStringMatchingInputState(stringMatchingModuleState.stringMatchingAnimationInput.map((i) => i.character).join('')))}
          >
            Fix
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsComponent = () => {
  const stringMatchingModuleState = useSelector((state: AppState) => state.stringMatchingModuleState);
  const dispatch = useDispatch();

  useEffect(() => {
    refreshState();
  }, []);

  const refreshState = () => {
    dispatch(updateStringMatchingPatternState(renderedPattern));
    dispatch(updateStringMatchingInputState(renderedInput));
  };

  return (
    <div
      css={css`
        margin: 0px 10px;
        height: 30%;
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
              align-items: center;
              justify-content: flex-start;
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
                width: 200px;
              `}
            >
              <animationContext.Provider value={{ animationManager: stringMatchingAnimationManager }}>
                <ActionBar />
              </animationContext.Provider>
              <RefreshButton refreshFunction={refreshState} />
            </div>

            <WarningMessageComponent message={stringMatchingModuleState.warningMessage} />
          </div>

          <algorithmContext.Provider value={{ algorithmManager: stringMatchingAlgorithmManager }}>
            <AlgorithmsList data={stringMatchingAlgorithmsData} />
          </algorithmContext.Provider>
        </div>
      </div>
    </div>
  );
};

const AnimationComponent = () => {
  const stringMatchingModuleState = useSelector((state: AppState) => state.stringMatchingModuleState);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        background-color: ${moduleBackground};
        height: 70%;
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
          color: white;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            min-height: 120px;
            font-family: monospace;
          `}
        >
          <span
            css={css`
              font-weight: 700;
              width: 148.5px;
            `}
          >
            Pattern:
          </span>
          {stringMatchingModuleState.stringMatchingAnimationPattern.map((character, index) => (
            <StringMatchingCharacterComponent key={index} character={character.character} characterState={character.characterState} />
          ))}
        </div>
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
            max-height: 290px;
            font-family: monospace;
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
            <StringMatchingCharacterComponent key={index} character={character.character} characterState={character.characterState} />
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
        <animationContext.Provider value={{ animationManager: stringMatchingAnimationManager }}>
          <SliderComponent />
        </animationContext.Provider>
      </div>
    </div>
  );
};

const StringMatchingCharacterComponent = ({ character, characterState = StringMatchingCharacterStateEnum.Unselected }: IStringMatchingCharacterProps) => {
  const setFont = () => {
    switch (characterState) {
      case StringMatchingCharacterStateEnum.Unselected:
        return 'color: white; background-color: transparent';

      case StringMatchingCharacterStateEnum.Checked:
        return 'color: white; background-color: orange';

      case StringMatchingCharacterStateEnum.Current:
        return `color: black; background-color: ${pivotColor}`;

      case StringMatchingCharacterStateEnum.Found:
        return 'color: black; background-color: #ffff00';
    }
  };

  return (
    <div
      css={css`
        width: 16.5px;
        ${setFont()}
      `}
    >
      {character}
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
