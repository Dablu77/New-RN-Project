//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  FlatList,
  Platform,
} from 'react-native';
import globalStyles from '../global/globalStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NotificationListApiUrl} from '../restApi/ApiConfig';
import CustomLoader from '../components/CustomLoader/CustomLoader';
const {height, width} = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign';

// create a component
const Notifications = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [NotificationList, setNotificationList] = useState([]);

  useEffect(() => {
    NotificationListApi();
  }, [props.route]);

  // ************ Notification List Api Integration ************
  const NotificationListApi = async () => {
    const value = await AsyncStorage.getItem('token');

    setIsLoading(true);
    axios({
      method: 'get',
      url: NotificationListApiUrl,
      headers: {token: value},
    })
      .then(async response => {
        if (response.data.responseCode === 200) {
          console.log('====== Notification List Response ======', response);
          setNotificationList(response?.data?.result);
          setIsLoading(false);
        } else {
          alert('Something went wrong.');
          setIsLoading(false);
        }
      })
      .catch(err => console.log('==== Notification List Catch err ====', err));
  };

  // *************** FlatList Refreshing Functions ***************
  const NotificationApiRefresh = () => {
    setIsFetching(false);
    NotificationListApi();
  };

  const NotificationListRenderItem = item => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('NotificationDetails', {
            item: item?.item?._id,
          })
        }>
        <View style={styles.NotifyContainer}>
          <Text numberOfLines={3} style={{color: 'black', fontSize: 16}}>
            {item?.item?.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[globalStyles.container, {padding: 10, backgroundColor: 'red'}]}>
      <View style={[globalStyles.container, {padding: 10}]}>
        <View style={{flexDirection: 'row'}}>
          <AntDesign
            name="arrowleft"
            size={25}
            color="black"
            onPress={() => props.navigation.goBack()}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: height * 0.11,
            }}
            onPress={() => NotificationListApi()}>
            Notifications
          </Text>
        </View>
        <View style={{flex: 1, marginTop: 15}}>
          {NotificationList ? (
            <FlatList
              data={NotificationList}
              renderItem={NotificationListRenderItem}
              refreshing={isFetching}
              onRefresh={NotificationApiRefresh}
            />
          ) : (
            <CustomLoader />
          )}
        </View>
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
  NotifyContainer: {
    // height: height * 0.07,
    // width: width * 0.75,
    width: Platform.OS === 'android' ? width * 0.85 : width * 0.88,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 8,
    padding: 10,
    // shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    marginHorizontal: 9,
  },
});

export default Notifications;
