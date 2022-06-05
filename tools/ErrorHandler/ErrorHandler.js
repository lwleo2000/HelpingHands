import {Alert} from 'react-native';

export const ResponseError = res => {
  if (res.response) {
    if (res.response.data.message) {
      console.log(res.response.data);
      Alert.alert('Oops', res.response.data.message, [
        {
          text: 'Close',
          style: 'cancel',
        },
      ]);
    }
  } else {
    return res;
  }
};
