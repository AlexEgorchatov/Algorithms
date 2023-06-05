export enum SortingEnumeration {
  BubbleSort = 0,
  QuickSort = 1,
}

export interface SortingData {
  sortingType: SortingEnumeration;
  title: string;
}

export const sortingAlgorithms: SortingData[] = [
  {
    sortingType: SortingEnumeration.BubbleSort,
    title: 'Bubble Sort',
  },
  {
    sortingType: SortingEnumeration.QuickSort,
    title: 'Quick Sort',
  },
];
