import { combineReducers, Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  pathFindingModulePreviewReducer,
  PathFindingModulePreviewState,
} from './Home Page/PathFindingModulePreviewStateManagement';
import {
  sliderComponentReducer,
  SliderComponentState,
} from './Shared/SliderComponentStateManagement';
import {
  sortingModuleReducer,
  SortingModuleState,
} from './Sorting Module/SortingModuleStateManagement';
import { windowReducer, WindowState } from './Shared/WindowStateManagement';
import {
  stringMatchingModuleReducer,
  StringMatchingModuleState,
} from './String Matching Module/StringMatchingModuleStateManagement';
import { animationReducer, AnimationState } from './Shared/AnimationStateManagement';
import {
  SortingModulePreviewState,
  sortingModulePreviewReducer,
} from './Home Page/SortingModulePreviewStateManagement';
import {
  stringMatchingModulePreviewReducer,
  StringMatchingModulePreviewState,
} from './Home Page/StringMatchingModulePreviewStateManagement';
import {
  pathFindingModuleReducer,
  PathFindingModuleState,
} from './Path Finding Module/PathFindingModuleStateManagement';
import { aboutModalReducer, AboutModalState } from './Shared/AboutModalStateManagements';

const rootReducer = combineReducers<AppState>({
  sortingModulePreviewState: sortingModulePreviewReducer,
  stringMatchingModulePreviewState: stringMatchingModulePreviewReducer,
  pathFindingModulePreviewState: pathFindingModulePreviewReducer,
  sortingModuleState: sortingModuleReducer,
  stringMatchingModuleState: stringMatchingModuleReducer,
  pathFindingModuleState: pathFindingModuleReducer,
  aboutModalState: aboutModalReducer,
  sliderComponentState: sliderComponentReducer,
  windowState: windowReducer,
  animationState: animationReducer,
});

export interface AppState {
  readonly sortingModulePreviewState: SortingModulePreviewState;
  readonly stringMatchingModulePreviewState: StringMatchingModulePreviewState;
  readonly pathFindingModulePreviewState: PathFindingModulePreviewState;
  readonly sortingModuleState: SortingModuleState;
  readonly stringMatchingModuleState: StringMatchingModuleState;
  readonly pathFindingModuleState: PathFindingModuleState;
  readonly aboutModalState: AboutModalState;
  readonly sliderComponentState: SliderComponentState;
  readonly windowState: WindowState;
  readonly animationState: AnimationState;
}

const createStore = (): Store<AppState> => {
  const store = configureStore({ reducer: rootReducer });
  return store;
};

export const store = createStore();
