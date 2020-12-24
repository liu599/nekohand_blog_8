import React from 'react';
import EmojiNatureSharpIcon from '@material-ui/icons/EmojiNatureSharp';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Designed by Tokei © '}
      <Link color="inherit" href="https://blog.ecs32.top/" target={"_blank"}>
        Nekohand 公式サイト委員會
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
      <Link color="inherit" href="https://tae.ecs32.top/" target={"_blank"}>
        <EmojiNatureSharpIcon fontSize={"inherit"} />
      </Link>{' '}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    textAlign: 'center',
    //backgroundColor: "transparent",
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function StickyFooter(props) {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="subtitle1">
          Nekohand/EC Site - Website for daily.
        </Typography>
        <Copyright />
        <Typography variant="body2" color="textSecondary">
          {`Publish Version: ${APP_VERSION}.${APP_SHOW_TIME}`}
        </Typography>
      </Container>
    </footer>
  );
}
