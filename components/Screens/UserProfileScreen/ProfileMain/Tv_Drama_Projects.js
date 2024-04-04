import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Modal } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

export default function Profession_project() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [currentTitle, setCurrentTitle] = useState('');

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

  return (
    <ScrollView>
      <View>
        <View>
          <Text style={{ fontSize: 25, color: '#323232', fontWeight: 'bold', marginLeft: 10, textDecorationLine: 'underline' }}>Projects</Text>
        </View>
        <TouchableOpacity onPress={openImagePicker} style={{ width: 130, height: 150, borderWidth: 1, marginLeft: 20, marginTop: 10, backgroundColor: "#F5F5F5" }}>
                  
<Image source={require('../../../../components/Assets/Home_Icon_And_Fonts/see_more_icon.png')}
                      style={{width:80,height:80,}} />
        </TouchableOpacity>
        {selectedImages.length > 1 && (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginVertical: 10 }}>
    {selectedImages.slice(1).reverse().map((image, index) => (
      <View key={index} style={{ margin: 5 }}>
        <Image
          source={{ uri: image.uri }}
          style={{ width: 120, height: 180, alignSelf: 'center' }}
          resizeMode="contain"
        />
        <Text style={{ textAlign: 'center', marginTop: 5 }}>{image.title}</Text>
      </View>
    ))}
  </View>
)}
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
              placeholder="Project's Tittle Goes Here..."
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