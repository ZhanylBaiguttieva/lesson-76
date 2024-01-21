import {CircularProgress, Grid, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import {Chat} from '../types';
import {request} from '../APIrequest.ts';
import ChatItem from './components/Chat/ChatItem.tsx';
import Form from './components/Form/Form.tsx';


function App() {
  const [state, setState] = useState<Chat[]>([]);
  const url = 'http://localhost:8000/messages';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chats: Chat[] = await request<Chat[]>(url);
        const newChat= chats.map((chat) => ({
          ...chat,
        }));
        setState(newChat);
      } catch (e) {
        console.log('Something went wrong: ' + e);
      }
    };
    void fetchData();
  }, []);

  let chatArea: React.ReactNode = <CircularProgress/>;

  if(state) {
    chatArea = state.map(chat => (
      <ChatItem
        key={chat.id}
        message={chat.message}
        author={chat.author}
        datetime={chat.datetime}
        id={chat.id}
      />
    ))
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Chat</Typography>
        </Grid>
        <Grid item>
          <Form/>
        </Grid>
      </Grid>
      <Grid item container spacing={1}>
        {chatArea}
      </Grid>
    </Grid>
  );
}

export default App;


