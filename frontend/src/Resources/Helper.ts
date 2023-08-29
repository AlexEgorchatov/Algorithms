import { createContext } from 'react';
import { store } from '../App';
import { SortingBarProps, SortingBarStateEnum, finalSortingBars, initialSortingBars, selectedSortingAlgorithm } from '../Pages/SortingPage';
import { updateSortingBarsStateAction } from '../Store/Sorting Page/SortingPageStateManagement';
import {
  updateHasAnimationStartedStateAction,
  updateIsAlgorithmCompletedStateAction,
  updateIsAnimationRunningStateAction,
} from '../Store/Shared/AnimationStateManagement';
import { selectedStringMatchingAlgorithm } from '../Pages/StringMatchingPage';

//#region Algorithm helpers

interface animationProps {
  startAlgorithm: () => Promise<void>;
  pauseAlgorithm?: () => Promise<void>;
  stopAlgorithm: () => Promise<void>;
  completeAlgorithm: () => Promise<void>;
}

export const algorithmContext = createContext<animationProps>({
  startAlgorithm: () => Promise.resolve(),
  pauseAlgorithm: () => Promise.resolve(),
  stopAlgorithm: () => Promise.resolve(),
  completeAlgorithm: () => Promise.resolve(),
});

export const algorithmStepBaseTime: number = 400;
export const algorithmAnimationBaseTime: number = 280;

/**
 * Waits for the next action after the animation is paused.
 * @returns If animation was stopped (hasAlgorithmStarted == false) or was completed (isAlgorithmCompleted == true) return false.
 * If animation was resumed (isAlgorithmRunning == true) return true.
 */
export const isAnimationContinued = () => {
  return new Promise<boolean>((resolve) => {
    let unsubscribe = store.subscribe(() => {
      if (!store.getState().animationState.hasAnimationStarted || store.getState().animationState.isAnimationCompleted) {
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
};

/**
 * Checks if the animation is terminated.
 * @returns If animation was stopped (hasAlgorithmStarted == false) or was completed (isAlgorithmCompleted == true) return true.
 * If animation was not paused (isAlgorithmRunning == true) return false.
 * Otherwise, wait for the next action after the animation is paused.
 */
export const isAnimationTerminated = async (): Promise<boolean> => {
  return new Promise<boolean>(async (resolve) => {
    if (!store.getState().animationState.hasAnimationStarted || store.getState().animationState.isAnimationCompleted) {
      resolve(true);
      return;
    }
    if (store.getState().animationState.isAnimationRunning) {
      resolve(false);
      return;
    }
    if (!(await isAnimationContinued())) {
      resolve(true);
      return;
    }

    resolve(false);
  });
};

export const pauseForStepIteration = async () => {
  await new Promise((resolve) => setTimeout(resolve, algorithmStepBaseTime - 30 * (store.getState().sliderComponentState.sliderValue - 1)));
};

export const startAnimation = async (startAlgorithm: () => Promise<void>) => {
  store.dispatch(updateIsAnimationRunningStateAction(true));
  //If animation has started, this function only continues animation and should not proceed forward
  if (store.getState().animationState.hasAnimationStarted) return;

  store.dispatch(updateHasAnimationStartedStateAction(true));
  await startAlgorithm();

  store.dispatch(updateIsAnimationRunningStateAction(false));
  if (store.getState().animationState.hasAnimationStarted) store.dispatch(updateHasAnimationStartedStateAction(false));
  if (!store.getState().animationState.isAnimationCompleted) store.dispatch(updateIsAlgorithmCompletedStateAction(true));
};

export const stopAnimation = (stopAlgorithm: () => Promise<void>) => {
  if (!store.getState().animationState.hasAnimationStarted) return;

  stopAlgorithm();
  store.dispatch(updateHasAnimationStartedStateAction(false));
};

export const completeAnimation = (completeAlgorithm: () => Promise<void>) => {
  if (!store.getState().animationState.hasAnimationStarted) return;

  completeAlgorithm();
  store.dispatch(updateIsAlgorithmCompletedStateAction(true));
};

//#endregion

//#region Sorting Page helpers

export const startSorting = async () => {
  //If animation is completed, reset its state
  if (store.getState().animationState.isAnimationCompleted) {
    store.dispatch(updateSortingBarsStateAction(initialSortingBars));
    store.dispatch(updateIsAlgorithmCompletedStateAction(false));
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  //obtain initial and final states. must be asynchronous
  await selectedSortingAlgorithm.executeAlgorithm();
  await finalizeSorting();
};

export const stopSorting = async () => {
  store.dispatch(updateSortingBarsStateAction(initialSortingBars));
};

export const completeSorting = async () => {
  store.dispatch(updateSortingBarsStateAction(finalSortingBars));
};

const finalizeSorting = async () => {
  let barsCopy = [...store.getState().sortingPageState.sortingBars];
  let timeout = 300 / barsCopy.length;

  for (let i = 0; i < barsCopy.length; i++) {
    barsCopy = [...barsCopy];
    barsCopy[i] = { ...barsCopy[i], barState: SortingBarStateEnum.Completed };
    store.dispatch(updateSortingBarsStateAction(barsCopy));
    await new Promise((resolve) => setTimeout(resolve, timeout));
  }
};

export const swapSortingBarsVisually = (barsCopy: SortingBarProps[], index1: number, index2: number) => {
  barsCopy = [...barsCopy];
  let currentLeftOffset = document.getElementById(index1.toString())?.offsetLeft;
  let nextLeftOffset = document.getElementById(index2.toString())?.offsetLeft;
  barsCopy[index1] = { ...barsCopy[index1], barState: SortingBarStateEnum.Selected, leftOffset: nextLeftOffset };
  barsCopy[index2] = { ...barsCopy[index2], barState: SortingBarStateEnum.Selected, leftOffset: currentLeftOffset };
  store.dispatch(updateSortingBarsStateAction(barsCopy));
};

export const selectSortingBars = (barsCopy: SortingBarProps[], index1: number, index2: number) => {
  barsCopy = [...barsCopy];
  barsCopy[index1] = { ...barsCopy[index1], barState: SortingBarStateEnum.Selected };
  barsCopy[index2] = { ...barsCopy[index2], barState: SortingBarStateEnum.Selected };
  store.dispatch(updateSortingBarsStateAction(barsCopy));
};

export const deselectSortingBars = (barsCopy: SortingBarProps[], index1: number, index2: number) => {
  barsCopy = [...barsCopy];
  barsCopy[index1] = { ...barsCopy[index1], barState: SortingBarStateEnum.Unselected };
  barsCopy[index2] = { ...barsCopy[index2], barState: SortingBarStateEnum.Unselected };
  store.dispatch(updateSortingBarsStateAction(barsCopy));
};

//TODO: put each function into corresponding static class
export class Test {
  public static handleStartSorting = async () => {
    if (store.getState().animationState.isAnimationCompleted) {
      store.dispatch(updateSortingBarsStateAction(initialSortingBars));
      store.dispatch(updateIsAlgorithmCompletedStateAction(false));
      await new Promise((resolve) => setTimeout(resolve, 250));
    }

    selectedSortingAlgorithm.executeAlgorithm();
  };
}

//#endregion

//#region String Matching helpers

export const handleStartSearch = async () => {
  selectedStringMatchingAlgorithm.executeAlgorithm();
};

export const handleCompleteSearch = async () => {};

export const handleStopSearch = async () => {};

//#endregion
