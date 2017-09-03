import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import app from './app.js';
import login from './login.js';

export default combineReducers({
  app,
  login,
  router: routerReducer,
});
