/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { ModuleTitle } from '../Pages/HomePage';
import { ModulePlaceholder } from '../Components/ModulePlaceholder';
import { useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { useDispatch } from 'react-redux';
import { CharacterState, updatingStringMatchingModuleStateAction } from '../Store/Home Page/StringMatchingModuleStateManagement';

interface Props {
  character: string;
  state: CharacterState;
}

const SearchableCharacter = ({ character, state = CharacterState.Unselected }: Props) => {
  const setFont = () => {
    switch (state) {
      case CharacterState.Unselected:
        return 'color: #ffffff; background-color: transparent';

      case CharacterState.Selected:
        return 'color: #ffffff; background-color: #000000';

      case CharacterState.Found:
        return 'color: #000000; background-color: #ffff00';
    }
  };

  return (
    <div
      css={css`
        ${setFont()}
      `}
    >
      {character}
    </div>
  );
};

export const StringMatchingModule = ({ title }: ModuleTitle) => {
  const stringMatchingState = useSelector((state: AppState) => state.stringMatchingModuleState);
  const dispatch = useDispatch();
  const inputRender = [
    <SearchableCharacter key={0} character={'b'} state={stringMatchingState.initialChars[0]} />,
    <SearchableCharacter key={1} character={'a'} state={stringMatchingState.initialChars[1]} />,
    <SearchableCharacter key={2} character={'b'} state={stringMatchingState.initialChars[2]} />,
    <SearchableCharacter key={3} character={'b'} state={stringMatchingState.initialChars[3]} />,
    <SearchableCharacter key={4} character={'a'} state={stringMatchingState.initialChars[4]} />,
    <SearchableCharacter key={5} character={'b'} state={stringMatchingState.initialChars[5]} />,
    <SearchableCharacter key={6} character={'b'} state={stringMatchingState.initialChars[6]} />,
  ];
  const pattern = 'ab';
  const timeoutID = React.useRef(-1);
  const stepTime: number = 50;
  const animationCompleteTime: number = 500;

  const resetComponentState = () => {
    dispatch(updatingStringMatchingModuleStateAction());
  };

  const awaitCancellation = (resolve: (parameter: unknown) => void, awaitTime: number) => {
    timeoutID.current = window.setTimeout(resolve, awaitTime);
  };

  const handleModuleMouseEnter = async () => {
    let inputLength = stringMatchingState.initialChars.length;
    let inputCopy = [...stringMatchingState.initialChars];

    for (let i = 0; i < inputLength; i++) {
      inputCopy[i] = CharacterState.Selected;
      dispatch(updatingStringMatchingModuleStateAction(inputCopy));
      await new Promise((resolve) => awaitCancellation(resolve, stepTime));
      inputCopy = [...inputCopy];

      inputCopy[i] = i === 1 || i === 2 || i === 4 || i === 5 ? CharacterState.Found : CharacterState.Unselected;
      dispatch(updatingStringMatchingModuleStateAction(inputCopy));
      inputCopy = [...inputCopy];

      if (i === inputLength - 1) {
        await new Promise((resolve) => awaitCancellation(resolve, animationCompleteTime));
        resetComponentState();
        i = -1;
        await new Promise((resolve) => awaitCancellation(resolve, stepTime * 3));
        inputCopy = [...stringMatchingState.initialChars];
      }
    }
  };

  const handleModuleMouseLeave = () => {
    clearTimeout(timeoutID.current);
    resetComponentState();
  };

  return (
    <div onMouseEnter={handleModuleMouseEnter} onMouseLeave={handleModuleMouseLeave}>
      <ModulePlaceholder title={title}>
        <div
          css={css`
            align-items: center;
            font-size: 24px;
            color: #ffffff;
            display: flex;
            margin-left: 10px;
            height: 105px;
          `}
        >
          Input:
          <div
            css={css`
              margin-left: 5px;
              display: flex;
            `}
          >
            {inputRender}
          </div>
        </div>
        <div
          css={css`
            align-items: center;
            font-size: 24px;
            color: #ffffff;
            display: flex;
            margin-left: 10px;
            height: 105px;
          `}
        >
          Pattern:
          <div
            css={css`
              margin-left: 5px;
            `}
          >
            {pattern}
          </div>
        </div>
      </ModulePlaceholder>
    </div>
  );
};
