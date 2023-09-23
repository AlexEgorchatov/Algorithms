import { StoreModule } from '../../Core/Abstractions/StoreModuleInterface';
import { StringMatchingAlgorithmEnum } from '../../Resources/Enumerations';
import { StringMatchingCharacterProps } from '../../Resources/SharedProps';

//#region State
export interface StringMatchingPageState extends StoreModule {
  readonly selectedSearchingAlgorithm: StringMatchingAlgorithmEnum;
  readonly stringMatchingPattern: string;
  readonly stringMatchingInput: string;
  readonly stringMatchingAnimationPattern: StringMatchingCharacterProps[];
  readonly stringMatchingAnimationInput: StringMatchingCharacterProps[];
}

const initialStringMatchingPageState: StringMatchingPageState = {
  selectedSearchingAlgorithm: StringMatchingAlgorithmEnum.Naive,
  stringMatchingPattern: '',
  stringMatchingInput: '',
  stringMatchingAnimationPattern: [],
  stringMatchingAnimationInput: [],
};
//#endregion State

//#region Actions
const UPDATE_SELECTED_SEARCHING_ALGORITHM_STATE = 'updateSelectedStringMatchingAlgorithmState';
export const updateSelectedSearchingAlgorithmState = (selectedSearchingAlgorithm = initialStringMatchingPageState.selectedSearchingAlgorithm) =>
  ({
    type: UPDATE_SELECTED_SEARCHING_ALGORITHM_STATE,
    selectedSearchingAlgorithm: selectedSearchingAlgorithm,
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
  | ReturnType<typeof updateSelectedSearchingAlgorithmState>
  | ReturnType<typeof updateStringMatchingPatternState>
  | ReturnType<typeof updateStringMatchingInputState>
  | ReturnType<typeof updateStringMatchingAnimationPatternState>
  | ReturnType<typeof updateStringMatchingAnimationInputState>;

export const stringMatchingPageReducer = (state = initialStringMatchingPageState, action: StringMatchingPageActions) => {
  switch (action.type) {
    case UPDATE_SELECTED_SEARCHING_ALGORITHM_STATE:
      return {
        ...state,
        selectedSearchingAlgorithm: action.selectedSearchingAlgorithm,
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
