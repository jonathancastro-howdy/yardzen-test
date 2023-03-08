import { Button, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { SearchContext } from '../store/context/search.state';
// TODO: add tests
// TODO: add aria attributes

export const SearchForm = () => {
  const [value, setValue] = useState<string>('');
  const { searchMoviesByTitle } = useContext(SearchContext);

  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        onChange={(event) => {
          setValue(event.target.value);
        }}
      ></TextField>
      <Button variant="outlined" onClick={() => searchMoviesByTitle(value, '1')}>
        Search
      </Button>
    </>
  );
};
