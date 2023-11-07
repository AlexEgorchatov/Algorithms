import { PathFindingCellStateEnum, PathFindingCellActionStateEnum, PathFindingCellDraggingStateEnum } from '../../Resources/Enumerations';

export interface IPathFindingCellProps {
  cellState: PathFindingCellStateEnum | PathFindingCellActionStateEnum | PathFindingCellDraggingStateEnum;
  distance: number;
  rowIndex: number;
  columnIndex: number;
}
