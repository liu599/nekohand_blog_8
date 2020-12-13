import React, {useEffect} from "react";
import styles from './index.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import {
  Link,
  connect,
  getLocale,
  setLocale,
  useIntl,
  history,
  Helmet,
} from 'umi';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import CardGallery from '../components/gallery/gallery';
import Topic from '../components/topic/topic';
import ArtistGrids from '../components/avaterGallery/avater'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cardRoot: {
    maxWidth: 600,
  }
}));

function topPage(props) {

  function fetchMusic(){
    props.dispatch({
      type: 'nekoMusic/fetchMp3Music',
      payload: {
        urlTag: 'playerlist',
        queryData: {
          fileType: 'mp3',
        },
      }
    })
  }

  //https://stackoverflow.com/questions/44506207/reactjs-lifecycle-method-inside-a-function-component
  useEffect(() => {
    fetchMusic();
    console.log('mount it!');
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item lg={12}>
          <Paper className={classes.paper}>
            <Grid container justify="center" spacing={4}>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <Card className={classes.cardRoot}>
                    <CardActionArea>
                      <CardMedia
                        component='img' // add this line to use <img />
                        image={require("../assets/007MwxDlgy1g5vymokkpkj30rw0ietc9.jpg")}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          プリンセスコネクト！Re:Dive
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          前作での最終ストーリー、ユイをプリンセスとして展開したルートに沿っており、Re:Diveにおいてはプロローグ内で覇瞳皇帝の最後の逆襲に敗れて意識が無くなった時点から物語は始まる。
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Paper>
              </Grid>
              <Grid item xs={5}>
                <Paper className={classes.paper}>xs=5</Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={12}>
          <Typography variant="h6" gutterBottom>
            Top
          </Typography>
          <Divider />
          <div style={{paddingTop: 45}}>
            {props.music.storage.length > 0 && <CardGallery data={props.music.albums} />}
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item lg={8}>
          <Typography variant="h6" gutterBottom>
            Artist
          </Typography>
          <ArtistGrids />
        </Grid>
        <Grid item lg={4}>
          <Typography variant="h6" gutterBottom>
            Topic
          </Typography>
          <Topic />
        </Grid>
      </Grid>
    </div>
  );
}

function mapStateToProps(state) {
  console.log("state", state);
  return {
    mock: state.count,
    music: state.nekoMusic,
  };
}

export default connect(mapStateToProps)(topPage);

function aba() {
  const intl = useIntl();
  return (
    <div className={styles.normal}>
      <ul className={styles.list}>
        <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            {intl.formatMessage(
              {
                id: 'name',
                defaultMessage: '你好，旅行者',
              },
              {
                name: '旅行者',
              },
            )}
          </a>
        </li>
      </ul>
    </div>
  );
}
