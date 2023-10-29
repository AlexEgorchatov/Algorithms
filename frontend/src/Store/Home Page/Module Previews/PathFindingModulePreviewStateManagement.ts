import { PathFindingCellStateEnum } from '../../../Resources/Enumerations';

const InitializeGrid = (): PathFindingCellStateEnum[] => {
  let pathFindingModuleGrid: PathFindingCellStateEnum[] = [];
  for (let i = 0; i < 56; i++) {
    pathFindingModuleGrid.push(PathFindingCellStateEnum.Unselected);
  }
  pathFindingModuleGrid[5 * 8 + 1] = PathFindingCellStateEnum.Source;
  pathFindingModuleGrid[0 * 8 + 7] = PathFindingCellStateEnum.Destination;
  pathFindingModuleGrid[4 * 8 + 4] = PathFindingCellStateEnum.Wall;
  pathFindingModuleGrid[5 * 8 + 4] = PathFindingCellStateEnum.Wall;
  pathFindingModuleGrid[6 * 8 + 4] = PathFindingCellStateEnum.Wall;

  return pathFindingModuleGrid;
};

//#region State
export interface PathFindingModulePreviewState {
  readonly grid: PathFindingCellStateEnum[];
}

const initialPathFindingModulePreviewState: PathFindingModulePreviewState = {
  grid: InitializeGrid(),
};
//#endregion State

//#region Actions
const UPDATE_PATH_FINDING_MODULE_PREVIEW_GRID_STATE = 'UpdatePathFindingModulePreviewGrid';
export const updatePathFindingModulePreviewGridStateAction = (grid = initialPathFindingModulePreviewState.grid) =>
  ({
    type: UPDATE_PATH_FINDING_MODULE_PREVIEW_GRID_STATE,
    grid: grid,
  }) as const;

//#endregion Actions

//#region Reducers
type PathFindingModulePreviewActions = ReturnType<typeof updatePathFindingModulePreviewGridStateAction>;
export const pathFindingModulePreviewReducer = (state = initialPathFindingModulePreviewState, action: PathFindingModulePreviewActions) => {
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
