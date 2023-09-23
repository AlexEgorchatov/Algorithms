import { AlgorithmBase } from './AlgorithmBase';
import { StoreModule } from './StoreModuleInterface';

export abstract class AlgorithmsManagerBase<T> {
  public abstract selectedAlgorithm: AlgorithmBase<any>;
  public abstract initialState: T[];
  public abstract isStateUpdated: boolean;

  public abstract setInitialState(): void;

  public abstract resetToInitialState(): void;

  public abstract getStoreSelector(): StoreModule;

  public abstract updateStoreSelectedAlgorithmName(): void;

  public abstract startAlgorithm(): Promise<void>;

  public abstract stopAlgorithm(): Promise<void>;

  public abstract completeAlgorithm(): Promise<void>;
}
