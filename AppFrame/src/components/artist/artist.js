import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";
import {
  Link,
} from 'umi';

const artistData = [
  {
    name: "愛美",
    avatar: require("./aimi.jpg"),
    desc: "声优歌手",
    search: "Aimi",
    id: 1,
    song: 30,
  },
  {
    name: "水濑祈",
    avatar: require("./inori.jpg"),
    desc: "声优歌手",
    search: "水濑祈",
    id: 2,
    song: 30,
  },
  {
    name: "結束バンド",
    avatar: "https://file.ecs32.top/data/music/Artist/KessokuBand/[2022.12.25] フルアルバム「結束バンド」/cover.jpg",
    desc: "声优组合",
    search: "KessokuBand",
    id: 10,
    song: 30,
  },
  {
    name: "Hoyo-Mix",
    avatar: "https://file.ecs32.top/data/music/Artist/HoyoMix/[2022.01.26] The Stellar Moments Vol. 2/cover.jpg",
    id: 5,
    search: "HoyoMix",
    desc: "米哈游旗下游戏音乐团队",
    song: 30,
  }
]


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: "0 auto",
  },
}));


export default function NestedGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item lg={12} spacing={1} style={{padding: 32}}>
          {
            artistData.map(item => {
              return (
                <Grid item xs={3} key={item.id} style={{padding: 16}} >
                    <Avatar
                      alt={item.name}
                      src={item.avatar}
                      className={classes.large}
                      style={{width: 90, height: 90}} />
                    <Typography  variant={"h6"} align={"center"} style={{marginBottom: 4, marginTop: 10}}>
                      <Link to={{
                        pathname: '/zo/zo',
                        query: {
                          art: item.id,
                          search: encodeURIComponent(item.search),
                        }
                      }} >{item.name}</Link>
                    </Typography>
                    <Typography variant={"subtitle2"} paragraph align={"center"}>
                      {item.desc}
                    </Typography>
                </Grid>
              )
            })
          }
        </Grid>
      </Grid>
    </div>
  );
}
