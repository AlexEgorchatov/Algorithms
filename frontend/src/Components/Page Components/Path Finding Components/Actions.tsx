/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PathFindingCellActionStateEnum } from '../../../Resources/Enumerations';
import { CellActionItem } from './Action';

export const CellActions = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        width: 112px;
      `}
    >
      <CellActionItem cellActionState={PathFindingCellActionStateEnum.Source} />
      <CellActionItem cellActionState={PathFindingCellActionStateEnum.Destination} />
      <CellActionItem cellActionState={PathFindingCellActionStateEnum.Wall} />
      <CellActionItem cellActionState={PathFindingCellActionStateEnum.Unselected} />
    </div>
  );
};
