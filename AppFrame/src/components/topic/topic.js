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
    radius: 20,
    size: 60,
    opacity: 0.7,
  };
  const src =
    'https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg';
  const avatarStyles = useGrowAvatarStyles({ src, ...commonProps });
  const src2 =
    'https://blog.ecs32.top/_joy/static/images/author-4de69ef9f0f5014da6b184bcdbfca054.jpg';
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
            <InfoTitle>Money Longer</InfoTitle>
            <InfoSubtitle>Lil Uzi Vert</InfoSubtitle>
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
            <InfoTitle>Wait For You</InfoTitle>
            <InfoSubtitle>Jake Miller</InfoSubtitle>
            <InfoCaption className={styles.text}>
              <PlayCircleFilled /> playing...
            </InfoCaption>
          </Info>
          <Item position={'right'}>
            <IconButton size={'small'}>
              <MoreHoriz />
            </IconButton>
          </Item>
        </Row>
        <Row mt={2}>
          <Item>
            <div className={avatarStyles.root}>
              <Avatar src={src} />
            </div>
          </Item>
          <Info useStyles={useMusicInfoStyles} minWidth={0}>
            <InfoTitle>Money Longer</InfoTitle>
            <InfoSubtitle>Lil Uzi Vert</InfoSubtitle>
          </Info>
          <Item position={'right'}>
            <IconButton size={'small'}>
              <MoreHoriz />
            </IconButton>
          </Item>
        </Row>
        <Row mt={2}>
          <Item>
            <div className={avatarStyles.root}>
              <Avatar src={src} />
            </div>
          </Item>
          <Info useStyles={useMusicInfoStyles} minWidth={0}>
            <InfoTitle>Money Longer</InfoTitle>
            <InfoSubtitle>Lil Uzi Vert</InfoSubtitle>
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
