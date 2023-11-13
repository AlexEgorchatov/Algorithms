import { createContext } from 'react';
import { AnimationManager, isAnimationCompleted } from './Other/AnimationManager';
import { store } from '../Store/Store';
import { AlgorithmsManagerBase } from './Abstractions/AlgorithmManagerBase';

export const algorithmIterationBaseTime: number = 400;
export const minAppWidth: number = 580;
export const minAnimationContainerHeight: number = 425;

interface animationProps {
  animationManager: AnimationManager;
}

interface algorithmProps {
  algorithmManager: AlgorithmsManagerBase;
}

export const animationContext = createContext<animationProps>({
  animationManager: {} as AnimationManager,
});

export const algorithmContext = createContext<algorithmProps>({
  algorithmManager: {} as AlgorithmsManagerBase,
});

export const pauseForStepIteration = async (): Promise<void> => {
  await new Promise((resolve) =>
    setTimeout(
      resolve,
      algorithmIterationBaseTime - 50 * (store.getState().sliderComponentState.sliderValue - 1),
    ),
  );
};

/**
 * Checks if animation is continued after pause.
 * @returns If animation was stopped (hasAnimationStarted == false) or was skipped (isAnimationCompleted == true) return false.
 * If animation was resumed (isAlgorithmRunning == true) return true.
 */
export const isAnimationContinued = async (): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    let unsubscribe = store.subscribe(() => {
      let animationState = store.getState().animationState;
      if (!animationState.hasAnimationStarted || isAnimationCompleted) {
        resolve(false);
        unsubscribe();
        return;
      }
      if (animationState.isAnimationRunning) {
        resolve(true);
        unsubscribe();
        return;
      }
    });
  });
};

/**
 * Checks if the animation is terminated.
 * @returns If animation was stopped (hasAnimationStarted == false) or was skipped (isAnimationCompleted == true) return true.
 * If animation was not paused (isAnimationRunning == true) return false.
 * Otherwise, animation was paused, wait for the next action.
 */
export const isAnimationTerminated = async (): Promise<boolean> => {
  return new Promise<boolean>(async (resolve) => {
    let animationState = store.getState().animationState;
    if (!animationState.hasAnimationStarted || isAnimationCompleted) {
      resolve(true);
      return;
    }
    if (animationState.isAnimationRunning) {
      resolve(false);
      return;
    }
    if (!(await isAnimationContinued())) {
      resolve(true);
      return;
    }

    resolve(false);
  });
};
