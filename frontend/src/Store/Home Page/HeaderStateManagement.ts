//#region State
export interface HeaderState {
  readonly menuButtonVisible: boolean;
}

const initialHeaderState: HeaderState = {
  menuButtonVisible: false,
};
//#endregion State

//#region Actions
const UPDATE_MENU_BUTTON_VISIBLE_STATE = 'updateMenuButtonVisibleState';
export const updateMenuButtonVisibleStateAction = (
  menuButtonVisible = initialHeaderState.menuButtonVisible,
) =>
  ({
    type: UPDATE_MENU_BUTTON_VISIBLE_STATE,
    menuButtonVisible: menuButtonVisible,
  }) as const;

//#endregion Actions

//#region Reducers
type HeaderActions = ReturnType<typeof updateMenuButtonVisibleStateAction>;
export const headerReducer = (state = initialHeaderState, action: HeaderActions) => {
  switch (action.type) {
    case UPDATE_MENU_BUTTON_VISIBLE_STATE:
      return {
        ...state,
        menuButtonVisible: action.menuButtonVisible,
      };

    default:
      return state;
  }
};
//#endregion Reducers
