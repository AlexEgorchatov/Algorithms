import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import {
  UPDATING_STRING_MATCHING_PATTERN_STATE,
  updatingStringMatchingPatternLengthState,
  StringMatchingPageActions,
  UPDATING_STRING_MATCHING_INPUT_STATE,
  updatingStringMatchingInputLengthState,
  updatingIsPatternLengthOverMaxState,
} from './String Matching Page/StringMatchingPageStateManagement';
import { maxPatternLength } from '../Pages/StringMatchingPage';

export const updateStringMatchingPatternMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: StringMatchingPageActions) => {
  switch (action.type) {
    case UPDATING_STRING_MATCHING_PATTERN_STATE:
      let patternLength: number = action.stringMatchingPattern.length;
      store.dispatch(updatingStringMatchingPatternLengthState(patternLength));
      store.dispatch(updatingIsPatternLengthOverMaxState(patternLength > maxPatternLength));
      break;

    case UPDATING_STRING_MATCHING_INPUT_STATE:
      store.dispatch(updatingStringMatchingInputLengthState(action.stringMatchingInput.length));
      break;

    default:
      break;
  }

  return next(action);
};
