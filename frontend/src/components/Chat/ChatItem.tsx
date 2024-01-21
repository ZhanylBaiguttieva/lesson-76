import React from 'react';
import { Card, CardContent, CardHeader, Grid } from '@mui/material';

interface Props {
  id: string;
  message: string;
  author: string;
  datetime: string;
}

const ChatItem: React.FC<Props> = ({message, author, datetime}) => {

  const date = new Date(datetime);
  const formatedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;

  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Card>
        <CardHeader title={author}/>
        <CardContent>
          <strong>
            {message}
          </strong>
          <span>
            Posted on: {formatedDate}
          </span>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ChatItem;