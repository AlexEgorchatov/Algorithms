import { CellStateEnum } from '../../Resources/Enumerations';

const InitializeGrid = (): CellStateEnum[] => {
  let pathFindingModuleGrid: CellStateEnum[] = [];
  for (let i = 0; i < 56; i++) {
    pathFindingModuleGrid.push(CellStateEnum.Unselected);
  }
  pathFindingModuleGrid[5 * 8 + 1] = CellStateEnum.Source;
  pathFindingModuleGrid[0 * 8 + 7] = CellStateEnum.Destination;
  pathFindingModuleGrid[4 * 8 + 4] = CellStateEnum.Wall;
  pathFindingModuleGrid[5 * 8 + 4] = CellStateEnum.Wall;
  pathFindingModuleGrid[6 * 8 + 4] = CellStateEnum.Wall;

  return pathFindingModuleGrid;
};

//#region State
export interface PathFindingModulePreviewState {
  readonly pathFindingModuleGrid: CellStateEnum[];
}

const initialPathFindingModuleState: PathFindingModulePreviewState = {
  pathFindingModuleGrid: InitializeGrid(),
};
//#endregion State

//#region Actions
const UPDATE_PATH_FINDING_MODULE_STATE = 'UpdatePathFindingModuleState';
export const updatePathFindingModuleStateAction = (pathFindingModuleGrid = initialPathFindingModuleState.pathFindingModuleGrid) =>
  ({
    type: UPDATE_PATH_FINDING_MODULE_STATE,
    pathFindingModuleGrid: pathFindingModuleGrid,
  } as const);

//#endregion Actions

//#region Reducers
type PathFindingModuleActions = ReturnType<typeof updatePathFindingModuleStateAction>;
export const pathFindingModuleReducer = (state = initialPathFindingModuleState, action: PathFindingModuleActions) => {
  switch (action.type) {
    case UPDATE_PATH_FINDING_MODULE_STATE:
      return {
        ...state,
        pathFindingModuleGrid: action.pathFindingModuleGrid,
      };

    default:
      return state;
  }
};
//#endregion Reducers
