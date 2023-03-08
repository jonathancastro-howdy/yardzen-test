import { LOADING, SEARCH_SUCCESS, SEARCH_ERROR } from './types';

const SearchReducer = (state: any, action: any) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        results: action.payload.results,
        totalResults: action.payload.totalResults,
        searchValue: action.payload.searchValue,
        isLoading: false,
        isError: false,
      };
    case SEARCH_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default SearchReducer;
