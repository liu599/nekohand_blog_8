import React, {useEffect} from "react";
React.useLayoutEffect = React.useEffect
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { convertTimeStamp } from "../../utils/array";
import styles from './articleBody.less'
import {
  Link,
  connect,
  getLocale,
  setLocale,
  useIntl,
  history,
  Helmet,
} from 'umi';

import {useSelector,useDispatch} from 'dva';
import Loading from '../../components/pageLoading/loading'

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: '32px'
  },
});

const queryString = require('query-string');

function Post(props) {

  let {data} = props;

  const {loading,nekohandBlog} = useSelector(stores => ({
    loading: stores.loading,
    nekohandBlog: stores.loading,
  }))

  function fetchPost(){
    const parsed = queryString.parse(props.history.location.search);
    console.log(props, parsed, "parsed");
    props.dispatch({
      type: 'nekohandBlog/fetchAPost',
      payload: {
        urlTag: 'nekohandBlog.post',
        urlOption: {
          suffix: parsed.id,
        },
        queryData: {},
      }
    })
  }

  function createBody() { return {__html: data.currentPost.body}; };

  useEffect(() => {
    fetchPost();
    console.log('mount it!');
  }, []);


  const classes = useStyles();

  return (
    <div className={classes.root}>
      {loading.effects["nekohandBlog/fetchAPost"]
        ? <Loading />
        : <>
          <Typography variant="h4" gutterBottom>
            {data.currentPost.title}
          </Typography>
          <Typography variant="h6" gutterBottom paragraph>
            {convertTimeStamp(data.currentPost.createdAt)}, published by Tokei, &nbsp;
            <Link to={`/nekohand/blog`}>
              Return
            </Link>
          </Typography>
          {/* <Typography variant="h5" gutterBottom>
        {data.currentPost.title}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {data.currentPost.title}
      </Typography>*/}
          <div className={styles.articleBody} dangerouslySetInnerHTML={createBody()} />
        </>}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    data: state.nekohandBlog,
  };
}

export default connect(mapStateToProps)(Post);
