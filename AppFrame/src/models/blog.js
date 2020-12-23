import nekoConnect from '../../../Connect';
const fetchUrl = nekoConnect.fetchUrl;
const optionConvert = nekoConnect.optionConvert;
export default {
  namespace: 'nekohandBlog',
  state: {
    posts: [],
    pager: {},
    currentPost: {},
    categories: [],
    chron: [],
  },
  reducers: {
    savePost(state, {payload: currentPost}) {
      return Object.assign({}, state, {
        currentPost
      })
    },
    saveCategories(state, {payload: categories}) {
      categories.sort().forEach(item => {
        item.key = item.id;
        item.label = item.cname;
        item.title = item.cname;
      })
      return Object.assign({}, state, {
        categories
      })
    },
    saveChron(state, {payload: chron}) {
      let ret = [];
      let tempMap = {};
      chron.sort().forEach(sed => {
        let yr = sed.substring(0, 4);
        let index;
        if (tempMap[yr]) {
          index = ret.findIndex(x => x.title === yr);
          // console.log(index, 'sadfasd')
        } else {
          index = ret.push({
            key: yr,
            title: yr,
            label: yr,
            subMenus: []
          }) - 1;
          tempMap[yr] = true;
        }
        let mn = sed.substring(4, 6);
        // console.log(mn)
        // new Date(2018, 12, 1) => 实际上是2019.1 差一个月
        //console.log('month', mn);
        let cv = {
          title: `${yr}年${mn}月`,
          label: `${yr}-${mn}`,
          key: `${yr}-${mn}`,
          count: sed.split('(')[1].split(')')[0],
          link: `/timeline/${sed.split('(')[0]}`,
          query: `${new Date(yr, parseInt(mn, 10) - 1, 1).getTime()}`
        };
        ret[index].subMenus.unshift(cv);
      });
      return Object.assign({}, state, {
        chron: ret.reverse(),
      })
    },
    savePosts(state, {payload: data}) {
      return Object.assign({}, state, {
        pager: data.pager,
        posts: data.data,
      })
    },
  },
  effects: {
    *fetchAPost(action, {call, put}) {
      const {data} = yield call(fetchUrl, optionConvert(action.payload));
      yield put({type: "savePost", payload: data});
    },
    *fetchCategories(action, {call, put}) {
      const {data} = yield call(fetchUrl, optionConvert(action.payload));
      yield put({type: "saveCategories", payload: data});
    },
    *fetchChron(action, {call, put}) {
      const {data} = yield call(fetchUrl, optionConvert(action.payload));
      yield put({type: "saveChron", payload: data});
    },
    *fetchPosts(action, {call, put}) {
      const {data, pager} = yield call(fetchUrl, optionConvert(action.payload));
      yield put({type: "savePosts", payload:
          {
            data,
            pager
          }
      });
    }
  },
}
