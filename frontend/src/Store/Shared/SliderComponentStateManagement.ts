//#region State
export interface SliderComponentState {
  readonly initialSliderValue: number;
  readonly initialPauseVisibility: boolean;
}

const initialSliderComponentState: SliderComponentState = {
  initialSliderValue: 1,
  initialPauseVisibility: false,
};
//#endregion State

//#region Actions
const UPDATINGSLIDERVALUESTATE = 'UpdatingSliderValueState';
export const updatingSliderValueStateAction = (sliderValue: number) =>
  ({
    type: UPDATINGSLIDERVALUESTATE,
    sliderValue: sliderValue,
  } as const);

const UPDATINGSPAUSEVISIBILITYSTATE = 'UpdatingPauseVisibilityState';
export const updatingPauseVisibilityStateAction = (visibility: boolean) =>
  ({
    type: UPDATINGSPAUSEVISIBILITYSTATE,
    visibility: visibility,
  } as const);

//#endregion Actions

//#region Reducers
type SliderComponentActions =
  | ReturnType<typeof updatingSliderValueStateAction>
  | ReturnType<typeof updatingPauseVisibilityStateAction>;
export const sliderComponentReducer = (state = initialSliderComponentState, action: SliderComponentActions) => {
  switch (action.type) {
    case UPDATINGSLIDERVALUESTATE:
      return {
        ...state,
        initialSliderValue: action.sliderValue,
      };

    case UPDATINGSPAUSEVISIBILITYSTATE:
      return {
        ...state,
        initialPauseVisibility: action.visibility,
      };

    default:
      return state;
  }
};
//#endregion Reducers
