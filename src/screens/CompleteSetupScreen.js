import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import FormInput from '../components/FormInput';
import Button from '../components/Button';
import PickerComponent from '../components/PickerComponent';
import { windowHeight, windowWidth } from '../global/Dimensions';
import globalStyles from '../global/globalStyles';
import CustomLoader from '../components/CustomLoader/CustomLoader';
import axios from 'axios';
import { CreateCompanyApiUrl } from '../restApi/ApiConfig';
const { height, width } = Dimensions.get('window');

const CompleteSetupScreen = props => {
  console.log('===== signup 2 param ====', props?.route?.params);
  const [isLoading, setIsLoading] = useState(false);

  const [Company, setCompany] = useState(props?.route?.params?.company);
  const [email, setemail] = useState(props?.route?.params?.email);
  const [password, setpassword] = useState(props?.route?.params?.password);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // ************ First Name Validation ************
  const [FirstName, setFirstName] = useState('');
  const [errorFirstName, setErrorFirstName] = useState(null);
  const _validateFirstName = fname => {
    var fnameRegex = /^[a-z A-Z ]{3,32}$/i;
    if (fname === '') {
      setErrorFirstName('*Please enter first name.');
      return false;
    } else if (!fnameRegex.test(fname)) {
      setErrorFirstName('*Please enter valid last name.');
      return false;
    } else {
      setErrorFirstName(null);
      return true;
    }
  };

  // ************ Last Name Validation ************
  const [LastName, setLastName] = useState('');
  const [errorLastName, setErrorLastName] = useState(null);
  const _validateLasttName = lname => {
    var lnameRegex = /^[a-z A-Z ]{3,32}$/i;
    if (lname === '') {
      setErrorLastName('*Please enter last name.');
      return false;
    } else if (!lnameRegex.test(lname)) {
      setErrorLastName('*Please enter valid last name.');
      return false;
    } else {
      setErrorLastName(null);
      return true;
    }
  };

  // ************ Mobile Number Validation ************
  const [MobileNumber, setMobileNumber] = useState('');
  const [errorMobileNumber, setErrorMobileNumber] = useState(null);
  const _validateMobileNumber = mobileNo => {
    var mobileNoRegex = /^[0-9]{8,10}$/;
    if (mobileNo == '' || mobileNo == undefined || mobileNo == null) {
      setErrorMobileNumber('*Please enter mobile number.');
      return false;
    } else if (!mobileNoRegex.test(mobileNo)) {
      setErrorMobileNumber('*Please Enter valid mobile number..');
      return false;
    } else {
      setErrorMobileNumber(null);
      return true;
    }
  };

  const validate = () => {
    let flag = true;
    if (FirstName === '') {
      setErrorFirstName('*Please enter first name.');
      flag = false;
    }
    if (LastName === '') {
      setErrorLastName('*Please enter last name.');
      flag = false;
    }
    if (MobileNumber === '') {
      setErrorMobileNumber('*Please enter mobile number.');
      flag = false;
    }
    return flag;
  };

  const onSubmit = () => {
    if (validate()) {
      SignUpApi();
    } else {
    }
  };

  // ************ SignUp Api Integration ************
  const SignUpApi = () => {
    const formdata = new FormData();
    formdata.append({
      company: Company,
      email: email,
      password: password,
      fname: FirstName,
      lname: LastName,
      phone: MobileNumber,
      // extraoption: ,
    });
    console.log('===== Sign up data =====', formdata);

    setIsLoading(true);
    axios({
      method: 'post',
      url: CreateCompanyApiUrl,
      data: formdata?._parts[0][0],
      headers: { 'content-type': 'application/json' },
    })
      .then(async response => {
        if (response?.status === 200) {
          console.log('====== Create Company Response ======', response);
          props.navigation.navigate('HelpScreen');
          alert(response?.data?.responseMessage);
          setIsLoading(false);
        } else {
          alert('Something went wrong.');
          setIsLoading(false);
        }
      })
      .catch(err => console.log('==== Create Company Catch err ====', err));
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.container}>
        <Feather
          name="arrow-left"
          size={25}
          color="black"
          onPress={() => props.navigation.goBack()}
        />

        <Text style={globalStyles.text}>Welcome!</Text>
        <Text style={{ color: 'grey', marginTop: -10, marginBottom: 15 }}>
          Complete profile!
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <Text style={globalStyles.smallText}>First Name</Text>
            <FormInput
              labelValue={FirstName}
              onChangeText={FirstName => {
                setFirstName(FirstName), _validateFirstName();
              }}
              placeholderText="First Name"
              iconName="user"
              iconType="Feather"
              iconSize={20}
            />
          </View>
          {errorFirstName != null ? (
            <View style={[globalStyles.ErrorContainer, { width: width * 0.4 }]}>
              <Text style={{ color: 'red', fontSize: height / 65 }}>
                {errorFirstName}
              </Text>
            </View>
          ) : null}

          <View style={{ flex: 1, marginLeft: 5 }}>
            <Text style={globalStyles.smallText}>Last Name</Text>
            <FormInput
              labelValue={LastName}
              onChangeText={LastName => {
                setLastName(LastName), _validateLasttName();
              }}
              // onChangeText={lastName => setLastName(lastName)}
              placeholderText="Last Name"
              iconName="user"
              iconType="Feather"
              iconSize={20}
            />
          </View>
          {errorLastName != null ? (
            <View style={globalStyles.ErrorContainer}>
              <Text style={{ color: 'red', fontSize: height / 65 }}>
                {errorLastName}
              </Text>
            </View>
          ) : null}
        </View>

        <Text style={globalStyles.smallText}>Phone Number</Text>
        <FormInput
          labelValue={MobileNumber}
          onChangeText={MobileNumber => {
            setMobileNumber(MobileNumber), _validateMobileNumber(MobileNumber);
          }}
          // onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
          placeholderText="Phone Number"
          iconName="phone"
          iconType="Feather"
          iconSize={20}
        />
        {errorMobileNumber != null ? (
          <View style={globalStyles.ErrorContainer}>
            <Text style={{ color: 'red', fontSize: height / 65 }}>
              {errorMobileNumber}
            </Text>
          </View>
        ) : null}

        <Text style={globalStyles.smallText}>How did you hear about us?</Text>
        <View
          style={{
            flex: 1,
            marginBottom: windowHeight / 6,
            marginTop: 10,
          }}>
          <PickerComponent />
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 30 }}>
          {isLoading ? (
            <CustomLoader />
          ) : (
            <Button buttonTitle="Complete Setup" onPress={() => onSubmit()} />
          )}
          {/* <Button
            buttonTitle="Complete Setup"
            // onPress={() => props.navigation.navigate('HelpScreen')}
            onPress={() => onSubmit()}
          /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CompleteSetupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    padding: 20,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 18,
    marginBottom: 10,
    color: '#151515',
    fontWeight: 'bold',
    marginTop: 10,
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    // fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
    alignItems: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    // fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});
