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

const isExternalLink = (linkString) => {
  return linkString && linkString.includes('http')
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: 64,
    marginBottom: 64,
  },
});

export default function Friends() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [data, setData] = useState({});

  function fetchFav() {
    dispatch({
      type: 'nekoMusic/fetchLinks',
      payload: {
        urlTag: 'nekohandBlog.friends',
      }
    })
  }



  const {loading, nekoMusic} = useSelector(stores => ({
    loading: stores.loading,
    nekoMusic: stores.nekoMusic.links,
  }))

  useEffect(() => {
    fetchFav();
    // console.log(nekoMusic, "NEKO");
    // console.log('mount it!');
  }, []);

  useEffect(() => {
    setData(nekoMusic)
    // console.log('change', nekoMusic);
  }, [nekoMusic]);

  if (loading.effects["nekoMusic/fetchLinks"] ) {
    return (
      <div className={classes.root}>
        <Loading />
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom paragraph>
        Friend links are listed here. Thanks.
      </Typography>
      {nekoMusic.length > 0 &&
      nekoMusic.map((item, indx) => {
          return (
            <div className={ListWidgetStyles.widget} key={`${indx}-sf`}>
              <div className={ListWidgetStyles.widgetHead}  key={`${indx}-sfh`}>
                <h2>{item.title}</h2>
              </div>
              <div className={ListWidgetStyles.widgetContent} key={`${indx}-sfc`}>
                <ul>
                {
                  item.data && item.data.map((sd, index) => {
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
