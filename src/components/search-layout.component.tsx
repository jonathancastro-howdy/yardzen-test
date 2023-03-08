import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import { MovieList } from './movie-list.component';
import { SearchForm } from './search-form.component';

export const MovieSearchLayout = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h2" component="h1" padding={2}>
        Open Movie Database search:
      </Typography>
      <SearchForm></SearchForm>
      <MovieList></MovieList>
    </Container>
  );
};
