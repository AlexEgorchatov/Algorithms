export enum SortingAlgorithmEnum {
  BubbleSort = 0,
  QuickSort = 1,
}
export enum StringMatchingAlgorithmEnum {
  Naive = 0,
  KnuthMorrisPratt = 1,
}

abstract class AlgorithmBase {
  abstract executeAlgorithm(): Promise<void>;
}

export abstract class SortingAlgorithmBase extends AlgorithmBase {
  public abstract readonly sortingAlgorithm: SortingAlgorithmEnum;
}

export abstract class StringMatchingAlgorithmBase extends AlgorithmBase {
  public abstract readonly stringMatchingAlgorithm: StringMatchingAlgorithmEnum;
  //TODO: move this to the future static class in Helper.cs
  // public initialState: StringMatchingCharacterProps[] = [];
  // public finalState: StringMatchingCharacterProps[] = [];
  // public setInitialState(): void {
  //   this.initialState = store.getState().stringMatchingPageState.stringMatchingAnimationInput;
  // }
  // public setFinalState(): void {
  //   let input = store.getState().stringMatchingPageState.stringMatchingInput;
  //   let pattern = store.getState().stringMatchingPageState.stringMatchingPattern;
  //   let animationInputCopy = [...store.getState().stringMatchingPageState.stringMatchingAnimationInput];

  //   let foundIndex: number = input.indexOf(pattern);
  //   while (foundIndex !== -1) {
  //     for (let i = foundIndex; i < pattern.length; i++) {
  //       if (animationInputCopy[i].characterState === StringMatchingCharacterState.Found) continue;

  //       animationInputCopy[i] = { ...animationInputCopy[i], characterState: StringMatchingCharacterState.Found };
  //     }
  //     foundIndex = input.indexOf(pattern, foundIndex + 1);
  //   }

  //   this.finalState = [...animationInputCopy];
  // }

  // public initialPatternState: StringMatchingCharacterProps[] = [];
  // public finalPatternState: StringMatchingCharacterProps[] = [];
  // public setInitialPatternState(): void {
  //   this.initialPatternState = store.getState().stringMatchingPageState.stringMatchingAnimationPattern;
  // }
  // public setFinalPatternState(): void {
  //   this.finalPatternState = store.getState().stringMatchingPageState.stringMatchingAnimationPattern;
  // }
}
