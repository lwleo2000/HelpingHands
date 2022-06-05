import {Connector} from './api';
import {ApiUrl} from './api';
import RNSecureStorage from 'rn-secure-storage';
const instance = Connector;
export default {
  /*
  Apply loan API use XMLHttpRequest to send http request instead of axios.
  This is because send form data to back-server using axios will cause the 
  body and files become empty. However, using XMLHttpRequest fix this problem. 
 */
  ApplyLoan: data => {
    return sendHttpRequest(
      'POST',
      ApiUrl + '/loan-application/apply-loan',
      data,
    )
      .then(res => res)
      .catch(err => err);
  },

  SubmitLoanAgreement: data => {
    return sendHttpRequest(
      'POST',
      ApiUrl + '/loan-application/submit-loan-agreement',
      data,
    )
      .then(res => res)
      .catch(err => err);
  },

  GetLoanApplication: () => {
    return instance
      .get('/loan-application/get-loan-application')
      .then(res => res)
      .catch(error => error);
  },
  GetLoanApplicationDetails: application_id => {
    return instance
      .get(
        '/loan-application/get-loan-application-details?application_id=' +
          application_id,
      )
      .then(res => res)
      .catch(error => error);
  },

  GetActiveLoanApplication: () => {
    return instance
      .get('/loan-application/get-active-loan-application')
      .then(res => res)
      .catch(error => error);
  },
};

const sendHttpRequest = (method, url, data) => {
  const promise = new Promise(async (resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    const token = await RNSecureStorage.get('jwt');
    xhr.setRequestHeader('Authorization', token);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.response >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };
    xhr.onerror = () => {
      reject('Something went wrong');
    };
    xhr.send(data);
  });
  return promise;
};
