import { checkedColor, completionColor } from '../../Resources/Colors';
import {
  PathFindingCellActionStateEnum,
  PathFindingCellDraggingStateEnum,
  PathFindingCellStateEnum,
} from '../../Resources/Enumerations';
import {
  updatePathFindingDestinationState,
  updatePathFindingGridState,
  updateSelectedPathFindingAlgorithmState,
} from '../../Store/Path Finding Module/PathFindingModuleStateManagement';
import { updateIsAnimationFinalizingStateAction } from '../../Store/Shared/AnimationStateManagement';
import { store } from '../../Store/Store';
import { PathFindingAlgorithmBase } from '../Abstractions/AlgorithmBase';
import { AlgorithmsManagerBase } from '../Abstractions/AlgorithmManagerBase';
import { IPathFindingCellProps } from '../Interfaces/IPathFindingCellProps';

export let directions: number[][] = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

export const undefinedCell: IPathFindingCellProps = {
  cellState: PathFindingCellStateEnum.Unselected,
  rowIndex: -1,
  columnIndex: -1,
  distance: 0,
};

export const isCellValid = (
  gridCopy: IPathFindingCellProps[][],
  rowIndex: number,
  columnIndex: number,
  currentDistance: number = -1,
): boolean => {
  if (
    rowIndex < 0 ||
    rowIndex >= gridCopy.length ||
    columnIndex < 0 ||
    columnIndex >= gridCopy[0].length
  )
    return false;

  if (currentDistance === -1) {
    return gridCopy[rowIndex][columnIndex].cellState !== PathFindingCellStateEnum.Unselected &&
      gridCopy[rowIndex][columnIndex].cellState !== PathFindingCellStateEnum.Destination
      ? false
      : true;
  }
  if (
    gridCopy[rowIndex][columnIndex].cellState !== PathFindingCellStateEnum.Checked ||
    currentDistance <= gridCopy[rowIndex][columnIndex].distance
  ) {
    return false;
  }

  return true;
};

export const getCellColor = (
  cellState:
    | PathFindingCellStateEnum
    | PathFindingCellActionStateEnum
    | PathFindingCellDraggingStateEnum,
): string => {
  switch (cellState) {
    case PathFindingCellStateEnum.Checked:
      return checkedColor;

    case PathFindingCellStateEnum.Source:
      return 'green';

    case PathFindingCellStateEnum.Destination:
      return 'red';

    case PathFindingCellStateEnum.Wall:
      return '#ae7a59';

    case PathFindingCellStateEnum.Path:
      return completionColor;

    case PathFindingCellStateEnum.Unselected:
    case PathFindingCellActionStateEnum.None:
    default:
      return 'white';
  }
};

export const resetCellsRefsBackground = (cellsRefs: React.RefObject<HTMLDivElement>[][]) => {
  for (let i = 0; i < cellsRefs.length; i++) {
    for (let j = 0; j < cellsRefs[i].length; j++) {
      cellsRefs[i][j].current!.style.backgroundColor = ``;
    }
  }
};

export class PathFindingAlgorithmsManager extends AlgorithmsManagerBase {
  public selectedAlgorithm: PathFindingAlgorithmBase;
  public initialState: IPathFindingCellProps[][] = [];
  public isStateUpdated: boolean = false;
  public cellsRefs: React.RefObject<HTMLDivElement>[][] = [];

  public constructor(selectedAlgorithm: PathFindingAlgorithmBase) {
    super();
    this.selectedAlgorithm = selectedAlgorithm;
    store.dispatch(updateSelectedPathFindingAlgorithmState(selectedAlgorithm.title));
  }

  public setInitialState(): void {
    this.initialState = [...store.getState().pathFindingModuleState.pathFindingGrid];
  }

  public resetToInitialState(): void {
    let dispatch = store.dispatch;
    dispatch(updatePathFindingGridState(this.initialState));
    dispatch(
      updatePathFindingDestinationState({
        ...store.getState().pathFindingModuleState.pathFindingDestination,
        distance: 0,
      }),
    );
  }

  public updateStoreSelectedAlgorithmName(): void {
    store.dispatch(updateSelectedPathFindingAlgorithmState(this.selectedAlgorithm.title));
  }

  public async startAlgorithm(): Promise<void> {
    if (this.isStateUpdated) {
      this.setInitialState();
      this.selectedAlgorithm.setFinalState();
      this.isStateUpdated = false;
    }

    let computedDistance: number = await this.selectedAlgorithm.executeAlgorithm(this.cellsRefs);
    if (!store.getState().animationState.hasAnimationStarted) return;

    store.dispatch(updateIsAnimationFinalizingStateAction(true));
    await this.finalizePathFinding(computedDistance);
    store.dispatch(updateIsAnimationFinalizingStateAction(false));
  }

  public async stopAlgorithm(): Promise<void> {
    resetCellsRefsBackground(this.cellsRefs);
  }

  public async completeAlgorithm(): Promise<void> {
    store.dispatch(updateIsAnimationFinalizingStateAction(true));
  }

  private async finalizePathFinding(computedDistance: number): Promise<void> {
    let queue: IPathFindingCellProps[] = [];
    for (let i = 0; i < this.selectedAlgorithm.finalState.length; i++) {
      for (let j = 0; j < this.selectedAlgorithm.finalState[i].length; j++) {
        if (this.selectedAlgorithm.finalState[i][j].distance <= computedDistance) continue;

        queue.push(this.selectedAlgorithm.finalState[i][j]);
      }
    }

    let timeout = 30;
    if (queue.length > 0) {
      queue.sort((a, b) => a.distance - b.distance);
      let dispatch = store.dispatch;

      let lastLayer = queue[0].distance;
      while (queue.length > 0) {
        let top = queue[0];
        queue.shift();

        if (top.cellState === PathFindingCellStateEnum.Destination) {
          await new Promise((resolve) => setTimeout(resolve, timeout));
          dispatch(updatePathFindingDestinationState(top));
        } else {
          this.cellsRefs[top.rowIndex][top.columnIndex].current!.style.backgroundColor =
            getCellColor(PathFindingCellStateEnum.Checked);
        }

        if (lastLayer !== top.distance) {
          lastLayer = top.distance;
          await new Promise((resolve) => setTimeout(resolve, timeout));
        }
      }
    }

    await this.drawPath();
  }

  private async drawPath(): Promise<void> {
    let pathFindingModuleState = store.getState().pathFindingModuleState;
    let gridCopy: IPathFindingCellProps[][] = this.selectedAlgorithm.finalState.map((row) => [
      ...row,
    ]);
    let destination = pathFindingModuleState.pathFindingDestination;
    let timeout = 20;

    let pathCell = { ...destination };
    if (pathCell.distance > 0) {
      for (let i = 0; i < directions.length; i++) {
        let newRow: number = pathCell.rowIndex + directions[i][0];
        let newColumn: number = pathCell.columnIndex + directions[i][1];
        if (!isCellValid(this.selectedAlgorithm.finalState, newRow, newColumn, pathCell.distance))
          continue;
        if (gridCopy[newRow][newColumn].cellState === PathFindingCellStateEnum.Source) break;

        gridCopy[newRow][newColumn] = {
          ...gridCopy[newRow][newColumn],
          cellState: PathFindingCellStateEnum.Path,
        };
        this.cellsRefs[newRow][newColumn].current!.style.backgroundColor = getCellColor(
          PathFindingCellStateEnum.Path,
        );
        pathCell = gridCopy[newRow][newColumn];
        i = -1;
        await new Promise((resolve) => setTimeout(resolve, timeout));
      }
    }

    await new Promise((resolve) => setTimeout(resolve, timeout));
    resetCellsRefsBackground(this.cellsRefs);
    store.dispatch(updatePathFindingGridState(gridCopy));
  }
}
