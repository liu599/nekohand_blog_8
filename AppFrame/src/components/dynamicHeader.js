import {dynamic} from 'umi';

export default dynamic({
  loader: async function() {
    const {default: Header} = await import('./blogHeader');
    return Header
  },
})
