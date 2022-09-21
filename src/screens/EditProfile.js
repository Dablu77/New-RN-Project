import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import Header from '../components/Header';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetProfileApiUrl, UpdateProfileUrl } from '../restApi/ApiConfig';
import ImagePicker from 'react-native-image-crop-picker';
import { androidCameraPermission } from '../Utils/Permission';
import CustomLoader from '../components/CustomLoader/CustomLoader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { height, width } = Dimensions.get('window');

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const EditProfile = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrlPath, setImageUrlPath] = useState('');
  const [imageUrlData, setImageUrlData] = useState('');
  const [ProfileDetails, setProfileDetails] = useState({});

  //   console.log('===== profile pictures =====', imageUrlData);

  // ************ First Name Validations ************
  const [FirstName, setFirstName] = useState('');
  const [errorFirstName, setErrorFirstName] = useState(null);
  const _validateFirstName = fname => {
    var fnameRegex = /^[a-z A-Z ]{2,32}$/i;
    if (fname == '' || fname == undefined || fname == null) {
      setErrorFirstName('*Please enter first name.');
    } else if (!fnameRegex.test(fname)) {
      setErrorFirstName('*Please enter valid first name.');
    } else {
      setErrorFirstName(null);
    }
  };

  // ************ Last Name Validations ************
  const [LastName, setLastName] = useState('');
  const [errorLastName, setErrorLastName] = useState(null);
  const _validateLastName = lname => {
    var lnameRegex = /^[a-z A-Z ]{2,32}$/i;
    if (lname == '' || lname == undefined || lname == null) {
      setErrorLastName('*Please enter last name.');
    } else if (!lnameRegex.test(lname)) {
      setErrorLastName('*Please enter valid last name.');
    } else {
      setErrorLastName(null);
    }
  };

  // ************ Email Validations ************
  const [Email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(null);
  const _validateEmail = mail => {
    var emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (mail === '') {
      setErrorEmail('*Please enter email.');
    } else if (!emailRegex.test(mail)) {
      setErrorEmail('*Please enter valid email.');
    } else {
      setErrorEmail(null);
    }
  };

  // ************ Phone Validations ************
  const [Phone, setPhone] = useState('');
  const [errorPhone, setErrorPhone] = useState(null);
  const _validatePhone = Phone => {
    var PhoneRegex = /^([0-9]){9,14}$/;
    if (Phone === '') {
      setErrorPhone('*Please enter Phone Number.');
    } else if (!PhoneRegex.test(Phone)) {
      setErrorPhone('*Please enter valid Phone Number.');
    } else {
      setErrorPhone(null);
    }
  };

  // ************ Company Name Validations ************
  const [CompanyName, setCompanyName] = useState('');
  const [errorCompanyName, setErrorCompanyName] = useState(null);
  const _validateCompanyName = company => {
    var companyRegex = /^[a-z A-Z ]{2,32}$/i;
    if (company == '' || company == undefined || company == null) {
      setErrorCompanyName('*Please enter company name.');
    } else if (!companyRegex.test(company)) {
      setErrorCompanyName('*Please enter valid company name.');
    } else {
      setErrorCompanyName(null);
    }
  };

  // ************ Extra Option Validations ************
  const [ExtraOption, setExtraOption] = useState('');
  const [errorExtraOption, setErrorExtraOption] = useState(null);
  const _validateExtraOption = options => {
    var optionsRegex = /^[a-z A-Z ]{2,32}$/i;
    if (options == '' || options == undefined || options == null) {
      setErrorExtraOption('*Please enter first name.');
    } else if (!optionsRegex.test(options)) {
      setErrorExtraOption('*Please enter valid first name.');
    } else {
      setErrorExtraOption(null);
    }
  };

  const validate = () => {
    let flag = true;
    if (FirstName === '') {
      setFirstName('*Please enter first name.');
      flag = false;
    }
    if (LastName === '') {
      setLastName('*Please enter last name.');
      flag = false;
    }
    // if (Email === '') {
    //   setErrorEmail('*Please enter email.');
    //   flag = false;
    // }
    if (Phone === '') {
      setErrorPhone('*Please enter phone number.');
      flag = false;
    }
    if (CompanyName === '') {
      setCompanyName('*Please enter company name.');
      flag = false;
    }
    return flag;
  };

  const onSubmit = () => {
    if (validate()) {
      UpdateProfileApi();
    }
  };

  // ************* On Select Image Picker *************
  const onSelectImage = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Upload Photos', 'Choose an options', [
        { text: 'Gallary', onPress: onGallary },
        { text: 'Cancel', onPress: () => { } },
      ]);
    }
  };

  // ************* On Camera Picker *************
  const onCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      mediaType: 'any',
    }).then(image => {
      // console.log("===== Open Camera =====222", image);
      setImageUrlPath(image.path);
      setImageUrlData(image.data);
    });
  };

  // ************* On Gallary Picker *************
  const onGallary = () => {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
      quality: 'low',
      includeBase64: true,
      mediaType: 'any',
    }).then(image => {
      console.log('selected image', image);
      setImageUrlPath(image.path);
      setImageUrlData(image.data);
    });
  };

  useEffect(() => {
    GetUserProfileApi();
  }, []);

  // ************ Edit Profile Api Integration ************
  const UpdateProfileApi = async () => {
    const value = await AsyncStorage.getItem('token');

    const DATA = new FormData();
    DATA.append({
      image: `data:image/jpeg;base64,${imageUrlData}`,
      fname: FirstName,
      lname: LastName,
      email: Email,
      phone: Phone,
      company: CompanyName,
      extraoption: ExtraOption,
    });
    console.log('====== Update data=====', DATA);

    setIsLoading(true);
    axios({
      method: 'put',
      url: UpdateProfileUrl,
      data: DATA,
      headers: { token: value },
    })
      .then(async response => {
        if (response.data.responseCode === 200) {
          console.log('====== Update Profilet Response ======', response);
          props.navigation.naviagte('ProfileScreen');
          alert(response?.data?.responseMessage);
          setIsLoading(false);
        } else {
          // alert('Something went wrong.');
          setIsLoading(false);
        }
      })
      .catch(err =>
        console.log('==== Update Profilet List Catch err ====', err),
      );
    setIsLoading(false);
  };

  // ************ Get User Profile Api Integration ************
  const GetUserProfileApi = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log(value);

    setIsLoading(true);
    axios({
      method: 'get',
      url: GetProfileApiUrl,
      headers: {
        token: value,
      },
    })
      .then(async response => {
        if (response.data.responseCode === 200) {
          console.log('====== User Profile Response ======', response);
          setProfileDetails(response?.data?.result);
          setIsLoading(false);
        } else {
          alert('Something went wrong.');
          setIsLoading(false);
        }
      })
      .catch(err => console.log('==== User Profile Catch err ====', err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 10 }}>
        <Header
          image={false}
          profileIcon={false}
          onPress={() => props.navigation.goBack()}
        />
      </View>
      <KeyboardAwareScrollView>
        <ScrollView>
          <View style={styles.container}>
            {/* ************ Profile Image ************ */}
            <View style={styles.ProfileimgContainer}>
              <View style={styles.ProfileImgView}>
                {imageUrlPath ? (
                  <Image
                    source={{ uri: imageUrlPath }}
                    style={{ height: 165, width: 165, borderRadius: 80 }}
                  />
                ) : (
                  <Image
                    source={require('../assets/logo.png')}
                    style={{ height: 165, width: 165, borderRadius: 80 }}
                  />
                )}
              </View>
              <View
                style={styles.CameraIconView}
                onPress={() => onSelectImage()}>
                <TouchableOpacity>
                  <Image
                    source={require('../assets/Cameraicon.png')}
                    style={{ height: 45, width: 45 }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* ************ First Name Container ************ */}
            <View style={styles.InputContainer}>
              <View style={styles.LabelContainer}>
                <Text style={styles.LabelTxt}>First Name</Text>
              </View>
              <View style={styles.LabelInputContainer}>
                <TextInput
                  placeholder="Enter first name"
                  placeholderTextColor="black"
                  keyboardType="default"
                  maxLength={30}
                  style={{
                    color: 'black',
                    fontSize: 16,
                    padding: 10,
                  }}
                  onChangeText={txt => {
                    setFirstName(txt), _validateFirstName(txt);
                  }}
                />
              </View>
            </View>
            {errorFirstName != null ? (
              <View style={styles.ErrorContainer}>
                <Text style={{ color: 'red', fontSize: height / 65 }}>
                  {errorFirstName}
                </Text>
              </View>
            ) : null}

            {/* ************ Last Name Container ************ */}
            <View style={styles.InputContainer}>
              <View style={styles.LabelContainer}>
                <Text style={styles.LabelTxt}>Last Name</Text>
              </View>
              <View style={styles.LabelInputContainer}>
                <TextInput
                  placeholder="Enter last name"
                  placeholderTextColor="black"
                  keyboardType="default"
                  maxLength={30}
                  style={{
                    color: 'black',
                    fontSize: 16,
                    padding: 10,
                  }}
                  onChangeText={txt => {
                    setLastName(txt), _validateLastName(txt);
                  }}
                />
              </View>
            </View>
            {errorLastName != null ? (
              <View style={styles.ErrorContainer}>
                <Text style={{ color: 'red', fontSize: height / 65 }}>
                  {errorLastName}
                </Text>
              </View>
            ) : null}

            {/* ************ Email Container ************ */}
            <View style={styles.InputContainer}>
              <View style={styles.LabelContainer}>
                <Text style={styles.LabelTxt}>Email</Text>
              </View>
              <View style={styles.LabelInputContainer}>
                <TextInput
                  value={ProfileDetails?.email}
                  editable={false}
                  placeholder="Enter email"
                  placeholderTextColor="black"
                  keyboardType="email-address"
                  maxLength={60}
                  style={{
                    color: 'black',
                    fontSize: 16,
                    padding: 10,
                  }}
                // onChangeText={txt => {
                //   setEmail(txt), _validateEmail(txt);
                // }}
                />
              </View>
            </View>
            {/* {errorEmail != null ? (
            <View style={styles.ErrorContainer}>
              <Text style={{color: 'red', fontSize: height / 65}}>
                {errorEmail}
              </Text>
            </View>
          ) : null} */}

            {/* ************ Phone Container ************ */}
            <View style={styles.InputContainer}>
              <View style={styles.LabelContainer}>
                <Text style={styles.LabelTxt}>Phone Number</Text>
              </View>
              <View style={styles.LabelInputContainer}>
                <TextInput
                  placeholder="Enter phone number"
                  placeholderTextColor="black"
                  keyboardType="number-pad"
                  maxLength={30}
                  style={{
                    color: 'black',
                    fontSize: 16,
                    padding: 10,
                  }}
                  onChangeText={txt => {
                    setPhone(txt), _validatePhone(txt);
                  }}
                />
              </View>
            </View>
            {errorPhone != null ? (
              <View style={styles.ErrorContainer}>
                <Text style={{ color: 'red', fontSize: height / 65 }}>
                  {errorPhone}
                </Text>
              </View>
            ) : null}

            {/* ************ Company Container ************ */}
            <View style={styles.InputContainer}>
              <View style={styles.LabelContainer}>
                <Text style={styles.LabelTxt}>Company Name</Text>
              </View>
              <View style={styles.LabelInputContainer}>
                <TextInput
                  placeholder="Enter company name"
                  placeholderTextColor="black"
                  keyboardType="default"
                  maxLength={30}
                  style={{
                    color: 'black',
                    fontSize: 16,
                    padding: 10,
                  }}
                  onChangeText={txt => {
                    setCompanyName(txt), _validateCompanyName(txt);
                  }}
                />
              </View>
            </View>
            {errorCompanyName != null ? (
              <View style={styles.ErrorContainer}>
                <Text style={{ color: 'red', fontSize: height / 65 }}>
                  {errorCompanyName}
                </Text>
              </View>
            ) : null}

            {/* ************ Extra Options Container ************ */}
            <View style={styles.InputContainer}>
              <View style={styles.LabelContainer}>
                <Text style={styles.LabelTxt}>Extra Options</Text>
              </View>
              <View style={styles.LabelInputContainer}>
                <TextInput
                  placeholder="Enter additional data"
                  placeholderTextColor="black"
                  keyboardType="default"
                  maxLength={200}
                  style={{
                    color: 'black',
                    fontSize: 16,
                    padding: 10,
                  }}
                  onChangeText={txt => setExtraOption(txt)}
                />
              </View>
            </View>

            {/* ************ Button Container ************ */}
            <View style={styles.BtnContainer}>
              {isLoading ? (
                <CustomLoader />
              ) : imageUrlData && FirstName && LastName && CompanyName ? (
                <TouchableOpacity
                  onPress={() => onSubmit()}
                  style={styles.BtnTouch}>
                  <Text
                    style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>
                    Update
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  disabled
                  onPress={() => onSubmit()}
                  style={styles.BtnTouch}>
                  <Text
                    style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>
                    Update
                  </Text>
                </TouchableOpacity>
              )}
              {/* <TouchableOpacity
              onPress={() => onSubmit()}
              style={styles.BtnTouch}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
                Update
              </Text>
            </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    padding: 10,
    height: Platform.OS === 'android' ? height * 1.2 : height * 1.1,
    // width: width * 1,
  },
  ProfileimgContainer: {
    height: height * 0.2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProfileImgView: {
    height: 130,
    width: 130,
    borderRadius: 130 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  CameraIconView: {
    width: width * 0.6,
    position: 'absolute',
    bottom: 15,
    left: 38, // 20
    alignItems: 'flex-end',
  },
  //   Label
  InputContainer: {
    height: height * 0.12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LabelContainer: {
    height: height * 0.044,
    width: '100%',
    justifyContent: 'center',
  },
  LabelTxt: {
    fontSize: height / 46,
    fontWeight: '400',
    marginLeft: 10,
    color: '#000',
  },
  LabelInputContainer: {
    height: height * 0.065,
    width: '98%',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,

    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    marginHorizontal: 9,
  },
  ErrorContainer: {
    // height: height * 0.02,
    width: width * 0.9,
    justifyContent: 'center',
    marginBottom: 10,
  },
  BtnContainer: {
    height: height * 0.15,
    // flex: 1,
    // marginRight: 15,
    // marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtnTouch: {
    marginTop: 10,
    width: '98%',
    height: windowHeight / 16,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    // marginHorizontal: 10,
    backgroundColor: '#BF2025',
  },
});
