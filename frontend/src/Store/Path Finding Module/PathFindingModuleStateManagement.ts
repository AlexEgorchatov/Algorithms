import { IPathFindingCellProps } from '../../Core/Interfaces/IPathFindingCellProps';
import {
  PathFindingCellActionStateEnum,
  PathFindingCellDraggingStateEnum,
  PathFindingCellStateEnum,
} from '../../Resources/Enumerations';

//#region State
export interface PathFindingModuleState {
  readonly selectedPathFindingAlgorithm: string;
  readonly pathFindingWarningMessage: string;
  readonly pathFindingGrid: IPathFindingCellProps[][];
  readonly pathFindingSelectedCellAction: PathFindingCellActionStateEnum;
  readonly pathFindingSelectedCellDragging: PathFindingCellDraggingStateEnum;
  readonly pathFindingSource: IPathFindingCellProps;
  readonly pathFindingDestination: IPathFindingCellProps;
}

const initialPathFindingModuleState: PathFindingModuleState = {
  selectedPathFindingAlgorithm: '',
  pathFindingWarningMessage: '',
  pathFindingGrid: [],
  pathFindingSelectedCellAction: PathFindingCellActionStateEnum.None,
  pathFindingSelectedCellDragging: PathFindingCellDraggingStateEnum.None,
  pathFindingSource: {
    cellState: PathFindingCellStateEnum.Unselected,
    rowIndex: 0,
    columnIndex: 0,
    distance: 0,
  },
  pathFindingDestination: {
    cellState: PathFindingCellStateEnum.Unselected,
    rowIndex: 0,
    columnIndex: 0,
    distance: 0,
  },
};
//#endregion State

//#region Actions
const UPDATE_SELECTED_PATH_FINDING_ALGORITHM_STATE = 'updateSelectedPathFindingAlgorithmState';
export const updateSelectedPathFindingAlgorithmState = (
  selectedPathFindingAlgorithm = initialPathFindingModuleState.selectedPathFindingAlgorithm,
) =>
  ({
    type: UPDATE_SELECTED_PATH_FINDING_ALGORITHM_STATE,
    selectedPathFindingAlgorithm: selectedPathFindingAlgorithm,
  }) as const;

const UPDATE_PATH_FINDING_WARNING_MESSAGE_STATE = 'updatePathFindingWarningMessageState';
export const updatePathFindingWarningMessageState = (
  pathFindingWarningMessage = initialPathFindingModuleState.pathFindingWarningMessage,
) =>
  ({
    type: UPDATE_PATH_FINDING_WARNING_MESSAGE_STATE,
    pathFindingWarningMessage: pathFindingWarningMessage,
  }) as const;

const UPDATE_PATH_FINDING_GRID_STATE = 'updatePathFindingGridState';
export const updatePathFindingGridState = (
  pathFindingGrid = initialPathFindingModuleState.pathFindingGrid,
) =>
  ({
    type: UPDATE_PATH_FINDING_GRID_STATE,
    pathFindingGrid: pathFindingGrid,
  }) as const;

const UPDATE_PATH_FINDING_SELECTED_CELL_ACTION_STATE = 'updatePathFindingSelectedCellActionState';
export const updatePathFindingSelectedCellActionState = (
  pathFindingSelectedCellAction = initialPathFindingModuleState.pathFindingSelectedCellAction,
) =>
  ({
    type: UPDATE_PATH_FINDING_SELECTED_CELL_ACTION_STATE,
    pathFindingSelectedCellAction: pathFindingSelectedCellAction,
  }) as const;

const UPDATE_PATH_FINDING_SELECTED_CELL_DRAGGING_STATE =
  'updatePathFindingSelectedCellDraggingState';
export const updatePathFindingSelectedCellDraggingState = (
  pathFindingSelectedCellDragging = initialPathFindingModuleState.pathFindingSelectedCellDragging,
) =>
  ({
    type: UPDATE_PATH_FINDING_SELECTED_CELL_DRAGGING_STATE,
    pathFindingSelectedCellDragging: pathFindingSelectedCellDragging,
  }) as const;

const UPDATE_PATH_FINDING_SOURCE_STATE = 'updatePathFindingSourceState';
export const updatePathFindingSourceState = (
  pathFindingSource = initialPathFindingModuleState.pathFindingSource,
) =>
  ({
    type: UPDATE_PATH_FINDING_SOURCE_STATE,
    pathFindingSource: pathFindingSource,
  }) as const;

const UPDATE_PATH_FINDING_DESTINATION_STATE = 'updatePathFindingDestinationState';
export const updatePathFindingDestinationState = (
  pathFindingDestination = initialPathFindingModuleState.pathFindingDestination,
) =>
  ({
    type: UPDATE_PATH_FINDING_DESTINATION_STATE,
    pathFindingDestination: pathFindingDestination,
  }) as const;

//#endregion Actions

//#region Reducers
type PathFindingModuleActions =
  | ReturnType<typeof updateSelectedPathFindingAlgorithmState>
  | ReturnType<typeof updatePathFindingWarningMessageState>
  | ReturnType<typeof updatePathFindingGridState>
  | ReturnType<typeof updatePathFindingSelectedCellActionState>
  | ReturnType<typeof updatePathFindingSelectedCellDraggingState>
  | ReturnType<typeof updatePathFindingSourceState>
  | ReturnType<typeof updatePathFindingDestinationState>;
export const pathFindingModuleReducer = (
  state = initialPathFindingModuleState,
  action: PathFindingModuleActions,
) => {
  switch (action.type) {
    case UPDATE_SELECTED_PATH_FINDING_ALGORITHM_STATE:
      return {
        ...state,
        selectedPathFindingAlgorithm: action.selectedPathFindingAlgorithm,
      };

    case UPDATE_PATH_FINDING_WARNING_MESSAGE_STATE:
      return {
        ...state,
        pathFindingWarningMessage: action.pathFindingWarningMessage,
      };

    case UPDATE_PATH_FINDING_GRID_STATE:
      return {
        ...state,
        pathFindingGrid: action.pathFindingGrid,
      };

    case UPDATE_PATH_FINDING_SELECTED_CELL_ACTION_STATE:
      return {
        ...state,
        pathFindingSelectedCellAction: action.pathFindingSelectedCellAction,
      };

    case UPDATE_PATH_FINDING_SELECTED_CELL_DRAGGING_STATE:
      return {
        ...state,
        pathFindingSelectedCellDragging: action.pathFindingSelectedCellDragging,
      };

    case UPDATE_PATH_FINDING_SOURCE_STATE:
      return {
        ...state,
        pathFindingSource: action.pathFindingSource,
      };

    case UPDATE_PATH_FINDING_DESTINATION_STATE:
      return {
        ...state,
        pathFindingDestination: action.pathFindingDestination,
      };

    default:
      return state;
  }
};
//#endregion Reducers
