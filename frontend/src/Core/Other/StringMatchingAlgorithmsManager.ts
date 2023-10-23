import { StringMatchingCharacterStateEnum } from '../../Resources/Enumerations';
import { updateIsAnimationFinalizingStateAction } from '../../Store/Shared/AnimationStateManagement';
import { AppState, store } from '../../Store/Store';
import {
  updateSelectedStringMatchingAlgorithmState,
  updateStringMatchingAnimationInputState,
  updateStringMatchingAnimationPatternState,
} from '../../Store/String Matching Module/StringMatchingModuleStateManagement';
import { AlgorithmBase, StringMatchingAlgorithmBase } from '../Abstractions/AlgorithmBase';
import { AlgorithmsManagerBase } from '../Abstractions/AlgorithmManagerBase';
import { IStoreModule } from '../Interfaces/IStoreModule';
import { IStringMatchingCharacterProps } from '../Interfaces/IStringMatchingCharacterProps';
import { isAnimationCompleted } from './AnimationManager';

export class StringMatchingAlgorithmsManager extends AlgorithmsManagerBase {
  public selectedAlgorithm: AlgorithmBase;
  public initialState: IStringMatchingCharacterProps[] = [];
  public initialPatternState: IStringMatchingCharacterProps[] = [];
  public isStateUpdated: boolean = false;

  public constructor(selectedAlgorithm: AlgorithmBase) {
    super();
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

    let lastIndex = await this.selectedAlgorithm.executeAlgorithm();
    if (!isAnimationCompleted || lastIndex === -1) return;

    await this.finalizeStringMatching(lastIndex);
    store.dispatch(updateStringMatchingAnimationPatternState((this.selectedAlgorithm as StringMatchingAlgorithmBase).finalPatternState));
    store.dispatch(updateStringMatchingAnimationInputState(this.selectedAlgorithm.finalState));
    store.dispatch(updateIsAnimationFinalizingStateAction(false));
  }

  public async stopAlgorithm(): Promise<void> {
    store.dispatch(updateStringMatchingAnimationPatternState(this.initialPatternState));
    store.dispatch(updateStringMatchingAnimationInputState(this.initialState));
  }

  public async completeAlgorithm(): Promise<void> {
    store.dispatch(updateIsAnimationFinalizingStateAction(true));
  }

  private async finalizeStringMatching(lastIndex: number): Promise<void> {
    let animationInputCopy = [...store.getState().stringMatchingModuleState.stringMatchingAnimationInput];
    let timeout = 300 / (animationInputCopy.length - lastIndex);

    for (let i = lastIndex; i < animationInputCopy.length; i++) {
      animationInputCopy[i] = { ...animationInputCopy[i], characterState: StringMatchingCharacterStateEnum.Current };
      store.dispatch(updateStringMatchingAnimationInputState(animationInputCopy));
      animationInputCopy = [...animationInputCopy];
      await new Promise((resolve) => setTimeout(resolve, timeout));

      animationInputCopy[i] = this.selectedAlgorithm.finalState[i];
      store.dispatch(updateStringMatchingAnimationInputState(animationInputCopy));
      animationInputCopy = [...animationInputCopy];
    }
  }
}
