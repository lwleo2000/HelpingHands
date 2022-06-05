import * as React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {DefaultTheme, List} from 'react-native-paper';

const FAQScreen = () => {
  const theme = {
    ...DefaultTheme,

    colors: {
      ...DefaultTheme.colors,
      primary: '#61acf1',
      background: '#fff',
    },
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <List.Accordion
          title="Loan Application"
          left={props => <List.Icon {...props} icon="file" />}
          theme={theme}>
          <List.Item
            titleNumberOfLines={5}
            descriptionNumberOfLines={10}
            title="How to apply HelpingHands loan?"
            description="Submit the loan application form using HelpingHands app and wait for approval."
          />
          <List.Item
            titleNumberOfLines={5}
            descriptionNumberOfLines={10}
            title="Who can apply for HelpingHands service?"
            description="HelpingHands offers loan services to Malaysians aged at least 21 years old that are work and residence in Malaysia."
          />
          <List.Item
            titleNumberOfLines={5}
            descriptionNumberOfLines={10}
            title="What are required to apply loan from HelpingHands"
            description="You need to provide basic information, social information, bank information and NRIC photos to apply our loan."
          />
          <List.Item
            titleNumberOfLines={5}
            descriptionNumberOfLines={10}
            title="What are the flow or status of loan application after applied?"
            description='"Under Approval" > "Rejected" or "Approved" > "Suspended" or "Loan Disbursed" > "Fully Paid" '
          />
        </List.Accordion>
        <List.Accordion
          title="Payment"
          left={props => <List.Icon {...props} icon="cash-multiple" />}
          theme={theme}>
          <List.Item
            titleNumberOfLines={5}
            descriptionNumberOfLines={10}
            title="How to pay the equated monthly installment(EMI) ?"
            description="Pay through FPX online banking provided by the HelpingHands apps."
          />
          <List.Item
            titleNumberOfLines={5}
            descriptionNumberOfLines={10}
            title="How to calculate my first EMI due date?"
            description="The first repayment date is one month after the loan is disbursed. "
          />
          <List.Item
            titleNumberOfLines={5}
            descriptionNumberOfLines={10}
            title="How to check my EMI due date?"
            description='You are able to check repayment date in "Loan Details" of "My Loan" using HelpingHands apps.'
          />
          <List.Item
            titleNumberOfLines={5}
            descriptionNumberOfLines={10}
            title="What happens if you missed the EMI due date?"
            description="You will be charged with 2% of penalty fee on the EMI amount. Further, we will take steps in the law and contract to do debt collection and ultimately will affect you credit score if you fail to do the payment of the loan or after 90 days of payment delay."
          />
        </List.Accordion>
        <List.Accordion
          title="Other Questions"
          left={props => <List.Icon {...props} icon="dots-horizontal-circle" />}
          theme={theme}>
          <List.Item
            titleNumberOfLines={5}
            descriptionNumberOfLines={10}
            title="How to set reminder for EMI due date?"
            description='Go to the "Loan Details" of "My Loan" page and set the reminder. You able to receive phone notification before the EMI due date based on the day set.'
          />
          <List.Item
            titleNumberOfLines={5}
            descriptionNumberOfLines={10}
            title="How to change my EMI due date?"
            description="Contact the HelpingHands cutomer service, 04-5388428 to change EMI due date (special case only). After the EMI due date is changed, remember to re-set the EMI due date reminder."
          />
        </List.Accordion>
      </ScrollView>
    </View>
  );
};

export default FAQScreen;
