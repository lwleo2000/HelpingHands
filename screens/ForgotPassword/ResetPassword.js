import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import authApi from '../../tools/Api/auth.api';
import {Button} from 'react-native-elements';
import CustomActivityIndicator from '../../constants/Components/ActivityIndicator';
import {TextInput, HelperText} from 'react-native-paper';
import {ResponseError} from '../../tools/ErrorHandler/ErrorHandler';

const ResetPasswordScreen = ({navigation, route}) => {
  const {email} = route.params;
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleSavePassword = async () => {
    setLoading(true);
    const res = await authApi.SaveNewPassword({
      email: email,
      new_password: password,
    });
    if (res.status === 200) {
      setLoading(false);
      navigation.navigate('Login');
      alert('New password saved.');
    } else {
      setLoading(false);
      ResponseError(res);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{padding: 15}}>
        <TextInput
          label="New Password"
          placeholder="Enter new password"
          secureTextEntry={passwordVisible}
          activeUnderlineColor="#0F89FA"
          value={password}
          onChangeText={password => {
            setPassword(password);
          }}
          right={
            <TextInput.Icon
              name={passwordVisible ? 'eye-off' : 'eye'}
              onPress={() =>
                passwordVisible
                  ? setPasswordVisible(false)
                  : setPasswordVisible(true)
              }
            />
          }
        />
        <HelperText></HelperText>
        <TextInput
          label="Confirm Password"
          placeholder="Enter confirm password"
          secureTextEntry={confirmPasswordVisible}
          activeUnderlineColor="#0F89FA"
          value={confirmPassword}
          onChangeText={confirmPassword => {
            setConfirmPassword(confirmPassword);
            if (
              password === '' ||
              confirmPassword === '' ||
              password === confirmPassword
            ) {
              setHasError(false);
            } else {
              setHasError(true);
            }
          }}
          right={
            <TextInput.Icon
              name={confirmPasswordVisible ? 'eye-off' : 'eye'}
              onPress={() =>
                confirmPasswordVisible
                  ? setConfirmPasswordVisible(false)
                  : setConfirmPasswordVisible(true)
              }
            />
          }
        />
        <HelperText
          type="error"
          visible={
            password === '' ||
            confirmPassword === '' ||
            password === confirmPassword
              ? false
              : true
          }>
          Password mismatch
        </HelperText>
        <Button
          disabled={
            password && confirmPassword && hasError === false ? false : true
          }
          title={'Save Password'}
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
            handleSavePassword();
          }}
          containerStyle={{
            alignItems: 'center',
            marginTop: '5%',
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

export default ResetPasswordScreen;
