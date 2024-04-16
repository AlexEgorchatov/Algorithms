/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IStringMatchingCharacterProps } from '../../../Core/Interfaces/IStringMatchingCharacterProps';
import { StringMatchingCharacterStateEnum } from '../../../Resources/Enumerations';

export const StringMatchingCharacterComponent = ({
  character,
  characterState = StringMatchingCharacterStateEnum.Unselected,
}: IStringMatchingCharacterProps) => {
  const styles = {
    [StringMatchingCharacterStateEnum.Current]: 'color: white; background-color: black',
    [StringMatchingCharacterStateEnum.Found]: 'color: black; background-color: #ffff00',
    [StringMatchingCharacterStateEnum.Checked]: 'color: white; background-color: orange',
    [StringMatchingCharacterStateEnum.Unselected]: 'color: white; background-color: transparent',
  };

  return (
    <div
      css={css`
        width: 16.5px;
        ${styles[characterState]}
      `}
    >
      {character}
    </div>
  );
};
