import { SortingEnumeration } from '../../Resources/Sorting Page Resources/SortingData';

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
export interface SortingAlgorithmState {
  readonly sortingAlgorithm: SortingEnumeration;
  readonly sortingInput: string;
  readonly isAlgorithmRunning: boolean;
  readonly hasAlgorithmStarted: boolean;
  readonly sortingBars: SortingBarProps[];
  readonly initialSortingBars: SortingBarProps[];
}

const initialSortingModuleState: SortingAlgorithmState = {
  sortingAlgorithm: SortingEnumeration.BubbleSort,
  sortingInput: '',
  isAlgorithmRunning: false,
  hasAlgorithmStarted: false,
  sortingBars: [],
  initialSortingBars: [],
};
//#endregion State

//#region Actions
const UPDATINGSORTINGALGORITHMSTATE = 'UpdatingSortingAlgorithmState';
export const updatingSortingAlgorithmStateAction = (algorithm = initialSortingModuleState.sortingAlgorithm) =>
  ({
    type: UPDATINGSORTINGALGORITHMSTATE,
    algorithm: algorithm,
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

const UPDATINGINITIALSORTINGBARSSTATE = 'UpdatingInitialSortingBarsState';
export const updatingInitialSortingBarsStateAction = (initialSortingBars = initialSortingModuleState.sortingBars) =>
  ({
    type: UPDATINGINITIALSORTINGBARSSTATE,
    initialSortingBars: initialSortingBars,
  } as const);

//#endregion Actions

//#region Reducers
type SortingAlgorithmActions =
  | ReturnType<typeof updatingSortingAlgorithmStateAction>
  | ReturnType<typeof updatingSortingInputStateAction>
  | ReturnType<typeof updatingIsAlgorithmRunningStateAction>
  | ReturnType<typeof updatingHasAlgorithmStartedState>
  | ReturnType<typeof updatingSortingBarsStateAction>
  | ReturnType<typeof updatingInitialSortingBarsStateAction>;
export const sortingAlgorithmReducer = (state = initialSortingModuleState, action: SortingAlgorithmActions) => {
  switch (action.type) {
    case UPDATINGSORTINGALGORITHMSTATE:
      return {
        ...state,
        sortingAlgorithm: action.algorithm,
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

    case UPDATINGINITIALSORTINGBARSSTATE:
      return {
        ...state,
        initialSortingBars: action.initialSortingBars,
      };

    default:
      return state;
  }
};
//#endregion Reducers
