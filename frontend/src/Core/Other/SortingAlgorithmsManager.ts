import { SortingBarStateEnum } from '../../Resources/Enumerations';
import { updateIsAnimationFinalizingStateAction } from '../../Store/Shared/AnimationStateManagement';
import { updateSelectedSortingAlgorithmState, updateSortingBarsStateAction } from '../../Store/Sorting Module/SortingModuleStateManagement';
import { store } from '../../Store/Store';
import { AlgorithmBase } from '../Abstractions/AlgorithmBase';
import { AlgorithmsManagerBase } from '../Abstractions/AlgorithmManagerBase';
import { ISortingBarProps } from '../Interfaces/ISortingBarProps';

export class SortingAlgorithmsManager extends AlgorithmsManagerBase {
  public selectedAlgorithm: AlgorithmBase;
  public initialState: ISortingBarProps[] = [];
  public isStateUpdated: boolean = false;

  public constructor(selectedAlgorithm: AlgorithmBase) {
    super();
    this.selectedAlgorithm = selectedAlgorithm;
    store.dispatch(updateSelectedSortingAlgorithmState(selectedAlgorithm.constructor.name));
  }

  public setInitialState(): void {
    this.initialState = [...store.getState().sortingModuleState.sortingBars];
  }

  public resetToInitialState(): void {
    store.dispatch(updateSortingBarsStateAction(this.initialState));
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
    store.dispatch(updateIsAnimationFinalizingStateAction(false));
  }

  public async stopAlgorithm(): Promise<void> {
    store.dispatch(updateSortingBarsStateAction(this.initialState));
  }

  public async completeAlgorithm(): Promise<void> {
    store.dispatch(updateIsAnimationFinalizingStateAction(true));
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
