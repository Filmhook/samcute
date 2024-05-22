import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import privateAPI from '../../api/privateAPI';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FriendStories = () => {
  const [storyData, setStoryData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const id=await AsyncStorage.getItem('userId')
        const response = await privateAPI.get(`user/stories/getUserIdAndName?userId=${id}`);
        if (response.data && Array.isArray(response.data.data)) {
          const stories = response.data.data.map(item => ({
            id: item.userId,
            name: item.userName,
            profilePicUrl: item.profilePicUrl,
            additionalImageUrl: null // Initialize additionalImageUrl to null
          }));
          setStoryData(stories);

          // Fetch additional image URLs for each user
          await Promise.all(
            stories.map(async (story, index) => {
              try {
                const additionalResponse = await privateAPI.get(`/user/stories/getUserStories?userId=${story.id}`);
                if (additionalResponse.data && Array.isArray(additionalResponse.data.data)) {
                  const imageUrl = additionalResponse.data.data[0]?.fileOutputWebModel[0]?.filePath || null; // Get the first image URL or null if not found
                  setStoryData(prevData => {
                    const updatedStories = [...prevData];
                    updatedStories[index].additionalImageUrl = imageUrl;
                    return updatedStories;
                  });
                }
              } catch (error) {
                console.error('Error fetching additional image URL for user:', story.id, error);
              }
            })
          );
        } else {
          console.error('Invalid response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching story data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {storyData.map(item => (
        <View key={item.id} style={styles.friendStoryContainer}>
          {console.log("key id ",item.id)}
          <TouchableOpacity onPress={() =>
                  navigation.navigate('Status')
                  }>
       <View style={styles.additionalImgContainer}>
            {item.additionalImageUrl && ( <Image source={{ uri: item.additionalImageUrl }} style={styles.additionalImg} />
            )}
                {console.log("item.additionalImageUrl ",item.additionalImageUrl)} 
               
          <View style={styles.profileImgContainer}>
            <Image source={{ uri: item.profilePicUrl}} style={styles.profileImg} />
          </View>
          <View style={styles.friendNameContainer}>
            <Text style={styles.friendName}>{item.name}</Text>
          </View>
          </View>
          </TouchableOpacity>
        </View>
      ))}

      {/* {storyData.map(item => (
        <View key={item.id} style={styles.friendStoryContainer}>
          <Image source={{ uri: item.storyImgUrl }} style={styles.storyImg} />
          <View style={styles.profileImgContainer}>
            <Image source={{ uri: item.profileImgUrl }} style={styles.profileImg} />
          </View>
          <View style={styles.friendNameContainer}>
            <Text style={styles.friendName}>{item.name}</Text>
          </View>
          <View style={styles.additionalImgContainer}>
            {item.additionalImageUrl && (
            
              <Image source={{ uri: item.additionalImageUrl }} style={styles.additionalImg} />
            )}

            {console.log("additional imagae url",item.additionalImageUrl)}
          </View>
        </View>
      ))} */}
    </>
  );
}

const styles = StyleSheet.create({
  friendStoryContainer: {
    // borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    marginLeft: 5,
    position: 'relative',

  },
  storyImg: {
    height: responsiveHeight(5.5),
    width: responsiveWidth(27),
    borderRadius: 10,

  },
  profileImg: {
    height: 35,
    width: 35,
    borderRadius: 50,
  
  },
  profileImgContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
    borderWidth: 2,
    borderColor: 'primaryColor',
    borderRadius: 50,
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  friendNameContainer: {
    position: 'absolute',
    left: 8,
    bottom: 8,
  },
  friendName: {
    color: 'white',
    fontSize: 14,
  },
  additionalImgContainer: {
    // marginTop: 10,
    alignItems: 'center',
  },
  additionalImg: {
    height: responsiveHeight(18.5),
    width: responsiveWidth(24),
    borderRadius: 10,
    // backgroundColor:'blue',
  },
});

export default FriendStories;



