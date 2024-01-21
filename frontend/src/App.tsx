import {Button, Grid, Link, Typography} from '@mui/material';


function App() {


  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Products</Typography>
        </Grid>
        <Grid item>
          <Button color="primary" component={Link} href="/messages/new">
            Add message
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
