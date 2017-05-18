/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOGIN_START } from './constants';
import { loginFailed, loginSuccess } from './actions';


export function* execLogin({ email, password }) {
  const requestURL = '/api/user/login';
  const options = {
    method: 'POST',
    body: { email, password },
  };
  try {
    const user = yield call(request, requestURL, options);
    yield put(loginSuccess(user));
  } catch (err) {
    yield put(loginFailed(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* loginSaga() {
  const watcher = yield takeLatest(LOGIN_START, execLogin);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  loginSaga,
];
