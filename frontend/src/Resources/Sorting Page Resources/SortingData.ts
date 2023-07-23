import { SortingAlgorithmBase, SortingAlgorithmEnum } from '../Algorithms/AlgorithmBase';
import { BubbleSort, QuickSort } from '../Algorithms/SortingAlgorithms';

export interface SortingData {
  sortingAlgorithm: SortingAlgorithmBase;
  title: string;
}

export const sortingAlgorithms: SortingData[] = [
  {
    sortingAlgorithm: new BubbleSort(SortingAlgorithmEnum.BubbleSort),
    title: 'Bubble Sort',
  },
  {
    sortingAlgorithm: new QuickSort(SortingAlgorithmEnum.QuickSort),
    title: 'Quick Sort',
  },
];
