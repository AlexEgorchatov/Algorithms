import { store } from '../../App';
import { SortingBarStateEnum, updatingSortingBarsStateAction } from '../../Store/Sorting Page/SortingPageStateManagement';
import { finalizeSorting, isAlgorithmTerminated, waitForContinuation } from '../Helper';
import { SortingAlgorithmBase } from './AlgorithmBase';

export class BubbleSort extends SortingAlgorithmBase {
  async executeAlgorithm(): Promise<void> {
    let length = store.getState().sortingPageState.sortingBars.length;
    let barsCopy = [...store.getState().sortingPageState.sortingBars];

    let isSwapped: boolean = true;
    for (let i = 0; i < length - 1 && isSwapped; i++) {
      isSwapped = false;
      for (let j = 0; j < length - i - 1; j++) {
        barsCopy = [...barsCopy];
        barsCopy[j] = { barHeight: barsCopy[j].barHeight, barState: SortingBarStateEnum.Selected, barID: barsCopy[j].barID };
        barsCopy[j + 1] = { barHeight: barsCopy[j + 1].barHeight, barState: SortingBarStateEnum.Selected, barID: barsCopy[j + 1].barID };
        store.dispatch(updatingSortingBarsStateAction(barsCopy));
        await new Promise((resolve) => setTimeout(resolve, 400 - 30 * (store.getState().sliderComponentState.initialSliderValue - 1)));
        if (isAlgorithmTerminated()) return;
        if (!store.getState().sortingPageState.isAlgorithmRunning) {
          if (!(await waitForContinuation())) return;
        }

        if (barsCopy[j].barHeight <= barsCopy[j + 1].barHeight) {
          barsCopy = [...barsCopy];
          barsCopy[j] = { barHeight: barsCopy[j].barHeight, barState: SortingBarStateEnum.Unselected, barID: barsCopy[j].barID };
          barsCopy[j + 1] = { barHeight: barsCopy[j + 1].barHeight, barState: SortingBarStateEnum.Unselected, barID: barsCopy[j + 1].barID };
          store.dispatch(updatingSortingBarsStateAction(barsCopy));
          if (isAlgorithmTerminated()) return;
          if (!store.getState().sortingPageState.isAlgorithmRunning) {
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
        if (!store.getState().sortingPageState.isAlgorithmRunning) {
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
        if (!store.getState().sortingPageState.isAlgorithmRunning) {
          if (!(await waitForContinuation())) return;
        }

        isSwapped = true;
      }
      if (!isSwapped) {
        break;
      }
    }

    finalizeSorting(barsCopy, length);
  }
}

export class QuickSort extends SortingAlgorithmBase {
  async executeAlgorithm(): Promise<void> {
    console.log(`Executed Quick Sort`);
  }
}
