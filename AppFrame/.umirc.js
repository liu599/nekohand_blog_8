// ref: https://umijs.org/config/
const {REACT_APP_ENV} = process.env;
const APP_VERSION = require("./package.json").version
const APP_BUILD_TIME = new Date()
const APP_SHOW_TIME = `${APP_BUILD_TIME.getFullYear()}${APP_BUILD_TIME.getMonth()+1}`
const LOCAL_FORAGE = require("localforage");
export default {
  targets: {
    ie: 11,
    chrome: 79,
    firefox: false,
    safari: false,
    edge: false,
    ios: false,
  },
  antd: false,
  publicPath: "/",
  runtimePublicPath: true,
  exportStatic: {},
  history: {type: 'browser'},
  fastRefresh: {},
  // ssr: { mode: 'stream' },
  dva: {
    hmr: true,
    immer: true,
    skipModelValidate: true,
  },
  crossorigin: true,
  dynamicImport: {
    // loading: '@/components/PageLoading/index',
  },
  title: false,
  dll: false,
  locale: {
    baseNavigator: true,
    default: 'en-US',
    baseSeparator: '-',
    title: true,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    APP_VERSION,
    APP_SHOW_TIME,
    LOCAL_FORAGE,
  },
  devServer: {
    port: 5051,
    writeToDisk: false,
  }
}
