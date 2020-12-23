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
    name: "BanG Dream! Girls Band Party Cover Songs",
    avatar: "https://file.ecs32.top/data/music/B/G_Cover/[2018.06.27]%20%E3%83%90%E3%83%B3%E3%83%89%E3%83%AA!%20%E3%82%AC%E3%83%BC%E3%83%AB%E3%82%BA%E3%83%90%E3%83%B3%E3%83%89%E3%83%91%E3%83%BC%E3%83%86%E3%82%A3!%20%E3%82%AB%E3%83%90%E3%83%BC%E3%82%B3%E3%83%AC%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%20Vol.%201/cover.jpg",
    desc: "Various",
    search: "BanG Dream! Girls Band Party Cover Songs",
    id: 11,
    song: 30,
  },
  {
    name: "Pastel*Palettes",
    avatar: "https://file.ecs32.top/data/music/B/E_PP/[2017.07.12]%20%E3%81%97%E3%82%85%E3%82%8F%E3%82%8A%E3%82%93%E2%98%86%E3%81%A9%E3%82%8A~%E3%81%BF%E3%82%93/cover.jpg",
    desc: "声优女子乐团",
    search: "Pastel*Palettes",
    id: 10,
    song: 30,
  },
  {
    name: "TrySail",
    avatar: "https://file.ecs32.top/data/music/Artist/TrySail/[20200311]TV%E3%82%A2%E3%83%8B%E3%83%A1%E3%80%8E%E3%83%9E%E3%82%AE%E3%82%A2%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%89%20%E9%AD%94%E6%B3%95%E5%B0%91%E5%A5%B3%E3%81%BE%E3%81%A9%E3%81%8B%E2%98%86%E3%83%9E%E3%82%AE%E3%82%AB%E5%A4%96%E4%BC%9D%E3%80%8FOP%E3%83%86%E3%83%BC%E3%83%9E%E3%80%8C%E3%81%94%E3%81%BE%E3%81%8B%E3%81%97%EF%BC%8F%E3%81%86%E3%81%A4%E3%82%8D%E3%81%84%E3%80%8D/cover.jpg",
    desc: "声优组合",
    search: "TrySail",
    id: 9,
    song: 30,
  },
  {
    name: "Poppin'Party",
    avatar: "https://file.ecs32.top/data/music/B/A_PPP/[2018.10.03]%20%E3%82%AC%E3%83%BC%E3%83%AB%E3%82%BA%E3%82%B3%E3%83%BC%E3%83%89/cover.jpg",
    desc: "声优女子乐团",
    search: "Poppin'Party",
    id: 6,
    song: 30,
  },
  {
    name: "RAISE A SUILEN",
    avatar: "https://file.ecs32.top/data/music/B/H_RAS/[2019.06.19]%20Invincible%20Fighter/cover.jpg",
    id: 4,
    search: "RAISE A SUILEN",
    desc: "声优女子乐团",
    song: 30,
  },
  {
    name: "偶像大师 Million Live",
    avatar: "https://file.ecs32.top/data/music/M/[2014-2016]%20MILLION%20RADIO/[2014-2016]%20MILLION%20RADIO/[2015.08.26]%20MILLION%20RADIO!%20DJCD%20Vol.01/cover.jpg",
    id: 5,
    search: "Million Stars from Idol M@Ster",
    desc: "声优歌手",
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
