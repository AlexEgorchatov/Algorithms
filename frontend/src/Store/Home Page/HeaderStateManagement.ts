//#region State
export interface HeaderState {
  readonly menuButtonVisible: boolean;
  readonly aboutFormVisible: boolean;
}

const initialHeaderState: HeaderState = {
  menuButtonVisible: false,
  aboutFormVisible: false,
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

const UPDATE_ABOUT_FORM_VISIBLE_STATE = 'updateAboutFormVisibleState';
export const updateAboutFormVisibleStateAction = (
  aboutFormVisible = initialHeaderState.aboutFormVisible,
) =>
  ({
    type: UPDATE_ABOUT_FORM_VISIBLE_STATE,
    aboutFormVisible: aboutFormVisible,
  }) as const;

//#endregion Actions

//#region Reducers
type HeaderActions =
  | ReturnType<typeof updateMenuButtonVisibleStateAction>
  | ReturnType<typeof updateAboutFormVisibleStateAction>;
export const headerReducer = (state = initialHeaderState, action: HeaderActions) => {
  switch (action.type) {
    case UPDATE_MENU_BUTTON_VISIBLE_STATE:
      return {
        ...state,
        menuButtonVisible: action.menuButtonVisible,
      };

    case UPDATE_ABOUT_FORM_VISIBLE_STATE:
      return {
        ...state,
        aboutFormVisible: action.aboutFormVisible,
      };

    default:
      return state;
  }
};
//#endregion Reducers
