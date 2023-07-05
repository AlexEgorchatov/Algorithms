import { SortingEnumeration } from '../../Resources/Sorting Page Resources/SortingData';

export enum SortingBarState {
  Unselected = 0,
  Selected = 1,
}

export interface SortingBarProps {
  barID: number;
  barHeight: number;
  barState?: SortingBarState;
  leftOffset?: number;
}

//#region State
export interface SortingAlgorithmState {
  readonly initialSortingAlgorithm: SortingEnumeration;
  readonly initialSortingInput: string;
  readonly initialSortingGenerateInput: string;
  readonly initialSortingBars: SortingBarProps[];
}

const initialSortingModuleState: SortingAlgorithmState = {
  initialSortingAlgorithm: SortingEnumeration.BubbleSort,
  initialSortingInput: '',
  initialSortingGenerateInput: '10',
  initialSortingBars: [],
};
//#endregion State

//#region Actions
const UPDATINGSORTINGALGORITHMSTATE = 'UpdatingSortingAlgorithmState';
export const updatingSortingAlgorithmStateAction = (algorithm = initialSortingModuleState.initialSortingAlgorithm) =>
  ({
    type: UPDATINGSORTINGALGORITHMSTATE,
    algorithm: algorithm,
  } as const);

const UPDATINGSORTINGINPUTSTATE = 'UpdatingSortingInputState';
export const updatingSortingInputStateAction = (sortingInput = initialSortingModuleState.initialSortingInput) =>
  ({
    type: UPDATINGSORTINGINPUTSTATE,
    sortingInput: sortingInput,
  } as const);

const UPDATINGSORTINGGENERATEINPUTSTATE = 'UpdatingSortingGenerateInputState';
export const updatingSortingGenerateInputStateAction = (generateInput = initialSortingModuleState.initialSortingGenerateInput) =>
  ({
    type: UPDATINGSORTINGGENERATEINPUTSTATE,
    generateInput: generateInput,
  } as const);

const UPDATINGSORTINGHEIGHTSSTATE = 'UpdatingSortingHeightsState';
export const updatingSortingBarsStateAction = (bars = initialSortingModuleState.initialSortingBars) =>
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
  | ReturnType<typeof updatingSortingBarsStateAction>;
export const sortingAlgorithmReducer = (state = initialSortingModuleState, action: SortingAlgorithmActions) => {
  switch (action.type) {
    case UPDATINGSORTINGALGORITHMSTATE:
      return {
        ...state,
        initialSortingAlgorithm: action.algorithm,
      };

    case UPDATINGSORTINGINPUTSTATE:
      return {
        ...state,
        initialSortingInput: action.sortingInput,
      };

    case UPDATINGSORTINGGENERATEINPUTSTATE:
      return {
        ...state,
        initialSortingGenerateInput: action.generateInput,
      };

    case UPDATINGSORTINGHEIGHTSSTATE:
      return {
        ...state,
        initialSortingBars: action.bars,
      };

    default:
      return state;
  }
};
//#endregion Reducers
