import React, {useState} from 'react';
import {Chat} from '../../../types';
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {request} from '../../../APIrequest.ts';

const Form = () => {
  const [state, setState] = useState<Chat>({
    id: '',
    message: '',
    author: '',
    datetime: ''
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };


  const postChat = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = 'http://localhost:8000/messages';

    try {
        const jsonData = {
            message: state.message,
            author: state.author,
        };
      await request<Chat>(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData),
      });
    } catch (error) {
      console.error('Error posting chat:', error);
    }
    setState((prev) => ({
      ...prev,
      message: '',
      author: '',
    }));
  };

  return (
    <form onSubmit={postChat}>
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