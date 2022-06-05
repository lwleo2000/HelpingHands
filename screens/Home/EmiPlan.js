import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import Currency from 'react-currency-formatter';
import {Slider, Button} from 'react-native-elements';
import {RadioButton, TextInput} from 'react-native-paper';

const EmiPlanScreen = ({route, navigation}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [loanAmount, setLoanAmount] = useState(5000);
  const [loanTerm, setLoanTerm] = useState(12);
  const [loanEMI, setLoanEMI] = useState((458.4).toFixed(2));
  const [totalInterest, setTotalInterest] = useState((500.8).toFixed(2));
  const [checked, setChecked] = useState(0);
  const [loanReason, setLoanReason] = useState('');
  const [emiPlan, setEmiPlan] = useState([
    {
      id: 0,
      loanTerm: loanTerm,
      loanEMI: loanEMI,
      totalInterest: totalInterest,
    },
  ]);
  //Form data
  const [confirmedLoanTerm, setConfirmedLoanTerm] = useState(12);
  const [confirmedLoanEMI, setConfirmedLoanEMI] = useState((458.4).toFixed(2));
  const [confirmedTotalInterest, setConfirmedTotalInterest] = useState(
    (500.8).toFixed(2),
  );

  const {loan_plan} = route.params;
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

  const calculateEMIPlan = (loanAmount, annualInterestRate, maxLoan) => {
    let loanTerm = 0;
    let loanEMI = 0;
    let monthlyInterestRate = parseFloat(annualInterestRate / 100 / 12);
    let emiPlan = [];
    let totalInterest = 0;
    if (loanAmount >= 5000 && loanAmount < 10000) {
      loanTerm = 12;
      loanEMI = parseFloat(
        (loanAmount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, loanTerm)) /
          (Math.pow(1 + monthlyInterestRate, loanTerm) - 1),
      ).toFixed(2);
      totalInterest = parseFloat(loanEMI * loanTerm - loanAmount).toFixed(2);
      let planOne = {
        id: 0,
        loanTerm: loanTerm,
        loanEMI: loanEMI,
        totalInterest: totalInterest,
      };

      /*
        Initialize the selection of loan plan one as 
        radio button of loan plan one will checked automatically
      */
      setConfirmedLoanTerm(planOne.loanTerm);
      setConfirmedLoanEMI(planOne.loanEMI);
      setConfirmedTotalInterest(planOne.totalInterest);

      emiPlan.push(planOne);
    } else if (loanAmount >= 10000 && loanAmount < 15000) {
      //Loan Plan 1
      loanTerm = 24;
      loanEMI = parseFloat(
        (loanAmount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, loanTerm)) /
          (Math.pow(1 + monthlyInterestRate, loanTerm) - 1),
      ).toFixed(2);
      totalInterest = parseFloat(loanEMI * loanTerm - loanAmount).toFixed(2);
      let planOne = {
        id: 0,
        loanTerm: loanTerm,
        loanEMI: loanEMI,
        totalInterest: totalInterest,
      };

      /*
        Initialize the selection of loan plan one as 
        radio button of loan plan one will checked automatically
      */
      setConfirmedLoanTerm(planOne.loanTerm);
      setConfirmedLoanEMI(planOne.loanEMI);
      setConfirmedTotalInterest(planOne.totalInterest);

      emiPlan.push(planOne);

      //Loan Plan 2
      loanTerm = 30;
      loanEMI = parseFloat(
        (loanAmount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, loanTerm)) /
          (Math.pow(1 + monthlyInterestRate, loanTerm) - 1),
      ).toFixed(2);
      totalInterest = parseFloat(loanEMI * loanTerm - loanAmount).toFixed(2);
      let planTwo = {
        id: 1,
        loanTerm: loanTerm,
        loanEMI: loanEMI,
        totalInterest: totalInterest,
      };
      emiPlan.push(planTwo);
    } else if (loanAmount >= 15000 && loanAmount < 20000) {
      //Loan Plan 1
      loanTerm = 36;
      loanEMI = parseFloat(
        (loanAmount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, loanTerm)) /
          (Math.pow(1 + monthlyInterestRate, loanTerm) - 1),
      ).toFixed(2);
      totalInterest = parseFloat(loanEMI * loanTerm - loanAmount).toFixed(2);
      let planOne = {
        id: 0,
        loanTerm: loanTerm,
        loanEMI: loanEMI,
        totalInterest: totalInterest,
      };

      /*
        Initialize the selection of loan plan one as 
        radio button of loan plan one will checked automatically
      */
      setConfirmedLoanTerm(planOne.loanTerm);
      setConfirmedLoanEMI(planOne.loanEMI);
      setConfirmedTotalInterest(planOne.totalInterest);
      emiPlan.push(planOne);

      //Loan Plan 2
      loanTerm = 40;
      loanEMI = parseFloat(
        (loanAmount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, loanTerm)) /
          (Math.pow(1 + monthlyInterestRate, loanTerm) - 1),
      ).toFixed(2);
      totalInterest = parseFloat(loanEMI * loanTerm - loanAmount).toFixed(2);
      let planTwo = {
        id: 1,
        loanTerm: loanTerm,
        loanEMI: loanEMI,
        totalInterest: totalInterest,
      };
      emiPlan.push(planTwo);
    } else if (loanAmount >= 20000 && loanAmount < 25000) {
      //Loan Plan 1
      loanTerm = 46;
      loanEMI = parseFloat(
        (loanAmount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, loanTerm)) /
          (Math.pow(1 + monthlyInterestRate, loanTerm) - 1),
      ).toFixed(2);
      totalInterest = parseFloat(loanEMI * loanTerm - loanAmount).toFixed(2);
      let planOne = {
        id: 0,
        loanTerm: loanTerm,
        loanEMI: loanEMI,
        totalInterest: totalInterest,
      };

      /*
        Initialize the selection of loan plan one as 
        radio button of loan plan one will checked automatically
      */
      setConfirmedLoanTerm(planOne.loanTerm);
      setConfirmedLoanEMI(planOne.loanEMI);
      setConfirmedTotalInterest(planOne.totalInterest);
      emiPlan.push(planOne);

      //Loan Plan 2
      loanTerm = 50;
      loanEMI = parseFloat(
        (loanAmount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, loanTerm)) /
          (Math.pow(1 + monthlyInterestRate, loanTerm) - 1),
      ).toFixed(2);
      totalInterest = parseFloat(loanEMI * loanTerm - loanAmount).toFixed(2);
      let planTwo = {
        id: 1,
        loanTerm: loanTerm,
        loanEMI: loanEMI,
        totalInterest: totalInterest,
      };
      emiPlan.push(planTwo);
    } else if (loanAmount >= 25000 && loanAmount <= 30000) {
      //Loan Plan 1
      loanTerm = 56;
      loanEMI = parseFloat(
        (loanAmount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, loanTerm)) /
          (Math.pow(1 + monthlyInterestRate, loanTerm) - 1),
      ).toFixed(2);
      totalInterest = parseFloat(loanEMI * loanTerm - loanAmount).toFixed(2);
      let planOne = {
        id: 0,
        loanTerm: loanTerm,
        loanEMI: loanEMI,
        totalInterest: totalInterest,
      };

      /*
        Initialize the selection of loan plan one as 
        radio button of loan plan one will checked automatically
      */
      setConfirmedLoanTerm(planOne.loanTerm);
      setConfirmedLoanEMI(planOne.loanEMI);
      setConfirmedTotalInterest(planOne.totalInterest);

      emiPlan.push(planOne);

      //Loan Plan 2
      loanTerm = 60;
      loanEMI = parseFloat(
        (loanAmount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, loanTerm)) /
          (Math.pow(1 + monthlyInterestRate, loanTerm) - 1),
      ).toFixed(2);
      totalInterest = parseFloat(loanEMI * loanTerm - loanAmount).toFixed(2);
      let planTwo = {
        id: 1,
        loanTerm: loanTerm,
        loanEMI: loanEMI,
        totalInterest: totalInterest,
      };
      emiPlan.push(planTwo);

      //Loan Plan 3
      loanTerm = 72;
      loanEMI = parseFloat(
        (loanAmount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, loanTerm)) /
          (Math.pow(1 + monthlyInterestRate, loanTerm) - 1),
      ).toFixed(2);
      totalInterest = parseFloat(loanEMI * loanTerm - loanAmount).toFixed(2);
      let planThree = {
        id: 2,
        loanTerm: loanTerm,
        loanEMI: loanEMI,
        totalInterest: totalInterest,
      };
      emiPlan.push(planThree);
    }

    setLoanTerm(loanTerm);
    setLoanEMI(loanEMI);
    setTotalInterest(totalInterest);
    setEmiPlan(emiPlan);
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
        <Text style={{fontSize: 18}}>Loan Amount</Text>
        <View style={styles.loanAmountBg}>
          <Text style={{fontSize: 20, color: 'black'}}>
            <Currency quantity={loanAmount} currency="MYR" />
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text>
            <Currency quantity={5000} currency="MYR" />
          </Text>
          <Text>
            <Currency quantity={loan_plan.max_loan} currency="MYR" />
          </Text>
        </View>
        <View>
          <Slider
            animateTransitions
            animationType="timing"
            maximumTrackTintColor="#ccc"
            maximumValue={loan_plan.max_loan}
            minimumTrackTintColor="#61acf1"
            minimumValue={5000}
            onSlidingComplete={() => console.log('onSlidingComplete()')}
            onSlidingStart={() => console.log('onSlidingStart()')}
            onValueChange={value => {
              console.log('onValueChange()', value);
              setLoanAmount(value);
              calculateEMIPlan(
                value,
                loan_plan.annual_interest_rate,
                loan_plan.max_loan,
              );
            }}
            orientation="horizontal"
            step={5000}
            style={{width: '100%', height: 50}}
            thumbStyle={{height: 30, width: 30}}
            thumbTintColor="#61acf1"
            thumbTouchSize={{width: 40, height: 40}}
            trackStyle={{height: 6, borderRadius: 20}}
            value={loanAmount}
          />
        </View>
        <View style={styles.EMIPlanBg}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Text></Text>
            <Text>Loan Term (month)</Text>
            <Text>EMI (RM)</Text>
            <Text>Total Interest (RM)</Text>
          </View>
          {emiPlan.map((plan, key) => {
            return (
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                }}>
                <RadioButton.Group
                  onValueChange={value => {
                    setChecked(value);
                    setConfirmedLoanTerm(plan.loanTerm);
                    setConfirmedLoanEMI(plan.loanEMI);
                    setConfirmedTotalInterest(plan.totalInterest);
                    console.log(value, 666);
                    console.log(confirmedLoanTerm, 8787);
                  }}
                  value={checked}>
                  <RadioButton.Item
                    style={{
                      width: 50,
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    color="#61acf1"
                    value={plan.id}
                  />
                </RadioButton.Group>
                <Text style={{color: '#000'}}>{plan.loanTerm}</Text>
                <Text style={{color: '#000'}}>{plan.loanEMI}</Text>
                <Text style={{color: '#000'}}>{plan.totalInterest}</Text>
              </View>
            );
          })}
        </View>
        <View style={{marginTop: '5%'}}>
          <TextInput
            label="Reason for loan ?"
            placeholder="eg. education"
            activeUnderlineColor="#0F89FA"
            value={loanReason}
            onChangeText={loanReason => {
              setLoanReason(loanReason);
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '5%',
          }}>
          <Button
            disabled={loanReason ? false : true}
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
              navigation.navigate('BasicInformation', {
                loan_plan: loan_plan,
                emi_plan: {
                  loan_amount: loanAmount,
                  loan_term: confirmedLoanTerm,
                  loan_emi: confirmedLoanEMI,
                  total_interest: confirmedTotalInterest,
                  loan_reason: loanReason,
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
    marginLeft: '3.5%',
    marginRight: '3.5%',
  },
  loanAmountBg: {
    marginTop: '5%',
    marginBottom: '5%',
    width: '100%',
    backgroundColor: '#F5F5F5',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
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

  EMIPlanBg: {
    marginTop: '5%',
    marginBottom: '5%',
    width: '100%',
    backgroundColor: '#F5F5F5',
    padding: 5,
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
});

export default EmiPlanScreen;
