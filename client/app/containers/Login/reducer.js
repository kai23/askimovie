/*
 *
 * LanguageProvider reducer
 *
 */

import { fromJS } from 'immutable';

import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
} from './constants';

const initialState = fromJS({
  success: false,
  failed: false,
  error: {},
  loading: false,
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
      return state.set('loading', true);
    case LOGIN_FAILED:
      return state.set('failed', true);
    case LOGIN_SUCCESS:
      return state.set('success', true);
    default:
      return state;
  }
}

export default homePageReducer;
