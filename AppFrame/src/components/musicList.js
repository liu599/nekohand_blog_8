import React, {useEffect, useState} from 'react';
React.useLayoutEffect = React.useEffect
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

import {useSelector,useDispatch} from 'dva';
import {
  Link,
  connect,
  getLocale,
  setLocale,
  useIntl,
  history,
  Helmet,
} from 'umi';

const columns = [
  { id: 'FileNo', label: 'No.', maxWidth: 60 },
  {
    id: 'name',
    label: 'Name', maxWidth: 60,
    align: 'center' },
  {
    id: 'album',
    label: 'Album',
    minWidth: 100,
    align: 'center',
    format: (value) => {
      return (<Link to={{
        pathname: "/zo/zo",
        query: {
          alb: 1,
          search: encodeURIComponent(value),
        }
      }}>{`《${value}》`}</Link>)
    },
  },
  {
    id: 'quality',
    label: 'Quality',
    maxWidth: 60,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'issueDate',
    label: 'Issue Date',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
];


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 500,
    Height: 500,
    minHeight: 300,
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function MusicInfo(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();

  useEffect(() => {
    setPage(0);
    setRowsPerPage(10);
  }, [props.data])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const addListHandler = (data) => {
    dispatch({
      payload: {
        FileNo: data.FileNo,
      },
      type: "nekoMusic/addCache",
    })
  }

  const deleteListHandler = (data) => {
    dispatch({
      payload: {
        FileNo: data.FileNo,
      },
      type: "nekoMusic/deleteCache",
    })
  }

  const checkAddHandler = (data) => {
    return !props.selected.includes(data.FileNo);
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table
          stickyHeader
          aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                key="Manu"
                align="center"
                style={{ minWidth: 120 }}
              >
                Operation
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data && props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.FileNo}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  <TableCell align={"right"}>
                    <div className={classes.btnGroup}>
                      <ButtonGroup  variant="text" color="primary"  aria-label="text primary button group">
                        {checkAddHandler(row) ?
                          <Button onClick={() => addListHandler(row)} >
                            <FavoriteBorderOutlinedIcon/>
                          </Button>
                          : <Button color={"secondary"} onClick={() => deleteListHandler(row)}>
                            <FavoriteOutlinedIcon />
                          </Button>
                        }
                      </ButtonGroup>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
