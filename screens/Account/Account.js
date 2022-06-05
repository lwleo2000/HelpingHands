import React, {useEffect, useState, useContext} from 'react';
import {View, Text, FlatList, Dimensions, StatusBar} from 'react-native';
import {Avatar, Button, ListItem, Icon} from 'react-native-elements';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import {context} from '../../App';
import NotLogin from '../NotLogin/NotLogin';
import CustomActivityIndicator from '../../constants/Components/ActivityIndicator';
import DeviceInfoPlugin from '../../plugin/DeviceInfo.plugin';
import deviceApi from '../../tools/Api/device.api';
import {ResponseError} from '../../tools/ErrorHandler/ErrorHandler';

const AccountScreen = ({navigation}) => {
  const contextProvider = useContext(context);
  const [loading, setLoading] = useState(false);
  const [accountPageData, setAccountPageData] = useState([
    {
      title: 'Frequently Ask Questions',
      path: 'Frequently Ask Questions',
      icon_type: 'meterial',
      icon_name: 'help',
      icon_color: '#61ACF1',
      chevron: true,
    },
    {
      title: 'Terms & Conditions',
      path: 'Terms & Conditions',
      icon_type: 'material',
      icon_name: 'sticky-note-2',
      icon_color: '#61ACF1',
      chevron: true,
    },
    {
      title: 'Account Settings',
      path: 'Account Settings',
      icon_type: 'ionicon',
      icon_name: 'md-settings-sharp',
      icon_color: '#61ACF1',
      chevron: true,
    },
    {
      title: 'About HelpingHands',
      path: 'About HelpingHands',
      icon_type: 'material',
      icon_name: 'info',
      icon_color: '#61ACF1',
      chevron: true,
    },
  ]);

  const DeregisterDevice = async () => {
    setLoading(true);
    const deviceInfo = await DeviceInfoPlugin.getDeviceInfo();
    const res = await deviceApi.DeregisterDevice(deviceInfo);
    if (res.status === 200) {
      setLoading(true);
    } else {
      setLoading(false);
      ResponseError(res);
    }
  };
  const listHeader = () => {
    return (
      <View>
        <View
          style={{
            backgroundColor: '#61ACF1',
            alignItems: 'center',
          }}>
          <View style={{paddingVertical: 20}}>
            <Avatar
              containerStyle={{backgroundColor: '#BDBDBD'}}
              size="large"
              title={
                contextProvider.profile
                  ? contextProvider.profile.full_name.charAt(0)
                  : ''
              }
              rounded
            />
          </View>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              paddingBottom: 20,
              fontWeight: 'bold',
            }}>
            {contextProvider.profile ? contextProvider.profile.full_name : ''}
          </Text>
        </View>
      </View>
    );
  };
  const renderItem = ({item}) => {
    return (
      <ListItem
        bottomDivider
        onPress={
          item.path === 'Account Settings'
            ? () => {
                navigation.navigate('AccountStack', {
                  screen: 'AccountSettings',
                });
              }
            : item.path === 'Terms & Conditions'
            ? () => {
                navigation.navigate('AccountStack', {
                  screen: 'TermsConditions',
                });
              }
            : item.path === 'Frequently Ask Questions'
            ? () => {
                navigation.navigate('AccountStack', {screen: 'FAQ'});
              }
            : item.path === 'About HelpingHands'
            ? () => {
                navigation.navigate('AccountStack', {
                  screen: 'AboutHelpingHands',
                });
              }
            : null
        }>
        <View>
          <Icon
            type={item.icon_type}
            name={item.icon_name}
            color={item.icon_color}
          />
        </View>
        <ListItem.Content>
          <ListItem.Title style={{fontSize: 14, color: '#6d6e70'}}>
            <Text>{item.title}</Text>
          </ListItem.Title>
        </ListItem.Content>
        {item.chevron && <ListItem.Chevron color="#6d6e70" />}
      </ListItem>
    );
  };

  const listFooter = () => {
    return (
      <View
        style={{
          marginTop: '20%',
          paddingBottom: Dimensions.get('window').width < 375 ? 100 : 110,
          alignItems: 'center',
        }}>
        <Button
          title="Log Out"
          containerStyle={{width: '80%'}}
          buttonStyle={{borderRadius: 10, backgroundColor: '#E33131'}}
          icon={{
            name: 'logout',
            type: 'material',
            color: '#fff',
          }}
          onPress={async () => {
            setLoading(true);
            await DeregisterDevice();
            await RNSecureStorage.remove('jwt');
            await contextProvider.setAuth();
            await contextProvider.setIsAuth(false);
            await contextProvider.setActiveLoanApplication([]);
            navigation.reset({
              index: 0,
              routes: [{name: 'HomeTabs'}],
            });
          }}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight,
      }}>
      {contextProvider.isAuth ? (
        <FlatList
          data={accountPageData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListHeaderComponent={listHeader}
          ListFooterComponent={listFooter}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <NotLogin navigation={navigation} />
      )}
      <CustomActivityIndicator
        animating={loading}
        size="large"
        color="#61acf1"
      />
    </View>
  );
};

export default AccountScreen;
