import { store } from '../../App';
import { SortingBarStateEnum, updatingSortingBarsStateAction } from '../../Store/Sorting Page/SortingPageStateManagement';
import {
  finalizeSorting,
  isAlgorithmTerminated,
  selectSortingBars,
  swapSortingBarsVisually,
  unselectSortingBars as deselectSortingBars,
  waitForContinuation,
} from '../Helper';
import { SortingAlgorithmBase } from './AlgorithmBase';

export class BubbleSort extends SortingAlgorithmBase {
  async executeAlgorithm(): Promise<void> {
    let length = store.getState().sortingPageState.sortingBars.length;
    let barsCopy = [...store.getState().sortingPageState.sortingBars];

    let isSwapped: boolean = true;
    for (let i = 0; i < length - 1 && isSwapped; i++) {
      isSwapped = false;
      for (let j = 0; j < length - i - 1; j++) {
        selectSortingBars(barsCopy, j, j + 1);
        await new Promise((resolve) => setTimeout(resolve, 400 - 30 * (store.getState().sliderComponentState.initialSliderValue - 1)));
        if (isAlgorithmTerminated()) return;
        if (!store.getState().sortingPageState.isAlgorithmRunning) {
          if (!(await waitForContinuation())) return;
        }

        if (barsCopy[j].barHeight <= barsCopy[j + 1].barHeight) {
          deselectSortingBars(barsCopy, j, j + 1);
          if (isAlgorithmTerminated()) return;
          if (!store.getState().sortingPageState.isAlgorithmRunning) {
            if (!(await waitForContinuation())) return;
          }
          continue;
        }

        swapSortingBarsVisually(barsCopy, j, j + 1);
        await new Promise((resolve) => setTimeout(resolve, 400 - 30 * (store.getState().sliderComponentState.initialSliderValue - 1)));
        if (isAlgorithmTerminated()) return;
        if (!store.getState().sortingPageState.isAlgorithmRunning) {
          if (!(await waitForContinuation())) return;
        }

        barsCopy = [...barsCopy];
        let tempBar = barsCopy[j];
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
    let length = store.getState().sortingPageState.sortingBars.length;
    this.quickSort(0, length - 1);
  }

  async quickSort(left: number, right: number): Promise<void> {
    if (left >= right) return;

    let index: number = await this.partition(left, right);
    this.quickSort(left, index - 1);
    this.quickSort(index + 1, right);
  }
  /**40, 20, 30, 50, 10 */
  async partition(left: number, right: number): Promise<number> {
    return new Promise<number>((resolve) => {
      let barsCopy = [...store.getState().sortingPageState.sortingBars];
      let pivot: number = barsCopy[left].barHeight;

      let k: number = right;

      for (let i: number = right; i > left; i--) {
        if (barsCopy[i].barHeight <= pivot) continue;

        k--;
        barsCopy = [...barsCopy];
        let tempBar = barsCopy[i];
        barsCopy[i] = {
          barHeight: barsCopy[k].barHeight,
          barState: SortingBarStateEnum.Unselected,
          barID: barsCopy[k].barID,
        };
        barsCopy[k] = {
          barHeight: tempBar.barHeight,
          barState: SortingBarStateEnum.Unselected,
          barID: tempBar.barID,
        };
        store.dispatch(updatingSortingBarsStateAction(barsCopy));
      }

      barsCopy = [...barsCopy];
      let tempBar = barsCopy[left];
      barsCopy[left] = {
        barHeight: barsCopy[k].barHeight,
        barState: SortingBarStateEnum.Unselected,
        barID: barsCopy[k].barID,
      };
      barsCopy[k] = {
        barHeight: tempBar.barHeight,
        barState: SortingBarStateEnum.Unselected,
        barID: tempBar.barID,
      };
      store.dispatch(updatingSortingBarsStateAction(barsCopy));

      resolve(k);
    });
  }
}
