import { SortingBarStateEnum, StringMatchingCharacterStateEnum } from '../../Resources/Enumerations';
import { updateSortingBarsStateAction } from '../../Store/Sorting Module/SortingModuleStateManagement';
import { store } from '../../Store/Store';
import { ISortingBarProps } from '../Interfaces/ISortingBarProps';
import { IStringMatchingCharacterProps } from '../Interfaces/IStringMatchingCharacterProps';

/**
 * @abstract Abstract class for any algorithm.
 * The initial state is universal for all algorithms that belong to a specific module,
 * but the final state depends on the selected algorithm. Hence, the initial state is not a part of the abstraction.
 */
export abstract class AlgorithmBase<T> {
  abstract executeAlgorithm(): Promise<any>;
  abstract finalState: T[];
  abstract setFinalState(): void;
}

export abstract class SortingAlgorithmBase extends AlgorithmBase<ISortingBarProps> {
  public finalState: ISortingBarProps[] = [];

  public setFinalState(): void {
    let barsCopy = [...store.getState().sortingModuleState.sortingBars];
    this.finalState = barsCopy.length === 0 ? [] : barsCopy.sort((a, b) => a.barHeight - b.barHeight);
  }

  public swapSortingBarsVisually(barsCopy: ISortingBarProps[], index1: number, index2: number): void {
    barsCopy = [...barsCopy];
    let currentLeftOffset = document.getElementById(index1.toString())?.offsetLeft;
    let nextLeftOffset = document.getElementById(index2.toString())?.offsetLeft;
    barsCopy[index1] = { ...barsCopy[index1], barState: SortingBarStateEnum.Selected, leftOffset: nextLeftOffset };
    barsCopy[index2] = { ...barsCopy[index2], barState: SortingBarStateEnum.Selected, leftOffset: currentLeftOffset };
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

export abstract class StringMatchingAlgorithmBase extends AlgorithmBase<IStringMatchingCharacterProps> {
  public finalState: IStringMatchingCharacterProps[] = [];
  public finalPatternState: IStringMatchingCharacterProps[] = [];

  public setFinalState(): void {
    let input = store.getState().stringMatchingModuleState.stringMatchingInput.toLowerCase();
    let pattern = store.getState().stringMatchingModuleState.stringMatchingPattern.toLowerCase();
    let animationInputCopy = [...store.getState().stringMatchingModuleState.stringMatchingAnimationInput];

    let foundIndex: number = pattern.length === 0 ? -1 : input.indexOf(pattern);
    while (foundIndex !== -1) {
      for (let i = foundIndex; i < foundIndex + pattern.length; i++) {
        if (animationInputCopy[i].characterState === StringMatchingCharacterStateEnum.Found) continue;

        animationInputCopy[i] = { ...animationInputCopy[i], characterState: StringMatchingCharacterStateEnum.Found };
      }
      foundIndex = input.indexOf(pattern, foundIndex + 1);
    }

    this.finalPatternState = store.getState().stringMatchingModuleState.stringMatchingAnimationPattern;
    this.finalState = [...animationInputCopy];
  }

  public selectCharacters(
    animationPatternCopy: IStringMatchingCharacterProps[],
    animationInputCopy: IStringMatchingCharacterProps[],
    patternIndex: number,
    inputIndex: number,
    highlightCharacterState: StringMatchingCharacterStateEnum,
  ): void {
    animationPatternCopy[patternIndex] = { ...animationPatternCopy[patternIndex], characterState: highlightCharacterState };
    animationInputCopy[inputIndex] = { ...animationInputCopy[inputIndex], characterState: highlightCharacterState };
  }
}
