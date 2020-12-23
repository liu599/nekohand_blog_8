import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {
  Link,
  connect,
  getLocale,
  setLocale,
  useIntl,
  history,
  Helmet,
} from 'umi';

const queryString = require('query-string');

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    minWidth: 600,
    width: 600,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationControlled(props) {
  const pager = props.pager;
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  let count = 1;
  const handleChange = (event, value) => {
    setPage(value);
    console.log("handle change", window.location);
    let query = queryString.parse(window.location.search);
    // query.hasOwnProperty = Object.hasOwnProperty;
    query.pn = value;
    history.push({
      pathname: '/nekohand/blog',
      query,
    });
  };

  // useEffect(() => {
  //   console.log('mount pager!');
  // }, []);

  // useEffect(() => {
  //   count = Math.floor(pager.total/pager.pageSize)
  //   console.log(pager, count);
  //   setPage(pager.pageNum);
  //   console.log('change pager!');
  // }, [pager]);

  return (
    <div className={classes.root}>
      { pager.pageNum && <Pagination count={Math.ceil(pager.total/pager.pageSize)}
                    page={pager.pageNum}
                    showFirstButton
                    showLastButton
                    variant="outlined"
                    color="secondary"
                    onChange={handleChange} />}
    </div>
  );
}
