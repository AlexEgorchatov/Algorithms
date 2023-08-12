export enum CellState {
  Unselected = 0,
  Selected = 1,
  Source = 2,
  Destination = 3,
  Wall = 4,
}

const InitializeGrid = (): CellState[] => {
  let pathFindingModuleGrid: CellState[] = [];
  for (let i = 0; i < 56; i++) {
    pathFindingModuleGrid.push(CellState.Unselected);
  }
  pathFindingModuleGrid[5 * 8 + 1] = CellState.Source;
  pathFindingModuleGrid[0 * 8 + 7] = CellState.Destination;
  pathFindingModuleGrid[4 * 8 + 4] = CellState.Wall;
  pathFindingModuleGrid[5 * 8 + 4] = CellState.Wall;
  pathFindingModuleGrid[6 * 8 + 4] = CellState.Wall;

  return pathFindingModuleGrid;
};

//#region State
export interface PathFindingModuleState {
  readonly pathFindingModuleGrid: CellState[];
}

const initialPathFindingModuleState: PathFindingModuleState = {
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
