import { AlgorithmData } from '../Interfaces/AlgorithmDataInterface';
import { BubbleSort, QuickSort } from '../Algorithms/SortingAlgorithms';

export const sortingAlgorithmsData: AlgorithmData[] = [
  {
    algorithm: new BubbleSort(),
    title: 'Bubble Sort',
  },
  {
    algorithm: new QuickSort(),
    title: 'Quick Sort',
  },
];
