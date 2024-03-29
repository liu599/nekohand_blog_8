import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {
  Info,
  InfoCaption,
  InfoSubtitle,
  InfoTitle,
} from '@mui-treasury/components/info';
import { useGalaxyInfoStyles } from '@mui-treasury/styles/info/galaxy';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import {
  Link,
  connect,
  getLocale,
  setLocale,
  useIntl,
  history,
  Helmet,
} from 'umi';


const useStyles = makeStyles(() => ({
  card: {
    borderRadius: '1rem',
    boxShadow: 'none',
    position: 'relative',
    maxWidth: 200,
    width: "100%",
    minHeight: 360,
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '100%',
      height: '64%',
      bottom: 0,
      zIndex: 1,
      background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
    },
  },
  content: {
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    width: '100%',
  },
}));


export default function GalaxyCard() {
  const mediaStyles = useCoverCardMediaStyles({ bgPosition: 'top' });
  const styles = useStyles();
  return (
    <>
      <Card className={styles.card}>
        <CardMedia
          classes={mediaStyles}
          image={
            'https://oss-aimi.ecs32.top/Aimi/3404085C-3979-4710-B006-DF6680C363C5_org.jpg'
          }
        />
        <Box py={3} px={2} className={styles.content}>
          <Info useStyles={useGalaxyInfoStyles}>
            <InfoSubtitle>
              AiM:Φriginal
            </InfoSubtitle>
            <InfoTitle>
              <Link
                style={{color: "#fff"}}
                to={{
                pathname: "/zo/zo-gallery",
                query: {
                  tagid: "5e50152d58adfe5f36e095f5",
                  pn: 1,
                  pagesize: 40,
                }
              }}>
                愛美
              </Link>
            </InfoTitle>
            <InfoCaption>
              Perfect Woman
            </InfoCaption>
          </Info>
        </Box>
      </Card>
    </>
  );
}
