import { StringMatchingAlgorithmBase } from '../Abstractions/AlgorithmBase';
import { KnuthMorrisPrattPatternMatching, NaivePatternMatching } from '../Algorithms/StringMatchingAlgorithms';

export interface StringMatchingData {
  stringMatchingAlgorithm: StringMatchingAlgorithmBase;
  title: string;
}

export const stringMatchingAlgorithmsData: StringMatchingData[] = [
  {
    stringMatchingAlgorithm: new NaivePatternMatching(),
    title: 'Naive',
  },
  {
    stringMatchingAlgorithm: new KnuthMorrisPrattPatternMatching(),
    title: 'Knuth-Morris-Pratt',
  },
];
