import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import {images} from '../../constants';
import {TextInput, HelperText} from 'react-native-paper';
import {Button} from 'react-native-elements';
import authApi from '../../tools/Api/auth.api';
import {ResponseError} from '../../tools/ErrorHandler/ErrorHandler';
import CustomActivityIndicator from '../../constants/Components/ActivityIndicator';

const SignUpScreen = ({navigation}) => {
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);

  const handleSignUp = async () => {
    navigation.navigate('OTPSignUp', {
      sign_up_data: {
        full_name: name,
        phone_number: phoneNumber,
        email: email,
        password: password,
      },
    });
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight,
      }}>
      <View style={{flex: 1, paddingHorizontal: 10, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Image
            source={images.signUpLogo}
            style={{
              width: Dimensions.get('window').width * 0.4,
              height: Dimensions.get('window').height * 0.15,
            }}
            resizeMode="contain"
          />
          <View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                paddingBottom: 4,
              }}>
              Sign up to
            </Text>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>
              Apply loan faster
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Image
            source={images.signUpImage}
            style={{
              width:
                Dimensions.get('window').height <= 640
                  ? Dimensions.get('window').width * 0.29
                  : Dimensions.get('window').width * 0.35,
              height: Dimensions.get('window').height * 0.3,
            }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 8,
            zIndex: 10,
          }}>
          <Button
            title="Cancel"
            type="clear"
            titleStyle={{color: '#000', fontWeight: 'bold', fontSize: 17}}
            onPress={() => navigation.goBack()}
            TouchableComponent={TouchableWithoutFeedback}
          />
        </View>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <TextInput
          label="Full Name"
          placeholder="Enter full name in NRIC"
          activeUnderlineColor="#0F89FA"
          value={name}
          onChangeText={name => {
            setName(name);
          }}
        />
        <HelperText type="error"></HelperText>
        <TextInput
          label="Phone Number"
          placeholder="Enter phone number in digits only"
          activeUnderlineColor="#0F89FA"
          keyboardType="phone-pad"
          value={phoneNumber}
          maxLength={11}
          onChangeText={phoneNumber => {
            setPhoneNumber(phoneNumber);
            if (/^(?=.{10,11}$)[0-9\b]+$/.test(phoneNumber) != true) {
              setHasError(true);
            } else setHasError(false);
          }}
        />
        <HelperText
          type="error"
          visible={
            phoneNumber === '' ||
            /^(?=.{10,11}$)[0-9\b]+$/.test(phoneNumber) == true
              ? false
              : true
          }>
          Invalid phone number
        </HelperText>
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
        <TextInput
          label="Password"
          placeholder="Enter password"
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
            name &&
            phoneNumber &&
            email &&
            password &&
            confirmPassword &&
            hasError === false
              ? false
              : true
          }
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
    </ScrollView>
  );
};

export default SignUpScreen;
