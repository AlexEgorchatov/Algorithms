import { updateSortingBarsStateAction } from '../../Redux/Sorting Module/SortingModuleStateManagement';
import { store } from '../../Redux/Store';
import { SortingBarStateEnum } from '../../Resources/Enumerations';
import { ISortingBarProps } from '../Interfaces/ISortingBarProps';
import { AlgorithmBase } from './AlgorithmBase';

export abstract class SortingAlgorithmBase extends AlgorithmBase {
  public finalState: ISortingBarProps[] = [];

  public setFinalState(): void {
    let barsCopy = [...store.getState().sortingModuleState.sortingBars];
    this.finalState =
      barsCopy.length === 0 ? [] : barsCopy.sort((a, b) => a.barHeight - b.barHeight);
  }

  public swapSortingBarsVisually(
    barsCopy: ISortingBarProps[],
    index1: number,
    index2: number,
  ): void {
    barsCopy = [...barsCopy];
    let currentLeftOffset = document.getElementById(index1.toString())?.offsetLeft;
    let nextLeftOffset = document.getElementById(index2.toString())?.offsetLeft;
    barsCopy[index1] = {
      ...barsCopy[index1],
      barState: SortingBarStateEnum.Selected,
      leftOffset: nextLeftOffset,
    };
    barsCopy[index2] = {
      ...barsCopy[index2],
      barState: SortingBarStateEnum.Selected,
      leftOffset: currentLeftOffset,
    };
    store.dispatch(updateSortingBarsStateAction(barsCopy));
  }

  public selectSortingBars(barsCopy: ISortingBarProps[], index1: number, index2: number): void {
    barsCopy = [...barsCopy];
    barsCopy[index1] = { ...barsCopy[index1], barState: SortingBarStateEnum.Selected };
    barsCopy[index2] = { ...barsCopy[index2], barState: SortingBarStateEnum.Selected };
    store.dispatch(updateSortingBarsStateAction(barsCopy));
  }

  public deselectSortingBars(barsCopy: ISortingBarProps[], index1: number, index2: number): void {
    barsCopy = [...barsCopy];
    barsCopy[index1] = { ...barsCopy[index1], barState: SortingBarStateEnum.Unselected };
    barsCopy[index2] = { ...barsCopy[index2], barState: SortingBarStateEnum.Unselected };
    store.dispatch(updateSortingBarsStateAction(barsCopy));
  }
}
