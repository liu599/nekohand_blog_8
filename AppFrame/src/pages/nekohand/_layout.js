import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'relative',
  },
});


function BlogLayout(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1} style={{paddingBottom: 42}}>
        <Grid item lg={10}>
          {props.children}
        </Grid>
        <Grid item lg={2}>
          Index Here
        </Grid>
      </Grid>

    </div>
  )
}

export default BlogLayout;
