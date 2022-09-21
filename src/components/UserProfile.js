import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {GetProfileApiUrl} from '../restApi/ApiConfig';
import CustomLoader from './CustomLoader/CustomLoader';
const {height, width} = Dimensions.get('window');

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const UserProfile = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [ProfileDetails, setProfileDetails] = useState({});

  useEffect(() => {
    GetUserProfileApi();
  }, [props.route]);

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
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainContainer}>
          {/* ********* Header Container ********* */}
          <View style={styles.HeaderContainer}>
            <AntDesign
              name="arrowleft"
              size={25}
              color="black"
              onPress={() => props.navigation.goBack()}
            />
            <Feather
              name="settings"
              size={25}
              color="#000"
              onPress={() => props.navigation.navigate('ProfileScreen')}
            />
          </View>

          {/* ********* Profile Image ********* */}
          <View style={styles.ProfileimgContainer}>
            <View style={styles.ProfileImgView}>
              <Image
                source={{uri: ProfileDetails?.image}}
                style={{height: 165, width: 165, borderRadius: 80}}
              />
            </View>
          </View>

          {/* ********* First Name Container ********* */}
          <View style={styles.InputContainer}>
            <View style={styles.LabelContainer}>
              <Text style={styles.LabelTxt}>First Name</Text>
            </View>
            <View style={styles.LabelInputContainer}>
              <TextInput
                value={ProfileDetails?.fname}
                placeholder="Enter first name"
                placeholderTextColor="black"
                keyboardType="default"
                editable={false}
                maxLength={30}
                style={{
                  color: 'black',
                  fontSize: 16,
                  padding: 10,
                }}
              />
            </View>
          </View>

          {/* ************ Last Name Container ************ */}
          <View style={styles.InputContainer}>
            <View style={styles.LabelContainer}>
              <Text style={styles.LabelTxt}>Last Name</Text>
            </View>
            <View style={styles.LabelInputContainer}>
              <TextInput
                value={ProfileDetails.lname}
                placeholder="Enter last name"
                placeholderTextColor="black"
                keyboardType="default"
                editable={false}
                maxLength={30}
                style={{
                  color: 'black',
                  fontSize: 16,
                  padding: 10,
                }}
              />
            </View>
          </View>

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
              />
            </View>
          </View>

          {/* ************ Phone Container ************ */}
          <View style={styles.InputContainer}>
            <View style={styles.LabelContainer}>
              <Text style={styles.LabelTxt}>Phone Number</Text>
            </View>
            <View style={styles.LabelInputContainer}>
              <TextInput
                value={ProfileDetails?.phone}
                editable={false}
                placeholder="Enter phone number"
                placeholderTextColor="black"
                keyboardType="number-pad"
                maxLength={30}
                style={{
                  color: 'black',
                  fontSize: 16,
                  padding: 10,
                }}
              />
            </View>
          </View>

          {/* ************ Company Container ************ */}
          <View style={styles.InputContainer}>
            <View style={styles.LabelContainer}>
              <Text style={styles.LabelTxt}>Company Name</Text>
            </View>
            <View style={styles.LabelInputContainer}>
              <TextInput
                value={ProfileDetails?.company}
                editable={false}
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

          {/* ************ Button Container ************ */}
          <View style={styles.BtnContainer}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('EditProfile')}
              style={styles.BtnTouch}>
              <Text
                style={{
                  color: 'white',
                  fontSize: height / 45,
                  fontWeight: '600',
                }}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  mainContainer: {
    // height: height * 1,
    // width: width * 1,
    flex: 1,
    alignItems: 'center',
  },
  HeaderContainer: {
    width: width * 0.94,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ChatListContainer: {
    height: height * 0.9,
    width: width * 1,
    alignItems: 'center',
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
    width: width * 0.63,
    position: 'absolute',
    bottom: 12,
    left: 38, // 20
    alignItems: 'flex-end',
  },
  //   Label
  InputContainer: {
    height: height * 0.12,
    width: width * 0.92,
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
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    marginHorizontal: 9,
  },
  BtnContainer: {
    height: height * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtnTouch: {
    marginTop: 10,
    width: width * 0.9,
    height: windowHeight / 16,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: '#BF2025',
  },
});
