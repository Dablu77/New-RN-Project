import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
const {height, width} = Dimensions.get('window');

const CommentsScreen = props => {
  const [chatId, setChatId] = useState(props?.route?.params?.ChatId);
  const [isLoading, setIsLoading] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [chatMsg, setChatMsg] = useState('');

  useEffect(() => {
    if (chatMsg) {
      sendChat();
    }
  }, [props.route]);

  // *************** Comments Api ***************
  const sendChat = async () => {
    const value = await AsyncStorage.getItem('token');

    const DATA = new FormData();
    DATA.append({
      Comment: chatMsg,
    });
    console.log('form data', DATA?._parts[0][0]);

    setIsLoading(true);
    axios({
      method: 'post',
      url: `https://server.houszzz.com/api/v1/project/commentOnProject/${chatId}`,
      data: DATA?._parts[0][0],
      headers: {token: value},
    })
      .then(async response => {
        if (response?.data?.responseCode === 200) {
          console.log('===== Send Chat Images =====', response);
          setChatList(response?.data?.result?.Comment);
          //   alert(response?.data?.responseMessage);
          setIsLoading(false);
        } else {
          alert('Something went wrong.');
          setIsLoading(false);
        }
      })
      .catch(err => console.log('==== Send Chat Catch err ====', err));
  };

  // *************** FlatList Refreshing Functions ***************
  const ChatRefreshApiCal = () => {
    setIsFetching(false);
    sendChat();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.ChatListContainer}>
        <View style={styles.HeaderContainer}>
          <AntDesign
            name="arrowleft"
            size={25}
            color="black"
            onPress={() => props.navigation.goBack()}
          />
          <Feather
            name="user"
            size={25}
            color="#000"
            onPress={() => props.navigation.goBack()}
          />
        </View>

        <FlatList
          data={chatList}
          refreshing={isFetching}
          onRefresh={ChatRefreshApiCal}
          renderItem={({item}) => {
            return (
              <View style={styles.ChatCard}>
                <View style={styles.BackIconContainer}>
                  <Feather name="user" size={25} color="#666" />
                </View>
                <View style={styles.MsgTxtContainer}>
                  <Text style={styles.MsgTxt}>{item?.Comment}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>

      <View style={styles.ChatContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Feather name="user" size={25} color="#666" />
          <TextInput
            placeholder="Tap To Start Conversation"
            placeholderTextColor="#000"
            onChangeText={txt => setChatMsg(txt)}
            style={{color: '#000', fontSize: height / 55, marginLeft: 10}}
          />
        </View>
        <TouchableOpacity onPress={() => sendChat()}>
          <Entypo name="chat" size={25} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    // height: height * 1,
    // width: width * 1,
    flex: 1,
    alignItems: 'center',
  },
  HeaderContainer: {
    width: width * 0.94,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ChatListContainer: {
    height: height * 0.9,
    width: width * 1,
    alignItems: 'center',
  },
  ChatContainer: {
    height: 45,
    width: width * 0.92,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 0,
    position: 'absolute',
  },
  ChatCard: {
    height: 40,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: 'white',
    // shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    marginHorizontal: 9,
  },
  BackIconContainer: {
    height: 35,
    width: width * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MsgTxtContainer: {
    height: 35,
    width: width * 0.75,
    justifyContent: 'center',
  },
  MsgTxt: {
    fontSize: height / 50,
    color: 'black',
    marginLeft: height * 0.02,
  },
});
