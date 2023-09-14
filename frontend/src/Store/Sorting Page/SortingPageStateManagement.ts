import { SortingBarProps } from '../../Pages/SortingPage';
import { SortingAlgorithmEnum } from '../../Resources/Algorithms/AlgorithmBase';

//#region State
export interface SortingPageState {
  readonly selectedSortingAlgorithm: SortingAlgorithmEnum;
  readonly sortingInput: string;
  readonly isInputNan: boolean;
  readonly isInputOverMax: boolean;
  readonly isStateUpdated: boolean;
  readonly sortingBars: SortingBarProps[];
}

const initialSortingPageState: SortingPageState = {
  selectedSortingAlgorithm: SortingAlgorithmEnum.BubbleSort,
  sortingInput: '',
  isInputNan: false,
  isInputOverMax: false,
  isStateUpdated: false,
  sortingBars: [],
};
//#endregion State

//#region Actions
const UPDATE_SELECTED_SORTING_ALGORITHM_STATE = 'updateSelectedSortingAlgorithmState';
export const updateSelectedSortingAlgorithmState = (selectedSortingAlgorithm = initialSortingPageState.selectedSortingAlgorithm) =>
  ({
    type: UPDATE_SELECTED_SORTING_ALGORITHM_STATE,
    selectedSortingAlgorithm: selectedSortingAlgorithm,
  } as const);

const UPDATE_SORTING_INPUT_STATE = 'updateSortingInputState';
export const updateSortingInputStateAction = (sortingInput = initialSortingPageState.sortingInput) =>
  ({
    type: UPDATE_SORTING_INPUT_STATE,
    sortingInput: sortingInput,
  } as const);

const UPDATE_IS_INPUT_NAN_STATE = 'updatingIsInputNanState';
export const updatingIsInputNanState = (isInputNan = initialSortingPageState.isInputNan) =>
  ({
    type: UPDATE_IS_INPUT_NAN_STATE,
    isInputNan: isInputNan,
  } as const);

const UPDATE_IS_INPUT_OVER_MAX_STATE = 'updateIsInputOverMaxState';
export const updateIsInputOverMaxState = (isInputOverMax = initialSortingPageState.isInputOverMax) =>
  ({
    type: UPDATE_IS_INPUT_OVER_MAX_STATE,
    isInputOverMax: isInputOverMax,
  } as const);

const UPDATE_IS_STATE_UPDATED_STATE = 'updateIsStateUpdatedState';
export const updateIsStateUpdatedState = (isStateUpdated = initialSortingPageState.isStateUpdated) =>
  ({
    type: UPDATE_IS_STATE_UPDATED_STATE,
    isStateUpdated: isStateUpdated,
  } as const);

const UPDATE_SORTING_BARS_STATE = 'updateSortingBarsState';
export const updateSortingBarsStateAction = (sortingBars = initialSortingPageState.sortingBars) =>
  ({
    type: UPDATE_SORTING_BARS_STATE,
    sortingBars: sortingBars,
  } as const);

//#endregion Actions

//#region Reducers
type SortingPageActions =
  | ReturnType<typeof updateSelectedSortingAlgorithmState>
  | ReturnType<typeof updateSortingInputStateAction>
  | ReturnType<typeof updatingIsInputNanState>
  | ReturnType<typeof updateIsInputOverMaxState>
  | ReturnType<typeof updateIsStateUpdatedState>
  | ReturnType<typeof updateSortingBarsStateAction>;
export const sortingPageReducer = (state = initialSortingPageState, action: SortingPageActions) => {
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

    case UPDATE_IS_STATE_UPDATED_STATE:
      return {
        ...state,
        isStateUpdated: action.isStateUpdated,
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
