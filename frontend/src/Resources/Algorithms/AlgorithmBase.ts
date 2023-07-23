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
  public readonly sortingAlgorithm: SortingAlgorithmEnum;

  constructor(sortingAlgorithm: SortingAlgorithmEnum) {
    super();
    this.sortingAlgorithm = sortingAlgorithm;
  }
}

export abstract class StringMatchingAlgorithmBase extends AlgorithmBase {
  public readonly stringMatchingAlgorithm: StringMatchingAlgorithmEnum;

  constructor(stringMatchingAlgorithm: StringMatchingAlgorithmEnum) {
    super();
    this.stringMatchingAlgorithm = stringMatchingAlgorithm;
  }
}
