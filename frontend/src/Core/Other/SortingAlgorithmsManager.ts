import { SortingBarStateEnum } from '../../Resources/Enumerations';
import { updateSelectedSortingAlgorithmState, updateSortingBarsStateAction } from '../../Store/Sorting Module/SortingPageStateManagement';
import { AppState, store } from '../../Store/Store';
import { AlgorithmBase } from '../Abstractions/AlgorithmBase';
import { AlgorithmsManagerBase } from '../Abstractions/AlgorithmManagerBase';
import { ISortingBarProps } from '../Interfaces/ISortingBarProps';
import { IStoreModule } from '../Interfaces/IStoreModule';

export class SortingAlgorithmsManager implements AlgorithmsManagerBase<ISortingBarProps> {
  public selectedAlgorithm: AlgorithmBase<any>;
  public initialState: ISortingBarProps[] = [];
  public isStateUpdated: boolean = false;

  public constructor(selectedAlgorithm: AlgorithmBase<any>) {
    this.selectedAlgorithm = selectedAlgorithm;
    store.dispatch(updateSelectedSortingAlgorithmState(selectedAlgorithm.constructor.name));
  }

  public setInitialState(): void {
    this.initialState = [...store.getState().sortingModuleState.sortingBars];
  }

  public resetToInitialState(): void {
    store.dispatch(updateSortingBarsStateAction(this.initialState));
  }

  public getStoreSelector(): IStoreModule {
    return (state: AppState) => state.sortingModuleState;
  }

  public updateStoreSelectedAlgorithmName(): void {
    store.dispatch(updateSelectedSortingAlgorithmState(this.selectedAlgorithm.constructor.name));
  }

  public async startAlgorithm(): Promise<void> {
    if (this.isStateUpdated) {
      this.setInitialState();
      this.selectedAlgorithm.setFinalState();
      this.isStateUpdated = false;
    }

    await this.selectedAlgorithm.executeAlgorithm();

    if (!store.getState().animationState.hasAnimationStarted) return;
    await this.finalizeSorting();
  }

  public async stopAlgorithm(): Promise<void> {
    store.dispatch(updateSortingBarsStateAction(this.initialState));
  }

  public async completeAlgorithm(): Promise<void> {
    store.dispatch(updateSortingBarsStateAction(this.selectedAlgorithm.finalState));
  }

  private async finalizeSorting(): Promise<void> {
    let barsCopy = [...store.getState().sortingModuleState.sortingBars];
    let timeout = 300 / barsCopy.length;

    for (let i = 0; i < barsCopy.length; i++) {
      barsCopy = [...barsCopy];
      barsCopy[i] = { ...barsCopy[i], barState: SortingBarStateEnum.Completed };
      store.dispatch(updateSortingBarsStateAction(barsCopy));
      await new Promise((resolve) => setTimeout(resolve, timeout));
    }
  }
}
