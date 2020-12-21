import React, {useEffect, useState} from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DefaultList from '../../components/musicListDefault';
import CardGallery from '../../components/gallery/gallery';
import MusicInfoTable from '../../components/musicInfoTable'

import MusicInfoTabs from '../../components/musicInfoTabs'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import Chip from '@material-ui/core/Chip';

import {findKeyNameInArray} from '../../utils/array';

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

const mockData = [{
  FileNo: 1470,
  album: " MILLION THE@TER GENERATION 17 STAR ELEMENTS",
  artist: "Million Stars from Idol M@Ster",
  cover: "https://file.ecs32.top/data/music/M/[2017-2019] MILLION THE@TER GENERATION/[2019.05.29] MILLION THE@TER GENERATION 17 STAR ELEMENTS/cover.jpg",
  createdAt: 0,
  fileId: "5e11f04658adfe35dea8b555",
  filetype: "mp3",
  issueDate: "2019.05.29",
  lrc: null,
  modifiedAt: 0,
  name: "01. Episode. Tiara",
  url: "https://file.ecs32.top/data/music/M/[2017-2019] MILLION THE@TER GENERATION/[2019.05.29] MILLION THE@TER GENERATION 17 STAR ELEMENTS/5e11f04658adfe35dea8b555__01. Episode. Tiara.mp3",
}];

function Zo(props) {
  const classes = useStyles();
  const [artist, setArtist] = useState("default");
  const [album, setAlbum] = useState("default");
  const [search, setSearchString] = useState("default");
  const [renderData, setRenderData] = useState([]);

  function updateData() {
    const parsed = queryString.parse(props.history.location.search);
    console.log(parsed);
    parsed.hasOwnProperty = Object.hasOwnProperty;
    let searchKeyName = decodeURIComponent(parsed.search);
    let searchResult = [];
    if(parsed.hasOwnProperty("art")) {
      setArtist(parsed.art);
      searchResult = findKeyNameInArray("artist", searchKeyName, props.music.artists)
      setRenderData(searchResult)
      console.log(searchResult, "result")
    }
    if(parsed.hasOwnProperty("alb")) {
      setAlbum(parsed.alb);
      searchResult = findKeyNameInArray("album", searchKeyName, props.music.albums)
      setRenderData(searchResult)
      console.log(searchResult, "result")
    }
    console.log(renderData, "renderData");
  }

  function makeTableData(lg) {
    return [
      createTableData('収録曲数', `全${lg}曲`),
    ]
  }

  useEffect(() => {
    updateData();
    console.log('mount artist!');
  }, []);

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
                      <img style={{width: 298, height: 298, padding: 1, border: "1px solid red", boxShadow: "1px 1px 3px #9e9e9e"}}
                           src="https://file.ecs32.top/data%2Fmusic%2FArtist%2FInoriMinase%2F%5B2019.04.10%5DCatch%20the%20Rainbow%21%2Fcover.jpg" alt=""/>
                    </GridListTile>
                    <GridListTile key="0348" cols={3} style={{paddingLeft: 12}}>
                      <Typography color="primary" variant="h5">
                        Catch the Rainbow！
                      </Typography>
                      <Typography variant="subtitle1" paragraph>
                        水瀬いのり
                      </Typography>
                      <MusicInfoTable />
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
          <DefaultList />
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
          <DefaultList />
        </>
      }
      <Typography variant="h6" paragraph style={{marginTop: 32}}>
        Related Music
      </Typography>
      <CardGallery  data={mockData}/>
    </div>
  )
}

function mapStateToProps(state) {
  console.log("state", state);
  return {
    music: state.nekoMusic,
  };
}

export default connect(mapStateToProps)(Zo);
