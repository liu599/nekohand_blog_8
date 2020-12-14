import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";

const artistData = [
  {
    name: "寺川爱美",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
    desc: "声优歌手",
    id: 1,
    song: 30,
  },
  {
    name: "水濑祈",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
    desc: "声优歌手",
    id: 2,
    song: 30,
  },
  {
    name: "内田真礼",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
    desc: "声优歌手",
    id: 11,
    song: 30,
  },
  {
    name: "伊藤美来",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
    desc: "声优歌手",
    id: 10,
    song: 30,
  },
  {
    name: "TrySail",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
    desc: "声优组合",
    id: 9,
    song: 30,
  },
  {
    name: "Poppin'Party",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
    desc: "声优女子乐团",
    id: 6,
    song: 30,
  },
  {
    name: "Peaky P-key",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
    id: 4,
    desc: "声优女子DJ组合",
    song: 30,
  },
  {
    name: "小仓唯",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
    id: 5,
    desc: "声优歌手",
    song: 30,
  }
]

import { Column, Row, Item } from '@mui-treasury/components/flex';


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
                      {item.name}
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
