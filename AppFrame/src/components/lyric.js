import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  area: {
    overflowY: 'auto',
    height: "100%",
  },
});

export default function LyricArea() {
  const classes = useStyles();
  return (
    <div className={classes.area}>
      Media Player
    </div>
  )
}
