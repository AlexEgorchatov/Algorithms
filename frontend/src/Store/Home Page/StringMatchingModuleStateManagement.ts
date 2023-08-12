export const enum CharacterState {
  Unselected = 0,
  Selected = 1,
  Found = 2,
}

//#region State
export interface StringMatchingModuleState {
  readonly stringMatchingModuleCharacters: CharacterState[];
}

const initialStringMatchingModuleState: StringMatchingModuleState = {
  stringMatchingModuleCharacters: [
    CharacterState.Unselected,
    CharacterState.Unselected,
    CharacterState.Unselected,
    CharacterState.Unselected,
    CharacterState.Unselected,
    CharacterState.Unselected,
    CharacterState.Unselected,
  ],
};
//#endregion State

//#region Actions
const UPDATE_STRING_MATCHING_MODULE_CHARACTERS_STATE = 'updateStringMatchingModuleState';
export const updateStringMatchingModuleStateAction = (stringMatchingModuleCharacters = initialStringMatchingModuleState.stringMatchingModuleCharacters) =>
  ({
    type: UPDATE_STRING_MATCHING_MODULE_CHARACTERS_STATE,
    stringMatchingModuleCharacters: stringMatchingModuleCharacters,
  } as const);

//#endregion Actions

//#region Reducers
type StringMatchingModuleActions = ReturnType<typeof updateStringMatchingModuleStateAction>;
export const stringMatchingModuleReducer = (state = initialStringMatchingModuleState, action: StringMatchingModuleActions) => {
  switch (action.type) {
    case UPDATE_STRING_MATCHING_MODULE_CHARACTERS_STATE:
      return {
        ...state,
        stringMatchingModuleCharacters: action.stringMatchingModuleCharacters,
      };

    default:
      return state;
  }
};
//#endregion Reducers
