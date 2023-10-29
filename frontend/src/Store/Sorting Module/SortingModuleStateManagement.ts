import { ISortingBarProps } from '../../Core/Interfaces/ISortingBarProps';

//#region State
export interface SortingModuleState {
  readonly selectedSortingAlgorithm: string;
  readonly sortingInput: string;
  readonly isInputNan: boolean;
  readonly isInputOverMax: boolean;
  readonly sortingBars: ISortingBarProps[];
}

const initialSortingModuleState: SortingModuleState = {
  selectedSortingAlgorithm: '',
  sortingInput: '',
  isInputNan: false,
  isInputOverMax: false,
  sortingBars: [],
};
//#endregion State

//#region Actions
const UPDATE_SELECTED_SORTING_ALGORITHM_STATE = 'updateSelectedSortingAlgorithmState';
export const updateSelectedSortingAlgorithmState = (selectedSortingAlgorithm = initialSortingModuleState.selectedSortingAlgorithm) =>
  ({
    type: UPDATE_SELECTED_SORTING_ALGORITHM_STATE,
    selectedSortingAlgorithm: selectedSortingAlgorithm,
  }) as const;

const UPDATE_SORTING_INPUT_STATE = 'updateSortingInputState';
export const updateSortingInputStateAction = (sortingInput = initialSortingModuleState.sortingInput) =>
  ({
    type: UPDATE_SORTING_INPUT_STATE,
    sortingInput: sortingInput,
  }) as const;

const UPDATE_IS_INPUT_NAN_STATE = 'updatingIsInputNanState';
export const updatingIsInputNanState = (isInputNan = initialSortingModuleState.isInputNan) =>
  ({
    type: UPDATE_IS_INPUT_NAN_STATE,
    isInputNan: isInputNan,
  }) as const;

const UPDATE_IS_INPUT_OVER_MAX_STATE = 'updateIsInputOverMaxState';
export const updateIsInputOverMaxState = (isInputOverMax = initialSortingModuleState.isInputOverMax) =>
  ({
    type: UPDATE_IS_INPUT_OVER_MAX_STATE,
    isInputOverMax: isInputOverMax,
  }) as const;

const UPDATE_SORTING_BARS_STATE = 'updateSortingBarsState';
export const updateSortingBarsStateAction = (sortingBars = initialSortingModuleState.sortingBars) =>
  ({
    type: UPDATE_SORTING_BARS_STATE,
    sortingBars: sortingBars,
  }) as const;

//#endregion Actions

//#region Reducers
type SortingModuleActions =
  | ReturnType<typeof updateSelectedSortingAlgorithmState>
  | ReturnType<typeof updateSortingInputStateAction>
  | ReturnType<typeof updatingIsInputNanState>
  | ReturnType<typeof updateIsInputOverMaxState>
  | ReturnType<typeof updateSortingBarsStateAction>;
export const sortingModuleReducer = (state = initialSortingModuleState, action: SortingModuleActions) => {
  switch (action.type) {
    case UPDATE_SELECTED_SORTING_ALGORITHM_STATE:
      return {
        ...state,
        selectedSortingAlgorithm: action.selectedSortingAlgorithm,
      };

    case UPDATE_SORTING_INPUT_STATE:
      return {
        ...state,
        sortingInput: action.sortingInput,
      };

    case UPDATE_IS_INPUT_NAN_STATE:
      return {
        ...state,
        isInputNan: action.isInputNan,
      };

    case UPDATE_IS_INPUT_OVER_MAX_STATE:
      return {
        ...state,
        isInputOverMax: action.isInputOverMax,
      };

    case UPDATE_SORTING_BARS_STATE:
      return {
        ...state,
        sortingBars: action.sortingBars,
      };

    default:
      return state;
  }
};
//#endregion Reducers
