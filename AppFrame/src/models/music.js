import produce from 'immer';
import nekoConnect from '../../../Connect';
import config from "../../../MusicPlayer/src/connect/config";
const albumFilter = (keyName, arr) => {
  let keyMap = {}
  let ret = [];
  for (let t = 0; t < arr.length; t +=1) {
    let p = arr[t][keyName];
    if (keyMap.hasOwnProperty(p)) {
      continue;
    }
    keyMap[p] = true;
    ret.push(arr[t])
  }
  return ret
}
const connectConfig = nekoConnect.config;
const fetchUrl = nekoConnect.fetchUrl;
const optionFilter = (obj, key) => {
  if (obj.hasOwnProperty(key)) {
    return obj[key]
  } else {
    console.error(`we do not have ${key}.`);
  }
}
const optionConvert = ({urlTag, queryData}) => {
  const configObj = optionFilter(connectConfig, urlTag);
  return [configObj[0], {
    requestType: configObj[1],
    method: configObj[2],
    data: queryData,
  }];
}
export default {
  namespace: 'nekoMusic',
  state: {
    current: {
      ix: 0,
      idat: {},
    },
    storage: [],
    albums: [],
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
      const albumData = albumFilter("album", _imuData);
      return Object.assign({}, state, {
        storage: _imuData,
        albums: albumData,
      })
    }
  },
  effects: {
    *fetchMp3Music(action, { call, put }) {
      let {data} = yield call(fetchUrl, optionConvert(action.payload))
      yield put({type: "saveMusicData", payload: data})
    }
  },
}
