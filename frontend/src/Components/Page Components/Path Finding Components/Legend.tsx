/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ICellActionState } from '../../../Core/Interfaces/ICellActionState';
import { getCellColor } from '../../../Core/Other/PathFindingAlgorithmsManager';

export const CellActionItemLegend = ({ cellActionState }: ICellActionState) => {
  return (
    <div
      css={css`
        position: relative;
        display: flex;
        width: 10px;
        height: 10px;
        top: 5px;
        margin-right: 5px;
        ::before {
          content: '';
          box-sizing: border-box;
          position: absolute;
          height: 10px;
          width: 10px;
          background-color: ${getCellColor(cellActionState)};
        }
      `}
    ></div>
  );
};
