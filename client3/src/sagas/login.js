import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_LOADING } from '../constants/login';

import { loginSuccess, loginFailed } from '../actions/login.js';


import request from '../utils/request.js';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* doLogin(action) {
  const url = '/v1.0/user/login';
  const body = {
    username: action.username,
    password: action.password,
  };
  try {
    const user = yield call(request, url, { method: 'POST', body });
    yield put(loginSuccess(user));
  } catch (e) {
    yield put(loginFailed((e && e.responseJSON) || { type: 'WTF' }));
  }
}

function* loginSaga() {
  yield takeLatest(LOGIN_LOADING, doLogin);
}

export default loginSaga;
