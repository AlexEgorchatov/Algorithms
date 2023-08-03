import { StringMatchingAlgorithmEnum } from '../../Resources/Algorithms/AlgorithmBase';

//#region State
export interface StringMatchingPageState {
  readonly isSearchingAlgorithmRunning: boolean;
  readonly hasSearchingAlgorithmStarted: boolean;
  readonly selectedStringMatchingAlgorithm: StringMatchingAlgorithmEnum;
  readonly stringMatchingInput: string;
  readonly stringMatchingPattern: string;
  readonly stringMatchingPatternLength: number;
}

const initialStringMatchingPageState: StringMatchingPageState = {
  isSearchingAlgorithmRunning: false,
  hasSearchingAlgorithmStarted: false,
  selectedStringMatchingAlgorithm: StringMatchingAlgorithmEnum.Naive,
  stringMatchingInput: '',
  stringMatchingPattern: '',
  stringMatchingPatternLength: 0,
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

const UPDATINGSELECTEDSTRINGMATCHINGALGORITHMSTATE = 'UpdatingSelectedStringMatchingAlgorithmState';
export const updatingSelectedStringMatchingAlgorithmState = (selectedStringMatchingAlgorithm = initialStringMatchingPageState.selectedStringMatchingAlgorithm) =>
  ({
    type: UPDATINGSELECTEDSTRINGMATCHINGALGORITHMSTATE,
    selectedStringMatchingAlgorithm: selectedStringMatchingAlgorithm,
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

const UPDATINGSTRINGMATCHINGPATTERNLENGTHSTATE = 'UpdatingStringMatchingPatternLengthState';
export const updatingStringMatchingPatternLengthState = (stringMatchingPatternLength = initialStringMatchingPageState.stringMatchingPatternLength) =>
  ({
    type: UPDATINGSTRINGMATCHINGPATTERNLENGTHSTATE,
    stringMatchingPatternLength: stringMatchingPatternLength,
  } as const);
//#endregion Actions

//#region Reducers
type StringMatchingPageActions =
  | ReturnType<typeof updatingSelectedStringMatchingAlgorithmState>
  | ReturnType<typeof updatingHasSearchingAlgorithmStartedState>
  | ReturnType<typeof updatingIsSearchingAlgorithmRunningStateAction>
  | ReturnType<typeof updatingStringMatchingInputState>
  | ReturnType<typeof updatingStringMatchingPatternState>
  | ReturnType<typeof updatingStringMatchingPatternLengthState>;
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
    case UPDATINGSELECTEDSTRINGMATCHINGALGORITHMSTATE:
      return {
        ...state,
        selectedStringMatchingAlgorithm: action.selectedStringMatchingAlgorithm,
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

    case UPDATINGSTRINGMATCHINGPATTERNLENGTHSTATE:
      return {
        ...state,
        stringMatchingPatternLength: action.stringMatchingPatternLength,
      };

    default:
      return state;
  }
};
//#endregion Reducers
