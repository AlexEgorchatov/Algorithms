import { PathFindingCellStateEnum } from '../../Resources/Enumerations';
import {
  updatePathFindingDestinationState,
  updatePathFindingGridState,
} from '../../Redux/Path Finding Module/PathFindingModuleStateManagement';
import { store } from '../../Redux/Store';
import { PathFindingAlgorithmBase } from '../Abstractions/AlgorithmBase';
import { isAnimationTerminated, pauseForStepIteration } from '../Helpers/GeneralHelper';
import { IPathFindingCellProps } from '../Interfaces/IPathFindingCellProps';
import {
  directions,
  getCellColor,
  isCellValid,
  resetCellsRefsBackground,
} from '../Other/PathFindingAlgorithmsManager';

export class BreadthFirstSearch extends PathFindingAlgorithmBase {
  title: string = 'Breadth First Search';

  public async executeAlgorithm(cellsRefs: React.RefObject<HTMLDivElement>[][]): Promise<number> {
    return new Promise<number>(async (resolve) => {
      let pathFindingModuleState = store.getState().pathFindingModuleState;
      let dispatch = store.dispatch;
      let gridCopy: IPathFindingCellProps[][] = pathFindingModuleState.pathFindingGrid.map(
        (row) => [...row],
      );
      let source: IPathFindingCellProps = pathFindingModuleState.pathFindingSource;
      let destination: IPathFindingCellProps = pathFindingModuleState.pathFindingDestination;

      let queue: IPathFindingCellProps[] = [source];
      let queueLength: number = 1;
      let computedDistance: number = 0;
      while (queue.length > 0 && destination.distance === 0) {
        let top = queue[0];
        queue.shift();

        for (let i = 0; i < directions.length; i++) {
          let newRow: number = top.rowIndex + directions[i][0];
          let newColumn: number = top.columnIndex + directions[i][1];
          if (!isCellValid(gridCopy, newRow, newColumn)) continue;

          if (gridCopy[newRow][newColumn].cellState === PathFindingCellStateEnum.Destination) {
            dispatch(
              updatePathFindingDestinationState(
                (destination = { ...gridCopy[newRow][newColumn], distance: top.distance + 1 }),
              ),
            );
            await pauseForStepIteration();
            break;
          }

          gridCopy[newRow][newColumn] = {
            ...gridCopy[newRow][newColumn],
            cellState: PathFindingCellStateEnum.Checked,
            distance: top.distance + 1,
          };
          cellsRefs[newRow][newColumn].current!.style.backgroundColor = getCellColor(
            PathFindingCellStateEnum.Checked,
          );
          queue.push(gridCopy[newRow][newColumn]);
        }

        if (--queueLength === 0 && destination.distance === 0) {
          queueLength = queue.length;
          if (queueLength === 0) break;

          computedDistance++;
          await pauseForStepIteration();
          if (await isAnimationTerminated()) {
            resolve(computedDistance);
            return;
          }
        }
      }

      resetCellsRefsBackground(cellsRefs);
      dispatch(updatePathFindingGridState(gridCopy));
      gridCopy = gridCopy.map((row) => [...row]);
      resolve(++computedDistance);
      return;
    });
  }

  setFinalState(): void {
    let pathFindingModuleState = store.getState().pathFindingModuleState;
    let gridCopy: IPathFindingCellProps[][] = pathFindingModuleState.pathFindingGrid.map((row) => [
      ...row,
    ]);
    let source: IPathFindingCellProps = pathFindingModuleState.pathFindingSource;
    let destination: IPathFindingCellProps = pathFindingModuleState.pathFindingDestination;

    let queue: IPathFindingCellProps[] = [source];
    let queueLength = 1;
    while (queue.length > 0 && destination.distance === 0) {
      let top = queue[0];
      queue.shift();

      for (let i = 0; i < directions.length; i++) {
        let newRow: number = top.rowIndex + directions[i][0];
        let newColumn: number = top.columnIndex + directions[i][1];
        if (!isCellValid(gridCopy, newRow, newColumn)) continue;

        if (gridCopy[newRow][newColumn].cellState === PathFindingCellStateEnum.Destination) {
          destination = { ...gridCopy[newRow][newColumn], distance: top.distance + 1 };
          gridCopy[newRow][newColumn] = {
            ...gridCopy[newRow][newColumn],
            distance: top.distance + 1,
          };
          break;
        }

        gridCopy[newRow][newColumn] = {
          ...gridCopy[newRow][newColumn],
          cellState: PathFindingCellStateEnum.Checked,
          distance: top.distance + 1,
        };
        queue.push(gridCopy[newRow][newColumn]);
      }

      if (--queueLength === 0 && destination.distance === 0) {
        queueLength = queue.length;
        if (queueLength === 0) break;
      }
    }

    this.finalState = gridCopy.map((row) => [...row]);
  }
}

export class AStarSearch extends PathFindingAlgorithmBase {
  title: string = 'A* Search';

  public async executeAlgorithm(): Promise<void> {}
  setFinalState(): void {}
}
