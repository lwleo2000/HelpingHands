import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useForm} from 'react-hook-form';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import authApi from '../../tools/Api/auth.api';
import {Button} from 'react-native-elements';
import CustomActivityIndicator from '../../constants/Components/ActivityIndicator';
import {TextInput, HelperText} from 'react-native-paper';
import {ResponseError} from '../../tools/ErrorHandler/ErrorHandler';

const ForgotPasswordScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [hasError, setHasError] = useState('');
  const [code, setCode] = useState('');
  const [resendOTPCountdown, setResendOTPCountdown] = useState(60);
  var resendOTPInterval;

  const requestOTP = async () => {
    setLoading(true);
    const res = await authApi.RequestResetPasswordOTP({
      email: email,
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

  const handleVerifyOTP = async () => {
    setLoading(true);
    const res = await authApi.VerifyResetPasswordOTP({
      email: email,
      otp: code,
    });

    if (res.status === 200) {
      setLoading(false);
      navigation.navigate('ResetPassword', {
        email: email,
      });
    } else {
      setLoading(false);
      ResponseError(res);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{marginTop: '5%', paddingHorizontal: 20}}>
        <Text style={{textAlign: 'justify', marginBottom: '5%'}}>
          Fill in your registered email address and request the verification
          code. The verification code will be used to recover your account.{' '}
        </Text>
        <TextInput
          label="Email"
          placeholder="Enter email"
          activeUnderlineColor="#0F89FA"
          keyboardType="email-address"
          value={email}
          onChangeText={email => {
            setEmail(email);
            if (
              /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
                email,
              ) != true
            ) {
              setHasError(true);
            } else setHasError(false);
          }}
        />
        <HelperText
          type="error"
          visible={
            email === '' ||
            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
              email,
            ) == true
              ? false
              : true
          }>
          Invalid email
        </HelperText>
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
            <TouchableOpacity
              disabled={email && hasError === false ? false : true}
              onPress={requestOTP}>
              <Text
                style={{
                  textAlign: 'right',
                  color: email && hasError === false ? '#61ACF1' : '#aaaaaa',
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
          disabled={code && email && hasError === false ? false : true}
          title={'Next'}
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
            handleVerifyOTP();
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

export default ForgotPasswordScreen;

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
