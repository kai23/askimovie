import { combineReducers } from 'redux';
import app from './app.js';

const todoApp = combineReducers({
  app,
});

export default todoApp;
