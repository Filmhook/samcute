import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import axios from 'axios';
import privateAPI from '../api/privateAPI';

const BlockedProfiles = () => {
  const [blockedList, setBlockedList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userId=await AsyncStorage.getItem('id')
    const jwt =await AsyncStorage.getItem('jwt')
    console.log('idblack',userId )
    const url = 'http://3.27.207.83:8080/filmhook-0.0.1-SNAPSHOT/block/getAllBlock';
    const token = 'your_token_here';
    const requestData = {
      blockedBy: userId
    };

    try {
      const response = await privateAPI.post('/block/getAllBlock', requestData, );

      setBlockedList(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUnblock = async (blockedUser, blockedby) => {
    const url = 'http://3.27.207.83:8080/filmhook-0.0.1-SNAPSHOT/block/unBlock';
    const token = 'your_token_here';
    const jwt =await AsyncStorage.getItem('jwt')
    try {
      const response = await privateAPI.post('/block/unBlock', {
        blockedBy: blockedby,
        blockedUser: blockedUser
      }, );

      console.log(response.data);

      // After unblocking, fetch the updated list
      fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', padding: responsiveWidth(3) }}>
      <Image source={{ uri: item.blockedUserProfilePicUrl }} style={{ width: 50, height: 50, borderRadius: 25, borderColor: 'red', backgroundColor: 'gray' }} />
      <Text style={{ marginLeft: 10, alignSelf: 'center', color: 'black', fontSize: responsiveFontSize(2), fontWeight: '500' }}>{item.blockedUserName}</Text>
      <TouchableOpacity onPress={() => handleUnblock(item.blockedUser, item.blockedBy)} style={{ marginLeft: 'auto', alignSelf: 'center', padding: 10, backgroundColor: 'blue', borderRadius: 5 }}>
        <Text style={{ color: 'white' }}>Unblock</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={styleBlock.headlineContainer}>
        <Text style={styleBlock.headline}>Blocked Profile</Text>
      </View>
      <FlatList
        data={blockedList}
        renderItem={renderItem}
        keyExtractor={(item) => item.blockUserId}
      />
    </View>
  );
};

const styleBlock = StyleSheet.create(
  {
    headlineContainer: {
      margin: responsiveHeight(1),
      alignItems: 'center',
      padding: responsiveWidth(2),

    },
    headline: {
      fontSize: responsiveFontSize(2.5),
      color: 'black',
      fontWeight: '500'

    }
  }
)

export default BlockedProfiles;
