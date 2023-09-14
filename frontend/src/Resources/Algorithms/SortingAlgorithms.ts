import { store } from '../../App';
import { SortingBarStateEnum } from '../../Pages/SortingPage';
import { updateSortingBarsStateAction } from '../../Store/Sorting Page/SortingPageStateManagement';
import { AnimationManager, SortingAlgorithmManager } from '../Helper';
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
        SortingAlgorithmManager.selectSortingBars(barsCopy, j, j + 1);
        await AnimationManager.pauseForStepIteration();
        if (await AnimationManager.isAnimationTerminated()) return;

        if (barsCopy[j].barHeight <= barsCopy[j + 1].barHeight) {
          SortingAlgorithmManager.deselectSortingBars(barsCopy, j, j + 1);
          if (await AnimationManager.isAnimationTerminated()) return;
          continue;
        }

        SortingAlgorithmManager.swapSortingBarsVisually(barsCopy, j, j + 1);
        await AnimationManager.pauseForStepIteration();
        if (await AnimationManager.isAnimationTerminated()) return;

        //TODO: Figure out why putting this code in a function breaks the algorithm
        barsCopy = [...barsCopy];
        let tempBar = { ...barsCopy[j] };
        barsCopy[j] = { ...barsCopy[j], barHeight: barsCopy[j + 1].barHeight, barState: SortingBarStateEnum.Unselected };
        barsCopy[j + 1] = { ...barsCopy[j + 1], barHeight: tempBar.barHeight, barState: SortingBarStateEnum.Unselected };
        store.dispatch(updateSortingBarsStateAction(barsCopy));
        if (await AnimationManager.isAnimationTerminated()) return;

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
    if (await AnimationManager.isAnimationTerminated()) return;
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
        SortingAlgorithmManager.selectSortingBars(barsCopy, i, currentPartitionIndex);
        await AnimationManager.pauseForStepIteration();
        if (await AnimationManager.isAnimationTerminated()) {
          resolve(0);
          return;
        }

        if (barsCopy[i].barHeight <= pivot) {
          SortingAlgorithmManager.deselectSortingBars(barsCopy, i, currentPartitionIndex);
          if (await AnimationManager.isAnimationTerminated()) {
            resolve(0);
            return;
          }
          continue;
        }

        if (i !== currentPartitionIndex) {
          SortingAlgorithmManager.swapSortingBarsVisually(barsCopy, i, currentPartitionIndex);
          await AnimationManager.pauseForStepIteration();
          if (await AnimationManager.isAnimationTerminated()) {
            resolve(0);
            return;
          }
          barsCopy = [...barsCopy];
          let tempBar = { ...barsCopy[i] };
          barsCopy[i] = { ...barsCopy[i], barHeight: barsCopy[currentPartitionIndex].barHeight, barState: SortingBarStateEnum.Unselected };
          barsCopy[currentPartitionIndex] = {
            ...barsCopy[currentPartitionIndex],
            barHeight: tempBar.barHeight,
            barState: SortingBarStateEnum.Unselected,
          };
          if (await AnimationManager.isAnimationTerminated()) {
            resolve(0);
            return;
          }
        }

        currentPartitionIndex--;
        store.dispatch(updateSortingBarsStateAction(barsCopy));
      }

      SortingAlgorithmManager.selectSortingBars(barsCopy, left, currentPartitionIndex);
      await AnimationManager.pauseForStepIteration();
      if (await AnimationManager.isAnimationTerminated()) {
        resolve(0);
        return;
      }

      SortingAlgorithmManager.swapSortingBarsVisually(barsCopy, left, currentPartitionIndex);
      await AnimationManager.pauseForStepIteration();
      if (await AnimationManager.isAnimationTerminated()) {
        resolve(0);
        return;
      }

      let tempBar = { ...barsCopy[left] };
      barsCopy = [...barsCopy];
      barsCopy[left] = { ...barsCopy[left], barHeight: barsCopy[currentPartitionIndex].barHeight, barState: SortingBarStateEnum.Unselected };
      barsCopy[currentPartitionIndex] = {
        ...barsCopy[currentPartitionIndex],
        barHeight: tempBar.barHeight,
        barState: SortingBarStateEnum.Unselected,
      };
      store.dispatch(updateSortingBarsStateAction(barsCopy));
      if (await AnimationManager.isAnimationTerminated()) {
        resolve(0);
        return;
      }

      resolve(currentPartitionIndex);
    });
  }
}
