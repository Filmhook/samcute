import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import DocumentPicker from 'react-native-document-picker';
// for firebase 
import { app, database } from '../../../../FirebaseConfig';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PublicAPI from '../../../api/publicAPI';

// for firebase 

export default function Handle_img_picker() {

  const [visible, setVisible] = useState(false);
  const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [postModalVisible, setPostModalVisible] = useState(false);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [postVisibility, setPostVisibility] = useState('public');
  const [selectedVideo, setSelectedVideo] = useState([]);

  const [profilepic , setProfilepic] = useState();

   const edit_profile_pic=async()=>{
    await ImagePicker.openPicker({
     cropping:true
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
        const image = await ImagePicker.openCamera({
          cropping: true,
        });

        setCroppedImage(image);
      } else if (option === 'gallery') {
        const image = await ImagePicker.openPicker({
          cropping: true,
        });

        setCroppedImage(image);
      }

    }
    catch (error) {
      console.log('Image picker operation canceled or failed:', error);
    }

    finally {
      setImagePickerModalVisible(false);
      setPostModalVisible(true);
    }
  };

  const handlePost = async () => {
    try {
      // Retrieve userId and JWT from AsyncStorage
      const id = await AsyncStorage.getItem('userId');
      const jwt = await AsyncStorage.getItem('jwt');
      console.log(`User Id from IS Confirm ${id}`);
      console.log(jwt);
      console.log("HITT");
      console.log(croppedImage)

      // Check if croppedImage exists and is in the expected format (for images)
      if (croppedImage && typeof croppedImage === 'object' && croppedImage.hasOwnProperty('path')) {
        // Create a FormData object and append data
        let formData = new FormData();
        formData.append("userId", id);
        formData.append("category", "Gallery");

        // Extract file name from the image path
        const fileName = croppedImage.path.split('/').pop();

        // Append the image file to the formData
        formData.append("file", {
          uri: croppedImage.path,
          name: fileName,
          type: croppedImage.mime, 
        });

        // Define request configuration with headers
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${jwt}`
          }
        };

        // Make a POST request using PublicAPI
        const response = await PublicAPI.post(
          `/user/gallery/saveGalleryFiles`,
          formData,
          config
        );

        console.log('posted successful:', response.data);
        Alert.alert('Posted');
      } else {
        // Handle case where no image is selected
        Alert.alert('Please select an image to post.');
      }
    } catch (error) {
      const fileName = croppedImage.path.split('/').pop();
      console.log(fileName)
      console.error(error)
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

  // public and private dropdown 


  // for firebase-firestore  -----

  const firestore = getFirestore(app)
  const collectionName = 'Homepage-post';

  const postDatan = async () => {
    try {
      const docRef = await addDoc(collection(firestore, collectionName), {
        image: croppedImagek,
        caption: caption,
        view_type: postVisibility,
        timestamp: serverTimestamp(),
        // Use serverTimestamp to get the server time
      })
      alert('Posted Successfull');
      console.log('Document written with ID: ', docRef.id);
      console.log('Document written with ID: ', docRef.timestamp);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }
  // for firebase-firestore  -----   
//-----API post-------------------------------------------
  // const postData = async () => {
  //   try {
  //     await axios.post('http://10.0.2.2:8000/signup/', {
  //       croppedImage,caption
      
        
  //     }
  //     );  
  //     Alert.alert('Signup Successful');
  //     navigation.navigate(Login)
  //     console.log("successful")
  //   } catch (error) {
  //     // Alert.alert('Signup Failed');
  //     console.log(error)
  
  //   }
  // };
//------------------------------------------------------------
  const handlePosts = () => {

    // firestore in firebase func call
    postData()
    // firestore in firebase func call

    // Reset states
    setCaption('');
    setCroppedImage(null);
    setPostModalVisible(false);
    setVisible(false);
  };

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
          {croppedImage && (
            <Image
              source={{ uri: croppedImage.path }}
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