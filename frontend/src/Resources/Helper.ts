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
      const state = store.getState().sortingPageState;
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

export const finalizeSorting = async (barsCopy: SortingBarProps[], length: number) => {
  for (let i = 0; i < length; i++) {
    barsCopy = [...barsCopy];
    barsCopy[i] = { barHeight: barsCopy[i].barHeight, barState: SortingBarStateEnum.Completed, barID: barsCopy[i].barID };
    store.dispatch(updatingSortingBarsStateAction(barsCopy));
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  store.dispatch(updatingHasAlgorithmStartedState(false));
  store.dispatch(updatingIsAlgorithmRunningStateAction(false));
};
