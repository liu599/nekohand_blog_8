import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DefaultList from '../../components/musicListDefault';
import CardGallery from '../../components/gallery/gallery';
import MusicInfoTable from '../../components/musicInfoTable'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';



const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: 64,
  },
});

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

export default function() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1} style={{paddingBottom: 42}}>
        <Grid item lg={12}>
          <Grid container justify="flex-start">
            <Grid item lg={6}>
              <GridList cellHeight={240} cols={5}>
                <GridListTile key="0345" cols={2}>
                  <img style={{width: 238, height: 238, padding: 1, border: "1px solid red", boxShadow: "1px 1px 3px #9e9e9e"}}
                       src="https://file.ecs32.top/data%2Fmusic%2FArtist%2FInoriMinase%2F%5B2019.04.10%5DCatch%20the%20Rainbow%21%2Fcover.jpg" alt=""/>
                </GridListTile>
                <GridListTile key="0348" cols={3} style={{paddingLeft: 12}}>
                  <Typography color="primary" variant="h5">
                    Catch the Rainbow！
                  </Typography>
                  <Typography variant="subtitle1">
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
            <Grid item lg={4}>
              Lrc
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <DefaultList />
      <Typography variant="h6" gutterBottom paragraph style={{marginTop: 32}}>
        Related Music
      </Typography>
      <CardGallery  data={mockData}/>
    </div>
  )
}
