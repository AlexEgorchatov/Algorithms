import { createContext } from 'react';
import { store } from '../App';
import { SortingBarProps, SortingBarStateEnum, selectedSortingAlgorithm } from '../Pages/SortingPage';
import { updateIsStateUpdatedState, updateSortingBarsStateAction } from '../Store/Sorting Page/SortingPageStateManagement';
import { updateHasAnimationStartedStateAction, updateIsAnimationRunningStateAction } from '../Store/Shared/AnimationStateManagement';
import { StringMatchingCharacterProps, selectedStringMatchingAlgorithm } from '../Pages/StringMatchingPage';

interface animationProps {
  startAlgorithm: () => Promise<void>;
  stopAlgorithm: () => Promise<void>;
  completeAlgorithm: () => Promise<void>;
}

export const animationContext = createContext<animationProps>({
  startAlgorithm: () => Promise.resolve(),
  stopAlgorithm: () => Promise.resolve(),
  completeAlgorithm: () => Promise.resolve(),
});

export class AnimationManager {
  public static isAnimationCompleted: boolean = false;
  public static readonly algorithmIterationBaseTime: number = 400;

  private constructor() {}

  public static async isAnimationTerminated(): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      if (!store.getState().animationState.hasAnimationStarted || this.isAnimationCompleted) {
        resolve(true);
        return;
      }
      if (store.getState().animationState.isAnimationRunning) {
        resolve(false);
        return;
      }
      if (!(await AnimationManager.isAnimationContinued())) {
        resolve(true);
        return;
      }

      resolve(false);
    });
  }

  public static async pauseForStepIteration(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, this.algorithmIterationBaseTime - 30 * (store.getState().sliderComponentState.sliderValue - 1)));
  }

  public static async startAnimation(startAlgorithm: () => Promise<void>): Promise<void> {
    store.dispatch(updateIsAnimationRunningStateAction(true));
    if (store.getState().animationState.hasAnimationStarted) return;

    store.dispatch(updateHasAnimationStartedStateAction(true));
    await startAlgorithm();

    this.isAnimationCompleted = true;
    store.dispatch(updateIsAnimationRunningStateAction(false));
    store.dispatch(updateHasAnimationStartedStateAction(false));
  }

  public static stopAnimation(stopAlgorithm: () => Promise<void>): void {
    if (!store.getState().animationState.hasAnimationStarted) return;

    store.dispatch(updateHasAnimationStartedStateAction(false));
    store.dispatch(updateIsAnimationRunningStateAction(false));
    stopAlgorithm();
  }

  public static completeAnimation(completeAlgorithm: () => Promise<void>): void {
    if (!store.getState().animationState.hasAnimationStarted) return;

    this.isAnimationCompleted = true;
    completeAlgorithm();
  }

  private static async isAnimationContinued(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      let unsubscribe = store.subscribe(() => {
        if (!store.getState().animationState.hasAnimationStarted || this.isAnimationCompleted) {
          resolve(false);
          unsubscribe();
          return;
        }
        if (store.getState().animationState.isAnimationRunning) {
          resolve(true);
          unsubscribe();
          return;
        }
      });
    });
  }
}

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

export class StringMatchingAlgorithmManager {
  public static initialState: StringMatchingCharacterProps[] = [];

  private constructor() {}

  public static setInitialState(): void {
    this.initialState = store.getState().stringMatchingPageState.stringMatchingAnimationInput;
  }

  public static async startAlgorithm(): Promise<void> {
    selectedStringMatchingAlgorithm.executeAlgorithm();
  }

  public static async stopAlgorithm(): Promise<void> {}

  public static async completeAlgorithm(): Promise<void> {}
}
