import { all, fork } from 'redux-saga/effects';

import app from './app.js';
import login from './login.js';
import search from './search.js';
import request from './request.js';


export default function* root() {
  yield all([
    fork(app),
    fork(login),
    fork(search),
    fork(request),
  ]);
}
