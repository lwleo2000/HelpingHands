import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {Picker} from '@react-native-community/picker';
import {TextInput, HelperText} from 'react-native-paper';
import Currency from 'react-currency-formatter';
import {CheckBox, Button} from 'react-native-elements';
import CustomActivityIndicator from '../../constants/Components/ActivityIndicator';
import loanApplicationFormApi from '../../tools/Api/loanApplicationForm.api';

const LoanConfirmationScreen = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(4);
  const {
    loan_plan,
    emi_plan,
    basic_information,
    social_information,
    identity_photo,
  } = route.params;

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

  //form data
  const [bank, setBank] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankAccountName, setBankAccountName] = useState('');
  const [agree, setAgree] = useState(false);

  const [hasError, setHasError] = useState(false);

  const submitApplicationForm = async () => {
    setLoading(true);
    const bank_information = {
      bank: bank,
      bank_account_number: bankAccountNumber,
      bank_account_name: bankAccountName,
    };

    const formData = new FormData();

    //1. Store loan plan into form data
    formData.append('loan_plan', JSON.stringify(loan_plan));

    //2. Store emi plan into form data
    formData.append('emi_plan', JSON.stringify(emi_plan));

    //3. Store basic information into form data
    formData.append('basic_information', JSON.stringify(basic_information));

    //4. Store social information into form data
    formData.append('social_information', JSON.stringify(social_information));

    //5. Store bank information into form data
    formData.append('bank_information', JSON.stringify(bank_information));

    //6. Store identity photo into form data
    formData.append('front_NRIC_photo', {
      uri: identity_photo.front_NRIC_photo.assets[0].uri,
      name:
        'front_NRIC_photo.' +
        identity_photo.front_NRIC_photo.assets[0].type.substring(
          identity_photo.front_NRIC_photo.assets[0].type.indexOf('/') + 1,
          identity_photo.front_NRIC_photo.assets[0].type.length,
        ),
      type: identity_photo.front_NRIC_photo.assets[0].type,
    });

    formData.append('back_NRIC_photo', {
      uri: identity_photo.back_NRIC_photo.assets[0].uri,
      name:
        'back_NRIC_photo.' +
        identity_photo.back_NRIC_photo.assets[0].type.substring(
          identity_photo.back_NRIC_photo.assets[0].type.indexOf('/') + 1,
          identity_photo.back_NRIC_photo.assets[0].type.length,
        ),
      type: identity_photo.back_NRIC_photo.assets[0].type,
    });

    formData.append('face_photo', {
      uri: identity_photo.face_photo.assets[0].uri,
      name:
        'back_NRIC_photo.' +
        identity_photo.face_photo.assets[0].type.substring(
          identity_photo.face_photo.assets[0].type.indexOf('/') + 1,
          identity_photo.face_photo.assets[0].type.length,
        ),
      type: identity_photo.face_photo.assets[0].type,
    });

    const res = await loanApplicationFormApi.ApplyLoan(formData);
    if (res.status === 'ok') {
      setLoading(false);
      alert('Loan applied, please wait for approval and check mail frequently');
      navigation.navigate('HomeTabs', {screen: 'Home'});
    } else if (res.status === '400') {
      setLoading(false);
      alert(res.message);
      // navigation.navigate('HomeStack', {screen: 'Home'});
    } else {
      setLoading(false);
      alert('Fail to apply loan');
    }
  };

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
          Bank Information
        </Text>
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
            Bank
          </Text>
          <Picker
            selectedValue={bank}
            style={{width: '100%', marginLeft: '1%'}}
            onValueChange={(itemValue, itemIndex) => setBank(itemValue)}>
            <Picker.Item label="Select Bank" value="" />
            <Picker.Item label="Maybank" value="Maybank" />
            <Picker.Item
              label="CIMB Group Holdings"
              value="CIMB Group Holdings"
            />
            <Picker.Item
              label="Public Bank Berhad"
              value="Public Bank Berhad"
            />
            <Picker.Item label="RHB Bank" value="RHB Bank" />
            <Picker.Item label="Hong Leong Bank" value="Hong Leong Bank" />
            <Picker.Item label="AmBank" value="AmBank" />
            <Picker.Item label="UOB Malaysia" value="UOB Malaysia" />
            <Picker.Item label="Bank Rakyat" value="Bank Rakyat" />
            <Picker.Item
              label="OCBC Bank Malaysia"
              value="OCBC Bank Malaysia"
            />
            <Picker.Item
              label="HSBC Bank Malaysia"
              value="HSBC Bank Malaysia"
            />
            <Picker.Item
              label="Bank Islam Malaysia"
              value="Bank Islam Malaysia"
            />
            <Picker.Item label="Affin Bank" value="Affin Bank" />
            <Picker.Item
              label="Alliance Bank Malaysia Berhad"
              value="Alliance Bank Malaysia Berhad"
            />
            <Picker.Item
              label="Standard Chartered Bank Malaysia"
              value="Standard Chartered Bank Malaysia"
            />
            <Picker.Item label="MBSB Bank Berhad" value="MBSB Bank Berhad" />
            <Picker.Item label="Citibank Malaysia" value="Citibank Malaysia" />
            <Picker.Item
              label="Bank Simpanan Nasional (BSN)"
              value="Bank Simpanan Nasional (BSN)"
            />
            <Picker.Item
              label="Bank Muamalat Malaysia Berhad"
              value="Bank Muamalat Malaysia Berhad"
            />
            <Picker.Item label="Agrobank" value="Agrobank" />
            <Picker.Item label="Al-Rajhi Malaysia" value="Al-Rajhi Malaysia" />
            <Picker.Item
              label="Co-op Bank Pertama"
              value="Co-op Bank Pertama"
            />
          </Picker>
        </View>
        <HelperText type="error"></HelperText>
        <TextInput
          label="Bank Account Number"
          placeholder="Enter bank account number"
          activeUnderlineColor="#0F89FA"
          value={bankAccountNumber}
          keyboardType="number-pad"
          onChangeText={bankAccountNumber => {
            setBankAccountNumber(bankAccountNumber);
            if (/^[0-9\b]+$/.test(bankAccountNumber) != true) {
              setHasError(true);
            } else setHasError(false);
          }}
        />
        <HelperText
          type="error"
          visible={
            bankAccountNumber === '' ||
            /^[0-9\b]+$/.test(bankAccountNumber) == true
              ? false
              : true
          }>
          Invalid bank account number
        </HelperText>
        <TextInput
          label="Bank Account Name"
          placeholder="Enter bank account name"
          activeUnderlineColor="#0F89FA"
          value={bankAccountName}
          onChangeText={bankAccountName => {
            setBankAccountName(bankAccountName);
          }}
        />
        <HelperText type="error"></HelperText>
        <Text style={{color: '#000', padding: 10, fontSize: 18}}>
          Loan Confirmation
        </Text>
        <View style={styles.loanConfirmationBg}>
          <View>
            <Text
              style={{color: '#999999', fontSize: 15, marginVertical: '5%'}}>
              Loan Amount
            </Text>
            <Text
              style={{color: '#999999', fontSize: 15, marginVertical: '5%'}}>
              Loan Term
            </Text>
            <Text
              style={{color: '#999999', fontSize: 15, marginVertical: '5%'}}>
              EMI
            </Text>
            <Text
              style={{color: '#999999', fontSize: 15, marginVertical: '5%'}}>
              Total Interest
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 15, marginVertical: '5%'}}>
              <Currency
                quantity={parseFloat(emi_plan.loan_amount)}
                currency="MYR"
              />
            </Text>
            <Text style={{fontSize: 15, marginVertical: '5%'}}>
              {emi_plan.loan_term} months
            </Text>
            <Text style={{fontSize: 15, marginVertical: '5%'}}>
              <Currency
                quantity={parseFloat(emi_plan.loan_emi)}
                currency="MYR"
              />
            </Text>
            <Text style={{fontSize: 15, marginVertical: '5%'}}>
              <Currency
                quantity={parseFloat(emi_plan.total_interest)}
                currency="MYR"
              />
            </Text>
          </View>
        </View>
        <View
          style={{marginTop: '5%', flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox
            title="I agree"
            checkedColor="#61acf1"
            checkedIcon="check-square"
            checked={agree}
            containerStyle={{
              backgroundColor: 'transparent',
              alignSelf: 'flex-start',
              borderWidth: 0,
            }}
            onIconPress={() => setAgree(!agree)}
            onPress={() => setAgree(!agree)}
          />
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('ApplyLoanTermsAndCondition')}>
            <Text style={{color: '#228AD6'}}>(Terms &#38; Condition)</Text>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '5%',
            marginBottom: '15%',
          }}>
          <Button
            disabled={
              bank &&
              bankAccountNumber &&
              bankAccountName &&
              agree === true &&
              hasError === false &&
              loading === false
                ? false
                : true
            }
            title={'Submit'}
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
              submitApplicationForm();
            }}
          />
        </View>
      </View>
      <CustomActivityIndicator
        animating={loading}
        size="large"
        color="#61acf1"
      />
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
  loanConfirmationBg: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});

export default LoanConfirmationScreen;
