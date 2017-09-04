import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import app from './app.js';
import login from './login.js';
import search from './search.js';

export default combineReducers({
  app,
  login,
  search,
  router: routerReducer,
});
