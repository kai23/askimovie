import { GET_SESSION_FAILED, GET_SESSION_SUCCESS, GET_SESSION_LOADING } from '../constants/app.js';

const getSessionInitialState = {
  getSessionLoading: false,
  getSessionFailed: false,
  getSessionSuccess: false,
  getSessionError: {},
};

export default function app(state = getSessionInitialState, action) {
  switch (action.type) {
    case GET_SESSION_LOADING:
      return { ...state, ...getSessionInitialState, getSessionLoading: true };

    case GET_SESSION_SUCCESS:
      return { ...state, ...getSessionInitialState, getSessionSuccess: true, user: action.user };

    case GET_SESSION_FAILED:
      return { ...state, ...getSessionInitialState, getSessionFailed: true, error: action.error };
    default:
      return state;
  }
}
