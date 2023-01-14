import React, {useEffect, useState} from "react";
import lodash from 'lodash';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ArtistList from '../../components/musicList';
import CardGallery from '../../components/gallery/gallery';
import MusicInfoTable from '../../components/musicInfoTable'

import MusicInfoTabs from '../../components/musicInfoTabs'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import {findKeyNameInArray, shuffleArray} from '../../utils/array';

import {
  Link,
  connect,
  getLocale,
  setLocale,
  useIntl,
  history,
  Helmet,
} from 'umi';

import {useSelector,useDispatch} from 'dva';
import Loading from '../../components/pageLoading/loading'
React.useLayoutEffect = React.useEffect

const queryString = require('query-string');

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 64,
  },
  chipContainer: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  }
}));

const selectRandomMusic = (audioList) => {
  let tmp = lodash.cloneDeep(audioList);
  if (audioList.length > 12) {
    return shuffleArray(tmp).slice(0, 12);
  }
  return shuffleArray(tmp);
}

function createTableData(item, desc) {
  return { item, desc };
}

function createArtistData(FileNo, name, album, quality, issueDate) {
  return { FileNo, name, album, quality, issueDate };
}

function makeArtistTable(renderData) {
  let quality = "MP3"
  let {FileNo, name, album, issueDate} = renderData;
  if (name.includes("HQ")) {
    quality = "HQ-FLAC"
  }
  return [
    createArtistData(FileNo, name, album, quality, issueDate)
  ]
}

function makeArtistWholeTable(renderData) {
  let ret = [];
  let firstItem = makeArtistTable(renderData);
  renderData.audioList.forEach(item => {
    ret = ret.concat(makeArtistTable(item));
  })
  ret = [...firstItem, ...ret];
  return ret;
}

function makeTableData(lg) {
  return [
    createTableData('収録曲数', `収録${lg}曲`),
  ]
}

function Zo(props) {
  const classes = useStyles();
  const [artist, setArtist] = useState("default");
  const [albumData, setAlbumData] = useState([]);
  const [album, setAlbum] = useState("default");
  const [renderData, setRenderData] = useState([]);

  const {loading} = useSelector(stores => ({
    loading: stores.loading,
  }))

  function updateData() {
    console.log("updateData");
    setAlbumData(selectRandomMusic(props.music.albums));
    const parsed = queryString.parse(props.history.location.search);
    parsed.hasOwnProperty = Object.hasOwnProperty;
    let searchKeyName = decodeURIComponent(parsed.search);
    let searchResult = [];
    if(parsed.hasOwnProperty("art")) {
      setArtist(parsed.art);
      searchResult = findKeyNameInArray("artist", searchKeyName, props.music.artists)
    }
    if(parsed.hasOwnProperty("alb")) {
      setAlbum(parsed.alb);
      searchResult = findKeyNameInArray("album", searchKeyName, props.music.albums)
    }
    if (searchResult) {
      setRenderData(searchResult)
    }
  }

  useEffect(() => {
    // console.log(props.music)
    if (props.music.artists.length === 0  && props.music.albums.length === 0 ) {
      history.push("/");
    }
  }, [])

  useEffect(() => {
    console.log("history change", props.history.location.search)
    setArtist("default");
    setAlbum("default");
    updateData();
  }, [props.history.location.search]);

  if (!renderData) {
    return <div className={classes.root}>
      <Loading />
      搜索功能未完成~
    </div>
  }

  return (
    <div className={classes.root}>
      {loading.effects["nekoMusic/fetchMusic"] ? <Loading />
        : <>
              {(album !== "default" || artist !== "default") &&
                <>
                  <Grid container spacing={1} style={{paddingBottom: 42}}>
                    <Grid item lg={12}>
                      <Grid container justify="flex-start">
                        <Grid item lg={8}>
                          <GridList cellHeight={300} cols={5}>
                            <GridListTile key="0345" cols={2}>
                              {renderData.cover &&
                              <img style={{width: 298, height: 298, padding: 1, border: "1px solid red", boxShadow: "1px 1px 3px #9e9e9e"}}
                                   src={renderData.cover} alt=""/>}
                            </GridListTile>
                            <GridListTile key="0348" cols={3} style={{paddingLeft: 12}}>
                              <Typography color="primary" variant="h5">
                                {artist !== "default" ? renderData.artist : renderData.album}
                              </Typography>
                              <Typography variant="subtitle1" paragraph>
                                {artist !== "default" ? "Artist" : "Album"}
                              </Typography>
                              <MusicInfoTable data={makeTableData(renderData.audioList.length+1)} />
                            </GridListTile>
                          </GridList>
                          {/*<Typography variant="h6" paragraph style={{marginTop: 32}}>
                            相关歌手
                          </Typography>
                          <div className={classes.chipContainer}>
                            <Chip color="primary" label="XX" />
                            <Chip color="primary" label="XXXX" />
                            <Chip color="primary" label="XXXXXX" />
                            <Chip color="primary" label="XXXXXXX" />
                          </div>*/}

                        </Grid>
                        <Grid item lg={4} style={{position: "relative",
                          maxHeight: 500}}>
                          {artist !== "default" ? <MusicInfoTabs artist /> : <MusicInfoTabs album />}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Typography variant="h6" paragraph style={{marginTop: 32}}>
                    Content
                  </Typography>
                  <ArtistList data={makeArtistWholeTable(renderData)}
                              selected={props.music.default} />
                  <Typography variant="h6" paragraph style={{marginTop: 32}}>
                    Other Music
                  </Typography>
                  {albumData && <CardGallery  data={albumData}/>}
                  <Typography variant="h6" paragraph style={{marginTop: 64}}>

                  </Typography>
                </>
              }
        </>

      }

    </div>
  )
}

function mapStateToProps(state) {
  return {
    music: state.nekoMusic,
  };
}

Zo.title="Music Hour";

export default connect(mapStateToProps)(Zo);
