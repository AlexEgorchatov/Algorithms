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
  readonly isPatternLengthOverMax: boolean;
}

const initialStringMatchingPageState: StringMatchingPageState = {
  isSearchingAlgorithmRunning: false,
  hasSearchingAlgorithmStarted: false,
  selectedSearchingAlgorithm: StringMatchingAlgorithmEnum.Naive,
  stringMatchingInput: '',
  stringMatchingPattern: '',
  stringMatchingAnimationPattern: '',
  stringMatchingPatternLength: 0,
  isPatternLengthOverMax: false,
};
//#endregion State

//#region Actions
const UPDATINGISSEARCHINGALGORITHMRUNNINGSTATE = 'UpdatingIsAlgorithmRunningState';
export const updatingIsSearchingAlgorithmRunningStateAction = (isSearchingAlgorithmRunning = initialStringMatchingPageState.isSearchingAlgorithmRunning) =>
  ({
    type: UPDATINGISSEARCHINGALGORITHMRUNNINGSTATE,
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

const UPDATINGSTRINGMATCHINGINPUTSTATE = 'UpdatingStringMatchingInputState';
export const updatingStringMatchingInputState = (stringMatchingInput = initialStringMatchingPageState.stringMatchingInput) =>
  ({
    type: UPDATINGSTRINGMATCHINGINPUTSTATE,
    stringMatchingInput: stringMatchingInput,
  } as const);

const UPDATINGSTRINGMATCHINGPATTERNSTATE = 'UpdatingStringMatchingPatternState';
export const updatingStringMatchingPatternState = (stringMatchingPattern = initialStringMatchingPageState.stringMatchingPattern) =>
  ({
    type: UPDATINGSTRINGMATCHINGPATTERNSTATE,
    stringMatchingPattern: stringMatchingPattern,
  } as const);

const UPDATINGSTRINGMATCHINGANIMATIONPATTERNSTATE = 'UpdatingStringMatchingAnimationPatternState';
export const updatingStringMatchingAnimationPatternState = (stringMatchingAnimationPattern = initialStringMatchingPageState.stringMatchingAnimationPattern) =>
  ({
    type: UPDATINGSTRINGMATCHINGANIMATIONPATTERNSTATE,
    stringMatchingAnimationPattern: stringMatchingAnimationPattern,
  } as const);

const UPDATINGSTRINGMATCHINGPATTERNLENGTHSTATE = 'UpdatingStringMatchingPatternLengthState';
export const updatingStringMatchingPatternLengthState = (stringMatchingPatternLength = initialStringMatchingPageState.stringMatchingPatternLength) =>
  ({
    type: UPDATINGSTRINGMATCHINGPATTERNLENGTHSTATE,
    stringMatchingPatternLength: stringMatchingPatternLength,
  } as const);

const UPDATINGISPATTERNLENGTHOVERMAXSTATE = 'UpdatingIsPatternLengthOverMaxState';
export const updatingIsPatternLengthOverMaxState = (isPatternLengthOverMax = initialStringMatchingPageState.isPatternLengthOverMax) =>
  ({
    type: UPDATINGISPATTERNLENGTHOVERMAXSTATE,
    isPatternLengthOverMax: isPatternLengthOverMax,
  } as const);
//#endregion Actions

//#region Reducers
type StringMatchingPageActions =
  | ReturnType<typeof updatingSelectedSearchingAlgorithmState>
  | ReturnType<typeof updatingHasSearchingAlgorithmStartedState>
  | ReturnType<typeof updatingIsSearchingAlgorithmRunningStateAction>
  | ReturnType<typeof updatingStringMatchingInputState>
  | ReturnType<typeof updatingStringMatchingPatternState>
  | ReturnType<typeof updatingStringMatchingAnimationPatternState>
  | ReturnType<typeof updatingStringMatchingPatternLengthState>
  | ReturnType<typeof updatingIsPatternLengthOverMaxState>;
export const stringMatchingPageReducer = (state = initialStringMatchingPageState, action: StringMatchingPageActions) => {
  switch (action.type) {
    case UPDATINGISSEARCHINGALGORITHMRUNNINGSTATE:
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

    case UPDATINGSTRINGMATCHINGINPUTSTATE:
      return {
        ...state,
        stringMatchingInput: action.stringMatchingInput,
      };

    case UPDATINGSTRINGMATCHINGPATTERNSTATE:
      return {
        ...state,
        stringMatchingPattern: action.stringMatchingPattern,
      };

    case UPDATINGSTRINGMATCHINGANIMATIONPATTERNSTATE:
      return {
        ...state,
        stringMatchingAnimationPattern: action.stringMatchingAnimationPattern,
      };

    case UPDATINGSTRINGMATCHINGPATTERNLENGTHSTATE:
      return {
        ...state,
        stringMatchingPatternLength: action.stringMatchingPatternLength,
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
