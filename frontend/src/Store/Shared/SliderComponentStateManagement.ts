//#region State
export interface SliderComponentState {
  readonly hasAlgorithmStarted: boolean;
  readonly isAlgorithmRunning: boolean;
  readonly initialSliderValue: number;
}

const initialSliderComponentState: SliderComponentState = {
  hasAlgorithmStarted: false,
  isAlgorithmRunning: false,
  initialSliderValue: 1,
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

const UPDATE_SLIDER_VALUE_STATE = 'UpdateSliderValueState';
export const updateSliderValueStateAction = (sliderValue: number) =>
  ({
    type: UPDATE_SLIDER_VALUE_STATE,
    sliderValue: sliderValue,
  } as const);
//#endregion Actions

//#region Reducers
type SliderComponentActions =
  | ReturnType<typeof updateHasAlgorithmStartedStateAction>
  | ReturnType<typeof updateIsAlgorithmRunningStateAction>
  | ReturnType<typeof updateSliderValueStateAction>;
export const sliderComponentReducer = (state = initialSliderComponentState, action: SliderComponentActions) => {
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

    case UPDATE_SLIDER_VALUE_STATE:
      return {
        ...state,
        initialSliderValue: action.sliderValue,
      };

    default:
      return state;
  }
};
//#endregion Reducers
