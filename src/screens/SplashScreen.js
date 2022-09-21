//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Button from '../components/Button';
import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const SplashScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{width: 55, height: 55, marginLeft: 5, borderRadius: 50}}
            source={require('../assets/logo.png')}
          />

          <Text style={styles.mainText}>LIST YOUR PICS</Text>
        </View>

        <Image
          style={{
            width: windowWidth,
            height: windowHeight / 1.65,
            borderRadius: 50,
          }}
          source={require('../assets/front-image-1.png')}
          resizeMode="contain"
        />

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 0,
            marginTop: -56,
          }}>
          <Text
            style={{color: 'black', fontSize: height / 40, fontWeight: '500'}}>
            Professional Photo Enhancements
          </Text>
          <Text style={{color: 'black', fontSize: height / 55}}>
            Simple Take Photos and Send From any Device
          </Text>
          <Text
            style={{color: 'black', fontSize: height / 55, fontWeight: 'bold'}}>
            Sky Replacement,Lawn Enhancement
          </Text>
          <Text
            style={{color: 'black', ontSize: height / 55, fontWeight: 'bold'}}>
            Tonest Filled Include
          </Text>
        </View>
        <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
          <Button
            buttonTitle="Create New Company"
            onPress={() => props.navigation.navigate('SignupScreen')}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: 'black', fontSize: height / 70}}>
            (No Credit Card Needed)-(No Subscription Fees)
          </Text>
          <Text style={{color: 'black', fontSize: height / 70}}>
            Pay As You Go
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('LoginScreen')}
            style={{
              marginTop: 10,
              width: '95%',
              height: windowHeight / 16,
              borderWidth: 1,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 3,
              marginHorizontal: 10,
            }}>
            <Text style={{color: 'black', fontSize: 16}}>
              Sign In to an Existing Company
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    // height: '100%',
  },
  mainText: {
    fontSize: 25,
    fontWeight: '700',
    color: 'black',
    marginHorizontal: 5,
  },
});

//make this component available to the app
export default SplashScreen;
