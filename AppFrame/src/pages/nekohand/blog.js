import React, {useEffect, useState} from "react";
React.useLayoutEffect = React.useEffect
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SentimentVeryDissatisfiedSharpIcon from '@material-ui/icons/SentimentVeryDissatisfiedSharp';
import {
  Link,
  connect,
  getLocale,
  setLocale,
  useIntl,
  history,
  Helmet,
} from 'umi';


import TopPage from "../../components/blog/topPage";
import Pagination from "../../components/pagination";

import {useSelector,useDispatch} from 'dva';
import Loading from '../../components/pageLoading/loading'


const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: '32px'
  },
});

const queryString = require('query-string');

function Blog(props) {
  const classes = useStyles();
  const [cat, setCat] = useState("default")

  const {loading,nekohandBlog} = useSelector(stores => ({
    loading: stores.loading,
    nekohandBlog: stores.loading,
  }))



  function fetchPosts() {
    const parsed = queryString.parse(props.history.location.search);
    let urlOption = {}
    // console.log(parsed);
    parsed.hasOwnProperty = Object.hasOwnProperty;
    if (!parsed.hasOwnProperty("pn")) {
      parsed.pn = 1
    }

    if (parsed.hasOwnProperty("cid")) {
      urlOption.suffix = parsed.cid;
      setCat(parsed.cname);
    }

    if (parsed.hasOwnProperty("t")) {
      setCat(parsed.d);
      props.dispatch({
        type: 'nekohandBlog/fetchPosts',
        payload: {
          urlTag: 'nekohandBlog.postTime',
          urlOption,
          queryData: {
            pageNumber: parsed.pn,
            pageSize: 10,
            t: parseInt(parsed.t,10)/1000,
          },
        }
      })
    } else {
      props.dispatch({
        type: 'nekohandBlog/fetchPosts',
        payload: {
          urlTag: 'nekohandBlog.posts',
          urlOption,
          queryData: {
            pageNumber: parsed.pn,
            pageSize: 10,
          },
        }
      })
    }
  }


  useEffect(() => {
    fetchPosts();
    console.log('search change!');
  }, [props.history.location.search]);

  useEffect(() => {
    fetchPosts();
    console.log('mount it!');
  }, []);

  if (props.data && props.data.posts.length === 0) {
    return (
      <div className={classes.root}>
        <Typography variant="h3" gutterBottom>
          There is no posts here.
          <SentimentVeryDissatisfiedSharpIcon fontSize={"inherit"} />
        </Typography>
      </div>
    )
  }

  return  <div className={classes.root}>
    {loading.effects["nekohandBlog/fetchPosts"] ? <Loading /> :
      <>
        <Typography variant="h4" paragraph style={{marginBottom: 32}} color={"primary"}>
          { cat === "default" ? "Posts" : (cat.includes("-") ? `Posts in ${cat}` : `Posts on Category "${cat}"`)}
        </Typography>
        {props.data &&
          <TopPage {...props.data} />
        }
        {(props.data && props.data.pager) &&
          <div style={{textAlign: "center"}}>
            <Pagination pager={props.data.pager} />
          </div>
        }
      </>
    }
  </div>
}

function mapStateToProps(state) {
  return {
    data: state.nekohandBlog,
  };
}

export default connect(mapStateToProps)(Blog);
