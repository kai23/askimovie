import {
  REQUEST_FAILED, REQUEST_SUCCESS, REQUEST_LOADING,
  GET_REQUESTS_LOADING, GET_REQUESTS_SUCCESS, GET_REQUESTS_FAILED,
} from '../constants/request.js';

const requestInitialState = {
  requestLoading: false,
  requestFailed: false,
  requestSuccess: false,
  requestError: {},
};

const getRequestsInitialState = {
  getRequestsLoading: false,
  getRequestsFailed: false,
  getRequestsSuccess: false,
  getRequestsError: {},
  requests: [],
};


export default function request(state = requestInitialState, action) {
  switch (action.type) {
    case REQUEST_LOADING:
      return { ...state, ...requestInitialState, requestLoading: true };

    case REQUEST_SUCCESS:
      return { ...state, ...requestInitialState, requestSuccess: true };

    case REQUEST_FAILED:
      return { ...state, ...requestInitialState, requestFailed: true, requestError: action.error };

    case GET_REQUESTS_LOADING:
      return { ...state, ...getRequestsInitialState, getRequestsLoading: true };

    case GET_REQUESTS_SUCCESS:
      return { ...state, ...getRequestsInitialState, getRequestsSuccess: true, requests: action.requests };

    case GET_REQUESTS_FAILED:
      return { ...state, ...getRequestsInitialState, getRequestsFailed: true, getRequestsError: action.error };

    default:
      return state;
  }
}
