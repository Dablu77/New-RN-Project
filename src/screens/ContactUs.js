import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Header from '../components/Header';
import globalStyles from '../global/globalStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {height, width} = Dimensions.get('window');
import {StaticListApiUrl} from '../restApi/ApiConfig';
import CustomLoader from '../components/CustomLoader/CustomLoader';

const ContactUs = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [TermsOfUse, setTermsOfUse] = useState([]);

  useEffect(() => {
    StaticApi();
  }, [props.route]);

  // ************ Static Api ************
  const StaticApi = async () => {
    setLoader(true);
    axios({
      method: 'get',
      url: StaticListApiUrl,
    })
      .then(async response => {
        if (response?.data?.responseCode === 200) {
          console.log('====== Static Api Response ======', response);
          setTermsOfUse(response?.data?.result[2]);
          setLoader(false);
        } else {
          alert('Something went wrong.');
          setLoader(false);
        }
      })
      .catch(err => console.log('==== Static Api Catch err ====', err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header
          image={false}
          profileIcon={false}
          onPress={() => props.navigation.goBack()}
        />

        {loader === false ? (
          <View>
            <Text
              style={[
                globalStyles.text,
                {color: '#000', fontSize: height / 35},
              ]}>
              {TermsOfUse?.title}
            </Text>
            <Text
              style={[
                styles.smallText,
                {color: '#000', fontSize: height / 50},
              ]}>
              {TermsOfUse?.description}
            </Text>
          </View>
        ) : (
          <CustomLoader />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    padding: 10,
  },
});
