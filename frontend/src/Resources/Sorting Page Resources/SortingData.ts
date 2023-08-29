import { SortingAlgorithmBase } from '../Algorithms/AlgorithmBase';
import { BubbleSort, QuickSort } from '../Algorithms/SortingAlgorithms';

export interface SortingData {
  sortingAlgorithm: SortingAlgorithmBase;
  title: string;
}

export const sortingAlgorithmsData: SortingData[] = [
  {
    sortingAlgorithm: new BubbleSort(),
    title: 'Bubble Sort',
  },
  {
    sortingAlgorithm: new QuickSort(),
    title: 'Quick Sort',
  },
];
