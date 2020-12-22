import React, {useEffect, useState} from "react";
import lodash from 'lodash';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ArtistList from '../../components/musicArtist';
import ArlbumList from '../../components/musicAlbum';
import CardGallery from '../../components/gallery/gallery';
import MusicInfoTable from '../../components/musicInfoTable'

import MusicInfoTabs from '../../components/musicInfoTabs'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import Chip from '@material-ui/core/Chip';

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

function createTableData(item, desc) {
  return { item, desc };
}

function createArtistData(FileNo, name, album, quality, issueDate) {
  return { FileNo, name, album, quality, issueDate };
}

function makeArtistTable(renderData) {
  let quality = "MP3"
  let {FileNo, name, album, issueDate} = renderData;
  album = `《${album}》`;
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

function Zo(props) {
  const classes = useStyles();
  const [artist, setArtist] = useState("default");
  const [album, setAlbum] = useState("default");
  const [renderData, setRenderData] = useState([]);

  function updateData() {
    const parsed = queryString.parse(props.history.location.search);
    parsed.hasOwnProperty = Object.hasOwnProperty;
    let searchKeyName = decodeURIComponent(parsed.search);
    let searchResult = [];
    if(parsed.hasOwnProperty("art")) {
      setArtist(parsed.art);
      searchResult = findKeyNameInArray("artist", searchKeyName, props.music.artists)
      setRenderData(searchResult)
    }
    if(parsed.hasOwnProperty("alb")) {
      setAlbum(parsed.alb);
      searchResult = findKeyNameInArray("album", searchKeyName, props.music.albums)
      console.log("search result", searchResult)
      setRenderData(searchResult)
    }
  }

  function makeTableData(lg) {
    return [
      createTableData('収録曲数', `全${lg}曲`),
    ]
  }




  function selectRandomMusic(audioList) {
    let tmp = lodash.cloneDeep(audioList);
    if (audioList.length > 12) {
      return shuffleArray(tmp).slice(0, 12);
    }
    return shuffleArray(tmp);
  }

  useEffect(() => {
    setArtist("default");
    setAlbum("default");
    updateData();
    console.log('history change', renderData);
  }, [props.history.location.search]);

  return (
    <div className={classes.root}>
      {album !== "default" &&
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
                        {renderData.album}
                      </Typography>
                      <Typography variant="subtitle1" paragraph>
                        Album
                      </Typography>
                      <MusicInfoTable data={makeTableData(renderData.audioList.length+1)} />
                    </GridListTile>
                  </GridList>
                  <Typography variant="h6" paragraph style={{marginTop: 32}}>
                    作品紹介
                  </Typography>
                  <Typography variant="body1" paragraph>
                    抜群の歌唱力と可憐なビジュアルで今最も注目を集める人気声優でシンガーの水瀬いのりがファン
                    待望の3rdアルバムをリリース!スマートフォンゲーム『ゲシュタルト・オーディン』
                    主題歌の6thシングル「TRUST IN ETERNITY」、TVアニメ『えんどろ~!』エンディングテーマの7thシングル「Wonder Caravan!」他、収録。
                  </Typography>
                </Grid>
                <Grid item lg={4} style={{position: "relative",
                  maxHeight: 500}}>
                  <MusicInfoTabs album />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Typography variant="h6" paragraph style={{marginTop: 32}}>
            Content
          </Typography>
          <ArlbumList  data={makeArtistWholeTable(renderData)} />
        </>
      }
      {artist !== "default" &&
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
                        {renderData.artist}
                      </Typography>
                      <Typography variant="subtitle1" paragraph>
                        Artist
                      </Typography>
                      <MusicInfoTable data={makeTableData(renderData.audioList.length+1)} />
                    </GridListTile>
                  </GridList>
                  <Typography variant="h6" paragraph style={{marginTop: 32}}>
                    相关歌手
                  </Typography>
                  <div className={classes.chipContainer}>
                    <Chip color="primary" label="XX" />
                    <Chip color="primary" label="XXXX" />
                    <Chip color="primary" label="XXXXXX" />
                    <Chip color="primary" label="XXXXXXX" />
                  </div>

                </Grid>
                <Grid item lg={4} style={{position: "relative",
                  maxHeight: 500}}>
                  <MusicInfoTabs artist />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Typography variant="h6" paragraph style={{marginTop: 32}}>
            Content
          </Typography>
          <ArtistList data={makeArtistWholeTable(renderData)} />
        </>
      }
      {(artist !== "default" || album !== "default") &&
        <>
          <Typography variant="h6" paragraph style={{marginTop: 32}}>
            Other Music
          </Typography>
          <CardGallery  data={selectRandomMusic(props.music.albums)}/>
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

export default connect(mapStateToProps)(Zo);
