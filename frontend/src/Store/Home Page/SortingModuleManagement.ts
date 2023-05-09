//#region State
export interface SortingModuleState {
  readonly initialHeights: number[];
}

const initialSortingModuleState: SortingModuleState = {
  initialHeights: [180, 100, 120, 140, 160],
};
//#endregion State

//#region Actions
const UPDATINGSORTINGMODULESTATE = 'UpdatingSortingModuleState';
export const updatingSortingModuleStateAction = (heights = initialSortingModuleState.initialHeights) =>
  ({
    type: UPDATINGSORTINGMODULESTATE,
    heights: heights,
  } as const);

//#endregion Actions

//#region Reducers
type SortingModuleActions = ReturnType<typeof updatingSortingModuleStateAction>;
export const sortingModuleReducer = (state = initialSortingModuleState, action: SortingModuleActions) => {
  switch (action.type) {
    case UPDATINGSORTINGMODULESTATE:
      return {
        ...state,
        initialHeights: action.heights,
      };

    default:
      return state;
  }
};
//#endregion Reducers
