import React, {useState} from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';

const CustomActivityIndicator = props => {
  if (props.animating === false) {
    return null;
  }
  return (
    <View
      style={{
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}>
      <View style={{backgroundColor: '#000', opacity: 0.6}}>
        <View
          style={{
            opacity: 1.0,
            paddingHorizontal: 5,
            paddingVertical: 10,
          }}>
          <ActivityIndicator
            animating={props.animating}
            size={props.size}
            color={props.color}
          />
          <Text style={{color: '#fff'}}>Loading...</Text>
        </View>
      </View>
    </View>
  );
};

export default CustomActivityIndicator;
