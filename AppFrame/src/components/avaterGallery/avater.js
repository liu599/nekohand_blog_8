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
    song: 30,
  },
  {
    name: "水濑祈",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
    song: 30,
  },
  {
    name: "内田真礼",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
    song: 30,
  },
  {
    name: "伊藤美来",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
    song: 30,
  },
  {
    name: "Roselia",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
    song: 30,
  },
  {
    name: "Poppin'Party",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
    song: 30,
  },
  {
    name: "PeakyPeaky",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
    song: 30,
  },
  {
    name: "小仓唯",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
    song: 30,
  },
  {
    name: "虹咲同好会",
    avatar: "https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg",
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
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));


export default function NestedGrid() {
  const classes = useStyles();

  function FormRow() {
    return (
      <React.Fragment>
        {
          artistData.map(item => {
            return (
              <Grid item xs={2} key={item.name}>
                <Badge badgeContent={item.song} color="primary">
                  <Avatar alt={item.name} src={item.avatar} className={classes.large} />
                  <Typography variant="h6" gutterBottom>
                    {item.name}
                  </Typography>
                </Badge>
              </Grid>
            )
          })
        }
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item lg={12} spacing={1}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}
