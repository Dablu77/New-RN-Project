import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import colors from '../global/colors';
import { windowWidth, windowHeight } from '../global/Dimensions';
const { height, width } = Dimensions.get('window');

const Button = ({ buttonTitle, onPress, btnStyling, ...rest }) => {
  return (
    <KeyboardAvoidingView>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.buttonContainer, { ...rest }, btnStyling]}>
        <Text style={[styles.buttonText]}>{buttonTitle}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    // width: '95%',
    height: windowHeight / 16,
    // backgroundColor: colors.buttonBackGroundColor,
    backgroundColor: '#BF2025',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    // marginHorizontal: 10,
  },
  buttonText: {
    fontSize: height / 45,
    color: '#ffffff',
    fontWeight: '700',
    // fontFamily: 'Lato-Regular',
  },
});
