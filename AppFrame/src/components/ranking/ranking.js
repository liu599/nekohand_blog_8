import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Column, Row, Item } from '@mui-treasury/components/flex';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rank: {
    marginRight: 24,
    textAlign: 'center',
    width: 24,
    display: 'inline-block',
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main
  },
  rankNumber: {
    display: 'inline-block',
    textAlign: 'center',
    marginRight: 24,
    width: 24,
  },
  rankTitle: {
    display: 'inline-block',
    textAlign: 'left',
    overflow:"hidden",
    textOverflow:"ellipsis",
    whiteSpace:"nowrap",
    width: 200,
  },
  rankInfo: {
    display: 'inline-block',
    textAlign: 'right',
  }
}));

const data = [
  {
    title: "BanG Dream Set List Digest 1",
    song: 20,
    cover: "https://blog.ecs32.top/static/004MwxDlgy1g5vymokkpkj30rw0ietc9.jpg",
    score: "120",
  },
  {
    title: "BanG Dream Set List Digest 2",
    song: 20,
    cover: "https://blog.ecs32.top/static/004MwxDlgy1g5vymokkpkj30rw0ietc9.jpg",
    score: "110",
  },
  {
    title: "BanG Dream Set List Digest 3",
    song: 20,
    cover: "https://blog.ecs32.top/static/004MwxDlgy1g5vymokkpkj30rw0ietc9.jpg",
    score: "100",
  },
  {
    title: "BanG Dream Set List Digest 4",
    song: 20,
    cover: "https://blog.ecs32.top/static/004MwxDlgy1g5vymokkpkj30rw0ietc9.jpg",
    score: "90",
  },
  {
    title: "BanG Dream Set List Digest 5",
    song: 20,
    cover: "https://blog.ecs32.top/static/004MwxDlgy1g5vymokkpkj30rw0ietc9.jpg",
    score: "80",
  },
  {
    title: "Seiyuu Set List Digest 1",
    song: 100,
    cover: "https://blog.ecs32.top/static/004MwxDlgy1g5vymokkpkj30rw0ietc9.jpg",
    score: "70",
  },
  {
    title: "Seiyuu Set List Digest 2",
    song: 100,
    cover: "https://blog.ecs32.top/static/004MwxDlgy1g5vymokkpkj30rw0ietc9.jpg",
    score: "60",
  },
  {
    title: "Seiyuu Set List Digest 3",
    song: 100,
    cover: "https://blog.ecs32.top/static/004MwxDlgy1g5vymokkpkj30rw0ietc9.jpg",
    score: "50",
  },
  {
    title: "Seiyuu Set List Digest 4",
    song: 100,
    cover: "https://blog.ecs32.top/static/004MwxDlgy1g5vymokkpkj30rw0ietc9.jpg",
    score: "40",
  },
  {
    title: "Seiyuu Set List Digest 5",
    song: 10,
    cover: "https://blog.ecs32.top/static/004MwxDlgy1g5vymokkpkj30rw0ietc9.jpg",
    score: "30",
  }
]

export default function Ranking() {
  const classes = useStyles();
  return (
    <>
      <Column gap={1} width={'100%'} className={classes.root}>
        {data && data.map((item, ix) => {
          return (
            <Row mt={2} key={ix} align-items={"flex-end"} >
              <Item>
                <Typography variant="body1">
                  <span className={ix < 3 ? classes.rank : classes.rankNumber}>{ix+1}</span>
                </Typography>
              </Item>
              <Item style={{flex: 1}}>
                <Typography variant="body1">
                  <span className={classes.rankTitle}>{item.title}</span>
                </Typography>
              </Item>
              <Item>
                <Typography variant="caption" className={classes.rankInfo}>
                  <span>{item.score}{","}&nbsp;</span>
                  <span>{item.song}</span>
                </Typography>
              </Item>
            </Row>
          )
        })}

      </Column>
    </>
  )
}
