import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import privateAPI from '../../api/privateAPI';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FriendStories = () => {
  const [storyData, setStoryData] = useState([]);
  const navigation = useNavigation();

  const processProfessions = (professions) => {
    if (!professions || !Array.isArray(professions)) {
      return '';
    }
    return professions.length > 1 ? `${professions[0]}...` : professions[0];
  };

  const formatName = (name) => {
    if (!name) return '';
    return name.length > 10 ? `${name.substring(0, 10)}...` : name;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        const response = await privateAPI.get(`user/stories/getUserIdAndName?userId=${id}`);
        if (response.data && Array.isArray(response.data.data)) {
          const stories = response.data.data.map(item => ({
            id: item.userId,
            name: item.userName,
            profilePicUrl: item.profilePicUrl,
            additionalImageUrl: null,
            professions: processProfessions(item.professionName)
          }));
          setStoryData(stories);

          await Promise.all(
            stories.map(async (story, index) => {
              try {
                const additionalResponse = await privateAPI.get(`/user/stories/getUserStories?userId=${story.id}`);
                if (additionalResponse.data && Array.isArray(additionalResponse.data.data)) {
                  const imageUrl = additionalResponse.data.data[0]?.fileOutputWebModel[0]?.filePath || null;
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
          <TouchableOpacity onPress={() => navigation.navigate('Status')}>
            <View style={styles.additionalImgContainer}>
              {item.additionalImageUrl && (
                <Image source={{ uri: item.additionalImageUrl }} style={styles.additionalImg} />
              )}
            </View>
            <View style={styles.profileImgContainer}>
              <Image source={{ uri: item.profilePicUrl }} style={styles.profileImg} />
            </View>
            <View style={styles.friendNameContainer}>
              <Text style={styles.friendName}>{formatName(item.name)}</Text>
              <View style={styles.roleContainer}>
                <Text style={styles.roleText}>{item.professions}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  friendStoryContainer: {
    borderColor: 'lightgrey',
    borderRadius: 10,
    marginLeft: 5,
    position: 'relative',
    padding: responsiveWidth(1),
  },
  profileImg: {
    height: 30,
    width: 30,
    borderRadius: 50,
  },
  profileImgContainer: {
    position: 'absolute',
    top: responsiveHeight(12.4),
    left: 5,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 50,
    height: 36,
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendNameContainer: {
    position: 'absolute',
    left: responsiveWidth(9),
    width: '70%',
    padding: 10,
    top: responsiveHeight(11.5),
  },
  friendName: {
    color: 'white',
    fontSize: responsiveFontSize(1.3),
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  additionalImgContainer: {
    alignItems: 'center',
  },
  additionalImg: {
    height: responsiveHeight(17),
    width: responsiveWidth(28),
    borderRadius: 10,
  },
  roleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '70%',
    top: responsiveHeight(3),
    left: responsiveWidth(2),
  },
  roleText: {
    color: 'white',
    fontSize: responsiveFontSize(0.8),
    fontWeight: '900',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
});

export default FriendStories;
