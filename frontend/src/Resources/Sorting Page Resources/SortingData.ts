import { SortingAlgorithmBase, SortingAlgorithmTypeEnum } from '../Algorithms/AlgorithmBase';
import { BubbleSort, QuickSort } from '../Algorithms/SortingAlgorithms';

export interface SortingData {
  sortingAlgorithm: SortingAlgorithmBase;
  title: string;
}

export const sortingAlgorithms: SortingData[] = [
  {
    sortingAlgorithm: new BubbleSort(SortingAlgorithmTypeEnum.BubbleSort),
    title: 'Bubble Sort',
  },
  {
    sortingAlgorithm: new QuickSort(SortingAlgorithmTypeEnum.QuickSort),
    title: 'Quick Sort',
  },
];
