import * as React from 'react';
import {View, Text} from 'react-native';
import CustomActivityIndicator from '../../constants/Components/ActivityIndicator';
import WebView from 'react-native-webview';

const ApplyLoanTermsAndConditionScreen = () => {
  return (
    <WebView
      domStorageEnabled
      startInLoadingState
      ref={webview => (webview = webview)}
      androidLayerType="hardware"
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
        uri: 'https://immense-tundra-42798.herokuapp.com/webview/terms-conditions',
      }}
    />
  );
};

export default ApplyLoanTermsAndConditionScreen;
