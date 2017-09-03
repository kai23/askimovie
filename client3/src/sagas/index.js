import { all, fork } from 'redux-saga/effects';

import app from './app.js';
import login from './login.js';


export default function* root() {
  yield all([
    fork(app),
    fork(login),
  ]);
}
