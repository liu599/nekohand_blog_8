import nekoConnect from '../../../Connect';
const nekoConfig = nekoConnect.config;
const fetchUrl = nekoConnect.fetchUrl;
const optionConvert = nekoConnect.optionConvert;

export default {
  namespace: 'nekoPicture',
  state: {
    aimi: [],
    pager: {},
  },
  reducers: {
    saveMusicData(state, {payload: pictureData}) {
      pictureData.data.forEach(picture => {
        if (!picture.fileName.includes("gif")) {
          let tmp = picture.Imageinfo.split(",");
          let originalWidth = parseInt(tmp[0], 10);
          let originalHeight = parseInt(tmp[1].split("||")[0], 10);
          picture.height = 240;
          picture.width = Math.floor(originalWidth * 240 / originalHeight);
        }
        picture.src = `${nekoConfig.ossRootUrl}${picture.relativePath}${picture.fileName}`;
        picture.selfOwnedSrc = `${nekoConfig.fileRootUrl}${picture.relativePath}${picture.fileName}`;
        picture.selfOwnedThumbSrc = `${nekoConfig.fileRootUrl}/aimi_thumb/240/${picture.fileId}__${picture.fileName}`;
      });
      return Object.assign({}, state, {
        aimi: pictureData.data,
        pager: {
          pageNum: parseInt(pictureData.pager.pagenum, 10),
          pageSize: parseInt(pictureData.pager.pagesize, 10),
          total: parseInt(pictureData.pager.total, 10),
        },
      })
    }
  },
  effects: {
    *fetchPictures(action, { call, put, fork }) {
      let data = yield call(fetchUrl, optionConvert(action.payload))
      yield put({type: "saveMusicData", payload: data});
    }
  }
}
