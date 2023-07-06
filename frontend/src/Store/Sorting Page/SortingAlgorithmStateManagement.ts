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
  readonly sortingGenerateInput: string;
  readonly isAlgorithmRunning: boolean;
  readonly sortingBars: SortingBarProps[];
}

const initialSortingModuleState: SortingAlgorithmState = {
  sortingAlgorithm: SortingEnumeration.BubbleSort,
  sortingInput: '',
  sortingGenerateInput: '10',
  isAlgorithmRunning: false,
  sortingBars: [],
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

const UPDATINGSORTINGGENERATEINPUTSTATE = 'UpdatingSortingGenerateInputState';
export const updatingSortingGenerateInputStateAction = (sortingGenerateInput = initialSortingModuleState.sortingGenerateInput) =>
  ({
    type: UPDATINGSORTINGGENERATEINPUTSTATE,
    sortingGenerateInput: sortingGenerateInput,
  } as const);

const UPDATINGISALGORITHMRUNNINGSTATE = 'UpdatingIsAlgorithmRunningState';
export const updatingIsAlgorithmRunningStateAction = (isAlgorithmRunning = initialSortingModuleState.isAlgorithmRunning) =>
  ({
    type: UPDATINGISALGORITHMRUNNINGSTATE,
    isAlgorithmRunning: isAlgorithmRunning,
  } as const);

const UPDATINGSORTINGHEIGHTSSTATE = 'UpdatingSortingHeightsState';
export const updatingSortingBarsStateAction = (bars = initialSortingModuleState.sortingBars) =>
  ({
    type: UPDATINGSORTINGHEIGHTSSTATE,
    bars: bars,
  } as const);

//#endregion Actions

//#region Reducers
type SortingAlgorithmActions =
  | ReturnType<typeof updatingSortingAlgorithmStateAction>
  | ReturnType<typeof updatingSortingInputStateAction>
  | ReturnType<typeof updatingSortingGenerateInputStateAction>
  | ReturnType<typeof updatingIsAlgorithmRunningStateAction>
  | ReturnType<typeof updatingSortingBarsStateAction>;
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

    case UPDATINGSORTINGGENERATEINPUTSTATE:
      return {
        ...state,
        sortingGenerateInput: action.sortingGenerateInput,
      };

    case UPDATINGISALGORITHMRUNNINGSTATE:
      return {
        ...state,
        isAlgorithmRunning: action.isAlgorithmRunning,
      };

    case UPDATINGSORTINGHEIGHTSSTATE:
      return {
        ...state,
        sortingBars: action.bars,
      };

    default:
      return state;
  }
};
//#endregion Reducers
