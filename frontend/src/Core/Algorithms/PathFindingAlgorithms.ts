import { PathFindingCellStateEnum } from '../../Resources/Enumerations';
import { updatePathFindingGridState } from '../../Store/Path Finding Module/PathFindingModuleStateManagement';
import { store } from '../../Store/Store';
import { PathFindingAlgorithmBase } from '../Abstractions/AlgorithmBase';
import { isAnimationTerminated, pauseForStepIteration } from '../Helper';
import { IPathFindingCellProps } from '../Interfaces/IPathFindingCellProps';
import { directions, getCellColor, isCellValid } from '../Other/PathFindingAlgorithmsManager';

export class BreadthFirstSearch extends PathFindingAlgorithmBase {
  public async executeAlgorithm(coloredCells: React.RefObject<HTMLDivElement>[][]): Promise<IPathFindingCellProps> {
    let gridCopy: IPathFindingCellProps[][] = store.getState().pathFindingModuleState.pathFindingGrid.map((row) => [...row]);
    let source: IPathFindingCellProps = { cellState: PathFindingCellStateEnum.Unselected, rowIndex: 0, columnIndex: 0, distance: 0 };
    let destination: IPathFindingCellProps = { cellState: PathFindingCellStateEnum.Unselected, rowIndex: 0, columnIndex: 0, distance: 0 };

    for (let i = 0, isSourceFound = false; i < gridCopy.length && !isSourceFound; i++) {
      for (let j = 0; j < gridCopy[i].length; j++) {
        if (gridCopy[i][j].cellState !== PathFindingCellStateEnum.Source) continue;

        source = { ...gridCopy[i][j], distance: 0 };
        isSourceFound = true;
        break;
      }
    }

    let queue: IPathFindingCellProps[] = [source];
    let queueLength = 1;
    while (queue.length > 0 && destination.cellState === PathFindingCellStateEnum.Unselected) {
      let top = { ...queue[0] };

      queue.shift();
      for (let i = 0; i < directions.length; i++) {
        let newRow: number = top.rowIndex + directions[i][0];
        let newColumn: number = top.columnIndex + directions[i][1];
        if (!isCellValid(gridCopy, newRow, newColumn)) continue;

        if (gridCopy[newRow][newColumn].cellState === PathFindingCellStateEnum.Destination) {
          destination = { ...gridCopy[newRow][newColumn], distance: top.distance + 1 };
          break;
        }

        gridCopy[newRow][newColumn] = { ...gridCopy[newRow][newColumn], cellState: PathFindingCellStateEnum.Checked, distance: top.distance + 1 };
        coloredCells[newRow][newColumn].current!.style.backgroundColor = getCellColor(PathFindingCellStateEnum.Checked);
        queue.push(gridCopy[newRow][newColumn]);
      }

      if (--queueLength === 0 && destination.cellState === PathFindingCellStateEnum.Unselected) {
        queueLength = queue.length;
        await pauseForStepIteration();
        if (await isAnimationTerminated()) {
          return destination;
        }
      }
    }

    for (let i = 0; i < coloredCells.length; i++) {
      for (let j = 0; j < coloredCells[i].length; j++) {
        coloredCells[i][j].current!.style.backgroundColor = ``;
      }
    }

    store.dispatch(updatePathFindingGridState(gridCopy));
    gridCopy = gridCopy.map((row) => [...row]);
    return destination;
  }

  setFinalState(): void {}
}

export class AStarSearch extends PathFindingAlgorithmBase {
  public async executeAlgorithm(): Promise<void> {}
  setFinalState(): void {}
}
