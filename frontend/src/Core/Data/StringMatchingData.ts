import { ModuleData } from '../Interfaces/ModuleDataInterface';
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
