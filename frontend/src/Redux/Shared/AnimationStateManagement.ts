//#region State
export interface AnimationState {
  readonly canAnimationBeStarted: boolean;
  readonly hasAnimationStarted: boolean;
  readonly isAnimationRunning: boolean;
  readonly isAnimationFinalizing: boolean;
}

const initialAnimationState: AnimationState = {
  canAnimationBeStarted: true,
  hasAnimationStarted: false,
  isAnimationRunning: false,
  isAnimationFinalizing: false,
};
//#endregion State

//#region Actions

const UPDATE_CAN_ANIMATION_BE_STARTED_STATE = 'UpdateCanAnimationBeStartedState';
export const updateCanAnimationBeStartedStateAction = (canAnimationBeStarted: boolean) =>
  ({
    type: UPDATE_CAN_ANIMATION_BE_STARTED_STATE,
    canAnimationBeStarted: canAnimationBeStarted,
  }) as const;

const UPDATE_HAS_ANIMATION_STARTED_STATE = 'UpdateHasAnimationStartedState';
export const updateHasAnimationStartedStateAction = (hasAnimationStarted: boolean) =>
  ({
    type: UPDATE_HAS_ANIMATION_STARTED_STATE,
    hasAnimationStarted: hasAnimationStarted,
  }) as const;

const UPDATE_IS_ANIMATION_RUNNING_STATE = 'UpdateIsAnimationRunningState';
export const updateIsAnimationRunningStateAction = (isAnimationRunning: boolean) =>
  ({
    type: UPDATE_IS_ANIMATION_RUNNING_STATE,
    isAnimationRunning: isAnimationRunning,
  }) as const;

const UPDATE_IS_ANIMATION_FINALIZING_STATE = 'UpdateIsAnimationFinalizingState';
export const updateIsAnimationFinalizingStateAction = (isAnimationFinalizing: boolean) =>
  ({
    type: UPDATE_IS_ANIMATION_FINALIZING_STATE,
    isAnimationFinalizing: isAnimationFinalizing,
  }) as const;

//#endregion Actions

//#region Reducers
type AnimationActions =
  | ReturnType<typeof updateHasAnimationStartedStateAction>
  | ReturnType<typeof updateIsAnimationRunningStateAction>
  | ReturnType<typeof updateIsAnimationFinalizingStateAction>
  | ReturnType<typeof updateCanAnimationBeStartedStateAction>;
export const animationReducer = (state = initialAnimationState, action: AnimationActions) => {
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

    case UPDATE_CAN_ANIMATION_BE_STARTED_STATE:
      return {
        ...state,
        canAnimationBeStarted: action.canAnimationBeStarted,
      };

    case UPDATE_IS_ANIMATION_FINALIZING_STATE:
      return {
        ...state,
        isAnimationFinalizing: action.isAnimationFinalizing,
      };

    default:
      return state;
  }
};
//#endregion Reducers
