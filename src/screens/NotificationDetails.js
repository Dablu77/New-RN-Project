import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
} from 'react-native';
import axios from 'axios';
import Header from '../components/Header';
import globalStyles from '../global/globalStyles';
import CustomLoader from '../components/CustomLoader/CustomLoader';
const {height, width} = Dimensions.get('window');

const NotificationDetails = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(props?.route?.params?.item);
  const [NotificationDetail, setNotificationDetail] = useState({});

  useEffect(() => {
    NotificationDetailsApi();
  }, [props.route]);

  // ************ Notification Details Api Integration ************
  const NotificationDetailsApi = async () => {
    setIsLoading(true);
    axios({
      method: 'post',
      url: `https://server.houszzz.com/api/v1/user/getNotification/${id}`,
    })
      .then(async response => {
        if (response.data.responseCode === 200) {
          console.log('====== Notification Details Response ======', response);
          setNotificationDetail(response?.data?.result);
          setIsLoading(false);
        } else {
          alert('Something went wrong.');
          setIsLoading(false);
        }
      })
      .catch(err =>
        console.log('==== Notification Details Catch err ====', err),
      );
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={[globalStyles.container, {padding: 10}]}>
      <Header
        image={false}
        profileIcon={true}
        onPress={() => props.navigation.goBack()}
        headerView={{marginHorizontal: 15}}
      />
      <View style={styles.MainContainer}>
        {NotificationDetail ? (
          <View style={styles.NotificationCardsContainer}>
            <View style={styles.sectionsContainer}>
              <View style={styles.KeyContainer}>
                <Text style={styles.KeyTxt}>Title :</Text>
              </View>
              <View style={[styles.KeyContainer, {width: width * 0.64}]}>
                <Text style={styles.KeyTxt}>{NotificationDetail?.title}</Text>
              </View>
            </View>

            <View style={styles.sectionsContainer}>
              <View style={styles.KeyContainer}>
                <Text style={styles.KeyTxt}>Details :</Text>
              </View>
              <View
                style={[
                  styles.KeyContainer,
                  {width: width * 0.64, height: height * 0.045},
                ]}>
                <Text style={styles.KeyTxt}>{NotificationDetail?.body}</Text>
              </View>
            </View>

            <View style={styles.sectionsContainer}>
              <View style={styles.KeyContainer}>
                <Text style={styles.KeyTxt}>Notification Type :</Text>
              </View>
              <View style={[styles.KeyContainer, {width: width * 0.64}]}>
                <Text style={[styles.KeyTxt, {marginTop: 5}]}>
                  {NotificationDetail?.notificationType}
                </Text>
              </View>
            </View>

            <View style={styles.sectionsContainer}>
              <View style={styles.KeyContainer}>
                <Text style={styles.KeyTxt}>Address :</Text>
              </View>
              <View style={[styles.KeyContainer, {width: width * 0.64}]}>
                <Text style={[styles.KeyTxt]}>
                  {NotificationDetail?.projectId?.address1}{' '}
                  {NotificationDetail?.projectId?.address2}
                  {', '}
                  {NotificationDetail?.projectId?.city}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <CustomLoader />
        )}
      </View>
    </SafeAreaView>
  );
};

export default NotificationDetails;

const styles = StyleSheet.create({
  MainContainer: {
    // backgroundColor: '#fff',
    alignItems: 'center',
  },
  NotificationCardsContainer: {
    height: height / 4,
    width: width * 0.92,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginVertical: height * 0.03,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  sectionsContainer: {
    width: width * 0.92,
    height: height * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  KeyContainer: {
    width: width * 0.28,
    height: height * 0.055,
  },
  KeyTxt: {
    fontSize: height / 55,
    marginHorizontal: 15,
    color: 'black',
  },
});
