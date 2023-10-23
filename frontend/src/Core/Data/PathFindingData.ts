import { IAlgorithmData } from '../Interfaces/IAlgorithmData';
import { AStarSearch, BreadthFirstSearch } from '../Algorithms/PathFindingAlgorithms';

export const pathFindingAlgorithmsData: IAlgorithmData[] = [
  {
    algorithm: new BreadthFirstSearch(),
    title: 'Breadth First Search',
  },
  {
    algorithm: new AStarSearch(),
    title: 'A* Search',
  },
];
