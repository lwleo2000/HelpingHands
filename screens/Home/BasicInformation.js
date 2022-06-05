import React, {useState, useEffect} from 'react';
import StepIndicator from 'react-native-step-indicator';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Picker} from '@react-native-community/picker';
import {Button} from 'react-native-elements';

const BasicInformationScreen = ({route, navigation}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const {loan_plan, emi_plan} = route.params;
  const stepsIndicatorLabels = [
    'EMI Plan',
    'Basic Info',
    'Social Info',
    'Indentity',
    'Loan Confirm',
  ];
  const stepsIndicatorStyle = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#61acf1',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#61acf1',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#61acf1',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#61acf1',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#61acf1',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#61acf1',
  };
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [hasError, setHasError] = useState(false);

  //form data
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [icNumber, setICNumber] = useState('');
  const [gender, setGender] = useState('');
  const [race, setRace] = useState('');
  const [martialStatus, setMartialStatus] = useState('');
  const [educationalLevel, setEducationalLevel] = useState('');
  const [homeOwnership, setHomeOwnership] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    console.log(loan_plan);
    console.log(emi_plan);
  });
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: 'white'}}
      showsVerticalScrollIndicator={false}>
      <View style={styles.stepsIndicator}>
        <StepIndicator
          customStyles={stepsIndicatorStyle}
          currentPosition={currentPage}
          labels={stepsIndicatorLabels}
        />
      </View>
      <View style={styles.form}>
        <Text style={{color: '#000', padding: 10, fontSize: 18}}>
          Personal Information
        </Text>
        <TextInput
          label="Name"
          placeholder="Enter full name in NRIC"
          activeUnderlineColor="#0F89FA"
          value={name}
          onChangeText={name => {
            setName(name);
          }}
        />
        <HelperText type="error"></HelperText>
        <TextInput
          label="Birth Date"
          placeholder="YYYY/MM/DD"
          activeUnderlineColor="#0F89FA"
          value={birthDate}
          onFocus={() => {
            setDatePickerVisibility(true);
          }}
        />
        <HelperText type="error"></HelperText>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={date => {
            setBirthDate(moment(date).format('YYYY-MM-DD').toString());
            setDatePickerVisibility(false);
          }}
          onCancel={() => {
            setDatePickerVisibility(false);
          }}
        />
        <TextInput
          label="NRIC"
          placeholder="Enter 12-digits NRIC number"
          activeUnderlineColor="#0F89FA"
          value={icNumber}
          maxLength={12}
          onChangeText={icNumber => {
            setICNumber(icNumber);
            if (/^(?=.{12,12}$)[0-9\b]+$/.test(icNumber) != true) {
              setHasError(true);
            } else setHasError(false);
          }}
          keyboardType="number-pad"
        />
        <HelperText
          type="error"
          visible={
            icNumber === '' || /^(?=.{12,12}$)[0-9\b]+$/.test(icNumber) == true
              ? false
              : true
          }>
          Invalid NRIC
        </HelperText>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: '#9F9F9F',
            backgroundColor: '#E7E7E7',
          }}>
          <Text
            style={{
              fontSize: 12,
              marginLeft: '3%',
              marginTop: '2%',
              color: '#6F6F6F',
            }}>
            Gender
          </Text>
          <Picker
            selectedValue={gender}
            style={{
              width: '100%',
              marginLeft: '1%',
            }}
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>
        <HelperText type="error"></HelperText>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: '#9F9F9F',
            backgroundColor: '#E7E7E7',
          }}>
          <Text
            style={{
              fontSize: 12,
              marginLeft: '3%',
              marginTop: '2%',
              color: '#6F6F6F',
            }}>
            Race
          </Text>
          <Picker
            selectedValue={race}
            style={{width: '100%', marginLeft: '1%'}}
            onValueChange={(itemValue, itemIndex) => setRace(itemValue)}>
            <Picker.Item label="Select Race" value="" />
            <Picker.Item label="Malay" value="Malay" />
            <Picker.Item label="Chinese" value="Chinese" />
            <Picker.Item label="Indian" value="Indian" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>
        <HelperText type="error"></HelperText>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: '#9F9F9F',
            backgroundColor: '#E7E7E7',
          }}>
          <Text
            style={{
              fontSize: 12,
              marginLeft: '3%',
              marginTop: '2%',
              color: '#6F6F6F',
            }}>
            Martial Status
          </Text>
          <Picker
            selectedValue={martialStatus}
            style={{width: '100%', marginLeft: '1%'}}
            onValueChange={(itemValue, itemIndex) =>
              setMartialStatus(itemValue)
            }>
            <Picker.Item label="Select Martial Status" value="" />
            <Picker.Item label="Single" value="Single" />
            <Picker.Item label="Married" value="Married" />
            <Picker.Item label="Widowed" value="Widowed" />
            <Picker.Item label="Divorced" value="Divorced" />
          </Picker>
        </View>
        <HelperText type="error"></HelperText>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: '#9F9F9F',
            backgroundColor: '#E7E7E7',
          }}>
          <Text
            style={{
              fontSize: 12,
              marginLeft: '3%',
              marginTop: '2%',
              color: '#6F6F6F',
            }}>
            Educational Level
          </Text>
          <Picker
            selectedValue={educationalLevel}
            style={{width: '100%', marginLeft: '1%'}}
            onValueChange={(itemValue, itemIndex) =>
              setEducationalLevel(itemValue)
            }>
            <Picker.Item label="Select Educational level" value="" />
            <Picker.Item
              label="Primary or Secondary"
              value="Primary or secondary"
            />
            <Picker.Item label="College" value="College" />
            <Picker.Item label="University" value="University" />
            <Picker.Item label="Others" value="Others" />
          </Picker>
        </View>
        <HelperText type="error"></HelperText>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: '#9F9F9F',
            backgroundColor: '#E7E7E7',
          }}>
          <Text
            style={{
              fontSize: 12,
              marginLeft: '3%',
              marginTop: '2%',
              color: '#6F6F6F',
            }}>
            Home Ownership
          </Text>
          <Picker
            selectedValue={homeOwnership}
            style={{width: '100%', marginLeft: '1%'}}
            onValueChange={(itemValue, itemIndex) =>
              setHomeOwnership(itemValue)
            }>
            <Picker.Item label="Select Home ownership" value="" />
            <Picker.Item label="Renters" value="Renters" />
            <Picker.Item
              label="Homeowner with mortgage"
              value="Homeowner with mortgage"
            />
            <Picker.Item
              label="Homeowner without mortgage"
              value="Homeowner without mortgage"
            />
            <Picker.Item label="None" value="None" />
          </Picker>
        </View>
        <HelperText type="error"></HelperText>
        <Text style={{color: '#000', padding: 10, fontSize: 18}}>
          Current residential address
        </Text>
        <TextInput
          label="Address line 1"
          placeholder="Enter address"
          activeUnderlineColor="#0F89FA"
          value={addressLine1}
          onChangeText={addressLine1 => {
            setAddressLine1(addressLine1);
          }}
        />
        <HelperText type="error"></HelperText>
        <TextInput
          label="Address line 2"
          placeholder="Enter address"
          activeUnderlineColor="#0F89FA"
          value={addressLine2}
          onChangeText={addressLine2 => {
            setAddressLine2(addressLine2);
          }}
        />
        <HelperText type="error"></HelperText>
        <TextInput
          label="City"
          placeholder="Enter address"
          activeUnderlineColor="#0F89FA"
          value={city}
          onChangeText={city => {
            setCity(city);
          }}
        />
        <HelperText type="error"></HelperText>
        <TextInput
          label="Post Code"
          placeholder="Enter post code"
          activeUnderlineColor="#0F89FA"
          value={postCode}
          maxLength={5}
          onChangeText={postCode => {
            setPostCode(postCode);
            if (/^(?=.{5,5}$)[0-9\b]+$/.test(postCode) != true) {
              setHasError(true);
            } else setHasError(false);
          }}
        />
        <HelperText
          type="error"
          visible={
            postCode === '' || /^(?=.{5,5}$)[0-9\b]+$/.test(postCode) == true
              ? false
              : true
          }>
          Invalid post code
        </HelperText>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: '#9F9F9F',
            backgroundColor: '#E7E7E7',
          }}>
          <Text
            style={{
              fontSize: 12,
              marginLeft: '3%',
              marginTop: '2%',
              color: '#6F6F6F',
            }}>
            State
          </Text>
          <Picker
            selectedValue={state}
            style={{width: '100%', marginLeft: '1%'}}
            onValueChange={(itemValue, itemIndex) => setState(itemValue)}>
            <Picker.Item label="Select State" value="" />
            <Picker.Item label="Johor" value="Johor" />
            <Picker.Item label="Kedah" value="Kedah" />
            <Picker.Item label="Kelantan" value="Kelantan" />
            <Picker.Item label="Malacca" value="Malacca" />
            <Picker.Item label="Negeri Sembilan" value="Negeri Sembilan" />
            <Picker.Item label="Pahang" value="Pahang" />
            <Picker.Item label="Pulau Pinang" value="Pulau Pinang" />
            <Picker.Item label="Perak" value="Perak" />
            <Picker.Item label="Perlis" value="Perlis" />
            <Picker.Item label="Sabah" value="Sabah" />
            <Picker.Item label="Sarawak" value="Sarawak" />
            <Picker.Item label="Selangor" value="Selangor" />
            <Picker.Item label="Terengganu" value="Terengganu" />
          </Picker>
        </View>
        <HelperText type="error"></HelperText>
        <Text style={{color: '#000', padding: 10, fontSize: 18}}>
          Contact Information
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '5%',
            marginBottom: '10%',
          }}>
          <Button
            disabled={
              name &&
              birthDate &&
              icNumber &&
              gender &&
              race &&
              martialStatus &&
              educationalLevel &&
              homeOwnership &&
              addressLine1 &&
              addressLine2 &&
              city &&
              postCode &&
              state &&
              email &&
              phoneNumber &&
              hasError === false
                ? false
                : true
            }
            title={'Proceed'}
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
              navigation.navigate('SocialInformation', {
                loan_plan: loan_plan,
                emi_plan: emi_plan,
                basic_information: {
                  name: name,
                  birth_date: birthDate,
                  ic_number: icNumber,
                  gender: gender,
                  race: race,
                  martial_status: martialStatus,
                  educational_level: educationalLevel,
                  home_ownership: homeOwnership,
                  address_line_1: addressLine1,
                  address_line_2: addressLine2,
                  city: city,
                  post_code: postCode,
                  state: state,
                  email: email,
                  phone_number: phoneNumber,
                },
              });
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  stepsIndicator: {
    marginTop: '5%',
  },
  form: {
    marginTop: '4%',
    marginHorizontal: '3.5%',
  },
});

export default BasicInformationScreen;
