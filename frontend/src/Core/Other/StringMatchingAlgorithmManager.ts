import { StringMatchingCharacterProps } from '../../Resources/SharedProps';
import { AlgorithmBase } from '../Abstractions/AlgorithmBase';
import { AlgorithmManagerBase } from '../Abstractions/AlgorithmManagerBase';

export class StringMatchingAlgorithmManager implements AlgorithmManagerBase<StringMatchingCharacterProps> {
  public selectedAlgorithm: AlgorithmBase<any>;
  public initialState: StringMatchingCharacterProps[] = [];

  public constructor(selectedAlgorithm: AlgorithmBase<any>) {
    this.selectedAlgorithm = selectedAlgorithm;
  }

  public setInitialState(): void {
    throw new Error('Method not implemented.');
  }
  public resetToInitialState(): void {
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
