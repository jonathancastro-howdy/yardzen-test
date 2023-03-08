import { createContext, useReducer } from 'react';
import { getMovies } from '../../services/movies.service';
import SearchReducer from './search.reducer';
import { LOADING, SEARCH_ERROR, SEARCH_SUCCESS } from './types';

interface ISearchContext {
  results?: any[];
  totalResults: number;
  isLoading: boolean;
  isError: boolean;
  searchValue: string;
  searchMoviesByTitle: (title: string, page?: string) => any;
}

const defaultState: ISearchContext = {
  results: [],
  totalResults: 0,
  isLoading: false,
  isError: false,
  searchValue: '',
  searchMoviesByTitle: () => {},
};

export const SearchContext = createContext<ISearchContext>(defaultState);

const SearchState = (props: any) => {
  const initialState = defaultState;
  const [state, dispatch] = useReducer(SearchReducer, initialState);

  const searchMoviesByTitle = async (title: string, page?: string) => {
    dispatch({ type: LOADING });
    try {
      const localItem = localStorage.getItem(`${title}/${page}`);
      if (localItem) {
        const localResponse = JSON.parse(localItem);
        if (localResponse) {
          dispatch({
            type: SEARCH_SUCCESS,
            payload: { results: localResponse.Search, totalResults: localResponse.totalResults, searchValue: title },
          });
          return;
        }

        // TODO: Handle error response stored locally
      }

      const response: any = await getMovies(title, page);
      dispatch({
        type: SEARCH_SUCCESS,
        payload: { results: response.Search, totalResults: response.totalResults, searchValue: title },
      });

      localStorage.setItem(`${title}/${page}`, JSON.stringify(response));
    } catch (error: any) {
      dispatch({ type: SEARCH_ERROR, payload: error });
    }
  };

  return (
    <SearchContext.Provider
      value={{
        results: state.results,
        totalResults: state.totalResults,
        isLoading: state.isLoading,
        isError: state.isError,
        searchValue: state.searchValue,
        searchMoviesByTitle,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchState;
