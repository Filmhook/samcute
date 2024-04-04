import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Modal } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
export default function Projectsforpublic() {
    const [selectedImages, setSelectedImages] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(null);
    const [currentTitle, setCurrentTitle] = useState('');
    const [showAllImages, setShowAllImages] = useState(false);
  
    const openImagePicker = () => {
      const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 300,
        maxWidth: 300,
      };
  
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('Image picker error: ', response.error);
        } else {
          let imageUri = response.uri || response.assets?.[0]?.uri;
          setModalVisible(true);
          setCurrentImageIndex(selectedImages.length);
          setCurrentTitle('');
          setSelectedImages((prevImages) => [
            ...prevImages,
            { uri: imageUri, title: '' }, // Initialize with an empty title
          ]);
        }
      });
    };
  
    const addImageWithTitle = () => {
      if (currentTitle.trim() !== '') {
        const updatedImages = [...selectedImages];
        updatedImages[currentImageIndex] = { uri: updatedImages[currentImageIndex]?.uri || '', title: currentTitle };
        setSelectedImages(updatedImages);
        setModalVisible(false);
      }
    };
  
      const renderImages = () => {
      const maxInitialImages = 3;
      const displayImages = showAllImages ? selectedImages : selectedImages.slice(0, maxInitialImages);
      const remainingImages = selectedImages.slice(maxInitialImages);
  
      return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10, marginLeft: 15 }}>
          {displayImages.map((image, index) => (
            <View key={index} style={{ margin: 5 }}>
              <Image
                source={{ uri: image.uri }}
                style={{ width: 120, height: 180 }}
                resizeMode="contain"
              />
              <Text style={{ marginTop: -5 }}>{image.title}</Text>
            </View>
          ))}
          {selectedImages.length > maxInitialImages && !showAllImages && (
            <TouchableOpacity
              style={{ alignSelf: 'flex-end', marginRight: 15, marginTop: 5 }}
              onPress={() => setShowAllImages(true)}
            >
              <Text style={{ color: 'blue', fontWeight: 'bold', marginTop: 5 }}>See More</Text>
            </TouchableOpacity>
          )}
          {showAllImages && remainingImages.map((image, index) => (
            <View key={maxInitialImages + index} style={{ margin: 5 }}>
              <Image
                source={{ uri: image.uri }}
                style={{ width: 120, height: 180 }}
                resizeMode="contain"
              />
              <Text style={{ marginTop: -5 }}>{image.title}</Text>
            </View>
          ))}
          {showAllImages && (
            <TouchableOpacity
              style={{ alignSelf: 'flex-end', marginRight: 15, marginTop: 5 }}
              onPress={() => setShowAllImages(false)}
            >
              <Text style={{ color: 'blue', fontWeight: 'bold', marginTop: 5 }}>See Less</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    };
    return (
      <ScrollView>
        <View>
          <View>
            <Text style={{ fontSize: 25, color: '#323232', fontWeight: 'bold', marginLeft: 10, textDecorationLine: 'underline' }}>Projects</Text>
          </View>
          <TouchableOpacity onPress={openImagePicker} style={{ width: 130, height: 150, borderWidth: 1, marginLeft: 10, marginTop: 10, backgroundColor: "#F5F5F5" }}>
          <Image source={require('../../../Assets/Home_Icon_And_Fonts/plus_icon.png')}
                        style={{width:80,height:80,alignSelf:'center',top:29}}/>
          </TouchableOpacity>
          {renderImages()}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5, width: '80%' }}>
              {selectedImages[currentImageIndex]?.uri && (
                <Image
                  source={{ uri: selectedImages[currentImageIndex].uri }}
                  style={{ width: '100%', height: 200 }}
                />
              )}
              <TextInput
                placeholder="Project's Title Goes Here..."
                value={currentTitle}
                onChangeText={(text) => setCurrentTitle(text)}
                style={{ borderWidth: 1, borderRadius: 5, marginVertical: 10, padding: 5 }}
              />
              <TouchableOpacity onPress={addImageWithTitle} style={{ backgroundColor: 'blue', borderRadius: 10, padding: 10, alignSelf: 'center' }}>
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                  Add
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }