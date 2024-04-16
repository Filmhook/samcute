import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Alert } from 'react-native'
import React, { useState } from 'react'
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import DocumentPicker from 'react-native-document-picker';
import { app, database } from '../../../../FirebaseConfig';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import privateAPI from '../../../api/privateAPI';


export default function Handle_img_picker() {

  const [visible, setVisible] = useState(false);
  const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);
  const [croppedImage, setCroppedImage] = useState([]);
  const [caption, setCaption] = useState('');
  const [postModalVisible, setPostModalVisible] = useState(false);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [postVisibility, setPostVisibility] = useState('public');
  const [selectedVideo, setSelectedVideo] = useState([]);

  const [profilepic, setProfilepic] = useState();
//  console.log(croppedImage)

  const edit_profile_pic = async () => {
    await ImagePicker.openPicker({
      cropping: true
    }).then(
      image => {
        console.log(image.path)
        setProfilepic(image.path)
      })
  }


  // for open option modal 
  const handleImagePicker = () => {
    setImagePickerModalVisible(true);
  };
  // for open option modal 
  const pickVideo = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedVideo([...selectedVideo, res]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        console.log('User cancelled');
      } else {
        Alert.alert('Error', 'Error picking video file');
      }
    }
    finally {
      setPostModalVisible(true);
      setImagePickerModalVisible(false)
    }
  };
  // function for camera and gallery picker
  const handleImageOption = async (option) => {
    try {
      if (option === 'camera') {
        // Open camera and crop image
      } else if (option === 'gallery') {
        const image = await ImagePicker.openPicker({
          cropping: true,
        });
console.log(`IMG ${JSON.stringify(image)}`)
        // Append the new image to the existing array of cropped images
        setCroppedImage([image]);
      }
    } catch (error) {
      console.log('Image picker operation canceled or failed:', error);
    } finally {
      setImagePickerModalVisible(false);
      setPostModalVisible(true);
    }
  };


  const handlePost = async () => {
    try {
      // Retrieve userId from AsyncStorage
      const id = await AsyncStorage.getItem('userId');

      // Check if any cropped images exist
console.log(croppedImage.path , croppedImage.mime , "dfdfdfd.jpg")
      // Create a FormData object and append data
//      let formData = new FormData();
//      formData.append("userId", id);
//      formData.append("category", "Gallery");
//      formData.append('file', {
//      uri : croppedImage
//      });

      // Make a POST request using privateAPI
//      const response = await privateAPI.post(
//        `/user/gallery/saveGalleryFiles`,
//        formData,
//        {userId : id , category : "Gallery" , file : croppedImage},
//             { headers: { 'content-type': 'application/x-www-form-urlencoded' }},
//            );
//console.log(croppedImage)
privateAPI({
    url:'/user/gallery/saveGalleryFiles',
    method:'POST',
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    formData,
}).then(d => {
console.log(d)
}).catch(e => {
console.log(e)
})


//      console.log('Posted successfully:', response.data);


      // Show success message after posting all images
      Alert.alert('Posted');

    } catch (error) {
      console.error('Error posting:', error);
      Alert.alert('Error', 'Failed to post image.');
    }
  };








  // function for camera and gallery picker

  // public and private dropdown 

  const showDropdown = () => {
    setIsDropdownVisible(true);
  };

  const hideDropdown = () => {
    setIsDropdownVisible(false);
  };

  const selectVisibility = (value) => {
    setPostVisibility(value);
    hideDropdown();
  };

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity onPress={() => selectVisibility(item.value)} style={{ padding: 10 }}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );




  const handleCancelPost = () => {
    // Reset states
    setCaption('');
    setCroppedImage(null);
    setPostModalVisible(false);
  };

  return (
    <>

      <TouchableOpacity
        onPress={handleImagePicker}
        style={{ marginLeft: responsiveWidth(4), width: responsiveWidth(13), height: responsiveHeight(6), bottom: responsiveHeight(1), }}>
        <Image
          source={require('../../../Assets/Home_Icon_And_Fonts/FH_Gallery.png')}
          style={{ width: '100%', height: '100%' }} resizeMode='stretch'
        />
        <View style={{ width: responsiveWidth(12) }}>
          <Text style={{ fontSize: responsiveFontSize(1.5), color: '#000000', fontWeight: 500 }} >Gallery</Text>
        </View>
      </TouchableOpacity>

      {/* for modal */}

      <Modal isVisible={imagePickerModalVisible} onBackdropPress={() => setImagePickerModalVisible(false)}>
        <View style={{ backgroundColor: '#ffffff', padding: responsiveWidth(2), borderRadius: responsiveWidth(2), }}>
          <TouchableOpacity style={{ padding: responsiveWidth(2) }}
            onPress={() => handleImageOption('camera')}>
            <Text>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: responsiveWidth(2) }}
            onPress={() => handleImageOption('gallery')}>
            <Text>Upload your Image</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ padding: responsiveWidth(2) }}
            onPress={pickVideo}>
            <Text>Upload your Video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: responsiveWidth(2) }}
            onPress={() => setImagePickerModalVisible(false)}>
            <Text>Cancel</Text>
          </TouchableOpacity>

        </View>
      </Modal>


      {/* Post Input Modal */}
      <Modal isVisible={postModalVisible} onBackdropPress={() => setPostModalVisible(false)}>
        <View style={{ backgroundColor: '#ffffff', padding: responsiveWidth(2), borderRadius: responsiveWidth(3), justifyContent: 'center', alignItems: 'center', width: responsiveWidth(80), left: responsiveWidth(4) }}>
          {croppedImage && croppedImage.path && ( // Check if croppedImage and its path are both defined
            <Image
              source={{ uri: croppedImage.path }} // Use the uri property to specify the image source
              style={{ width: responsiveWidth(75), height: responsiveHeight(30), marginBottom: responsiveHeight(1), borderRadius: responsiveWidth(1) }}
            />
          )}

          <TextInput
            placeholder="Write your caption..."
            multiline
            value={caption}
            onChangeText={setCaption}
            style={{ borderWidth: 1, borderRadius: 1, width: responsiveWidth(65), padding: responsiveWidth(2), marginBottom: responsiveHeight(2), height: responsiveHeight(12) }}
          />
          <View style={{ flexDirection: 'row', justifyContent: "space-evenly", width: responsiveWidth(65) }}>
            {/* // ------------------- */}
            <TouchableOpacity onPress={handleCancelPost} style={{ width: responsiveWidth(20), height: responsiveHeight(4), backgroundColor: '#000000', borderRadius: responsiveWidth(2), justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Cancel</Text>
            </TouchableOpacity>

            {/* // ------------------- */}

            <TouchableOpacity
              onPress={isDropdownVisible ? hideDropdown : showDropdown}
              style={{ height: responsiveHeight(4), width: responsiveWidth(20), alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#000000', borderRadius: responsiveWidth(2) }}>
              <Text style={{ fontWeight: 'bold' }}>{postVisibility}</Text>
            </TouchableOpacity>

            {/* // ------------------- */}

            <TouchableOpacity onPress={handlePost} style={{ width: responsiveWidth(20), height: responsiveHeight(4), backgroundColor: '#000000', borderRadius: responsiveWidth(2), justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      {/* Modal for dropdown options */}

      <Modal
        isVisible={isDropdownVisible}
        onBackdropPress={hideDropdown}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={{ margin: 0 }}
      >
        <View style={{ backgroundColor: '#ffffff', padding: responsiveWidth(2), borderRadius: responsiveWidth(2), borderWidth: responsiveWidth(0.2), width: responsiveWidth(70), alignSelf: 'center' }}>
          <FlatList
            data={[
              { label: 'Public', value: 'public' },
              { label: 'Private', value: 'private' },
            ]}
            keyExtractor={(item) => item.value}
            renderItem={renderDropdownItem}
          />
        </View>
      </Modal>
    </>
  )
}