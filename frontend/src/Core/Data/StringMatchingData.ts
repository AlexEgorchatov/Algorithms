import { IAlgorithmData } from '../Interfaces/IAlgorithmData';
import { KnuthMorrisPrattPatternMatching, NaivePatternMatching } from '../Algorithms/StringMatchingAlgorithms';

export const stringMatchingAlgorithmsData: IAlgorithmData[] = [
  {
    algorithm: new NaivePatternMatching(),
    title: 'Naive',
  },
  {
    algorithm: new KnuthMorrisPrattPatternMatching(),
    title: 'Knuth-Morris-Pratt',
  },
];
