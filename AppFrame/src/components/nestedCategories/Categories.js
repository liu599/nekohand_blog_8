import React, {useEffect} from "react";
import Menu from '@mui-treasury/components/menu/nested';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import {
  Link,
  connect,
  getLocale,
  setLocale,
  useIntl,
  history,
  Helmet,
} from 'umi';

const data = [{
  label: "123",
  id: "123",
  key: "123",
  component: "a",
  href: "#link",
  onClick: (e) => {
    console.log(e);
  }
}]

function RightMenu(props) {

  function fetchWidget(){
    props.dispatch({
      type: 'nekohandBlog/fetchCategories',
      payload: {
        urlTag: 'nekohandBlog.postByCategory',
        queryData: {},
      }
    })
  }

  useEffect(() => {
    fetchWidget();
  }, []);

  const clickHandler = (e) => {
    // TODO: This is a wr for get tag name from html node
    let tagName = e.target.innerHTML.replace(/<\/?[^>]*>/g, '');
    let tag = props.data.categories.filter(item => item.cname === tagName);
    history.push({
      pathname: "/nekohand/blog",
      query: {
        cid: tag[0].id,
        cname: tagName,
        pn: 1,
      }
    })
  }

  return (
    <div onClick={clickHandler}>
      {props.data.categories &&
      <Menu
        menus={props.data.categories}
      />}
    </div>
  );
}

function mapStateToProps(state) {
  console.log("categories", state);
  return {
    data: state.nekohandBlog,
  };
}

export default connect(mapStateToProps)(RightMenu);
