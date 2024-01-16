/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IStringMatchingCharacterProps } from '../../Core/Interfaces/IStringMatchingCharacterProps';
import { StringMatchingCharacterStateEnum } from '../../Resources/Enumerations';

export const SearchableCharacter = ({
  character,
  characterState: state = StringMatchingCharacterStateEnum.Unselected,
}: IStringMatchingCharacterProps) => {
  const setFont = () => {
    switch (state) {
      case StringMatchingCharacterStateEnum.Current:
        return 'color: white; background-color: black';

      case StringMatchingCharacterStateEnum.Found:
        return 'color: black; background-color: #ffff00';

      case StringMatchingCharacterStateEnum.Unselected:
      default:
        return 'color: white; background-color: transparent';
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
