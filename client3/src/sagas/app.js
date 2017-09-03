import { call, put, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { getSession, getSessionSuccess, getSessionFailed } from '../actions/app.js';


import request from '../utils/request.js';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser() {
  const url = '/v1.0/user/session';
  try {
    yield put(getSession());
    const user = yield call(request, url);
    yield put(getSessionSuccess(user));
  } catch (e) {
    yield put(getSessionFailed(e));
  }
}

function* appSaga() {
  yield takeLatest(LOCATION_CHANGE, fetchUser);
}

export default appSaga;
