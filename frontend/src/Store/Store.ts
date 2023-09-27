import { combineReducers, Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { pathFindingModulePreviewReducer, PathFindingModulePreviewState } from './Home Page/Module Previews/PathFindingModulePreviewStateManagement';
import { headerReducer, HeaderState } from './Home Page/HeaderStateManagement';
import { sliderComponentReducer, SliderComponentState } from './Shared/SliderComponentStateManagement';
import { sortingModuleReducer, SortingModuleState } from './Sorting Module/SortingModuleStateManagement';
import { windowReducer, WindowState } from './Shared/WindowStateManagement';
import { stringMatchingModuleReducer, StringMatchingModuleState } from './String Matching Module/StringMatchingModuleStateManagement';
import { animationReducer, AnimationState } from './Shared/AnimationStateManagement';
import { SortingModulePreviewState, sortingModulePreviewReducer } from './Home Page/Module Previews/SortingModulePreviewStateManagement';
import { stringMatchingModulePreviewReducer, StringMatchingModulePreviewState } from './Home Page/Module Previews/StringMatchingModulePreviewStateManagement';

const rootReducer = combineReducers<AppState>({
  sortingModulePreviewState: sortingModulePreviewReducer,
  stringMatchingModulePreviewState: stringMatchingModulePreviewReducer,
  pathFindingModulePreviewState: pathFindingModulePreviewReducer,
  headerState: headerReducer,
  sliderComponentState: sliderComponentReducer,
  sortingModuleState: sortingModuleReducer,
  stringMatchingModuleState: stringMatchingModuleReducer,
  windowState: windowReducer,
  animationState: animationReducer,
});

export interface AppState {
  readonly sortingModulePreviewState: SortingModulePreviewState;
  readonly stringMatchingModulePreviewState: StringMatchingModulePreviewState;
  readonly pathFindingModulePreviewState: PathFindingModulePreviewState;
  readonly headerState: HeaderState;
  readonly sliderComponentState: SliderComponentState;
  readonly sortingModuleState: SortingModuleState;
  readonly stringMatchingModuleState: StringMatchingModuleState;
  readonly windowState: WindowState;
  readonly animationState: AnimationState;
}

const createStore = (): Store<AppState> => {
  const store = configureStore({ reducer: rootReducer });
  return store;
};

export const store = createStore();
