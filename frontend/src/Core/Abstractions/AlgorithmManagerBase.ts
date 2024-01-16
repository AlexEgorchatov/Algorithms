import { AlgorithmBase } from './AlgorithmBase';

/**
 * @abstract Abstract class to manage the state of the Algorithm.
 * Accepts the selected algorithm as constructor parameter.
 */
export abstract class AlgorithmsManagerBase {
  public abstract selectedAlgorithm: AlgorithmBase;
  public abstract initialState: any[];
  public abstract isStateUpdated: boolean;

  /**
   * Sets the initial state for the algorithms manager.
   * Used when current state is updated.
   */
  public abstract setInitialState(): void;

  /**
   * Resets current state to the initial state.
   * Used when selected algorithm is changed or if animation is completed.
   */
  public abstract resetToInitialState(): void;

  public abstract updateStoreSelectedAlgorithmName(): void;

  public abstract startAlgorithm(): Promise<void>;

  public abstract stopAlgorithm(): Promise<void>;

  public abstract completeAlgorithm(): Promise<void>;
}
