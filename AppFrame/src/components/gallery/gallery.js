import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: 450,
    transform: 'translateZ(0)',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));



export default function TitlebarGridList(props) {
  const classes = useStyles();
  console.log(props, "ddd");

  return (
    <div className={classes.root}>
      <GridList cellHeight={180}  spacing={12} cols={6} className={classes.gridList}>
        {props.data && props.data.slice(0, 12).map((tile) => (
          <GridListTile key={tile.fileId}>
            <img src={tile.cover} alt={tile.album} />
            <GridListTileBar
              title={tile.album}
              subtitle={<span>by: {tile.artist}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${tile.album}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}



