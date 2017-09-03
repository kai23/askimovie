import { LOGIN_FAILED, LOGIN_SUCCESS, LOGIN_LOADING } from '../constants/login.js';

const loginInitialState = {
  loginLoading: false,
  loginFailed: false,
  loginSuccess: false,
  loginError: {},
};

export default function login(state = loginInitialState, action) {
  switch (action.type) {
    case LOGIN_LOADING:
      return { ...state, ...loginInitialState, loginLoading: true };

    case LOGIN_SUCCESS:
      return { ...state, ...loginInitialState, loginSuccess: true };

    case LOGIN_FAILED:
      return { ...state, ...loginInitialState, loginFailed: true, loginError: action.error };
    default:
      return state;
  }
}
