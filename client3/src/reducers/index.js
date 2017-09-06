import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import app from './app.js';
import login from './login.js';
import search from './search.js';
import request from './request.js';

export default combineReducers({
  app,
  login,
  search,
  request,
  router: routerReducer,
});
