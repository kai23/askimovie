import { call, put, takeLatest } from 'redux-saga/effects';
import { SEARCH_LOADING } from '../constants/search';

import { searchSuccess, searchFailed } from '../actions/search.js';


import request from '../utils/request.js';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* doSearch(action) {
  const url = '/v1.0/media/search';
  const body = {
    query: action.query,
  };
  try {
    const user = yield call(request, url, { method: 'POST', body });
    yield put(searchSuccess(user));
  } catch (e) {
    yield put(searchFailed((e && e.responseJSON) || { type: 'WTF' }));
  }
}

function* searchSaga() {
  yield takeLatest(SEARCH_LOADING, doSearch);
}

export default searchSaga;
