import React, {useEffect, useState} from 'react';
React.useLayoutEffect = React.useEffect
import { makeStyles } from '@material-ui/core/styles';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import Typography from '@material-ui/core/Typography';
import {useSelector,useDispatch} from 'dva';
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

import {
  Link,
} from 'umi';

const findMusicList = (nekoMusic) => {
  let target = nekoMusic.default;
  let storage = nekoMusic.storage;
  let ret = [];
  target.forEach(item => {
    let p = storage.find(music => music.FileNo === item)
    ret.unshift(p);
  })
  while (ret.length > 10) {
    ret.pop()
  }
  console.log(ret, "last")
  return ret;
}

export default function Ranking() {
  const classes = useStyles();
  const [rank, setRank] = useState([173, 174])
  const [rankingData, setRankingData] = useState([{
    album: " Yes! BanG_Dream!",
    issueDate: "2016.02.24",
    name: "01. Yes! BanG_Dream!",
    artist: "Poppin'Party"
  }]);
  const nekoMusic = useSelector(state => state.nekoMusic);
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(nekoMusic)
    dispatch({
      type: "nekoMusic/syncCache"
    })
    if (!nekoMusic.default) {
      console.log("cannot find default list");
      return
    }
    if (nekoMusic.default.length > 0) {
      setRank(nekoMusic.default);
    }
    setRankingData(findMusicList(nekoMusic));
  }, [])


  if (rankingData && rankingData.length < 1) {
    return (
      <>
        <Column gap={1} width={'100%'} className={classes.root}>
          <Row mt={2}  align-items={"flex-end"} >
            <Item>
              <Typography variant="body1" color={"secondary"}>
                Please activate data in this desktop.
              </Typography>
            </Item>
          </Row>
        </Column>
      </>
    )
  }

  return (
    <>
      <Column gap={1} width={'100%'} className={classes.root}>
        {rankingData && rankingData.map((item, ix) => {
          return (
            <Row mt={2} key={ix} align-items={"flex-end"} >
              <Item>
                <Typography variant="body1">
                  <span className={ix < 3 ? classes.rank : classes.rankNumber}>{ix+1}</span>
                </Typography>
              </Item>
              <Item style={{flex: 1}}>
                <Typography variant="body1">
                  <span className={classes.rankTitle}>
                    <Link to={{
                      pathname: "/zo/zo",
                      query: {
                          alb: 1,
                          search: item.album,
                      },
                    }}>
                      {item.name}
                    </Link>
                  </span>
                </Typography>
              </Item>
              <Item>
                <Typography variant="caption" className={classes.rankInfo}>
                  <Link to={{
                    pathname: "/zo/zo",
                    query: {
                      art: 10001,
                      search: item.artist,
                    },
                  }}>
                    <span>{item.issueDate}{","}&nbsp;</span>
                    <span>{item.artist}</span>
                  </Link>
                </Typography>
              </Item>
            </Row>
          )
        })}

      </Column>
    </>
  )
}
