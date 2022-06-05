import React, {useState, useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Image, StatusBar} from 'react-native';
import {icons} from './constants';
import HomeScreen from './screens/Home/Home';
import EmiPlanScreen from './screens/Home/EmiPlan';
import BasicInformationScreen from './screens/Home/BasicInformation';
import SocialInformationScreen from './screens/Home/SocialInformation';
import HowItWorksScreen from './screens/HowItWorks/HowItWorks';
import MyLoanScreen from './screens/MyLoan/MyLoan';
import AccountScreen from './screens/Account/Account';
import FAQScreen from './screens/Account/FAQ';
import AccountSettingsScreen from './screens/Account/AccountSettings';
import ChangePasswordScreen from './screens/Account/ChangePassword';
import TermsConditionsScreen from './screens/Account/TermsConditions';
import AboutHelpingHandsScreen from './screens/Account/AboutHelpingHands';
import IdentityAuthenticationScreen from './screens/Home/IdentityAuthentication';
import LoanConfirmationScreen from './screens/Home/LoanConfirmation';
import ApplyLoanTermsAndConditionScreen from './screens/Home/ApplyLoanTermsAndCondition';
import MyLoanDetailsScreen from './screens/MyLoan/MyLoanDetails';
import LoanAgreementScreen from './screens/MyLoan/LoanAgreement';
import PaymentScreen from './screens/MyLoan/Payment';
import LoginScreen from './screens/Login/Login';
import SignUpScreen from './screens/SignUp/SignUp';
import OTPSignUpScreen from './screens/SignUp/OTPSignUp';
import ForgotPasswordScreen from './screens/ForgotPassword/ForgotPassword';
import ResetPasswordScreen from './screens/ForgotPassword/ResetPassword';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import authApi from './tools/Api/auth.api';
import loanApplicationFormApi from './tools/Api/loanApplicationForm.api';
import SplashScreen from 'react-native-splash-screen';
import {ResponseError} from './tools/ErrorHandler/ErrorHandler';

const ReactContext = React.createContext();
const ApplyStack = createStackNavigator();
const MyLoanStack = createStackNavigator();
const LoginStack = createStackNavigator();
const RootStack = createStackNavigator();

const ApplyStackScreen = () => {
  return (
    <ApplyStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal-inverted',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <ApplyStack.Screen
        options={{
          title: 'Select EMI Plan',
          headerStyle: {
            backgroundColor: '#61acf1',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
        name="LoanPlan"
        component={EmiPlanScreen}
      />
      <ApplyStack.Screen
        options={{
          title: 'Basic Information',
          headerStyle: {
            backgroundColor: '#61acf1',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
        name="BasicInformation"
        component={BasicInformationScreen}
      />
      <ApplyStack.Screen
        options={{
          title: 'Social Information',
          headerStyle: {
            backgroundColor: '#61acf1',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
        name="SocialInformation"
        component={SocialInformationScreen}
      />
      <ApplyStack.Screen
        options={{
          title: 'Identity Authentication',
          headerStyle: {
            backgroundColor: '#61acf1',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
        name="IdentityAuthentication"
        component={IdentityAuthenticationScreen}
      />
      <ApplyStack.Screen
        options={{
          title: 'Loan Confirmation',
          headerStyle: {
            backgroundColor: '#61acf1',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
        name="LoanConfirmation"
        component={LoanConfirmationScreen}
      />
      <ApplyStack.Screen
        options={{
          title: 'Terms and Condition',
          headerStyle: {
            backgroundColor: '#61acf1',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
        name="ApplyLoanTermsAndCondition"
        component={ApplyLoanTermsAndConditionScreen}
      />
    </ApplyStack.Navigator>
  );
};

const MyLoanStackScreen = () => {
  const contextProvider = useContext(context);
  return (
    <MyLoanStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal-inverted',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <MyLoanStack.Screen
        options={{
          title: 'Loan Agreement',
          headerStyle: {
            backgroundColor: '#61acf1',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
        name="LoanAgreement"
        component={LoanAgreementScreen}
      />
      <MyLoanStack.Screen
        options={{
          title: 'Loan Details',
          headerStyle: {
            backgroundColor: '#61acf1',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
        name="MyLoanDetails"
        component={MyLoanDetailsScreen}
      />
      <MyLoanStack.Screen
        options={{
          title: 'Payment',
          headerStyle: {
            backgroundColor: '#61acf1',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
        name="Payment"
        component={PaymentScreen}
      />
    </MyLoanStack.Navigator>
  );
};

const AccountStackScreen = () => {
  const contextProvider = useContext(context);
  return (
    <MyLoanStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal-inverted',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <MyLoanStack.Screen
        options={{
          title: 'Frequenlty Ask Questions',
          headerStyle: {
            backgroundColor: '#61acf1',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
        name="FAQ"
        component={FAQScreen}
      />
      <MyLoanStack.Screen
        options={{
          title: 'About HelpingHands',
          headerStyle: {
            backgroundColor: '#61acf1',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
        name="AboutHelpingHands"
        component={AboutHelpingHandsScreen}
      />
      <MyLoanStack.Screen
        options={{
          title: 'Account Settings',
          headerStyle: {
            backgroundColor: '#61acf1',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
        name="AccountSettings"
        component={AccountSettingsScreen}
      />
      <MyLoanStack.Screen
        options={{
          title: 'Change Password',
          headerStyle: {
            backgroundColor: '#61acf1',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
      <MyLoanStack.Screen
        options={{
          title: 'Terms and Conditions',
          headerStyle: {
            backgroundColor: '#61acf1',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
        name="TermsConditions"
        component={TermsConditionsScreen}
      />
    </MyLoanStack.Navigator>
  );
};

const LoginSignUpStackScreen = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        options={{headerShown: false}}
        name="Login"
        component={LoginScreen}
      />
      <LoginStack.Screen
        options={{headerShown: false}}
        name="SignUp"
        component={SignUpScreen}
      />
      <LoginStack.Screen
        options={{
          title: 'OTP Sign Up',
          headerStyle: {
            backgroundColor: '#61acf1',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
        name="OTPSignUp"
        component={OTPSignUpScreen}
      />
      <LoginStack.Screen
        options={{
          title: 'Forgot Password',
          headerStyle: {
            backgroundColor: '#61acf1',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <LoginStack.Screen
        options={{
          title: 'Reset Password',
          headerStyle: {
            backgroundColor: '#61acf1',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
        name="ResetPassword"
        component={ResetPasswordScreen}
      />
    </LoginStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  const contextProvider = useContext(context);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: 'true',
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#61acf1' : '#a6a2a2',
                }}
                resizeMode="contain"
                source={icons.home}
              />
            </View>
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          title: 'How It Works',
          headerStyle: {
            backgroundColor: '#61acf1',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#61acf1' : '#a6a2a2',
                }}
                resizeMode="contain"
                source={icons.question}
              />
            </View>
          ),
        }}
        name="HowItWorks"
        component={HowItWorksScreen}
      />
      <Tab.Screen
        options={{
          headerShown: contextProvider.isAuth ? true : false,
          title: 'My Loan',
          headerStyle: {
            backgroundColor: '#61acf1',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          tabBarLabel: 'My Loan',
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#61acf1' : '#a6a2a2',
                }}
                resizeMode="contain"
                source={icons.myloan}
              />
            </View>
          ),
        }}
        name="MyLoan"
        component={MyLoanScreen}
      />
      <Tab.Screen
        options={{
          title: 'Account',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#61acf1' : '#a6a2a2',
                }}
                resizeMode="contain"
                source={icons.account}
              />
            </View>
          ),
        }}
        name="Account"
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
};
const App = () => {
  const contextProvider = useContext(context);
  const [isAuth, setIsAuth] = useState(false);
  const [isBan, setIsBan] = useState(false);
  const [notificationToken, setNotificationToken] = useState('');
  const [notificationClicked, setNotificationClicked] = useState(false);
  const [profile, setProfile] = useState('');
  const [activeLoanApplication, setActiveLoanApplication] = useState([]);

  useEffect(() => {
    SplashScreen.hide();
    initSystem();
    receiveNotificationForeground();
  }, []);

  const setAuth = async () => {
    try {
      const jwt = await RNSecureStorage.get('jwt');
      if (jwt) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuth(false);
    }
  };

  const getProfile = async () => {
    try {
      const res = await authApi.GetProfile();
      console.log('Profile: ', res.data.data);
      if (res.status === 200) {
        setProfile(res.data.data);

        await RNSecureStorage.set(
          'user_profile',
          JSON.stringify(res.data.data),
          {
            accessible: ACCESSIBLE.WHEN_UNLOCKED,
          },
        );
      } else {
        ResponseError(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getActiveLoanApplication = async () => {
   
      const res = await loanApplicationFormApi.GetActiveLoanApplication();
      if (res.status === 200) {
        setActiveLoanApplication(res.data.data);
        console.log(res.data.data, 5566);
      } else {
        console.log('No active loan application.');
      }
    
  };

  const checkPermissionFCM = async () => {
    await messaging().requestPermission({
      alert: true,
      sound: true,
    });
    const deviceRegistered = await messaging()
      .isDeviceRegisteredForRemoteMessages;
    console.log('Deivce registered:', deviceRegistered);
  };

  const receiveNotificationForeground = () => {
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived', JSON.stringify(remoteMessage));
      PushNotification.localNotification({
        channelId: '1020120324',
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
      });
    });
  };

  const initSystem = async () => {
    await setAuth();
    await getProfile();
    await getActiveLoanApplication();
    await checkPermissionFCM();
  };
  return (
    <ReactContext.Provider
      value={{
        isAuth,
        setIsAuth,
        isBan,
        setIsBan,
        setAuth,
        notificationToken,
        setNotificationToken,
        notificationClicked,
        setNotificationClicked,
        profile,
        setProfile,
        getProfile,
        getActiveLoanApplication,
        activeLoanApplication,
        setActiveLoanApplication,
      }}>
      <StatusBar
        animated
        backgroundColor={'#61acf1'}
        translucent={true}
        barStyle="light-content"
      />
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            options={{headerShown: false}}
            name="HomeTabs"
            component={HomeTabs}
          />
          <RootStack.Screen
            options={{headerShown: false}}
            name="ApplyStack"
            component={ApplyStackScreen}
          />
          <RootStack.Screen
            options={{headerShown: false}}
            name="MyLoanStack"
            component={MyLoanStackScreen}
          />
          <RootStack.Screen
            options={{headerShown: false}}
            name="AccountStack"
            component={AccountStackScreen}
          />
          <RootStack.Screen
            options={{headerShown: false}}
            name="LoginSignUpStack"
            component={LoginSignUpStackScreen}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </ReactContext.Provider>
  );
};

export default App;

export const context = ReactContext;
