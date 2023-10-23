import { updateSelectedPathFindingAlgorithmState } from '../../Store/Path Finding Module/PathFindingModuleStateManagement';
import { AppState, store } from '../../Store/Store';
import { AlgorithmBase } from '../Abstractions/AlgorithmBase';
import { AlgorithmsManagerBase } from '../Abstractions/AlgorithmManagerBase';
import { IPathFindingCellProps } from '../Interfaces/IPathFindingCellProps';
import { IStoreModule } from '../Interfaces/IStoreModule';

export class PathFindingAlgorithmsManager extends AlgorithmsManagerBase {
  public selectedAlgorithm: AlgorithmBase;
  public initialState: IPathFindingCellProps[] = [];
  public isStateUpdated: boolean = false;

  public constructor(selectedAlgorithm: AlgorithmBase) {
    super();
    this.selectedAlgorithm = selectedAlgorithm;
    store.dispatch(updateSelectedPathFindingAlgorithmState(selectedAlgorithm.constructor.name));
  }

  public setInitialState(): void {}
  public resetToInitialState(): void {}
  public getStoreSelector(): IStoreModule {
    return (state: AppState) => state.pathFindingModuleState;
  }
  public updateStoreSelectedAlgorithmName(): void {
    store.dispatch(updateSelectedPathFindingAlgorithmState(this.selectedAlgorithm.constructor.name));
  }
  public async startAlgorithm(): Promise<void> {}
  public async stopAlgorithm(): Promise<void> {}
  public async completeAlgorithm(): Promise<void> {}
}
