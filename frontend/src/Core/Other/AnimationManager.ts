import { store } from '../../App';
import { updateHasAnimationStartedStateAction, updateIsAnimationRunningStateAction } from '../../Store/Shared/AnimationStateManagement';
import { AlgorithmManagerBase } from '../Abstractions/AlgorithmManagerBase';

export let isAnimationCompleted: boolean = false;

export class AnimationManager {
  public readonly algorithmManager: AlgorithmManagerBase<any>;

  public constructor(algorithmManager: AlgorithmManagerBase<any>) {
    this.algorithmManager = algorithmManager;
  }

  public async startAnimation(): Promise<void> {
    store.dispatch(updateIsAnimationRunningStateAction(true));
    if (store.getState().animationState.hasAnimationStarted) return;

    store.dispatch(updateHasAnimationStartedStateAction(true));
    if (isAnimationCompleted) {
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
    if (!store.getState().animationState.hasAnimationStarted) return;

    store.dispatch(updateHasAnimationStartedStateAction(false));
    store.dispatch(updateIsAnimationRunningStateAction(false));
    this.algorithmManager.stopAlgorithm();
  }

  public completeAnimation(): void {
    if (!store.getState().animationState.hasAnimationStarted) return;

    isAnimationCompleted = true;
    this.algorithmManager.completeAlgorithm();
  }
}
