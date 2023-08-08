import { combineReducers, Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { sortingModuleReducer, SortingModuleState } from './Home Page/SortingModuleStateManagement';
import { stringMatchingModuleReducer, StringMatchingModuleState } from './Home Page/StringMatchingModuleStateManagement';
import { pathFindingModuleReducer, PathFindingModuleState } from './Home Page/PathFindingModuleStateManagement';
import { headerReducer, HeaderState } from './Home Page/HeaderStateManagement';
import { sliderComponentReducer, SliderComponentState } from './Shared/SliderComponentStateManagement';
import { sortingPageReducer, SortingPageState } from './Sorting Page/SortingPageStateManagement';
import { windowReducer, WindowState } from './Shared/WindowStateManagement';
import { stringMatchingPageReducer, StringMatchingPageState } from './String Matching Page/StringMatchingPageStateManagement';
import { updateStringMatchingPatternMiddleware } from './Middleware';
import { algorithmReducer, AlgorithmState } from './Shared/AlgorithmStateManagement';

const rootReducer = combineReducers<AppState>({
  sortingModuleState: sortingModuleReducer,
  stringMatchingModuleState: stringMatchingModuleReducer,
  pathFindingModuleState: pathFindingModuleReducer,
  headerState: headerReducer,
  sliderComponentState: sliderComponentReducer,
  sortingPageState: sortingPageReducer,
  stringMatchingPageState: stringMatchingPageReducer,
  windowState: windowReducer,
  algorithmState: algorithmReducer,
});

export function createStore(): Store<AppState> {
  const store = configureStore({ reducer: rootReducer, middleware: [updateStringMatchingPatternMiddleware] });
  return store;
}

export interface AppState {
  readonly sortingModuleState: SortingModuleState;
  readonly stringMatchingModuleState: StringMatchingModuleState;
  readonly pathFindingModuleState: PathFindingModuleState;
  readonly headerState: HeaderState;
  readonly sliderComponentState: SliderComponentState;
  readonly sortingPageState: SortingPageState;
  readonly stringMatchingPageState: StringMatchingPageState;
  readonly windowState: WindowState;
  readonly algorithmState: AlgorithmState;
}
