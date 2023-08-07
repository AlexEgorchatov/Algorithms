import { StringMatchingAlgorithmEnum } from '../../Resources/Algorithms/AlgorithmBase';

//#region State
export interface StringMatchingPageState {
  readonly isSearchingAlgorithmRunning: boolean;
  readonly hasSearchingAlgorithmStarted: boolean;
  readonly selectedSearchingAlgorithm: StringMatchingAlgorithmEnum;
  readonly stringMatchingInput: string;
  readonly stringMatchingPattern: string;
  readonly stringMatchingAnimationPattern: string;
  readonly stringMatchingPatternLength: number;
  readonly stringMatchingInputLength: number;
  readonly isPatternLengthOverMax: boolean;
}

const initialStringMatchingPageState: StringMatchingPageState = {
  isSearchingAlgorithmRunning: false,
  hasSearchingAlgorithmStarted: false,
  selectedSearchingAlgorithm: StringMatchingAlgorithmEnum.Naive,
  stringMatchingInput:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  stringMatchingPattern: 'type',
  stringMatchingAnimationPattern: 'type',
  stringMatchingPatternLength: 0,
  stringMatchingInputLength: 0,
  isPatternLengthOverMax: false,
};
//#endregion State

//#region Actions
const UPDATING_IS_SEARCHING_ALGORITHM_RUNNING_STATE = 'UpdatingIsAlgorithmRunningState';
export const updatingIsSearchingAlgorithmRunningStateAction = (isSearchingAlgorithmRunning = initialStringMatchingPageState.isSearchingAlgorithmRunning) =>
  ({
    type: UPDATING_IS_SEARCHING_ALGORITHM_RUNNING_STATE,
    isSearchingAlgorithmRunning: isSearchingAlgorithmRunning,
  } as const);

const UPDATINGHASSEARCHINGALGORITHMSTARTEDSTATE = 'UpdatingHasSearchingAlgorithmStartedState';
export const updatingHasSearchingAlgorithmStartedState = (hasSearchingAlgorithmStarted = initialStringMatchingPageState.hasSearchingAlgorithmStarted) =>
  ({
    type: UPDATINGHASSEARCHINGALGORITHMSTARTEDSTATE,
    hasSearchingAlgorithmStarted: hasSearchingAlgorithmStarted,
  } as const);

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

export const UPDATING_STRING_MATCHING_PATTERN_LENGTH_STATE = 'UpdatingStringMatchingPatternLengthState';
export const updatingStringMatchingPatternLengthState = (stringMatchingPatternLength = initialStringMatchingPageState.stringMatchingPatternLength) =>
  ({
    type: UPDATING_STRING_MATCHING_PATTERN_LENGTH_STATE,
    stringMatchingPatternLength: stringMatchingPatternLength,
  } as const);

export const UPDATINGSTRINGMATCHINGINPUTLENGTHSTATE = 'UpdatingStringMatchingInputLengthState';
export const updatingStringMatchingInputLengthState = (stringMatchingInputLength = initialStringMatchingPageState.stringMatchingInputLength) =>
  ({
    type: UPDATINGSTRINGMATCHINGINPUTLENGTHSTATE,
    stringMatchingInputLength: stringMatchingInputLength,
  } as const);

const UPDATINGISPATTERNLENGTHOVERMAXSTATE = 'UpdatingIsPatternLengthOverMaxState';
export const updatingIsPatternLengthOverMaxState = (isPatternLengthOverMax = initialStringMatchingPageState.isPatternLengthOverMax) =>
  ({
    type: UPDATINGISPATTERNLENGTHOVERMAXSTATE,
    isPatternLengthOverMax: isPatternLengthOverMax,
  } as const);
//#endregion Actions

//#region Reducers
export type StringMatchingPageActions =
  | ReturnType<typeof updatingSelectedSearchingAlgorithmState>
  | ReturnType<typeof updatingSelectedSearchingAlgorithmState>
  | ReturnType<typeof updatingHasSearchingAlgorithmStartedState>
  | ReturnType<typeof updatingIsSearchingAlgorithmRunningStateAction>
  | ReturnType<typeof updatingStringMatchingInputState>
  | ReturnType<typeof updatingStringMatchingPatternState>
  | ReturnType<typeof updatingStringMatchingAnimationPatternState>
  | ReturnType<typeof updatingStringMatchingPatternLengthState>
  | ReturnType<typeof updatingStringMatchingInputLengthState>
  | ReturnType<typeof updatingIsPatternLengthOverMaxState>;

export const stringMatchingPageReducer = (state = initialStringMatchingPageState, action: StringMatchingPageActions) => {
  switch (action.type) {
    case UPDATING_IS_SEARCHING_ALGORITHM_RUNNING_STATE:
      return {
        ...state,
        isSearchingAlgorithmRunning: action.isSearchingAlgorithmRunning,
      };
    case UPDATINGHASSEARCHINGALGORITHMSTARTEDSTATE:
      return {
        ...state,
        hasSearchingAlgorithmStarted: action.hasSearchingAlgorithmStarted,
      };
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

    case UPDATINGISPATTERNLENGTHOVERMAXSTATE:
      return {
        ...state,
        isPatternLengthOverMax: action.isPatternLengthOverMax,
      };

    default:
      return state;
  }
};
//#endregion Reducers
