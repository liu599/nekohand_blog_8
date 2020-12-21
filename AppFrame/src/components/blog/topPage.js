import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { convertTimeStamp } from "../../utils/array";

import { Link } from 'umi';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  timeLineContent: {
    flex: 5
  },
  timeLineItem: {
    height: 135,
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function CustomizedTimeline(props) {
  const classes = useStyles();

  console.log(props, "pppp");

  return (
    <Timeline>
      {props.posts && props.posts.map((item, index) =>
        <TimelineItem key={item.id} className={classes.timeLineItem}>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
              {convertTimeStamp(item.createdAt)}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <LaptopMacIcon />
            </TimelineDot>
            {index !== 9 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent  className={classes.timeLineContent}>
            <Typography variant="h6" component="h1">
              <Link to={`/nekohand/post?id=${item.id}`}>
                {item.title}
              </Link>
            </Typography>
          </TimelineContent>
        </TimelineItem>
      )}
    </Timeline>
  );
}
