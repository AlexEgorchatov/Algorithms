/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { ModulePreviewPlaceholder } from '../Shared Components/ModulePreviewPlaceHolder';
import { useSelector } from 'react-redux';
import { AppState } from '../../Redux/Store';
import { useDispatch } from 'react-redux';
import { StringMatchingCharacterStateEnum } from '../../Resources/Enumerations';
import { IStringMatchingCharacterProps } from '../../Core/Interfaces/IStringMatchingCharacterProps';
import { IModulePreviewTitle } from '../../Core/Interfaces/IModuleTitle';
import { updateStringMatchingModulePreviewCharactersState } from '../../Redux/Home Page/StringMatchingModulePreviewStateManagement';
import { SearchableCharacter } from './StringMatchingPreviewCharacter';

export const defaultStringMatchingPreviewState: IStringMatchingCharacterProps[] = [
  { character: 'b' },
  { character: 'a' },
  { character: 'b' },
  { character: 'b' },
  { character: 'a' },
  { character: 'b' },
  { character: 'b' },
];

export const StringMatchingModulePreview = ({ title }: IModulePreviewTitle) => {
  const stringMatchingState = useSelector(
    (state: AppState) => state.stringMatchingModulePreviewState,
  );
  const dispatch = useDispatch();
  const pattern = 'ab';
  const timeoutID = React.useRef(-1);
  const stepTime: number = 50;
  const animationCompleteTime: number = 500;

  const resetComponentState = () => {
    dispatch(updateStringMatchingModulePreviewCharactersState(defaultStringMatchingPreviewState));
  };

  const awaitCancellation = (resolve: (parameter: unknown) => void, awaitTime: number) => {
    timeoutID.current = window.setTimeout(resolve, awaitTime);
  };

  const handleModuleMouseEnter = async () => {
    let inputLength = stringMatchingState.characters.length;
    let inputCopy = [...stringMatchingState.characters];

    for (let i = 0; i < inputLength; i++) {
      inputCopy[i] = { ...inputCopy[i], characterState: StringMatchingCharacterStateEnum.Current };
      dispatch(updateStringMatchingModulePreviewCharactersState(inputCopy));
      inputCopy = [...inputCopy];
      await new Promise((resolve) => awaitCancellation(resolve, stepTime));

      inputCopy[i] = {
        ...inputCopy[i],
        characterState:
          i === 1 || i === 2 || i === 4 || i === 5
            ? StringMatchingCharacterStateEnum.Found
            : StringMatchingCharacterStateEnum.Unselected,
      };
      dispatch(updateStringMatchingModulePreviewCharactersState(inputCopy));
      inputCopy = [...inputCopy];

      if (i === inputLength - 1) {
        await new Promise((resolve) => awaitCancellation(resolve, animationCompleteTime));
        resetComponentState();
        inputCopy = [...stringMatchingState.characters];
        i = -1;
        await new Promise((resolve) => awaitCancellation(resolve, stepTime * 3));
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
            {stringMatchingState.characters.map((character, index) => (
              <SearchableCharacter
                key={index}
                character={character.character}
                characterState={character.characterState}
              />
            ))}
          </div>
        </div>
      </ModulePreviewPlaceholder>
    </div>
  );
};
