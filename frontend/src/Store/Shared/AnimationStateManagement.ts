//#region State
export interface AnimationState {
  readonly hasAnimationStarted: boolean;
  readonly isAnimationRunning: boolean;
  readonly isAnimationCompleted: boolean;
}

const initialAlgorithmState: AnimationState = {
  hasAnimationStarted: false,
  isAnimationRunning: false,
  isAnimationCompleted: false,
};
//#endregion State

//#region Actions
const UPDATE_HAS_ANIMATION_STARTED_STATE = 'UpdateHasAnimationStartedState';
export const updateHasAnimationStartedStateAction = (hasAnimationStarted: boolean) =>
  ({
    type: UPDATE_HAS_ANIMATION_STARTED_STATE,
    hasAnimationStarted: hasAnimationStarted,
  } as const);

const UPDATE_IS_ANIMATION_RUNNING_STATE = 'UpdateIsAnimationRunningState';
export const updateIsAnimationRunningStateAction = (isAnimationRunning: boolean) =>
  ({
    type: UPDATE_IS_ANIMATION_RUNNING_STATE,
    isAnimationRunning: isAnimationRunning,
  } as const);

const UPDATE_IS_ANIMATION_COMPLETED_STATE = 'UpdateIsAnimationCompletedState';
export const updateIsAlgorithmCompletedStateAction = (isAnimationCompleted: boolean) =>
  ({
    type: UPDATE_IS_ANIMATION_COMPLETED_STATE,
    isAnimationCompleted: isAnimationCompleted,
  } as const);
//#endregion Actions

//#region Reducers
type AnimationActions =
  | ReturnType<typeof updateHasAnimationStartedStateAction>
  | ReturnType<typeof updateIsAnimationRunningStateAction>
  | ReturnType<typeof updateIsAlgorithmCompletedStateAction>;
export const animationReducer = (state = initialAlgorithmState, action: AnimationActions) => {
  switch (action.type) {
    case UPDATE_HAS_ANIMATION_STARTED_STATE:
      return {
        ...state,
        hasAnimationStarted: action.hasAnimationStarted,
      };

    case UPDATE_IS_ANIMATION_RUNNING_STATE:
      return {
        ...state,
        isAnimationRunning: action.isAnimationRunning,
      };

    case UPDATE_IS_ANIMATION_COMPLETED_STATE:
      return {
        ...state,
        isAnimationCompleted: action.isAnimationCompleted,
      };

    default:
      return state;
  }
};
//#endregion Reducers
