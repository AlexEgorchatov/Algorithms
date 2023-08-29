import { store } from '../../App';
import { SortingBarStateEnum } from '../../Pages/SortingPage';
import { updateSortingBarsStateAction } from '../../Store/Sorting Page/SortingPageStateManagement';
import { selectSortingBars, swapSortingBarsVisually, deselectSortingBars, isAnimationTerminated, pauseForStepIteration } from '../Helper';
import { SortingAlgorithmBase, SortingAlgorithmEnum } from './AlgorithmBase';

export class BubbleSort extends SortingAlgorithmBase {
  public sortingAlgorithm = SortingAlgorithmEnum.BubbleSort;

  public async executeAlgorithm(): Promise<void> {
    let length = store.getState().sortingPageState.sortingBars.length;
    let barsCopy = [...store.getState().sortingPageState.sortingBars];

    let isSwapped: boolean = true;
    for (let i = 0; i < length - 1 && isSwapped; i++) {
      isSwapped = false;
      for (let j = 0; j < length - i - 1; j++) {
        selectSortingBars(barsCopy, j, j + 1);
        await pauseForStepIteration();
        if (await isAnimationTerminated()) return;

        if (barsCopy[j].barHeight <= barsCopy[j + 1].barHeight) {
          deselectSortingBars(barsCopy, j, j + 1);
          if (await isAnimationTerminated()) return;
          continue;
        }

        swapSortingBarsVisually(barsCopy, j, j + 1);
        await pauseForStepIteration();
        if (await isAnimationTerminated()) return;

        //TODO: Figure out why putting this code in a function breaks the algorithm
        barsCopy = [...barsCopy];
        let tempBar = { ...barsCopy[j] };
        barsCopy[j] = { ...barsCopy[j], barHeight: barsCopy[j + 1].barHeight, barState: SortingBarStateEnum.Unselected };
        barsCopy[j + 1] = { ...barsCopy[j + 1], barHeight: tempBar.barHeight, barState: SortingBarStateEnum.Unselected };
        store.dispatch(updateSortingBarsStateAction(barsCopy));
        if (await isAnimationTerminated()) return;

        isSwapped = true;
      }
      if (!isSwapped) {
        break;
      }
    }
  }
}

export class QuickSort extends SortingAlgorithmBase {
  public sortingAlgorithm = SortingAlgorithmEnum.QuickSort;

  public async executeAlgorithm(): Promise<void> {
    let length = store.getState().sortingPageState.sortingBars.length;
    await this.quickSort(0, length - 1);
  }

  private async quickSort(left: number, right: number): Promise<void> {
    if (left >= right) return;

    let partitionIndex: number = await this.partition(left, right);
    await this.quickSort(left, partitionIndex - 1);
    await this.quickSort(partitionIndex + 1, right);
  }

  private async partition(left: number, right: number): Promise<number> {
    return new Promise<number>(async (resolve) => {
      let barsCopy = [...store.getState().sortingPageState.sortingBars];
      let pivot: number = barsCopy[left].barHeight;
      barsCopy[left] = { ...barsCopy[left], barState: SortingBarStateEnum.Pivot };
      let currentPartitionIndex: number = right;

      for (let i: number = right; i > left; i--) {
        selectSortingBars(barsCopy, i, currentPartitionIndex);
        await pauseForStepIteration();
        if (await isAnimationTerminated()) return;

        if (barsCopy[i].barHeight <= pivot) {
          deselectSortingBars(barsCopy, i, currentPartitionIndex);
          if (await isAnimationTerminated()) return;
          continue;
        }

        if (i !== currentPartitionIndex) {
          swapSortingBarsVisually(barsCopy, i, currentPartitionIndex);
          await pauseForStepIteration();
          if (await isAnimationTerminated()) return;
          barsCopy = [...barsCopy];
          let tempBar = { ...barsCopy[i] };
          barsCopy[i] = { ...barsCopy[i], barHeight: barsCopy[currentPartitionIndex].barHeight, barState: SortingBarStateEnum.Unselected };
          barsCopy[currentPartitionIndex] = {
            ...barsCopy[currentPartitionIndex],
            barHeight: tempBar.barHeight,
            barState: SortingBarStateEnum.Unselected,
          };
          if (await isAnimationTerminated()) return;
        }

        currentPartitionIndex--;
        store.dispatch(updateSortingBarsStateAction(barsCopy));
      }

      selectSortingBars(barsCopy, left, currentPartitionIndex);
      await pauseForStepIteration();
      if (await isAnimationTerminated()) return;

      swapSortingBarsVisually(barsCopy, left, currentPartitionIndex);
      await pauseForStepIteration();
      if (await isAnimationTerminated()) return;

      let tempBar = { ...barsCopy[left] };
      barsCopy = [...barsCopy];
      barsCopy[left] = { ...barsCopy[left], barHeight: barsCopy[currentPartitionIndex].barHeight, barState: SortingBarStateEnum.Unselected };
      barsCopy[currentPartitionIndex] = {
        ...barsCopy[currentPartitionIndex],
        barHeight: tempBar.barHeight,
        barState: SortingBarStateEnum.Unselected,
      };
      store.dispatch(updateSortingBarsStateAction(barsCopy));
      if (await isAnimationTerminated()) return;

      resolve(currentPartitionIndex);
    });
  }
}
