import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const BlockedProfiles = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBlockData = async () => {
      try {
        const userId= await AsyncStorage.getItem('userId');
        const jwt=await AsyncStorage.getItem('jwt')
      //  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyTmFtZSI6Inlhc3dhbnRoc2hhbmthcjI3MDVAZ21haWwuY29tIiwidXNlclR5cGUiOiJJbmR1c3RyeVVzZXIiLCJpYXQiOjE3MTU2MTEzMzAsImV4cCI6MTcxNTYxMjUzMH0.r9HsRlsddNw5t9BoDHXvfyi2oJPrT6dZYNugrnmv_43qD_N8nClOeMILt3EVjEbdDqMx0ApXDOHDkrzaqjWeLQ'; // Replace 'YOUR_BEARER_TOKEN_HERE' with your actual bearer token
        const response = await fetch('http://3.27.162.120:8080/filmhook-0.0.1-SNAPSHOT/block/getAllBlock', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
          },
          body: JSON.stringify({
            blockedBy: userId
          })
        });
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBlockData();
  }, []);

  const unblockUser = async (blockedUserId, blockedBy) => {

    console.log('blockedUserId, blockedBy', blockedUserId)
    try {
   
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyTmFtZSI6Inlhc3dhbnRoc2hhbmthcjI3MDVAZ21haWwuY29tIiwidXNlclR5cGUiOiJJbmR1c3RyeVVzZXIiLCJpYXQiOjE3MTU2MTEzMzAsImV4cCI6MTcxNTYxMjUzMH0.r9HsRlsddNw5t9BoDHXvfyi2oJPrT6dZYNugrnmv_43qD_N8nClOeMILt3EVjEbdDqMx0ApXDOHDkrzaqjWeLQ'; 
      const response = await fetch('http://3.27.162.120:8080/filmhook-0.0.1-SNAPSHOT/block/unBlock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          blockedBy: blockedBy,
          blockedUser: blockedUserId
        })
      });
      // Handle response as needed
      console.log('Unblock response:', response);
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', padding: responsiveWidth(3) }}>
      <Image source={{ uri: item.profilePicUrl }} style={{ width: 50, height: 50, borderRadius: 25, borderColor: 'red', backgroundColor: 'gray' }} />
      <Text style={{ marginLeft: 10, alignSelf: 'center', color: 'black', fontSize: responsiveFontSize(2), fontWeight: '500' }}>{item.userName}</Text>
      <TouchableOpacity onPress={() => unblockUser(item.blockedUser, item.blockedBy)} style={{ marginLeft: 'auto', alignSelf: 'center', padding: 10, backgroundColor: 'blue', borderRadius: 5 }}>
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
        data={data}
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
