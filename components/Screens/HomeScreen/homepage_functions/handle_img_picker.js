// import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Alert } from 'react-native'
// import React, { useState } from 'react'
// import ImagePicker from 'react-native-image-crop-picker';
// import Modal from 'react-native-modal';
// import DocumentPicker from 'react-native-document-picker';
// import { app, database } from '../../../../FirebaseConfig';
// import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore'
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import privateAPI from '../../../api/privateAPI';
// import Video from 'react-native-video';


// export default function Handle_img_picker() {

//   const [visible, setVisible] = useState(false);
//   const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);
//   const [croppedImage, setCroppedImage] = useState('');
//   const [caption, setCaption] = useState('');
//   const [postModalVisible, setPostModalVisible] = useState(false);

//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//   const [postVisibility, setPostVisibility] = useState('public');
//   const [selectedVideo, setSelectedVideo] = useState([]);

//   const [profilepic, setProfilepic] = useState();
//   //  console.log(croppedImage)

//   const edit_profile_pic = async () => {
//     await ImagePicker.openPicker({
//       cropping: true
//     }).then(
//       image => {
//         console.log(image.path)
//         setProfilepic(image.path)
//       })
//   }


//   // for open option modal 
//   const handleImagePicker = () => {
//     setImagePickerModalVisible(true);
//   };
//   // for open option modal
//   console.log(`selected video state - ${JSON.stringify(selectedVideo)}`)
//   const pickVideo = async () => {
//     try {
//       const res = await DocumentPicker.pick({
//         type: [DocumentPicker.types.video],
//         allowMultiSelection: true, // Enable multiple selection
//       });
//       console.log(`selected videos - ${JSON.stringify(res)}`);
//       setSelectedVideo(prevVideos => [...prevVideos, ...res]);

//       console.log('videos', selectedVideo);
//       setPostModalVisible(true);
//       setImagePickerModalVisible(false);

//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         // User cancelled the picker
//         console.log('User cancelled');
//       } else {
//         Alert.alert('Error', 'Error picking video file');
//       }
//     }
//   };
//   // function for camera and gallery picker
//   const handleImageOption = async (option) => {
//     try {
//      if (option === 'gallery') {
//       const images = await ImagePicker.openPicker({ 
//         multiple: true, 
//         cropping: true 
//       });

//       const processedImages = images.map(image => {
//         if (!image.path) {
//           console.error('Image object missing "path" property:', image);
//           return null;
//         }

//         const generateName = image.path.split("/").pop();
//         return { uri: image.path, type: image.mime, name: generateName };
//       }).filter(image => image !== null);

//       setCroppedImage(prevImages => [...prevImages, ...processedImages]);
//     }}  catch (error) {
//       console.log('Image picker operation canceled or failed:', error);
//     } finally {
//       setImagePickerModalVisible(false);
//       setPostModalVisible(true);
//     }
//   };
//   const handlePost = async () => {
//     try {
//       // Check if either croppedImage or selectedVideo is defined
//       if (!croppedImage && selectedVideo.length === 0) {
//         throw new Error("No media selected");
//       }

//       // Retrieve userId from AsyncStorage
//       const id = await AsyncStorage.getItem('userId');

//       // Create a new Headers object and append the authorization token
//       const myHeaders = new Headers();
//       const jwt = await AsyncStorage.getItem("jwt");
//       myHeaders.append("Authorization", "Bearer " + jwt);

//       // Create a FormData object
//       const formData = new FormData();

//       formData.append("userId", id);
//       formData.append("description", caption);
//       formData.append("category", "Gallery");

//       // If croppedImage is defined, it's an image; append it to FormData
//       if (croppedImage) {
//         croppedImage.forEach((image, index) => {
//           formData.append(`files[${index}]`, {
//             uri: image.uri,
//             type: image.type,
//             name: image.name
//           });
//         });
//       }

//       // If selectedVideo array has items, append each video to FormData
//       if (selectedVideo.length > 0) {
//         selectedVideo.forEach((vid, index) => {
// console.log(vid)

//           formData.append(`files[${index}]`, {
//             uri: vid.uri,
//             name: vid.name,
//             type: vid.type
//           });
//         });
//       }

//       // Define requestOptions with method, headers, body, and redirect options
//       const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: formData,
//         redirect: "follow"
//       };
// console.log(`FormData : ${JSON.stringify(formData)}`)
//       // Make a POST request using fetch
//       const response = await fetch(`https://filmhook.annularprojects.com/filmhook-0.0.1-SNAPSHOT/user/post/savePost`, requestOptions);
//       const data = await response.json(); // Parse response JSON

//       // Log the response data
//       console.log("Response data:", data);

//       if (data.status === 1) {
//         Alert.alert("Posted");
//         setPostModalVisible(false);
//       } else {
//         // Handle unsuccessful response
//         // ...
//       }
//     } catch (error) {
//       console.error('Error posting:', error);
//       Alert.alert('Error', error.message);
//     }
//   };


//   const showDropdown = () => {
//     setIsDropdownVisible(true);
//   };

//   const hideDropdown = () => {
//     setIsDropdownVisible(false);
//   };

//   const selectVisibility = (value) => {
//     setPostVisibility(value);
//     hideDropdown();
//   };

//   const renderDropdownItem = ({ item }) => (
//     <TouchableOpacity onPress={() => selectVisibility(item.value)} style={{ padding: 10 }}>
//       <Text>{item.label}</Text>
//     </TouchableOpacity>
//   );




//   const handleCancelPost = () => {
//     // Reset states
//     setCaption('');
//     setCroppedImage(null);
//     setPostModalVisible(false);
//   };

//   return (
//     <>

//       <TouchableOpacity
//         onPress={handleImagePicker}
//         style={{ marginLeft: responsiveWidth(4), width: responsiveWidth(13), height: responsiveHeight(6), bottom: responsiveHeight(1), }}>
//         <Image
//           source={require('../../../Assets/Home_Icon_And_Fonts/FH_Gallery.png')}
//           style={{ width: '100%', height: '100%' }} resizeMode='stretch'
//         />
//         <View style={{ width: responsiveWidth(12) }}>
//           <Text style={{ fontSize: responsiveFontSize(1.5), color: '#000000', fontWeight: 500 }} >Gallery</Text>
//         </View>
//       </TouchableOpacity>

//       {/* for modal */}

//       <Modal isVisible={imagePickerModalVisible} onBackdropPress={() => setImagePickerModalVisible(false)}>
//         <View style={{ backgroundColor: '#ffffff', padding: responsiveWidth(2), borderRadius: responsiveWidth(2), }}>
//           <TouchableOpacity style={{ padding: responsiveWidth(2) }}
//             onPress={() => handleImageOption('camera')}>
//             <Text style={{color:'black'}}>Open Camera</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={{ padding: responsiveWidth(2) }}
//             onPress={() => handleImageOption('gallery')}>
//             <Text style={{color:'black'}}>Upload your Image</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={{ padding: responsiveWidth(2) }}
//             onPress={pickVideo}>
//             <Text style={{color:'black'}}>Upload your Video</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={{ padding: responsiveWidth(2) }}
//             onPress={() => setImagePickerModalVisible(false)}>
//             <Text style={{color:'black'}}>Cancel</Text>
//           </TouchableOpacity>

//         </View>
//       </Modal>


//       {/* Post Input Modal */}
//       <Modal isVisible={postModalVisible} onBackdropPress={() => setPostModalVisible(false)}>
//         <View style={{ backgroundColor: '#ffffff', padding: responsiveWidth(2), borderRadius: responsiveWidth(3), justifyContent: 'center', alignItems: 'center', width: responsiveWidth(80), left: responsiveWidth(4) }}>
//           {croppedImage && !selectedVideo.length && (
//             <Image
//               source={{ uri: croppedImage.uri }}
//               style={{ width: responsiveWidth(75), height: responsiveHeight(30), marginBottom: responsiveHeight(1), borderRadius: responsiveWidth(1) }}
//             />
//           )}
//           {selectedVideo.length === 1 && !croppedImage && (
//             <Video
//               source={{ uri: selectedVideo[0].uri }}
//               style={{ width: responsiveWidth(75), height: responsiveHeight(30), marginBottom: responsiveHeight(1), borderRadius: responsiveWidth(1) }}
//               controls
//             />
//           )}

//           <TextInput
//             placeholder="Write your caption..."
//             multiline
//             value={caption}
//             onChangeText={setCaption}
//             style={{ borderWidth: 1, borderRadius: 1, width: responsiveWidth(65), padding: responsiveWidth(2), marginBottom: responsiveHeight(2), height: responsiveHeight(12) }}
//           />
//           <View style={{ flexDirection: 'row', justifyContent: "space-evenly", width: responsiveWidth(65) }}>
//             {/* // ------------------- */}
//             <TouchableOpacity onPress={handleCancelPost} style={{ width: responsiveWidth(20), height: responsiveHeight(4), backgroundColor: '#000000', borderRadius: responsiveWidth(2), justifyContent: 'center', alignItems: 'center' }}>
//               <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Cancel</Text>
//             </TouchableOpacity>

//             {/* // ------------------- */}

//             <TouchableOpacity
//               onPress={isDropdownVisible ? hideDropdown : showDropdown}
//               style={{ height: responsiveHeight(4), width: responsiveWidth(20), alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#000000', borderRadius: responsiveWidth(2) }}>
//               <Text style={{ fontWeight: 'bold' }}>{postVisibility}</Text>
//             </TouchableOpacity>

//             {/* // ------------------- */}

//             <TouchableOpacity onPress={handlePost} style={{ width: responsiveWidth(20), height: responsiveHeight(4), backgroundColor: '#000000', borderRadius: responsiveWidth(2), justifyContent: 'center', alignItems: 'center' }}>
//               <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Post</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>


//       {/* Modal for dropdown options */}

//       <Modal
//         isVisible={isDropdownVisible}
//         onBackdropPress={hideDropdown}
//         animationIn="slideInUp"
//         animationOut="slideOutDown"
//         style={{ margin: 0 }}
//       >
//         <View style={{ backgroundColor: '#ffffff', padding: responsiveWidth(2), borderRadius: responsiveWidth(2), borderWidth: responsiveWidth(0.2), width: responsiveWidth(70), alignSelf: 'center' }}>
//           <FlatList
//             data={[
//               { label: 'Public', value: 'public' },
//               { label: 'Private', value: 'private' },
//             ]}
//             keyExtractor={(item) => item.value}
//             renderItem={renderDropdownItem}
//           />
//         </View>
//       </Modal>
//     </>
//   )
// }

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
  "San Jose",'Alandur', 'Ambattur', 'Ambur', 'Ariyalur', 'Avadi', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Hosur', 'Kallakurichi', 'Kanchipuram', 'Kanniyakumari', 'Karaikkudi', 'Karur', 'Krishnagiri', 'Kumbakonam', 'Kurichi', 'Madavaram', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Nagercoil', 'Namakkal', 'Neyveli', 'Nilgiris', 'Pallavaram', 'Perambalur', 'Pudukkottai', 'Rajapalayam', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivagangai', 'Tambaram', 'Tenkasi', 'Thanjavur', 'Theni', 'Tuticorin', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Tiruvottiyur', 'Vellore', 'Viluppuram', 'Virudhunagar', 'Pondicherry', 'Karaikal'
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
      const filtered = hardcodedLocations.filter(location => 
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
const usertId=await AsyncStorage.getItem('userId')
const jwt =await AsyncStorage.getItem('jwt')
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
      const response = await axios.post('https://filmhook.annularprojects.com/filmhook-0.1/user/post/savePost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${jwt}`,

          
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
            value={description}
            onChangeText={setDescription}
            style={{ marginTop: 20, borderWidth: 1, borderColor: 'gray', padding: 5 }}
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
            value={location}
            onChangeText={handleLocationChange}
            style={{ marginTop: 10, borderWidth: 1, borderColor: 'gray', padding: 5 }}
          />
          {filteredLocations.length > 0 && (
            <View style={{ borderWidth: 1, borderColor: 'gray', maxHeight: 100 }}>
              <FlatList
                data={filteredLocations}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableWithoutFeedback onPress={() => handleLocationSelect(item)}>
                    <View style={{ padding: 10 }}>
                      <Text>{item}</Text>
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <TouchableOpacity
        onPress={handleOpenModal}
        style={{ marginLeft: responsiveWidth(4), width: responsiveWidth(13), height: responsiveHeight(6), bottom: responsiveHeight(1), }}>
        <Image
          source={require('../../../Assets/Home_Icon_And_Fonts/FH_Gallery.png')}
          style={{ width: '100%', height: '100%' }} resizeMode='stretch'
        />
        <View style={{ width: responsiveWidth(12) }}>
          <Text style={{ fontSize: responsiveFontSize(1.5), color: '#000000', fontWeight: 500 }} >Gallery</Text>
        </View>
      </TouchableOpacity>
      {/* <Button title="Open Gallery" onPress={handleOpenModal} /> */}
      <MediaUploadModal visible={modalVisible} onClose={handleCloseModal} selectedMedia={selectedMedia} />
    </View>
  );
};

export default Handle_img_picker;
