import { IAlgorithmData } from '../Interfaces/IAlgorithmData';
import { BubbleSort, QuickSort } from '../Algorithms/SortingAlgorithms';

export const sortingAlgorithmsData: IAlgorithmData[] = [
  {
    algorithm: new BubbleSort(),
    title: 'Bubble Sort',
  },
  {
    algorithm: new QuickSort(),
    title: 'Quick Sort',
  },
];
