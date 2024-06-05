import React, { useState } from 'react';
import { View, Button, Modal, Text, TextInput, TouchableOpacity, Switch, Image, Alert, FlatList, TouchableWithoutFeedback } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Video from 'react-native-video';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import privateAPI from '../../../api/privateAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

const hardcodedLocations = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose", 'Alandur', 'Ambattur', 'Ambur', 'Ariyalur', 'Avadi', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Hosur', 'Kallakurichi', 'Kanchipuram', 'Kanniyakumari', 'Karaikkudi', 'Karur', 'Krishnagiri', 'Kumbakonam', 'Kurichi', 'Madavaram', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Nagercoil', 'Namakkal', 'Neyveli', 'Nilgiris', 'Pallavaram', 'Perambalur', 'Pudukkottai', 'Rajapalayam', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivagangai', 'Tambaram', 'Tenkasi', 'Thanjavur', 'Theni', 'Tuticorin', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Tiruvottiyur', 'Vellore', 'Viluppuram', 'Virudhunagar', 'Pondicherry', 'Karaikal'
  // Add more locations as needed
];

const MediaUploadModal = ({ visible, onClose, selectedMedia }) => {
  const [privateMode, setPrivateMode] = useState(true);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);



  const handleLocationChange = (text) => {
    setLocation(text);
    if (text.length > 0) {
      const filtered = 
      hardcodedLocations.filter(location =>
        location.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  };

  const handleLocationSelect = (location) => {
    setLocation(location);
    setFilteredLocations([]);
  };

  const handleSubmit = async () => {
    if (selectedMedia.length === 0) {
      Alert.alert('Error', 'Please select a media file.');
      return;
    }
    const usertId = await AsyncStorage.getItem('userId')
   
    // Prepare form data
    const formData = new FormData();
    selectedMedia.forEach((media, index) => {
      formData.append(`files[${index}]`, {
        uri: media.uri,
        type: media.type,
        name: media.name,
      });
    });
    formData.append('userId', usertId); // Replace 'YOUR_USER_ID' with the actual user ID
    formData.append('description', description);
    formData.append('privateOrPublic', privateMode ? '1' : '0');
    formData.append('locationName', location);

    try {
      // Send POST request to the API endpoint
      const response = await privateAPI.post('user/post/savePost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',



        }
      });

      // Handle success response
      console.log('Post API response:', response.data);
      Alert.alert('Success', 'Post submitted successfully!');
      onClose();
    } catch (error) {
      // Handle error
      console.error('Error submitting post:', error);
      Alert.alert('Error', 'Failed to submit post.');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', maxHeight: '80%' }}>
          <Swiper style={{ height: '100%' }}>
            {selectedMedia.map((media, index) => (
              <View key={index} style={{ flex: 1 }}>
                {media.type.startsWith('video/') ? (
                  <Video
                    source={{ uri: media.uri }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                    paused={true}
                  />
                ) : (
                  <Image
                    source={{ uri: media.uri }}
                    style={{ width: '100%', height: '100%' }}
                  />
                )}
              </View>
            ))}
          </Swiper>

          <TextInput
            placeholder="Description"
            placeholderTextColor={'black'}
            value={description}
            onChangeText={setDescription}
            style={{ marginTop: 20, borderWidth: 1, borderColor: 'gray', padding: 5 ,color:'black'}}
            multiline={true}
          />

          <View style={{ marginTop: responsiveHeight(3) }}>
            <Text style={{ color: 'black' }}>Public or Private:</Text>
            <Switch
              value={privateMode}
              onValueChange={setPrivateMode}
              style={{ borderWidth: 1, bottom: responsiveHeight(3) }}
            />
          </View>

          <TextInput
            placeholder="Location"
          placeholderTextColor={'black'}
            value={location}
            onChangeText={handleLocationChange}
            style={{ marginTop: 10, borderWidth: 1, borderColor: 'gray', padding: 5 ,color:'black'}}
          />
          {filteredLocations.length > 0 && (
            <View style={{ borderWidth: 1, borderColor: 'gray', maxHeight: 100 }}>
              <FlatList
                data={filteredLocations}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableWithoutFeedback onPress={() => handleLocationSelect(item)}>
                    <View style={{ padding: 10 }}>
                      <Text style={{color:'black'}}>{item}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                )}
              />
            </View>
          )}

          <TouchableOpacity
            style={{ marginTop: 20, backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
            onPress={handleSubmit}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Submit Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const Handle_img_picker = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);

  const handleOpenModal = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.video],
        allowMultiSelection: true
      });
      if (res) {
        setModalVisible(true);
        setSelectedMedia(res);
      }
    } catch (err) {
      console.log('Error picking media file:', err);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1,right:responsiveWidth(2)}}>
      <TouchableOpacity
        onPress={handleOpenModal}
        style={{ width: responsiveWidth(12), height: responsiveWidth(12), borderRadius: responsiveWidth(12), backgroundColor: "#ffffff" }}>
        <Image
          source={require('../../../Assets/Home_Icon_And_Fonts/FH_Gallery.png')}
          style={{ width: "87%", height: "95%", marginLeft: 5 }} resizeMode='stretch'
        />
        <View style={{ width: responsiveWidth(12) }}>
          <Text  style={{ textAlign: "center", fontSize: responsiveFontSize(1.6), letterSpacing: 0.5, color: "#000000", fontWeight: 500 }}>Gallery</Text>
        </View>
      </TouchableOpacity>
      {/* <Button title="Open Gallery" onPress={handleOpenModal} /> */}
      <MediaUploadModal visible={modalVisible} onClose={handleCloseModal} selectedMedia={selectedMedia} />
    </View>
  );
};

export default Handle_img_picker;