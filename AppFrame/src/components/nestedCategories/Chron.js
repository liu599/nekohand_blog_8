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

  const clickHandler = (e) => {
    // TODO: This is a wr for get tag name from html node
    let tagName = e.target.innerHTML.replace(/<\/?[^>]*>/g, '');
    console.log(tagName, "123")
    let subMenus = [];
    props.data.chron.forEach((chron) => {
      subMenus.push(...chron.subMenus);
    });
    let tag = subMenus.filter(item => item.label === tagName);
    if (tag.length > 0) {
      history.push({
        pathname: "/nekohand/blog",
        query: {
          d: tag[0].label,
          t: tag[0].query,
          pn: 1,
        }
      })
    }

  }

  return (
    <div onClick={clickHandler}>
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
