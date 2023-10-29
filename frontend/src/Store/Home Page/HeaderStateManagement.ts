//#region State
export interface HeaderState {
  readonly menuButtonVisibility: boolean;
}

const initialHeaderState: HeaderState = {
  menuButtonVisibility: false,
};
//#endregion State

//#region Actions
const UPDATE_HEADER_VISIBILITY_STATE = 'updateHeaderVisibilityState';
export const updateHeaderStateAction = (visibility = initialHeaderState.menuButtonVisibility) =>
  ({
    type: UPDATE_HEADER_VISIBILITY_STATE,
    visibility: visibility,
  }) as const;

//#endregion Actions

//#region Reducers
type HeaderActions = ReturnType<typeof updateHeaderStateAction>;
export const headerReducer = (state = initialHeaderState, action: HeaderActions) => {
  switch (action.type) {
    case UPDATE_HEADER_VISIBILITY_STATE:
      return {
        ...state,
        menuButtonVisibility: action.visibility,
      };

    default:
      return state;
  }
};
//#endregion Reducers
