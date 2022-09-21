import React, { useState, useEffect } from 'react';
import { Dimensions, Image, StyleSheet, View, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('screen');
import RootNavigator from './src/navigation/RootNavigator';

const App = props => {
  const [splasStatus, setSplasStatus] = React.useState(true);

  useEffect(() => {
    if (Platform.OS === 'android') {
      setTimeout(() => {
        setSplasStatus(false);
      }, 3000);
    } else {
      setTimeout(() => { }, 3000);
    }
  }, []);

  const [userAuth, setUserAuth] = useState('');
  useEffect(async () => {
    const userToken = await AsyncStorage.getItem('token');
    setUserAuth(userToken);
    console.log('usertoken ======', userAuth);
  }, []);

  if (splasStatus === true && Platform.OS === 'android') {
    return (
      <>
        <View style={styles.container}>
          <Image
            source={require('./src/assets/logo.png')}
            resizeMode="contain"
            style={{ height: height / 1.4, width: width / 1.2 }}
          />
        </View>
      </>
    );
  }

  return (
    <>
      <StatusBar animated={true} backgroundColor="black" />
      <View style={{ height: '100%', justifyContent: 'center' }}>
        <RootNavigator authFlow={userAuth} />
      </View>
    </>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    height: height * 1,
    width: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
