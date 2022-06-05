import React, {useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {context} from '../../App';

const AccountSettingsScreen = ({navigation}) => {
  const contextProvider = useContext(context);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView contentContainerStyle={{paddingHorizontal: 15}}>
        <View style={styles.profileDetailsCard}>
          <View style={styles.cardContent}>
            <Text>Name</Text>
            <Text style={styles.detail}>
              {contextProvider.profile.full_name}
            </Text>
          </View>
        </View>
        <View style={styles.profileDetailsCard}>
          <View style={styles.cardContent}>
            <Text>Email</Text>
            <Text style={styles.detail}>{contextProvider.profile.email}</Text>
          </View>
        </View>
        <View style={styles.profileDetailsCard}>
          <View style={styles.cardContent}>
            <Text>Contact Number</Text>
            <Text style={styles.detail}>
              {contextProvider.profile.phone_number}
            </Text>
          </View>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('ChangePassword');
          }}>
          <View style={styles.profileDetailsCard}>
            <View style={styles.cardContent}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Password</Text>
                <Icon type="entypo" name="edit" color="#61acf1" />
              </View>
              <Text style={styles.detail}>**********</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default AccountSettingsScreen;

const styles = StyleSheet.create({
  profileDetailsCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: '5%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },

  cardContent: {
    padding: 15,
  },

  detail: {
    fontWeight: 'bold',
    marginTop: '3%',
  },
});
