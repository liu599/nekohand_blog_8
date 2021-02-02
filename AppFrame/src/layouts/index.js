import React from 'react';
import "@/assets/material-font.css"
import "@/assets/icon.css";
import StickyFooter from '../components/stickyFooter';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from '../components/blogHeader/dynamicHeader';
import { history } from 'umi';

const sections = [
  { title: "Top", url: '/' },
  { title: "Blog", url: '/nekohand/blog' },
  { title: 'About', url: '/about' },
  { title: 'Friends', url: '/friends' },
  { title: 'Bookmarks', url: '/bookmarks' },
];

const theme = createMuiTheme({});
/*
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 16,
  },
  palette: {
    primary: {
      // light: 这将从 palette.primary.main 中进行计算，
      main: deepOrange["400"],
      // dark: 这将从 palette.primary.main 中进行计算，
      // contrastText: 这将计算与 palette.primary.main 的对比度
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: 这将从 palette.secondary.main 中进行计算，
      contrastText: '#ffcc00',
    },
    // 使用 `getContrastText()` 来最大化
    // 背景和文本的对比度
    contrastThreshold: 3,
    // 使用下面的函数用于将颜色的亮度在其调色板中
    // 移动大约两个指数。
    // 例如，从红色 500（Red 500）切换到 红色 300（Red 300）或 红色 700（Red 700）。
    tonalOffset: 0.2,
  },
});*/

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 66,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: "transparent",
    minHeight: "100vh",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  gridList: {
    width: "100%",
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

function BasicLayout(props) {

  const unlisten = history.listen((location, action) => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  });
  unlisten();
  const classes = useStyles();
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header title={"Nekomusic"} sections={sections} />
        <Container maxWidth="lg" className={classes.root}>
          { props.children }
        </Container>
        {StickyFooter()}
      </ThemeProvider>
  );
}

export default BasicLayout;
