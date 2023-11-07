import { PathFindingCellStateEnum } from '../../Resources/Enumerations';
import { updatePathFindingGridState, updateSelectedPathFindingAlgorithmState } from '../../Store/Path Finding Module/PathFindingModuleStateManagement';
import { updateIsAnimationFinalizingStateAction } from '../../Store/Shared/AnimationStateManagement';
import { store } from '../../Store/Store';
import { AlgorithmBase } from '../Abstractions/AlgorithmBase';
import { AlgorithmsManagerBase } from '../Abstractions/AlgorithmManagerBase';
import { pauseForStepIteration } from '../Helper';
import { IPathFindingCellProps } from '../Interfaces/IPathFindingCellProps';

let directions: number[][] = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

export class PathFindingAlgorithmsManager extends AlgorithmsManagerBase {
  public selectedAlgorithm: AlgorithmBase;
  public initialState: IPathFindingCellProps[][] = [];
  public isStateUpdated: boolean = false;

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

    let destination: IPathFindingCellProps = await this.selectedAlgorithm.executeAlgorithm();
    if (!store.getState().animationState.hasAnimationStarted) return;

    await this.finalizeSorting(destination);
    store.dispatch(updateIsAnimationFinalizingStateAction(false));
  }

  public async stopAlgorithm(): Promise<void> {
    store.dispatch(updatePathFindingGridState(this.initialState));
  }

  public async completeAlgorithm(): Promise<void> {}

  private async finalizeSorting(destination: IPathFindingCellProps): Promise<void> {
    let gridCopy: IPathFindingCellProps[][] = store.getState().pathFindingModuleState.pathFindingGrid.map((row) => [...row]);
    let timeout = 10;

    let pathCell = { ...destination };
    for (let i = 0; i < directions.length; i++) {
      let newRow: number = pathCell.rowIndex + directions[i][0];
      let newColumn: number = pathCell.columnIndex + directions[i][1];
      if (!this.isPathCell(gridCopy, newRow, newColumn, pathCell.distance)) continue;
      if (gridCopy[newRow][newColumn].cellState === PathFindingCellStateEnum.Source) break;

      gridCopy[newRow][newColumn] = { ...gridCopy[newRow][newColumn], cellState: PathFindingCellStateEnum.Path };
      pathCell = gridCopy[newRow][newColumn];
      store.dispatch(updatePathFindingGridState(gridCopy));
      gridCopy = gridCopy.map((row) => [...row]);
      i = -1;
      await new Promise((resolve) => setTimeout(resolve, timeout));
    }
  }

  private isPathCell = (gridCopy: IPathFindingCellProps[][], rowIndex: number, columnIndex: number, currentDistance: number): boolean => {
    if (
      rowIndex < 0 ||
      rowIndex >= gridCopy.length ||
      columnIndex < 0 ||
      columnIndex >= gridCopy[0].length ||
      gridCopy[rowIndex][columnIndex].cellState !== PathFindingCellStateEnum.Checked ||
      currentDistance <= gridCopy[rowIndex][columnIndex].distance
    ) {
      return false;
    }

    return true;
  };
}
