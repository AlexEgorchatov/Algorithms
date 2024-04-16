/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PathFindingCellActionStateEnum } from '../../../Resources/Enumerations';
import { CellActionItemLegend } from './Legend';

export const CellActionLegends = () => {
  return (
    <div>
      <div
        css={css`
          display: flex;
          color: white;
          font-size: 13px;
          font-weight: bold;
          margin-left: 3px;
        `}
      >
        <CellActionItemLegend cellActionState={PathFindingCellActionStateEnum.Source} />
        <div
          css={css`
            margin-right: 5px;
          `}
        >
          Source;
        </div>
        <CellActionItemLegend cellActionState={PathFindingCellActionStateEnum.Destination} />
        <div
          css={css`
            margin-right: 5px;
          `}
        >
          Destination;
        </div>
        <CellActionItemLegend cellActionState={PathFindingCellActionStateEnum.Wall} />
        <div
          css={css`
            margin-right: 5px;
          `}
        >
          Wall;
        </div>
        <CellActionItemLegend cellActionState={PathFindingCellActionStateEnum.Unselected} />
        <div
          css={css`
            margin-right: 5px;
          `}
        >
          Empty cell
        </div>
      </div>
    </div>
  );
};
