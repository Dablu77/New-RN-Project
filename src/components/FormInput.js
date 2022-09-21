import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import VectorIcon from './VectorIcon';
import styles from '../global/globalStyles';

const FormInput = ({
  labelValue,
  placeholderText,
  iconType,
  iconName,
  iconSize,
  ...rest
}) => {
  // console.log(iconName, iconType);
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <VectorIcon
          familyName={iconType}
          iconName={iconName}
          color="black"
          size={iconSize}
        />
      </View>
      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        {...rest}
      />
    </View>
  );
};

export default FormInput;
