import { SortingBarStateEnum } from '../../Resources/Enumerations';
import { SortingBarProps } from '../../Resources/SharedProps';
import { updateIsStateUpdatedState, updateSortingBarsStateAction } from '../../Store/Sorting Page/SortingPageStateManagement';
import { store } from '../../Store/Store';
import { AlgorithmBase } from '../Abstractions/AlgorithmBase';
import { AlgorithmManagerBase } from '../Abstractions/AlgorithmManagerBase';

export class SortingAlgorithmManager implements AlgorithmManagerBase<SortingBarProps> {
  public selectedAlgorithm: AlgorithmBase<any>;
  public initialState: SortingBarProps[] = [];

  public constructor(selectedAlgorithm: AlgorithmBase<any>) {
    this.selectedAlgorithm = selectedAlgorithm;
  }

  public resetToInitialState(): void {
    store.dispatch(updateSortingBarsStateAction(this.initialState));
  }

  public setInitialState(): void {
    this.initialState = store.getState().sortingPageState.sortingBars;
  }

  public async startAlgorithm(): Promise<void> {
    if (store.getState().sortingPageState.isStateUpdated) {
      this.setInitialState();
      this.selectedAlgorithm.setFinalState();
      store.dispatch(updateIsStateUpdatedState(false));
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
