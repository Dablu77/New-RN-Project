//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../global/colors';

const Header = props => {
  return (
    <View style={[styles.container, props.headerStyling]}>
      <View
        style={[
          props.headerView,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        ]}>
        {props.image == true ? (
          <Image
            style={{ width: 50, height: 50, borderRadius: 30 }}
            source={require('../assets/logo.png')}
          />
        ) : (
          <AntDesign
            name="arrowleft"
            size={25}
            color="black"
            onPress={props.onPress}
          />
        )}

        {/* <TouchableOpacity
          onPress={props.ProfilePress}
          style={{
            width: 30,
            height: 30,
            borderRadius: 5,
            borderWidth: 2,
            borderColor: colors.red,
          }}>
          <Feather
            name="user"
            size={25}
            color="#666"
            // onPress={() => props.navigation.goBack()}
          />
        </TouchableOpacity> */}
        {props.profileIcon == true ? (
          <TouchableOpacity
            onPress={props.ProfilePress}
            style={{
              width: 30,
              height: 30,
              borderRadius: 5,
              borderWidth: 2,
              borderColor: colors.red,
            }}>
            <Feather
              name="user"
              size={25}
              color="#666"
            // onPress={() => props.navigation.goBack()}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
  },
});

//make this component available to the app
export default Header;
