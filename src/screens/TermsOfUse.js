import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../global/globalStyles';
import CustomLoader from '../components/CustomLoader/CustomLoader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StaticListApiUrl} from '../restApi/ApiConfig';
import globalStyles from '../global/globalStyles';
const {height, width} = Dimensions.get('window');

const TermsOfUse = props => {
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
          setTermsOfUse(response?.data?.result[0]);
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

export default TermsOfUse;
