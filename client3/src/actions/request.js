import {
  REQUEST_LOADING,
  REQUEST_SUCCESS,
  REQUEST_FAILED,
  GET_REQUESTS_LOADING,
  GET_REQUESTS_SUCCESS,
  GET_REQUESTS_FAILED,
} from '../constants/request.js';

export const request = (mediaId, mediaType) => ({
  mediaId,
  mediaType,
  type: REQUEST_LOADING,
});

export const requestSuccess = () => ({
  type: REQUEST_SUCCESS,
});

export const requestFailed = error => ({
  type: REQUEST_FAILED,
  error,
});


export const getRequests = () => ({
  type: GET_REQUESTS_LOADING,
});

export const getRequestsSuccess = requests => ({
  requests,
  type: GET_REQUESTS_SUCCESS,
});

export const getRequestsFailed = error => ({
  type: GET_REQUESTS_FAILED,
  error,
});
