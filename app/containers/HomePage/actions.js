import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
} from './constants';

export function login(email, password) {
  return {
    type: LOGIN_START,
    email,
    password,
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
