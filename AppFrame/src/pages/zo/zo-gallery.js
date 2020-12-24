import React, {useEffect, useState} from "react";
import {useSelector,useDispatch} from 'dva';
import {makeStyles} from "@material-ui/core/styles";
import Gallery from "../../components/pictureGallery/picGallery"
import Loading from '../../components/pageLoading/loading'
import Pagination from '../../components/pagination'
const queryString = require('query-string');
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: 64,
  }
}));
import {
  Link,
  connect,
  getLocale,
  setLocale,
  useIntl,
  history,
  Helmet,
} from 'umi';
import Typography from "@material-ui/core/Typography";
const zoGallery = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pictures = useSelector(state => state.nekoPicture);
  const music = useSelector(state => state.nekoMusic);
  const loadingEffect = useSelector(state =>state.loading);
  const loading = loadingEffect.effects["nekoPicture/fetchPictures"];
  const [data, setData] = useState([])
  const [pager, setPager] = useState({})
  const [pageHeader, setPageHeader] = useState("Aimi Gallery")

  useEffect(() => {
    const parsed = queryString.parse(history.location.search);
    parsed.hasOwnProperty = Object.hasOwnProperty;
    if (parsed.hasOwnProperty("tagid")) {
      setPageHeader("Aimi Gallery")
      dispatch({
        type: "nekoPicture/fetchPictures",
        payload: {
          urlTag: 'nekohandBlog.aimiPic',
          queryData: {
            tagid: parsed.tagid,
            pagenum: parsed.pn,
            pagesize: parsed.pagesize,
          },
        }
      })
    }
    if (parsed.hasOwnProperty("albums")) {
      setPageHeader("Album Gallery")
      setData([]);
    }
    if (parsed.hasOwnProperty("artists")) {
      setPageHeader("Artists Gallery")
    }

  }, [history.location.search])

  useEffect(() => {
    if(pictures.hasOwnProperty("aimi")) {
      setData(pictures.aimi);
      setPager(pictures.pager);
    }
  }, [pictures])

  useEffect(() => {
    if(music.hasOwnProperty("albums")) {
      let ret = [];
      music.albums.forEach(item => {
        ret.push({
          src: item.cover,
          name: item.album,
          fileId: item.fileId,
          width: 200,
          height: 200,
        })
      })
      setData(ret);
      setPager({});
    }
  }, [music])

  if (loading) {
    return <div className={classes.root}><Loading /></div>
  }

  return (
    <div className={classes.root}>
      <div>
        <Typography color="primary" variant="h3">
          {pageHeader}
        </Typography>
        {( data && data.length > 0 ) && <Gallery info={data} />}
        <div style={{display: "flex", alignItems: "center", justifyItems: "center"}}>
          {pager && <Pagination pager={pager}/>}
        </div>
      </div>
    </div>
  )
}

export default zoGallery;
