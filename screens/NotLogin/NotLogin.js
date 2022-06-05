import React from 'react';
import {View, Image, Text, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import {images} from '../../constants';

const NotLogin = props => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 32,
      }}>
      <View style={{paddingHorizontal: 24}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 24,
          }}>
          Oops, looks like you haven't login
        </Text>
        <Text style={{textAlign: 'center', paddingTop: 6}}>
          Login now to unlock more features
        </Text>
      </View>
      <Image
        source={images.notLogin}
        style={{
          height: Dimensions.get('window').height * 0.35,
          width: '100%',
        }}
        resizeMode="contain"
        resizeMethod="scale"
      />
      <Button
        title="Login Now"
        buttonStyle={{
          backgroundColor: '#61ACF1',
          borderRadius: 10,
          paddingHorizontal: 24,
        }}
        icon={{type: 'material', name: 'login', color: '#fff'}}
        titleStyle={{
          paddingHorizontal: 8,
          paddingVertical: 6,
          fontWeight: 'bold',
        }}
        containerStyle={{paddingTop: 16, width: '80%'}}
        onPress={() =>
          props.navigation.navigate('LoginSignUpStack', {screen: 'Login'})
        }
      />
    </View>
  );
};

export default NotLogin;
