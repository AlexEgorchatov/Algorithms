import { store } from '../../App';
import { SortingBarProps, SortingBarStateEnum, selectedSortingAlgorithm } from '../../Pages/SortingPage';
import { updateIsStateUpdatedState, updateSortingBarsStateAction } from '../../Store/Sorting Page/SortingPageStateManagement';
import { AnimationManager } from './AnimationManager';

export class SortingAlgorithmManager {
  public static initialState: SortingBarProps[] = [];

  private constructor() {}

  public static setInitialState(): void {
    this.initialState = store.getState().sortingPageState.sortingBars;
  }

  public static async startAlgorithm(): Promise<void> {
    if (store.getState().sortingPageState.isStateUpdated) {
      this.setInitialState();
      selectedSortingAlgorithm.setFinalState();
      store.dispatch(updateIsStateUpdatedState(false));
    }

    if (AnimationManager.isAnimationCompleted) {
      store.dispatch(updateSortingBarsStateAction(this.initialState));
      await new Promise((resolve) => setTimeout(resolve, 250));
    }

    AnimationManager.isAnimationCompleted = false;

    await selectedSortingAlgorithm.executeAlgorithm();
    if (!store.getState().animationState.hasAnimationStarted) return;
    await this.finalizeSorting();
  }

  public static async stopAlgorithm(): Promise<void> {
    store.dispatch(updateSortingBarsStateAction(this.initialState));
  }

  public static async completeAlgorithm(): Promise<void> {
    store.dispatch(updateSortingBarsStateAction(selectedSortingAlgorithm.finalState));
  }

  public static swapSortingBarsVisually(barsCopy: SortingBarProps[], index1: number, index2: number): void {
    barsCopy = [...barsCopy];
    let currentLeftOffset = document.getElementById(index1.toString())?.offsetLeft;
    let nextLeftOffset = document.getElementById(index2.toString())?.offsetLeft;
    barsCopy[index1] = { ...barsCopy[index1], barState: SortingBarStateEnum.Selected, leftOffset: nextLeftOffset };
    barsCopy[index2] = { ...barsCopy[index2], barState: SortingBarStateEnum.Selected, leftOffset: currentLeftOffset };
    store.dispatch(updateSortingBarsStateAction(barsCopy));
  }

  public static selectSortingBars(barsCopy: SortingBarProps[], index1: number, index2: number): void {
    barsCopy = [...barsCopy];
    barsCopy[index1] = { ...barsCopy[index1], barState: SortingBarStateEnum.Selected };
    barsCopy[index2] = { ...barsCopy[index2], barState: SortingBarStateEnum.Selected };
    store.dispatch(updateSortingBarsStateAction(barsCopy));
  }

  public static deselectSortingBars(barsCopy: SortingBarProps[], index1: number, index2: number): void {
    barsCopy = [...barsCopy];
    barsCopy[index1] = { ...barsCopy[index1], barState: SortingBarStateEnum.Unselected };
    barsCopy[index2] = { ...barsCopy[index2], barState: SortingBarStateEnum.Unselected };
    store.dispatch(updateSortingBarsStateAction(barsCopy));
  }

  private static async finalizeSorting(): Promise<void> {
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
