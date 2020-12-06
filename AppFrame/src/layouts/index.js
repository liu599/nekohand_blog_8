import React from 'react';
import { connect } from 'umi';
import styles from './index.css';
import "@/assets/material-font.css"
import "@/assets/icon.css";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Header from '@/components/blogHeader';
import StickyFooter from '@/components/stickyFooter';



const sections = [
  { title: "What's new?", url: '#' },
  { title: 'Categories', url: '#' },
  { title: 'Ranking', url: '#' },
  /*{ title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },*/
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 66,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


function BasicLayout(props) {

  function addNumber(number){
    props.dispatch({
      type: 'count/addAfter1Second',
      payload: number
    })
  }
  console.log(props, "after connect");
  const classes = useStyles();

  return (
    <div className={styles.normal}>
      <Header title={"Nekomusic"} sections={sections} />
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>{props.mock}</Paper>
          </Grid>
        </Grid>
      </div>
      <Button variant="contained" color="secondary" onClick={()=>addNumber(1)}>
        Generate
      </Button>
      {props.children}
      {StickyFooter()}
    </div>
  );
}

function mapStateToProps(state) {
  console.log("state", state);
  return { mock: state.count };
}

export default connect(mapStateToProps)(BasicLayout);
