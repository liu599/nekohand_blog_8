// ref: https://umijs.org/config/
const {REACT_APP_ENV} = process.env;
const APP_VERSION = require("./package.json").version
const APP_BUILD_TIME = new Date()
const APP_SHOW_TIME = `${APP_BUILD_TIME.getFullYear()}${APP_BUILD_TIME.getMonth()+1}`
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
  // ssr: { },
  dva: {
    hmr: true,
    immer: true,
    skipModelValidate: true,
  },
  crossorigin: true,
  dynamicImport: {
    loading: '@/components/PageLoading/loading',
  },
  title: false,
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
    NEKOHAND: "nekohand",
    USERDATA: "userData",
  },
  devServer: {
    port: 5051,
    writeToDisk: false,
  }
}
