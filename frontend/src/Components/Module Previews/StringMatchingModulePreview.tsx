/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { ModulePreviewPlaceholder } from '../ModulePreviewPlaceHolder';
import { useSelector } from 'react-redux';
import { AppState } from '../../Store/Store';
import { useDispatch } from 'react-redux';
import { updateStringMatchingModuleStateAction } from '../../Store/Home Page/StringMatchingModulePreviewStateManagement';
import { StringMatchingCharacterStateEnum } from '../../Resources/Enumerations';
import { IStringMatchingCharacterProps } from '../../Core/Interfaces/IStringMatchingCharacterProps';
import { IModulePreviewTitle } from '../../Core/Interfaces/IModuleTitle';

const SearchableCharacter = ({ character, characterState: state = StringMatchingCharacterStateEnum.Unselected }: IStringMatchingCharacterProps) => {
  const setFont = () => {
    switch (state) {
      case StringMatchingCharacterStateEnum.Unselected:
        return 'color: #ffffff; background-color: transparent';

      case StringMatchingCharacterStateEnum.Checked:
        return 'color: #ffffff; background-color: #000000';

      case StringMatchingCharacterStateEnum.Found:
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

export const StringMatchingModulePreview = ({ title }: IModulePreviewTitle) => {
  const stringMatchingState = useSelector((state: AppState) => state.stringMatchingModuleState);
  const dispatch = useDispatch();
  const inputRender = [
    <SearchableCharacter key={0} character={'b'} characterState={stringMatchingState.stringMatchingModuleCharacters[0]} />,
    <SearchableCharacter key={1} character={'a'} characterState={stringMatchingState.stringMatchingModuleCharacters[1]} />,
    <SearchableCharacter key={2} character={'b'} characterState={stringMatchingState.stringMatchingModuleCharacters[2]} />,
    <SearchableCharacter key={3} character={'b'} characterState={stringMatchingState.stringMatchingModuleCharacters[3]} />,
    <SearchableCharacter key={4} character={'a'} characterState={stringMatchingState.stringMatchingModuleCharacters[4]} />,
    <SearchableCharacter key={5} character={'b'} characterState={stringMatchingState.stringMatchingModuleCharacters[5]} />,
    <SearchableCharacter key={6} character={'b'} characterState={stringMatchingState.stringMatchingModuleCharacters[6]} />,
  ];
  const pattern = 'ab';
  const timeoutID = React.useRef(-1);
  const stepTime: number = 50;
  const animationCompleteTime: number = 500;

  const resetComponentState = () => {
    dispatch(updateStringMatchingModuleStateAction());
  };

  const awaitCancellation = (resolve: (parameter: unknown) => void, awaitTime: number) => {
    timeoutID.current = window.setTimeout(resolve, awaitTime);
  };

  const handleModuleMouseEnter = async () => {
    let inputLength = stringMatchingState.stringMatchingModuleCharacters.length;
    let inputCopy = [...stringMatchingState.stringMatchingModuleCharacters];

    for (let i = 0; i < inputLength; i++) {
      inputCopy[i] = StringMatchingCharacterStateEnum.Checked;
      dispatch(updateStringMatchingModuleStateAction(inputCopy));
      await new Promise((resolve) => awaitCancellation(resolve, stepTime));
      inputCopy = [...inputCopy];

      inputCopy[i] = i === 1 || i === 2 || i === 4 || i === 5 ? StringMatchingCharacterStateEnum.Found : StringMatchingCharacterStateEnum.Unselected;
      dispatch(updateStringMatchingModuleStateAction(inputCopy));
      inputCopy = [...inputCopy];

      if (i === inputLength - 1) {
        await new Promise((resolve) => awaitCancellation(resolve, animationCompleteTime));
        resetComponentState();
        i = -1;
        await new Promise((resolve) => awaitCancellation(resolve, stepTime * 3));
        inputCopy = [...stringMatchingState.stringMatchingModuleCharacters];
      }
    }
  };

  const handleModuleMouseLeave = () => {
    clearTimeout(timeoutID.current);
    resetComponentState();
  };

  return (
    <div onMouseEnter={handleModuleMouseEnter} onMouseLeave={handleModuleMouseLeave}>
      <ModulePreviewPlaceholder title={title}>
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
      </ModulePreviewPlaceholder>
    </div>
  );
};
