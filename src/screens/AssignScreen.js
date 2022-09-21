//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Alert,
  Image,
} from 'react-native';
import Header from '../components/Header';
import globalStyles from '../global/globalStyles';
import Button from '../components/Button';
import {windowHeight, windowWidth} from '../global/Dimensions';
import VectorIcon from '../components/VectorIcon';
import ImageView from '../components/ImageView';
import colors from '../global/colors';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {height, width} = Dimensions.get('window');
import ImagePicker from 'react-native-image-crop-picker';
import {androidCameraPermission} from '../Utils/Permission';

const AssignScreen = props => {
  console.log('----- Image Id -----', props?.route?.params?._id);
  const [_id, set_Id] = useState(props?.route?.params?._id);
  const [isLoading, setIsLoading] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [PhotoList, setPhotoList] = useState([]);
  const [imageUrlPath, setImageUrlPath] = useState('');
  const [imageUrlData, setImageUrlData] = useState('');
  // console.log('====== base 64 image ======', imageUrlData);

  // ************* On Select Image Picker *************
  const onSelectImage = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Upload Photos', 'Choose an options', [
        {text: 'Camera', onPress: onCamera},
        {text: 'Gallary', onPress: onGallary},
        {text: 'Cancel', onPress: () => {}},
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
      UploadProjectImagesApi();
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
    });
  };

  // ************ Upload Project Image Api Integration ************
  const UploadProjectImagesApi = async imagePath => {
    const value = await AsyncStorage.getItem('token');

    const DATA = {
      _id: _id,
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
          props.navigation.navigate('BottomTab', {
            initialRouteName: 'ProfileScreen',
          });
          // setCreatedProjectDetails(response?.data?.result?_id) // Old Code
          alert(response?.data?.responseMessage);
          setIsLoading(false);
        } else {
          alert('Something went wrong.');
          setIsLoading(false);
        }
      })
      .catch(err => console.log('==== Upload Images Catch err ====', err));
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <KeyboardAvoidingView enabled style={globalStyles.container}>
        <Header
          image={false}
          profileIcon={true}
          onPress={() => props.navigation.goBack()}
        />
        <Text style={globalStyles.text}>Assign Address Job Name</Text>
        <View style={globalStyles.inputContainer}>
          <TextInput
            value={projectName}
            numberOfLines={1}
            placeholder="Enter Project Name"
            placeholderTextColor="#666"
            style={[globalStyles.input, {marginLeft: 10}]}
            onChangeText={txt => setProjectName(txt)}
          />
        </View>
        <View style={{marginTop: -8}}>
          <Button
            buttonTitle="Next to Address/Location"
            onPress={() =>
              // props.navigation.navigate('CreateProjectScreen', {
              //   projectName: projectName,
              // })
              props.navigation.navigate('BottomTab', {
                // initialRouteName: 'ProfileScreen',
              })
            }
          />
        </View>
        <Text style={{color: 'black', marginTop: 15, fontSize: 14}}>
          Selected Photos
        </Text>
        <View style={{marginTop: 5}}>
          {/* <ImageView /> */}
          <Image
            source={{uri: imageUrlPath}}
            style={{
              height: 172,
              width: width * 0.88,
            }}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 30}}>
          <TouchableOpacity
            onPress={() => onSelectImage()}
            style={[styles.buttonContainer, {}]}>
            <View style={styles.CameraIcon}>
              <VectorIcon
                familyName={'Feather'}
                iconName={'camera'}
                iconStyle={{
                  color: colors.buttonBackGroundColor,
                  marginLeft: 1.5,
                }}
                size={22}
              />
            </View>
            <Text
              style={[
                styles.buttonText,
                {
                  marginLeft: windowWidth / 5,
                  // marginLeft: windowWidth / 8
                },
              ]}>
              Take More Photos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onSelectImage()}
            // onPress={() => UploadProjectImagesApi()}
            style={[
              styles.buttonContainer,
              {backgroundColor: 'white', borderWidth: 1},
            ]}>
            <View style={styles.ImgIcon}>
              <VectorIcon
                familyName={'Feather'}
                iconName={'image'}
                iconStyle={{
                  color: 'black',
                  marginLeft: 1.5,
                  marginTop: 1,
                }}
                size={22}
              />
            </View>

            <Text
              style={[
                styles.buttonText,
                {
                  color: 'black',
                  // marginLeft: windowWidth / 6.5,
                  marginLeft: windowWidth / 15,
                },
              ]}>
              Upload photos from gallery
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 16,
    // backgroundColor: colors.buttonBackGroundColor,
    backgroundColor: '#BF2025',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  CameraIcon: {
    backgroundColor: 'white',
    borderRadius: 3,
    width: 25,
    height: 25,
    justifyContent: 'center',
  },
  ImgIcon: {
    backgroundColor: '#ebebeb',
    borderRadius: 3,
    width: 25,
    height: 25,
  },
});

export default AssignScreen;
