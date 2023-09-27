//#region State
export interface SortingModulePreviewState {
  readonly heights: number[];
}

const initialSortingModulePreviewState: SortingModulePreviewState = {
  heights: [180, 100, 120, 140, 160],
};
//#endregion State

//#region Actions
const UPDATE_SORTING_MODULE_PREVIEW_HEIGHTS_STATE = 'updateSortingModuleHeightsState';
export const updateSortingModulePreviewHeightsStateAction = (heights = initialSortingModulePreviewState.heights) =>
  ({
    type: UPDATE_SORTING_MODULE_PREVIEW_HEIGHTS_STATE,
    heights: heights,
  } as const);

//#endregion Actions

//#region Reducers
type SortingModulePreviewActions = ReturnType<typeof updateSortingModulePreviewHeightsStateAction>;
export const sortingModulePreviewReducer = (state = initialSortingModulePreviewState, action: SortingModulePreviewActions) => {
  switch (action.type) {
    case UPDATE_SORTING_MODULE_PREVIEW_HEIGHTS_STATE:
      return {
        ...state,
        heights: action.heights,
      };

    default:
      return state;
  }
};
//#endregion Reducers
