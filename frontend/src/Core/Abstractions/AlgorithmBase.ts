import { SortingBarStateEnum, StringMatchingCharacterStateEnum } from '../../Resources/Enumerations';
import { updateSortingBarsStateAction } from '../../Store/Sorting Page/SortingPageStateManagement';
import { store } from '../../Store/Store';
import { SortingBarProps } from '../Interfaces/SortingBarPropsInterface';
import { StringMatchingCharacterProps } from '../Interfaces/StringMatchingCharacterPropsInterface';

export abstract class AlgorithmBase<T> {
  abstract executeAlgorithm(): Promise<void>;
  abstract finalState: T[];
  abstract setFinalState(): void;
}

export abstract class SortingAlgorithmBase extends AlgorithmBase<SortingBarProps> {
  public finalState: SortingBarProps[] = [];
  public setFinalState(): void {
    let barsCopy = [...store.getState().sortingPageState.sortingBars];
    this.finalState = barsCopy.sort((a, b) => a.barHeight - b.barHeight);
  }

  public swapSortingBarsVisually(barsCopy: SortingBarProps[], index1: number, index2: number): void {
    barsCopy = [...barsCopy];
    let currentLeftOffset = document.getElementById(index1.toString())?.offsetLeft;
    let nextLeftOffset = document.getElementById(index2.toString())?.offsetLeft;
    barsCopy[index1] = { ...barsCopy[index1], barState: SortingBarStateEnum.Selected, leftOffset: nextLeftOffset };
    barsCopy[index2] = { ...barsCopy[index2], barState: SortingBarStateEnum.Selected, leftOffset: currentLeftOffset };
    store.dispatch(updateSortingBarsStateAction(barsCopy));
  }

  public selectSortingBars(barsCopy: SortingBarProps[], index1: number, index2: number): void {
    barsCopy = [...barsCopy];
    barsCopy[index1] = { ...barsCopy[index1], barState: SortingBarStateEnum.Selected };
    barsCopy[index2] = { ...barsCopy[index2], barState: SortingBarStateEnum.Selected };
    store.dispatch(updateSortingBarsStateAction(barsCopy));
  }

  public deselectSortingBars(barsCopy: SortingBarProps[], index1: number, index2: number): void {
    barsCopy = [...barsCopy];
    barsCopy[index1] = { ...barsCopy[index1], barState: SortingBarStateEnum.Unselected };
    barsCopy[index2] = { ...barsCopy[index2], barState: SortingBarStateEnum.Unselected };
    store.dispatch(updateSortingBarsStateAction(barsCopy));
  }
}

export abstract class StringMatchingAlgorithmBase extends AlgorithmBase<StringMatchingCharacterProps> {
  public finalState: StringMatchingCharacterProps[] = [];
  public setFinalState(): void {
    let input = store.getState().stringMatchingPageState.stringMatchingInput;
    let pattern = store.getState().stringMatchingPageState.stringMatchingPattern;
    let animationInputCopy = [...store.getState().stringMatchingPageState.stringMatchingAnimationInput];

    let foundIndex: number = input.indexOf(pattern);
    while (foundIndex !== -1) {
      for (let i = foundIndex; i < pattern.length; i++) {
        if (animationInputCopy[i].characterState === StringMatchingCharacterStateEnum.Found) continue;

        animationInputCopy[i] = { ...animationInputCopy[i], characterState: StringMatchingCharacterStateEnum.Found };
      }
      foundIndex = input.indexOf(pattern, foundIndex + 1);
    }

    this.finalState = [...animationInputCopy];
  }

  //TODO work on it, maybe not needed here
  public initialPatternState: StringMatchingCharacterProps[] = [];
  public finalPatternState: StringMatchingCharacterProps[] = [];
  public setInitialPatternState(): void {
    this.initialPatternState = store.getState().stringMatchingPageState.stringMatchingAnimationPattern;
  }
  public setFinalPatternState(): void {
    this.finalPatternState = store.getState().stringMatchingPageState.stringMatchingAnimationPattern;
  }
}
