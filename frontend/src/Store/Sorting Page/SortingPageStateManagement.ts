import { SortingAlgorithmTypeEnum } from '../../Resources/Algorithms/AlgorithmBase';

export enum SortingBarStateEnum {
  Unselected = 0,
  Selected = 1,
}

export interface SortingBarProps {
  barID: number;
  barHeight: number;
  barState?: SortingBarStateEnum;
  leftOffset?: number;
}

//#region State
export interface SortingPageState {
  selectedSortingAlgorithmType: SortingAlgorithmTypeEnum;
  readonly sortingInput: string;
  readonly isAlgorithmRunning: boolean;
  readonly hasAlgorithmStarted: boolean;
  readonly sortingBars: SortingBarProps[];
}

const initialSortingModuleState: SortingPageState = {
  selectedSortingAlgorithmType: SortingAlgorithmTypeEnum.BubbleSort,
  sortingInput: '',
  isAlgorithmRunning: false,
  hasAlgorithmStarted: false,
  sortingBars: [],
};
//#endregion State

//#region Actions

const UPDATINGSELECTEDSORTINGALGORITHMSTATE = 'UpdatingSelectedSortingAlgorithmState';
export const updatingSelectedSortingAlgorithmState = (selectedSortingAlgorithmType = initialSortingModuleState.selectedSortingAlgorithmType) =>
  ({
    type: UPDATINGSELECTEDSORTINGALGORITHMSTATE,
    selectedSortingAlgorithmType: selectedSortingAlgorithmType,
  } as const);

const UPDATINGSORTINGINPUTSTATE = 'UpdatingSortingInputState';
export const updatingSortingInputStateAction = (sortingInput = initialSortingModuleState.sortingInput) =>
  ({
    type: UPDATINGSORTINGINPUTSTATE,
    sortingInput: sortingInput,
  } as const);

const UPDATINGISALGORITHMRUNNINGSTATE = 'UpdatingIsAlgorithmRunningState';
export const updatingIsAlgorithmRunningStateAction = (isAlgorithmRunning = initialSortingModuleState.isAlgorithmRunning) =>
  ({
    type: UPDATINGISALGORITHMRUNNINGSTATE,
    isAlgorithmRunning: isAlgorithmRunning,
  } as const);

const UPDATINGHASALGORITHMSTARTEDSTATE = 'UpdatingHasAlgorithmStartedState';
export const updatingHasAlgorithmStartedState = (hasAlgorithmStarted = initialSortingModuleState.hasAlgorithmStarted) =>
  ({
    type: UPDATINGHASALGORITHMSTARTEDSTATE,
    hasAlgorithmStarted: hasAlgorithmStarted,
  } as const);

const UPDATINGSORTINGBARSSTATE = 'UpdatingSortingBarsState';
export const updatingSortingBarsStateAction = (sortingBars = initialSortingModuleState.sortingBars) =>
  ({
    type: UPDATINGSORTINGBARSSTATE,
    sortingBars: sortingBars,
  } as const);

//#endregion Actions

//#region Reducers
type SortingAlgorithmActions =
  | ReturnType<typeof updatingSelectedSortingAlgorithmState>
  | ReturnType<typeof updatingSortingInputStateAction>
  | ReturnType<typeof updatingIsAlgorithmRunningStateAction>
  | ReturnType<typeof updatingHasAlgorithmStartedState>
  | ReturnType<typeof updatingSortingBarsStateAction>;
export const sortingAlgorithmReducer = (state = initialSortingModuleState, action: SortingAlgorithmActions) => {
  switch (action.type) {
    case UPDATINGSELECTEDSORTINGALGORITHMSTATE:
      return {
        ...state,
        selectedSortingAlgorithmType: action.selectedSortingAlgorithmType,
      };

    case UPDATINGSORTINGINPUTSTATE:
      return {
        ...state,
        sortingInput: action.sortingInput,
      };

    case UPDATINGISALGORITHMRUNNINGSTATE:
      return {
        ...state,
        isAlgorithmRunning: action.isAlgorithmRunning,
      };

    case UPDATINGHASALGORITHMSTARTEDSTATE:
      return {
        ...state,
        hasAlgorithmStarted: action.hasAlgorithmStarted,
      };

    case UPDATINGSORTINGBARSSTATE:
      return {
        ...state,
        sortingBars: action.sortingBars,
      };

    default:
      return state;
  }
};
//#endregion Reducers
