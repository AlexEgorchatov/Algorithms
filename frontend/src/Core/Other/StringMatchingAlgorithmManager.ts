import { AppState, store } from '../../Store/Store';
import {
  updateSelectedStringMatchingAlgorithmState,
  updateStringMatchingAnimationInputState,
  updateStringMatchingAnimationPatternState,
} from '../../Store/String Matching Page/StringMatchingPageStateManagement';
import { AlgorithmBase, StringMatchingAlgorithmBase } from '../Abstractions/AlgorithmBase';
import { AlgorithmsManagerBase } from '../Abstractions/AlgorithmManagerBase';
import { StoreModule } from '../Interfaces/StoreModuleInterface';
import { StringMatchingCharacterProps } from '../Interfaces/StringMatchingCharacterPropsInterface';

export class StringMatchingAlgorithmsManager implements AlgorithmsManagerBase<StringMatchingCharacterProps> {
  public selectedAlgorithm: AlgorithmBase<any>;
  public initialState: StringMatchingCharacterProps[] = [];
  public initialPatternState: StringMatchingCharacterProps[] = [];
  public isStateUpdated: boolean = false;

  public constructor(selectedAlgorithm: AlgorithmBase<any>) {
    this.selectedAlgorithm = selectedAlgorithm;
    store.dispatch(updateSelectedStringMatchingAlgorithmState(selectedAlgorithm.constructor.name));
  }

  public setInitialState(): void {
    this.initialPatternState = [...store.getState().stringMatchingPageState.stringMatchingAnimationPattern];
    this.initialState = [...store.getState().stringMatchingPageState.stringMatchingAnimationInput];
  }

  public resetToInitialState(): void {
    store.dispatch(updateStringMatchingAnimationPatternState(this.initialPatternState));
    store.dispatch(updateStringMatchingAnimationInputState(this.initialState));
  }

  public getStoreSelector(): StoreModule {
    return (state: AppState) => state.stringMatchingPageState;
  }

  public updateStoreSelectedAlgorithmName(): void {
    store.dispatch(updateSelectedStringMatchingAlgorithmState(this.selectedAlgorithm.constructor.name));
  }

  public async startAlgorithm(): Promise<void> {
    await this.selectedAlgorithm.executeAlgorithm();
  }

  public async stopAlgorithm(): Promise<void> {
    store.dispatch(updateStringMatchingAnimationPatternState(this.initialPatternState));
    store.dispatch(updateStringMatchingAnimationInputState(this.initialState));
  }

  public async completeAlgorithm(): Promise<void> {
    store.dispatch(updateStringMatchingAnimationPatternState(this.selectedAlgorithm.finalState));
    store.dispatch(updateStringMatchingAnimationInputState((this.selectedAlgorithm as StringMatchingAlgorithmBase).finalPatternState));
  }
}
