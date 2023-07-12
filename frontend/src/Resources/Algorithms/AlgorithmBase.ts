export enum SortingAlgorithmTypeEnum {
  BubbleSort = 0,
  QuickSort = 1,
}

abstract class AlgorithmBase {
  abstract executeAlgorithm(): Promise<void>;
}

export abstract class SortingAlgorithmBase extends AlgorithmBase {
  public readonly sortingAlgorithmType: SortingAlgorithmTypeEnum;

  constructor(sortingAlgorithmType: SortingAlgorithmTypeEnum) {
    super();
    this.sortingAlgorithmType = sortingAlgorithmType;
  }
}
