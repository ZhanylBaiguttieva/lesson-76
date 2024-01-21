import React from 'react';
import { Card, CardContent, CardHeader, Grid} from '@mui/material';


interface Props {
  message: string;
  author: string;
  datetime: string;
}

const ChatItem: React.FC<Props> = ({message, author, datetime}) => {
  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Card>
        <CardHeader title={author}/>
        <CardContent>
          <strong>
            {message}
          </strong>
          <span>
            Posted on: {datetime}
          </span>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ChatItem;