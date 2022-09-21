import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../global/colors';

const CheckBox = ({
  selected,
  onPress,
  style,
  size = 20,
  color = colors.red,
  ...props
}) => (
  <TouchableOpacity
    style={[styles.checkBox, style]}
    onPress={onPress}
    {...props}>
    <Icon
      size={size}
      color={color}
      name={selected ? 'check-box' : 'check-box-outline-blank'}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CheckBox;
