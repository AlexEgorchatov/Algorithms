/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useRef } from 'react';
import { errorMessageColor, headerItemHovered, mainFontColor, moduleBackground, pivotColor } from '../Resources/Colors';
import { StringMatchingData, stringMatchingAlgorithmsData } from '../Core/Data/StringMatchingData';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import {
  updateSelectedSearchingAlgorithmState,
  updateStringMatchingInputState,
  updateStringMatchingPatternState,
} from '../Store/String Matching Page/StringMatchingPageStateManagement';
import { animationContext } from '../Core/Helper';
import { ActionBar } from '../Components/ActionBar';
import { SliderComponent } from '../Components/Slider';
import { RefreshButton } from '../Components/RefreshButton';
import { StringMatchingAlgorithmBase } from '../Core/Abstractions/AlgorithmBase';
import { StringMatchingAlgorithmManager } from '../Core/Other/StringMatchingAlgorithmManager';

export enum StringMatchingCharacterState {
  Unselected = 0,
  Checked = 1,
  Current = 2,
  Found = 3,
}
export interface StringMatchingCharacterProps {
  character: string;
  characterState?: StringMatchingCharacterState;
}
export let selectedStringMatchingAlgorithm: StringMatchingAlgorithmBase = stringMatchingAlgorithmsData[0].stringMatchingAlgorithm;
export const maxStringMatchingInputLength: number = 200;
export const maxStringMatchingPatternLength: number = 60;
export const renderedPatter: string = 'was';
export const renderedInput: string =
  "Was it a whisper or was it the wind? He wasn't quite sure. He thought he heard a voice but at this moment all he could hear was the wind rustling the leaves of the trees all around him.";

interface AlgorithmListProps {
  data: StringMatchingData[];
}

interface AlgorithmProps {
  title: string;
  isSelected: boolean;
  stringMatchingAlgorithm: StringMatchingAlgorithmBase;
}

const AlgorithmComponent = ({ title, isSelected, stringMatchingAlgorithm }: AlgorithmProps) => {
  const algorithmState = useSelector((state: AppState) => state.animationState);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (algorithmState.hasAnimationStarted) return;
    selectedStringMatchingAlgorithm = stringMatchingAlgorithm;
    dispatch(updateSelectedSearchingAlgorithmState(stringMatchingAlgorithm.stringMatchingAlgorithm));
  };

  return (
    <div
      css={css`
        font-size: 20px;
        color: ${isSelected ? '' : 'white'};
        margin-right: 10px;
        cursor: ${algorithmState.hasAnimationStarted && !isSelected ? 'default' : 'pointer'};
        opacity: ${algorithmState.hasAnimationStarted && !isSelected ? '0.5' : '1'};
        :hover {
          ${!algorithmState.hasAnimationStarted &&
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
  const algorithmState = useSelector((state: AppState) => state.animationState);
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(updateStringMatchingPatternState(renderedPatter));
  }, []);

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
            color: ${stringMatchingPageState.stringMatchingPattern.length > maxStringMatchingPatternLength ? errorMessageColor : 'white'};
          `}
        >
          {stringMatchingPageState.stringMatchingPattern.length}/{maxStringMatchingPatternLength}
        </div>
        .
        <div
          css={css`
            visibility: ${stringMatchingPageState.stringMatchingPattern.length > maxStringMatchingPatternLength ? 'visible' : 'hidden'};
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
            onClick={() => dispatch(updateStringMatchingPatternState(stringMatchingPageState.stringMatchingAnimationPattern.map((i) => i.character).join('')))}
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
  const algorithmState = useSelector((state: AppState) => state.animationState);
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(updateStringMatchingInputState(renderedInput));
  }, []);

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
            color: ${stringMatchingPageState.stringMatchingInput.length > maxStringMatchingInputLength ? errorMessageColor : 'white'};
          `}
        >
          {stringMatchingPageState.stringMatchingInput.length}/{maxStringMatchingInputLength}
        </div>
        .
        <div
          css={css`
            visibility: ${stringMatchingPageState.stringMatchingInput.length > maxStringMatchingInputLength ? 'visible' : 'hidden'};
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
            onClick={() => dispatch(updateStringMatchingInputState(stringMatchingPageState.stringMatchingAnimationInput.map((i) => i.character).join('')))}
          >
            Fix
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsComponent = () => {
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
                  startAlgorithm: () => StringMatchingAlgorithmManager.startAlgorithm(),
                  stopAlgorithm: () => StringMatchingAlgorithmManager.stopAlgorithm(),
                  completeAlgorithm: () => StringMatchingAlgorithmManager.completeAlgorithm(),
                }}
              >
                <ActionBar />
              </animationContext.Provider>
            </div>
            <RefreshButton />
          </div>
          <AlgorithmsList data={stringMatchingAlgorithmsData} />
        </div>
      </div>
    </div>
  );
};

const AnimationComponent = () => {
  const stringMatchingPageState = useSelector((state: AppState) => state.stringMatchingPageState);

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
          {stringMatchingPageState.stringMatchingAnimationPattern.map((character, index) => (
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
          {stringMatchingPageState.stringMatchingAnimationInput.map((character, index) => (
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
        <animationContext.Provider
          value={{
            startAlgorithm: () => StringMatchingAlgorithmManager.startAlgorithm(),
            stopAlgorithm: () => StringMatchingAlgorithmManager.stopAlgorithm(),
            completeAlgorithm: () => StringMatchingAlgorithmManager.completeAlgorithm(),
          }}
        >
          <SliderComponent />
        </animationContext.Provider>
      </div>
    </div>
  );
};

const StringMatchingCharacterComponent = ({ character, characterState = StringMatchingCharacterState.Unselected }: StringMatchingCharacterProps) => {
  const setFont = () => {
    switch (characterState) {
      case StringMatchingCharacterState.Unselected:
        return 'color: white; background-color: transparent';

      case StringMatchingCharacterState.Checked:
        return 'color: white; background-color: orange';

      case StringMatchingCharacterState.Current:
        return `color: black; background-color: ${pivotColor}`;

      case StringMatchingCharacterState.Found:
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
