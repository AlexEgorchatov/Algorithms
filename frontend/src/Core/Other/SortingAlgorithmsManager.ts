import { SortingBarStateEnum } from '../../Resources/Enumerations';
import { updateIsAnimationFinalizingStateAction } from '../../Store/Shared/AnimationStateManagement';
import {
  updateSelectedSortingAlgorithmState,
  updateSortingBarsStateAction,
} from '../../Store/Sorting Module/SortingModuleStateManagement';
import { store } from '../../Store/Store';
import { AlgorithmBase } from '../Abstractions/AlgorithmBase';
import { AlgorithmsManagerBase } from '../Abstractions/AlgorithmManagerBase';
import { algorithmIterationBaseTime } from '../Helper';
import { ISortingBarProps } from '../Interfaces/ISortingBarProps';

export class SortingAlgorithmsManager extends AlgorithmsManagerBase {
  public selectedAlgorithm: AlgorithmBase;
  public initialState: ISortingBarProps[] = [];
  public isStateUpdated: boolean = false;

  public constructor(selectedAlgorithm: AlgorithmBase) {
    super();
    this.selectedAlgorithm = selectedAlgorithm;
    store.dispatch(updateSelectedSortingAlgorithmState(selectedAlgorithm.constructor.name));
  }

  public setInitialState(): void {
    this.initialState = [...store.getState().sortingModuleState.sortingBars];
  }

  public resetToInitialState(): void {
    store.dispatch(updateSortingBarsStateAction(this.initialState));
  }

  public updateStoreSelectedAlgorithmName(): void {
    store.dispatch(updateSelectedSortingAlgorithmState(this.selectedAlgorithm.constructor.name));
  }

  public async startAlgorithm(): Promise<void> {
    if (this.isStateUpdated) {
      this.setInitialState();
      this.selectedAlgorithm.setFinalState();
      this.isStateUpdated = false;
    }

    await this.selectedAlgorithm.executeAlgorithm();
    if (!store.getState().animationState.hasAnimationStarted) return;

    store.dispatch(updateIsAnimationFinalizingStateAction(true));
    await this.finalizeSorting();
    store.dispatch(updateIsAnimationFinalizingStateAction(false));
  }

  public async stopAlgorithm(): Promise<void> {
    store.dispatch(updateSortingBarsStateAction(this.initialState));
  }

  public async completeAlgorithm(): Promise<void> {
    store.dispatch(updateIsAnimationFinalizingStateAction(true));
  }

  private async finalizeSorting(): Promise<void> {
    let barsCopy = [...store.getState().sortingModuleState.sortingBars];
    let isSorted: boolean = true;
    for (let i = 0; i < barsCopy.length - 1; i++) {
      if (barsCopy[i].barHeight > barsCopy[i + 1].barHeight) {
        isSorted = false;
        break;
      }
    }

    if (!isSorted) {
      let sourceIndices: number[] = new Array(barsCopy.length).fill(-1);
      for (let i = 0; i < barsCopy.length; i++) {
        for (let j = 0; j < this.selectedAlgorithm.finalState.length; j++) {
          if (barsCopy[i].barHeight !== this.selectedAlgorithm.finalState[j].barHeight) continue;
          if (sourceIndices[j] !== -1) continue;

          sourceIndices[j] = i;
          break;
        }
      }

      for (let i = 0; i < barsCopy.length; i++) {
        barsCopy[i] = { ...barsCopy[i], barState: SortingBarStateEnum.Selected };
      }
      store.dispatch(updateSortingBarsStateAction(barsCopy));
      await new Promise((resolve) => setTimeout(resolve, algorithmIterationBaseTime - 100));

      barsCopy = [...barsCopy];
      for (let i = 0; i < sourceIndices.length; i++) {
        this.moveSortingBar(barsCopy, sourceIndices[i], i);
      }
      store.dispatch(updateSortingBarsStateAction(barsCopy));
      await new Promise((resolve) => setTimeout(resolve, algorithmIterationBaseTime + 200));

      store.dispatch(
        updateSortingBarsStateAction((barsCopy = [...this.selectedAlgorithm.finalState])),
      );
    }
    await new Promise((resolve) => setTimeout(resolve, algorithmIterationBaseTime - 50));
    await this.highlightSortingBars(barsCopy);
  }

  private async highlightSortingBars(barsCopy: ISortingBarProps[]): Promise<void> {
    let timeout = 300 / barsCopy.length;
    for (let i = 0; i < barsCopy.length; i++) {
      barsCopy = [...barsCopy];
      barsCopy[i] = { ...barsCopy[i], barState: SortingBarStateEnum.Completed };
      store.dispatch(updateSortingBarsStateAction(barsCopy));
      await new Promise((resolve) => setTimeout(resolve, timeout));
    }
  }

  private moveSortingBar(
    barsCopy: ISortingBarProps[],
    sourceIndex: number,
    destinationIndex: number,
  ) {
    let destinationOffset = document.getElementById(destinationIndex.toString())?.offsetLeft;

    barsCopy[sourceIndex] = {
      ...barsCopy[sourceIndex],
      leftOffset: destinationOffset,
    };
  }
}
