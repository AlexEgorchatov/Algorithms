//#region State
export interface WindowState {
  readonly windowWidth: number;
}

const initialWindowState: WindowState = {
  windowWidth: window.innerWidth,
};
//#endregion State

//#region Actions
const UPDATE_WINDOW_WIDTH_STATE = 'updateWindowWidthState';
export const updateWindowWidthStateAction = (windowWidth: number) =>
  ({
    type: UPDATE_WINDOW_WIDTH_STATE,
    windowWidth: windowWidth,
  } as const);

//#endregion Actions

//#region Reducers
type WindowActions = ReturnType<typeof updateWindowWidthStateAction>;
export const windowReducer = (state = initialWindowState, action: WindowActions) => {
  switch (action.type) {
    case UPDATE_WINDOW_WIDTH_STATE:
      return {
        ...state,
        windowWidth: action.windowWidth,
      };

    default:
      return state;
  }
};
//#endregion Reducers
