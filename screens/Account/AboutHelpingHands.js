import * as React from 'react';
import {View, Text, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images} from '../../constants';

const AboutHelpingHandsScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView contentContainerStyle={{paddingHorizontal: 15}}>
        <FastImage
          style={{width: 100, height: 100, alignSelf: 'center'}}
          source={images.logoCollapse}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={{marginTop: '5%'}}>
          <Text style={{textAlign: 'justify'}}>
            HelpingHands Services Sdn. Bhd. is a licensed moneylender registered
            under the Ministry of Housing and Local Goverment (Kementerian
            Perumahan dan Kerajaan Tempatan as known as KPKT). And we are also
            certified by Our Shariah Advisors for HelpingHands financial
            products that empower our financial services with fintech solutions.
          </Text>
          <Text style={{textAlign: 'justify'}}>
            HelpingHands mobile applications is a fintech that provides
            financial service like loan lending. With HelpingHands app, you can
            apply for loan anywhere, anytime using your smartphone. Our loan
            lending come with minimal document requirements and easy repayment
            schemes to give you a peace of mind. All you will need is just the
            app to get started.
          </Text>
          <Text style={{textAlign: 'justify'}}>
            With our innovative financing solution, there is a thousand chances
            for you to achieve your personal or business needs in the shortest
            time possible. Try the HelpingHands app today to experience
            immediate financial backup, the legal way.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutHelpingHandsScreen;
