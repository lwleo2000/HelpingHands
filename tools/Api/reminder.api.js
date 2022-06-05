import {Connector} from './api';
const instance = Connector;

export default {
  SetDueDateReminder: data => {
    return instance
      .post('/reminder/set-due-date-reminder', data)
      .then(res => res)
      .catch(error => error);
  },

  DeleteSentReminder: data => {
    return instance
      .post('/reminder/delete-sent-reminder', data)
      .then(res => res)
      .catch(error => error);
  },
};
