import { IStoreModule } from '../../Core/Interfaces/IStoreModule';
import { IStringMatchingCharacterProps } from '../../Core/Interfaces/IStringMatchingCharacterProps';

//#region State
export interface StringMatchingPageState extends IStoreModule {
  readonly selectedStringMatchingAlgorithm: string;
  readonly stringMatchingPattern: string;
  readonly stringMatchingInput: string;
  readonly stringMatchingAnimationPattern: IStringMatchingCharacterProps[];
  readonly stringMatchingAnimationInput: IStringMatchingCharacterProps[];
}

const initialStringMatchingPageState: StringMatchingPageState = {
  selectedStringMatchingAlgorithm: '',
  stringMatchingPattern: '',
  stringMatchingInput: '',
  stringMatchingAnimationPattern: [],
  stringMatchingAnimationInput: [],
};
//#endregion State

//#region Actions
const UPDATE_SELECTED_STRING_MATCHING_ALGORITHM_STATE = 'updateSelectedStringMatchingAlgorithmState';
export const updateSelectedStringMatchingAlgorithmState = (selectedStringMatchingAlgorithm = initialStringMatchingPageState.selectedStringMatchingAlgorithm) =>
  ({
    type: UPDATE_SELECTED_STRING_MATCHING_ALGORITHM_STATE,
    selectedStringMatchingAlgorithm: selectedStringMatchingAlgorithm,
  } as const);

export const UPDATE_STRING_MATCHING_PATTERN_STATE = 'updateStringMatchingPatternState';
export const updateStringMatchingPatternState = (stringMatchingPattern = initialStringMatchingPageState.stringMatchingPattern) =>
  ({
    type: UPDATE_STRING_MATCHING_PATTERN_STATE,
    stringMatchingPattern: stringMatchingPattern,
  } as const);

export const UPDATE_STRING_MATCHING_INPUT_STATE = 'updateStringMatchingInputState';
export const updateStringMatchingInputState = (stringMatchingInput = initialStringMatchingPageState.stringMatchingInput) =>
  ({
    type: UPDATE_STRING_MATCHING_INPUT_STATE,
    stringMatchingInput: stringMatchingInput,
  } as const);

const UPDATE_STRING_MATCHING_ANIMATION_PATTERN_STATE = 'updateStringMatchingAnimationPatternState';
export const updateStringMatchingAnimationPatternState = (stringMatchingAnimationPattern = initialStringMatchingPageState.stringMatchingAnimationPattern) =>
  ({
    type: UPDATE_STRING_MATCHING_ANIMATION_PATTERN_STATE,
    stringMatchingAnimationPattern: stringMatchingAnimationPattern,
  } as const);

const UPDATE_STRING_MATCHING_ANIMATION_INPUT_STATE = 'updateStringMatchingAnimationInputState';
export const updateStringMatchingAnimationInputState = (stringMatchingAnimationInput = initialStringMatchingPageState.stringMatchingAnimationInput) =>
  ({
    type: UPDATE_STRING_MATCHING_ANIMATION_INPUT_STATE,
    stringMatchingAnimationInput: stringMatchingAnimationInput,
  } as const);
//#endregion Actions

//#region Reducers
type StringMatchingPageActions =
  | ReturnType<typeof updateSelectedStringMatchingAlgorithmState>
  | ReturnType<typeof updateStringMatchingPatternState>
  | ReturnType<typeof updateStringMatchingInputState>
  | ReturnType<typeof updateStringMatchingAnimationPatternState>
  | ReturnType<typeof updateStringMatchingAnimationInputState>;

export const stringMatchingPageReducer = (state = initialStringMatchingPageState, action: StringMatchingPageActions) => {
  switch (action.type) {
    case UPDATE_SELECTED_STRING_MATCHING_ALGORITHM_STATE:
      return {
        ...state,
        selectedStringMatchingAlgorithm: action.selectedStringMatchingAlgorithm,
      };

    case UPDATE_STRING_MATCHING_PATTERN_STATE:
      return {
        ...state,
        stringMatchingPattern: action.stringMatchingPattern,
      };

    case UPDATE_STRING_MATCHING_INPUT_STATE:
      return {
        ...state,
        stringMatchingInput: action.stringMatchingInput,
      };

    case UPDATE_STRING_MATCHING_ANIMATION_PATTERN_STATE:
      return {
        ...state,
        stringMatchingAnimationPattern: action.stringMatchingAnimationPattern,
      };

    case UPDATE_STRING_MATCHING_ANIMATION_INPUT_STATE:
      return {
        ...state,
        stringMatchingAnimationInput: action.stringMatchingAnimationInput,
      };

    default:
      return state;
  }
};
//#endregion Reducers
