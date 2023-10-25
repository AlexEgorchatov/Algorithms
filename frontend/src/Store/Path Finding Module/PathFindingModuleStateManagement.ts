import { IPathFindingCellProps } from '../../Core/Interfaces/IPathFindingCellProps';
import { IStoreModule } from '../../Core/Interfaces/IStoreModule';

//#region State
export interface PathFindingModuleState extends IStoreModule {
  readonly selectedPathFindingAlgorithm: string;
  readonly pathFindingGrid: IPathFindingCellProps[][];
}

const initialPathFindingModuleState: PathFindingModuleState = {
  selectedPathFindingAlgorithm: '',
  pathFindingGrid: [],
};
//#endregion State

//#region Actions
const UPDATE_SELECTED_PATH_FINDING_ALGORITHM_STATE = 'updateSelectedPathFindingAlgorithmState';
export const updateSelectedPathFindingAlgorithmState = (selectedPathFindingAlgorithm = initialPathFindingModuleState.selectedPathFindingAlgorithm) =>
  ({
    type: UPDATE_SELECTED_PATH_FINDING_ALGORITHM_STATE,
    selectedPathFindingAlgorithm: selectedPathFindingAlgorithm,
  } as const);

const UPDATE_PATH_FINDING_GRID_STATE = 'updatePathFindingGridState';
export const updatePathFindingGridState = (pathFindingGrid = initialPathFindingModuleState.pathFindingGrid) =>
  ({
    type: UPDATE_PATH_FINDING_GRID_STATE,
    pathFindingGrid: pathFindingGrid,
  } as const);

//#endregion Actions

//#region Reducers
type PathFindingModuleActions = ReturnType<typeof updateSelectedPathFindingAlgorithmState> | ReturnType<typeof updatePathFindingGridState>;
export const pathFindingModuleReducer = (state = initialPathFindingModuleState, action: PathFindingModuleActions) => {
  switch (action.type) {
    case UPDATE_SELECTED_PATH_FINDING_ALGORITHM_STATE:
      return {
        ...state,
        selectedPathFindingAlgorithm: action.selectedPathFindingAlgorithm,
      };

    case UPDATE_PATH_FINDING_GRID_STATE:
      return {
        ...state,
        pathFindingGrid: action.pathFindingGrid,
      };

    default:
      return state;
  }
};
//#endregion Reducers
