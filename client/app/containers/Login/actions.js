import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
} from './constants';

export function login(username, password, remember) {
  return {
    type: LOGIN_START,
    username,
    password,
    remember,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    error,
  };
}
