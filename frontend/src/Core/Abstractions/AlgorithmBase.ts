/**
 * @abstract Abstract class for any algorithm.
 * The initial state is universal for all algorithms that belong to a specific module,
 * but the final state depends on the selected algorithm. Hence, the initial state is not a part of the abstraction.
 */
export abstract class AlgorithmBase {
  abstract executeAlgorithm(...args: any[]): Promise<any>;
  abstract finalState: any[];
  abstract setFinalState(): void;
  abstract readonly title: string;
}
