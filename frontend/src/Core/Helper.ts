import { createContext } from 'react';
import { AnimationManager, isAnimationCompleted } from './Other/AnimationManager';
import { store } from '../Store/Store';
import { AlgorithmsManagerBase } from './Abstractions/AlgorithmManagerBase';

const algorithmIterationBaseTime: number = 400;
export const minAppWidth: number = 580;

interface animationProps {
  animationManager: AnimationManager;
}

interface algorithmProps {
  algorithmManager: AlgorithmsManagerBase<any>;
}

export const animationContext = createContext<animationProps>({
  animationManager: {} as AnimationManager,
});

export const algorithmContext = createContext<algorithmProps>({
  algorithmManager: {} as AlgorithmsManagerBase<any>,
});

export const pauseForStepIteration = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, algorithmIterationBaseTime - 30 * (store.getState().sliderComponentState.sliderValue - 1)));
};

export const isAnimationContinued = async (): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    let unsubscribe = store.subscribe(() => {
      if (!store.getState().animationState.hasAnimationStarted || isAnimationCompleted) {
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
};

export const isAnimationTerminated = async (): Promise<boolean> => {
  return new Promise<boolean>(async (resolve) => {
    if (!store.getState().animationState.hasAnimationStarted || isAnimationCompleted) {
      resolve(true);
      return;
    }
    if (store.getState().animationState.isAnimationRunning) {
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
