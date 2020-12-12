import React from 'react';
import { connect } from 'umi';
import styles from './index.css';
import "@/assets/material-font.css"
import "@/assets/icon.css";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Header from '@/components/blogHeader';
import StickyFooter from '@/components/stickyFooter';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';

const sections = [
  { title: "Ranking", url: 'ranking' },
  { title: 'Tags', url: 'tags' },
  { title: 'Zo', url: 'zo' },
  { title: 'About', url: 'about' },
];

const theme = createMuiTheme({
  status: {
    danger: orange[500],
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 66,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  gridList: {
    width: "100%",
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header title={"Nekomusic"} sections={sections} />
        <div className={classes.root}>
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="div">December</ListSubheader>
            </GridListTile>
            <GridListTile key={"v300"}>
              <img src={"https://blog.ecs32.top/static/009MwxDlgy1g5vymokkpkj30rw0ietc9.jpg"} alt={"Grid Title"} />
              <GridListTileBar
                title={"Grid Title"}
                subtitle={<span>by: Eddie32</span>}
                actionIcon={
                  <IconButton aria-label={`info about Eddie32`} className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          </GridList>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>

              </Paper>
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
      </ThemeProvider>
  );
}

function mapStateToProps(state) {
  console.log("state", state);
  return { mock: state.count };
}

export default connect(mapStateToProps)(BasicLayout);
