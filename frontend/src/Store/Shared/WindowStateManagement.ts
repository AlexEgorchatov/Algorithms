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
const UPDATINGWINDOWWIDTHSTATE = 'UpdatingWindowWidthState';
export const updatingWindowWidthStateAction = (windowWidth: number) =>
  ({
    type: UPDATINGWINDOWWIDTHSTATE,
    windowWidth: windowWidth,
  } as const);

const UPDATINGWINDOWHEIGHTSTATE = 'UpdatingWindowHeightState';
export const updatingWindowHeightStateAction = (windowHeight: number) =>
  ({
    type: UPDATINGWINDOWHEIGHTSTATE,
    windowHeight: windowHeight,
  } as const);

//#endregion Actions

//#region Reducers
type WindowActions = ReturnType<typeof updatingWindowWidthStateAction> | ReturnType<typeof updatingWindowHeightStateAction>;
export const windowReducer = (state = initialWindowState, action: WindowActions) => {
  switch (action.type) {
    case UPDATINGWINDOWWIDTHSTATE:
      return {
        ...state,
        windowWidth: action.windowWidth,
      };

    case UPDATINGWINDOWHEIGHTSTATE:
      return {
        ...state,
        windowHeight: action.windowHeight,
      };

    default:
      return state;
  }
};
//#endregion Reducers
