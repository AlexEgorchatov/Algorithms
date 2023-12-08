import { PathFindingCellStateEnum } from '../../../Resources/Enumerations';

//#region State
export interface PathFindingModulePreviewState {
  readonly grid: PathFindingCellStateEnum[][];
}

const initialPathFindingModulePreviewState: PathFindingModulePreviewState = {
  grid: [],
};
//#endregion State

//#region Actions
const UPDATE_PATH_FINDING_MODULE_PREVIEW_GRID_STATE = 'UpdatePathFindingModulePreviewGrid';
export const updatePathFindingModulePreviewGridStateAction = (
  grid = initialPathFindingModulePreviewState.grid,
) =>
  ({
    type: UPDATE_PATH_FINDING_MODULE_PREVIEW_GRID_STATE,
    grid: grid,
  }) as const;

//#endregion Actions

//#region Reducers
type PathFindingModulePreviewActions = ReturnType<
  typeof updatePathFindingModulePreviewGridStateAction
>;
export const pathFindingModulePreviewReducer = (
  state = initialPathFindingModulePreviewState,
  action: PathFindingModulePreviewActions,
) => {
  switch (action.type) {
    case UPDATE_PATH_FINDING_MODULE_PREVIEW_GRID_STATE:
      return {
        ...state,
        grid: action.grid,
      };

    default:
      return state;
  }
};
//#endregion Reducers
