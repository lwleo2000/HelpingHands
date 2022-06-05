import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import CustomActivityIndicator from '../../constants/Components/ActivityIndicator';
import loanApplicationFormApi from '../../tools/Api/loanApplicationForm.api';
import {ResponseError} from '../../tools/ErrorHandler/ErrorHandler';
import moment from 'moment';
import Currency from 'react-currency-formatter';
import {Icon, Button} from 'react-native-elements';
import Signature from 'react-native-signature-canvas';
import Modal from 'react-native-modal';
import {images} from '../../constants';
import RNFetchBlob from 'react-native-fetch-blob';

const LoanAgreementScreen = ({route, navigation}) => {
  const ref = useRef();
  const {application_id, customer_id} = route.params;
  const [myLoan, setMyLoan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [signModalVisible, setSignModalVisible] = useState(false);
  const [signature, setSignature] = useState('');
  const [imagePath, setImagePath] = useState('');
  useEffect(() => {
    getMyLoanDetails();
    requestReadStoragePermission();
    requestWriteStoragePermission();
  }, []);

  const requestReadStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'HelpingHands Read Storage Permission',
          message:
            'HelpingHands App needs access to your storage ' +
            'so you can provide your signature.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the signature feature');
      } else {
        console.log('Storage permission denied');
        navigation.navigate('MyLoan');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestWriteStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'HelpingHands Write Storage Permission',
          message:
            'HelpingHands App needs access to your storage ' +
            'so you can provide your signature.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the signature feature');
      } else {
        console.log('Storage permission denied');
        navigation.navigate('MyLoan');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log('clear success!');
    ref.current.clearSignature();
  };

  const handleConfirm = () => {
    console.log('end');
    ref.current.readSignature();
  };

  const getMyLoanDetails = async () => {
    setLoading(true);
    const res = await loanApplicationFormApi.GetLoanApplicationDetails(
      application_id,
    );
    if (res.status === 200) {
      setLoading(false);
      setMyLoan(res.data.data);
    } else {
      setLoading(false);
      ResponseError(res);
    }
  };

  const handleSubmitLoanAgreement = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('application_id', application_id);
      console.log(imagePath, 'hehe');
      formData.append('signature', {
        uri: imagePath,
        name: 'signature.jpeg',
        type: 'image/jpeg',
      });
      const res = await loanApplicationFormApi.SubmitLoanAgreement(formData);
      if (res.status === 'ok') {
        RNFetchBlob.fs
          .unlink(imagePath)
          .then(() => {
            console.log('FILE DELETED');
          })
          // `unlink` will throw an error, if the item to unlink does not exist
          .catch(err => {
            console.log(err.message);
          });
        setLoading(false);
        navigation.navigate('MyLoan');
        alert('Loan agreement submitted, please wait for loan disbursement.');
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.log(err, 1234);
    }
  };

  const writeImageToTempPath = async signature => {
    const base64Signature = signature.split('data:image/png;base64,');
    console.log(base64Signature, 5566);
    const dirs = RNFetchBlob.fs.dirs;

    var path = dirs.DCIMDir + '/signature.jpeg';

    RNFetchBlob.fs.writeFile(path, base64Signature[1], 'base64').then(res => {
      console.log('File : ', res, 'at path ' + path);
    });
    setImagePath('file://' + path);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
      {myLoan[0] ? (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
          <Text style={{fontSize: 20, alignSelf: 'center'}}>
            HelpingHands Loan Agreement
          </Text>
          <Text style={{marginTop: '5%', textAlign: 'justify'}}>
            The loan agreement is made and will be effective on{' '}
            {myLoan[0].loan_agreement.submission_date
              ? moment(myLoan[0].loan_agreement.submission_date).format(
                  'YYYY-MM-DD',
                )
              : moment(Date.now()).format('YYYY-MM-DD')}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              alignSelf: 'center',
              marginVertical: '3%',
            }}>
            BETWEEN
          </Text>
          <Text style={{textAlign: 'justify'}}>
            <Text style={{fontWeight: 'bold'}}>
              {myLoan[0].basic_information.name}
            </Text>{' '}
            with the introduction as borrower with street address of{' '}
            {myLoan[0].basic_information.address_line_1 +
              ',' +
              ' ' +
              myLoan[0].basic_information.address_line_2 +
              ' along with city of ' +
              myLoan[0].basic_information.city +
              ', state of ' +
              myLoan[0].basic_information.state +
              ', post code of ' +
              myLoan[0].basic_information.post_code +
              '.'}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              alignSelf: 'center',
              marginVertical: '3%',
            }}>
            AND
          </Text>
          <Text style={{textAlign: 'justify'}}>
            HelpingHands with the introduction as lender with street address of
            1, lorong Oren 66, Taman Oren along with city of Sungai Long, state
            of Selangor, post code of 43000.
          </Text>
          <Text style={{marginTop: '3%', textAlign: 'justify'}}>
            HEREINAFTER, the Borrower and Lender agree to the following loan
            details:
          </Text>
          <Text style={{marginTop: '3%'}}>
            <Text style={{fontWeight: 'bold'}}>LOAN AMOUNT:</Text>{' '}
            <Currency
              quantity={myLoan[0].emi_plan.loan_amount}
              currency="MYR"
            />
          </Text>
          <Text style={{marginTop: '3%'}}>
            <Text style={{fontWeight: 'bold'}}>LOAN TERM:</Text>{' '}
            {myLoan[0].emi_plan.loan_term} month(s)
          </Text>
          <Text style={{marginTop: '3%'}}>
            <Text style={{fontWeight: 'bold'}}>LOAN EMI:</Text>{' '}
            <Currency quantity={myLoan[0].emi_plan.loan_emi} currency="MYR" />
          </Text>
          <Text style={{marginTop: '3%'}}>
            <Text style={{fontWeight: 'bold'}}>TOTAL INTEREST AMOUNT:</Text>{' '}
            <Currency
              quantity={myLoan[0].emi_plan.total_interest}
              currency="MYR"
            />
          </Text>
          <Text style={{marginTop: '3%', textAlign: 'justify'}}>
            Bear the interest is at the rate of{' '}
            <Text style={{fontWeight: 'bold'}}>
              {myLoan[0].loan_plan.annual_interest_rate}%{' '}
            </Text>
            compounded annually.
          </Text>
          <Text style={{marginTop: '3%', fontWeight: 'bold'}}>
            PROMISE TO PAY:
          </Text>
          <Text style={{marginTop: '3%', textAlign: 'justify'}}>
            {'Within ' +
              myLoan[0].emi_plan.loan_term +
              ' months from the next month after the loan is disbursed. Borrower promises to pay the Lender '}
            <Currency quantity={myLoan[0].emi_plan.loan_emi} currency="MYR" />{' '}
            before the EMI due date of each month.
          </Text>
          <Text style={{marginTop: '3%', textAlign: 'justify'}}>
            All payments made by the Borrower are to be applied first to any
            accrued interest and then to the principal balance.
          </Text>
          <Text style={{marginTop: '3%', fontWeight: 'bold'}}>
            PAYMENT INSTRUCTIONS:
          </Text>
          <Text style={{marginTop: '3%', textAlign: 'justify'}}>
            The Borrower shall make payment to the Lender using FPX online
            banking provided by the HelpingHands apps.
          </Text>
          <Text style={{marginTop: '3%', fontWeight: 'bold'}}>LATE FEE:</Text>
          <Text style={{marginTop: '3%', textAlign: 'justify'}}>
            If the Borrower missed the payment due date, the Lender shall charge
            a late fee of 2% of the payment owed.
          </Text>
          <Text style={{marginTop: '3%', fontWeight: 'bold'}}>LICENSE:</Text>
          <Text style={{marginTop: '3%', textAlign: 'justify'}}>
            The Lender is a licensed moneylender under the Moneylenders Act 1951
            hereby agrees to lend the Borrower and the Borrowers agree to borrow
            from the Lender for the purpose of this agreement a sum of money as
            specified above.
          </Text>
          <Text style={{marginTop: '3%', fontWeight: 'bold'}}>DEFAULT:</Text>
          <Text style={{marginTop: '3%', textAlign: 'justify'}}>
            The Lender has the right to assign the Borrower as loan defaulter if
            the Borrower delays their equated monthly installment by 90 days.
          </Text>
          <Text style={{marginTop: '3%', fontWeight: 'bold'}}>
            Lender's Signature:
          </Text>
          <Image
            source={images.lenderSign}
            style={{
              resizeMode: 'contain',
              width: 300,
              height: 300,
            }}
          />
          <Text style={{marginTop: '3%', fontWeight: 'bold'}}>
            Borrower's Signature:
          </Text>
          <View>
            {myLoan[0].loan_agreement.agree === false ? (
              signature ? (
                <Image
                  source={{
                    uri: signature,
                  }}
                  style={{
                    resizeMode: 'contain',
                    width: 300,
                    height: 300,
                  }}
                />
              ) : null
            ) : (
              <Image
                source={{
                  uri: myLoan[0].loan_agreement.signature[0].url,
                }}
                style={{
                  resizeMode: 'contain',
                  width: 250,
                  height: 150,
                }}
              />
            )}
          </View>
          {myLoan[0].loan_agreement.agree === false && (
            <View>
              <Button
                title={'Agree and Sign'}
                buttonStyle={{
                  marginTop: '5%',
                  width: '100%',
                  borderRadius: 5,
                  backgroundColor: '#61acf1',
                  alignSelf: 'center',
                  marginTop: '5%',
                }}
                onPress={() => {
                  setSignModalVisible(true);
                }}
              />
              <Button
                title={'Submit Loan Agreement'}
                buttonStyle={{
                  marginTop: '5%',
                  width: '100%',
                  borderRadius: 5,
                  backgroundColor: '#61acf1',
                  alignSelf: 'center',
                  marginTop: '5%',
                  marginBottom: '10%',
                }}
                disabled={signature ? false : true}
                onPress={handleSubmitLoanAgreement}
              />
            </View>
          )}
        </ScrollView>
      ) : null}
      <CustomActivityIndicator
        animating={loading}
        size="large"
        color="#61acf1"
      />
      <Modal
        isVisible={signModalVisible}
        onBackdropPress={() => setSignModalVisible(false)}
        useNativeDriver
        hideModalContentWhileAnimating
        backdropColor="rgba(0, 0, 0, 0.5)">
        <View style={{height: 300}}>
          <Signature
            ref={ref}
            onOK={img => {
              setSignature(img);
              setSignModalVisible(false);
              writeImageToTempPath(img);
            }}
            autoClear={true}
            imageType="image/png"
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
            <Button
              title="Clear"
              onPress={handleClear}
              buttonStyle={{backgroundColor: '#61acf1'}}
            />
            <Text>Sign Above</Text>
            <Button
              title="Confirm"
              onPress={handleConfirm}
              buttonStyle={{backgroundColor: '#61acf1'}}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoanAgreementScreen;
