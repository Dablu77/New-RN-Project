//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import globalStyles from '../global/globalStyles';
import Header from '../components/Header';
import Button from '../components/Button';
import ImageView from '../components/ImageView';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {height, width} = Dimensions.get;

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];
const ProcessScreen = props => {
  console.log(
    '==== Process screen params =====',
    props?.route?.params?.projectDetails,
  );
  const [projectDetails, setprojectDetails] = useState(
    props?.route?.params?.projectDetails,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [Id, setId] = useState(props?.route?.params?.id);
  const [isFetching, setIsFetching] = useState(false);
  const [ProjectDetails, setProjectDetails] = useState({});
  const [ProjectImage, setProjectImage] = useState([]);

  useEffect(() => {
    ViewProjectDetailsApi();
  }, [props.route]);

  // ************ View Project Details Api Integration ************
  const ViewProjectDetailsApi = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log(value);

    setIsLoading(true);
    axios({
      method: 'get',
      url: `https://server.houszzz.com/api/v1/project/getproject/${Id}`,
    })
      .then(async response => {
        if (response.data.responseCode === 200) {
          console.log('====== View Project Details Response ======', response);
          setProjectDetails(response?.data?.result);
          {
            response?.data?.result?.originalImage.map(data => {
              setProjectImage(data?.image);
            });
          }
          setProjectImage(response?.data?.result?.originalImage);
          setIsLoading(false);
        } else {
          alert('Something went wrong.');
          setIsLoading(false);
        }
      })
      .catch(err =>
        console.log('==== View Project Details Catch err ====', err),
      );
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.container}>
        <Header
          image={false}
          profileIcon={true}
          onPress={() => props.navigation.goBack()}
        />
        <Text style={globalStyles.text}>Proccess Project For Work</Text>
        <View style={{marginTop: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              Project name:
            </Text>
            <Text style={{color: '#7f7f7f', marginLeft: 2}}>
              {ProjectDetails?.projectname || projectDetails?.projectname}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              Selected Images:
            </Text>
            <Text style={{color: '#7f7f7f', marginLeft: 2}}>
              {ProjectDetails?.originalImage?.length ||
                projectDetails?.originalImage?.length}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Location:</Text>
            <Text numberOfLines={1} style={{color: '#7f7f7f', marginLeft: 2}}>
              {ProjectDetails?.address1} {ProjectDetails?.address2}
              {', '}
              {ProjectDetails?.city} || {projectDetails?.address1}{' '}
              {projectDetails?.address2}
              {', '}
              {projectDetails?.city}
            </Text>
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Button
            buttonTitle="Proceed For Pricing"
            onPress={() => {
              props.navigation.navigate('BestPriceScreen', {
                ProjectDetails: props?.route?.params?.projectDetails?._id,
              });
            }}
          />
        </View>
        <Text style={{color: 'black', marginTop: 10, fontSize: 14}}>
          {ProjectDetails?.originalImage?.length ||
          projectDetails?.originalImage?.length
            ? ProjectDetails?.originalImage?.length ||
              projectDetails?.originalImage?.length
            : '0'}{' '}
          Selected Photos
        </Text>

        <View style={{height: '70%'}}>
          {projectDetails?.originalImage?.map(data => {
            return (
              <View>
                <FlatList
                  data={data.image}
                  numColumns={3}
                  renderItem={({item}) => {
                    return (
                      <View style={{}}>
                        <Image
                          source={{uri: data?.image}}
                          style={{height: 100, width: 100, margin: 5}}
                        />
                      </View>
                    );
                  }}
                />
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ProcessScreen;
