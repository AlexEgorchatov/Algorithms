import { StringMatchingAlgorithmEnum } from '../../Resources/Algorithms/AlgorithmBase';

//#region State
export interface StringMatchingPageState {
  readonly selectedSearchingAlgorithm: StringMatchingAlgorithmEnum;
  readonly stringMatchingInput: string;
  readonly stringMatchingPattern: string;
  readonly stringMatchingAnimationPattern: string;
  readonly stringMatchingPatternLength: number;
  readonly stringMatchingInputLength: number;
  readonly isPatternLengthOverMax: boolean;
}

const initialStringMatchingPageState: StringMatchingPageState = {
  selectedSearchingAlgorithm: StringMatchingAlgorithmEnum.Naive,
  stringMatchingInput: '',
  stringMatchingPattern: '',
  stringMatchingAnimationPattern: '',
  stringMatchingPatternLength: 0,
  stringMatchingInputLength: 0,
  isPatternLengthOverMax: false,
};
//#endregion State

//#region Actions
const UPDATINGSELECTEDSEARCHINGALGORITHMSTATE = 'UpdatingSelectedStringMatchingAlgorithmState';
export const updatingSelectedSearchingAlgorithmState = (selectedSearchingAlgorithm = initialStringMatchingPageState.selectedSearchingAlgorithm) =>
  ({
    type: UPDATINGSELECTEDSEARCHINGALGORITHMSTATE,
    selectedSearchingAlgorithm: selectedSearchingAlgorithm,
  } as const);

export const UPDATING_STRING_MATCHING_INPUT_STATE = 'UpdatingStringMatchingInputState';
export const updatingStringMatchingInputState = (stringMatchingInput = initialStringMatchingPageState.stringMatchingInput) =>
  ({
    type: UPDATING_STRING_MATCHING_INPUT_STATE,
    stringMatchingInput: stringMatchingInput,
  } as const);

export const UPDATING_STRING_MATCHING_PATTERN_STATE = 'UpdatingStringMatchingPatternState';
export const updatingStringMatchingPatternState = (stringMatchingPattern = initialStringMatchingPageState.stringMatchingPattern) =>
  ({
    type: UPDATING_STRING_MATCHING_PATTERN_STATE,
    stringMatchingPattern: stringMatchingPattern,
  } as const);

const UPDATINGSTRINGMATCHINGANIMATIONPATTERNSTATE = 'UpdatingStringMatchingAnimationPatternState';
export const updatingStringMatchingAnimationPatternState = (stringMatchingAnimationPattern = initialStringMatchingPageState.stringMatchingAnimationPattern) =>
  ({
    type: UPDATINGSTRINGMATCHINGANIMATIONPATTERNSTATE,
    stringMatchingAnimationPattern: stringMatchingAnimationPattern,
  } as const);

const UPDATING_STRING_MATCHING_PATTERN_LENGTH_STATE = 'UpdatingStringMatchingPatternLengthState';
export const updatingStringMatchingPatternLengthState = (stringMatchingPatternLength = initialStringMatchingPageState.stringMatchingPatternLength) =>
  ({
    type: UPDATING_STRING_MATCHING_PATTERN_LENGTH_STATE,
    stringMatchingPatternLength: stringMatchingPatternLength,
  } as const);

const UPDATINGSTRINGMATCHINGINPUTLENGTHSTATE = 'UpdatingStringMatchingInputLengthState';
export const updatingStringMatchingInputLengthState = (stringMatchingInputLength = initialStringMatchingPageState.stringMatchingInputLength) =>
  ({
    type: UPDATINGSTRINGMATCHINGINPUTLENGTHSTATE,
    stringMatchingInputLength: stringMatchingInputLength,
  } as const);

const UPDATING_IS_PATTERN_LENGTH_OVER_MAX_STATE = 'UpdatingIsPatternLengthOverMaxState';
export const updatingIsPatternLengthOverMaxState = (isPatternLengthOverMax = initialStringMatchingPageState.isPatternLengthOverMax) =>
  ({
    type: UPDATING_IS_PATTERN_LENGTH_OVER_MAX_STATE,
    isPatternLengthOverMax: isPatternLengthOverMax,
  } as const);
//#endregion Actions

//#region Reducers
export type StringMatchingPageActions =
  | ReturnType<typeof updatingSelectedSearchingAlgorithmState>
  | ReturnType<typeof updatingSelectedSearchingAlgorithmState>
  | ReturnType<typeof updatingStringMatchingInputState>
  | ReturnType<typeof updatingStringMatchingPatternState>
  | ReturnType<typeof updatingStringMatchingAnimationPatternState>
  | ReturnType<typeof updatingStringMatchingPatternLengthState>
  | ReturnType<typeof updatingStringMatchingInputLengthState>
  | ReturnType<typeof updatingIsPatternLengthOverMaxState>;

export const stringMatchingPageReducer = (state = initialStringMatchingPageState, action: StringMatchingPageActions) => {
  switch (action.type) {
    case UPDATINGSELECTEDSEARCHINGALGORITHMSTATE:
      return {
        ...state,
        selectedSearchingAlgorithm: action.selectedSearchingAlgorithm,
      };

    case UPDATING_STRING_MATCHING_INPUT_STATE:
      return {
        ...state,
        stringMatchingInput: action.stringMatchingInput,
      };

    case UPDATING_STRING_MATCHING_PATTERN_STATE:
      return {
        ...state,
        stringMatchingPattern: action.stringMatchingPattern,
      };

    case UPDATINGSTRINGMATCHINGANIMATIONPATTERNSTATE:
      return {
        ...state,
        stringMatchingAnimationPattern: action.stringMatchingAnimationPattern,
      };

    case UPDATING_STRING_MATCHING_PATTERN_LENGTH_STATE:
      return {
        ...state,
        stringMatchingPatternLength: action.stringMatchingPatternLength,
      };

    case UPDATINGSTRINGMATCHINGINPUTLENGTHSTATE:
      return {
        ...state,
        stringMatchingInputLength: action.stringMatchingInputLength,
      };

    case UPDATING_IS_PATTERN_LENGTH_OVER_MAX_STATE:
      return {
        ...state,
        isPatternLengthOverMax: action.isPatternLengthOverMax,
      };

    default:
      return state;
  }
};
//#endregion Reducers
