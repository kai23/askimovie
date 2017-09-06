import {
  REQUEST_LOADING,
  REQUEST_SUCCESS,
  REQUEST_FAILED,
} from '../constants/request.js';

export const request = mediaId => ({
  mediaId,
  type: REQUEST_LOADING,
});

export const requestSuccess = () => ({
  type: REQUEST_SUCCESS,
});

export const requestFailed = error => ({
  type: REQUEST_FAILED,
  error,
});
