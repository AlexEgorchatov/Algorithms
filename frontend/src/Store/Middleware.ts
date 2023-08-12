import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import {
  UPDATE_STRING_MATCHING_PATTERN_STATE,
  StringMatchingPageActions,
  UPDATE_STRING_MATCHING_INPUT_STATE,
  updateStringMatchingAnimationPatternState,
  updateStringMatchingAnimationInputState,
} from './String Matching Page/StringMatchingPageStateManagement';
import { maxStringMatchingInputLength, maxStringMatchingPatternLength } from '../Pages/StringMatchingPage';

export const updateStringMatchingPatternMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: StringMatchingPageActions) => {
  switch (action.type) {
    case UPDATE_STRING_MATCHING_INPUT_STATE:
      if (action.stringMatchingInput.length <= maxStringMatchingInputLength) {
        store.dispatch(updateStringMatchingAnimationInputState(action.stringMatchingInput));
      }
      break;

    case UPDATE_STRING_MATCHING_PATTERN_STATE:
      if (action.stringMatchingPattern.length <= maxStringMatchingPatternLength) {
        store.dispatch(updateStringMatchingAnimationPatternState(action.stringMatchingPattern));
      }
      break;

    default:
      break;
  }

  return next(action);
};
