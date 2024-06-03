import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, } from 'react-native';

import { useNavigation } from "@react-navigation/native";
import Post_input from './homepage_functions/postinput';
import Handle_img_picker from './homepage_functions/handle_img_picker';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import privateAPI from '../../api/privateAPI';



export default function StatusPost() {
  const navigation = useNavigation();
  const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // State to store selected image URI

  const handleAddStory = () => {
    setImagePickerModalVisible(true);
  };

  const handleImageOption = async (option) => {
    try {
      let image;
      if (option === 'camera') {
        image = await ImagePicker.openCamera({
          multiple: true,
          cropping: true,
        });
      } else if (option === 'gallery') {
        image = await ImagePicker.openPicker({
          cropping: true,
          multiple: true,
        });
      }

      // Set the selected image in state
      setSelectedImage(image.path);

    } catch (error) {
      console.log('Image picker operation canceled or failed:', error);
    } finally {
      setImagePickerModalVisible(false);
    }
  };
  // const handleAddStory = () => {
  //   // Implement logic to add a story
  //   console.log('Add Story');
  // };
  //====== for Link icon (link post) ==========
  const [visible, setVisible] = useState(false);
  const [linkstory, setLinkstory] = useState('');
  const [link, setLink] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [linkVisibility, setLinkVisibility] = useState('public');
  const [filePath, setFilePath] = useState('');


  const handleFocus = () => {
    setVisible(!visible);
  };

  const handlePost = () => {

    const isValidLink = (text) => {
      // Use a regular expression to check if the text is a valid link
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      return urlRegex.test(text);
    };

    const trimmedPost = linkstory.trim();

    // Validate if the entered text is a valid link
    if (!isValidLink(trimmedPost)) {
      alert('Please enter a valid link.');
      return;
    }
    console.log(trimmedPost)

    setLink(trimmedPost);
    setLinkstory('');
    handleLinkPost()

    // Close the modal
    setVisible(!visible);
  };
  const handleLinkPost = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');

      const response = await privateAPI.post(`user/post/addLink`, {
        createdBy: userId,
        links: link
      });
      Alert.alert("ok", 'Link posted successfully');
      console.log("link posted successfully", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const showDropdown = () => {
    setIsDropdownVisible(true);
  };

  const hideDropdown = () => {
    setIsDropdownVisible(false);
  };

  const selectVisibility = (value) => {
    setLinkVisibility(value);
    hideDropdown();
  };

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity onPress={() => selectVisibility(item.value)} style={{ padding: 10 }}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  //====== for Link icon (link post) ==========
  //=====
  const handleGoLive = () => {
    // Implement logic to go live
    navigation.navigate('GoLive')
  };

  const handleAddLink = () => {
    // Implement logic to add a link
    console.log('Add Link');
  };
  const handlePromote = () => {
    // Implement logic to add a link
    navigation.navigate('Promote')
  };
  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const id = userId
        console.log("idddddd", id)


        const requestData = {
          userId: id
        };

        const response = await privateAPI.post('user/getProfilePic', requestData);

        const data = response.data; // Extract response data

        if (data.status === 1) {
          const profilePicUrl = data.data.filePath; // Extract filePath from response
          setFilePath(profilePicUrl); // Update state with profile picture URL
          console.log('Profile pic found successfully:', data);
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
      <View>
        <View style={{ flexDirection: 'row', padding: responsiveWidth(2), }}>
          {/* User Profile Section */}
          <TouchableOpacity style={{ marginLeft: responsiveWidth(0), width: responsiveWidth(12.5), height: responsiveHeight(6), borderWidth: responsiveWidth(0.2), borderRadius: responsiveWidth(10), backgroundColor: "grey" }} onPress={() => navigation.navigate('profilepage')}>
            <Image source={{ uri: filePath }} style={{ width: '100%', height: '100%', borderRadius: 50, }} resizeMode='stretch' />
          </TouchableOpacity>
          <View style={{ width: responsiveWidth(7.5), height: responsiveHeight(2), borderRadius: responsiveWidth(2), top: responsiveHeight(4.5), left: responsiveWidth(-10), backgroundColor: "#000000", }}>
            <Text
              style={{ color: "#ffffff", fontSize: responsiveFontSize(1.2), left: responsiveWidth(1) }}>9.4</Text>
            <View
              style={{ width: responsiveWidth(3), height: responsiveHeight(1.5), left: responsiveWidth(4.4), top: responsiveHeight(-1.6) }}>
              <Image source={require('../../Assets/Home_Icon_And_Fonts/star_icon.png')}
                style={{ width: "100%", height: "100%" }} resizeMode='stretch' />
            </View>
          </View>

          {/* for post input component */}
          <Post_input />
          {/* for post input component */}

          {/* for image post component */}
          <Handle_img_picker />
          {/* for image post component */}
        </View>
        {/* this modal for type post and post cancel icon */}
        <Modal
          isVisible={visible}
          onBackdropPress={() => setVisible(false)}
          backdropTransitionInTiming={500}
          //backdropTransitionOutTiming={0}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          backdropOpacity={0.5}
        >
          <View style={{ backgroundColor: '#ffffff', height: responsiveHeight(25), borderRadius: responsiveWidth(3), width: responsiveWidth(85), marginLeft: responsiveWidth(3), alignItems: 'center' }}>
            <View style={{ alignItems: 'center', marginTop: responsiveHeight(2) }}>
              <TextInput
                value={linkstory}
                placeholder="Add Your Link"
                color='black'
                placeholderTextColor={'black'}
                multiline={true}
                onChangeText={(e) => setLinkstory(e)}
                style={{ borderWidth: responsiveWidth(0.3), width: responsiveWidth(70), borderRadius: responsiveWidth(3), height: responsiveHeight(15), overflow: 'scroll' }}
              />
            </View>
            <View style={{ width: responsiveWidth(75), marginTop: responsiveHeight(2), flexDirection: 'row', justifyContent: 'space-around', }}>
              <TouchableOpacity
                onPress={() => setVisible(!visible)}
                style={{ width: responsiveWidth(18), height: responsiveHeight(3.8), backgroundColor: '#000000', borderRadius: responsiveWidth(2), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#ffffff', fontWeight: 600 }}>Cancel</Text>
              </TouchableOpacity>
              {/* Custom dropdown for post visibility */}
              <TouchableOpacity
                onPress={isDropdownVisible ? hideDropdown : showDropdown}
                style={{ height: responsiveHeight(3.8), width: responsiveWidth(18), justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#000000', borderRadius: responsiveWidth(2) }}>
                <Text style={{ color: 'black' }} >{linkVisibility}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlePost}
                style={{ width: responsiveWidth(18), height: responsiveHeight(3.8), backgroundColor: '#000000', borderRadius: responsiveWidth(2), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#ffffff', fontWeight: 600 }}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* -------- */}
        <View style={{ flexDirection: 'row', padding: responsiveWidth(3), justifyContent: "space-between", height: responsiveHeight(11) }}>

          <TouchableOpacity  style={{
            width: responsiveWidth(12), height: responsiveWidth(12), borderRadius: responsiveWidth(12), backgroundColor: "#D9D9D9",
          }}>
            <Image source={require('../../Assets/Home_Icon_And_Fonts/add_icon.png')} style={{ width: "97%", height: "100%", marginLeft: responsiveWidth(0.3) }} resizeMode='stretch' />
            <Text style={{ textAlign: "center", fontSize: responsiveFontSize(1.6), letterSpacing: 0.5, color: "#000000", fontWeight: '500' }}>New</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleGoLive} style={{
            width: responsiveWidth(12), height: responsiveWidth(12), borderRadius: responsiveWidth(12), backgroundColor: "#D9D9D9",
          }}>
            <Image source={require('../../Assets/Home_Icon_And_Fonts/Live_icon.png')} style={{ width: "85%", height: "100%", marginLeft: 5 }} resizeMode='stretch' />
            <Text style={{ textAlign: "center", fontSize: responsiveFontSize(1.6), letterSpacing: 0.5, color: "#000000", fontWeight: 500 }}>Live</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePromote} style={{
            width: responsiveWidth(12), height: responsiveWidth(12), borderRadius: responsiveWidth(12), backgroundColor: "#D9D9D9",
          }}>
            <Image source={require('../../Assets/Home_Icon_And_Fonts/promote_icon.png')} style={{ width: "85%", height: "100%", marginLeft: 5 }} resizeMode='stretch' />
            <View style={{ width: responsiveWidth(20) }}>
              <Text style={{ width: responsiveWidth(14), textAlign: "center", fontSize: responsiveFontSize(1.6), letterSpacing: 0.3, color: "#000000", fontWeight: 500 }}>Promote</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleFocus} style={{
            width: responsiveWidth(12), height: responsiveWidth(12), borderRadius: responsiveWidth(12), backgroundColor: "#D9D9D9",
          }}>
            <Image source={require('../../Assets/Home_Icon_And_Fonts/link_icon.png')}
              style={{ width: "100%", height: "100%", }} resizeMode='stretch' />
            <Text style={{ textAlign: "center", fontSize: responsiveFontSize(1.6), letterSpacing: 0.5, color: "#000000", fontWeight: 500 }}>Link</Text>
          </TouchableOpacity>

        </View>
      </View>
      <Modal
        isVisible={imagePickerModalVisible}
        onBackdropPress={() => setImagePickerModalVisible(false)}>
        <View style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 10 }}>
          <TouchableOpacity style={{ padding: 10 }} onPress={() => handleImageOption('camera')}>
            <Text >Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10 }} onPress={() => handleImageOption('gallery')}>
            <Text>Choose from Gallery</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={{ padding: 10 }} onPress={() => handleImageOption('gallery')}>
            <Text>Choose from Gallery</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={{ padding: 10 }} onPress={() => setImagePickerModalVisible(false)}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}