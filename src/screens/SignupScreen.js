import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import FormInput from '../components/FormInput';
import Button from '../components/Button';
import CheckBox from '../components/CheckBos';
import globalStyles from '../global/globalStyles';
import colors from '../global/colors';
import CustomLoader from '../components/CustomLoader/CustomLoader';
const { height, width } = Dimensions.get('window');

const SignupScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // ************ Company Name Validation ************
  const [companyName, setCompanyName] = useState('');
  const [CompanyError, setCompanyError] = useState(null);
  const _validateComapny = company => {
    var companyRegex = /^[a-z A-Z ]{3,32}$/i;
    if (company === '') {
      setCompanyError('*Please enter company name.');
      return false;
    } else if (!companyRegex.test(company)) {
      setCompanyError('*Please enter valid comapny name.');
      return false;
    } else {
      setCompanyError(null);
      return true;
    }
  };

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
    if (companyName === '') {
      setCompanyError('*Please enter company name.');
      flag = false;
    }
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
      props.navigation.navigate('CompleteSetupScreen', {
        company: companyName,
        email: Email,
        password: Password,
      });
    } else {
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.container}>
        <AntDesign
          name="arrowleft"
          size={25}
          color="#666"
          onPress={() => props.navigation.goBack()}
        />

        <Text style={globalStyles.text}>Create a new account</Text>
        <Text style={globalStyles.smallText}>Company</Text>
        <FormInput
          labelValue={companyName}
          onChangeText={companyName => setCompanyName(companyName)}
          placeholderText="Company Name"
          iconName="user"
          iconType="Feather"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          iconSize={22}
          onChangeText={txt => {
            setCompanyName(txt), _validateComapny(txt);
          }}
        />
        {CompanyError != null ? (
          <View style={globalStyles.ErrorContainer}>
            <Text style={{ color: 'red', fontSize: height / 65 }}>
              {CompanyError}
            </Text>
          </View>
        ) : null}

        <Text style={globalStyles.smallText}>Email</Text>
        <FormInput
          labelValue={Email}
          onChangeText={txt => {
            setEmail(txt), _emailvalidate(txt);
          }}
          placeholderText="Work Email"
          iconName="email-outline"
          iconType="MaterialCommunityIcons"
          iconSize={23}
        />
        {errorEmail != null ? (
          <View style={globalStyles.ErrorContainer}>
            <Text style={{ color: 'red', fontSize: height / 65 }}>
              {errorEmail}
            </Text>
          </View>
        ) : null}

        <Text style={globalStyles.smallText}>Enter Password</Text>
        <FormInput
          labelValue={Password}
          onChangeText={txt => {
            setPassword(txt), _passwordvalidate(txt);
          }}
          placeholderText="Create Password"
          iconName="lock"
          iconType="Feather"
          secureTextEntry={true}
          iconSize={20}
        />
        {errorPassword != null ? (
          <View style={globalStyles.ErrorContainer}>
            <Text style={{ color: 'red', fontSize: height / 65 }}>
              {errorPassword}
            </Text>
          </View>
        ) : null}

        <View style={globalStyles.textPrivate}>
          <CheckBox
            selected={termsAccepted}
            onPress={() => setTermsAccepted(!termsAccepted)}
          />
          <Text style={globalStyles.color_textPrivate}> I agree to </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('TermsOfUse')}>
            <Text
              style={[
                globalStyles.color_textPrivate,
                { color: colors.red, fontWeight: '600' },
              ]}>
              Terms of Use
            </Text>
          </TouchableOpacity>

          <Text style={globalStyles.color_textPrivate}> and </Text>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('PrivacyPolicy')}>
            <Text
              style={[
                globalStyles.color_textPrivate,
                {
                  color: colors.red,
                  fontWeight: '600',
                  // fontFamily: 'Open-Sans'
                },
              ]}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 30 }}>
          <Button buttonTitle="Create Account" onPress={() => onSubmit()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;
