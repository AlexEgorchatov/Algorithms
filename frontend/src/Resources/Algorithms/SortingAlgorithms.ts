import { store } from '../../App';
import { SortingBarStateEnum } from '../../Pages/SortingPage';
import { updateSortingBarsStateAction } from '../../Store/Sorting Page/SortingPageStateManagement';
import { finalizeSorting, selectSortingBars, swapSortingBarsVisually, deselectSortingBars, isAlgorithmTerminated, pauseForStepIteration } from '../Helper';
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
        await pauseForStepIteration();
        if (await isAlgorithmTerminated()) return;

        if (barsCopy[j].barHeight <= barsCopy[j + 1].barHeight) {
          deselectSortingBars(barsCopy, j, j + 1);
          if (await isAlgorithmTerminated()) return;
          continue;
        }

        swapSortingBarsVisually(barsCopy, j, j + 1);
        await pauseForStepIteration();
        if (await isAlgorithmTerminated()) return;

        //TODO: Figure out why putting this code in a function breaks the algorithm
        barsCopy = [...barsCopy];
        let tempBar = { ...barsCopy[j] };
        barsCopy[j] = { ...barsCopy[j], barHeight: barsCopy[j + 1].barHeight, barState: SortingBarStateEnum.Unselected };
        barsCopy[j + 1] = { ...barsCopy[j + 1], barHeight: tempBar.barHeight, barState: SortingBarStateEnum.Unselected };
        store.dispatch(updateSortingBarsStateAction(barsCopy));
        if (await isAlgorithmTerminated()) return;

        isSwapped = true;
      }
      if (!isSwapped) {
        break;
      }
    }

    finalizeSorting(barsCopy);
  }
}

export class QuickSort extends SortingAlgorithmBase {
  async executeAlgorithm(): Promise<void> {
    let length = store.getState().sortingPageState.sortingBars.length;
    await this.quickSort(0, length - 1);
    finalizeSorting(store.getState().sortingPageState.sortingBars);
  }

  async quickSort(left: number, right: number): Promise<void> {
    if (left >= right) return;

    let partitionIndex: number = await this.partition(left, right);
    await this.quickSort(left, partitionIndex - 1);
    await this.quickSort(partitionIndex + 1, right);
  }

  async partition(left: number, right: number): Promise<number> {
    return new Promise<number>(async (resolve) => {
      let barsCopy = [...store.getState().sortingPageState.sortingBars];
      let pivot: number = barsCopy[left].barHeight;
      barsCopy[left] = { ...barsCopy[left], barState: SortingBarStateEnum.Pivot };
      let currentPartitionIndex: number = right;

      for (let i: number = right; i > left; i--) {
        selectSortingBars(barsCopy, i, currentPartitionIndex);
        await pauseForStepIteration();
        if (await isAlgorithmTerminated()) return;

        if (barsCopy[i].barHeight <= pivot) {
          deselectSortingBars(barsCopy, i, currentPartitionIndex);
          if (await isAlgorithmTerminated()) return;
          continue;
        }

        if (i !== currentPartitionIndex) {
          swapSortingBarsVisually(barsCopy, i, currentPartitionIndex);
          await pauseForStepIteration();
          if (await isAlgorithmTerminated()) return;
          barsCopy = [...barsCopy];
          let tempBar = { ...barsCopy[i] };
          barsCopy[i] = { ...barsCopy[i], barHeight: barsCopy[currentPartitionIndex].barHeight, barState: SortingBarStateEnum.Unselected };
          barsCopy[currentPartitionIndex] = {
            ...barsCopy[currentPartitionIndex],
            barHeight: tempBar.barHeight,
            barState: SortingBarStateEnum.Unselected,
          };
          if (await isAlgorithmTerminated()) return;
        }

        currentPartitionIndex--;
        store.dispatch(updateSortingBarsStateAction(barsCopy));
      }

      selectSortingBars(barsCopy, left, currentPartitionIndex);
      await pauseForStepIteration();
      if (await isAlgorithmTerminated()) return;

      swapSortingBarsVisually(barsCopy, left, currentPartitionIndex);
      await pauseForStepIteration();
      if (await isAlgorithmTerminated()) return;

      let tempBar = { ...barsCopy[left] };
      barsCopy = [...barsCopy];
      barsCopy[left] = { ...barsCopy[left], barHeight: barsCopy[currentPartitionIndex].barHeight, barState: SortingBarStateEnum.Unselected };
      barsCopy[currentPartitionIndex] = {
        ...barsCopy[currentPartitionIndex],
        barHeight: tempBar.barHeight,
        barState: SortingBarStateEnum.Unselected,
      };
      store.dispatch(updateSortingBarsStateAction(barsCopy));
      if (await isAlgorithmTerminated()) return;

      resolve(currentPartitionIndex);
    });
  }
}
