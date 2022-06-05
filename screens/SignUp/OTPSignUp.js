import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useForm} from 'react-hook-form';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import authApi from '../../tools/Api/auth.api';
import {Button} from 'react-native-elements';
import CustomActivityIndicator from '../../constants/Components/ActivityIndicator';
import {ResponseError} from '../../tools/ErrorHandler/ErrorHandler';

const OTPSignUpScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const {sign_up_data} = route.params;
  const [code, setCode] = useState([]);
  const [resendOTPCountdown, setResendOTPCountdown] = useState(60);
  var resendOTPInterval;

  const requestOTP = async () => {
    setLoading(true);
    const res = await authApi.RequestSignUpOTP({
      email: sign_up_data.email,
    });
    if (res.status === 200) {
      setLoading(false);
      console.log('Received code.');
      let countdown = resendOTPCountdown;
      resendOTPInterval = setInterval(() => {
        countdown -= 1;
        setResendOTPCountdown(countdown);
        if (countdown === -1) {
          clearInterval(resendOTPInterval);
          setResendOTPCountdown(60);
        }
      }, 1000);
    } else {
      setLoading(false);
      console.log('Not received code.');
      ResponseError(res);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    sign_up_data.otp = code;
    const res = await authApi.RegisterAccount(sign_up_data);

    if (res.status === 200) {
      setLoading(false);
      navigation.navigate('Login');
      alert('Account registered.');
    } else {
      setLoading(false);
      ResponseError(res);
    }
  };

  console.log(code, 124);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{padding: 15}}>
        <Text>
          The OTP will be sent to the email that you filled in the previous
          form.
        </Text>
        <OTPInputView
          style={{width: '80%', height: 100, alignSelf: 'center'}}
          pinCount={4}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged={code => {
          //   this.setState({code});
          // }}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            setCode(code);
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />
        <View>
          {resendOTPCountdown === 60 ? (
            <TouchableOpacity onPress={requestOTP}>
              <Text
                style={{
                  textAlign: 'right',
                  color: '#61ACF1',
                  fontWeight: 'bold',
                }}>
                Request OTP
              </Text>
            </TouchableOpacity>
          ) : (
            <Text
              style={{
                textAlign: 'right',
                color: '#61ACF1',
                fontWeight: 'bold',
              }}>
              resend in {resendOTPCountdown}s
            </Text>
          )}
        </View>
        <Button
          disabled={code ? false : true}
          title={'Sign Up'}
          buttonStyle={{
            width: 300,
            borderRadius: 5,
            backgroundColor: '#61acf1',
          }}
          disabledStyle={{
            backgroundColor: '#a1cdf7',
          }}
          disabledTitleStyle={{
            color: '#ffffff',
          }}
          onPress={() => {
            handleSignUp();
          }}
          containerStyle={{
            alignItems: 'center',
            marginTop: '20%',
            marginBottom: '15%',
          }}
        />
      </View>
      <CustomActivityIndicator
        animating={loading}
        size="large"
        color="#61acf1"
      />
    </View>
  );
};

export default OTPSignUpScreen;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#61ACF1',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 2,
    color: '#000',
  },

  underlineStyleHighLighted: {
    borderColor: '#61ACF1',
  },
});
