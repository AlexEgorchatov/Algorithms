import { SortingBarStateEnum } from '../../Resources/Enumerations';
import { updateSelectedSortingAlgorithmState, updateSortingBarsStateAction } from '../../Store/Sorting Page/SortingPageStateManagement';
import { AppState, store } from '../../Store/Store';
import { AlgorithmBase } from '../Abstractions/AlgorithmBase';
import { AlgorithmsManagerBase } from '../Abstractions/AlgorithmManagerBase';
import { SortingBarProps } from '../Interfaces/SortingBarPropsInterface';
import { StoreModule } from '../Interfaces/StoreModuleInterface';

export class SortingAlgorithmsManager implements AlgorithmsManagerBase<SortingBarProps> {
  public selectedAlgorithm: AlgorithmBase<any>;
  public initialState: SortingBarProps[] = [];
  public isStateUpdated: boolean = false;

  public constructor(selectedAlgorithm: AlgorithmBase<any>) {
    this.selectedAlgorithm = selectedAlgorithm;
    store.dispatch(updateSelectedSortingAlgorithmState(selectedAlgorithm.constructor.name));
  }

  public setInitialState(): void {
    this.initialState = [...store.getState().sortingPageState.sortingBars];
  }

  public resetToInitialState(): void {
    store.dispatch(updateSortingBarsStateAction(this.initialState));
  }

  public getStoreSelector(): StoreModule {
    return (state: AppState) => state.sortingPageState;
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
    let barsCopy = [...store.getState().sortingPageState.sortingBars];
    let timeout = 300 / barsCopy.length;

    for (let i = 0; i < barsCopy.length; i++) {
      barsCopy = [...barsCopy];
      barsCopy[i] = { ...barsCopy[i], barState: SortingBarStateEnum.Completed };
      store.dispatch(updateSortingBarsStateAction(barsCopy));
      await new Promise((resolve) => setTimeout(resolve, timeout));
    }
  }
}
