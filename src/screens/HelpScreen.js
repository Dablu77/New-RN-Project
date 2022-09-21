import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import VectorIcon from '../components/VectorIcon';
import colors from '../global/colors';

const HelpScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <AntDesign
          name="arrowleft"
          size={25}
          color="#666"
          onPress={() => props.navigation.goBack()}
        />
        <Text
          style={{
            color: 'black',
            marginTop: 10,
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          Let's get started!
        </Text>
        <View style={{...styles.mainComponent, marginTop: 20}}>
          <TouchableOpacity
            style={styles.componentStyle}
            onPress={() =>
              props.navigation.navigate('BottomTab', {
                initialRouteName: 'CameraScreen',
              })
            }>
            <View>
              <Text style={styles.text}>New Photo Shoot</Text>
              <Text style={{color: 'black', marginLeft: 5}}>
                Click new shoot to send process
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#00ff00',
                alignItems: 'flex-end',
                borderRadius: 5,
                marginTop: 3,
              }}>
              <VectorIcon
                familyName={'MaterialCommunityIcons'}
                iconName={'camera-outline'}
                color="white"
                size={50}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.mainComponent}>
          <TouchableOpacity
            style={styles.componentStyle}
            onPress={() =>
              props.navigation.navigate('BottomTab', {
                initialRouteName: 'HomeScreen',
                // initialRouteName: 'PhotoScreen', // Old Code
              })
            }>
            <View>
              <Text style={styles.text}>Photo To Be Process</Text>
              <Text style={{color: 'black', marginLeft: 5}}>
                Choose best photos to start process
              </Text>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                borderRadius: 5,
                backgroundColor: colors.buttonBackGroundColor,
                // transform: [{rotateX: '65deg', rotateY: '5deg'}],
              }}>
              <Image
                style={{width: 50, height: 50, marginTop: 3}}
                source={require('../assets/flag-1-no-bg.png')}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.mainComponent}>
          <TouchableOpacity
            style={styles.componentStyle}
            onPress={() =>
              props.navigation.navigate('BottomTab', {
                initialRouteName: 'HomeScreen',
                // initialRouteName: 'CameraScreen', // Old Code
              })
            }>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.text}>Completed Photos</Text>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                borderRadius: 5,
                backgroundColor: colors.buttonBackGroundColor,
              }}>
              <Image
                style={{width: 50, height: 50, marginTop: 3}}
                source={require('../assets/flag-2-no-bg.png')}
              />
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{alignItems: 'center', marginTop: 20}}
          onPress={() =>
            props.navigation.navigate('BottomTab', {
              initialRouteName: 'ProfileScreen',
            })
          }>
          <Text style={{color: 'black'}}>
            No, thanks, let me go to profile!
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9fafd',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    padding: 5,
    fontSize: 16,
  },
  mainComponent: {
    height: 70,
    borderRadius: 5,
    borderColor: 'grey',
    marginTop: 10,
    borderWidth: 1,
  },
  componentStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
});

//make this component available to the app
export default HelpScreen;
