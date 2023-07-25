import { SortingAlgorithmEnum } from '../../Resources/Algorithms/AlgorithmBase';

export enum SortingBarStateEnum {
  Unselected = 0,
  Selected = 1,
  Pivot = 2,
  Completed = 999,
}

export interface SortingBarProps {
  barHeight: number;
  barID?: number;
  barState?: SortingBarStateEnum;
  leftOffset?: number;
}

//#region State
export interface SortingPageState {
  readonly selectedSortingAlgorithmType: SortingAlgorithmEnum;
  readonly sortingInput: string;
  readonly isSortingAlgorithmRunning: boolean;
  readonly hasSortingAlgorithmStarted: boolean;
  readonly isInputNan: boolean;
  readonly isInputOverMax: boolean;
  readonly sortingBars: SortingBarProps[];
}

const initialSortingPageState: SortingPageState = {
  selectedSortingAlgorithmType: SortingAlgorithmEnum.BubbleSort,
  sortingInput: '',
  isSortingAlgorithmRunning: false,
  hasSortingAlgorithmStarted: false,
  isInputNan: false,
  isInputOverMax: false,
  sortingBars: [],
};
//#endregion State

//#region Actions
const UPDATINGSELECTEDSORTINGALGORITHMSTATE = 'UpdatingSelectedSortingAlgorithmState';
export const updatingSelectedSortingAlgorithmState = (selectedSortingAlgorithmType = initialSortingPageState.selectedSortingAlgorithmType) =>
  ({
    type: UPDATINGSELECTEDSORTINGALGORITHMSTATE,
    selectedSortingAlgorithmType: selectedSortingAlgorithmType,
  } as const);

const UPDATINGSORTINGINPUTSTATE = 'UpdatingSortingInputState';
export const updatingSortingInputStateAction = (sortingInput = initialSortingPageState.sortingInput) =>
  ({
    type: UPDATINGSORTINGINPUTSTATE,
    sortingInput: sortingInput,
  } as const);

const UPDATINGISSORTINGALGORITHMRUNNINGSTATE = 'UpdatingIsSortingAlgorithmRunningState';
export const updatingIsSortingAlgorithmRunningStateAction = (isSortingAlgorithmRunning = initialSortingPageState.isSortingAlgorithmRunning) =>
  ({
    type: UPDATINGISSORTINGALGORITHMRUNNINGSTATE,
    isSortingAlgorithmRunning: isSortingAlgorithmRunning,
  } as const);

const UPDATINGHASSORTINGALGORITHMSTARTEDSTATE = 'UpdatingHasSortingAlgorithmStartedState';
export const updatingHasSortingAlgorithmStartedState = (hasSortingAlgorithmStarted = initialSortingPageState.hasSortingAlgorithmStarted) =>
  ({
    type: UPDATINGHASSORTINGALGORITHMSTARTEDSTATE,
    hasSortingAlgorithmStarted: hasSortingAlgorithmStarted,
  } as const);

const UPDATINGISINPUTNANSTATE = 'UpdatingIsInputNanState';
export const updatingIsInputNanState = (isInputNan = initialSortingPageState.isInputNan) =>
  ({
    type: UPDATINGISINPUTNANSTATE,
    isInputNan: isInputNan,
  } as const);

const UPDATINGISINPUTOVERMAXSTATE = 'UpdatingIsInputOverMaxState';
export const updatingIsInputOverMaxState = (isInputOverMax = initialSortingPageState.isInputOverMax) =>
  ({
    type: UPDATINGISINPUTOVERMAXSTATE,
    isInputOverMax: isInputOverMax,
  } as const);

const UPDATINGSORTINGBARSSTATE = 'UpdatingSortingBarsState';
export const updatingSortingBarsStateAction = (sortingBars = initialSortingPageState.sortingBars) =>
  ({
    type: UPDATINGSORTINGBARSSTATE,
    sortingBars: sortingBars,
  } as const);

//#endregion Actions

//#region Reducers
type SortingPageActions =
  | ReturnType<typeof updatingSelectedSortingAlgorithmState>
  | ReturnType<typeof updatingSortingInputStateAction>
  | ReturnType<typeof updatingIsSortingAlgorithmRunningStateAction>
  | ReturnType<typeof updatingHasSortingAlgorithmStartedState>
  | ReturnType<typeof updatingIsInputNanState>
  | ReturnType<typeof updatingIsInputOverMaxState>
  | ReturnType<typeof updatingSortingBarsStateAction>;
export const sortingPageReducer = (state = initialSortingPageState, action: SortingPageActions) => {
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

    case UPDATINGISSORTINGALGORITHMRUNNINGSTATE:
      return {
        ...state,
        isSortingAlgorithmRunning: action.isSortingAlgorithmRunning,
      };

    case UPDATINGHASSORTINGALGORITHMSTARTEDSTATE:
      return {
        ...state,
        hasSortingAlgorithmStarted: action.hasSortingAlgorithmStarted,
      };

    case UPDATINGISINPUTNANSTATE:
      return {
        ...state,
        isInputNan: action.isInputNan,
      };

    case UPDATINGISINPUTOVERMAXSTATE:
      return {
        ...state,
        isInputOverMax: action.isInputOverMax,
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
