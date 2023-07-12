import { store } from '../App';
import { FinalSortingBars, InitialSortingBars, SelectedAlgorithm } from '../Pages/SortingPage';
import {
  updatingHasAlgorithmStartedState,
  updatingIsAlgorithmRunningStateAction,
  updatingSortingBarsStateAction,
} from '../Store/Sorting Page/SortingPageStateManagement';

/**Waits for the next action after the algorithm was paused.
 * Returns true if the algorithm continues execution, false if the algorithm was stopped or animation was skipped.*/
export const waitForContinuation = () => {
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
    JSON.stringify(FinalSortingBars.map((i) => i.barHeight))
  ) {
    store.dispatch(updatingSortingBarsStateAction(InitialSortingBars));
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  SelectedAlgorithm.executeAlgorithm();
};

export const isAlgorithmTerminated = (): boolean => {
  if (store.getState().sortingAlgorithmState.hasAlgorithmStarted) return false;
  else return true;
};
