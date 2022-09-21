import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  LogBox,
} from 'react-native';
LogBox.ignoreAllLogs();

import Snackbar from 'react-native-snackbar-component';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from '../components/CheckBos';
import styles from '../global/globalStyles';
import CustomLoader from '../components/CustomLoader/CustomLoader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginApiUrl, StaticListApiUrl} from '../restApi/ApiConfig';
const {height, width} = Dimensions.get('window');

const LoginScreen = props => {
  const [loader, setLoader] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [snackIsVisible, setSnackIsVisible] = useState(false);
  const [distance, setDistance] = useState(0);

  // ************ Email Validation ************
  const [Email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(null);
  const _emailvalidate = mail => {
    var emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var PhoneRegex = /^([0-9]){10,14}$/;
    if (mail === '') {
      setErrorEmail('*Please enter email or phone number.');
    } else if (!(emailRegex.test(mail) | PhoneRegex.test(mail))) {
      setErrorEmail('*Please enter valid email or phone number.');
    } else {
      setErrorEmail(null);
    }
  };

  // ************ Password Validation ************
  const [Password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(null);
  const _passwordvalidate = pass => {
    var passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (pass === '') {
      setErrorPassword('*Please enter password.');
    } else if (/([A-Z]+)/g.test(pass) && pass.length < 8) {
      setErrorPassword('*Please enter a special character ');
    } else if (!passwordRegex.test(pass)) {
      setErrorPassword('*Please enter valid password.');
    } else {
      setErrorPassword(null);
    }
  };

  const validate = () => {
    let flag = true;
    if (Email === '') {
      setErrorEmail('*Please enter email.');
      flag = false;
    }
    if (Password === '') {
      setErrorPassword('*Please enter password.');
      flag = false;
    }
    return flag;
  };

  const onSubmit = () => {
    if (validate()) {
      LoginApi();
    } else {
    }
  };

  // ************ Login Api Integration ************
  const LoginApi = async () => {
    const formdata = new FormData();
    formdata.append({
      email: Email,
      password: Password,
    });
    console.log('===== Login data =====', formdata);

    setLoader(true);
    axios({
      method: 'post',
      url: LoginApiUrl,
      data: formdata?._parts[0][0],
    })
      .then(async response => {
        if (response?.data?.responseCode === 200) {
          console.log('====== login Company Response ======', response);
          await AsyncStorage.setItem('token', response?.data?.result?.token);
          // props.navigation.navigate('BottomTab', {
          //   initialRouteName: 'HomeScreen',
          // });
          setSnackIsVisible(true);
          setTimeout(() => {
            props.navigation.navigate('BottomTab', {
              initialRouteName: 'HomeScreen',
            });
          }, 500);
          setLoader(false);
        } else {
          alert('Something went wrong.');
          setLoader(false);
        }
      })
      .catch(err => {
        console.log('==== Login Catch error=====', err);
        if (err?.response?.data?.responseCode === 402 || 401) {
          alert('Bad Credentials');
        } else if (err?.response?.data?.responseCode === 404) {
          alert('User not found');
        } else {
          alert('Something went wrong.');
          setLoader(false);
        }
      });
    // .catch(err => console.log('==== login Company Catch err ====', err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <AntDesign
          name="arrowleft"
          size={25}
          color="#666"
          onPress={() => props.navigation.goBack()}
        />

        <Text style={styles.text}>Sign in to an Existing Company</Text>
        <Text style={styles.smallText}>Work Email</Text>
        <FormInput
          labelValue={Email}
          // onChangeText={userPassword => setPassword(userPassword)}
          placeholderText="Work Email"
          iconName="email-outline"
          kryboardType="email-address"
          iconType="MaterialCommunityIcons"
          maxLength={60}
          autoCapitalize="none"
          onChangeText={txt => {
            setEmail(txt), _emailvalidate(txt);
          }}
        />
        {errorEmail != null ? (
          <View style={styles.ErrorContainer}>
            <Text style={{color: 'red', fontSize: height / 65}}>
              {errorEmail}
            </Text>
          </View>
        ) : null}

        <Text style={styles.smallText}>Enter Password</Text>
        <FormInput
          labelValue={Password}
          // onChangeText={userPassword => setConfirmPassword(userPassword)}
          placeholderText="Enter Password"
          iconName="lock"
          iconType="AntDesign"
          secureTextEntry={true}
          maxLength={20}
          onChangeText={txt => {
            setPassword(txt), _passwordvalidate(txt);
          }}
        />
        {errorPassword != null ? (
          <View style={styles.ErrorContainer}>
            <Text style={{color: 'red', fontSize: height / 65}}>
              {errorPassword}
            </Text>
          </View>
        ) : null}

        <View style={styles.textPrivate}>
          <CheckBox
            selected={termsAccepted}
            onPress={() => setTermsAccepted(!termsAccepted)}
          />
          <Text style={styles.color_textPrivate}> I agree to </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('TermsOfUse')}>
            <Text style={[styles.color_textPrivate, {color: '#BF2025'}]}>
              Terms of Use
            </Text>
          </TouchableOpacity>
          <Text style={styles.color_textPrivate}> and </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('PrivacyPolicy')}>
            <Text style={[styles.color_textPrivate, {color: '#BF2025'}]}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 30}}>
          {loader ? (
            <CustomLoader />
          ) : (
            <Button buttonTitle="Sign In " onPress={() => onSubmit()} />
          )}
          {/* <Button
            buttonTitle="Sign In "
            onPress={() => {
              props.navigation.navigate('BottomTab', {
                initialRouteName: 'HomeScreen',
              });
            }}
          /> */}
        </View>

        <Snackbar
          visible={snackIsVisible}
          textMessage="You have logged in successfuly"
          actionHandler={() => {
            setSnackIsVisible(false);
          }}
          accentColor="green"
          actionText="Success"
          distanceCallback={distance => {
            setDistance(distance);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
