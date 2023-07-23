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
          barID: barsCopy[j].barID,
        };
        barsCopy[j + 1] = {
          barHeight: tempBar.barHeight,
          barState: SortingBarStateEnum.Unselected,
          barID: barsCopy[j + 1].barID,
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
    await this.quickSort(0, length - 1);
    finalizeSorting(store.getState().sortingPageState.sortingBars, length);
  }

  async quickSort(left: number, right: number): Promise<void> {
    if (left >= right) return;

    let index: number = await this.partition(left, right);
    await this.quickSort(left, index - 1);
    await this.quickSort(index + 1, right);
  }

  async partition(left: number, right: number): Promise<number> {
    return new Promise<number>(async (resolve) => {
      let barsCopy = [...store.getState().sortingPageState.sortingBars];
      let pivot: number = barsCopy[left].barHeight;

      barsCopy[left] = { barHeight: barsCopy[left].barHeight, barState: SortingBarStateEnum.Pivot, barID: barsCopy[left].barID };
      store.dispatch(updatingSortingBarsStateAction(barsCopy));

      let k: number = right;

      for (let i: number = right; i > left; i--) {
        selectSortingBars(barsCopy, i, k);
        await new Promise((resolve) => setTimeout(resolve, 400 - 30 * (store.getState().sliderComponentState.initialSliderValue - 1)));
        if (isAlgorithmTerminated()) return;
        if (!store.getState().sortingPageState.isAlgorithmRunning) {
          if (!(await waitForContinuation())) return;
        }

        if (barsCopy[i].barHeight <= pivot) {
          deselectSortingBars(barsCopy, i, k);
          if (isAlgorithmTerminated()) return;
          if (!store.getState().sortingPageState.isAlgorithmRunning) {
            if (!(await waitForContinuation())) return;
          }
          continue;
        }

        if (i !== k) {
          swapSortingBarsVisually(barsCopy, i, k);
          await new Promise((resolve) => setTimeout(resolve, 400 - 30 * (store.getState().sliderComponentState.initialSliderValue - 1)));
          if (isAlgorithmTerminated()) return;
          if (!store.getState().sortingPageState.isAlgorithmRunning) {
            if (!(await waitForContinuation())) return;
          }

          barsCopy = [...barsCopy];
          let tempBar = barsCopy[i];
          barsCopy[i] = {
            barHeight: barsCopy[k].barHeight,
            barState: SortingBarStateEnum.Unselected,
            barID: barsCopy[i].barID,
          };
          barsCopy[k] = {
            barHeight: tempBar.barHeight,
            barState: SortingBarStateEnum.Unselected,
            barID: barsCopy[k].barID,
          };
          store.dispatch(updatingSortingBarsStateAction(barsCopy));
          if (isAlgorithmTerminated()) return;
          if (!store.getState().sortingPageState.isAlgorithmRunning) {
            if (!(await waitForContinuation())) return;
          }
        }

        k--;
        store.dispatch(updatingSortingBarsStateAction(barsCopy));
      }

      selectSortingBars(barsCopy, left, k);
      await new Promise((resolve) => setTimeout(resolve, 400 - 30 * (store.getState().sliderComponentState.initialSliderValue - 1)));
      if (isAlgorithmTerminated()) return;
      if (!store.getState().sortingPageState.isAlgorithmRunning) {
        if (!(await waitForContinuation())) return;
      }

      swapSortingBarsVisually(barsCopy, left, k);
      await new Promise((resolve) => setTimeout(resolve, 400 - 30 * (store.getState().sliderComponentState.initialSliderValue - 1)));
      if (isAlgorithmTerminated()) return;
      if (!store.getState().sortingPageState.isAlgorithmRunning) {
        if (!(await waitForContinuation())) return;
      }

      barsCopy = [...barsCopy];
      let tempBar = barsCopy[left];
      barsCopy[left] = {
        barHeight: barsCopy[k].barHeight,
        barState: SortingBarStateEnum.Unselected,
        barID: barsCopy[left].barID,
      };
      barsCopy[k] = {
        barHeight: tempBar.barHeight,
        barState: SortingBarStateEnum.Unselected,
        barID: barsCopy[k].barID,
      };
      store.dispatch(updatingSortingBarsStateAction(barsCopy));
      if (isAlgorithmTerminated()) return;
      if (!store.getState().sortingPageState.isAlgorithmRunning) {
        if (!(await waitForContinuation())) return;
      }

      resolve(k);
    });
  }
}

// 7 22 77 98 18 22 62 51 71 7
