//#region State
export interface SliderComponentState {
  readonly initialSliderValue: number;
}

const initialSliderComponentState: SliderComponentState = {
  initialSliderValue: 1,
};
//#endregion State

//#region Actions

const UPDATE_SLIDER_VALUE_STATE = 'UpdateSliderValueState';
export const updateSliderValueStateAction = (sliderValue: number) =>
  ({
    type: UPDATE_SLIDER_VALUE_STATE,
    sliderValue: sliderValue,
  } as const);
//#endregion Actions

//#region Reducers
type SliderComponentActions = ReturnType<typeof updateSliderValueStateAction>;
export const sliderComponentReducer = (state = initialSliderComponentState, action: SliderComponentActions) => {
  switch (action.type) {
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
