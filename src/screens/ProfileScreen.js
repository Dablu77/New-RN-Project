import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
  Modal,
} from 'react-native';
import Header from '../components/Header';
import globalStyles from '../global/globalStyles';
import VectorIcon from '../components/VectorIcon';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GetCompleteProjectListApiUrl,
  GetIncompleteProjectListApiUrl,
  GetNewProjectListApiUrl,
  GetProfileApiUrl,
} from '../restApi/ApiConfig';
const {height, width} = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const ProfileScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingInProcess, setIsFetchingInProcess] = useState(false);
  const [isFetchingCompleted, setIsFetchingCompleted] = useState(false);
  const [CreateProject, setCreateProject] = useState([]);
  const [InProcessProject, setInProcessProject] = useState([]);
  const [CompletedProject, setCompletedProject] = useState([]);
  const [ProfileDetails, setProfileDetails] = useState({});
  const [modalVisibleLogout, setModalVisibleLogout] = useState(false);

  const logOut = () => {
    AsyncStorage.removeItem('token');
    try {
      AsyncStorage.removeItem('token');
      console.log('======== Token EXPIRED =========');
      props.navigation.replace('LoginScreen');
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    // CreateNewProjectApi();
    // InProcessProjectApi();
    // CompletedProjectApi();
    GetUserProfileApi();
  }, [props.route]);

  // ************ Create New Project List Api Integration ************
  const CreateNewProjectApi = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log(value);

    setIsLoading(true);
    axios({
      method: 'get',
      url: GetNewProjectListApiUrl,
      headers: {token: value},
    })
      .then(async response => {
        if (response.data.responseCode === 200) {
          console.log('====== CreateProject List Response ======', response);
          setCreateProject(response?.data?.result);
          setIsLoading(false);
        } else {
          // alert('Something went wrong.');
          setIsLoading(false);
        }
      })
      .catch(err => console.log('==== CreateProject List Catch err ====', err));
  };
  // *************** Create New Project Refreshing Functions ***************
  const CreateProjectApiCall = () => {
    setIsFetching(false);
    CreateNewProjectApi();
  };

  // ************ In-Process Project List Api Integration ************
  const InProcessProjectApi = async () => {
    const value = await AsyncStorage.getItem('token');

    setIsLoading(true);
    axios({
      method: 'get',
      url: GetIncompleteProjectListApiUrl,
      headers: {token: value},
    })
      .then(async response => {
        if (response.data.responseCode === 200) {
          console.log('====== In-Process List Response ======', response);
          setInProcessProject(response?.data?.result);
          setIsLoading(false);
        } else {
          // alert('Something went wrong.');
          setIsLoading(false);
        }
      })
      .catch(err => console.log('==== In-Process List Catch err ====', err));
  };
  // *************** In-Process Project Refreshing Functions ***************
  const InProcessProjectApiCall = () => {
    setIsFetchingInProcess(false);
    InProcessProjectApi();
  };

  // ************ Completed Project List Api Integration ************
  const CompletedProjectApi = async () => {
    const value = await AsyncStorage.getItem('token');

    setIsLoading(true);
    axios({
      method: 'get',
      url: GetCompleteProjectListApiUrl,
      headers: {token: value},
    })
      .then(async response => {
        if (response.data.responseCode === 200) {
          console.log('====== Completed List Response ======', response);
          setCompletedProject(response?.data?.result);
          setIsLoading(false);
        } else {
          // alert('Something went wrong.');
          setIsLoading(false);
        }
      })
      .catch(err => console.log('==== Completed List Catch err ====', err));
  };
  // *************** Completed Project Refreshing Functions ***************
  const CompletedProjectApiCall = () => {
    isFetchingCompleted(false);
    CompletedProjectApi();
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

  const CreateProjectRenderItem = item => {
    return (
      <View showsVerticalScrollIndicator={false} style={{marginRight: 15}}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('ProcessScreen', {id: item?.item?._id})
          }>
          {item?.item?.originalImage[0]?.image ? (
            <Image
              style={{
                // width: windowWidth / 2.2,
                // height: windowWidth / 3,
                // borderRadius: 5,
                height: 130,
                width: 130,
                borderRadius: 130 / 2,
              }}
              source={{uri: item?.item?.originalImage[0]?.image}}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require('../assets/appIcon.jpeg')}
              style={{
                width: windowWidth / 2.2,
                height: windowWidth / 3,
                borderRadius: 5,
              }}
            />
          )}

          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={{color: 'black', fontSize: 16}}>
              {item?.item?.projectname}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <VectorIcon familyName={'Feather'} iconName={'map-pin'} size={15} />
            <Text style={{color: 'black', marginLeft: 2}}>
              {item?.item?.address1} {item?.item?.address2}
            </Text>
          </View>
          <Text style={{color: 'black', marginLeft: 15}}>
            {item?.item?.city}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const CompletedProjectRenderItem = item => {
    return (
      <View showsVerticalScrollIndicator={false} style={{marginRight: 15}}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('ProcessScreen', {id: item?.item?._id})
          }>
          {/* <Image
            style={{
              width: windowWidth / 2.2,
              height: windowWidth / 3,
              borderRadius: 5,
            }}
            source={require('../assets/appIcon.jpeg')}
          /> */}
          {item?.item?.originalImage[0]?.image ? (
            <Image
              style={{
                // width: windowWidth / 2.2,
                // height: windowWidth / 3,
                // borderRadius: 5,
                height: 130,
                width: 130,
                borderRadius: 130 / 2,
              }}
              source={{uri: item?.item?.originalImage[0]?.image}}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require('../assets/appIcon.jpeg')}
              style={{
                width: windowWidth / 2.2,
                height: windowWidth / 3,
                borderRadius: 5,
              }}
            />
          )}
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={{color: 'black', fontSize: 16}}>
              {item?.item?.projectname}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <VectorIcon familyName={'Feather'} iconName={'map-pin'} size={15} />
            <Text style={{color: 'black', marginLeft: 2}}>
              {item?.item?.address1} {item?.item?.address2}
            </Text>
          </View>
          <Text style={{color: 'black', marginLeft: 15}}>
            {item?.item?.city}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const InProcessProjectRenderItem = item => {
    return (
      <View showsVerticalScrollIndicator={false} style={{marginRight: 15}}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('ProcessScreen', {id: item?.item?._id})
          }>
          {/* <Image
            style={{
              width: windowWidth / 2.2,
              height: windowWidth / 3,
              borderRadius: 5,
            }}
            source={require('../assets/appIcon.jpeg')}
          /> */}
          {item?.item?.originalImage[0]?.image ? (
            <Image
              style={{
                // width: windowWidth / 2.2,
                // height: windowWidth / 3,
                // borderRadius: 5,
                height: 130,
                width: 130,
                borderRadius: 130 / 2,
              }}
              source={{uri: item?.item?.originalImage[0]?.image}}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require('../assets/appIcon.jpeg')}
              style={{
                width: windowWidth / 2.2,
                height: windowWidth / 3,
                borderRadius: 5,
              }}
            />
          )}
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={{color: 'black', fontSize: 16}}>
              {item?.item?.projectname}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <VectorIcon familyName={'Feather'} iconName={'map-pin'} size={15} />
            <Text style={{color: 'black', marginLeft: 2}}>
              {item?.item?.address1} {item?.item?.address2}
            </Text>
          </View>
          <Text style={{color: 'black', marginLeft: 15}}>
            {item?.item?.city}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header
          image={false}
          onPress={() => props.navigation.goBack()}
          profileIcon={true}
          ProfilePress={() => props.navigation.navigate('EditProfile')}
        />

        <Text style={globalStyles.text}>
          {ProfileDetails?.fname} {ProfileDetails?.lname}
        </Text>

        <View style={[styles.ListContainer, {alignItems: 'flex-start'}]}>
          <Text style={globalStyles.text}>Preferences</Text>
          {/* ********* Notification Container ********** */}
          <TouchableOpacity
            style={styles.BoxBtnContainer}
            onPress={() => props.navigation.navigate('Notifications')}>
            <View style={styles.nameTxtContainer}>
              <Text style={{fontSize: 18, color: '#000'}}>Notifications</Text>
            </View>
            <View style={styles.MoveIconContainer}>
              <AntDesign name="right" size={20} color="#000" />
            </View>
          </TouchableOpacity>

          <Text style={globalStyles.text}>Cart</Text>
          {/* ********* Notification Container ********** */}
          <TouchableOpacity
            style={styles.BoxBtnContainer}
            onPress={() => props.navigation.navigate('CartScreen')}>
            <View style={styles.nameTxtContainer}>
              <Text style={{fontSize: 18, color: '#000'}}>Go to Cart</Text>
            </View>
            <View style={styles.MoveIconContainer}>
              <AntDesign name="right" size={20} color="#000" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.BoxBtnContainer}
            // onPress={() => props.navigation.navigate('CartScreen')}
          >
            <View style={styles.nameTxtContainer}>
              <Text style={{fontSize: 18, color: '#000'}}>Your Orders</Text>
            </View>
            <View style={styles.MoveIconContainer}>
              <AntDesign name="right" size={20} color="#000" />
            </View>
          </TouchableOpacity>

          <Text style={globalStyles.text}>Legal</Text>
          {/* ********* Terms and Conditions Container ********** */}
          <TouchableOpacity
            style={styles.BoxBtnContainer}
            onPress={() => props.navigation.navigate('TermsOfUse')}>
            <View style={styles.nameTxtContainer}>
              <Text style={{fontSize: 18, color: '#000'}}>Terms of Use</Text>
            </View>
            <View style={styles.MoveIconContainer}>
              <AntDesign name="right" size={20} color="#000" />
            </View>
          </TouchableOpacity>

          {/* ********* Privacy Policy Container ********** */}
          <TouchableOpacity
            style={styles.BoxBtnContainer}
            onPress={() => props.navigation.navigate('PrivacyPolicy')}>
            <View style={styles.nameTxtContainer}>
              <Text style={{fontSize: 18, color: '#000'}}>Privacy Policy</Text>
            </View>
            <View style={styles.MoveIconContainer}>
              <AntDesign name="right" size={20} color="#000" />
            </View>
          </TouchableOpacity>

          {/* ********* Contact Us Container ********** */}
          <TouchableOpacity
            style={styles.BoxBtnContainer}
            onPress={() => props.navigation.navigate('ContactUs')}>
            <View style={styles.nameTxtContainer}>
              <Text style={{fontSize: 18, color: '#000'}}>Contact Us</Text>
            </View>
            <View style={styles.MoveIconContainer}>
              <AntDesign name="right" size={20} color="#000" />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            marginRight: 15,
            marginBottom: 10,
          }}>
          <TouchableOpacity
            // onPress={() => logOut()}
            onPress={() => setModalVisibleLogout(true)}
            style={{
              marginTop: 10,
              width: '98%',
              height: windowHeight / 16,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 3,
              marginHorizontal: 10,
              backgroundColor: '#BF2025',
            }}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ************ Logout Confirmation Modal ************ */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleLogout}
        onRequestClose={() => {
          setModalVisibleLogout(!modalVisibleLogout);
        }}>
        <View style={styles.LogoutmainContainer}>
          <View style={styles.LogoutModalSubContainer}>
            <View style={styles.LogoutHeadingContainer}>
              <View style={{height: height * 0.07, justifyContent: 'center'}}>
                <Text
                  style={[
                    styles.LogoutHeadingTxtContainer,
                    {fontSize: height / 36},
                  ]}>
                  Logout
                </Text>
              </View>
              <View style={{height: height * 0.08, justifyContent: 'center'}}>
                <Text style={[styles.LogoutHeadingTxtContainer]}>
                  Are you sure, you want to Logout ?
                </Text>
              </View>

              <View style={styles.LogoutButtonMainContainer}>
                <View style={styles.LogoutbtnContainer}>
                  <View
                    style={{
                      // flex: 1,
                      // width: width * 0.5,
                      marginRight: 15,
                      marginBottom: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => logOut()}
                      style={styles.ConfirmLogoutTouch}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 18,
                          fontWeight: '600',
                        }}>
                        Yes
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.LogoutbtnContainer}>
                  <View
                    style={{
                      // flex: 1,
                      // width: width * 0.5,
                      marginRight: 15,
                      marginBottom: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => setModalVisibleLogout(!modalVisibleLogout)}
                      style={[
                        styles.ConfirmLogoutTouch,
                        {backgroundColor: 'white', borderWidth: 0.5},
                      ]}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 18,
                          fontWeight: '600',
                        }}>
                        No
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    padding: 10,
  },
  ListContainer: {
    height: height * 0.63,
    width: width * 0.945,
    alignItems: 'center',
  },
  BoxBtnContainer: {
    height: height * 0.065,
    width: width * 0.945,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#C7C7C7',
    // boopacity: 0.2,
  },
  nameTxtContainer: {
    height: height * 0.065,
    width: width * 0.745,
    justifyContent: 'center',
  },
  MoveIconContainer: {
    height: height * 0.065,
    width: width * 0.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  // ********** Logout Modal Styling **********
  LogoutmainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  LogoutModalMainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 1,
    backgroundColor: 'rgba(0, 0, 0, 0.67)',
  },
  LogoutModalSubContainer: {
    height: height * 0.2,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LogoutHeadingContainer: {
    height: height * 0.28,
    width: width * 0.9,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  LogoutHeadingTxtContainer: {
    color: 'black',
    fontSize: height / 45,
    // fontFamily: 'Montserrat-SemiBold',
    // marginTop: height * 0.03,
  },
  LogoutButtonMainContainer: {
    height: height * 0.09,
    width: width * 0.88,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  LogoutbtnContainer: {
    height: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.45,
  },
  // ********** Logout Styling **********

  ConfirmLogoutTouch: {
    marginTop: 10,
    // width: '45%',
    width: width * 0.25,
    height: windowHeight / 16,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginHorizontal: 10,
    backgroundColor: '#BF2025',
  },
});

export default ProfileScreen;
