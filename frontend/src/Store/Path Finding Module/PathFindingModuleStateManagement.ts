import { IStoreModule } from '../../Core/Interfaces/IStoreModule';

//#region State
export interface PathFindingModuleState extends IStoreModule {
  readonly selectedPathFindingAlgorithm: string;
}

const initialPathFindingModuleState: PathFindingModuleState = {
  selectedPathFindingAlgorithm: '',
};
//#endregion State

//#region Actions
const UPDATE_SELECTED_PATH_FINDING_ALGORITHM_STATE = 'updateSelectedPathFindingAlgorithmState';
export const updateSelectedPathFindingAlgorithmState = (selectedPathFindingAlgorithm = initialPathFindingModuleState.selectedPathFindingAlgorithm) =>
  ({
    type: UPDATE_SELECTED_PATH_FINDING_ALGORITHM_STATE,
    selectedPathFindingAlgorithm: selectedPathFindingAlgorithm,
  } as const);

//#endregion Actions

//#region Reducers
type PathFindingModuleActions = ReturnType<typeof updateSelectedPathFindingAlgorithmState>;
export const pathFindingModuleReducer = (state = initialPathFindingModuleState, action: PathFindingModuleActions) => {
  switch (action.type) {
    case UPDATE_SELECTED_PATH_FINDING_ALGORITHM_STATE:
      return {
        ...state,
        selectedPathFindingAlgorithm: action.selectedPathFindingAlgorithm,
      };

    default:
      return state;
  }
};
//#endregion Reducers
