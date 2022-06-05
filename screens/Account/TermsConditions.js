import * as React from 'react';
import {WebView} from 'react-native-webview';
import CustomActivityIndicator from '../../constants/Components/ActivityIndicator';

const TermsConditionsScreen = () => {
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

export default TermsConditionsScreen;
