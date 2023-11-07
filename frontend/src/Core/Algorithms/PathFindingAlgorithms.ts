import { PathFindingCellStateEnum } from '../../Resources/Enumerations';
import { updatePathFindingGridState } from '../../Store/Path Finding Module/PathFindingModuleStateManagement';
import { store } from '../../Store/Store';
import { PathFindingAlgorithmBase } from '../Abstractions/AlgorithmBase';
import { isAnimationTerminated, pauseForStepIteration } from '../Helper';
import { IPathFindingCellProps } from '../Interfaces/IPathFindingCellProps';

let directions: number[][] = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

export class BreadthFirstSearch extends PathFindingAlgorithmBase {
  public async executeAlgorithm(): Promise<void> {
    let gridCopy: IPathFindingCellProps[][] = store.getState().pathFindingModuleState.pathFindingGrid.map((row) => [...row]);
    let source: IPathFindingCellProps = { cellState: PathFindingCellStateEnum.Unselected, rowIndex: 0, columnIndex: 0, distance: 0 };

    for (let i = 0, isSourceFound = false; i < gridCopy.length && !isSourceFound; i++) {
      for (let j = 0; j < gridCopy[i].length; j++) {
        if (gridCopy[i][j].cellState !== PathFindingCellStateEnum.Source) continue;

        source = { ...gridCopy[i][j], distance: 0 };
        isSourceFound = true;
        break;
      }
    }

    let queue: IPathFindingCellProps[] = [source];
    let isDestinationFound: boolean = false;
    let queueLength = 1;
    while (queue.length > 0 && !isDestinationFound) {
      let top = { ...queue[0] };

      queue.shift();
      for (let i = 0; i < directions.length; i++) {
        let newRow: number = top.rowIndex + directions[i][0];
        let newColumn: number = top.columnIndex + directions[i][1];
        if (!this.isCellValid(gridCopy, newRow, newColumn)) continue;

        if (gridCopy[newRow][newColumn].cellState === PathFindingCellStateEnum.Destination) {
          isDestinationFound = true;
          break;
        }

        gridCopy[newRow][newColumn] = { ...gridCopy[newRow][newColumn], cellState: PathFindingCellStateEnum.Checked, distance: top.distance + 1 };
        queue.push(gridCopy[newRow][newColumn]);
      }

      if (--queueLength === 0) {
        queueLength = queue.length;
        store.dispatch(updatePathFindingGridState(gridCopy));
        gridCopy = gridCopy.map((row) => [...row]);
        await pauseForStepIteration();
        if (await isAnimationTerminated()) {
          return;
        }
      }
    }

    store.dispatch(updatePathFindingGridState(gridCopy));
  }

  setFinalState(): void {}

  private isCellValid = (gridCopy: IPathFindingCellProps[][], rowIndex: number, columnIndex: number): boolean => {
    if (
      rowIndex < 0 ||
      rowIndex >= gridCopy.length ||
      columnIndex < 0 ||
      columnIndex >= gridCopy[0].length ||
      (gridCopy[rowIndex][columnIndex].cellState !== PathFindingCellStateEnum.Unselected &&
        gridCopy[rowIndex][columnIndex].cellState !== PathFindingCellStateEnum.Destination)
    ) {
      return false;
    }

    return true;
  };
}

export class AStarSearch extends PathFindingAlgorithmBase {
  public async executeAlgorithm(): Promise<void> {}
  setFinalState(): void {}
}
