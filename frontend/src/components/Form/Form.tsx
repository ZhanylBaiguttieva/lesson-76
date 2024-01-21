import React, {useState} from 'react';
import {Chat} from '../../../types';
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface Props {
  onSubmit: (chat: Chat) => void;
}
const Form: React.FC<Props> = ({onSubmit}) => {
  const [state, setState] = useState<Chat>({
    message: '',
    author: '',
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };


  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            required
            id="message"
            label="Message"
            name="message"
            value={state.message}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs>
          <TextField
            required
            id="author"
            label="Author"
            name="author"
            value={state.author}
            onChange={inputChangeHandler}
          />
        </Grid>
      </Grid>
      <Grid item xs>
        <LoadingButton
          type="submit"
          color="primary"
          variant="contained"
        >
          Send
        </LoadingButton>
      </Grid>
    </form>
  );
};

export default Form;