import React, {useContext, useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Platform,
} from 'react-native';

import FormInput from '../components/FormInput';
import Button from '../components/Button';
import {windowHeight, windowWidth} from '../global/Dimensions';
import Header from '../components/Header';
import styles from '../global/globalStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CreateProjectApiUrl} from '../restApi/ApiConfig';
const {height, width} = Dimensions.get('window');

const CreateProjectScreen = props => {
  console.log('==== see project name ====', props?.route?.params?.projectName);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [ProjectsTitle, setProjectsTitle] = useState('');
  const [checkProjectsTitle, setCheckProjectsTitle] = useState(true);
  const [errorProjectsTitle, setErrorProjectsTitle] = useState(null);

  const [Address, setAddress] = useState('');
  const [checkAddress, setCheckAddress] = useState(true);
  const [errorAddress, setErrorAddress] = useState(null);

  const [AddressTwo, setAddressTwo] = useState('');
  const [checkAddressTwo, setCheckAddressTwo] = useState(true);
  const [errorAddressTwo, setErrorAddressTwo] = useState(null);

  const [City, setCity] = useState('');
  const [checkCity, setCheckCity] = useState(true);
  const [errorCity, setErrorCity] = useState(null);

  const [State, setState] = useState('');
  const [checkState, setCheckState] = useState(true);
  const [errorState, setErrorState] = useState(null);

  const [Zip, setZip] = useState('');
  const [checkZip, setCheckZip] = useState(true);
  const [errorZip, setErrorZip] = useState(null);

  const _validateProjectTitle = Uname => {
    var UnameRegex = /^[a-z A-Z 0-9@_]{3,32}$/i;
    if (Uname === '') {
      setErrorProjectsTitle('*Please enter ProjectTitle.');
      return false;
    } else if (!UnameRegex.test(Uname)) {
      setErrorProjectsTitle('*Please enter valid ProjectTitle.');
      return false;
    } else {
      setErrorProjectsTitle(null);
      return true;
    }
  };

  const _validateAddress = address => {
    var addressRegex = /^[a-zA-Z0-9\s,/,-]{5,70}$/;
    if (address === '') {
      setErrorAddress('*Please enter address.');
      return false;
    } else if (!addressRegex.test(address)) {
      setErrorAddress('*Please enter valid address.');
      return false;
    } else {
      setErrorAddress(null);
      return true;
    }
  };

  const _validateAddressTwo = addressTwo => {
    var addressTwoRegex = /^[a-zA-Z0-9\s,/,-]{5,70}$/;
    if (addressTwo === '') {
      setErrorAddressTwo('*Please enter address.');
      return false;
    } else if (!addressTwoRegex.test(addressTwo)) {
      setErrorAddressTwo('*Please enter valid address.');
      return false;
    } else {
      setErrorAddressTwo(null);
      return true;
    }
  };

  const _validateCity = city => {
    var cityRegex = /^[a-zA-Z ]{3,60}$/i;
    if (city === '') {
      setErrorCity('*Please enter city.');
      return false;
    } else if (!cityRegex.test(city)) {
      setErrorCity('*Please enter valid city.');
      return false;
    } else {
      setErrorCity(null);
      return true;
    }
  };

  const _validateState = state => {
    var stateRegex = /^[a-zA-Z ]{1,60}$/i;
    if (state === '') {
      setErrorState('*Please enter state.');
      return false;
    } else if (!stateRegex.test(state)) {
      setErrorState('*Please enter valid state.');
      return false;
    } else {
      setErrorState(null);
      return true;
    }
  };

  const _validateZip = zip => {
    var zipRegex = /^[0-9/s]{3,6}$/;
    if (zip === '') {
      setErrorZip('*Please enter state.');
      return false;
    } else if (!zipRegex.test(zip)) {
      setErrorZip('*Please enter valid state.');
      return false;
    } else {
      setErrorZip(null);
      return true;
    }
  };

  const validate = () => {
    let flag = true;
    if (ProjectsTitle === '') {
      setErrorProjectsTitle('*Please enter project name.');
      flag = false;
    }
    if (Address === '') {
      setErrorAddress('*Please enter address.');
      flag = false;
    }
    if (AddressTwo === '') {
      setErrorAddressTwo('*Please enter address.');
      flag = false;
    }
    if (City === '') {
      setErrorCity('*Please enter city.');
      flag = false;
    }
    if (State === '') {
      setErrorState('*Please enter state.');
      flag = false;
    }
    if (Zip === '') {
      setErrorZip('*Please enter zip');
      flag = false;
    }
    return flag;
  };

  const onSubmit = async () => {
    if (validate()) {
      CreateProjectApi();
    } else {
    }
  };

  // ************ Login Api Integration ************
  const CreateProjectApi = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log(value);

    const formdata = new FormData();
    formdata.append('data', {
      projectname: ProjectsTitle,
      address1: Address,
      address2: AddressTwo,
      city: City,
      pcode: Zip,
      state: State,
    });
    console.log('===== Form data =====', formdata?._parts[0][1]);

    setIsLoading(true);
    axios({
      method: 'post',
      url: CreateProjectApiUrl,
      data: formdata?._parts[0][1],
      headers: {token: value},
    })
      .then(async response => {
        if (response.status === 200) {
          console.log('====== Create Projectt Response ======', response);
          props.navigation.navigate('HomeScreen');
          // props.navigation.navigate('AssignScreen', {
          //   _id: response?.data?.result?._id,
          // });
          setIsLoading(false);
        } else {
          alert('Something went wrong.');
          setIsLoading(false);
        }
      })
      .catch(err => console.log('==== Create Projectt Catch err ====', err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header
          image={false}
          profileIcon={true}
          onPress={() => props.navigation.goBack()}
        />
        <Text style={styles.text}> Create Project</Text>
        <Text style={styles.smallText}>Project Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={ProjectsTitle}
            numberOfLines={1}
            placeholder="My Project"
            placeholderTextColor="#666"
            style={[styles.input, {marginLeft: 10}]}
            onChangeText={txt => {
              setProjectsTitle(txt), _validateProjectTitle(txt);
            }}
          />
        </View>
        {errorProjectsTitle != null ? (
          <View style={{height: height * 0.02, width: width * 0.9}}>
            <Text style={{color: 'red', fontSize: 13, marginLeft: 8}}>
              {errorProjectsTitle}
            </Text>
          </View>
        ) : null}

        <Text style={styles.smallText}>Address Line 1</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={Address}
            numberOfLines={1}
            placeholder="Enter address"
            placeholderTextColor="#666"
            style={[styles.input, {marginLeft: 10}]}
            onChangeText={txt => {
              setAddress(txt), _validateAddress(txt);
            }}
          />
        </View>
        {errorAddress != null ? (
          <View style={{height: height * 0.02, width: width * 0.9}}>
            <Text style={{color: 'red', fontSize: 13, marginLeft: 8}}>
              {errorAddress}
            </Text>
          </View>
        ) : null}

        <Text style={styles.smallText}>Address Line 2</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={AddressTwo}
            numberOfLines={1}
            placeholder="Enter address"
            placeholderTextColor="#666"
            style={[styles.input, {marginLeft: 10}]}
            onChangeText={txt => {
              setAddressTwo(txt), _validateAddressTwo(txt);
            }}
          />
        </View>
        {errorAddressTwo != null ? (
          <View style={{height: height * 0.02, width: width * 0.9}}>
            <Text style={{color: 'red', fontSize: 13, marginLeft: 8}}>
              {errorAddressTwo}
            </Text>
          </View>
        ) : null}

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              width:
                Platform.OS === 'ios' ? windowWidth / 2.3 : windowWidth / 2.9,
            }}>
            <Text style={styles.smallText}>City</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={City}
                numberOfLines={1}
                placeholder="New York"
                placeholderTextColor="#666"
                style={[styles.input, {marginLeft: 10}]}
                onChangeText={txt => {
                  setCity(txt), _validateCity(txt);
                }}
              />
            </View>
          </View>

          <View style={{width: windowWidth / 5}}>
            <Text style={styles.smallText}>State</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={State}
                numberOfLines={1}
                placeholder="NY"
                placeholderTextColor="#666"
                style={[styles.input, {marginLeft: 10}]}
                onChangeText={txt => {
                  setState(txt), _validateState(txt);
                }}
              />
            </View>
          </View>

          <View>
            <Text style={styles.smallText}>Postal Code</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={Zip}
                numberOfLines={1}
                placeholder="11001"
                placeholderTextColor="#666"
                style={[styles.input, {marginLeft: 10}]}
                onChangeText={txt => {
                  setZip(txt), _validateZip(txt);
                }}
              />
            </View>
          </View>
        </View>
        {errorZip || errorCity || errorState != null ? (
          <View style={{height: height * 0.02, width: width * 0.9}}>
            <Text style={{color: 'red', fontSize: 13, marginLeft: 8}}>
              {errorZip || errorCity || errorState}
            </Text>
          </View>
        ) : null}

        <Button
          buttonTitle="Create Project"
          // btnStyling={{
          //   width: width * 0.8,
          //   marginLeft: -height * 0.001,
          // }}
          // onPress={() =>
          //   props.navigation.navigate('BottomTab', {
          //     initialRouteName: 'ProfileScreen',
          //   })
          // }
          onPress={() => onSubmit()}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateProjectScreen;
