import { ModuleData } from '../Interfaces/ModuleDataInterface';
import { BubbleSort, QuickSort } from '../Algorithms/SortingAlgorithms';

export const sortingAlgorithmsData: ModuleData[] = [
  {
    algorithm: new BubbleSort(),
    title: 'Bubble Sort',
  },
  {
    algorithm: new QuickSort(),
    title: 'Quick Sort',
  },
];
