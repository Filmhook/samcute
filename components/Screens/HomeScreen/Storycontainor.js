import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import privateAPI from '../../api/privateAPI';

export default function StoryContainer() {
  const navigation = useNavigation();
  const [stories, setStories] = useState([]);
  const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const handleStoryPost = () => {
    setImagePickerModalVisible(true);
  };

  const handleImageOption = async (option) => {
    try {
      let image = null;
      if (option === 'camera') {
        image = await ImagePicker.openCamera({ cropping: true });
      } else if (option === 'gallery') {
        image = await ImagePicker.openPicker({ cropping: true, multiple: true });
      }

      const formatedImg = image?.map(im => {
        return { uri: im.path, type: im.mime, name: im.path.split('/').pop() }
      });
      console.log(`Select Story Images: ${JSON.stringify(formatedImg)}`);

      // Move the uploadStory function call here
      uploadStory(formatedImg);
    } catch (error) {
      console.log('Image picker operation canceled or failed:', error);
    } finally {
      setImagePickerModalVisible(false);
    }
  };

  const uploadStory = async (formatedMedia) => {
    console.log(`Upload Story Media - ${JSON.stringify(formatedMedia)}`);
    try {
      if (formatedMedia?.length === 0) {
        Alert.alert('Please select an image to upload.');
        return;
      }

      const id = await AsyncStorage.getItem('userId');

      const myHeaders = new Headers();
      const jwt = await AsyncStorage.getItem("jwt");
      myHeaders.append("Authorization", "Bearer " + jwt);
      const formData = new FormData();
      formData.append('userId', id);
      formData.append('type', 'IMG');
      formData.append('description', 'Welcome to my world');
      formatedMedia?.forEach((si, ind) => {
        formData.append(`fileInputWebModel.files[${ind}]`, si);
      });

      console.log(`Data posted`, formData);

      const response = await fetch('https://filmhook.annularprojects.com/filmhook-0.1/user/stories/uploadStory', {
        method: 'POST',
        body: formData,
        headers: myHeaders
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 1) {
          Alert.alert('Posted');
        } else {
          console.log(`STORY FAILED 111 - ${data}`);
          // Handle unsuccessful response
        }
      } else {
        // Handle HTTP error
        console.log(`STORY FAILED - ${JSON.stringify(response)}`);
        Alert.alert('Posted Error', 'Failed to post media.');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      Alert.alert('Upload failed. Please try again.');
    }
  };

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const jwt = await AsyncStorage.getItem('jwt');
        const id = await AsyncStorage.getItem('userId');

        const myHeaders = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwt
        };

        const requestData = {
          userId: id
        };

        const response = await privateAPI.post('user/getProfilePic', requestData, { headers: myHeaders });

        const data = response.data; // Extract response data

        if (data.status === 1) {
          const profilePicUrl = data.data.filePath; // Extract filePath from response
          setImageURL(profilePicUrl); // Update state with profile picture URL
          console.log('Profile pic found successfully:', profilePicUrl);
        } else {
          throw new Error('Failed to fetch profile picture');
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };

    fetchProfilePicture();
  }, []);

  return (
    <>
      <View style={{ padding: responsiveWidth(1.5), flexDirection: 'row', height: responsiveHeight(15) }}>
        <View >
        {/* style={{ borderRightWidth: responsiveWidth(1), borderRightColor: '#D7D7D7' }} */}
          <TouchableOpacity
            // onPress={() => navigation.navigate('Status')}
            style={{
              marginLeft: responsiveWidth(2),
              width: responsiveWidth(13),
              height: responsiveHeight(7),
              borderRadius: responsiveWidth(5),
              overflow: 'hidden',
              position: 'relative',
              right: responsiveWidth(3),
              top: responsiveHeight(5)
            }}
          >
            {profileImage ? (
              <Image
                source={{ uri: imageURL }}
                style={{ width: '100%', height: '100%' }}
                resizeMode='stretch'
              />
            ) : (
              <Image
                source={{ uri: imageURL }}
                style={{ width: '100%', height: '100%' }}
                resizeMode='stretch'
              />
            )}
           
          </TouchableOpacity>
          
          <View>
          <TouchableOpacity
              onPress={handleStoryPost}
              style={{
                width: responsiveWidth(6),
                height: responsiveWidth(6),
                borderRadius: responsiveWidth(2.5),
                backgroundColor: 'white',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                top:responsiveHeight(3)
              }}  
            >
              <Image
                source={require('../../Assets/Home_Icon_And_Fonts/plus_icon.png')}
                style={{ width: '100%', height: '100%' }}
                resizeMode='stretch'
              />
            </TouchableOpacity>
          </View>
        
        </View>
        <TouchableOpacity>
          <Image
            source={require('../../Assets/app_logo/salman-Khan-header-1.jpg')}
            style={{ width: '20%', height: '15%', borderRadius: responsiveHeight(5) }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <Modal isVisible={imagePickerModalVisible} onBackdropPress={() => setImagePickerModalVisible(false)}>
          <View style={{ backgroundColor: '#ffffff', padding: responsiveWidth(2), borderRadius: responsiveWidth(2) }}>
            <TouchableOpacity style={{ padding: responsiveWidth(2) }} onPress={() => handleImageOption('camera')}>
              <Text>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: responsiveWidth(2) }} onPress={() => handleImageOption('gallery')}>
              <Text>Upload your Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: responsiveWidth(2) }} onPress={() => setImagePickerModalVisible(false)}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </>
  );
}