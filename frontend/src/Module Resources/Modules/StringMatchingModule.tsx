/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { IModule } from '../Module';
import { ModulePlaceholder } from '../ModulePlaceHolder';

export enum CharacterState {
  Unselected = 0,
  Selected = 1,
  Found = 2,
}

interface Props {
  character: string;
  isSelected?: boolean;
}

const SearchableCharacter = ({ character, isSelected = false }: Props) => {
  return (
    <div
      css={css`
        ${isSelected === true && `background-color: yellow`}
      `}
    >
      {character}
    </div>
  );
};

export const StringMatchingModule = ({ title }: IModule) => {
  const test = [
    <SearchableCharacter character={'a'} />,
    <SearchableCharacter character={'b'} />,
    <SearchableCharacter character={'b'} />,
    <SearchableCharacter character={'a'} />,
  ];

  const handleModuleMouseEnter = () => {};
  const handleModuleMouseLeave = () => {};

  return (
    <div onMouseEnter={handleModuleMouseEnter} onMouseLeave={handleModuleMouseLeave}>
      <ModulePlaceholder title={title} isGrid={true}>
        <div
          css={css`
            font-size: 24px;
            color: #ffffff;
            display: flex;
            margin: 40px 0 0 10px;
          `}
        >
          Input:
          <div
            css={css`
              margin-left: 5px;
              display: flex;
            `}
          >
            {test}
          </div>
        </div>
        <div
          css={css`
            font-size: 24px;
            color: #ffffff;
            display: flex;
            margin: 10px;
          `}
        >
          Search:
          <div
            css={css`
              margin-left: 5px;
            `}
          >
            search result
          </div>
        </div>
      </ModulePlaceholder>
    </div>
  );
};
