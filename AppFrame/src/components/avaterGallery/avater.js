import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";
import {
  Link,
  connect,
  getLocale,
  setLocale,
  useIntl,
  history,
  Helmet,
} from 'umi';
import { Column, Row, Item } from '@mui-treasury/components/flex';

const artistData = [
  {
    name: "寺川爱美",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
    desc: "声优歌手",
    search: "Aimi",
    id: 1,
    song: 30,
  },
  {
    name: "水濑祈",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
    desc: "声优歌手",
    search: "水濑祈",
    id: 2,
    song: 30,
  },
  {
    name: "BanG Dream! Girls Band Party Cover Songs",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
    desc: "Various",
    search: "BanG Dream! Girls Band Party Cover Songs",
    id: 11,
    song: 30,
  },
  {
    name: "Pastel*Palettes",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
    desc: "声优女子乐团",
    search: "Pastel*Palettes",
    id: 10,
    song: 30,
  },
  {
    name: "TrySail",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
    desc: "声优组合",
    search: "TrySail",
    id: 9,
    song: 30,
  },
  {
    name: "Poppin'Party",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
    desc: "声优女子乐团",
    search: "Poppin'Party",
    id: 6,
    song: 30,
  },
  {
    name: "RAISE A SUILEN",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
    id: 4,
    search: "RAISE A SUILEN",
    desc: "声优女子乐团",
    song: 30,
  },
  {
    name: "偶像大师 Million Live",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
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
                    <Avatar alt={item.name} src={item.avatar} className={classes.large} style={{padding: 8}} />
                    <Typography  variant={"h6"} align={"center"} style={{marginBottom: 4}}>
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
