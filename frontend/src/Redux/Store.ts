import { combineReducers, Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

// State
export interface AppState {
  readonly sortingModuleState: SortingModuleState;
}

interface SortingModuleState {
  readonly initialHeights: number[];
}

const initialSortingModuleState: SortingModuleState = {
  initialHeights: [180, 100, 120, 140, 160],
};

// Actions
export const UPDATINGSORTINGMODULESTATE = 'UpdatingSortingModuleState';
export const updatingSortingModuleStateAction = (heights: number[]) =>
  ({
    type: UPDATINGSORTINGMODULESTATE,
    heights: heights,
  } as const);

// Reducers
type SortingModuleActions = ReturnType<typeof updatingSortingModuleStateAction>;
const sortingModuleReducer = (state = initialSortingModuleState, action: SortingModuleActions) => {
  switch (action.type) {
    case UPDATINGSORTINGMODULESTATE:
      return {
        ...state,
        initialHeights: action.heights,
      };
  }
  return state;
};

// Store
const rootReducer = combineReducers<AppState>({ sortingModuleState: sortingModuleReducer });
export function createStore(): Store<AppState> {
  const store = configureStore({ reducer: rootReducer });
  return store;
}
