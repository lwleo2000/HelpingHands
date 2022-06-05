import React, {useState} from 'react';
import {View, Image, TextInput, TouchableOpacity} from 'react-native';
import {icons} from '..';

const RadioButton = props => {
  const [loanPlan, setLoanPlan] = useState(props.data);
  const [checked, setChecked] = useState(0);
  return (
    <View>
      {checked == key ? (
        <TouchableOpacity>
          <Image
            style={{
              width: 20,
              height: 20,
            }}
            source={icons.radioButtonChecked}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setChecked(key);
          }}>
          <Image
            style={{
              width: 20,
              height: 20,
            }}
            source={icons.radioButtonUnchecked}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RadioButton;
