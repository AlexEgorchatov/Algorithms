//#region State
export interface AlgorithmState {
  readonly hasAlgorithmStarted: boolean;
  readonly isAlgorithmRunning: boolean;
}

const initialAlgorithmState: AlgorithmState = {
  hasAlgorithmStarted: false,
  isAlgorithmRunning: false,
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
//#endregion Actions

//#region Reducers
type AlgorithmActions = ReturnType<typeof updateHasAlgorithmStartedStateAction> | ReturnType<typeof updateIsAlgorithmRunningStateAction>;
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

    default:
      return state;
  }
};
//#endregion Reducers
