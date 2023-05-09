export const enum CharacterState {
  Unselected = 0,
  Selected = 1,
  Found = 2,
}

//#region State
export interface StringMatchingModuleState {
  readonly initialChars: CharacterState[];
}

const initialStringMatchingModuleState: StringMatchingModuleState = {
  initialChars: [
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
const UPDATINGSTRINGMATCHINGMODULESTATE = 'UpdatingStringMatchingModuleState';
export const updatingStringMatchingModuleStateAction = (chars = initialStringMatchingModuleState.initialChars) =>
  ({
    type: UPDATINGSTRINGMATCHINGMODULESTATE,
    chars: chars,
  } as const);

//#endregion Actions

//#region Reducers
type StringMatchingModuleActions = ReturnType<typeof updatingStringMatchingModuleStateAction>;
export const stringMatchingModuleReducer = (state = initialStringMatchingModuleState, action: StringMatchingModuleActions) => {
  switch (action.type) {
    case UPDATINGSTRINGMATCHINGMODULESTATE:
      return {
        ...state,
        initialChars: action.chars,
      };

    default:
      return state;
  }
};
//#endregion Reducers
