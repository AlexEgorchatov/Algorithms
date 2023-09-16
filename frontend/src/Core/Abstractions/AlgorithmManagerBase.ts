export abstract class AlgorithmManagerBase<T> {
  public abstract initialState: T[];

  public abstract setInitialState(): void;

  public abstract startAlgorithm(): Promise<void>;

  public abstract stopAlgorithm(): Promise<void>;

  public abstract completeAlgorithm(): Promise<void>;
}
