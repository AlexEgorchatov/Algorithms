import { IAlgorithmData } from '../Interfaces/IAlgorithmData';
import {
  KnuthMorrisPrattPatternMatching,
  NaivePatternMatching,
} from '../Algorithms/StringMatchingAlgorithms';

export const stringMatchingAlgorithmsData: IAlgorithmData[] = [
  {
    algorithm: new NaivePatternMatching(),
  },
  {
    algorithm: new KnuthMorrisPrattPatternMatching(),
  },
];
