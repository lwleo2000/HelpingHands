import React, {useState, useEffect} from 'react';
import StepIndicator from 'react-native-step-indicator';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';
import {Picker} from '@react-native-community/picker';
import {Button} from 'react-native-elements';

const SocialInformationScreen = ({route, navigation}) => {
  const [currentPage, setCurrentPage] = useState(2);
  const {loan_plan, emi_plan, basic_information} = route.params;

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

  //Form data
  const [companyName, setCompanyName] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [position, setPosition] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [employmentLength, setEmploymentLength] = useState('');
  const [dependantName1, setDependantName1] = useState('');
  const [dependantRelationship1, setDependantRelationship1] = useState('');
  const [dependantPhoneNumber1, setDependantPhoneNumber1] = useState('');
  const [dependantName2, setDependantName2] = useState('');
  const [dependantRelationship2, setDependantRelationship2] = useState('');
  const [dependantPhoneNumber2, setDependantPhoneNumber2] = useState('');

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    console.log(loan_plan);
    console.log(emi_plan);
    console.log(basic_information);
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
          Working Information
        </Text>
        <TextInput
          label="Company Name"
          placeholder="Enter company name"
          activeUnderlineColor="#0F89FA"
          value={companyName}
          onChangeText={companyName => {
            setCompanyName(companyName);
          }}
        />
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
            Employment Status
          </Text>
          <Picker
            selectedValue={employmentStatus}
            style={{width: '100%', marginLeft: '1%'}}
            onValueChange={(itemValue, itemIndex) =>
              setEmploymentStatus(itemValue)
            }>
            <Picker.Item label="Select Employment Status" value="" />
            <Picker.Item label="Worker" value="Worker" />
            <Picker.Item label="Employee" value="Employee" />
            <Picker.Item label="Self-employed" value="Self-employed" />
          </Picker>
        </View>
        <HelperText type="error"></HelperText>
        <TextInput
          label="Position"
          placeholder="Enter position"
          activeUnderlineColor="#0F89FA"
          value={position}
          onChangeText={position => {
            setPosition(position);
          }}
        />
        <HelperText type="error"></HelperText>
        <TextInput
          label="Office address"
          placeholder="Enter office address"
          activeUnderlineColor="#0F89FA"
          multiline={true}
          value={officeAddress}
          onChangeText={officeAddress => {
            setOfficeAddress(officeAddress);
          }}
        />
        <HelperText type="error"></HelperText>
        <TextInput
          label="Company contact"
          placeholder="Enter contact number in digits only"
          activeUnderlineColor="#0F89FA"
          keyboardType="phone-pad"
          value={companyPhoneNumber}
          onChangeText={companyPhoneNumber => {
            setCompanyPhoneNumber(companyPhoneNumber);
            if (/^[0-9\b]+$/.test(companyPhoneNumber) != true) {
              setHasError(true);
            } else setHasError(false);
          }}
        />
        <HelperText
          type="error"
          visible={
            companyPhoneNumber === '' ||
            /^[0-9\b]+$/.test(companyPhoneNumber) == true
              ? false
              : true
          }>
          Invalid contact number
        </HelperText>
        <TextInput
          label="Annual income"
          placeholder="Enter annual income (RM 0.00)"
          activeUnderlineColor="#0F89FA"
          keyboardType="number-pad"
          value={annualIncome}
          onChangeText={annualIncome => {
            setAnnualIncome(annualIncome);
            if (/^([0-9]*[.])?[0-9]+$/.test(annualIncome) != true) {
              setHasError(true);
            } else setHasError(false);
          }}
        />
        <HelperText
          type="error"
          visible={
            annualIncome === '' ||
            /^([0-9]*[.])?[0-9]+$/.test(annualIncome) == true
              ? false
              : true
          }>
          Invalid annual income
        </HelperText>
        <TextInput
          label="Employment Length"
          placeholder="Enter employment length in term of year (0.5 for 6 months)"
          activeUnderlineColor="#0F89FA"
          keyboardType="number-pad"
          value={employmentLength}
          onChangeText={employmentLength => {
            setEmploymentLength(employmentLength);
            if (/^([0-9]*[.])?[0-9]+$/.test(employmentLength) != true) {
              setHasError(true);
            } else setHasError(false);
          }}
        />
        <HelperText
          type="error"
          visible={
            employmentLength === '' ||
            /^([0-9]*[.])?[0-9]+$/.test(employmentLength) == true
              ? false
              : true
          }>
          Invalid employment length
        </HelperText>
        <HelperText type="error"></HelperText>
        <Text style={{color: '#000', padding: 10, fontSize: 18}}>
          1. Emergency contact
        </Text>
        <TextInput
          label="Name"
          placeholder="Enter dependant name"
          activeUnderlineColor="#0F89FA"
          value={dependantName1}
          onChangeText={dependantName1 => {
            setDependantName1(dependantName1);
          }}
        />
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
            Relationship
          </Text>
          <Picker
            selectedValue={dependantRelationship1}
            style={{
              width: '100%',
              marginLeft: '1%',
            }}
            onValueChange={(itemValue, itemIndex) =>
              setDependantRelationship1(itemValue)
            }>
            <Picker.Item label="Select Relationship" value="" />
            <Picker.Item label="Children" value="Children" />
            <Picker.Item label="Sibling" value="Sibling" />
            <Picker.Item label="Spouse" value="Spouse" />
            <Picker.Item label="Parent" value="Parent" />
          </Picker>
        </View>
        <HelperText type="error"></HelperText>
        <TextInput
          label="Phone Number"
          placeholder="Enter phone number in digits only"
          activeUnderlineColor="#0F89FA"
          keyboardType="phone-pad"
          value={dependantPhoneNumber1}
          maxLength={11}
          onChangeText={dependantPhoneNumber1 => {
            setDependantPhoneNumber1(dependantPhoneNumber1);
            if (/^(?=.{10,11}$)[0-9\b]+$/.test(dependantPhoneNumber1) != true) {
              setHasError(true);
            } else setHasError(false);
          }}
        />
        <HelperText
          type="error"
          visible={
            dependantPhoneNumber1 === '' ||
            /^(?=.{10,11}$)[0-9\b]+$/.test(dependantPhoneNumber1) == true
              ? false
              : true
          }>
          Invalid phone number
        </HelperText>
        <Text style={{color: '#000', padding: 10, fontSize: 18}}>
          2. Emergency contact
        </Text>
        <TextInput
          label="Name"
          placeholder="Enter dependant name"
          activeUnderlineColor="#0F89FA"
          value={dependantName2}
          onChangeText={dependantName2 => {
            setDependantName2(dependantName2);
          }}
        />
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
            Relationship
          </Text>
          <Picker
            selectedValue={dependantRelationship2}
            style={{
              width: '100%',
              marginLeft: '1%',
            }}
            onValueChange={(itemValue, itemIndex) =>
              setDependantRelationship2(itemValue)
            }>
            <Picker.Item label="Select Relationship" value="" />
            <Picker.Item label="Children" value="Children" />
            <Picker.Item label="Sibling" value="Sibling" />
            <Picker.Item label="Spouse" value="Spouse" />
            <Picker.Item label="Parent" value="Parent" />
          </Picker>
        </View>
        <HelperText type="error"></HelperText>
        <TextInput
          label="Phone Number"
          placeholder="Enter phone number in digits only"
          activeUnderlineColor="#0F89FA"
          keyboardType="phone-pad"
          value={dependantPhoneNumber2}
          maxLength={11}
          onChangeText={dependantPhoneNumber2 => {
            setDependantPhoneNumber2(dependantPhoneNumber2);
            if (/^(?=.{10,11}$)[0-9\b]+$/.test(dependantPhoneNumber2) != true) {
              setHasError(true);
            } else setHasError(false);
          }}
        />
        <HelperText
          type="error"
          visible={
            dependantPhoneNumber2 === '' ||
            /^(?=.{10,11}$)[0-9\b]+$/.test(dependantPhoneNumber2) == true
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
              companyName &&
              employmentStatus &&
              position &&
              officeAddress &&
              companyPhoneNumber &&
              annualIncome &&
              employmentLength &&
              dependantName1 &&
              dependantRelationship1 &&
              dependantPhoneNumber1 &&
              dependantName2 &&
              dependantRelationship2 &&
              dependantPhoneNumber2 &&
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
              navigation.navigate('IdentityAuthentication', {
                loan_plan: loan_plan,
                emi_plan: emi_plan,
                basic_information: basic_information,
                social_information: {
                  company_name: companyName,
                  employment_status: employmentStatus,
                  position: position,
                  office_address: officeAddress,
                  company_phone_number: companyPhoneNumber,
                  annual_income: annualIncome,
                  employment_length: employmentLength,
                  dependant_name_1: dependantName1,
                  dependant_relationship_1: dependantRelationship1,
                  dependant_phone_number_1: dependantPhoneNumber1,
                  dependant_name_2: dependantName2,
                  dependant_relationship_2: dependantRelationship2,
                  dependant_phone_number_2: dependantPhoneNumber2,
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

export default SocialInformationScreen;
