import { IPathFindingCellProps } from '../../Core/Interfaces/IPathFindingCellProps';
import { PathFindingCellStateEnum } from '../../Resources/Enumerations';

//#region State
export interface PathFindingModuleState {
  readonly selectedPathFindingAlgorithm: string;
  readonly pathFindingWarningMessage: string;
  readonly pathFindingGrid: IPathFindingCellProps[][];
  readonly pathFindingSelectedCellAction: PathFindingCellStateEnum;
  readonly doesSourceExist: boolean;
  readonly doesDestinationExist: boolean;
}

const initialPathFindingModuleState: PathFindingModuleState = {
  selectedPathFindingAlgorithm: '',
  pathFindingWarningMessage: '',
  pathFindingGrid: [],
  pathFindingSelectedCellAction: PathFindingCellStateEnum.None,
  doesSourceExist: true,
  doesDestinationExist: true,
};
//#endregion State

//#region Actions
const UPDATE_SELECTED_PATH_FINDING_ALGORITHM_STATE = 'updateSelectedPathFindingAlgorithmState';
export const updateSelectedPathFindingAlgorithmState = (selectedPathFindingAlgorithm = initialPathFindingModuleState.selectedPathFindingAlgorithm) =>
  ({
    type: UPDATE_SELECTED_PATH_FINDING_ALGORITHM_STATE,
    selectedPathFindingAlgorithm: selectedPathFindingAlgorithm,
  }) as const;

const UPDATE_PATH_FINDING_WARNING_MESSAGE_STATE = 'updatePathFindingWarningMessageState';
export const updatePathFindingWarningMessageState = (pathFindingWarningMessage = initialPathFindingModuleState.pathFindingWarningMessage) =>
  ({
    type: UPDATE_PATH_FINDING_WARNING_MESSAGE_STATE,
    pathFindingWarningMessage: pathFindingWarningMessage,
  }) as const;

const UPDATE_PATH_FINDING_GRID_STATE = 'updatePathFindingGridState';
export const updatePathFindingGridState = (pathFindingGrid = initialPathFindingModuleState.pathFindingGrid) =>
  ({
    type: UPDATE_PATH_FINDING_GRID_STATE,
    pathFindingGrid: pathFindingGrid,
  }) as const;

const UPDATE_PATH_FINDING_SELECTED_CELL_ACTION_STATE = 'updatePathFindingSelectedCellActionState';
export const updatePathFindingSelectedCellActionState = (pathFindingSelectedCellAction = initialPathFindingModuleState.pathFindingSelectedCellAction) =>
  ({
    type: UPDATE_PATH_FINDING_SELECTED_CELL_ACTION_STATE,
    pathFindingSelectedCellAction: pathFindingSelectedCellAction,
  }) as const;

const UPDATE_DOES_SOURCE_EXIST_STATE = 'updateDoesSourceExistState';
export const updateDoesSourceExistState = (doesSourceExist = initialPathFindingModuleState.doesSourceExist) =>
  ({
    type: UPDATE_DOES_SOURCE_EXIST_STATE,
    doesSourceExist: doesSourceExist,
  }) as const;

const UPDATE_DOES_DESTINATION_EXIST_STATE = 'updateDoesDestinationExistState';
export const updateDoesDestinationExistState = (doesDestinationExist = initialPathFindingModuleState.doesDestinationExist) =>
  ({
    type: UPDATE_DOES_DESTINATION_EXIST_STATE,
    doesDestinationExist: doesDestinationExist,
  }) as const;

//#endregion Actions

//#region Reducers
type PathFindingModuleActions =
  | ReturnType<typeof updateSelectedPathFindingAlgorithmState>
  | ReturnType<typeof updatePathFindingWarningMessageState>
  | ReturnType<typeof updatePathFindingGridState>
  | ReturnType<typeof updatePathFindingSelectedCellActionState>
  | ReturnType<typeof updateDoesSourceExistState>
  | ReturnType<typeof updateDoesDestinationExistState>;
export const pathFindingModuleReducer = (state = initialPathFindingModuleState, action: PathFindingModuleActions) => {
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

    case UPDATE_DOES_SOURCE_EXIST_STATE:
      return {
        ...state,
        doesSourceExist: action.doesSourceExist,
      };

    case UPDATE_DOES_DESTINATION_EXIST_STATE:
      return {
        ...state,
        doesDestinationExist: action.doesDestinationExist,
      };

    default:
      return state;
  }
};
//#endregion Reducers
