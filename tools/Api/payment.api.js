import {Connector} from './api';
const instance = Connector;

export default {
  PayWithStripe: data => {
    return instance
      .post('/payment/pay-with-stripe', data)
      .then(res => res)
      .catch(error => error);
  },
};
