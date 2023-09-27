//#region State
export interface AnimationState {
  readonly hasAnimationStarted: boolean;
  readonly isAnimationRunning: boolean;
  readonly isAnimationInputNull: boolean;
}

const initialAnimationState: AnimationState = {
  hasAnimationStarted: false,
  isAnimationRunning: false,
  isAnimationInputNull: false,
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

const UPDATE_IS_ANIMATION_INPUT_NULL_STATE = 'UpdateIsAnimationInputNullState';
export const updateIsAnimationInputNullStateAction = (isAnimationInputNull: boolean) =>
  ({
    type: UPDATE_IS_ANIMATION_INPUT_NULL_STATE,
    isAnimationInputNull: isAnimationInputNull,
  } as const);

//#endregion Actions

//#region Reducers
type AnimationActions =
  | ReturnType<typeof updateHasAnimationStartedStateAction>
  | ReturnType<typeof updateIsAnimationRunningStateAction>
  | ReturnType<typeof updateIsAnimationInputNullStateAction>;
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

    case UPDATE_IS_ANIMATION_INPUT_NULL_STATE:
      return {
        ...state,
        isAnimationInputNull: action.isAnimationInputNull,
      };

    default:
      return state;
  }
};
//#endregion Reducers
