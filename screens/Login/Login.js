import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  StatusBar,
  ScrollView,
} from 'react-native';
import {images} from '../../constants';
import {Input, Button, Divider} from 'react-native-elements';
import {useForm} from 'react-hook-form';
import authApi from '../../tools/Api/auth.api';
import {AuthHeader} from '../../tools/Api/api';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import CustomActivityIndicator from '../../constants/Components/ActivityIndicator';
import DeviceInfoPlugin from '../../plugin/DeviceInfo.plugin';
import {context} from '../../App';
import deviceApi from '../../tools/Api/device.api';
import FastImage from 'react-native-fast-image';
import {ResponseError} from '../../tools/ErrorHandler/ErrorHandler';

const LoginScreen = ({navigation}) => {
  const contextProvider = useContext(context);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordVisible, setPasswordVisible] = useState(true);
  const {
    register,
    setValue,
    formState: {errors},
  } = useForm();
  const height = Dimensions.get('window').height;

  useEffect(() => {
    register('email', {
      required: {
        value: true,
        message: 'Email is required',
      },
      pattern: {
        value: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
        message: 'Email is invalid',
      },
    });
    register('password', {
      required: {
        value: true,
        message: 'Password is required',
      },
    });
  }, [register]);

  const handleLogin = async () => {
    setLoading(true);
    const data = {
      email: email,
      password: password,
    };
    const res = await authApi.Login(data);
    if (res.status === 200) {
      await saveJWT(res.data.data.jwt);
      await AuthHeader();
      await registerDevice();
      await contextProvider.setAuth();
      await contextProvider.getProfile();
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeTabs'}],
      });
    } else {
      setLoading(false);
      ResponseError(res);
    }
  };

  const saveJWT = async jwt => {
    await RNSecureStorage.set('jwt', jwt, {
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
    });
  };

  const registerDevice = async () => {
    const deviceInfo = await DeviceInfoPlugin.getDeviceInfo();
    const notificationToken = contextProvider.notificationToken;
    console.log(deviceInfo, notificationToken, 7788);
    const res = await deviceApi.RegisterDevice({
      ...deviceInfo,
      ...notificationToken,
    });
    if (res.status === 200) {
      console.log('device is registered');
    } else {
      ResponseError(res);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight,
      }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
        }}>
        <View style={{alignItems: 'center', marginVertical: '10%'}}>
          <Image source={images.loginLogo} />
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
        <Input
          autoCapitalize="none"
          renderErrorMessage={false}
          autoCompleteType="email"
          placeholderTextColor="#61ACF1"
          placeholder={'Enter registered email'}
          leftIcon={{
            type: 'MaterialIcons',
            name: 'account-circle',
            color: '#61ACF1',
            size: Dimensions.get('window').width <= 320 ? 16 : 20,
          }}
          leftIconContainerStyle={{
            marginRight: 18,
            marginLeft: 8,
          }}
          inputStyle={{
            color: '#61ACF1',
            fontSize: Dimensions.get('window').width <= 320 ? 14 : 16,
            paddingBottom: 2,
            minHeight: 30,
          }}
          inputContainerStyle={{
            borderBottomColor: '#61ACF1',
            alignSelf: 'center',
          }}
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={e => {
            setEmail(e);
            setValue('email', e, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
        />
        <Text
          style={{
            paddingLeft: 10,
            paddingTop: 10,
            paddingBottom: 10,
            color: '#FF0000',
          }}>
          {errors.email && errors.email.message}
        </Text>
        <Input
          placeholderTextColor="#61ACF1"
          renderErrorMessage={false}
          secureTextEntry={passwordVisible}
          placeholder="Enter password"
          leftIcon={{
            type: 'evilicons',
            name: 'lock',
            color: '#61ACF1',
            size: Dimensions.get('window').width <= 320 ? 16 : 20,
          }}
          rightIcon={{
            type: 'material-community',
            name: passwordVisible ? 'eye-off' : 'eye',
            color: '#61ACF1',
            size: Dimensions.get('window').width <= 320 ? 16 : 20,
            onPress: () =>
              passwordVisible
                ? setPasswordVisible(false)
                : setPasswordVisible(true),
          }}
          textContentType="password"
          rightIconContainerStyle={{paddingTop: 8}}
          leftIconContainerStyle={{
            marginRight: 18,
            marginLeft: 8,
            paddingTop: 8,
          }}
          inputStyle={{
            color: '#61ACF1',
            fontSize: Dimensions.get('window').width <= 320 ? 14 : 16,
            paddingBottom: 2,
            minHeight: 30,
          }}
          inputContainerStyle={{
            borderBottomColor: '#61ACF1',
          }}
          containerStyle={{}}
          onChangeText={e => {
            setPassword(e);
            setValue('password', e, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
        />
        <Text
          style={{
            paddingLeft: 10,
            paddingTop: 10,
            paddingBottom: 10,
            color: '#FF0000',
          }}>
          {errors.password && errors.password.message}
        </Text>
        <View styles={{paddingHorizontal: 24}}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}>
            <Text
              style={{
                color: 'black',
                textAlign: 'right',
                fontWeight: 'bold',
                fontSize: Dimensions.get('window').width < 375 ? 12 : 14,
                marginBottom: 10,
              }}>
              Forgot Password?
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <Button
          title="Log In"
          buttonStyle={{
            backgroundColor: '#61ACF1',
            borderRadius: 5,
            width: Dimensions.get('window').width - 48,
          }}
          titleStyle={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: Dimensions.get('window').width <= 320 ? 12 : 14,
          }}
          icon={{
            type: 'material-community',
            name: 'login',
            color: 'white',
            size: Dimensions.get('window').width <= 320 ? 14 : 18,
          }}
          onPress={() => {
            handleLogin();
          }}
          disabledTitleStyle={{color: 'grey'}}
          disabled={
            email && password && Object.keys(errors).length == 0 ? false : true
          }
          containerStyle={{
            marginTop: 10,
            marginBottom: Dimensions.get('window').width <= 320 ? 10 : 16,
          }}
        />
        <Text
          style={{
            paddingHorizontal: 5,
            color: '#61ACF1',
            alignSelf: 'center',
            fontSize: Dimensions.get('window').width < 375 ? 12 : 14,
          }}>
          Or
        </Text>
        <Button
          title="Sign Up"
          buttonStyle={{
            borderRadius: 5,
            backgroundColor: 'white',
            width: Dimensions.get('window').width - 48,
            borderWidth: 1,
            borderColor: '#61ACF1',
          }}
          titleStyle={{
            color: '#61ACF1',
            fontWeight: 'bold',
            fontSize: Dimensions.get('window').width <= 320 ? 12 : 14,
          }}
          onPress={() => navigation.navigate('SignUp')}
          containerStyle={{
            marginTop: 10,
            marginBottom: Dimensions.get('window').width <= 320 ? 10 : 16,
          }}
        />
        <FastImage
          source={images.loginImage}
          style={{width: '100%', height: height * 0.34}}
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

export default LoginScreen;
