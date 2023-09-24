import { IAlgorithmData } from '../Interfaces/AlgorithmDataInterface';
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
