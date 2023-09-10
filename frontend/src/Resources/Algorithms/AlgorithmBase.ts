import { store } from '../../App';
import { SortingBarProps } from '../../Pages/SortingPage';
import { StringMatchingCharacterProps, StringMatchingCharacterState } from '../../Pages/StringMatchingPage';

export enum SortingAlgorithmEnum {
  BubbleSort = 0,
  QuickSort = 1,
}
export enum StringMatchingAlgorithmEnum {
  Naive = 0,
  KnuthMorrisPratt = 1,
}

abstract class AlgorithmBase<T> {
  abstract executeAlgorithm(): Promise<void>;
  abstract initialState: T[];
  abstract finalState: T[];
  abstract setInitialState(): void;
  abstract setFinalState(): void;
}

export abstract class SortingAlgorithmBase extends AlgorithmBase<SortingBarProps> {
  public abstract readonly sortingAlgorithm: SortingAlgorithmEnum;
  public initialState: SortingBarProps[] = [];
  public finalState: SortingBarProps[] = [];
  public setInitialState(): void {
    this.initialState = store.getState().sortingPageState.sortingBars;
  }
  public setFinalState(): void {
    let barsCopy = [...store.getState().sortingPageState.sortingBars];
    this.finalState = barsCopy.sort((a, b) => a.barHeight - b.barHeight);
  }
}

export abstract class StringMatchingAlgorithmBase extends AlgorithmBase<StringMatchingCharacterProps> {
  public abstract readonly stringMatchingAlgorithm: StringMatchingAlgorithmEnum;
  public initialState: StringMatchingCharacterProps[] = [];
  public finalState: StringMatchingCharacterProps[] = [];
  public setInitialState(): void {
    this.initialState = store.getState().stringMatchingPageState.stringMatchingAnimationInput;
  }
  public setFinalState(): void {
    let input = store.getState().stringMatchingPageState.stringMatchingInput;
    let pattern = store.getState().stringMatchingPageState.stringMatchingPattern;
    let animationInputCopy = [...store.getState().stringMatchingPageState.stringMatchingAnimationInput];

    let foundIndex: number = input.indexOf(pattern);
    while (foundIndex !== -1) {
      for (let i = foundIndex; i < pattern.length; i++) {
        if (animationInputCopy[i].characterState === StringMatchingCharacterState.Found) continue;

        animationInputCopy[i] = { ...animationInputCopy[i], characterState: StringMatchingCharacterState.Found };
      }
      foundIndex = input.indexOf(pattern, foundIndex + 1);
    }
  }

  public initialPatternState: StringMatchingCharacterProps[] = [];
  public finalPatternState: StringMatchingCharacterProps[] = [];
  public setInitialPatternState(): void {
    this.initialPatternState = store.getState().stringMatchingPageState.stringMatchingAnimationPattern;
  }
  public setFinalPatternState(): void {
    this.finalPatternState = store.getState().stringMatchingPageState.stringMatchingAnimationPattern;
  }
}
