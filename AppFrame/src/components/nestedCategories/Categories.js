import React, {useEffect} from "react";
import Menu from '@mui-treasury/components/menu/nested';
import {
  Link,
  connect,
  getLocale,
  setLocale,
  useIntl,
  history,
  Helmet,
} from 'umi';


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


  return (
    <div>
      {/*<Menu menus={getMenus()} />*/}
      {props.data.categories &&
      <Menu menus={props.data.categories} />}
    </div>
  );
}

function mapStateToProps(state) {
  console.log("state", state);
  return {
    data: state.nekohandBlog,
    location: state.router,
  };
}

export default connect(mapStateToProps)(RightMenu);
