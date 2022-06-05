import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {images, icons} from '../../constants';
import {Button} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const IdentityAuthenticationScreen = ({route, navigation}) => {
  const [currentPage, setCurrentPage] = useState(3);
  const {loan_plan, emi_plan, basic_information, social_information} =
    route.params;

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
  const [frontNRICphoto, setFrontNRICphoto] = useState('');
  const [backNRICphoto, setBackNRICphoto] = useState('');
  const [facePhoto, setFacePhoto] = useState('');

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    console.log(loan_plan);
    console.log(emi_plan);
    console.log(basic_information);
    console.log(social_information);
  });
  const options = {
    mediaType: 'photo',
    skipBackup: true,
    path: 'images',
    cameraRoll: true,
    waitUntilSaved: true,
  };

  const takeFrontPhoto = () => {
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log(`ImagePicker Error: ${response.error}`);
      } else if (response.customButton) {
        console.log(`User tapped custom button: ${response.customButton}`);
      } else {
        console.log(response, '222');
        const source = response;
        setFrontNRICphoto(source);
        console.log(frontNRICphoto, 77);
      }
    });
  };

  const uploadFrontPhoto = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log(`ImagePicker Error: ${response.error}`);
      } else if (response.customButton) {
        console.log(`User tapped custom button: ${response.customButton}`);
      } else {
        console.log(response, '222');
        const source = response;
        setFrontNRICphoto(source);
      }
    });
  };

  const takeBackPhoto = () => {
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log(`ImagePicker Error: ${response.error}`);
      } else if (response.customButton) {
        console.log(`User tapped custom button: ${response.customButton}`);
      } else {
        console.log(response, '222');
        const source = response;
        setBackNRICphoto(source);
      }
    });
  };

  const uploadBackPhoto = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log(`ImagePicker Error: ${response.error}`);
      } else if (response.customButton) {
        console.log(`User tapped custom button: ${response.customButton}`);
      } else {
        console.log(response, '222');
        const source = response;
        setBackNRICphoto(source);
      }
    });
  };

  const takeFacePhoto = () => {
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log(`ImagePicker Error: ${response.error}`);
      } else if (response.customButton) {
        console.log(`User tapped custom button: ${response.customButton}`);
      } else {
        console.log(response, '222');
        const source = response;
        setFacePhoto(source);
      }
    });
  };

  const uploadFacePhoto = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log(`ImagePicker Error: ${response.error}`);
      } else if (response.customButton) {
        console.log(`User tapped custom button: ${response.customButton}`);
      } else {
        console.log(response, '222');
        const source = response;
        setFacePhoto(source);
      }
    });
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
        <Text style={{fontSize: 18}}>NRIC Front Photo</Text>
        <View
          style={{
            flex: 1,
            marginTop: '3%',
            justifyContent: 'center',
            backgroundColor: 'white',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,

            elevation: 7,
          }}>
          <View style={{padding: 20}}>
            {frontNRICphoto ? (
              <Image
                source={{
                  uri: frontNRICphoto.assets[0].uri,
                }}
                style={{
                  resizeMode: 'contain',
                  width: 329,
                  height: 176,
                }}
              />
            ) : (
              <Image
                source={images.frontNRICsample}
                style={{
                  resizeMode: 'contain',
                  width: 329,
                  height: 176,
                }}
              />
            )}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,

              elevation: 7,
            }}>
            <Button
              buttonStyle={{
                backgroundColor: 'white',
              }}
              containerStyle={{flex: 1}}
              icon={
                <Image
                  source={icons.camera}
                  style={{height: 28, width: 32, tintColor: '#61ACF1'}}
                />
              }
              onPress={() => takeFrontPhoto()}
              title="Take Photo"
              titleStyle={{marginHorizontal: 5, color: '#61ACF1', fontSize: 20}}
            />
            <Button
              buttonStyle={{
                backgroundColor: 'white',
              }}
              containerStyle={{flex: 1}}
              icon={
                <Image
                  source={icons.album}
                  style={{height: 28, width: 32, tintColor: '#61ACF1'}}
                />
              }
              onPress={() => uploadFrontPhoto()}
              title="Upload Photo"
              titleStyle={{marginHorizontal: 5, color: '#61ACF1', fontSize: 20}}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: '3%',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            width: '90%',
          }}>
          <Image source={icons.warning} />
          <Text style={{fontSize: 20, marginLeft: '3%'}}>
            The photo must be clearly visible. The application will be rejected
            if the upload is not relevant.
          </Text>
        </View>
        <Text style={{fontSize: 18, marginTop: '15%'}}>NRIC Back Photo</Text>
        <View
          style={{
            flex: 1,
            marginTop: '3%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,

            elevation: 7,
          }}>
          <View style={{padding: 20}}>
            {backNRICphoto ? (
              <Image
                source={{
                  uri: backNRICphoto.assets[0].uri,
                }}
                style={{
                  resizeMode: 'contain',
                  width: 329,
                  height: 176,
                }}
              />
            ) : (
              <Image
                source={images.backNRICsample}
                style={{
                  resizeMode: 'contain',
                  width: 329,
                  height: 176,
                }}
              />
            )}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,

              elevation: 7,
            }}>
            <Button
              buttonStyle={{
                backgroundColor: 'white',
              }}
              containerStyle={{flex: 1}}
              icon={
                <Image
                  source={icons.camera}
                  style={{height: 28, width: 32, tintColor: '#61ACF1'}}
                />
              }
              onPress={() => takeBackPhoto()}
              title="Take Photo"
              titleStyle={{marginHorizontal: 5, color: '#61ACF1', fontSize: 20}}
            />
            <Button
              buttonStyle={{
                backgroundColor: 'white',
              }}
              containerStyle={{flex: 1}}
              icon={
                <Image
                  source={icons.album}
                  style={{height: 28, width: 32, tintColor: '#61ACF1'}}
                />
              }
              onPress={() => uploadBackPhoto()}
              title="Upload Photo"
              titleStyle={{marginHorizontal: 5, color: '#61ACF1', fontSize: 20}}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: '3%',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            width: '90%',
          }}>
          <Image source={icons.warning} />
          <Text style={{fontSize: 20, marginLeft: '3%'}}>
            The photo must be clearly visible. The application will be rejected
            if the upload is not relevant.
          </Text>
        </View>
        <Text style={{fontSize: 18, marginTop: '15%'}}>
          Identity Confirmation
        </Text>
        <View
          style={{
            flex: 1,
            marginTop: '3%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,

            elevation: 7,
          }}>
          <View style={{padding: 20}}>
            {facePhoto ? (
              <Image
                source={{
                  uri: facePhoto.assets[0].uri,
                }}
                style={{
                  resizeMode: 'contain',
                  width: 329,
                  height: 176,
                }}
              />
            ) : (
              <Image
                source={images.facePhotoSample}
                style={{
                  resizeMode: 'contain',
                  width: 329,
                  height: 176,
                }}
              />
            )}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,

              elevation: 7,
            }}>
            <Button
              buttonStyle={{
                backgroundColor: 'white',
              }}
              containerStyle={{flex: 1}}
              icon={
                <Image
                  source={icons.camera}
                  style={{height: 28, width: 32, tintColor: '#61ACF1'}}
                />
              }
              onPress={() => takeFacePhoto()}
              title="Take Photo"
              titleStyle={{marginHorizontal: 5, color: '#61ACF1', fontSize: 20}}
            />
            <Button
              buttonStyle={{
                backgroundColor: 'white',
              }}
              containerStyle={{flex: 1}}
              icon={
                <Image
                  source={icons.album}
                  style={{height: 28, width: 32, tintColor: '#61ACF1'}}
                />
              }
              onPress={() => uploadFacePhoto()}
              title="Upload Photo"
              titleStyle={{marginHorizontal: 5, color: '#61ACF1', fontSize: 20}}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: '3%',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            width: '90%',
          }}>
          <Image source={icons.warning} />
          <Text style={{fontSize: 20, marginLeft: '3%'}}>
            Please upload a photo of you holding your NRIC infront of the
            camera.
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '15%',
            marginBottom: '15%',
          }}>
          <Button
            disabled={
              frontNRICphoto && backNRICphoto && facePhoto && hasError === false
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
              navigation.navigate('LoanConfirmation', {
                loan_plan: loan_plan,
                emi_plan: emi_plan,
                basic_information: basic_information,
                social_information: social_information,
                identity_photo: {
                  front_NRIC_photo: frontNRICphoto,
                  back_NRIC_photo: backNRICphoto,
                  face_photo: facePhoto,
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
export default IdentityAuthenticationScreen;
