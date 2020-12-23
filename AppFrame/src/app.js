import { createLogger } from 'redux-logger';
import { ForageInit } from '../src/utils/local';
export const dva = {
  initialState: {
    local: ForageInit(),
  },
  config: {
    // onAction: createLogger(),
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};
