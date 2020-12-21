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


function Chron(props) {

  function fetchWidget(){
    props.dispatch({
      type: 'nekohandBlog/fetchChron',
      payload: {
        urlTag: 'nekohandBlog.postChronology',
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
      {props.data.chron &&
      <Menu menus={props.data.chron} />}
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

export default connect(mapStateToProps)(Chron);
