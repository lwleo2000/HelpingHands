import {Connector} from './api';
const instance = Connector;

export default {
  RegisterAccount: (
    data = {
      full_name: String,
      phone_number: String,
      email: String,
      password: String,
      otp: String,
    },
  ) => {
    return instance
      .post('/auth/register-account', data)
      .then(res => res)
      .catch(error => error);
  },
  RequestSignUpOTP: email => {
    return instance
      .post('/auth/request-sign-up-otp', email)
      .then(res => res)
      .catch(error => error);
  },

  RequestResetPasswordOTP: email => {
    return instance
      .post('/auth/request-reset-password-otp', email)
      .then(res => res)
      .catch(error => error);
  },

  VerifyResetPasswordOTP: data => {
    return instance
      .post('/auth/verify-reset-password-otp', data)
      .then(res => res)
      .catch(error => error);
  },

  SaveNewPassword: data => {
    return instance
      .post('/auth/save-new-password', data)
      .then(res => res)
      .catch(error => error);
  },

  Login: data => {
    return instance
      .post('/auth/login', data)
      .then(res => res)
      .catch(error => error);
  },
  GetProfile: () => {
    return instance
      .get('/auth/get-profile')
      .then(res => res)
      .catch(error => error);
  },

  ChangePassword: data => {
    return instance
      .post('/auth/change-password', data)
      .then(res => res)
      .catch(error => error);
  },
};
