//#region State
export interface AboutModalState {
  readonly aboutModalVisible: boolean;
}

const initialAboutModalState: AboutModalState = {
  aboutModalVisible: false,
};
//#endregion State

//#region Actions

const UPDATE_ABOUT_MODAL_VISIBLE_STATE = 'updateAboutModalVisibleState';
export const updateAboutModalVisibleStateAction = (
  aboutModalVisible = initialAboutModalState.aboutModalVisible,
) =>
  ({
    type: UPDATE_ABOUT_MODAL_VISIBLE_STATE,
    aboutModalVisible: aboutModalVisible,
  }) as const;

//#endregion Actions

//#region Reducers
type AboutModalActions = ReturnType<typeof updateAboutModalVisibleStateAction>;
export const aboutModalReducer = (state = initialAboutModalState, action: AboutModalActions) => {
  switch (action.type) {
    case UPDATE_ABOUT_MODAL_VISIBLE_STATE:
      return {
        ...state,
        aboutModalVisible: action.aboutModalVisible,
      };

    default:
      return state;
  }
};
//#endregion Reducers
