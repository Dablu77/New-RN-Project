import React, { Component, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import Header from '../components/Header';
import globalStyles from '../global/globalStyles';
import ImageView from '../components/ImageView';
import { windowHeight } from '../global/Dimensions';
import colors from '../global/colors';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetProjectListApiUrl, ListReportsUrl } from '../restApi/ApiConfig';
const { height, width } = Dimensions.get('window');

const PhotoScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [PhotoList, setPhotoList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingAllProject, setIsFetchingAllProject] = useState(false);
  const [isFetchingReports, setIsFetchingReports] = useState(false);
  const [allProjectList, setAllProjectList] = useState([]);
  const [allReports, setAllReports] = useState([]);
  const [selectedString, setSelectedString] = useState('Photos');

  useEffect(() => {
    PhotoListApi();
    AllProjectList();
    ReportsApi();
  }, [props.route]);

  // ************ Photo Api Integration ************
  const PhotoListApi = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log(value);

    setIsLoading(true);
    axios({
      method: 'get',
      url: GetProjectListApiUrl,
      headers: { token: value },
    })
      .then(async response => {
        if (response.data.responseCode === 200) {
          console.log('====== Photo List Response ======', response);
          setPhotoList(response?.data?.result);
          setIsLoading(false);
        } else {
          alert('Something went wrong.');
          setIsLoading(false);
        }
      })
      .catch(err => console.log('==== Photo List Catch err ====', err));
  };
  const _handleRefresh = () => {
    setIsFetching(false);
    PhotoListApi();
  };

  // ************ AllProjects Api Integration ************
  const AllProjectList = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log(value);

    setIsLoading(true);
    axios({
      method: 'get',
      url: GetProjectListApiUrl,
      headers: { token: value },
    })
      .then(async response => {
        if (response.data.responseCode === 200) {
          console.log('====== AllProject List Response ======', response);
          setAllProjectList(response?.data?.result);
          setIsLoading(false);
        } else {
          alert('Something went wrong.');
          setIsLoading(false);
        }
      })
      .catch(err => console.log('==== AllProject List Catch err ====', err));
  };
  const _handleRefreshAllProject = () => {
    setIsFetchingAllProject(false);
    AllProjectList();
  };

  // ************ Report List Api Integration ************
  const ReportsApi = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log(value);

    setIsLoading(true);
    axios({
      method: 'get',
      url: ListReportsUrl,
      headers: { token: value },
    })
      .then(async response => {
        if (response.data.responseCode === 200) {
          console.log('====== Reports List Response ======', response);
          setAllReports(response?.data?.result);
          setIsLoading(false);
        } else {
          alert('Something went wrong.');
          setIsLoading(false);
        }
      })
      .catch(err => console.log('==== Reports List Catch err ====', err));
  };
  const _handleRefreshReports = () => {
    setIsFetchingReports(false);
    ReportsApi();
  };
  // -=-=-=-= render Items -=-=-=
  const PhotoListRenderItem = item => {
    return (
      <View showsVerticalScrollIndicator={false}>
        <View style={{}}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>
            {item?.item?.address1} {item?.item?.address2}
          </Text>
          <View style={{ marginTop: 5 }}>
            {item?.item?.originalImage.map(data => {
              return (
                <>
                  <View style={{}}>
                    {data?.image ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Image
                          source={{ uri: data?.image }}
                          style={{ height: 55, width: 55, margin: 8 }}
                        />
                      </View>
                    ) : (
                      <ImageView />
                    )}
                  </View>
                </>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  const AllProjectsListRenderItem = item => {
    return (
      <View style={styles.CardMainContainer}>
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
                source={{ uri: item?.item?.originalImage[0]?.image }}
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
            <Text style={{ fontSize: height / 55, color: '#000' }}>
              {item?.item?.address1} {item?.item?.address2}, {item?.item?.city}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const ReportsRenderItem = item => {
    console.log('=== reports rendert =====', item);
    return (
      <View style={styles.CardMainContainer}>
        <View style={styles.CardSubContainer}>
          <View style={styles.imgContainer}>
            {item?.item?.image ? (
              <Image
                style={{
                  height: Platform.OS === 'android' ? 88 : 100,
                  width: 102,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}
                source={{ uri: item?.item?.image }}
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
              {item?.item?.title}
            </Text>
            {/* <Text style={{fontSize: height / 55, color: '#000'}}>
              {item?.item?.address1} {item?.item?.address2}, {item?.item?.city}
            </Text> */}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[globalStyles.container, { padding: 0 }]}>
      <Header
        image={true}
        profileIcon={true}
        headerStyling={{ marginHorizontal: 15, marginTop: 10 }}
      />
      <View style={[globalStyles.container, { alignItems: 'center' }]}>
        {/* ********** Top Tab Bar ************ */}
        <View style={styles.DetailsAndItemActivityContainer}>
          <TouchableOpacity
            onPress={() => {
              setSelectedString('Photos'), PhotoListApi();
            }}>
            <View
              style={[
                styles.DetailsTabContainer,
                {
                  borderBottomWidth: selectedString === 'Photos' ? 3 : 0,
                  borderBottomColor:
                    selectedString === 'Photos' ? '#BF2025' : null,
                },
              ]}>
              <Text
                style={{
                  color: 'black',
                  fontSize: height / 50,
                  marginVertical: 8,
                  fontWeight: '600',
                }}>
                Photos
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSelectedString('AllProjects'), AllProjectList();
            }}>
            <View
              style={[
                styles.DetailsTabContainer,
                {
                  borderBottomWidth: selectedString === 'AllProjects' ? 3 : 0,
                  borderBottomColor:
                    selectedString === 'AllProjects' ? '#BF2025' : null,
                },
              ]}>
              <Text
                style={{
                  color: 'black',
                  fontSize: height / 50,
                  marginVertical: 8,
                  fontWeight: '600',
                }}>
                All Projects
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSelectedString('Reports'), ReportsApi();
            }}>
            <View
              style={[
                styles.DetailsTabContainer,
                {
                  borderBottomWidth: selectedString === 'Reports' ? 3 : 0,
                  borderBottomColor:
                    selectedString === 'Reports' ? '#BF2025' : null,
                },
              ]}>
              <Text
                style={{
                  color: 'black',
                  fontSize: height / 50,
                  marginVertical: 8,
                  fontWeight: '600',
                }}>
                Reports
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {selectedString === 'Photos' ? (
          <View style={[styles.MyBundleListContainer]}>
            <FlatList
              data={PhotoList}
              renderItem={PhotoListRenderItem}
              refreshing={isFetching}
              onRefresh={_handleRefresh}
            />
          </View>
        ) : selectedString === 'AllProjects' ? (
          <View style={[styles.MyBundleListContainer]}>
            <FlatList
              data={allProjectList}
              showsHorizontalScrollIndicator={false}
              renderItem={AllProjectsListRenderItem}
              refreshing={isFetchingAllProject}
              onRefresh={_handleRefreshAllProject}
            />
          </View>
        ) : (
          <View style={[styles.MyBundleListContainer]}>
            <FlatList
              data={allReports}
              showsHorizontalScrollIndicator={false}
              renderItem={ReportsRenderItem}
              refreshing={isFetchingReports}
              onRefresh={_handleRefreshReports}
            />
          </View>
        )}

        <TouchableOpacity
          onPress={() => props.navigation.navigate('CreateProjectScreen')}
          style={{
            marginTop: 10,
            width: '100%',
            height: windowHeight / 16,
            backgroundColor: '#BF2025',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#ffffff',
            }}>
            Create New Project
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  // === card styling ====
  MyBundleListContainer: {
    flex: 1,
    // height: Platform.OS === 'android' ? height * 0.8 : height * 0.78, //0.476
    width: width * 0.9,
    alignItems: 'center',
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
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    // alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  imgContainer: {
    height: height * 0.12,
    width: width * 0.3,
    justifyContent: 'center',
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
});

export default PhotoScreen;
