import { call, put, takeLatest, all } from 'redux-saga/effects';
import { REQUEST_LOADING, GET_REQUESTS_LOADING } from '../constants/request';

import { requestSuccess, requestFailed, getRequestsSuccess, getRequestsFailed } from '../actions/request.js';


import request from '../utils/request.js';

function* doSearch(action) {
  const url = `/v1.0/media/request/${action.mediaId}`;
  try {
    const user = yield call(request, url, { method: 'POST', body: { media_type: action.mediaType } });
    yield put(requestSuccess(user));
  } catch (e) {
    yield put(requestFailed((e && e.responseJSON) || { type: 'WTF' }));
  }
}


function* getRequests() {
  const url = '/v1.0/media/requests';
  try {
    const requests = yield call(request, url);
    yield put(getRequestsSuccess(requests));
  } catch (e) {
    yield put(getRequestsFailed((e && e.responseJSON) || { type: 'WTF' }));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(REQUEST_LOADING, doSearch),
    takeLatest(GET_REQUESTS_LOADING, getRequests),
  ]);
}
