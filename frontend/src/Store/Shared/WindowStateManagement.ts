//#region State
export interface WindowState {
  readonly windowWidth: number;
}

const initialWindowState: WindowState = {
  windowWidth: window.innerWidth,
};
//#endregion State

//#region Actions
const UPDATINGWINDOWWIDTHSTATE = 'UpdatingWindowWidthState';
export const updatingWindowWidthStateAction = (windowWidth: number) =>
  ({
    type: UPDATINGWINDOWWIDTHSTATE,
    windowWidth: windowWidth,
  } as const);

//#endregion Actions

//#region Reducers
type WindowActions = ReturnType<typeof updatingWindowWidthStateAction>;
export const windowReducer = (state = initialWindowState, action: WindowActions) => {
  switch (action.type) {
    case UPDATINGWINDOWWIDTHSTATE:
      return {
        ...state,
        windowWidth: action.windowWidth,
      };

    default:
      return state;
  }
};
//#endregion Reducers
