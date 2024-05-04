import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import privateAPI from '../../../api/privateAPI'; // Import your API module
import Video from 'react-native-video';

export default function Promote() {
  const navigation = useNavigation();
  const [selectedDays, setSelectedDays] = useState(1);
  const [inventoryCount, setInventoryCount] = useState(0); // Initial inventory count
  const [images, setImages] = useState([]); // State to hold fetched images
  const [id, setId] = useState('');



  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch images from the API
        const response = await privateAPI.get('user/gallery/getGalleryFilesByAllUser');
        // Check if the response is successful and contains image data
        if (response.data && Array.isArray(response.data.data)) {
          // Extract image URLs from the response data
          const fetchedImages = response.data.data.map(item => item.filePath);
          const fetchImageId = response.data.data.map(item => item.id);
          // Set the fetched images to state
          setImages(fetchedImages);
          setId(fetchImageId);
        } else {
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    // Call the fetchImages function when the component mounts
    fetchImages();
  }, []); // Run only once when the component mounts
 // Run only once when the component mounts

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexId, setcurrentIndexId] = useState(0);
  const previousIndex = (currentIndex === 0 ? images.length - 1 : (currentIndex - 1));
  const nextIndex = (currentIndex === images.length - 1 ? 0 : (currentIndex + 1));
 
  const handlePromote = () => {
    const currentImageId = id[currentIndex]; // Get the ID of the current image
    setcurrentIndexId(currentImageId); // Set the currentIndexId state
    navigation.navigate('PromoteEdit', {
      currentIndex,
      id: currentImageId // Pass only the ID of the current image
    });
  };


  const handlePromoteDelete = () => {
    alert('Deleted Successfully');
    navigation.navigate('Homecontents');
  };

  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <Text style={{ color: 'black', fontSize: responsiveFontSize(3), fontWeight: '600' }}>Promote:</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
          <View style={{ width: responsiveWidth(60), height: responsiveHeight(30), justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            {/* Previous Image or Video */}
            {images[previousIndex] && (
              images[previousIndex].endsWith('.mp4') || images[previousIndex].endsWith('.mov') ? (
                <Video
                  source={{ uri: images[previousIndex] }}
                  style={{ width: responsiveWidth(50), height: responsiveHeight(25), position: 'absolute', left: -responsiveWidth(40) }}
                  resizeMode='cover'
                />
              ) : (
                <Image
                  source={{ uri: images[previousIndex] }}
                  style={{ width: responsiveWidth(50), height: responsiveHeight(25), position: 'absolute', left: -responsiveWidth(40) }}
                  resizeMode='cover'
                />
              )
            )}

            {/* Current Image or Video */}
            {images[currentIndex] && (
              images[currentIndex].endsWith('.mp4') || images[currentIndex].endsWith('.mov') ? (
                <Video
                  source={{ uri: images[currentIndex] }}
                  style={{ width: responsiveWidth(45), height: responsiveHeight(30), alignSelf: 'center', zIndex: 2 }}
                  resizeMode='cover'
                />
              ) : (
                <Image
                  source={{ uri: images[currentIndex] }}
                  style={{ width: responsiveWidth(45), height: responsiveHeight(30), alignSelf: 'center', zIndex: 2 }}
                  resizeMode='cover'
                />
              )
            )}

            {/* Next Image or Video */}
            {images[nextIndex] && (
              images[nextIndex].endsWith('.mp4') || images[nextIndex].endsWith('.mov') ? (
                <Video
                  source={{ uri: images[nextIndex] }}
                  style={{ width: responsiveWidth(50), height: responsiveHeight(25), position: 'absolute', right: -responsiveWidth(40) }}
                  resizeMode='cover'
                />
              ) : (
                <Image
                  source={{ uri: images[nextIndex] }}
                  style={{ width: responsiveWidth(50), height: responsiveHeight(25), position: 'absolute', right: -responsiveWidth(40) }}
                  resizeMode='cover'
                />
              )
            )}

            {/* Left and Right Arrows */}
            <TouchableOpacity onPress={() => setCurrentIndex(nextIndex)} style={{ position: 'absolute', left: responsiveWidth(48), bottom: responsiveWidth(20), zIndex: 3 }}>
              <View style={{ borderRadius: responsiveWidth(8), height: responsiveWidth(8), width: responsiveWidth(8), backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../../Assets/app_logo/arrow-right.png')} style={{ borderRadius: responsiveWidth(8), height: responsiveWidth(8), width: responsiveWidth(8) }} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCurrentIndex(previousIndex)} style={{ position: 'absolute', right: responsiveWidth(0), bottom: responsiveWidth(20), zIndex: 2, left: responsiveWidth(2), width: responsiveWidth(10) }}>
              <View style={{ borderRadius: responsiveWidth(8), height: responsiveWidth(8), width: responsiveWidth(8), backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../../Assets/app_logo/arrow-left.png')} style={{ borderRadius: responsiveWidth(8), height: responsiveWidth(8), width: responsiveWidth(8) }} />
              </View>
            </TouchableOpacity>
          </View>
        </View>


        <View style={{ marginTop: responsiveHeight(4) }}>
          <TouchableOpacity style={{ borderWidth: 1, width: responsiveWidth(30), height: responsiveHeight(5), alignItems: 'center', justifyContent: 'center', borderRadius: responsiveWidth(4), left: responsiveWidth(20), backgroundColor: '#000000' }} onPress={handlePromote}>
            <Text style={{ fontSize: responsiveFontSize(2), color: 'white', fontWeight: 'bold' }}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: responsiveHeight(5), left: responsiveWidth(40), bottom: responsiveHeight(10) }}>
          <TouchableOpacity style={{ borderWidth: 1, width: responsiveWidth(30), height: responsiveHeight(5), alignItems: 'center', justifyContent: 'center', borderRadius: responsiveWidth(4), left: responsiveWidth(20), backgroundColor: '#000000' }} onPress={handlePromoteDelete}>
            <Text style={{ fontSize: responsiveFontSize(2), color: 'white', fontWeight: 'bold' }}>Delete</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          borderBottomWidth: 6,
          borderBottomColor: '#BDBDBD',
          marginVertical: responsiveHeight(1),
          bottom: responsiveHeight(9)
        }}></View>
      </View>

    </ScrollView>
  );
}