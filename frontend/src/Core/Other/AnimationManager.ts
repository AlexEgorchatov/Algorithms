import {
  updateHasAnimationStartedStateAction,
  updateIsAnimationRunningStateAction,
} from '../../Redux/Shared/AnimationStateManagement';
import { store } from '../../Redux/Store';
import { AlgorithmsManagerBase } from '../Abstractions/AlgorithmManagerBase';

export let isAnimationCompleted: boolean = false;

export class AnimationManager {
  public readonly algorithmManager: AlgorithmsManagerBase;

  public constructor(algorithmManager: AlgorithmsManagerBase) {
    this.algorithmManager = algorithmManager;
  }

  public async startAnimation(): Promise<void> {
    let animationState = store.getState().animationState;
    if (!animationState.canAnimationBeStarted || animationState.isAnimationFinalizing) return;

    let dispatch = store.dispatch;
    dispatch(updateIsAnimationRunningStateAction(true));
    if (animationState.hasAnimationStarted) return;

    dispatch(updateHasAnimationStartedStateAction(true));
    if (isAnimationCompleted && !this.algorithmManager.isStateUpdated) {
      this.algorithmManager.resetToInitialState();
      await new Promise((resolve) => setTimeout(resolve, 250));
    }

    isAnimationCompleted = false;
    await this.algorithmManager.startAlgorithm();

    isAnimationCompleted = true;
    dispatch(updateIsAnimationRunningStateAction(false));
    dispatch(updateHasAnimationStartedStateAction(false));
  }

  public stopAnimation(): void {
    let animationState = store.getState().animationState;
    if (!animationState.hasAnimationStarted || animationState.isAnimationFinalizing) return;

    let dispatch = store.dispatch;
    dispatch(updateHasAnimationStartedStateAction(false));
    dispatch(updateIsAnimationRunningStateAction(false));
    this.algorithmManager.stopAlgorithm();
  }

  public completeAnimation(): void {
    let animationState = store.getState().animationState;
    if (!animationState.hasAnimationStarted || animationState.isAnimationFinalizing) return;

    isAnimationCompleted = true;
    this.algorithmManager.completeAlgorithm();
  }
}
