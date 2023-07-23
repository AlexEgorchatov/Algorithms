import { store } from '../App';
import { finalSortingBars, initialSortingBars, selectedAlgorithm } from '../Pages/SortingPage';
import {
  SortingBarProps,
  SortingBarStateEnum,
  updatingHasAlgorithmStartedState,
  updatingIsAlgorithmRunningStateAction,
  updatingSortingBarsStateAction,
} from '../Store/Sorting Page/SortingPageStateManagement';

/**Waits for the next action after the algorithm was paused.
 * Returns true if the algorithm continues execution, false if the algorithm was stopped or animation was skipped.*/
export const waitForContinuation = () => {
  return new Promise<boolean>((resolve) => {
    let unsubscribe = store.subscribe(() => {
      if (store.getState().sortingPageState.isAlgorithmRunning) {
        unsubscribe();
        resolve(true);
      } else if (isAlgorithmTerminated()) {
        unsubscribe();
        resolve(false);
      }
    });
  });
};

export const handleStartSorting = async () => {
  store.dispatch(updatingIsAlgorithmRunningStateAction(true));
  if (store.getState().sortingPageState.hasAlgorithmStarted) return;

  store.dispatch(updatingHasAlgorithmStartedState(true));
  if (
    JSON.stringify(store.getState().sortingPageState.sortingBars.map((i) => i.barHeight)) === JSON.stringify(finalSortingBars.map((i) => i.barHeight))
  ) {
    store.dispatch(updatingSortingBarsStateAction(initialSortingBars));
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  selectedAlgorithm.executeAlgorithm();
};

export const isAlgorithmTerminated = (): boolean => {
  if (store.getState().sortingPageState.hasAlgorithmStarted) return false;
  else return true;
};

export const finalizeSorting = async (barsCopy: SortingBarProps[], isComplete = false) => {
  let timeout = isComplete ? 0 : 300 / barsCopy.length;
  for (let i = 0; i < barsCopy.length; i++) {
    barsCopy = [...barsCopy];
    barsCopy[i] = { ...barsCopy[i], barState: SortingBarStateEnum.Completed };
    store.dispatch(updatingSortingBarsStateAction(barsCopy));
    if (timeout !== 0) await new Promise((resolve) => setTimeout(resolve, timeout));
  }

  store.dispatch(updatingHasAlgorithmStartedState(false));
  store.dispatch(updatingIsAlgorithmRunningStateAction(false));
};

export const handleCompleteSorting = () => {
  if (!store.getState().sortingPageState.hasAlgorithmStarted) return;

  store.dispatch(updatingHasAlgorithmStartedState(false));
  store.dispatch(updatingIsAlgorithmRunningStateAction(false));
  store.dispatch(updatingSortingBarsStateAction(finalSortingBars));
  finalizeSorting(finalSortingBars, true);
};

export const handleStopSorting = () => {
  if (!store.getState().sortingPageState.hasAlgorithmStarted) return;

  store.dispatch(updatingHasAlgorithmStartedState(false));
  store.dispatch(updatingIsAlgorithmRunningStateAction(false));
  store.dispatch(updatingSortingBarsStateAction(initialSortingBars));
};

export const swapSortingBarsVisually = (barsCopy: SortingBarProps[], index1: number, index2: number) => {
  barsCopy = [...barsCopy];
  let currentLeftOffset = document.getElementById(index1.toString())?.offsetLeft;
  let nextLeftOffset = document.getElementById(index2.toString())?.offsetLeft;
  barsCopy[index1] = { ...barsCopy[index1], barState: SortingBarStateEnum.Selected, leftOffset: nextLeftOffset };
  barsCopy[index2] = { ...barsCopy[index2], barState: SortingBarStateEnum.Selected, leftOffset: currentLeftOffset };
  store.dispatch(updatingSortingBarsStateAction(barsCopy));
};

export const selectSortingBars = (barsCopy: SortingBarProps[], index1: number, index2: number) => {
  barsCopy = [...barsCopy];
  barsCopy[index1] = { ...barsCopy[index1], barState: SortingBarStateEnum.Selected };
  barsCopy[index2] = { ...barsCopy[index2], barState: SortingBarStateEnum.Selected };
  store.dispatch(updatingSortingBarsStateAction(barsCopy));
};

export const unselectSortingBars = (barsCopy: SortingBarProps[], index1: number, index2: number) => {
  barsCopy = [...barsCopy];
  barsCopy[index1] = { ...barsCopy[index1], barState: SortingBarStateEnum.Unselected };
  barsCopy[index2] = { ...barsCopy[index2], barState: SortingBarStateEnum.Unselected };
  store.dispatch(updatingSortingBarsStateAction(barsCopy));
};
