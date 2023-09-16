import { store } from '../../App';
import { updateHasAnimationStartedStateAction, updateIsAnimationRunningStateAction } from '../../Store/Shared/AnimationStateManagement';

export class AnimationManager {
  public static isAnimationCompleted: boolean = false;
  public static readonly algorithmIterationBaseTime: number = 400;

  private constructor() {}

  private static async isAnimationContinued(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      let unsubscribe = store.subscribe(() => {
        if (!store.getState().animationState.hasAnimationStarted || this.isAnimationCompleted) {
          resolve(false);
          unsubscribe();
          return;
        }
        if (store.getState().animationState.isAnimationRunning) {
          resolve(true);
          unsubscribe();
          return;
        }
      });
    });
  }

  public static async isAnimationTerminated(): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      if (!store.getState().animationState.hasAnimationStarted || this.isAnimationCompleted) {
        resolve(true);
        return;
      }
      if (store.getState().animationState.isAnimationRunning) {
        resolve(false);
        return;
      }
      if (!(await AnimationManager.isAnimationContinued())) {
        resolve(true);
        return;
      }

      resolve(false);
    });
  }

  public static async pauseForStepIteration(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, this.algorithmIterationBaseTime - 30 * (store.getState().sliderComponentState.sliderValue - 1)));
  }

  public static async startAnimation(startAlgorithm: () => Promise<void>): Promise<void> {
    store.dispatch(updateIsAnimationRunningStateAction(true));
    if (store.getState().animationState.hasAnimationStarted) return;

    store.dispatch(updateHasAnimationStartedStateAction(true));
    await startAlgorithm();

    this.isAnimationCompleted = true;
    store.dispatch(updateIsAnimationRunningStateAction(false));
    store.dispatch(updateHasAnimationStartedStateAction(false));
  }

  public static stopAnimation(stopAlgorithm: () => Promise<void>): void {
    if (!store.getState().animationState.hasAnimationStarted) return;

    store.dispatch(updateHasAnimationStartedStateAction(false));
    store.dispatch(updateIsAnimationRunningStateAction(false));
    stopAlgorithm();
  }

  public static completeAnimation(completeAlgorithm: () => Promise<void>): void {
    if (!store.getState().animationState.hasAnimationStarted) return;

    this.isAnimationCompleted = true;
    completeAlgorithm();
  }
}
