import React, {useEffect} from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import FlareOutlinedIcon from '@material-ui/icons/FlareOutlined';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { firebaseTabsStylesHook } from '@mui-treasury/styles/tabs';
/*Status*/
import { connect, history } from 'umi';
React.useLayoutEffect = React.useEffect;

/*Styles*/
const useStyles = makeStyles((theme) => ({
  toolbarTitle: {
    flex: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));



function mapStateToProps(state) {
  // console.log("state", state);
  return { mock: state.count };
}

function PrimarySearchAppBar(props) {
  const {title, sections} = props;
  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState(0);
  const tabsStyles = firebaseTabsStylesHook.useTabs();
  const tabItemStyles = firebaseTabsStylesHook.useTabItem();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-search-account-menu';
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );



  //https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97

  useEffect(() => {
    if (window.location.pathname.includes("post")) {
      console.log("have post");
      setTabIndex(1)
      return
    }

    if (window.location.pathname.includes("zo")) {
      setTabIndex(0)
      return
    }

    let index = props.sections.findIndex(item => item.url === window.location.pathname)

    if (index < 0) {
      index = 0
    }
    setTabIndex(index);
  }, [window.location.pathname])


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className={classes.grow}>
      <AppBar position={'fixed'}>
      <Toolbar>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          className={classes.toolbarTitle}
        >
          {`
             Nekohand - 猫の手も借りたい
          `}

        </Typography>

        <Tabs
          classes={tabsStyles}
          value={tabIndex}
          onChange={(e, index) => {
            history.push(sections[index].url);
            setTabIndex(index);
          }}
        >
          {sections.map(item => {
            return (
              <Tab key={item.title} classes={tabItemStyles} label={item.title} />
            )
          })}
        </Tabs>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <div className={classes.sectionDesktop}>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={252} color="secondary">
              <FlareOutlinedIcon />
            </Badge>
          </IconButton>
          {/*<IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <FavoriteBorderIcon />
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>*/}
        </div>
      </Toolbar>
    </AppBar>
      {renderMenu}
    </div>
  );

}

export default connect(mapStateToProps)(PrimarySearchAppBar);
