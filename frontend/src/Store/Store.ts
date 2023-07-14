import { combineReducers, Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { sortingModuleReducer, SortingModuleState } from './Home Page/SortingModuleStateManagement';
import { stringMatchingModuleReducer, StringMatchingModuleState } from './Home Page/StringMatchingModuleStateManagement';
import { pathFindingModuleReducer, PathFindingModuleState } from './Home Page/PathFindingModuleStateManagement';
import { headerReducer, HeaderState } from './Home Page/HeaderStateManagement';
import { sliderComponentReducer, SliderComponentState } from './Shared/SliderComponentStateManagement';
import { sortingPageReducer, SortingPageState } from './Sorting Page/SortingPageStateManagement';
import { windowReducer, WindowState } from './Shared/WindowStateManagement';

const rootReducer = combineReducers<AppState>({
  sortingModuleState: sortingModuleReducer,
  stringMatchingModuleState: stringMatchingModuleReducer,
  pathFindingModuleState: pathFindingModuleReducer,
  headerState: headerReducer,
  sliderComponentState: sliderComponentReducer,
  sortingPageState: sortingPageReducer,
  windowState: windowReducer,
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
  readonly sortingPageState: SortingPageState;
  readonly windowState: WindowState;
}
