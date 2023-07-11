import { store } from '../App';
import {
  SortingBarStateEnum,
  updatingHasAlgorithmStartedState,
  updatingIsAlgorithmRunningStateAction,
  updatingSortingBarsStateAction,
} from '../Store/Sorting Page/SortingAlgorithmStateManagement';
import { SortingEnumeration } from './Sorting Page Resources/SortingData';

/**Waits for the next action after the algorithm was paused.
 * Returns true if the algorithm continues execution, false if the algorithm was stopped or animation was skipped.*/
const waitForContinuation = () => {
  return new Promise<boolean>((resolve) => {
    let unsubscribe = store.subscribe(() => {
      const state = store.getState().sortingAlgorithmState;
      if (state.isAlgorithmRunning) {
        unsubscribe();
        resolve(true);
      } else if (!state.hasAlgorithmStarted) {
        unsubscribe();
        resolve(false);
      }
    });
  });
};

export const handleStartAlgorithmButtonClick = async () => {
  store.dispatch(updatingIsAlgorithmRunningStateAction(true));
  if (store.getState().sortingAlgorithmState.hasAlgorithmStarted) return;

  store.dispatch(updatingHasAlgorithmStartedState(true));
  if (
    JSON.stringify(store.getState().sortingAlgorithmState.sortingBars.map((i) => i.barHeight)) ===
    JSON.stringify(store.getState().sortingAlgorithmState.finalSortingBars.map((i) => i.barHeight))
  ) {
    store.dispatch(updatingSortingBarsStateAction(store.getState().sortingAlgorithmState.initialSortingBars));
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  switch (store.getState().sortingAlgorithmState.sortingAlgorithm) {
    case SortingEnumeration.BubbleSort:
      executeBubbleSortAlgorithm();
      break;

    case SortingEnumeration.QuickSort:
      executeQuickSortAlgorithm();
      break;
  }
};

const isAlgorithmTerminated = (): boolean => {
  if (store.getState().sortingAlgorithmState.hasAlgorithmStarted) return false;
  else return true;
};

export const executeBubbleSortAlgorithm = async () => {
  let length = store.getState().sortingAlgorithmState.sortingBars.length;
  let barsCopy = [...store.getState().sortingAlgorithmState.sortingBars];

  for (let i = 0; i < length - 1; i++) {
    let isSwapped: boolean = false;
    for (let j = 0; j < length - i - 1; j++) {
      barsCopy = [...barsCopy];
      barsCopy[j] = { barHeight: barsCopy[j].barHeight, barState: SortingBarStateEnum.Selected, barID: barsCopy[j].barID };
      barsCopy[j + 1] = { barHeight: barsCopy[j + 1].barHeight, barState: SortingBarStateEnum.Selected, barID: barsCopy[j + 1].barID };
      store.dispatch(updatingSortingBarsStateAction(barsCopy));
      await new Promise((resolve) => setTimeout(resolve, 400 - 30 * (store.getState().sliderComponentState.initialSliderValue - 1)));
      if (isAlgorithmTerminated()) return;
      if (!store.getState().sortingAlgorithmState.isAlgorithmRunning) {
        if (!(await waitForContinuation())) return;
      }

      if (barsCopy[j].barHeight <= barsCopy[j + 1].barHeight) {
        barsCopy = [...barsCopy];
        barsCopy[j] = { barHeight: barsCopy[j].barHeight, barState: SortingBarStateEnum.Unselected, barID: barsCopy[j].barID };
        barsCopy[j + 1] = { barHeight: barsCopy[j + 1].barHeight, barState: SortingBarStateEnum.Unselected, barID: barsCopy[j + 1].barID };
        store.dispatch(updatingSortingBarsStateAction(barsCopy));
        if (isAlgorithmTerminated()) return;
        if (!store.getState().sortingAlgorithmState.isAlgorithmRunning) {
          if (!(await waitForContinuation())) return;
        }
        continue;
      }

      barsCopy = [...barsCopy];
      let currentLeftOffset = document.getElementById(barsCopy[j].barID.toString())?.offsetLeft;
      let nextLeftOffset = document.getElementById(barsCopy[j + 1].barID.toString())?.offsetLeft;
      let tempID = barsCopy[j].barID;
      barsCopy[j] = {
        barHeight: barsCopy[j].barHeight,
        barState: SortingBarStateEnum.Selected,
        barID: barsCopy[j + 1].barID,
        leftOffset: nextLeftOffset,
      };
      barsCopy[j + 1] = {
        barHeight: barsCopy[j + 1].barHeight,
        barState: SortingBarStateEnum.Selected,
        barID: tempID,
        leftOffset: currentLeftOffset,
      };
      store.dispatch(updatingSortingBarsStateAction(barsCopy));
      await new Promise((resolve) => setTimeout(resolve, 400 - 30 * (store.getState().sliderComponentState.initialSliderValue - 1)));
      if (isAlgorithmTerminated()) return;
      if (!store.getState().sortingAlgorithmState.isAlgorithmRunning) {
        if (!(await waitForContinuation())) return;
      }

      barsCopy = [...barsCopy];
      var tempBar = barsCopy[j];
      barsCopy[j] = {
        barHeight: barsCopy[j + 1].barHeight,
        barState: SortingBarStateEnum.Unselected,
        barID: barsCopy[j + 1].barID,
      };
      barsCopy[j + 1] = {
        barHeight: tempBar.barHeight,
        barState: SortingBarStateEnum.Unselected,
        barID: tempBar.barID,
      };
      store.dispatch(updatingSortingBarsStateAction(barsCopy));
      if (isAlgorithmTerminated()) return;
      if (!store.getState().sortingAlgorithmState.isAlgorithmRunning) {
        if (!(await waitForContinuation())) return;
      }

      isSwapped = true;
    }
    if (!isSwapped) {
      store.dispatch(updatingHasAlgorithmStartedState(false));
      store.dispatch(updatingIsAlgorithmRunningStateAction(false));
      return;
    }
  }

  store.dispatch(updatingHasAlgorithmStartedState(false));
  store.dispatch(updatingIsAlgorithmRunningStateAction(false));
};

export const executeQuickSortAlgorithm = async () => {
  console.log(`Executed Quick Sort`);
};
