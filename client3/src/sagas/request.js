import { call, put, takeLatest } from 'redux-saga/effects';
import { REQUEST_LOADING } from '../constants/request';

import { requestSuccess, requestFailed } from '../actions/request.js';


import request from '../utils/request.js';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* doSearch(action) {
  const url = `/v1.0/media/request/${action.mediaId}`;
  try {
    const user = yield call(request, url, { method: 'POST' });
    yield put(requestSuccess(user));
  } catch (e) {
    yield put(requestFailed((e && e.responseJSON) || { type: 'WTF' }));
  }
}

function* requestSaga() {
  yield takeLatest(REQUEST_LOADING, doSearch);
}

export default requestSaga;
