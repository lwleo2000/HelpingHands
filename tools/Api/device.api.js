import {Connector} from './api';
const instance = Connector;

export default {
  RegisterDevice: data => {
    return instance
      .post('/device/register-device', data)
      .then(res => res)
      .catch(error => error);
  },
  DeregisterDevice: data => {
    return instance
      .post('/device/deregister-device', data)
      .then(res => res)
      .catch(error => error);
  },
};
