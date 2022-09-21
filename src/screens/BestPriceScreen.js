import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import VectorIcon from '../components/VectorIcon';
import globalStyles from '../global/globalStyles';
import Button from '../components/Button';
import colors from '../global/colors';
const {height, width} = Dimensions.get;
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AddToCartUrl, ProjectPackageListApiUrl} from '../restApi/ApiConfig';
import CheckBox from '@react-native-community/checkbox';

const BestPriceScreen = props => {
  console.log(
    '===== BestPrice Screen params ======',
    props?.route?.params?.ProjectDetails,
  );
  const [projectId, setProjectId] = useState(
    props?.route?.params?.ProjectDetails?._id,
  );
  const [ids, setIds] = useState(props?.route?.params?.ProjectDetails);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [ProjectPackages, setProjectPackages] = useState([]);
  const [packageId, setPackageId] = useState('');
  console.log('-=-=-=-=-jhgkjhgkhgk=-=-=-', ProjectPackages);

  useEffect(() => {
    ViewPackagesDetailsApi();
  }, [props.route]);

  // ************ View Project Details Api Integration ************
  const ViewPackagesDetailsApi = async () => {
    console.log('======== check =========');
    const value = await AsyncStorage.getItem('token');
    console.log(value);

    setIsLoading(true);
    axios({
      method: 'get',
      url: ProjectPackageListApiUrl,
      headers: {
        token: value,
      },
    })
      .then(async response => {
        if (response.status === 200) {
          console.log('====== View Package Details Response ======', response);
          setProjectPackages(response?.data?.result);
          setIsLoading(false);
        } else {
          alert('Something went wrong.');
          setIsLoading(false);
        }
      })
      .catch(err =>
        console.log('==== View Package Details Catch err ====', err),
      );
    setIsLoading(false);
  };
  const PackageDetailsApiRefresh = () => {
    setIsFetching(false);
    ViewPackagesDetailsApi();
  };

  // ************ Add To cart Api Integration ************
  const AddToCartApi = async () => {
    const value = await AsyncStorage.getItem('token');
    console.log(value);

    const DATA = new FormData();
    DATA.append({
      projectId: projectId || ids,
      packageId: packageId,
    });
    console.log('==== Add Cart Data ====', DATA?._parts[0][0]);

    setIsLoading(true);
    axios({
      method: 'post',
      url: AddToCartUrl,
      data: DATA?._parts[0][0],
      headers: {
        token: value,
      },
    })
      .then(async response => {
        if (response.data.responseCode === 200) {
          console.log('====== AddTo Cart Response ======', response);
          alert(response?.data?.responseMessage);
          props.navigation.navigate('CartScreen');
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch(err => console.log('==== AddTo Cart Catch err ====', err));
  };

  const PackageDetailsRenderItem = (item, index) => {
    return (
      <View style={styles.containerView}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <VectorIcon familyName={'Feather'} iconName={'folder'} />
          <Text
            style={[globalStyles.smallText, {marginLeft: 10, marginTop: 4}]}>
            {item?.item?.imageQuantity} Images
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View
            style={{
              backgroundColor: colors.buttonBackGroundColor,
              justifyContent: 'center',
              borderRadius: 5,
              height: 30,
              marginRight: 15,
            }}>
            <Text
              style={[
                globalStyles.smallText,
                {marginLeft: 5, marginRight: 5, color: 'white'},
              ]}>
              ${item?.item?.amount}.⁰⁰
            </Text>
          </View>
          <CheckBox
            style={styles.checkContainer}
            disabled={false}
            onAnimationType="fill"
            offAnimationType="fade"
            boxType="square"
            onValueChange={() => {
              onChangeValue(item, index), setPackageId(item?.item?._id);
            }}
          />
        </View>
      </View>
    );
  };

  const onChangeValue = (item, index) => {
    const newData = ProjectPackages.map(newItem => {
      if (newItem?._id === item?.item?._id) {
        return {
          ...newItem,
          selected: true,
        };
      }
      return {
        ...newItem,
        selected: false,
      };
    });
    setProjectPackages(newData);
    console.log('===== newData =====', ProjectPackages);
  };

  // const onShowItemSelected = () => {
  //   const listSelected = ProjectPackages.filter(item => item.selected == true);
  //   let contentAlert = '';
  //   listSelected.forEach(item => {
  //     contentAlert = contentAlert + `${item?._id} .`;
  //   });
  // };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.container}>
        <Header
          image={false}
          profileIcon={true}
          onPress={() => props.navigation.goBack()}
        />
        <Text style={globalStyles.text}>Select best valuable price</Text>

        {/* <TouchableOpacity onPress={() => onShowItemSelected()}>
          <Text>Show Selected Item</Text>
        </TouchableOpacity> */}
        <View>
          <FlatList
            data={ProjectPackages}
            renderItem={PackageDetailsRenderItem}
            refreshing={isFetching}
            onRefresh={PackageDetailsApiRefresh}
            keyExtractor={item => `key-${item?.item?._id}`}
          />
        </View>

        <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 30}}>
          {ProjectPackages ? (
            <Button
              buttonTitle="Proceed To Checkout"
              // onPress={() => props.navigation.navigate('CartScreen')}
              onPress={() => AddToCartApi()}
            />
          ) : (
            <Button
              buttonTitle="Proceed To Checkout"
              disabled
              // onPress={() => props.navigation.navigate('CartScreen')}
              // onPress={() => AddToCartApi()}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerView: {
    backgroundColor: '#Eff4ff',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  box: {
    backgroundColor: '#Cbcbcb',
    borderWidth: 0.5,
    height: 30,
    width: 30,
    borderRadius: 5,
  },
  smallBox: {
    backgroundColor: colors.red,
    borderWidth: 0.5,
    height: 20,
    width: 20,
    borderRadius: 5,
    margin: 5,
  },
  checkContainer: {
    width: 20,
    height: 20,
    marginTop: 5,
  },
});

export default BestPriceScreen;
