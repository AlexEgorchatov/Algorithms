import { AlgorithmData } from '../Interfaces/AlgorithmDataInterface';
import { KnuthMorrisPrattPatternMatching, NaivePatternMatching } from '../Algorithms/StringMatchingAlgorithms';

export const stringMatchingAlgorithmsData: AlgorithmData[] = [
  {
    algorithm: new NaivePatternMatching(),
    title: 'Naive',
  },
  {
    algorithm: new KnuthMorrisPrattPatternMatching(),
    title: 'Knuth-Morris-Pratt',
  },
];
