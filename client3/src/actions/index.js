import { GET_SESSION_FAILED, GET_SESSION_SUCCESS, GET_SESSION_LOADING } from '../constants/app.js';

export const getSession = () => ({
  type: GET_SESSION_LOADING,
});

export const getSessionSuccess = user => ({
  type: GET_SESSION_SUCCESS,
  user,
});

export const getSessionFailed = error => ({
  type: GET_SESSION_FAILED,
  error,
});
