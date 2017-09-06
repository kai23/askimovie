import { REQUEST_FAILED, REQUEST_SUCCESS, REQUEST_LOADING } from '../constants/request.js';

const requestInitialState = {
  requestLoading: false,
  requestFailed: false,
  requestSuccess: false,
  requestError: {},
};

export default function request(state = requestInitialState, action) {
  switch (action.type) {
    case REQUEST_LOADING:
      return { ...state, ...requestInitialState, requestLoading: true };

    case REQUEST_SUCCESS:
      return { ...state, ...requestInitialState, requestSuccess: true };

    case REQUEST_FAILED:
      return { ...state, ...requestInitialState, requestFailed: true, requestError: action.error };
    default:
      return state;
  }
}
