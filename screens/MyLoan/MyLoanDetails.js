import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Currency from 'react-currency-formatter';
import * as Progress from 'react-native-progress';
import moment from 'moment';
import {Picker} from '@react-native-community/picker';
import stripe from 'tipsi-stripe';
import paymentApi from '../../tools/Api/payment.api';
import loanApplicationFormApi from '../../tools/Api/loanApplicationForm.api';
import {ResponseError} from '../../tools/ErrorHandler/ErrorHandler';
import CustomActivityIndicator from '../../constants/Components/ActivityIndicator';
import reminderApi from '../../tools/Api/reminder.api';
import {images} from '../../constants';
import Modal from 'react-native-modal';
import {Icon, Button, FAB} from 'react-native-elements';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const MyLoanDetailsScreen = ({route, navigation}) => {
  const {application_id} = route.params;
  const [loading, setLoading] = useState(false);
  const [myLoan, setMyLoan] = useState([]);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [reminder, setReminder] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  stripe.setOptions({
    publishableKey:
      'pk_test_51KcQ7OK5hHCxYm1texJrSKgpysYEWGBt021Kr5suSrP3V17EsVKMybf9rhsbt91O5VG4135v4uL72FLuvYQIvbIr00B96fy3Vr',
  });
  navigation.setOptions({
    headerRight: () =>
      myLoan[0]
        ? myLoan[0].loan_agreement.agree === true && (
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('LoanAgreement', {
                  application_id: application_id,
                });
              }}>
              <Icon
                type="font-awesome"
                name="wpforms"
                color="#fff"
                style={{paddingRight: 15}}
              />
            </TouchableWithoutFeedback>
          )
        : null,
  });
  // const handleNotification = () => {
  //   PushNotification.localNotificationSchedule({
  //     channelId: 'C001',
  //     title: 'Reminder on EMI payment',
  //     message:
  //       'Your EMI due date is on ' +
  //       moment
  //         .unix(myLoan.payment.emi_due_date)
  //         .format('DD-MMM-YYYY')
  //         .toString(),
  //     date: new Date(myLoan.payment.emi_due_date * 1000 - reminder), // multiply unix by 1000 because javascript works in milliseconds
  //   });
  // };

  useFocusEffect(
    useCallback(() => {
      getMyLoanDetails();
    }, []),
  );

  const getMyLoanDetails = async () => {
    setLoading(true);
    const res = await loanApplicationFormApi.GetLoanApplicationDetails(
      application_id,
    );
    console.log(res.data.data, 777);
    if (res.status === 200) {
      setLoading(false);
      setMyLoan(res.data.data);
      setReminder(res.data.data[0].payment.reminder);
    } else {
      setLoading(false);
      ResponseError(res);
    }
  };

  const requestPayment = async withPenaltyFee => {
    navigation.navigate('Payment', {
      application_id: application_id,
      with_penalty_fee: withPenaltyFee,
    });

    // const paymentIntent = await stripe.confirmPaymentIntent(
    //   'sk_test_51KcQ7OK5hHCxYm1tvSaQVKuMTJd8gcviCGgCanIsHxo6rixoFNsl1LaMnc8L1kH6rNKx9Hmhi0F8B3aroJMUbEyu002ePRvG6O',
    //   {
    //     type: 'Fpx',
    //   },
    // );

    // const stripeTokenInfo = await stripe.paymentRequestWithCardForm();
    // console.log(stripeTokenInfo, 1234);
    // setLoading(true);
    // const res = await paymentApi.PayWithStripe({
    //   application_id: myLoan[0].application_id,
    //   amount: myLoan[0].emi_plan.loan_emi,
    //   token_id: stripeTokenInfo.id,
    // });

    // if (res.status === 200) {
    //   setLoading(false);
    //   getMyLoanDetails();
    // } else {
    //   setLoading(false);
    //   ResponseError(res);
    // }
  };

  const setDueDateReminder = async reminder => {
    setLoading(true);
    setReminder(reminder);
    const res = await reminderApi.SetDueDateReminder({
      application_id: application_id,
      reminder: reminder,
    });
    if (res.status === 200) {
      setLoading(false);
    } else {
      setLoading(false);
      ResponseError(res);
    }
  };

  const skeleton = (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <SkeletonPlaceholder>
        <View style={{padding: 10}}>
          <View
            style={{
              marginTop: '5%',
              width: windowWidth * 0.7,
              height: 100,
              alignSelf: 'center',
              borderRadius: 5,
            }}></View>
          <View
            style={{
              marginTop: '10%',
              width: windowWidth * 0.3,
              height: 20,
              alignSelf: 'flex-start',
              borderRadius: 5,
            }}></View>
          <View
            style={{
              marginTop: '2%',
              width: windowWidth * 0.8,
              height: 10,
              alignSelf: 'flex-start',
              borderRadius: 15,
            }}></View>
          <View
            style={{
              marginTop: '10%',
              width: windowWidth * 0.95,
              height: 40,
              alignSelf: 'center',
              borderRadius: 5,
            }}></View>
          <View
            style={{
              marginTop: '5%',
              width: windowWidth * 0.8,
              height: 40,
              borderRadius: 5,
            }}></View>
          <View
            style={{
              marginTop: '5%',
              width: windowWidth * 0.95,
              height: 40,
              alignSelf: 'center',
              borderRadius: 5,
            }}></View>
          <View
            style={{
              marginTop: '5%',
              width: windowWidth * 0.8,
              height: 40,
              borderRadius: 5,
            }}></View>
          <View
            style={{
              marginTop: '5%',
              width: windowWidth * 0.9,
              height: 40,
              borderRadius: 5,
            }}></View>
          <View
            style={{
              marginTop: '5%',
              width: windowWidth * 0.95,
              height: 40,
              alignSelf: 'center',
              borderRadius: 5,
            }}></View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {myLoan[0] ? (
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              borderBottomWidth: 0.2,
              borderColor: '#DCDCDC',
            }}>
            <Text style={{marginTop: '4%', color: 'gray', fontSize: 20}}>
              Total Repayment
            </Text>
            <Text style={{marginTop: '5%', fontWeight: 'bold', fontSize: 30}}>
              <Currency
                quantity={myLoan[0].payment.total_repayment}
                currency="MYR"
              />
            </Text>
            <Text
              style={{
                marginTop: '10%',
                alignSelf: 'flex-start',
                marginLeft: '2%',
                fontSize: 15,
                color: 'gray',
              }}>
              EMI paid: {myLoan[0].payment.emi_paid}/
              {myLoan[0].emi_plan.loan_term}
            </Text>
            <View
              style={{
                alignSelf: 'flex-start',
                marginLeft: '2%',
                marginTop: '2%',
                marginBottom: '5%',
              }}>
              <Progress.Bar
                progress={
                  myLoan[0].payment.emi_paid / myLoan[0].emi_plan.loan_term
                }
                color="#61ACF1"
                unfilledColor="#C4C4C4"
                borderWidth={0}
                height={10}
                width={Dimensions.get('window').width / 1.2}
              />
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 0.2,
              borderColor: '#DCDCDC',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: '3%',
                marginVertical: '5%',
              }}>
              <Text style={{color: 'gray', fontSize: 15}}>Loan Amount</Text>
              <Text style={{fontSize: 15}}>
                <Currency
                  quantity={myLoan[0].emi_plan.loan_amount}
                  currency="MYR"
                />
              </Text>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 0.2,
              borderColor: '#DCDCDC',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: '3%',
                marginVertical: '5%',
              }}>
              <Text style={{color: 'gray', fontSize: 15}}>Loan Term</Text>
              <Text style={{fontSize: 15}}>
                {myLoan[0].emi_plan.loan_term} months
              </Text>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 0.2,
              borderColor: '#DCDCDC',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: '3%',
                marginVertical: '5%',
              }}>
              <Text style={{color: 'gray', fontSize: 15}}>EMI</Text>
              <Text style={{fontSize: 15}}>
                <Currency
                  quantity={myLoan[0].emi_plan.loan_emi}
                  currency="MYR"
                />
              </Text>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 0.2,
              borderColor: '#DCDCDC',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: '3%',
                marginVertical: '5%',
              }}>
              <Text style={{color: 'gray', fontSize: 15}}>Total Interest</Text>
              <Text style={{fontSize: 15}}>
                <Currency
                  quantity={myLoan[0].emi_plan.total_interest}
                  currency="MYR"
                />
              </Text>
            </View>
          </View>
          {myLoan[0].loan_status === 'Loan Disbursed' && (
            <View>
              <View
                style={{
                  borderBottomWidth: 0.2,
                  borderColor: '#DCDCDC',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: '3%',
                    marginVertical: '5%',
                  }}>
                  <Text style={{color: 'gray', fontSize: 15}}>
                    Next Due Date
                  </Text>
                  <Text style={{fontSize: 15}}>
                    {moment(myLoan[0].payment.emi_due_date).format(
                      'DD-MMM-YYYY',
                    )}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomWidth: 0.2,
                  borderColor: '#DCDCDC',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: '3%',
                    marginVertical: '5%',
                  }}>
                  <Text style={{color: 'gray', fontSize: 15}}>Penalty Fee</Text>
                  <Text style={{fontSize: 15}}>
                    <Currency
                      quantity={
                        myLoan[0].payment.penalty_fee
                          ? myLoan[0].payment.penalty_fee
                          : 0
                      }
                      currency="MYR"
                    />
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomWidth: 0.2,
                  borderColor: '#DCDCDC',
                  justifyContent: 'center',
                }}>
                <Picker
                  selectedValue={reminder}
                  style={{
                    width: '100%',
                    marginLeft: '1%',
                    height: 60,
                  }}
                  onValueChange={(itemValue, itemIndex) => {
                    setDueDateReminder(itemValue);
                  }}>
                  <Picker.Item label="No Reminder" value={0} />
                  <Picker.Item label="Remind 1 day before" value={1} />
                  <Picker.Item label="Remind 2 days before" value={2} />
                  <Picker.Item label="Remind 3 days before" value={3} />
                  <Picker.Item label="Remind 4 days before" value={4} />
                  <Picker.Item label="Remind 5 days before" value={5} />
                </Picker>
              </View>
              <View
                style={{
                  borderBottomWidth: 0.2,
                  borderColor: '#DCDCDC',
                  marginBottom: '20%',
                }}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    //Check whether the user is assigned with penalty fee
                    if (myLoan[0].payment.penalty_fee > 0) {
                      setPaymentModalVisible(true);
                    } else {
                      requestPayment('false'); // with penalty fee = false
                    }
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: '3%',
                      marginVertical: '5%',
                    }}>
                    <Text
                      style={{
                        color: '#61acf1',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      Pay EMI
                    </Text>
                    <Image
                      source={images.FPXLogo}
                      resizeMode="contain"
                      style={{
                        height: 20,
                        width: 60,
                      }}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          )}
        </ScrollView>
      ) : (
        skeleton
      )}
      {/* <CustomActivityIndicator
        animating={loading}
        size="large"
        color="#61acf1"
      /> */}
      <Modal
        isVisible={paymentModalVisible}
        onModalHide={() => {}}
        onBackdropPress={() => setPaymentModalVisible(false)}
        useNativeDriver
        hideModalContentWhileAnimating>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            paddingVertical: 15,
            paddingHorizontal: 24,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                paddingVertical: 8,
                paddingHorizontal: 8,
                fontWeight: 'bold',
                fontSize: 15,
                color: '#6d6e70',
              }}>
              It seems that you have penatly fee with you, it is adviced to pay
              off the penalty fee as quickly as possible.
            </Text>
            <Icon
              type="material"
              name="close"
              color="#014f86"
              onPress={() => setPaymentModalVisible(false)}
              Component={TouchableOpacity}
              style={{zIndex: 10}}
            />
          </View>
          <Button
            title="Pay EMI only"
            type="solid"
            containerStyle={{paddingVertical: 8}}
            titleStyle={{color: '#fff'}}
            buttonStyle={{backgroundColor: '#61acf1'}}
            onPress={() => {
              setPaymentModalVisible(false);
              requestPayment('false'); //with penalty fee = false
            }}
          />
          <Button
            title="Pay EMI and penalty fee"
            type="solid"
            containerStyle={{paddingVertical: 8}}
            titleStyle={{color: '#fff'}}
            buttonStyle={{backgroundColor: '#61acf1'}}
            onPress={() => {
              setPaymentModalVisible(false);
              requestPayment('true'); //with penalty fee = true
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default MyLoanDetailsScreen;
