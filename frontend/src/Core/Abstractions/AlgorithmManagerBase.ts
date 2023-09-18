import { AlgorithmBase } from './AlgorithmBase';

export abstract class AlgorithmManagerBase<T> {
  public abstract selectedAlgorithm: AlgorithmBase<any>;
  public abstract initialState: T[];

  public abstract setInitialState(): void;

  public abstract resetToInitialState(): void;

  public abstract startAlgorithm(): Promise<void>;

  public abstract stopAlgorithm(): Promise<void>;

  public abstract completeAlgorithm(): Promise<void>;
}
