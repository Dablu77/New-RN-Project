import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
const { height, width } = Dimensions.get('screen');

const CustomLoader = props => {
  return (
    <View style={[styles.containerLoader, styles.horizontal]}>
      <ActivityIndicator size="large" color="#1e90ff" />
    </View>
  );
};
export default CustomLoader;

const styles = StyleSheet.create({
  containerLoader: {
    // flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    // backgroundColor: "#000000",
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    //  backgroundColor: "#000000",
  },
});
