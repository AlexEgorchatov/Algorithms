import { createContext } from 'react';
import { store } from '../App';
import { SortingBarProps, SortingBarStateEnum, finalSortingBars, initialSortingBars, selectedSortingAlgorithm } from '../Pages/SortingPage';
import { updateSortingBarsStateAction } from '../Store/Sorting Page/SortingPageStateManagement';
import {
  updateHasAlgorithmStartedStateAction,
  updateIsAlgorithmCompletedStateAction,
  updateIsAlgorithmRunningStateAction,
} from '../Store/Shared/AlgorithmStateManagement';
import { selectedStringMatchingAlgorithm } from '../Pages/StringMatchingPage';

//#region Algorithm helpers

interface algorithmProps {
  startAlgorithm: () => Promise<void>;
  pauseAlgorithm?: () => Promise<void>;
  stopAlgorithm: () => Promise<void>;
  completeAlgorithm: () => Promise<void>;
}

export const algorithmContext = createContext<algorithmProps>({
  startAlgorithm: () => Promise.resolve(),
  pauseAlgorithm: () => Promise.resolve(),
  stopAlgorithm: () => Promise.resolve(),
  completeAlgorithm: () => Promise.resolve(),
});

export const algorithmStepBaseTime: number = 400;
export const algorithmAnimationBaseTime: number = 280;

/**
 * Waits for the next action after the algorithm was paused.
 * @returns true if the algorithm continues execution, false if the algorithm was stopped or animation was skipped.
 */
export const waitForContinuation = () => {
  return new Promise<boolean>((resolve) => {
    let unsubscribe = store.subscribe(() => {
      if (store.getState().algorithmState.isAlgorithmRunning) {
        unsubscribe();
        resolve(true);
      } else if (!store.getState().algorithmState.hasAlgorithmStarted) {
        unsubscribe();
        resolve(false);
      }
    });
  });
};

/**
 * Checks if the algorithm is terminated or not.
 * @returns true if an algorithm was terminated, false otherwise.
 */
export const isAlgorithmTerminated = async (): Promise<boolean> => {
  return new Promise<boolean>(async (resolve) => {
    if (!store.getState().algorithmState.hasAlgorithmStarted) {
      resolve(true);
      return;
    }
    if (!store.getState().algorithmState.isAlgorithmRunning) {
      if (!(await waitForContinuation())) {
        resolve(true);
        return;
      } else {
        resolve(false);
        return;
      }
    }

    resolve(false);
  });
};

export const pauseForStepIteration = async () => {
  await new Promise((resolve) => setTimeout(resolve, algorithmStepBaseTime - 30 * (store.getState().sliderComponentState.sliderValue - 1)));
};

export const handlePlayButtonClick = (startAlgorithm: () => Promise<void>) => {
  store.dispatch(updateIsAlgorithmRunningStateAction(true));
  if (store.getState().algorithmState.hasAlgorithmStarted) return;

  store.dispatch(updateHasAlgorithmStartedStateAction(true));
  startAlgorithm();
};

export const handleStopButtonClick = (stopAlgorithm: () => Promise<void>) => {
  if (!store.getState().algorithmState.hasAlgorithmStarted) return;

  store.dispatch(updateHasAlgorithmStartedStateAction(false));
  store.dispatch(updateIsAlgorithmRunningStateAction(false));
  stopAlgorithm();
};

export const handleCompleteButtonClick = (completeAlgorithm: () => Promise<void>) => {
  if (!store.getState().algorithmState.hasAlgorithmStarted) return;

  store.dispatch(updateHasAlgorithmStartedStateAction(false));
  store.dispatch(updateIsAlgorithmRunningStateAction(false));
  store.dispatch(updateIsAlgorithmCompletedStateAction(true));
  completeAlgorithm();
};

//#endregion

//#region Sorting Page helpers

export const handleStartSorting = async () => {
  if (store.getState().algorithmState.isAlgorithmCompleted) {
    store.dispatch(updateSortingBarsStateAction(initialSortingBars));
    store.dispatch(updateIsAlgorithmCompletedStateAction(false));
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  selectedSortingAlgorithm.executeAlgorithm();
};

export const handleCompleteSorting = async () => {
  store.dispatch(updateSortingBarsStateAction(finalSortingBars));
  store.dispatch(updateIsAlgorithmCompletedStateAction(true));
  finalizeSorting(finalSortingBars, true);
};

export const handleStopSorting = async () => {
  store.dispatch(updateSortingBarsStateAction(initialSortingBars));
};

export const finalizeSorting = async (barsCopy: SortingBarProps[], isComplete = false) => {
  let timeout = isComplete ? 0 : 300 / barsCopy.length;
  for (let i = 0; i < barsCopy.length; i++) {
    barsCopy = [...barsCopy];
    barsCopy[i] = { ...barsCopy[i], barState: SortingBarStateEnum.Completed };
    store.dispatch(updateSortingBarsStateAction(barsCopy));
    if (timeout !== 0) await new Promise((resolve) => setTimeout(resolve, timeout));
  }

  store.dispatch(updateHasAlgorithmStartedStateAction(false));
  store.dispatch(updateIsAlgorithmRunningStateAction(false));
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

//#endregion

//#region String Matching helpers

export const handleStartSearch = async () => {
  selectedStringMatchingAlgorithm.executeAlgorithm();
};

export const handleCompleteSearch = async () => {};

export const handleStopSearch = async () => {};

//#endregion
