import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import {
  Info,
  InfoTitle,
  InfoSubtitle,
  InfoCaption,
} from '@mui-treasury/components/info';
import { useGrowAvatarStyles } from '@mui-treasury/styles/avatar/grow';
import { useMusicInfoStyles } from '@mui-treasury/styles/info/music';

const useStyles = makeStyles(() => ({
  text: {
    display: 'flex',
    alignItems: 'center',
    '& > svg': {
      fontSize: 18,
      color: '#888',
      marginRight: 4,
    },
  },
}));

const MusicListItemDemo = React.memo(function MusicListItem() {
  const commonProps = {
    blur: '1px',
    radius: 10,
    size: 90,
    opacity: 0.7,
  };
  const src = require('./0017492695.200.jpg');
  const avatarStyles = useGrowAvatarStyles({ src, ...commonProps });
  const src2 = require('./0017412458.200.jpg');
  const avatarStyles2 = useGrowAvatarStyles({ src: src2, ...commonProps });
  const styles = useStyles();
  return (
    <>
      <Column gap={4} width={'100%'}>
        <Row mt={2}>
          <Item>
            <div className={avatarStyles.root}>
              <Avatar src={src} />
            </div>
          </Item>
          <Info useStyles={useMusicInfoStyles} minWidth={0}>
            <InfoTitle>Markup 01</InfoTitle>
            <InfoSubtitle>High Frequency</InfoSubtitle>
          </Info>
          <Item position={'right'}>
            <IconButton size={'small'}>
              <MoreHoriz />
            </IconButton>
          </Item>
        </Row>
        <Row mt={2}>
          <Item>
            <div className={avatarStyles2.root}>
              <Avatar src={src2} />
            </div>
          </Item>
          <Info useStyles={useMusicInfoStyles} minWidth={0}>
            <InfoTitle>Markup 02</InfoTitle>
            <InfoSubtitle>Million Stars</InfoSubtitle>
            {/*<InfoCaption className={styles.text}>*/}
            {/*  <PlayCircleFilled /> playing...*/}
            {/*</InfoCaption>*/}
          </Info>
          <Item position={'right'}>
            <IconButton size={'small'}>
              <MoreHoriz />
            </IconButton>
          </Item>
        </Row>


      </Column>
    </>
  );
});

export default MusicListItemDemo;
