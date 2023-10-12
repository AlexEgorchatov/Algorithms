import { updateHasAnimationStartedStateAction, updateIsAnimationRunningStateAction } from '../../Store/Shared/AnimationStateManagement';
import { store } from '../../Store/Store';
import { AlgorithmsManagerBase } from '../Abstractions/AlgorithmManagerBase';

export let isAnimationCompleted: boolean = false;

export class AnimationManager {
  public readonly algorithmManager: AlgorithmsManagerBase<any>;

  public constructor(algorithmManager: AlgorithmsManagerBase<any>) {
    this.algorithmManager = algorithmManager;
  }

  public async startAnimation(): Promise<void> {
    if (!store.getState().animationState.canAnimationBeStarted || store.getState().animationState.isAnimationFinalizing) return;

    store.dispatch(updateIsAnimationRunningStateAction(true));
    if (store.getState().animationState.hasAnimationStarted) return;

    store.dispatch(updateHasAnimationStartedStateAction(true));
    if (isAnimationCompleted && !this.algorithmManager.isStateUpdated) {
      this.algorithmManager.resetToInitialState();
      await new Promise((resolve) => setTimeout(resolve, 250));
    }

    isAnimationCompleted = false;
    await this.algorithmManager.startAlgorithm();

    isAnimationCompleted = true;
    store.dispatch(updateIsAnimationRunningStateAction(false));
    store.dispatch(updateHasAnimationStartedStateAction(false));
  }

  public stopAnimation(): void {
    if (!store.getState().animationState.hasAnimationStarted || store.getState().animationState.isAnimationFinalizing) return;

    store.dispatch(updateHasAnimationStartedStateAction(false));
    store.dispatch(updateIsAnimationRunningStateAction(false));
    this.algorithmManager.stopAlgorithm();
  }

  public completeAnimation(): void {
    if (!store.getState().animationState.hasAnimationStarted || store.getState().animationState.isAnimationFinalizing) return;

    isAnimationCompleted = true;
    this.algorithmManager.completeAlgorithm();
  }
}
