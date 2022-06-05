import * as React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {icons} from '../../constants';

const HowItWorksScreen = () => {
  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center'}}
      style={styles.container}>
      <Image
        source={icons.helpinghands}
        style={{
          marginTop: '5%',
          marginBottom: '5%',
        }}
      />
      <View style={{marginBottom: '10%'}}>
        <Text style={styles.intro}>
          HelpingHands provides fast and high passing rate loan for the
          customers.
          {'\n\n'}
          Basic requirements for applying the loan is listed down below:
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={icons.people}
          style={{
            height: 85,
            width: 85,
          }}
        />
        <View style={{flex: 1, marginLeft: '10%'}}>
          <Text style={styles.requirements}>
            You must be at least 21 years old.
          </Text>
        </View>
      </View>
      <View style={{marginTop: '8%', flexDirection: 'row'}}>
        <Image
          source={icons.flag}
          style={{
            height: 85,
            width: 85,
          }}
        />
        <View style={{flex: 1, marginLeft: '10%'}}>
          <Text style={styles.requirements}>
            You must be a citizen of Malaysia with NRIC.
          </Text>
        </View>
      </View>
      <View style={{marginTop: '8%', flexDirection: 'row'}}>
        <Image
          source={icons.bank}
          style={{
            height: 85,
            width: 85,
          }}
        />
        <View style={{flex: 1, marginLeft: '10%'}}>
          <Text style={styles.requirements}>
            You must have your own bank account.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HowItWorksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    backgroundColor: '#fff',
  },

  intro: {
    fontSize: 20,
    color: '#000',
  },

  requirements: {
    fontSize: 20,
    color: '#000',
  },
});
