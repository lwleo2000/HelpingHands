import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import CustomActivityIndicator from '../../constants/Components/ActivityIndicator';

const PaymentScreen = ({navigation, route}) => {
  const {application_id, with_penalty_fee} = route.params;
  console.log(with_penalty_fee, 656);
  const onMessage = async e => {
    console.log(e.nativeEvent.data, 1244);
    if (e.nativeEvent.data === 'Payment Succeeded') {
      navigation.navigate('MyLoanDetails', {
        application_id: application_id,
      });
    }
  };
  return (
    <WebView
      domStorageEnabled
      startInLoadingState
      ref={webview => (webview = webview)}
      androidLayerType="hardware"
      onMessage={onMessage}
      renderLoading={() => (
        <CustomActivityIndicator
          animating={true}
          size="large"
          color="#61acf1"
        />
      )}
      onRenderProcessGone={syntheticEvent => {
        const {nativeEvent} = syntheticEvent;
        console.warn('WebView Crashed: ', nativeEvent.didCrash);
      }}
      source={{
        uri:
          'https://immense-tundra-42798.herokuapp.com/payment/fpx-webview?application_id=' +
          application_id +
          '&with_penalty_fee=' +
          with_penalty_fee,
      }}
    />
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '5%',
    backgroundColor: '#fff',
  },

  intro: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },

  requirements: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});
