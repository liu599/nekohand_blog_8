import React, {useEffect} from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: '32px'
  },
});

const queryString = require('query-string');

function Blog(props) {
  const classes = useStyles();

  let {data, location} = props;
  console.log(location);

  function fetchPosts() {
    const parsed = queryString.parse(props.history.location.search);
    // console.log(parsed);
    parsed.hasOwnProperty = Object.hasOwnProperty;
    if (!parsed.hasOwnProperty("pn")) {
      parsed.pn = 1
    }

    props.dispatch({
      type: 'nekohandBlog/fetchPosts',
      payload: {
        urlTag: 'nekohandBlog.posts',
        urlOption: {},
        queryData: {
          pageNumber: parsed.pn,
          pageSize: 10,
        },
      }
    })
  }


  useEffect(() => {
    fetchPosts();
    console.log('search change!');
  }, [props.history.location.search]);

  useEffect(() => {
    fetchPosts();
    console.log('mount it!');
  }, []);

  return  <div className={classes.root}>
    <Typography variant="h4" gutterBottom>
      Posts
    </Typography>
    {props.data &&
      <TopPage {...props.data} />
    }
    {(props.data && props.data.pager) &&
      <div style={{textAlign: "center"}}>
        <Pagination pager={props.data.pager} />
      </div>
    }
  </div>
}

function mapStateToProps(state) {
  console.log("state", state);
  return {
    data: state.nekohandBlog,
  };
}

export default connect(mapStateToProps)(Blog);
