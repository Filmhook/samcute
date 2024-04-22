
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

export default function StoryContainer() {
  const navigation = useNavigation();
  const [stories, setStories] = useState([]);
  const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);

  const handleStoryPost = () => {
    setImagePickerModalVisible(true);
  };

  const handleImageOption = async (option) => {
    try {
      if (option === 'camera') {
        const image = await ImagePicker.openCamera({
          cropping: true,
        });
        updateStory(image);
      } else if (option === 'gallery') {
        const image = await ImagePicker.openPicker({
          multiple:true,
          cropping: true,
        });
        updateStory(image);
      } else if (option === 'video') {
        const video = await ImagePicker.openPicker({
          multiple:true,
          mediaType: 'video',
        });
        updateStory(video);
      }
    } catch (error) {
      console.log('Image picker operation canceled or failed:', error);
    } finally {
      setImagePickerModalVisible(false);
    }
  };
  

 const updateStory = (images) => {
    const existingStory = stories.find((story) => story.id === 'unique_id');
    if (existingStory) {
      existingStory.images = [...existingStory.images, ...images.map((image) => ({ path: image.path }))];
      setStories([...stories.filter((story) => story.id !== 'unique_id'), existingStory]);
    } else {
      const newStory = {
        id: 'unique_id',
        images: images.map((image) => ({ path: image.path })),
        name: 'Sharukkhan',
        profession: 'Actor',
      };
      setStories([...stories, newStory]);
    }
  };
 



  const handlePostZoom = () => {
    console.log('clicked');
  };

  
  const renderStoryImages = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Status', { story: item })}
      style={{
        marginLeft: responsiveWidth(2),
        width: responsiveWidth(23),
        height: responsiveHeight(18),
        borderRadius: responsiveWidth(2),
        overflow: 'hidden',
        position: 'relative', // Added for positioning the profile image
      }}>
      {item.images.map((image, index) => (
        <Image
          key={index}
          source={{ uri: image.path }}
          style={{ width: '100%', height: '100%', borderRadius: responsiveWidth(2) }}
          resizeMode="stretch"
        />
      ))}
      {/* <View style={{borderWidth:responsiveWidth(0.4),width: responsiveWidth(5), height: responsiveHeight(3), position: 'absolute',top:responsiveHeight(14.2),}}> */}
      <Image
        source={require('../../Assets/UserProfile_Icons_Fonts/Filmhook_UserProfile.png')}
        style={{ width: '20%', height: '15%', position: 'absolute',top:responsiveHeight(14.5),borderRadius:responsiveHeight(5),  }}
        resizeMode="stretch"
      />
      {/* </View> */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          // backgroundColor: 'rgba(0, 0, 0, 0.5)',
          paddingHorizontal: responsiveWidth(1),
          paddingVertical: responsiveHeight(0.5),
          alignItems: 'center',
        }}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: responsiveFontSize(1.4),
            fontWeight: '600',
            // color: '#FFFFFF',
            color:'black'
          }}>
          {item.name}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: responsiveFontSize(1),
            fontWeight: '600',
            // color: '#FFFFFF',
            color:'black'
          }}>
          {item.profession}
        </Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <>
      <View style={{ padding: responsiveWidth(1.5), flexDirection: 'row', height: responsiveHeight(21) }}>
        <View style={{ borderRightWidth: responsiveWidth(1), borderRightColor: '#D7D7D7' }}>
          <TouchableOpacity
            onPress={handleStoryPost}
            style={{
              width: responsiveWidth(8),
              height: responsiveWidth(8),
              borderWidth: 1,
              borderRadius: responsiveWidth(8),
              top: responsiveHeight(8),
              marginRight: responsiveWidth(1),

            }}>
            <Image
              source={require('../../Assets/UserProfile_Icons_Fonts/Filmhook_UserProfile.png')}
              style={{ width: '95%', height: '95%' }} resizeMode='stretch'
            />
            <View
              style={{
                width: responsiveWidth(5),
                height: responsiveWidth(5),
                borderRadius: responsiveWidth(5),
                left: responsiveWidth(1.3),
                top: responsiveHeight(-1),
                backgroundColor: 'white',
              }}>
              <Image
                source={require('../../Assets/Home_Icon_And_Fonts/plus_icon.png')}
                style={{ width: '100%', height: '100%' }} resizeMode='stretch'
              />
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={stories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderStoryImages}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/* for modal */}
      <Modal
        isVisible={imagePickerModalVisible}
        onBackdropPress={() => setImagePickerModalVisible(false)}>
        <View style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 10 }}>
          <TouchableOpacity style={{ padding: 10 }} onPress={() => handleImageOption('camera')}>
            <Text>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10 }} onPress={() => handleImageOption('gallery')}>
            <Text>Upload your Image</Text>
          </TouchableOpacity>
<TouchableOpacity style={{ padding: 10 }} onPress={() => handleImageOption('video')}>
<Text>Upload your Video</Text>
</TouchableOpacity>

          <TouchableOpacity style={{ padding: 10 }} onPress={() => setImagePickerModalVisible(false)}>
             <Text>Cancel</Text>
        </TouchableOpacity>
        </View>
       </Modal>
    </>
 );
 }
