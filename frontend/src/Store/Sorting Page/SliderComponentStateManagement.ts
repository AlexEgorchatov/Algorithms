//#region State
export interface SliderComponentState {
  readonly initialSliderValue: number;
}

const initialSliderComponentState: SliderComponentState = {
  initialSliderValue: 1,
};
//#endregion State

//#region Actions
const UPDATINGSLIDERVALUESTATE = 'UpdatingSliderValueState';
export const updatingSliderValueStateAction = (sliderValue = initialSliderComponentState.initialSliderValue) =>
  ({
    type: UPDATINGSLIDERVALUESTATE,
    sliderValue: sliderValue,
  } as const);

//#endregion Actions

//#region Reducers
type SliderComponentActions = ReturnType<typeof updatingSliderValueStateAction>;
export const sliderComponentReducer = (state = initialSliderComponentState, action: SliderComponentActions) => {
  switch (action.type) {
    case UPDATINGSLIDERVALUESTATE:
      console.log(`state ${state.initialSliderValue} action ${action.sliderValue}`);
      return {
        ...state,
        initialMenuButtonVisibility: action.sliderValue,
      };

    default:
      return state;
  }
};
//#endregion Reducers
