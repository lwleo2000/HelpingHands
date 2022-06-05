import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import reminderApi from '../tools/Api/reminder.api';

export default {
  Configure: (navigation, contextProvider) => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: async function (token) {
        console.log('TOKEN:', token);
        const notificationToken = await messaging().getToken();
        console.log('Notification token: ', notificationToken);
        contextProvider.setNotificationToken({
          notification_token: notificationToken,
        });

        PushNotification.createChannel(
          {
            channelId: '1020120324', // (required)
            channelName: 'Loan Approval Notification', // (required)
            channelDescription: 'Notification for loan approval', // (optional) default: undefined.
            // soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            banner: true,
          },
          created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
        );
      },
      onRegistrationError: function (err) {
        console.log('Registration Error', err);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: async function (notification) {
        console.log('NOTIFICATION:', notification);
        console.log(contextProvider);

        // process the notification
        const clicked =
          Platform.OS === 'android'
            ? notification.userInteraction
            : notification.data.userInteraction;

        if (clicked) {
          contextProvider.setNotificationClicked(true);
        }

        if (notification.data.action === 'due_date_reminder') {
          /**
           * Once notification is received, the reminder date of the notification
           * will be deleted in the reminder document indicating the scheduled job
           * is done.
           */
          const res = await reminderApi.DeleteSentReminder({
            application_id: notification.data.application_id,
            job_id: notification.data.job_id,
          });
          if (res.status === 200) {
            console.log('deleted');
          } else {
            console.log('not deleted');
          }
        }
      },
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  },
};
