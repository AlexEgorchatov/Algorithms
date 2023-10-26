import { PathFindingCellStateEnum } from '../../Resources/Enumerations';

export interface IPathFindingCellProps {
  cellState?: PathFindingCellStateEnum;
  rowIndex: number;
  columnIndex: number;
}
