import { SortingEnumeration } from '../../Resources/Sorting Page Resources/SortingData';

//#region State
export interface SortingAlgorithmState {
  readonly initialSortingAlgorithm: SortingEnumeration;
}

const initialSortingModuleState: SortingAlgorithmState = {
  initialSortingAlgorithm: SortingEnumeration.BubbleSort,
};
//#endregion State

//#region Actions
const UPDATINGSORTINGALGORITHMSTATE = 'UpdatingSortingAlgorithmState';
export const updatingSortingAlgorithmStateAction = (algorithm = initialSortingModuleState.initialSortingAlgorithm) =>
  ({
    type: UPDATINGSORTINGALGORITHMSTATE,
    algorithm: algorithm,
  } as const);

//#endregion Actions

//#region Reducers
type SortingAlgorithmActions = ReturnType<typeof updatingSortingAlgorithmStateAction>;
export const sortingAlgorithmReducer = (state = initialSortingModuleState, action: SortingAlgorithmActions) => {
  switch (action.type) {
    case UPDATINGSORTINGALGORITHMSTATE:
      return {
        ...state,
        initialSortingAlgorithm: action.algorithm,
      };

    default:
      return state;
  }
};
//#endregion Reducers
