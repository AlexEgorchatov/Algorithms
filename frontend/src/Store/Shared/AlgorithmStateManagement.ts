//#region State
export interface AlgorithmState {
  readonly hasAlgorithmStarted: boolean;
  readonly isAlgorithmRunning: boolean;
  readonly isAlgorithmCompleted: boolean;
}

const initialAlgorithmState: AlgorithmState = {
  hasAlgorithmStarted: false,
  isAlgorithmRunning: false,
  isAlgorithmCompleted: false,
};
//#endregion State

//#region Actions
const UPDATE_HAS_ALGORITHM_STARTED_STATE = 'UpdateHasAlgorithmStartedState';
export const updateHasAlgorithmStartedStateAction = (hasAlgorithmStarted: boolean) =>
  ({
    type: UPDATE_HAS_ALGORITHM_STARTED_STATE,
    hasAlgorithmStarted: hasAlgorithmStarted,
  } as const);

const UPDATE_IS_ALGORITHM_RUNNING_STATE = 'UpdateIsAlgorithmRunningState';
export const updateIsAlgorithmRunningStateAction = (isAlgorithmRunning: boolean) =>
  ({
    type: UPDATE_IS_ALGORITHM_RUNNING_STATE,
    isAlgorithmRunning: isAlgorithmRunning,
  } as const);

const UPDATE_IS_ALGORITHM_COMPLETED_STATE = 'UpdateIsAlgorithmCompletedState';
export const updateIsAlgorithmCompletedStateAction = (isAlgorithmCompleted: boolean) =>
  ({
    type: UPDATE_IS_ALGORITHM_COMPLETED_STATE,
    isAlgorithmCompleted: isAlgorithmCompleted,
  } as const);
//#endregion Actions

//#region Reducers
type AlgorithmActions =
  | ReturnType<typeof updateHasAlgorithmStartedStateAction>
  | ReturnType<typeof updateIsAlgorithmRunningStateAction>
  | ReturnType<typeof updateIsAlgorithmCompletedStateAction>;
export const algorithmReducer = (state = initialAlgorithmState, action: AlgorithmActions) => {
  switch (action.type) {
    case UPDATE_HAS_ALGORITHM_STARTED_STATE:
      return {
        ...state,
        hasAlgorithmStarted: action.hasAlgorithmStarted,
      };

    case UPDATE_IS_ALGORITHM_RUNNING_STATE:
      return {
        ...state,
        isAlgorithmRunning: action.isAlgorithmRunning,
      };

    case UPDATE_IS_ALGORITHM_COMPLETED_STATE:
      return {
        ...state,
        isAlgorithmCompleted: action.isAlgorithmCompleted,
      };

    default:
      return state;
  }
};
//#endregion Reducers
