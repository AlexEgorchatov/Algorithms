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
  const initialState = [
    { key: 0, character: 'b', state: CharacterState.Unselected },
    { key: 1, character: 'a', state: CharacterState.Unselected },
    { key: 2, character: 'b', state: CharacterState.Unselected },
    { key: 3, character: 'b', state: CharacterState.Unselected },
    { key: 4, character: 'a', state: CharacterState.Unselected },
    { key: 5, character: 'b', state: CharacterState.Unselected },
    { key: 6, character: 'b', state: CharacterState.Unselected },
  ];
  const [input, setInput] = React.useState(initialState);
  const search = 'ab';
  const isMouseOver = React.useRef(false);
  const timeoutID = React.useRef(-1);
  const stepTime: number = 50;
  const animationCompleteTime: number = 600;

  const resetComponentState = () => {
    setInput(initialState);
  };

  const awaitCancellation = (resolve: (parameter: unknown) => void, awaitTime: number) => {
    timeoutID.current = window.setTimeout(resolve, awaitTime);
  };

  const handleModuleMouseEnter = async () => {
    let inputLength = input.length;
    let searchLength = search.length;
    let patternCopy = [...input];
    isMouseOver.current = true;

    for (let i = 0; i <= inputLength - searchLength; i++) {
      for (let j = 0; j < searchLength; j++) {}
    }

    // for (let i = 0; i < length; i++) {
    //   patternCopy[i].state = CharacterState.Selected;
    //   setPattern(patternCopy);
    //   await new Promise((resolve) => awaitCancellation(resolve, stepTime));
    //   patternCopy = [...patternCopy];

    //   patternCopy[i].state = CharacterState.Unselected;
    //   setPattern(patternCopy);
    //   patternCopy = [...patternCopy];
    // }
  };
  const handleModuleMouseLeave = () => {
    isMouseOver.current = false;
    clearTimeout(timeoutID.current);
    resetComponentState();
  };

  return (
    <div onMouseEnter={handleModuleMouseEnter} onMouseLeave={handleModuleMouseLeave}>
      <ModulePlaceholder title={title} isGrid={true}>
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
            {input.map((parameters) => (
              <SearchableCharacter key={parameters.key} character={parameters.character} state={parameters.state} />
            ))}
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
