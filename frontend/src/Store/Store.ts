import { combineReducers, Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { sortingModuleReducer, SortingModuleState } from './Home Page/SortingModuleManagement';
import { stringMatchingModuleReducer, StringMatchingModuleState } from './Home Page/StringMatchingModuleManagement';
import { pathFindingModuleReducer, PathFindingModuleState } from './Home Page/PathFindingModuleManagement';

const rootReducer = combineReducers<AppState>({
  sortingModuleState: sortingModuleReducer,
  stringMatchingModuleState: stringMatchingModuleReducer,
  pathFindingModuleState: pathFindingModuleReducer,
});

export function createStore(): Store<AppState> {
  const store = configureStore({ reducer: rootReducer });
  return store;
}

export interface AppState {
  readonly sortingModuleState: SortingModuleState;
  readonly stringMatchingModuleState: StringMatchingModuleState;
  readonly pathFindingModuleState: PathFindingModuleState;
}
