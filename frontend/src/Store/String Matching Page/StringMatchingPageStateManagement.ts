import { StringMatchingAlgorithmEnum } from '../../Resources/Algorithms/AlgorithmBase';

//#region State
export interface StringMatchingPageState {
  readonly isSearchingAlgorithmRunning: boolean;
  readonly hasSearchingAlgorithmStarted: boolean;
  readonly selectedStringMatchingAlgorithm: StringMatchingAlgorithmEnum;
}

const initialStringMatchingPageState: StringMatchingPageState = {
  isSearchingAlgorithmRunning: false,
  hasSearchingAlgorithmStarted: false,
  selectedStringMatchingAlgorithm: StringMatchingAlgorithmEnum.Naive,
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
//#endregion Actions

//#region Reducers
type StringMatchingPageActions =
  | ReturnType<typeof updatingSelectedStringMatchingAlgorithmState>
  | ReturnType<typeof updatingHasSearchingAlgorithmStartedState>
  | ReturnType<typeof updatingIsSearchingAlgorithmRunningStateAction>;
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

    default:
      return state;
  }
};
//#endregion Reducers
