
// ref: https://umijs.org/config/
const {REACT_APP_ENV} = process.env;
export default {
  antd: false,
  history: {type: 'browser'},
  targets: {ie: 11},
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
  },
}
