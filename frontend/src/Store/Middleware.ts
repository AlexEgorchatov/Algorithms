import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import {
  UPDATING_STRING_MATCHING_PATTERN_STATE,
  updatingStringMatchingPatternLengthState,
  StringMatchingPageActions,
  UPDATING_STRING_MATCHING_INPUT_STATE,
  updatingStringMatchingInputLengthState,
  updatingIsPatternLengthOverMaxState,
  updatingStringMatchingAnimationPatternState,
} from './String Matching Page/StringMatchingPageStateManagement';
import { maxPatternLength } from '../Pages/StringMatchingPage';

export const updateStringMatchingPatternMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: StringMatchingPageActions) => {
  switch (action.type) {
    case UPDATING_STRING_MATCHING_PATTERN_STATE:
      let pattern: string = action.stringMatchingPattern;
      let patternLength: number = pattern.length;

      store.dispatch(updatingStringMatchingPatternLengthState(patternLength));
      store.dispatch(updatingIsPatternLengthOverMaxState(patternLength > maxPatternLength));
      if (patternLength <= maxPatternLength) {
        store.dispatch(updatingStringMatchingAnimationPatternState(pattern));
      }
      break;

    case UPDATING_STRING_MATCHING_INPUT_STATE:
      store.dispatch(updatingStringMatchingInputLengthState(action.stringMatchingInput.length));
      break;

    default:
      break;
  }

  return next(action);
};
