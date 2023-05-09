import { combineReducers, Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

// State
interface SortingModuleState {
  readonly heights: number[];
}

export interface AppState {
  readonly sortingModule: SortingModuleState;
}

const initialSortingModuleState: SortingModuleState = {
  heights: [180, 100, 120, 140, 160],
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
      };
      break;
  }
  return state;
};

// Store
const rootReducer = combineReducers<AppState>({ sortingModule: sortingModuleReducer });
export function createStore(): Store<AppState> {
  const store = configureStore({ reducer: rootReducer });
  return store;
}
