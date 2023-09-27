import { AppState, store } from '../../Store/Store';
import {
  updateSelectedStringMatchingAlgorithmState,
  updateStringMatchingAnimationInputState,
  updateStringMatchingAnimationPatternState,
} from '../../Store/String Matching Module/StringMatchingPageStateManagement';
import { AlgorithmBase, StringMatchingAlgorithmBase } from '../Abstractions/AlgorithmBase';
import { AlgorithmsManagerBase } from '../Abstractions/AlgorithmManagerBase';
import { IStoreModule } from '../Interfaces/IStoreModule';
import { IStringMatchingCharacterProps } from '../Interfaces/IStringMatchingCharacterProps';

export class StringMatchingAlgorithmsManager implements AlgorithmsManagerBase<IStringMatchingCharacterProps> {
  public selectedAlgorithm: AlgorithmBase<any>;
  public initialState: IStringMatchingCharacterProps[] = [];
  public initialPatternState: IStringMatchingCharacterProps[] = [];
  public isStateUpdated: boolean = false;

  public constructor(selectedAlgorithm: AlgorithmBase<any>) {
    this.selectedAlgorithm = selectedAlgorithm;
    store.dispatch(updateSelectedStringMatchingAlgorithmState(selectedAlgorithm.constructor.name));
  }

  public setInitialState(): void {
    this.initialPatternState = [...store.getState().stringMatchingModuleState.stringMatchingAnimationPattern];
    this.initialState = [...store.getState().stringMatchingModuleState.stringMatchingAnimationInput];
  }

  public resetToInitialState(): void {
    store.dispatch(updateStringMatchingAnimationPatternState(this.initialPatternState));
    store.dispatch(updateStringMatchingAnimationInputState(this.initialState));
  }

  public getStoreSelector(): IStoreModule {
    return (state: AppState) => state.stringMatchingModuleState;
  }

  public updateStoreSelectedAlgorithmName(): void {
    store.dispatch(updateSelectedStringMatchingAlgorithmState(this.selectedAlgorithm.constructor.name));
  }

  public async startAlgorithm(): Promise<void> {
    if (this.isStateUpdated) {
      this.setInitialState();
      this.selectedAlgorithm.setFinalState();
      this.isStateUpdated = false;
    }
    await this.selectedAlgorithm.executeAlgorithm();
  }

  public async stopAlgorithm(): Promise<void> {
    store.dispatch(updateStringMatchingAnimationPatternState(this.initialPatternState));
    store.dispatch(updateStringMatchingAnimationInputState(this.initialState));
  }

  public async completeAlgorithm(): Promise<void> {
    store.dispatch(updateStringMatchingAnimationPatternState((this.selectedAlgorithm as StringMatchingAlgorithmBase).finalPatternState));
    store.dispatch(updateStringMatchingAnimationInputState(this.selectedAlgorithm.finalState));
  }
}
