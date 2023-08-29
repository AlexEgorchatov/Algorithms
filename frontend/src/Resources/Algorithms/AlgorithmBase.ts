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
}
