/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect } from 'react';
import { IModule } from '../Module';
import { ModulePlaceholder } from '../ModulePlaceHolder';

export enum CharacterState {
  Unselected = 0,
  Selected = 1,
  Found = 2,
}

interface Props {
  character: string;
  state?: CharacterState;
}

const SearchableCharacter = ({ character, state = CharacterState.Unselected }: Props) => {
  useEffect(() => {
    setFont();
  });

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

export const StringMatchingModule = ({ title }: IModule) => {
  const initialState: CharacterState[] = [
    CharacterState.Unselected,
    CharacterState.Unselected,
    CharacterState.Unselected,
    CharacterState.Unselected,
    CharacterState.Unselected,
    CharacterState.Unselected,
    CharacterState.Unselected,
  ];

  const [input, setInput] = React.useState(initialState);
  const search = 'ab';
  const isMouseOver = React.useRef(false);
  const timeoutID = React.useRef(-1);
  const stepTime: number = 50;
  const animationCompleteTime: number = 500;
  const inputRender = [
    <SearchableCharacter key={0} character={'b'} state={input[0]} />,
    <SearchableCharacter key={1} character={'a'} state={input[1]} />,
    <SearchableCharacter key={2} character={'b'} state={input[2]} />,
    <SearchableCharacter key={3} character={'b'} state={input[3]} />,
    <SearchableCharacter key={4} character={'a'} state={input[4]} />,
    <SearchableCharacter key={5} character={'b'} state={input[5]} />,
    <SearchableCharacter key={6} character={'b'} state={input[6]} />,
  ];

  const resetComponentState = () => {
    setInput(initialState);
  };

  const awaitCancellation = (resolve: (parameter: unknown) => void, awaitTime: number) => {
    timeoutID.current = window.setTimeout(resolve, awaitTime);
  };

  const handleModuleMouseEnter = async () => {
    let inputLength = input.length;
    let inputCopy = [...input];
    isMouseOver.current = true;

    for (let i = 0; i < inputLength; i++) {
      inputCopy[i] = CharacterState.Selected;
      setInput(inputCopy);
      await new Promise((resolve) => awaitCancellation(resolve, stepTime));
      inputCopy = [...inputCopy];

      inputCopy[i] = i === 1 || i === 2 || i === 4 || i === 5 ? CharacterState.Found : CharacterState.Unselected;
      setInput(inputCopy);
      inputCopy = [...inputCopy];

      if (i === inputLength - 1) {
        await new Promise((resolve) => awaitCancellation(resolve, animationCompleteTime));
        resetComponentState();
        i = -1;
        await new Promise((resolve) => awaitCancellation(resolve, stepTime * 3));
        inputCopy = [...input];
      }
    }
  };
  const handleModuleMouseLeave = () => {
    isMouseOver.current = false;
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
          Search:
          <div
            css={css`
              margin-left: 5px;
            `}
          >
            {search}
          </div>
        </div>
      </ModulePlaceholder>
    </div>
  );
};
