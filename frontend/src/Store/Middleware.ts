import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import {
  UPDATING_STRING_MATCHING_PATTERN_STATE,
  updatingStringMatchingPatternLengthState,
  StringMatchingPageActions,
  UPDATING_STRING_MATCHING_INPUT_STATE,
  updatingStringMatchingInputLengthState,
} from './String Matching Page/StringMatchingPageStateManagement';

export const updateStringMatchingPatternMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: StringMatchingPageActions) => {
  switch (action.type) {
    case UPDATING_STRING_MATCHING_PATTERN_STATE:
      store.dispatch(updatingStringMatchingPatternLengthState(action.stringMatchingPattern.length));
      break;

    case UPDATING_STRING_MATCHING_INPUT_STATE:
      store.dispatch(updatingStringMatchingInputLengthState(action.stringMatchingInput.length));
      break;

    default:
      break;
  }

  return next(action);
};
