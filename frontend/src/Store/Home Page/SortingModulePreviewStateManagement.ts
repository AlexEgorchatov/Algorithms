//#region State
export interface SortingModulePreviewState {
  readonly sortingModuleHeights: number[];
}

const initialSortingModuleState: SortingModulePreviewState = {
  sortingModuleHeights: [180, 100, 120, 140, 160],
};
//#endregion State

//#region Actions
const UPDATE_SORTING_MODULE_HEIGHTS_STATE = 'updateSortingModuleHeightsState';
export const updateSortingModuleHeightsStateAction = (sortingModuleHeights = initialSortingModuleState.sortingModuleHeights) =>
  ({
    type: UPDATE_SORTING_MODULE_HEIGHTS_STATE,
    sortingModuleHeights: sortingModuleHeights,
  } as const);

//#endregion Actions

//#region Reducers
type SortingModuleActions = ReturnType<typeof updateSortingModuleHeightsStateAction>;
export const sortingModuleReducer = (state = initialSortingModuleState, action: SortingModuleActions) => {
  switch (action.type) {
    case UPDATE_SORTING_MODULE_HEIGHTS_STATE:
      return {
        ...state,
        sortingModuleHeights: action.sortingModuleHeights,
      };

    default:
      return state;
  }
};
//#endregion Reducers
