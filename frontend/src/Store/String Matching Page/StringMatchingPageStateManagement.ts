import { StringMatchingAlgorithmEnum } from '../../Resources/Algorithms/AlgorithmBase';

//#region State
export interface StringMatchingPageState {
  readonly selectedStringMatchingAlgorithm: StringMatchingAlgorithmEnum;
}

const initialStringMatchingPageState: StringMatchingPageState = {
  selectedStringMatchingAlgorithm: StringMatchingAlgorithmEnum.Naive,
};
//#endregion State

//#region Actions
const UPDATINGSELECTEDSTRINGMATCHINGALGORITHMSTATE = 'UpdatingSelectedStringMatchingAlgorithmState';
export const updatingSelectedStringMatchingAlgorithmState = (
  selectedStringMatchingAlgorithm = initialStringMatchingPageState.selectedStringMatchingAlgorithm,
) =>
  ({
    type: UPDATINGSELECTEDSTRINGMATCHINGALGORITHMSTATE,
    selectedStringMatchingAlgorithm: selectedStringMatchingAlgorithm,
  } as const);

//#endregion Actions

//#region Reducers
type StringMatchingPageActions = ReturnType<typeof updatingSelectedStringMatchingAlgorithmState>;
export const stringMatchingPageReducer = (state = initialStringMatchingPageState, action: StringMatchingPageActions) => {
  switch (action.type) {
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
