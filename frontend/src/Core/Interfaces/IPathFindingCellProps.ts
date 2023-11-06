import { PathFindingCellStateEnum, PathFindingCellActionStateEnum, PathFindingCellDraggingStateEnum } from '../../Resources/Enumerations';

export interface IPathFindingCellProps {
  cellState?: PathFindingCellStateEnum | PathFindingCellActionStateEnum | PathFindingCellDraggingStateEnum;
  rowIndex: number;
  columnIndex: number;
}
