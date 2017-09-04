import { SEARCH_FAILED, SEARCH_SUCCESS, SEARCH_LOADING } from '../constants/search.js';

const searchInitialState = {
  searchLoading: false,
  searchFailed: false,
  searchSuccess: false,
  searchError: {},
  result: {},
};

export default function search(state = searchInitialState, action) {
  switch (action.type) {
    case SEARCH_LOADING:
      return { ...state, ...searchInitialState, searchLoading: true };

    case SEARCH_SUCCESS:
      return { ...state, ...searchInitialState, searchSuccess: true, result: action.result };

    case SEARCH_FAILED:
      return { ...state, ...searchInitialState, searchFailed: true, searchError: action.error };
    default:
      return state;
  }
}
