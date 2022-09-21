//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {windowWidth} from '../screens/SplashScreen';

// create a component
const ImageView = () => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Image
          style={{
            width: windowWidth / 5,
            height: windowWidth / 5,
            borderRadius: 5,
          }}
          source={require('../assets/appIcon.jpeg')}
        />
        <Image
          style={{
            width: windowWidth / 5,
            height: windowWidth / 5,
            borderRadius: 5,
            marginHorizontal: 5,
          }}
          source={require('../assets/appIcon.jpeg')}
        />
        <Image
          style={{
            width: windowWidth / 5,
            height: windowWidth / 5,
            borderRadius: 5,
            marginRight: 5,
          }}
          source={require('../assets/appIcon.jpeg')}
        />
        <Image
          style={{
            width: windowWidth / 5,
            height: windowWidth / 5,
            borderRadius: 5,
          }}
          source={require('../assets/appIcon.jpeg')}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
});

//make this component available to the app
export default ImageView;
