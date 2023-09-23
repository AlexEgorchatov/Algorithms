import { AlgorithmBase } from '../Abstractions/AlgorithmBase';
import { AlgorithmsManagerBase } from '../Abstractions/AlgorithmManagerBase';
import { StoreModule } from '../Interfaces/StoreModuleInterface';
import { StringMatchingCharacterProps } from '../Interfaces/StringMatchingCharacterPropsInterface';

export class StringMatchingAlgorithmsManager implements AlgorithmsManagerBase<StringMatchingCharacterProps> {
  public selectedAlgorithm: AlgorithmBase<any>;
  public initialState: StringMatchingCharacterProps[] = [];
  public isStateUpdated: boolean = false;

  public constructor(selectedAlgorithm: AlgorithmBase<any>) {
    this.selectedAlgorithm = selectedAlgorithm;
  }

  public setInitialState(): void {
    throw new Error('Method not implemented.');
  }
  public resetToInitialState(): void {
    throw new Error('Method not implemented.');
  }
  public getStoreSelector(): StoreModule {
    throw new Error('Method not implemented.');
  }
  public updateStoreSelectedAlgorithmName(): void {
    throw new Error('Method not implemented.');
  }
  public startAlgorithm(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public stopAlgorithm(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public completeAlgorithm(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
