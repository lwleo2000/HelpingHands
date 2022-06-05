import React, {useEffect, useState, useContext, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import Currency from 'react-currency-formatter';
import PushNotification from 'react-native-push-notification';
import loanPlanApi from '../../tools/Api/loanPlan.api';
import loanApplicationFormApi from '../../tools/Api/loanApplicationForm.api';
import {ResponseError} from '../../tools/ErrorHandler/ErrorHandler';
import {context} from '../../App';
import FirebaseCloudMessasgingPlugin from '../../plugin/FirebaseCloudMessasging.plugin';
import LinearGradient from 'react-native-linear-gradient';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Carousel from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

const HomeScreen = ({navigation}) => {
  const contextProvider = useContext(context);
  const activeLoanApplication = contextProvider.activeLoanApplication;
  const [loanPlan, setLoanPlan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [advertisement, setAdvertisement] = useState([
    {
      title: 'image 1',
      image_url:
        'https://helpinghands-bucket-2000.s3.ap-southeast-1.amazonaws.com/ads_1.png',
    },
    {
      title: 'image 2',
      image_url:
        'https://helpinghands-bucket-2000.s3.ap-southeast-1.amazonaws.com/ads_2.jpeg',
    },
    {
      title: 'image 3',
      image_url:
        'https://helpinghands-bucket-2000.s3.ap-southeast-1.amazonaws.com/ads_3.png',
    },
  ]);
  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    FirebaseCloudMessasgingPlugin.Configure(navigation, contextProvider);
  }, []);

  useFocusEffect(
    useCallback(() => {
      GetLoanPlan();
      contextProvider.getActiveLoanApplication();
    }, []),
  );

  const GetLoanPlan = async () => {
    setLoading(true);
    const res = await loanPlanApi.GetLoanPlan();
    if (res.status === 200) {
      setLoading(false);
      setLoanPlan(res.data.data);
    } else {
      setLoading(false);
      console.log('No active loan plan.');
    }
  };

  // const getActiveLoanApplication = async () => {
  //   if (contextProvider.isAuth) {
  //     setLoading(true);
  //     const res = await loanApplicationFormApi.GetActiveLoanApplication();
  //     if (res.status === 200) {
  //       setLoading(false);
  //       setActiveLoanApplication(res.data.data);
  //       console.log(res.data.data, 5566);
  //     } else {
  //       setLoading(false);
  //       console.log('No active loan application.');
  //     }
  //   }
  // };

  const handleRefresh = () => {
    GetLoanPlan();
    contextProvider.getActiveLoanApplication();
  };

  const renderAds = ({item, index}) => {
    return (
      <FastImage
        style={{
          width: 300,
          height: 150,
          borderRadius: 15,
          marginHorizontal: 10,
        }}
        source={{
          uri: item.image_url,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    );
  };

  const outstandingLoan = () => {
    return (
      <View style={{flex: 1}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#95C5F2', '#61ACF1', '#4CA1F0']}>
          <View style={styles.loanDetailsBg}>
            <View
              style={{
                flex: 1,
                padding: 20,
                justifyContent: 'space-around',
              }}>
              <View>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  Active Loan
                </Text>
                <Text style={{color: '#fff', opacity: 0.7}}>
                  {contextProvider.isAuth && activeLoanApplication[0]
                    ? 'apply since ' +
                      moment(activeLoanApplication[0].creation_date).format(
                        'YYYY-MM-DD',
                      )
                    : 'no active loan'}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text
                    style={{color: '#fff', fontSize: 25, fontWeight: 'bold'}}>
                    {contextProvider.isAuth && activeLoanApplication[0] ? (
                      <Currency
                        quantity={
                          activeLoanApplication[0].emi_plan.loan_amount +
                          activeLoanApplication[0].emi_plan.total_interest -
                          activeLoanApplication[0].emi_plan.loan_emi *
                            activeLoanApplication[0].payment.emi_paid
                        }
                        currency="MYR"
                      />
                    ) : (
                      <Currency quantity={0} currency="MYR" />
                    )}
                  </Text>
                  <Text style={{color: '#fff', opacity: 0.7}}>
                    Outstanding Loan
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    height: 30,
                    paddingHorizontal: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 15, color: '#007BEE'}}>
                    {contextProvider.isAuth && activeLoanApplication[0]
                      ? activeLoanApplication[0].loan_plan.title
                      : 'No Loan'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
        <View style={{marginTop: '5%', paddingLeft: 15}}>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>Promotions</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginVertical: '5%',
          }}>
          {/* <Carousel
            layout={'default'}
            ref={ref => (ref = ref)}
            data={advertisement}
            sliderWidth={windowWidth * 0.85}
            itemWidth={300}
            renderItem={renderAds}
            onSnapToItem={index => setActiveIndex(index)}
          /> */}
          <FlatList
            bounces={false}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={advertisement}
            keyExtractor={item => item.title}
            renderItem={renderAds}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
            }
          />
        </View>
        <View style={{paddingLeft: 15, paddingBottom: 20}}>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>Loan Plan</Text>
        </View>
      </View>
    );
  };
  const renderLoanPlan = ({item}) => {
    return (
      <View style={{flex: 1, alignItems: 'center', paddingHorizontal: 10}}>
        <View style={styles.loanPlanBg}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: '5%',
              marginTop: '3%',
              flexDirection: 'row',
              width: '100%',
            }}>
            <Text style={styles.loanContent}>{item.title}</Text>
            <Button
              title="APPLY"
              buttonStyle={{
                borderRadius: 20,
                backgroundColor: '#61ACF1',
                paddingHorizontal: 20,
                marginLeft: '20%',
              }}
              titleStyle={{
                fontSize: 20,
              }}
              onPress={() =>
                contextProvider.isAuth
                  ? navigation.navigate('ApplyStack', {
                      screen: 'LoanPlan',
                      params: {
                        loan_plan: {
                          loan_plan_id: item.loan_plan_id,
                          title: item.title,
                          max_loan: item.max_loan,
                          annual_interest_rate: item.annual_interest_rate,
                        },
                      },
                    })
                  : navigation.navigate('LoginSignUpStack', {screen: 'Login'})
              }
            />
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: '5%',
              marginTop: '3%',
              flexDirection: 'row',
            }}>
            <Text style={styles.loanContent}>
              <Currency quantity={item.max_loan} currency="MYR" />
            </Text>
            <Text style={styles.loanContent}>{item.annual_interest_rate}%</Text>
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: '5%',
              marginTop: '1%',
              flexDirection: 'row',
            }}>
            <Text style={styles.title}>Maximum loan amount</Text>
            <Text style={styles.title}>Annual interest rate</Text>
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: '5%',
              marginTop: '1%',
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                flexDirection: 'row',
                paddingVertical: 10,
              }}>
              <View style={{backgroundColor: '#D2F1CC', borderRadius: 20}}>
                <Text style={{color: '#1E7310', paddingHorizontal: 15}}>
                  High Passing Rate
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#E6C6C6',
                  marginLeft: '3%',
                  borderRadius: 20,
                }}>
                <Text style={{color: '#C04141', paddingHorizontal: 15}}>
                  Rapid Review
                </Text>
              </View>
            </View>
          </View>
        </View>
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
        <View>
          <View>
            <View
              style={{
                marginLeft: 10,
                marginVertical: 20,
                width: 150,
                height: 20,
                borderRadius: 4,
              }}></View>
            <View
              style={{
                marginTop: '1%',
                marginBottom: '5%',
                width: windowWidth * 0.95,
                height: 150,
                borderRadius: 15,
                alignSelf: 'center',
              }}></View>
          </View>
          <View
            style={{
              marginLeft: 10,
              marginVertical: 20,
              width: 150,
              height: 20,
              borderRadius: 4,
            }}></View>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                marginTop: '1%',
                marginBottom: '10%',
                width: windowWidth * 0.95,
                height: 150,
                borderRadius: 15,
              }}></View>
            <View
              style={{
                marginTop: '1%',
                marginBottom: '10%',
                width: windowWidth * 0.95,
                height: 150,
                borderRadius: 15,
              }}></View>
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading === false ? (
        <FlatList
          data={loanPlan}
          keyExtractor={item => item.loan_plan_id}
          renderItem={renderLoanPlan}
          ListHeaderComponent={outstandingLoan}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
          }
        />
      ) : (
        skeleton
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight,
  },

  loanDetailsBg: {
    height: 180,
  },

  outstandingLoanBg: {
    marginTop: '5%',
    marginBottom: '10%',
    width: '97%',
    paddingBottom: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },

  loanPlanBg: {
    flex: 1,
    marginBottom: '10%',
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },

  loanContent: {
    fontSize: 20,
    fontWeight: '500',
    textTransform: 'uppercase',
    color: '#000',
    width: '50%',
  },

  title: {
    fontSize: 13,
    width: '50%',
  },
});
