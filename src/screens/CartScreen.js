import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  Platform,
  Alert,
  Linking,
} from 'react-native';

import Header from '../components/Header';
import VectorIcon from '../components/VectorIcon';
import {windowWidth} from '../global/Dimensions';
import Button from '../components/Button';
import styles from '../global/globalStyles';
import colors from '../global/colors';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetCartListUrl, PaypalPaymentGatewayUrl} from '../restApi/ApiConfig';
const {height, width} = Dimensions.get('window');

const CartScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [cartList, setCartList] = useState({});

  useEffect(() => {
    CartListApi();
  }, [props.route]);

  // ************ Get Cart List Api Integration ************
  const CartListApi = async () => {
    const value = await AsyncStorage.getItem('token');

    setIsLoading(true);
    axios({
      method: 'get',
      url: GetCartListUrl,
      headers: {
        token: value,
      },
    })
      .then(async response => {
        if (response.data.responseCode === 200) {
          console.log('====== Cart List Response ======', response);
          setCartList(response?.data?.result);
          setIsLoading(false);
        } else {
          alert('Something went wrong.');
          setIsLoading(false);
        }
      })
      .catch(err => console.log('==== Cart List Catch err ====', err));
  };

  // ************ Payment Api Integration ************
  const PaymentApi = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log(value);

    const DATA = new FormData();
    DATA.append({
      cartId: cartList?._id,
    });

    setIsLoading(true);
    axios({
      method: 'post',
      url: PaypalPaymentGatewayUrl,
      data: DATA?._parts[0][0],
      headers: {
        token: value,
      },
    })
      .then(async response => {
        if (response.data.responseCode === 200) {
          console.log('====== Cart List Response ======', response);
          // Alert.alert(response?.data?.responseMessage);
          Linking.openURL(response?.data?.result);
          CartListApi();
          setIsLoading(false);
        } else {
          alert('Something went wrong.');
          setIsLoading(false);
        }
      })
      .catch(err => console.log('==== Cart List Catch err ====', err));
  };

  return (
    <SafeAreaView style={[styles.container, {padding: 10}]}>
      <View style={[styles.container, {padding: 10}]}>
        <Header
          image={false}
          profileIcon={true}
          onPress={() => props.navigation.goBack()}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.text}>Cart</Text>

          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            {cartList ? (
              <Text
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                  marginTop: 10,
                  color: '#000',
                  fontWeight: '600',
                  fontSize: height / 45,
                  top: Platform.OS === 'android' ? -7 : -9,
                  position: 'absolute',
                }}>
                1
              </Text>
            ) : null}

            <View>
              <VectorIcon familyName={'Feather'} iconName={'shopping-cart'} />
            </View>
          </View>
          {/* <VectorIcon
            familyName={'Feather'}
            iconName={'shopping-cart'}
            iconStyle={{marginTop: 20}}
          /> */}
        </View>
        <View
          style={{
            // backgroundColor: '#ebebeb',
            backgroundColor: '#fff0ef',
            borderWidth: 0.8,
            marginTop: 30,
            borderRadius: 5,
            borderColor: '#e9d8d8',
          }}>
          <Text style={[styles.text, {marginLeft: 10, marginTop: 10}]}>
            {cartList?.projectId?.projectname}
          </Text>
          <View
            style={{
              borderWidth: 0.8,
              // borderColor: colors.buttonBackGroundColor,
              borderColor: '#e9d8d8',
            }}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 50, height: 50, borderRadius: 5, margin: 10}}
                // source={require('../assets/appIcon.jpeg')}
                source={{uri: cartList?.projectId?.originalImage[0]?.image}}
              />
              <Text
                style={[
                  styles.smallText,
                  {alignSelf: 'center', marginLeft: 10},
                ]}>
                {cartList?.projectId?.originalImage?.length} Images
              </Text>
            </View>
            <View style={{flexDirection: 'row-reverse'}}>
              <Text
                style={[
                  styles.smallText,
                  {
                    marginHorizontal: 20,
                    alignSelf: 'center',
                    fontWeight: '500',
                  },
                ]}>
                $ {cartList?.packageId?.amount}
              </Text>
              <View
                style={{
                  borderWidth: 0.8,
                  // borderColor: colors.buttonBackGroundColor,
                  borderColor: '#e9d8d8',
                  flexDirection: 'column',
                }}
              />
            </View>
          </View>
          {/*
          <View
            style={{
              borderWidth: 0.5,
              borderColor: colors.buttonBackGroundColor,
            }}
          />
           <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 50, height: 50, borderRadius: 5, margin: 10}}
                source={require('../assets/appIcon.jpeg')}
              />
              <Text
                style={[
                  styles.smallText,
                  {alignSelf: 'center', marginLeft: 10},
                ]}>
                4 Images
              </Text>
            </View>
            <View style={{flexDirection: 'row-reverse'}}>
              <Text
                style={[
                  styles.smallText,
                  {marginHorizontal: 20, alignSelf: 'center'},
                ]}>
                $15
              </Text>
              <View
                style={{
                  borderWidth: 0.5,
                  borderColor: colors.buttonBackGroundColor,
                  flexDirection: 'column',
                }}
              />
            </View>
          </View> */}

          <View
            style={{
              borderWidth: 0.8,
              // borderColor: colors.buttonBackGroundColor,
              borderColor: '#e9d8d8',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={[
                  styles.smallText,
                  {alignSelf: 'center', marginLeft: 10, fontWeight: '500'},
                ]}>
                Total
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row-reverse',
              }}>
              <Text
                style={[
                  styles.smallText,
                  {
                    marginHorizontal: 20,
                    alignSelf: 'center',
                    fontWeight: '500',
                  },
                ]}>
                $ {cartList?.packageId?.amount}
              </Text>
              <View
                style={{
                  borderWidth: 0.5,
                  // borderColor: colors.buttonBackGroundColor,
                  borderColor: '#e9d8d8',
                  flexDirection: 'column',
                  marginTop: -10,
                  marginBottom: -10,
                }}
              />
            </View>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 30}}>
          <Button
            buttonTitle="Proceed To Checkout"
            onPress={() => PaymentApi()}
            // onPress={() => props.navigation.navigate('CompleteSetupScreen')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#2c3e50',
//   },
// });

export default CartScreen;
