import {Connector} from './api';
const instance = Connector;

export default {
  GetLoanPlan: () => {
    console.log('ssss');
    return instance
      .get('/loan-plan/get-loan-plan')
      .then(res => res)
      .catch(error => error);
  },
};
