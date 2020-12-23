import lodash from 'lodash'
import produce from 'immer';
import nekoConnect from '../../../Connect';
import config from "../../../MusicPlayer/src/connect/config";
import {localforage, GetItemService, addDefaultListService, deleteDefaultListService} from "../utils/local";
const keyNameFilter = (keyName, arr) => {
  let arrb = lodash.cloneDeep(arr);
  let keyMap = {}
  let ret = [];
  for (let t = 0; t < arr.length; t +=1) {
    let p = arr[t][keyName];
    if (keyMap.hasOwnProperty(p)) {
      let cn = keyMap[p];
      // console.log(arrb[cn].audioList, Object.isFrozen(arrb));
      arrb[cn].audioList.push(arrb[t])
      continue;
    }
    keyMap[p] = t;
    // arr[t].audioList = [];
    // arrb[t].audioList.push(arrb[t].FileNo)
    ret.push(arrb[t])
  }
  return ret
}
const fetchUrl = nekoConnect.fetchUrl;
const optionConvert = nekoConnect.optionConvert;
export default {
  namespace: 'nekoMusic',
  state: {
    current: {
      ix: 0,
      idat: {},
    },
    storage: [],
    albums: [],
    artists: []
  },
  reducers: {
    saveMusicData(state, {payload: musicData}) {
      const resReg = /\[([\s\S]+)]([\s\S]+)/g;
      const _imuData = produce(musicData, draft => {
        draft.forEach((item, index) => {
          let nm = decodeURIComponent(item.fileName).split("."+item.filetype)[0].trim();
          let rp = decodeURIComponent(item.relativePath).split('/');
          let rootUrl = item["FileNo"]<2073?config.oldFileRootUrl:config.fileRootUrl;
          item.name = nm + (item.filetype !== "flac" ? "" : " [HQ]");
          item.artist = config.artist[rp[rp.length-3]] || rp[rp.length-3];
          item.url = rootUrl + decodeURIComponent(item.src);
          item.cover = rootUrl + decodeURIComponent(item.relativePath) + "cover.jpg";
          item.lrc = null;
          item.album = rp[rp.length-2];
          item.audioList = [];
          delete item.relativePath;
          delete item.src;
          delete item.fileName;
          delete item.hashId;
          let findArtist = resReg.exec(item.artist);
          resReg.lastIndex = 0;
          let findAlbum = resReg.exec(item.album);
          resReg.lastIndex = 0;
          // console.log(resReg, item.artist, findArtist !== null, findAlbum !== null, -1)
          if (findArtist !== null && findArtist.length > 1) {
            if (findArtist[2].includes("Poppin")) {
              item.artist = "Poppin'Party"
            } else {
              item.artist = "Million Stars from Idol M@Ster"
            }
          } else if (item.artist.includes("]")) {
            item.artist = "Million Stars from Idol M@Ster"
          }
          if (findAlbum !== null && findAlbum.length > 1) {
            item.issueDate = findAlbum[1];
            item.album =  findAlbum[2];
          }
        })
      });
      const albumData = keyNameFilter("album", _imuData);
      const artistData = keyNameFilter("artist", _imuData);
      localforage.getItem(NEKOHAND).then((res)=>{
        console.log(res);
        if (res.expiredAt > Date.now()) {
          return res;
        }
        return localforage.setItem(NEKOHAND, Object.assign({}, res, {
          storage: _imuData,
          albums: albumData,
          artists: artistData,
        }));
      })
      return Object.assign({}, state, {
        storage: _imuData,
        albums: albumData,
        artists: artistData,
      })
    },
    syncLocalCache(state, {payload: result}) {
      console.log("sync local cache")
      return Object.assign({}, state, {
        list1: result.list1,
        default: result.default,
        list2: result.list2,
        list3: result.list3,
      })
    }
  },
  effects: {
    *fetchMusic(action, { call, put, fork }) {
      let data1 = yield call(fetchUrl, optionConvert(action.payload))
      let data2 = yield call(fetchUrl, optionConvert({
        urlTag: 'playerlist',
        queryData: {
          fileType: 'flac',
        },
        urlOption: {},
      }))
      let data = [...data1.data, ...data2.data];
      yield put({type: "saveMusicData", payload: data})
    },
    *syncCache(action, {call, put}) {
      const result = yield call(GetItemService);
      yield put({type: "syncLocalCache", payload: result})
    },
    *addCache(action, {call, put}) {
      yield call(addDefaultListService, action.payload)
      const result = yield call(GetItemService);
      yield put({type: "syncLocalCache", payload: result})
    },
    *deleteCache(action, {call, put}) {
      yield call(deleteDefaultListService, action.payload)
      const result = yield call(GetItemService);
      yield put({type: "syncLocalCache", payload: result})
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname.includes("zo")) {
          dispatch({
            type: 'syncCache',
          });
        }
      });
    },
  },
}
