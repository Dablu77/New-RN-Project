//import liraries
import {NavigationContainer} from '@react-navigation/native';
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Platform,
  TextInput,
  ColorPropType,
  Linking,
} from 'react-native';
import Header from '../components/Header';
// import ImageView from '../components/ImageView';
import VectorIcon from '../components/VectorIcon';
import globalStyles from '../global/globalStyles';
import Button from '../components/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {height, width} = Dimensions.get('window');
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImageView from 'react-native-image-view';

// create a component
const ProjectDetails = props => {
  const refRBSheet = useRef();
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);

  console.log('==== Params data ------', props?.route?.params?.id?.item);
  const [projectDetails, setprojectDetails] = useState(
    props?.route?.params?.id?.item,
  );
  const [proectView, setProectView] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrlPath, setImageUrlPath] = useState('');
  const [imageUrlData, setImageUrlData] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [imgIndex, setImgIndex] = useState('');
  // console.log('====== base 64 image ======', imageUrlData);
  const [description, setDescription] = useState('');
  const [chatMsg, setChatMsg] = useState('');
  const [uploadImageId, setUploadImageId] = useState('');

  const [iAgree, setIAgree] = useState(true);
  const toggleSwap = () => {
    setIAgree(false);
  };
  const _toggleSwap = () => {
    setIAgree(true);
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
      UploadProjectImagesApi();
      refRBSheet.current.close();
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
      UploadProjectImagesApi();
      refRBSheet.current.close();
    });
  };

  // ************ Upload Project Image Api Integration ************
  const UploadProjectImagesApi = async imagePath => {
    const value = await AsyncStorage.getItem('token');

    const DATA = {
      _id: projectDetails?._id,
      image: [`data:image/jpeg;base64,${imageUrlData}`],
    };
    console.log('form data', DATA);

    setIsLoading(true);
    axios({
      method: 'post',
      url: 'https://server.houszzz.com/api/v1/project/uploadImageInProjectBase64',
      data: DATA,
      headers: {token: value},
    })
      .then(async response => {
        if (response?.data?.responseCode === 200) {
          console.log('===== Upload Poject Images =====', response);
          // ViewProjectDetailsApi();
          setUploadImageId(response?.data?.result);
          alert(response?.data?.responseMessage);
          setIsLoading(false);
        } else {
          alert('Something went wrong.');
          setIsLoading(false);
        }
      })
      .catch(err => console.log('==== Upload Images Catch err ====', err));
  };

  // ************ View Project Details Api ************
  const ViewProjectDetailsApi = async () => {
    const value = await AsyncStorage.getItem('token');

    setIsLoading(true);
    axios({
      method: 'get',
      url: `https://server.houszzz.com/api/v1/project/getproject/${projectDetails?._id}`,
    })
      .then(async response => {
        if (response?.data?.responseCode === 200) {
          console.log('===== View Poject Details Images =====', response);
          setProectView(response?.data?.result);
          setIsLoading(false);
        } else {
          alert('Something went wrong.');
          setIsLoading(false);
        }
      })
      .catch(err =>
        console.log('==== View Poject Details Catch err ====', err),
      );
  };

  // ************ Add Description onProject Api Integration ************
  const AddDescriptiononProject = async imagePath => {
    const value = await AsyncStorage.getItem('token');

    const DATA = {
      description: description,
    };
    console.log('form data', DATA);

    setIsLoading(true);
    axios({
      method: 'post',
      url: `https://server.houszzz.com/api/v1/project/addDescriptionOnProject/${projectDetails?._id}`,
      data: DATA,
      headers: {token: value},
    })
      .then(async response => {
        if (response?.data?.responseCode === 200) {
          console.log(
            '===== Add Description onProject Response =====',
            response,
          );
          alert(response?.data?.responseMessage);
          setIsLoading(false);
        } else {
          alert('Something went wrong.');
          setIsLoading(false);
        }
      })
      .catch(err =>
        console.log('==== Add Description onProject Catch err ====', err),
      );
  };

  const sendChat = async () => {
    const value = await AsyncStorage.getItem('token');

    const DATA = new FormData();
    DATA.append({
      Comment: chatMsg,
    });
    console.log('form data', DATA?._parts[0][0]);

    setIsLoading(true);
    axios({
      method: 'post',
      url: `https://server.houszzz.com/api/v1/project/commentOnProject/${projectDetails?._id}`,
      data: DATA?._parts[0][0],
      headers: {token: value},
    })
      .then(async response => {
        if (response?.data?.responseCode === 200) {
          console.log('===== Send Chat Images =====', response);
          alert(response?.data?.responseMessage);
          setIsLoading(false);
        } else {
          alert('Something went wrong.');
          setIsLoading(false);
        }
      })
      .catch(err => console.log('==== Send Chat Catch err ====', err));
  };

  return (
    <SafeAreaView style={[globalStyles.container, {padding: 0}]}>
      <Header
        image={false}
        profileIcon={true}
        onPress={() => props.navigation.goBack()}
        headerView={{marginHorizontal: 15, marginVertical: 5}}
      />
      <View
        style={[globalStyles.container, {padding: 10, alignItems: 'center'}]}>
        {/* ********** Details ********** */}
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              height: height * 0.15,
              width: width * 0.8,
              justifyContent: 'center',
              borderBottomWidth: 0.5,
              borderColor: 'grey',
            }}>
            <Text
              style={{
                fontSize: height / 35,
                fontWeight: '700',
                color: 'black',
              }}>
              {projectDetails?.projectname}
            </Text>

            {/* ********** Add Description Container ********** */}
            <TouchableOpacity
              onPress={() => (iAgree ? toggleSwap() : _toggleSwap())}>
              {iAgree ? (
                <Text
                  style={{
                    fontSize: height / 55,
                    marginVertical: 2,
                    color: 'black',
                  }}>
                  Add Description
                </Text>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <TextInput
                    placeholder="describe here..."
                    placeholderTextColor={'#000'}
                    numberOfLines={2}
                    style={{
                      height: 35,
                      width: width * 0.6,
                      borderWidth: 0.5,
                      borderColor: 'grey',
                      borderRadius: 7,
                      padding: 8,
                    }}
                    onChangeText={txt => setDescription(txt)}
                  />
                  <TouchableOpacity>
                    <VectorIcon
                      familyName={'Feather'}
                      size={22}
                      iconName={'send'}
                      iconStyle={{marginTop: 5, marginLeft: 8}}
                      onPress={() => {
                        AddDescriptiononProject(), setDescription(null);
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>

            {/* ********** Location Container ********** */}
            <View style={{flexDirection: 'row', marginVertical: 2}}>
              <Text
                style={{
                  fontSize: height / 55,
                  fontWeight: '600',
                  color: 'black',
                }}>
                Location :
              </Text>
              <Text
                numberOfLines={2}
                style={{fontSize: height / 55, color: 'black'}}>
                {projectDetails?.address1} {projectDetails?.address2}
              </Text>
            </View>

            {/* ********** Date Container ********** */}
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: height / 55,
                  fontWeight: '600',
                  color: 'black',
                }}>
                Date:
              </Text>
              <Text style={{fontSize: height / 55, color: 'black'}}>
                {moment(projectDetails?.createdAt).format('DD-MM-YYYY')}
              </Text>
            </View>
          </View>

          {/* *********** Camera Icon Container ********** */}
          <View
            style={{
              height: height * 0.15,
              width: width * 0.12,
              borderBottomWidth: 0.5,
              borderColor: 'grey',
            }}>
            <TouchableOpacity>
              <Entypo
                name="camera"
                size={25}
                color="black"
                onPress={() => refRBSheet.current.open()}
                style={{
                  marginVertical: height * 0.02,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* ********** Photo and Send Container ********** */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            width: width * 0.9,
          }}>
          <Text style={globalStyles.text}>Photo</Text>
          <VectorIcon
            familyName={'Feather'}
            iconName={'send'}
            iconStyle={{marginTop: 20}}
            onPress={() =>
              props.navigation.navigate('ProcessScreen', {
                projectDetails: projectDetails,
              })
            }
          />
        </View>

        {/* ********** Images Ontainer */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            height: height * 0.47,
            width: width * 0.9,
            flexDirection: 'row',
          }}>
          {(uploadImageId?.originalImage || projectDetails?.originalImage)?.map(
            (data, index) => {
              return (
                <View style={{}}>
                  <View
                    style={{
                      margin: 5,
                      height: 100,
                      width: 115,
                    }}>
                    {!isSelected ? (
                      <TouchableOpacity
                        onPress={(item, data) => {
                          alert(index);
                        }}>
                        <Image
                          source={{uri: data?.image}}
                          style={{height: 100, width: 100}}
                        />
                        {/* <Text style={{fontWeight: 'bold'}}>$$</Text> */}
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={(item, data) => {
                          // alert(item);
                          index.push;
                          console.log(index);
                        }}>
                        <Image
                          source={{uri: data?.image}}
                          style={{height: 100, width: 100}}
                        />
                        {/* <Text style={{fontWeight: 'bold'}}>@@</Text> */}
                      </TouchableOpacity>
                    )}
                    {/* {isSelected ? (
                      <TouchableOpacity
                        onPress={(item, data) => {
                          // alert(item);
                          index.push
                          console.log(index);
                        }}>
                        <Image
                          source={{uri: data?.image}}
                          style={{height: 100, width: 100}}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={item => {
                          alert(index);
                        }}>
                        <Image
                          source={{uri: data?.image}}
                          style={{height: 100, width: 120}}
                        />
                      </TouchableOpacity>
                    )} */}
                  </View>
                </View>
              );
            },
          )}
          {/* <View
            style={{
              margin: 5,
              flexDirection: 'row',
              height: 100,
              width: 115,
            }}>
            <Image source={imageUrlPath} style={{height: 100, width: 120}} />
          </View> */}
        </ScrollView>

        <View style={styles.CameraGallaryContainer}></View>

        {/* ********** Chat Container ********** */}
        <View style={styles.ChatContainer}>
          <View
            onPress={() => props.navigation.navigate('CommentsScreen')}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Feather name="user" size={25} color="#666" />
            <TextInput
              placeholder="Tap To Start Conversation"
              placeholderTextColor="#000"
              editable={false}
              onChangeText={txt => setChatMsg(txt)}
              style={{color: '#000', fontSize: height / 55, marginLeft: 10}}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              // sendChat()
              props.navigation.navigate('CommentsScreen', {
                ChatId: projectDetails?._id,
              })
            }>
            <Entypo name="chat" size={25} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ********** Bottom Sheet to Upload *********** */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={350}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          },
        }}>
        <View style={styles.panel}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.panelTitle}>Upload Photo</Text>
            <Text style={styles.panelSubtitle}>Choose you profile picture</Text>
          </View>

          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => onCamera()}>
            <Text style={styles.panelButtonTitle}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => onGallary()}>
            <Text style={styles.panelButtonTitle}>Choose from libray</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => refRBSheet.current.close()}>
            <Text style={styles.panelButtonTitle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  CameraGallaryContainer: {
    height: height * 0.07,
    width: width * 0.84,
    justifyContent: 'space-between',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  GallaryImg: {
    height: height * 0.07,
    width: width * 0.84, // 0.35
    justifyContent: 'center',
    alignItems: 'center',
  },
  CameraImg: {
    height: height * 0.07,
    width: width * 0.42,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  ChatContainer: {
    height: 45,
    width: width * 0.92,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // -=-=- Bottom Sheet Styling -=-=-
  header: {
    backgroundColor: 'white',
    shadowColor: '#fff',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#fff',
    shadowRadius: 3,
  },
  panelTitle: {
    fontSize: height / 30,
    height: 35,
    fontWeight: '500',
  },
  panelSubtitle: {
    fontSize: height / 55,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#BF2025',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

//make this component available to the app
export default ProjectDetails;
