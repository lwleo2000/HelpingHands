import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';
import {Button} from 'react-native-elements';
import authApi from '../../tools/Api/auth.api';
import CustomActivityIndicator from '../../constants/Components/ActivityIndicator';
import {ResponseError} from '../../tools/ErrorHandler/ErrorHandler';

const ChangePasswordScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [passwordSecure, setPasswordSecure] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordSecure, setNewPasswordSecure] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordSecure, setConfirmPasswordSecure] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      current_password: currentPassword,
      new_password: newPassword,
    };
    const res = await authApi.ChangePassword(data);
    if (res.status === 200) {
      setLoading(false);
      alert('Password has been updated.');
      navigation.navigate('AccountSettings');
    } else {
      setLoading(false);
      console.log(res);
      ResponseError(res);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView contentContainerStyle={{marginTop: '5%', padding: 20}}>
        <Text style={{marginBottom: '5%'}}>
          Make sure you remember your password.
        </Text>
        <TextInput
          label="Current Password"
          placeholder="Enter current password"
          secureTextEntry={passwordSecure}
          activeUnderlineColor="#0F89FA"
          value={currentPassword}
          onChangeText={currentPassword => {
            setCurrentPassword(currentPassword);
          }}
          right={
            <TextInput.Icon
              name={passwordSecure ? 'eye-off' : 'eye'}
              onPress={() =>
                passwordSecure
                  ? setPasswordSecure(false)
                  : setPasswordSecure(true)
              }
            />
          }
        />
        <HelperText></HelperText>
        <TextInput
          label="New Password"
          placeholder="Enter new password"
          secureTextEntry={newPasswordSecure}
          activeUnderlineColor="#0F89FA"
          value={newPassword}
          onChangeText={newPassword => {
            setNewPassword(newPassword);
          }}
          right={
            <TextInput.Icon
              name={newPasswordSecure ? 'eye-off' : 'eye'}
              onPress={() =>
                newPasswordSecure
                  ? setNewPasswordSecure(false)
                  : setNewPasswordSecure(true)
              }
            />
          }
        />
        <HelperText></HelperText>
        <TextInput
          label="Confirm Password"
          placeholder="Enter confirm password"
          secureTextEntry={confirmPasswordSecure}
          activeUnderlineColor="#0F89FA"
          value={confirmPassword}
          onChangeText={confirmPassword => {
            setConfirmPassword(confirmPassword);
            if (
              newPassword === '' ||
              confirmPassword === '' ||
              newPassword === confirmPassword
            ) {
              setHasError(false);
            } else {
              setHasError(true);
            }
          }}
          right={
            <TextInput.Icon
              name={confirmPasswordSecure ? 'eye-off' : 'eye'}
              onPress={() =>
                confirmPasswordSecure
                  ? setConfirmPasswordSecure(false)
                  : setConfirmPasswordSecure(true)
              }
            />
          }
        />
        <HelperText
          type="error"
          visible={
            newPassword === '' ||
            confirmPassword === '' ||
            newPassword === confirmPassword
              ? false
              : true
          }>
          Password mismatch
        </HelperText>
        <Button
          disabled={
            currentPassword &&
            newPassword &&
            confirmPassword &&
            hasError === false
              ? false
              : true
          }
          title={'Change Password'}
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
            handleSubmit();
          }}
          containerStyle={{
            alignItems: 'center',
            marginTop: '5%',
            marginBottom: '15%',
          }}
        />
      </ScrollView>
      <CustomActivityIndicator
        animating={loading}
        size="large"
        color="#61acf1"
      />
    </View>
  );
};

export default ChangePasswordScreen;
