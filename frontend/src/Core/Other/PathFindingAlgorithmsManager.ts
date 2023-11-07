import { updatePathFindingGridState, updateSelectedPathFindingAlgorithmState } from '../../Store/Path Finding Module/PathFindingModuleStateManagement';
import { store } from '../../Store/Store';
import { AlgorithmBase } from '../Abstractions/AlgorithmBase';
import { AlgorithmsManagerBase } from '../Abstractions/AlgorithmManagerBase';
import { IPathFindingCellProps } from '../Interfaces/IPathFindingCellProps';

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

    await this.selectedAlgorithm.executeAlgorithm();
  }

  public async stopAlgorithm(): Promise<void> {
    store.dispatch(updatePathFindingGridState(this.initialState));
  }

  public async completeAlgorithm(): Promise<void> {}

  private async finalizeSorting(): Promise<void> {}
}
