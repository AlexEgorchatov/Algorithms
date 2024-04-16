/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../Redux/Store';
import { useEffect, useRef } from 'react';
import {
  maxStringMatchingInputLength,
  maxStringMatchingPatternLength,
} from '../../../Resources/Constants';
import {
  updateStringMatchingAnimationInputState,
  updateStringMatchingAnimationPatternState,
  updateStringMatchingInputState,
  updateStringMatchingPatternState,
  updateStringMatchingWarningMessageState,
} from '../../../Redux/String Matching Module/StringMatchingModuleStateManagement';
import { processStringMatchingInput } from '../../../Core/Helpers/StringMatchingHelper';
import { updateCanAnimationBeStartedStateAction } from '../../../Redux/Shared/AnimationStateManagement';
import { errorMessageColor } from '../../../Resources/Colors';
import { isTouchDevice } from '../../../Core/Helpers/GeneralHelper';
import { StringMatchingAlgorithmsManager } from '../../../Core/Other/StringMatchingAlgorithmsManager';

interface InputProps {
  stringMatchingAlgorithmManager: StringMatchingAlgorithmsManager;
}

export const StringMatchingPatternComponent = ({ stringMatchingAlgorithmManager }: InputProps) => {
  const stringMatchingModuleState = useSelector(
    (state: AppState) => state.stringMatchingModuleState,
  );
  const animationState = useSelector((state: AppState) => state.animationState);
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (stringMatchingModuleState.stringMatchingPattern.length <= maxStringMatchingPatternLength) {
      dispatch(
        updateStringMatchingAnimationPatternState(
          processStringMatchingInput(stringMatchingModuleState.stringMatchingPattern),
        ),
      );
      dispatch(
        updateStringMatchingAnimationInputState(
          processStringMatchingInput(stringMatchingModuleState.stringMatchingInput),
        ),
      );
      stringMatchingAlgorithmManager.isStateUpdated = true;

      if (
        stringMatchingModuleState.stringMatchingPattern.length === 0 &&
        stringMatchingModuleState.stringMatchingInput.length === 0
      ) {
        dispatch(updateCanAnimationBeStartedStateAction(false));
        dispatch(
          updateStringMatchingWarningMessageState(
            'Pattern and Input are empty, animation is disabled',
          ),
        );
      } else if (stringMatchingModuleState.stringMatchingPattern.length === 0) {
        dispatch(updateCanAnimationBeStartedStateAction(false));
        dispatch(
          updateStringMatchingWarningMessageState('Pattern is empty, animation is disabled'),
        );
      } else if (stringMatchingModuleState.stringMatchingInput.length === 0) {
        dispatch(updateCanAnimationBeStartedStateAction(false));
        dispatch(updateStringMatchingWarningMessageState('Input is empty, animation is disabled'));
      } else if (
        stringMatchingModuleState.stringMatchingInput.length <
        stringMatchingModuleState.stringMatchingPattern.length
      ) {
        dispatch(updateCanAnimationBeStartedStateAction(false));
        dispatch(
          updateStringMatchingWarningMessageState(
            'Input is shorter than pattern, animation is disabled',
          ),
        );
      } else dispatch(updateCanAnimationBeStartedStateAction(true));
    }
  }, [stringMatchingModuleState.stringMatchingPattern]);

  return (
    <div
      css={css`
        width: 100%;
        display: grid;
        height: 60px;
      `}
    >
      <input
        css={css`
          height: 20px;
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
        disabled={animationState.hasAnimationStarted}
      />
      <div
        css={css`
          display: flex;
          color: white;
          font-size: 13px;
          height: 34px;
          font-weight: bold;
          flex-wrap: wrap;
        `}
      >
        Ex: "Pattern 123". Maximum number of elements:
        <div
          css={css`
            color: white;
            margin-left: 3px;
            margin-right: 5px;
            color: ${stringMatchingModuleState.stringMatchingPattern.length >
            maxStringMatchingPatternLength
              ? errorMessageColor
              : 'white'};
          `}
        >
          {stringMatchingModuleState.stringMatchingPattern.length}/{maxStringMatchingPatternLength}.
        </div>
        <div
          css={css`
            display: ${stringMatchingModuleState.stringMatchingPattern.length >
            maxStringMatchingPatternLength
              ? 'flex'
              : 'none'};
            color: ${errorMessageColor};
          `}
        >
          Pattern has invalid format,
          <div
            css={css`
              margin-left: 5px;
              ${!isTouchDevice &&
              `
                  cursor: pointer;
                `}
              text-decoration: underline;
            `}
            onClick={() =>
              dispatch(
                updateStringMatchingPatternState(
                  stringMatchingModuleState.stringMatchingAnimationPattern
                    .map((i) => i.character)
                    .join(''),
                ),
              )
            }
          >
            Fix
          </div>
        </div>
      </div>
    </div>
  );
};

export const StringMatchingInputComponent = ({ stringMatchingAlgorithmManager }: InputProps) => {
  const stringMatchingModuleState = useSelector(
    (state: AppState) => state.stringMatchingModuleState,
  );
  const animationState = useSelector((state: AppState) => state.animationState);
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (stringMatchingModuleState.stringMatchingInput.length <= maxStringMatchingInputLength) {
      dispatch(
        updateStringMatchingAnimationInputState(
          processStringMatchingInput(stringMatchingModuleState.stringMatchingInput),
        ),
      );
      stringMatchingAlgorithmManager.isStateUpdated = true;

      if (
        stringMatchingModuleState.stringMatchingPattern.length === 0 &&
        stringMatchingModuleState.stringMatchingInput.length === 0
      ) {
        dispatch(updateCanAnimationBeStartedStateAction(false));
        dispatch(
          updateStringMatchingWarningMessageState(
            'Pattern and Input are empty, animation is disabled',
          ),
        );
      } else if (stringMatchingModuleState.stringMatchingPattern.length === 0) {
        dispatch(updateCanAnimationBeStartedStateAction(false));
        dispatch(
          updateStringMatchingWarningMessageState('Pattern is empty, animation is disabled'),
        );
      } else if (stringMatchingModuleState.stringMatchingInput.length === 0) {
        dispatch(updateCanAnimationBeStartedStateAction(false));
        dispatch(updateStringMatchingWarningMessageState('Input is empty, animation is disabled'));
      } else if (
        stringMatchingModuleState.stringMatchingInput.length <
        stringMatchingModuleState.stringMatchingPattern.length
      ) {
        dispatch(updateCanAnimationBeStartedStateAction(false));
        dispatch(
          updateStringMatchingWarningMessageState(
            'Input is shorter than pattern, animation is disabled',
          ),
        );
      } else dispatch(updateCanAnimationBeStartedStateAction(true));
    }
  }, [stringMatchingModuleState.stringMatchingInput]);

  return (
    <div
      css={css`
        display: grid;
        width: 100%;
        height: 60px;
      `}
    >
      <input
        css={css`
          height: 20px;
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
        Ex: "Input 123". Maximum number of elements:
        <div
          css={css`
            color: white;
            margin-left: 3px;
            margin-right: 5px;
            color: ${stringMatchingModuleState.stringMatchingInput.length >
            maxStringMatchingInputLength
              ? errorMessageColor
              : 'white'};
          `}
        >
          {stringMatchingModuleState.stringMatchingInput.length}/{maxStringMatchingInputLength}.
        </div>
        <div
          css={css`
            display: ${stringMatchingModuleState.stringMatchingInput.length >
            maxStringMatchingInputLength
              ? 'flex'
              : 'none'};
            color: ${errorMessageColor};
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
            onClick={() =>
              dispatch(
                updateStringMatchingInputState(
                  stringMatchingModuleState.stringMatchingAnimationInput
                    .map((i) => i.character)
                    .join(''),
                ),
              )
            }
          >
            Fix
          </div>
        </div>
      </div>
    </div>
  );
};
