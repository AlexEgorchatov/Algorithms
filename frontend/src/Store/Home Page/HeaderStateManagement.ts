//#region State
export interface HeaderState {
  readonly initialMenuButtonVisibility: boolean;
}

const initialHeaderState: HeaderState = {
  initialMenuButtonVisibility: false,
};
//#endregion State

//#region Actions
const UPDATINGHEADERVISIBILITYSTATE = 'UpdatingHeaderVisibilityState';
export const updatingHeaderStateAction = (visibility = initialHeaderState.initialMenuButtonVisibility) =>
  ({
    type: UPDATINGHEADERVISIBILITYSTATE,
    visibility: visibility,
  } as const);

//#endregion Actions

//#region Reducers
type HeaderActions = ReturnType<typeof updatingHeaderStateAction>;
export const headerReducer = (state = initialHeaderState, action: HeaderActions) => {
  switch (action.type) {
    case UPDATINGHEADERVISIBILITYSTATE:
      return {
        ...state,
        initialMenuButtonVisibility: action.visibility,
      };

    default:
      return state;
  }
};
//#endregion Reducers
