import { Avatar, CircularProgress, List, ListItem, ListItemAvatar, ListItemText, Pagination } from '@mui/material';
import { Container } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../store/context/search.state';

const ITEMS_PER_PAGE = 10;

export const MovieList = () => {
  const { results, totalResults, searchValue, isLoading, searchMoviesByTitle } = useContext(SearchContext);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    searchMoviesByTitle(searchValue, value.toString());
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [totalResults]);

  return (
    <Container maxWidth="xs">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <List sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'column' } }}>
          {results?.map((movie) => (
            <ListItem key={movie.imdbID} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar variant="rounded" sx={{ width: 80, height: 120 }} alt={movie.Title} src={movie.Poster} />
              </ListItemAvatar>
              <ListItemText
                primary={movie.Title}
                secondary={movie.Year}
                primaryTypographyProps={{ variant: 'h6' }}
                secondaryTypographyProps={{ variant: 'subtitle1' }}
                sx={{ ml: 2 }}
              />
            </ListItem>
          ))}
        </List>
      )}
      {totalResults > 0 && (
        <Pagination
          count={Math.ceil(totalResults / ITEMS_PER_PAGE)}
          variant="outlined"
          shape="rounded"
          page={currentPage}
          onChange={handlePageChange}
        />
      )}
    </Container>
  );
};
