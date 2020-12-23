import React from 'react';
import loadingStyles from './loading.less';

const Loading = () => (
  <div className={loadingStyles.loadingContainer}>
    <div className="loadingStar">
      <img src={require('../../assets/kv-slide-loading-star-icon.png')} alt="" className={loadingStyles.loading}/>
    </div>
    <div>
      <img src={require('../../assets/kv-slide-loading-text.png')} alt=""  className={loadingStyles.loadingText} />
    </div>
  </div>
)

export default Loading;
