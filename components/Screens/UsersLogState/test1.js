import React, { useState } from 'react';
import { View, Button, Image, Alert, TextInput, StyleSheet, TouchableOpacity, Modal, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const MyComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [platformId, setPlatformId] = useState(null);

  const openImagePicker = (id) => {
    setPlatformId(id); // Set platform ID state
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 300,
      maxWidth: 300,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorMessage);
      } else {
        const selectedImage = response.assets[0];
        setSelectedImage(selectedImage);
        setModalVisible(true);  // Show the modal to enter description
      }
    });
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      Alert.alert('No image selected', 'Please select an image first.');
      return;
    }
    if (!description.trim()) {
      Alert.alert('No description', 'Please enter a description.');
      return;
    }
    if (!platformId) {
      Alert.alert('No platform ID', 'Platform ID is missing.');
      return;
    }

    try {
      const userId = 3
      const jwt = await AsyncStorage.getItem('jwt');

      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('platformPermanentId', platformId); // Use platform ID state
      formData.append('fileInputWebModel.description', description);

      const imageUriParts = selectedImage.uri.split('.');
      const fileType = imageUriParts[imageUriParts.length - 1];
      formData.append('fileInputWebModel.files[0]', {
        uri: selectedImage.uri,
        name: `image.${fileType}`,
        type: `image/${fileType}`,
      });

      const response = await axios.post(
        'http://3.27.207.83:8080/filmhook-0.0.1-SNAPSHOT/IndustryUser/project/saveProjectFiles',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyTmFtZSI6Im1kZGluZXNoMTA4QGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiSW5kdXN0cnlVc2VyIiwiaWF0IjoxNzE2MjkzMTIyLCJleHAiOjE3MTYyOTQzMjJ9.9Z5HwP50bko-lZLFTMicduUVZibbFWIDu6bxAzhfw1UMroiaThkGq1PxxnOukRgxai4O4_3jwxP0XEXB1MtrMA'}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.status === 1) {
        Alert.alert('Success', 'Image uploaded successfully.');
      } else {
        Alert.alert('Upload failed', `Server returned status: ${response.data.status}`);
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    }

    // Reset state
    setSelectedImage(null);
    setDescription('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Pass the platform ID when opening the image picker */}
      <Button title="Open Gallery" onPress={() => openImagePicker('1')} /> 
      {selectedImage && (
        <Image source={{ uri: selectedImage.uri }} style={styles.image} />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
          />
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={uploadImage}
          >
            <Text style={styles.textStyle}>Upload Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 16,
  },
  textInput: {
    width: '100%',
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 8,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  uploadButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MyComponent;
