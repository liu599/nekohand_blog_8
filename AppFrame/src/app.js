import { createLogger } from 'redux-logger';
export const dva = {
  config: {
    // onAction: createLogger(),
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};
