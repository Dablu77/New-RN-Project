//import liraries
import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import ImageView from '../components/ImageView';
import VectorIcon from '../components/VectorIcon';
import globalStyles from '../global/globalStyles';
import Button from '../components/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import {androidCameraPermission} from '../Utils/Permission';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {height, width} = Dimensions.get('window');

// create a component
const CameraScreen = props => {
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
      <View style={globalStyles.container}>
        <Header
          image={false}
          profileIcon={true}
          onPress={() => props.navigation.goBack()}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text style={globalStyles.text}>CameraScreen</Text>
          <VectorIcon
            familyName={'Feather'}
            iconName={'send'}
            iconStyle={{marginTop: 20}}
          />
        </View>
        <Text style={{color: 'black', fontSize: 16}}>Photos</Text>

        <View style={{marginTop: 10}}>
          <ImageView />
        </View>
        <View style={{marginTop: 10}}>
          <ImageView />
        </View>
        <View style={{marginTop: 10}}>
          <ImageView />
        </View>
        <View style={{marginTop: 10}}>
          <ImageView />
        </View>
        <View style={{marginTop: 10}}>
          <ImageView />
        </View>
        <View style={styles.CameraGallaryContainer}>
          <View style={styles.GallaryImg}>
            <View
              style={{
                height: 40,
                width: width * 0.33,
                backgroundColor: '#BF2025',
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: 5,
              }}>
              <TouchableOpacity>
                <AntDesign
                  name="pluscircleo"
                  size={25}
                  color="white"
                  // onPress={() => props.navigation.navigate('ProcessScreen')}
                  onPress={() => onSelectImage()}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Entypo
                  name="camera"
                  size={25}
                  color="white"
                  onPress={() => onSelectImage()}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* <View style={styles.CameraImg}>
            <Entypo
              name="camera"
              size={25}
              color="black"
              onPress={() => props.navigation.navigate('ProcessScreen')}
            />
          </View> */}
          {/* <Button
            buttonTitle="Send selected photos to work"
            onPress={() => {
              props.navigation.navigate('ProcessScreen');
            }}
          /> */}
        </View>
      </View>
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
});

//make this component available to the app
export default CameraScreen;
