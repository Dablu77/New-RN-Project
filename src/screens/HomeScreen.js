import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import globalStyles from '../global/globalStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GetCompleteProjectListApiUrl,
  GetIncompleteProjectListApiUrl,
  GetNewProjectListApiUrl,
} from '../restApi/ApiConfig';
const {height, width} = Dimensions.get('window');

const HomeScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedString, setSelectedString] = useState('NewProjects');

  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingInProcess, setIsFetchingInProcess] = useState(false);
  const [isFetchingCompleted, setIsFetchingCompleted] = useState(false);
  const [CreateProject, setCreateProject] = useState([]);
  const [InProcessProject, setInProcessProject] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  console.log('==== Done projects =====', completedProjects);

  useEffect(() => {
    CompletedProjectsApi();
    CreateNewProjectApi();
    InProcessProjectApi();
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
        if (response?.data?.responseCode === 200) {
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
        if (response?.data?.responseCode === 200) {
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
  const InProcessProjectApiCall = () => {
    setIsFetchingInProcess(false);
    InProcessProjectApi();
  };

  // ************ Completed Project List Api ************
  const CompletedProjectsApi = async () => {
    const value = await AsyncStorage.getItem('token');

    setIsLoading(true);
    axios({
      method: 'get',
      url: GetCompleteProjectListApiUrl,
      headers: {token: value},
    })
      .then(async response => {
        if (response?.data?.responseCode === 200) {
          console.log('====== Completed Project Response ======', response);
          setCompletedProjects(response?.data?.result);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch(err => console.log('==== Completed Project Catch err ====', err));
  };
  const CompletedProjectsRefreshers = () => {
    setIsFetchingCompleted(false);
    CompletedProjectsApi();
  };

  // -=-=-=-=-= Render Item -=-=-=-=-=-=
  const CreateProjectRenderItem = item => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.CardMainContainer}
        onPress={() => props.navigation.navigate('ProjectDetails', {id: item})}>
        <View style={styles.CardSubContainer}>
          <View style={styles.imgContainer}>
            {item?.item?.originalImage[0]?.image ? (
              <Image
                style={{
                  height: Platform.OS === 'android' ? 88 : 100,
                  width: 102,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}
                // resizeMode="contain"
                source={{uri: item?.item?.originalImage[0]?.image}}
              />
            ) : (
              <Image
                source={require('../assets/appIcon.jpeg')}
                style={{
                  height: Platform.OS === 'android' ? 88 : 100,
                  width: 102,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}
              />
            )}
          </View>

          <View style={styles.ProjectTitleContainer}>
            <Text
              style={{
                fontSize: height / 45,
                fontWeight: '600',
                color: '#000',
                marginVertical: 5,
              }}>
              {item?.item?.projectname}
            </Text>
            <Text style={{fontSize: height / 55, color: '#000'}}>
              {item?.item?.address1} {item?.item?.address2}, {item?.item?.city}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const InProcessProjectRenderItem = item => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.CardMainContainer}
        onPress={() => props.navigation.navigate('ProjectDetails', {id: item})}>
        <View style={styles.CardSubContainer}>
          <View style={styles.imgContainer}>
            {item?.item?.originalImage[0]?.image ? (
              <Image
                style={{
                  height: Platform.OS === 'android' ? 88 : 100,
                  width: 102,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}
                source={{uri: item?.item?.originalImage[0]?.image}}
              />
            ) : (
              <Image
                source={require('../assets/appIcon.jpeg')}
                style={{
                  height: Platform.OS === 'android' ? 88 : 100,
                  width: 102,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}
              />
            )}
          </View>

          <View style={styles.ProjectTitleContainer}>
            <Text
              style={{
                fontSize: height / 45,
                fontWeight: '600',
                color: '#000',
                marginVertical: 5,
              }}>
              {item?.item?.projectname}
            </Text>
            <Text style={{fontSize: height / 55, color: '#000'}}>
              {item?.item?.address1} {item?.item?.address2}, {item?.item?.city}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const CompletedProjectRenderItem = item => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.CardMainContainer}
        onPress={() => props.navigation.navigate('ProjectDetails', {id: item})}>
        <View style={styles.CardSubContainer}>
          <View style={styles.imgContainer}>
            {item?.item?.originalImage[0]?.image ? (
              <Image
                style={{
                  height: Platform.OS === 'android' ? 88 : 100,
                  width: 102,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}
                source={{uri: item?.item?.originalImage[0]?.image}}
              />
            ) : (
              <Image
                source={require('../assets/appIcon.jpeg')}
                style={{
                  height: Platform.OS === 'android' ? 88 : 100,
                  width: 102,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}
              />
            )}
          </View>

          <View style={styles.ProjectTitleContainer}>
            <Text
              style={{
                fontSize: height / 45,
                fontWeight: '600',
                color: '#000',
                marginVertical: 5,
              }}>
              {item?.item?.projectname}
            </Text>
            <Text style={{fontSize: height / 55, color: '#000'}}>
              {item?.item?.address1} {item?.item?.address2}, {item?.item?.city}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[globalStyles.container, {padding: 10}]}>
      <View style={[globalStyles.container, {padding: 10}]}>
        {/* ************ Tab Container ************ */}
        <View style={styles.DetailsAndItemActivityContainer}>
          <TouchableOpacity
            onPress={() => {
              setSelectedString('NewProjects'), CreateNewProjectApi();
            }}>
            <View
              style={[
                styles.DetailsTabContainer,
                {
                  borderBottomWidth: selectedString === 'NewProjects' ? 3 : 0,
                  borderBottomColor:
                    selectedString === 'NewProjects' ? '#BF2025' : null,
                },
              ]}>
              <Text
                style={{
                  color: 'black',
                  fontSize: height / 50,
                  marginVertical: 8,
                  fontWeight: '600',
                }}>
                New Projects
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSelectedString('InProcessProject'), InProcessProjectApi();
            }}>
            <View
              style={[
                styles.DetailsTabContainer,
                {
                  borderBottomWidth:
                    selectedString === 'InProcessProject' ? 3 : 0,
                  borderBottomColor:
                    selectedString === 'InProcessProject' ? '#BF2025' : null,
                },
              ]}>
              <Text
                style={{
                  color: 'black',
                  fontSize: height / 50,
                  marginVertical: 8,
                  fontWeight: '600',
                }}>
                In-Process
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSelectedString('CompletedProjects'), CompletedProjectsApi();
            }}>
            <View
              style={[
                styles.DetailsTabContainer,
                {
                  borderBottomWidth:
                    selectedString === 'CompletedProjects' ? 3 : 0,
                  borderBottomColor:
                    selectedString === 'CompletedProjects' ? '#BF2025' : null,
                },
              ]}>
              <Text
                style={{
                  color: 'black',
                  fontSize: height / 50,
                  marginVertical: 8,
                  fontWeight: '600',
                }}>
                Completed
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/*  */}
        {selectedString === 'NewProjects' ? (
          <View style={[styles.MyBundleListContainer]}>
            <FlatList
              data={CreateProject}
              showsHorizontalScrollIndicator={false}
              renderItem={CreateProjectRenderItem}
              refreshing={isFetching}
              onRefresh={CreateProjectApiCall}
            />
          </View>
        ) : selectedString === 'InProcessProject' ? (
          <View style={[styles.MyBundleListContainer]}>
            <FlatList
              data={InProcessProject}
              showsHorizontalScrollIndicator={false}
              renderItem={InProcessProjectRenderItem}
              refreshing={isFetchingInProcess}
              onRefresh={InProcessProjectApiCall}
            />
          </View>
        ) : (
          <View style={[styles.MyBundleListContainer]}>
            <FlatList
              data={completedProjects}
              showsHorizontalScrollIndicator={false}
              renderItem={CompletedProjectRenderItem}
              refreshing={isFetchingCompleted}
              onRefresh={CompletedProjectsRefreshers}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  CardMainContainer: {
    height: height * 0.135,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  CardSubContainer: {
    height: height * 0.12,
    width: width * 0.88,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    // alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  ProjectTitleContainer: {
    height: height * 0.12,
    width: width * 0.58,
    justifyContent: 'center',
  },
  lineContainer: {
    borderBottomWidth: 0.8,
    borderColor: 'grey',
    height: 5,
    width: width * 0.84,
    alignSelf: 'center',
  },
  CountContainer: {
    height: height * 0.035,
    width: width * 0.8,
    justifyContent: 'center',
  },
  imgContainer: {
    height: height * 0.12,
    width: width * 0.3,
    justifyContent: 'center',
  },
  // **** Tab Styling ****
  DetailsAndItemActivityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.07,
    width: width * 0.9,
    justifyContent: 'center',
  },
  DetailsTabContainer: {
    height: height * 0.07,
    width: width * 0.33, // 0.25
    alignItems: 'center',
    justifyContent: 'center',
  },
  MyBundleListContainer: {
    // flex: 1,
    height: Platform.OS === 'android' ? height * 0.8 : height * 0.78, //0.476
    width: width * 0.9,
    alignItems: 'center',
  },
  HeadingTxtContainer: {
    height: height * 0.05,
    width: width * 0.9,
    justifyContent: 'center',
  },
  HeadingView: {
    fontSize: height / 45,
    fontFamily: 'Montserrat-SemiBold',
    color: 'white',
    marginHorizontal: 16,
  },
});

export default HomeScreen;
