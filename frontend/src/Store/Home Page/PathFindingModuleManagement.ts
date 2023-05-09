export enum CellState {
  Unselected = 0,
  Selected = 1,
  Source = 2,
  Destination = 3,
  Wall = 4,
}

const InitializeGrid = (): CellState[] => {
  let initialGrid: CellState[] = [];
  for (let i = 0; i < 56; i++) {
    initialGrid.push(CellState.Unselected);
  }
  initialGrid[5 * 8 + 1] = CellState.Source;
  initialGrid[0 * 8 + 7] = CellState.Destination;
  initialGrid[4 * 8 + 4] = CellState.Wall;
  initialGrid[5 * 8 + 4] = CellState.Wall;
  initialGrid[6 * 8 + 4] = CellState.Wall;

  return initialGrid;
};

//#region State
export interface PathFindingModuleState {
  readonly initialGrid: CellState[];
}

const initialPathFindingModuleState: PathFindingModuleState = {
  initialGrid: InitializeGrid(),
};
//#endregion State

//#region Actions
const UPDATINGPATHFINDINGMODULESTATE = 'UpdatingPathFindingModuleState';
export const updatingPathFindingModuleStateAction = (grid = initialPathFindingModuleState.initialGrid) =>
  ({
    type: UPDATINGPATHFINDINGMODULESTATE,
    grid: grid,
  } as const);

//#endregion Actions

//#region Reducers
type PathFindingModuleActions = ReturnType<typeof updatingPathFindingModuleStateAction>;
export const pathFindingModuleReducer = (state = initialPathFindingModuleState, action: PathFindingModuleActions) => {
  switch (action.type) {
    case UPDATINGPATHFINDINGMODULESTATE:
      return {
        ...state,
        initialGrid: action.grid,
      };

    default:
      return state;
  }
};
//#endregion Reducers
