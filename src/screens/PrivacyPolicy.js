import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../global/globalStyles';
import CustomLoader from '../components/CustomLoader/CustomLoader';
import axios from 'axios';
import {StaticListApiUrl} from '../restApi/ApiConfig';
import globalStyles from '../global/globalStyles';
const {height, width} = Dimensions.get('window');

const PrivacyPolicy = props => {
  const [loader, setLoader] = useState(false);
  const [PrivacyPolicy, setPrivacyPolicy] = useState([]);

  useEffect(() => {
    StaticApi();
  }, []);

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
          setPrivacyPolicy(response?.data?.result[1]);
          setLoader(false);
        } else {
          alert('Something went wrong.');
          setLoader(false);
        }
      })
      .catch(err => console.log('==== Static Api Catch err ====', err));
  };

  return (
    <SafeAreaView style={[styles.container, {padding: 10}]}>
      <View style={[styles.container, {padding: 10}]}>
        <AntDesign
          name="arrowleft"
          size={25}
          color="#666"
          onPress={() => props.navigation.goBack()}
        />

        {loader === false ? (
          <ScrollView>
            <Text
              style={[
                globalStyles.text,
                {color: '#000', fontSize: height / 35},
              ]}>
              {PrivacyPolicy?.title}
            </Text>
            <Text
              style={[
                styles.smallText,
                {color: '#000', fontSize: height / 50},
              ]}>
              {PrivacyPolicy?.description}
            </Text>
          </ScrollView>
        ) : (
          <CustomLoader />
        )}
      </View>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
