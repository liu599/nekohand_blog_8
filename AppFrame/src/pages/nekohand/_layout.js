import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import Categories from '../../components/blogCategories/Categories'
import Chron from '../../components/blogCategories/Chron'
import Ad from '../../components/ads'

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'relative',
  },
  rightColumn: {
    paddingTop: 32,
  },
  widget: {
    marginBottom: 32,
  }
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
          <div className={classes.rightColumn}>
            <Typography variant="h4"  gutterBottom paragraph>
              Categories
            </Typography>
            <Categories />
            <div className={classes.widget} />
            <Typography variant="h4"  gutterBottom paragraph>
              Navigation
            </Typography>
            <Chron />
            <div className={classes.widget} />
            <Typography variant="h4"  gutterBottom paragraph>
              Highlight
            </Typography>
            <Ad />
          </div>
        </Grid>
      </Grid>

    </div>
  )
}

export default BlogLayout;
