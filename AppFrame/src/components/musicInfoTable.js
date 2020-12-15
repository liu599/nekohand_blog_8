import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
});

function createData(name, calories) {
  return { name, calories };
}

const rows = [
  createData('レーベル', "KING RECORDS"),
  createData('配信開始日', "2019.04.10"),
  createData('収録曲数', "全12曲"),
  createData('収録時間', "56:12"),
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
            </TableRow>
          ))}
          <TableRow key={"star"}>
            <TableCell component="th" scope="row">
              评价
            </TableCell>
            <TableCell align="right">
              <StarIcon style={{size: "0.875rem"}}/><StarIcon style={{size: "0.875rem"}} />
              <StarIcon  style={{size: "0.875rem"}}/><StarIcon style={{size: "0.875rem"}}/>
              <StarIcon  style={{size: "0.875rem"}} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
