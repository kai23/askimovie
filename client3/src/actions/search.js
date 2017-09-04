import {
  SEARCH_LOADING,
  SEARCH_SUCCESS,
  SEARCH_FAILED,
} from '../constants/search.js';

export const search = query => ({
  query,
  type: SEARCH_LOADING,
});

export const searchSuccess = result => ({
  type: SEARCH_SUCCESS,
  result,
});

export const searchFailed = error => ({
  type: SEARCH_FAILED,
  error,
});
