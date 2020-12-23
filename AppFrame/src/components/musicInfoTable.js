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


export default function BasicTable(props) {
  const classes = useStyles();
  const {data} = props

  return (
    <TableContainer>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableBody>
          {data && data.map((row) => (
            <TableRow key={row.item}>
              <TableCell component="th" scope="row">
                {row.item}
              </TableCell>
              <TableCell align="right">
                {row.desc}
              </TableCell>
            </TableRow>
          ))}
          <TableRow key={"star"}>
            <TableCell component="th" scope="row">
              评价
            </TableCell>
            <TableCell align="right">
              <StarIcon style={{size: "0.875rem"}}/>
              <StarIcon style={{size: "0.875rem"}} />
              <StarIcon  style={{size: "0.875rem"}}/>
              <StarIcon style={{size: "0.875rem"}}/>
              <StarIcon  style={{size: "0.875rem"}} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
