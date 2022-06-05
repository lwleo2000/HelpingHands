import React, {useContext, useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Currency from 'react-currency-formatter';
import {icons} from '../../constants';
import {Button, Icon} from 'react-native-elements';
import {context} from '../../App';
import NotLogin from '../NotLogin/NotLogin';
import moment from 'moment';
import loanApplicationFormApi from '../../tools/Api/loanApplicationForm.api';
import Modal from 'react-native-modal';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {ResponseError} from '../../tools/ErrorHandler/ErrorHandler';
import CustomActivityIndicator from '../../constants/Components/ActivityIndicator';

const MyLoanScreen = ({navigation}) => {
  const contextProvider = useContext(context);
  const [myLoan, setMyLoan] = useState([]);
  const [loanAgreementModalVisible, setLoanAgreementModalVisible] =
    useState(false);
  const [applicationID, setApplicationID] = useState('');
  const [loading, setLoading] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  useFocusEffect(
    useCallback(() => {
      if (contextProvider.isAuth) {
        getMyLoan();
      }
    }, []),
  );

  const handleRefresh = () => {
    getMyLoan();
  };

  const getMyLoan = async () => {
    setLoading(true);
    const res = await loanApplicationFormApi.GetLoanApplication();
    console.log(res, 777);
    if (res.status === 200) {
      setLoading(false);
      setMyLoan(res.data.data);
    } else {
      setLoading(false);
      ResponseError(res);
    }
  };

  const renderMyLoan = ({item}) => {
    return (
      <View>
        <TouchableWithoutFeedback
          onPress={() => {
            if (
              item.loan_agreement.agree === false &&
              item.loan_status === 'Approved'
            ) {
              setApplicationID(item.application_id);
              setLoanAgreementModalVisible(true);
            } else {
              navigation.navigate('MyLoanStack', {
                screen: 'MyLoanDetails',
                params: {
                  application_id: item.application_id,
                },
              });
            }
          }}>
          <View style={{borderBottomWidth: 0.2, borderColor: '#DCDCDC'}}>
            <View style={{marginTop: '3%', marginLeft: '3%'}}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                Application number : {item.application_id}
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  justifyContent: 'space-between',
                  marginTop: '3%',
                  width: '100%',
                }}>
                <View>
                  <Text style={{fontSize: 15}}>Loan Amount</Text>
                  <Text style={{fontSize: 15}}>Loan Term</Text>
                  <Text style={{fontSize: 15}}>EMI</Text>
                  <Text style={{fontSize: 15}}>Total Interest</Text>
                </View>
                <View style={{marginRight: '3%'}}>
                  <Text style={{fontSize: 15}}>
                    <Currency
                      quantity={parseFloat(item.emi_plan.loan_amount)}
                      currency="MYR"
                    />
                  </Text>
                  <Text style={{fontSize: 15}}>
                    {item.emi_plan.loan_term} months
                  </Text>
                  <Text style={{fontSize: 15}}>
                    <Currency
                      quantity={parseFloat(item.emi_plan.loan_emi)}
                      currency="MYR"
                    />
                  </Text>
                  <Text style={{fontSize: 15}}>
                    <Currency
                      quantity={parseFloat(item.emi_plan.total_interest)}
                      currency="MYR"
                    />
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: '5%',
                  marginRight: '3%',
                  marginBottom: '3%',
                }}>
                <View>
                  <Text style={{color: 'gray'}}>
                    {moment(item.creation_date).format('ll')}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor:
                      item.loan_status === 'Approved'
                        ? '#CCF0C7'
                        : item.loan_status === 'Rejected'
                        ? '#FBCBCB'
                        : item.loan_status === 'Under Approval'
                        ? '#F4DEBB'
                        : item.loan_status === 'Loan Disbursed'
                        ? '#BBBEF4'
                        : item.loan_status === 'Suspended'
                        ? '#C29DD8'
                        : '#CAEBEB',
                    paddingHorizontal: 25,
                    paddingVertical: 5,
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color:
                        item.loan_status === 'Approved'
                          ? '#1E7310'
                          : item.loan_status === 'Rejected'
                          ? '#B80909'
                          : item.loan_status === 'Under Approval'
                          ? '#D78A17'
                          : item.loan_status === 'Loan Disbursed'
                          ? '#3A44F4'
                          : item.loan_status === 'Suspended'
                          ? '#8E17D7'
                          : '#00C4B4',
                    }}>
                    {item.loan_status}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const skeleton = (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <SkeletonPlaceholder>
        <View style={{width: windowWidth, height: 180}}></View>
      </SkeletonPlaceholder>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {contextProvider.isAuth ? (
        loading === false ? (
          myLoan.length === 0 ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={{width: 150, height: 150}}
                source={icons.emptyLoan}
              />
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                No Loan Found
              </Text>
              <Text>Check out the loan plan at home page and apply loan</Text>
              <Button
                title={'Check Loan Plan'}
                buttonStyle={{
                  marginTop: '5%',
                  width: 200,
                  borderRadius: 5,
                  backgroundColor: '#61acf1',
                }}
                onPress={() => {
                  navigation.navigate('HomeTabs', {screen: 'Home'});
                }}
              />
            </View>
          ) : (
            <View>
              <FlatList
                data={myLoan}
                renderItem={renderMyLoan}
                keyExtractor={item => item.application_id}
                refreshing={loading}
                refreshControl={
                  <RefreshControl
                    refreshing={loading}
                    onRefresh={handleRefresh}
                  />
                }
              />
              <Modal
                isVisible={loanAgreementModalVisible}
                onBackdropPress={() => setLoanAgreementModalVisible(false)}
                useNativeDriver
                hideModalContentWhileAnimating
                backdropColor="rgba(0, 0, 0, 0.5)">
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
                      Looks like you do not sign the loan agreement form yet.
                    </Text>
                    <Icon
                      type="material"
                      name="close"
                      color="#014f86"
                      onPress={() => setLoanAgreementModalVisible(false)}
                      Component={TouchableOpacity}
                      style={{zIndex: 10}}
                    />
                  </View>
                  <Button
                    title="Sign Loan Agreement"
                    type="solid"
                    containerStyle={{paddingVertical: 8}}
                    titleStyle={{color: '#fff'}}
                    buttonStyle={{backgroundColor: '#61acf1'}}
                    onPress={() => {
                      setLoanAgreementModalVisible(false);
                      navigation.navigate('MyLoanStack', {
                        screen: 'LoanAgreement',
                        params: {
                          application_id: applicationID,
                        },
                      });
                    }}
                  />
                </View>
              </Modal>
            </View>
          )
        ) : (
          <CustomActivityIndicator
            animating={loading}
            size="large"
            color="#61acf1"
          />
        )
      ) : (
        <NotLogin navigation={navigation} />
      )}
    </View>
  );
};

export default MyLoanScreen;
