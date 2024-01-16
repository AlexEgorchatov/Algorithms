//#region State
export interface WindowState {
  readonly windowWidth: number;
  readonly windowHeight: number;
}

const initialWindowState: WindowState = {
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
};
//#endregion State

//#region Actions
const UPDATE_WINDOW_WIDTH_STATE = 'updateWindowWidthState';
export const updateWindowWidthStateAction = (windowWidth: number) =>
  ({
    type: UPDATE_WINDOW_WIDTH_STATE,
    windowWidth: windowWidth,
  }) as const;

const UPDATE_WINDOW_HEIGHT_STATE = 'updateWindowHeightState';
export const updateWindowHeightStateAction = (windowHeight: number) =>
  ({
    type: UPDATE_WINDOW_HEIGHT_STATE,
    windowHeight: windowHeight,
  }) as const;

//#endregion Actions

//#region Reducers
type WindowActions =
  | ReturnType<typeof updateWindowWidthStateAction>
  | ReturnType<typeof updateWindowHeightStateAction>;
export const windowReducer = (state = initialWindowState, action: WindowActions) => {
  switch (action.type) {
    case UPDATE_WINDOW_WIDTH_STATE:
      return {
        ...state,
        windowWidth: action.windowWidth,
      };

    case UPDATE_WINDOW_HEIGHT_STATE:
      return {
        ...state,
        windowHeight: action.windowHeight,
      };

    default:
      return state;
  }
};
//#endregion Reducers
