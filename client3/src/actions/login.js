import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from '../constants/login.js';

export const login = (username, password) => ({
  username,
  password,
  type: LOGIN_LOADING,
});

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user,
});

export const loginFailed = error => ({
  type: LOGIN_FAILED,
  error,
});
