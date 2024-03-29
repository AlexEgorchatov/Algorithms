import { IStringMatchingCharacterProps } from '../../Core/Interfaces/IStringMatchingCharacterProps';

//#region State
export interface StringMatchingModulePreviewState {
  readonly characters: IStringMatchingCharacterProps[];
}

const initialStringMatchingModulePreviewState: StringMatchingModulePreviewState = {
  characters: [],
};
//#endregion State

//#region Actions
const UPDATE_STRING_MATCHING_MODULE_PREVIEW_CHARACTERS_STATE =
  'updateStringMatchingModulePreviewCharacters';
export const updateStringMatchingModulePreviewCharactersState = (
  characters = initialStringMatchingModulePreviewState.characters,
) =>
  ({
    type: UPDATE_STRING_MATCHING_MODULE_PREVIEW_CHARACTERS_STATE,
    characters: characters,
  }) as const;

//#endregion Actions

//#region Reducers
type StringMatchingModulePreviewActions = ReturnType<
  typeof updateStringMatchingModulePreviewCharactersState
>;
export const stringMatchingModulePreviewReducer = (
  state = initialStringMatchingModulePreviewState,
  action: StringMatchingModulePreviewActions,
) => {
  switch (action.type) {
    case UPDATE_STRING_MATCHING_MODULE_PREVIEW_CHARACTERS_STATE:
      return {
        ...state,
        characters: action.characters,
      };

    default:
      return state;
  }
};
//#endregion Reducers
