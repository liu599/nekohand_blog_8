import React, {useEffect, useState} from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector,useDispatch} from 'dva';
import Loading from "../components/pageLoading/loading";
import ListWidgetStyles from './friends.less';
import {
  Link,
  connect,
  getLocale,
  setLocale,
  useIntl,
  history,
  Helmet,
} from 'umi';


const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: 64,
    marginBottom: 64,
  },
});

export default function Bookmarks() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [data, setData] = useState({});

  function fetchFav() {
    dispatch({
      type: 'nekoMusic/fetchFavs',
      payload: {
        urlTag: 'nekohandBlog.favorites',
      }
    })
  }

  const {loading, nekoMusic} = useSelector(stores => ({
    loading: stores.loading,
    nekoMusic: stores.nekoMusic.favs.content,
  }))

  useEffect(() => {
    fetchFav();
    console.log(nekoMusic, "NEKO");
    // console.log('mount it!');
  }, []);

  useEffect(() => {
    setData(nekoMusic)
    console.log('change', nekoMusic);
  }, [nekoMusic]);

  if (loading.effects["nekoMusic/fetchFavs"] ) {
    return (
      <div className={classes.root}>
        <Loading />
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom paragraph>
        Bookmarks Collection
      </Typography>
      {nekoMusic &&
      nekoMusic.map((item, indx) => {
          return (
            <div className={ListWidgetStyles.widget} key={`${indx}-sf`}>
              <div className={ListWidgetStyles.widgetHead}  key={`${indx}-sfh`}>
                <h2>{item.category}</h2>
              </div>
              <div className={ListWidgetStyles.widgetContent} key={`${indx}-sfc`}>
                <ul>
                {
                  item.links && item.links.map((sd, index) => {
                      return (
                          <li key={`${index}-es`}>
                            <a
                              href={sd.link}
                              title={sd.title}
                              target='_blank'>
                              {sd.title}
                            </a>
                          </li>

                      );
                  })
                }
                </ul>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}
