import { checkedColor, completionColor } from '../../Resources/Colors';
import { PathFindingCellActionStateEnum, PathFindingCellDraggingStateEnum, PathFindingCellStateEnum } from '../../Resources/Enumerations';
import { updatePathFindingGridState, updateSelectedPathFindingAlgorithmState } from '../../Store/Path Finding Module/PathFindingModuleStateManagement';
import { updateIsAnimationFinalizingStateAction } from '../../Store/Shared/AnimationStateManagement';
import { store } from '../../Store/Store';
import { AlgorithmBase } from '../Abstractions/AlgorithmBase';
import { AlgorithmsManagerBase } from '../Abstractions/AlgorithmManagerBase';
import { IPathFindingCellProps } from '../Interfaces/IPathFindingCellProps';

export let directions: number[][] = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

export const isCellValid = (gridCopy: IPathFindingCellProps[][], rowIndex: number, columnIndex: number, currentDistance: number = -1): boolean => {
  if (rowIndex < 0 || rowIndex >= gridCopy.length || columnIndex < 0 || columnIndex >= gridCopy[0].length) return false;

  if (currentDistance === -1) {
    if (
      gridCopy[rowIndex][columnIndex].cellState !== PathFindingCellStateEnum.Unselected &&
      gridCopy[rowIndex][columnIndex].cellState !== PathFindingCellStateEnum.Destination
    ) {
      return false;
    }
    return true;
  }
  if (gridCopy[rowIndex][columnIndex].cellState !== PathFindingCellStateEnum.Checked || currentDistance <= gridCopy[rowIndex][columnIndex].distance) {
    return false;
  }

  return true;
};

export const getCellColor = (cellState: PathFindingCellStateEnum | PathFindingCellActionStateEnum | PathFindingCellDraggingStateEnum): string => {
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

export class PathFindingAlgorithmsManager extends AlgorithmsManagerBase {
  public selectedAlgorithm: AlgorithmBase;
  public initialState: IPathFindingCellProps[][] = [];
  public isStateUpdated: boolean = false;
  public cellsToColor: React.RefObject<HTMLDivElement>[][] = [];

  public constructor(selectedAlgorithm: AlgorithmBase) {
    super();
    this.selectedAlgorithm = selectedAlgorithm;
    store.dispatch(updateSelectedPathFindingAlgorithmState(selectedAlgorithm.constructor.name));
  }

  public setInitialState(): void {
    this.initialState = [...store.getState().pathFindingModuleState.pathFindingGrid];
  }

  public resetToInitialState(): void {
    store.dispatch(updatePathFindingGridState(this.initialState));
  }

  public updateStoreSelectedAlgorithmName(): void {
    store.dispatch(updateSelectedPathFindingAlgorithmState(this.selectedAlgorithm.constructor.name));
  }

  public async startAlgorithm(): Promise<void> {
    if (this.isStateUpdated) {
      this.setInitialState();
      this.selectedAlgorithm.setFinalState();
      this.isStateUpdated = false;
    }

    let destination: IPathFindingCellProps = await this.selectedAlgorithm.executeAlgorithm(this.cellsToColor);
    if (!store.getState().animationState.hasAnimationStarted) return;

    await this.finalizePathFinding(destination);
    store.dispatch(updateIsAnimationFinalizingStateAction(false));
  }

  public async stopAlgorithm(): Promise<void> {
    store.dispatch(updatePathFindingGridState(this.initialState));
  }

  public async completeAlgorithm(): Promise<void> {}

  private async finalizePathFinding(destination: IPathFindingCellProps): Promise<void> {
    let gridCopy: IPathFindingCellProps[][] = store.getState().pathFindingModuleState.pathFindingGrid.map((row) => [...row]);
    let timeout = 500 / destination.distance;

    let pathCell = { ...destination };
    for (let i = 0; i < directions.length; i++) {
      let newRow: number = pathCell.rowIndex + directions[i][0];
      let newColumn: number = pathCell.columnIndex + directions[i][1];
      if (!isCellValid(gridCopy, newRow, newColumn, pathCell.distance)) continue;
      if (gridCopy[newRow][newColumn].cellState === PathFindingCellStateEnum.Source) break;

      gridCopy[newRow][newColumn] = { ...gridCopy[newRow][newColumn], cellState: PathFindingCellStateEnum.Path };
      this.cellsToColor[newRow][newColumn].current!.style.backgroundColor = getCellColor(PathFindingCellStateEnum.Path);
      pathCell = gridCopy[newRow][newColumn];
      gridCopy = gridCopy.map((row) => [...row]);
      i = -1;
      await new Promise((resolve) => setTimeout(resolve, timeout));
    }

    for (let i = 0; i < this.cellsToColor.length; i++) {
      for (let j = 0; j < this.cellsToColor[i].length; j++) {
        this.cellsToColor[i][j].current!.style.backgroundColor = ``;
      }
    }
    store.dispatch(updatePathFindingGridState(gridCopy));
  }
}
