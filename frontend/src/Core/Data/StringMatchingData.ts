import { ModuleData } from '../Abstractions/ModuleData';
import { KnuthMorrisPrattPatternMatching, NaivePatternMatching } from '../Algorithms/StringMatchingAlgorithms';

export const stringMatchingAlgorithmsData: ModuleData[] = [
  {
    algorithm: new NaivePatternMatching(),
    title: 'Naive',
  },
  {
    algorithm: new KnuthMorrisPrattPatternMatching(),
    title: 'Knuth-Morris-Pratt',
  },
];
