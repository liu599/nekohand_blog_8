import produce from 'immer';
import nekoConnect from '../../../Connect';
import config from "../../../MusicPlayer/src/connect/config";

const fetchUrl = nekoConnect.fetchUrl;
const optionConvert = nekoConnect.optionConvert;
export default {
  namespace: 'nekohandBlog',
  state: {
    posts: [],
    pager: {},
    currentPost: {}
  },
  reducers: {
    savePostData(state, {payload: currentPost}) {
      return Object.assign({}, state, {
        currentPost
      })
    }
  },
  effects: {
    *fetchPostList(action, {call, put}) {
      const {data} = yield call(fetchUrl, optionConvert(action.payload));
      yield put({type: "savePostData", payload: data});
    }
  },
}
