import { SortingAlgorithmBase } from '../Abstractions/AlgorithmBase';
import { updateSortingBarsStateAction } from '../../Store/Sorting Module/SortingModuleStateManagement';
import { isAnimationTerminated, pauseForStepIteration } from '../Helper';
import { SortingBarStateEnum } from '../../Resources/Enumerations';
import { store } from '../../Store/Store';

export class BubbleSort extends SortingAlgorithmBase {
  public async executeAlgorithm(): Promise<void> {
    let length = store.getState().sortingModuleState.sortingBars.length;
    let barsCopy = [...store.getState().sortingModuleState.sortingBars];

    let isSwapped: boolean = true;
    for (let i = 0; i < length - 1 && isSwapped; i++) {
      isSwapped = false;
      for (let j = 0; j < length - i - 1; j++) {
        this.selectSortingBars(barsCopy, j, j + 1);
        await pauseForStepIteration();
        if (await isAnimationTerminated()) return;

        if (barsCopy[j].barHeight <= barsCopy[j + 1].barHeight) {
          this.deselectSortingBars(barsCopy, j, j + 1);
          if (await isAnimationTerminated()) return;
          continue;
        }

        this.swapSortingBarsVisually(barsCopy, j, j + 1);
        await pauseForStepIteration();
        if (await isAnimationTerminated()) return;

        //TODO: Figure out why putting this code in a function breaks the animation
        barsCopy = [...barsCopy];
        let tempBar = { ...barsCopy[j] };
        barsCopy[j] = {
          ...barsCopy[j],
          barHeight: barsCopy[j + 1].barHeight,
          barState: SortingBarStateEnum.Unselected,
        };
        barsCopy[j + 1] = {
          ...barsCopy[j + 1],
          barHeight: tempBar.barHeight,
          barState: SortingBarStateEnum.Unselected,
        };
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
  public async executeAlgorithm(): Promise<void> {
    let length = store.getState().sortingModuleState.sortingBars.length;

    await this.quickSort(0, length - 1);
  }

  private async quickSort(left: number, right: number): Promise<void> {
    if (left >= right) return;

    if (await isAnimationTerminated()) return;
    let partitionIndex: number = await this.partition(left, right);
    await this.quickSort(left, partitionIndex - 1);
    await this.quickSort(partitionIndex + 1, right);
  }

  private async partition(left: number, right: number): Promise<number> {
    return new Promise<number>(async (resolve) => {
      let barsCopy = [...store.getState().sortingModuleState.sortingBars];
      let pivot: number = barsCopy[left].barHeight;
      barsCopy[left] = { ...barsCopy[left], barState: SortingBarStateEnum.Pivot };
      let currentPartitionIndex: number = right;

      for (let i: number = right; i > left; i--) {
        this.selectSortingBars(barsCopy, i, currentPartitionIndex);
        await pauseForStepIteration();
        if (await isAnimationTerminated()) {
          resolve(0);
          return;
        }

        if (barsCopy[i].barHeight <= pivot) {
          this.deselectSortingBars(barsCopy, i, currentPartitionIndex);
          if (await isAnimationTerminated()) {
            resolve(0);
            return;
          }
          continue;
        }

        if (i !== currentPartitionIndex) {
          this.swapSortingBarsVisually(barsCopy, i, currentPartitionIndex);
          await pauseForStepIteration();
          if (await isAnimationTerminated()) {
            resolve(0);
            return;
          }
          barsCopy = [...barsCopy];
          let tempBar = { ...barsCopy[i] };
          barsCopy[i] = {
            ...barsCopy[i],
            barHeight: barsCopy[currentPartitionIndex].barHeight,
            barState: SortingBarStateEnum.Unselected,
          };
          barsCopy[currentPartitionIndex] = {
            ...barsCopy[currentPartitionIndex],
            barHeight: tempBar.barHeight,
            barState: SortingBarStateEnum.Unselected,
          };
          if (await isAnimationTerminated()) {
            resolve(0);
            return;
          }
        }

        currentPartitionIndex--;
        store.dispatch(updateSortingBarsStateAction(barsCopy));
      }

      this.selectSortingBars(barsCopy, left, currentPartitionIndex);
      await pauseForStepIteration();
      if (await isAnimationTerminated()) {
        resolve(0);
        return;
      }

      this.swapSortingBarsVisually(barsCopy, left, currentPartitionIndex);
      await pauseForStepIteration();
      if (await isAnimationTerminated()) {
        resolve(0);
        return;
      }

      let tempBar = { ...barsCopy[left] };
      barsCopy = [...barsCopy];
      barsCopy[left] = {
        ...barsCopy[left],
        barHeight: barsCopy[currentPartitionIndex].barHeight,
        barState: SortingBarStateEnum.Unselected,
      };
      barsCopy[currentPartitionIndex] = {
        ...barsCopy[currentPartitionIndex],
        barHeight: tempBar.barHeight,
        barState: SortingBarStateEnum.Unselected,
      };
      store.dispatch(updateSortingBarsStateAction(barsCopy));
      if (await isAnimationTerminated()) {
        resolve(0);
        return;
      }

      resolve(currentPartitionIndex);
    });
  }
}
