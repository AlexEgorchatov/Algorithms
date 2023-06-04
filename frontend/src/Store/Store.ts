import { combineReducers, Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { sortingModuleReducer, SortingModuleState } from './Home Page/SortingModuleStateManagement';
import { stringMatchingModuleReducer, StringMatchingModuleState } from './Home Page/StringMatchingModuleStateManagement';
import { pathFindingModuleReducer, PathFindingModuleState } from './Home Page/PathFindingModuleStateManagement';
import { headerReducer, HeaderState } from './Home Page/HeaderStateManagement';
import { SliderComponentState, sliderComponentReducer } from './Sorting Page/SliderComponentStateManagement';

const rootReducer = combineReducers<AppState>({
  sortingModuleState: sortingModuleReducer,
  stringMatchingModuleState: stringMatchingModuleReducer,
  pathFindingModuleState: pathFindingModuleReducer,
  headerState: headerReducer,
  sliderComponentState: sliderComponentReducer,
});

export function createStore(): Store<AppState> {
  const store = configureStore({ reducer: rootReducer });
  return store;
}

export interface AppState {
  readonly sortingModuleState: SortingModuleState;
  readonly stringMatchingModuleState: StringMatchingModuleState;
  readonly pathFindingModuleState: PathFindingModuleState;
  readonly headerState: HeaderState;
  readonly sliderComponentState: SliderComponentState;
}
