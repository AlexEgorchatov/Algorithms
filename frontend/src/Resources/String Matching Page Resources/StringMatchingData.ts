import { StringMatchingAlgorithmBase, StringMatchingAlgorithmEnum } from '../Algorithms/AlgorithmBase';
import { NaivePatternMatching } from '../Algorithms/StringMatchingAlgorithms';

export interface StringMatchingData {
  stringMatchingAlgorithm: StringMatchingAlgorithmBase;
  title: string;
}

export const stringMatchingAlgorithms: StringMatchingData[] = [
  {
    stringMatchingAlgorithm: new NaivePatternMatching(StringMatchingAlgorithmEnum.Naive),
    title: 'Naive',
  },
  {
    stringMatchingAlgorithm: new NaivePatternMatching(StringMatchingAlgorithmEnum.KnuthMorrisPratt),
    title: 'Knuth-Morris-Pratt',
  },
];
