import React, {useEffect} from "react";
React.useLayoutEffect = React.useEffect;
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
import ArtistGrids from '../components/artist/artist'
import Ranking from '../components/ranking/ranking'

import {useSelector,useDispatch} from 'dva';
import Loading from '../components/pageLoading/loading'


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

  const {loading,nekoMusic} = useSelector(stores => ({
    loading: stores.loading,
    nekoMusic: stores.loading,
  }))



  function fetchMusic(){
    props.dispatch({
      type: 'nekoMusic/fetchMusic',
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
    // console.log('mount it!');
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {
        loading.effects["nekoMusic/fetchMusic"] ? <Loading />
          : <>
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
                            Current Playing: プリンセスコネクト！Re:Dive
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p" paragraph>
                            Anime RPG: それは、どこまでも非現実的な、美しく尊い夢―美しき大地アストライア大陸。その中心にあるのは、
                            いくつもの種族―獣人(ビースト)、エルフ、魔族、人間(ヒューマン)が助け合って暮らす街、王都『ランドソル』。
                            主人公であるあなたが目を覚ましたのはその近くの平原だった。穏やかな風の音、瑞々しい草花の匂い。しかし、
                            記憶だけがすっぽりと抜け落ちている。見知らぬ世界でたった一人、戸惑うあなたを導いたのは小さなガイド役の少女だった。
                            さらにそこに通りがかった、腹ペコの剣士。心優しき魔法使いの少女。行き倒れていた猫の獣人(ビースト)。
                            次々に生まれた絆が、あなたを世界に繋ぎとめていく。例え記憶が戻る方法は分からなくとも―和やかな暮らしにも慣れ、
                            それなりに楽しく生きていけると思っていた。だが、平穏な時は永遠には続かない。ランドソルに巨大な陰謀の影が差し込む時、
                            あなたと少女たちの運命が大きく動き出す―
                          </Typography>
                          <Typography variant="button" color="textSecondary" component="p">
                            <a href="https://priconne-redive.jp/" target={"_blank"}>Read more...</a>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                  <Grid item lg={4} style={{paddingTop: 60}}>
                    <Typography variant="h5" color={"primary"}>
                      Top 10 Most Recent Songs
                    </Typography>
                    <Ranking />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item lg={12}>
                <Typography variant="h6" style={{position: "relative"}}>
                  Albums
                  <span style={{position: "absolute", right: 0}}>
                    <Link to={{
                      pathname: "/zo/zo-gallery",
                      query: {
                        albums: 1
                      },
                    }}>More albums...</Link>
                  </span>
                </Typography>
                <Divider />
                <div style={{paddingTop: 45}}>
                  {props.music.storage.length > 0 && <CardGallery data={props.music.albums} />}
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={6}>
              <Grid item lg={8} style={{minHeight: 550}}>
                <Typography variant="h6" style={{position: "relative"}}>
                  Artist
                  <span style={{position: "absolute", right: 0}}>
                    {/*<Link to={{*/}
                    {/*  pathname: "/zo/zo-gallery",*/}
                    {/*  query: {*/}
                    {/*    artists: 1*/}
                    {/*  },*/}
                    {/*}}>More artists...</Link>*/}
                  </span>
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
          </>
      }
    </div>
  );
}

function mapStateToProps(state) {
  // console.log("check state", state);
  return {
    music: state.nekoMusic,
  };
}

export default connect(mapStateToProps)(topPage);

