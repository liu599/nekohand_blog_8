import React, {useEffect} from "react";
import styles from './index.css';
import { makeStyles } from '@material-ui/core/styles';
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
import Ranking from '../components/ranking/ranking'


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
    width: "100%",
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
        urlOption: {},
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
      <Grid container spacing={1} style={{paddingBottom: 42}}>
        <Grid item lg={12}>
            <Grid container justify="center" spacing={4}>
              <Grid item lg={8} style={{paddingTop: 60}}>
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
                        <Typography variant="body2" color="textSecondary" component="p" paragraph>
                          前作での最終ストーリー、ユイをプリンセスとして展開したルートに沿っており、
                          Re:Diveにおいてはプロローグ内で覇瞳皇帝の最後の逆襲に敗れて意識が無くなった時点から物語は
                          始まる。
                        </Typography>
                        <Typography variant="button" color="textSecondary" component="p">
                          Read more...
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
              </Grid>
              <Grid item lg={4} style={{paddingTop: 60}}>
                <Typography variant="h5">
                  今日推荐
                </Typography>
                <Ranking />
              </Grid>
            </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={12}>
          <Typography variant="h6">
            Top
          </Typography>
          <Divider />
          <div style={{paddingTop: 45}}>
            {props.music.storage.length > 0 && <CardGallery data={props.music.albums} />}
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item lg={8} style={{minHeight: 550}}>
          <Typography variant="h6">
            Artist
          </Typography>
          <Divider />
          <ArtistGrids />
        </Grid>
        <Grid item lg={4} style={{minHeight: 550}}>
          <Typography variant="h6">
            Topic
          </Typography>
          <Divider />
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
