import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, ImageBackground, Alert } from 'react-native'
import Biography from './BioGraphy'
import Bodymeasurement from './BodyMeasurements'
import Professionalinfo from './Professional_Info'
import Education from './Education'
import Profession from './Profession'
import CurrentIndustry from './Current_Industry'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Swiper from 'react-native-swiper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Myactive from './Myactive'
import privateAPI from '../../../api/privateAPI'
import { method } from 'lodash'

export default function ProfileRoot() {

  const [userData, setUserData] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      const username = await AsyncStorage.getItem('username');
      setUserName(username);
    }
    fetchUserName();
  });



  // const [selectedImage, setSelectedImage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);



  const openModal = () => {

    setModalVisible(true);
    // setModalVisible(false);

  };

  const closeModal = () => {
    setModalVisible(false);

  };

  const handleImage1Press = () => {
    // Function to navigate or perform action for image 1
    console.log('Image 1 pressed');
    setModalVisible(false);
  };

  const handleImage2Press = () => {
    // Function to navigate or perform action for image 2
    console.log('Image 2 pressed');
    setModalVisible(false);
  };

  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openGallery = () => {
    ImagePicker.openPicker({
      cropping: true,
      width: 400,
      height: 500,
      compressImageQuality: 1,
    }).then(image => {
      let generateName = image.path.split("/")[image.path.split("/")?.length - 1]

      setSelectedImage({ uri: image.path, type: image.mime, name: generateName });
      setShowGallery(false);
      handleUpload(); // Call handleUpload to upload the selected profile picture
    }).catch(error => {
      console.log('ImagePicker Error: ', error);
    });
  };

  const handleUpload = async () => {
    try {
      if (!selectedImage) return; // No image selected

      const id = await AsyncStorage.getItem('userId');

      const myHeaders = new Headers();
      const jwt = await AsyncStorage.getItem('jwt');
      myHeaders.append('Authorization', 'Bearer ' + jwt);

      const formData = new FormData();
      formData.append('userId', id);
      const imageUriParts = selectedImage.uri.split('.');
      const fileType = imageUriParts[imageUriParts.length - 1];
      formData.append('profilePhoto.files', {
        uri: selectedImage.uri,
        type: `image/${fileType}`,
        name: `image.${fileType}`,
      });
      formData.append('profilePhoto.description', 'Profile Pic');

      const requestOptions = {
        body: formData,
        headers: myHeaders,
        method: 'POST',
        redirect: 'follow',
      };

      const response = await fetch(
        'https://filmhook.annularprojects.com/filmhook-0.0.1-SNAPSHOT/user/saveProfilePhoto',
        requestOptions
      );
      const data = await response.json();

      console.log('Profile pic upload response:', data); // Log the entire response object

      if (data && data.status === 1) {
        console.log('Profile pic uploaded successfully.');


      } else {
        console.error('Profile pic upload failed:', data.message);
        // Handle upload failure
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      // Handle upload error
    }
  };
  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const jwt = await AsyncStorage.getItem('jwt');
        const id = await AsyncStorage.getItem('userId');

        const myHeaders = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwt
        };

        const requestData = {
          userId: id
        };

        const response = await privateAPI.post('user/getProfilePic', requestData, { headers: myHeaders });

        const data = response.data; // Extract response data

        if (data.status === 1) {
          const profilePicUrl = data.data.filePath; // Extract filePath from response
          setImageURL(profilePicUrl); // Update state with profile picture URL
          console.log('Profile pic found successfully:', profilePicUrl);
        } else {
          throw new Error('Failed to fetch profile picture');
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };

    fetchProfilePicture();
  }, []);











  const [showGalleryCover, setShowGalleryCover] = useState(false);
  const [selectedImageCover, setSelectedImageCover] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);



  const openGalleryCover = () => {
    ImagePicker.openPicker({
      cropping: true,
      width: 400,
      height: 500,
      compressImageQuality: 1,
    }).then(image => {
      let generateName = image.path.split("/")[image.path.split("/")?.length - 1]

      setSelectedImageCover({ uri: image.path, type: image.mime, name: generateName });
      setShowGalleryCover(false);
      handleUploadCover(); // Call handleUploadCover to upload the selected cover picture
    }).catch(error => {
      console.log('ImagePicker Error: ', error);
    });
  };


  const handleUploadCover = async () => {
    try {
      if (!selectedImageCover) return; // No cover image selected

      const id = await AsyncStorage.getItem('userId');

      const myHeaders = new Headers();
      const jwt = await AsyncStorage.getItem('jwt');
      myHeaders.append('Authorization', 'Bearer ' + jwt);

      const formData = new FormData();
      formData.append('userId', id);
      const imageUriParts = selectedImageCover.uri.split('.');
      const fileType = imageUriParts[imageUriParts.length - 1];
      formData.append('coverPhoto.files', {
        uri: selectedImageCover.uri,
        type: `image/${fileType}`,
        name: `image.${fileType}`,
      });
      formData.append('coverPhoto.description', 'Cover Pic');

      const requestOptions = {
        body: formData,
        headers: myHeaders,
        method: 'POST',
        redirect: 'follow',
      };

      const response = await fetch(
        'https://filmhook.annularprojects.com/filmhook-0.0.1-SNAPSHOT/user/saveCoverPhoto',
        requestOptions
      );
      const data = await response.json();

      console.log('Cover pic upload response:', data); // Log the entire response object

      if (data && data.status === 1) {
        console.log('Cover pic uploaded successfully.');
      } else {
        console.error('Cover pic upload failed:', data.message);
        // Handle upload failure
      }
    } catch (error) {
      console.error('Error uploading cover picture:', error);
      // Handle upload error
    }
  };


  const [coverPics, setCoverPics] = useState([]);

  useEffect(() => {
    const fetchCover = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        console.log("userId from async", id);
        const response = await privateAPI.post(`user/getCoverPic`, {
          userId: id
        });
        const responseData = response.data;

        // Log the entire responseData object to see its structure
        console.log("Data from API:", responseData);

        // Check if responseData contains 'data' property and it's an array
        if (responseData && responseData.data && Array.isArray(responseData.data)) {
          // Accessing the array of cover pic objects
          const coverPicsData = responseData.data;
          console.log("Cover pics data:", coverPicsData);

          // Set coverPics state with the array of cover pic objects
          setCoverPics(coverPicsData);
        } else {
          console.error("Invalid data format in API response.");
        }



      } catch (error) {
        console.error(error);
      }
    }
    fetchCover();
  }, []);


  return (
    <>

      <ScrollView style={styles.container}>


        <Swiper
          style={styles.bgprofile}
          paginationStyle={styles.pagination}
          dot={styles.dotStyle}
        >
          {/* Check if coverPics is an array before mapping */}
          {Array.isArray(coverPics) && coverPics.length > 0 && coverPics.map((coverPic, index) => (
            <View key={index} style={styles.bgprofile}>
              <TouchableOpacity onPress={openGalleryCover}>
                <Image source={{ uri: coverPic.filePath }} style={styles.coverimage} />
                <Icon name="camera" size={15} color="#fff" style={styles.cameraIconC} />
              </TouchableOpacity>
            </View>
          ))}
        </Swiper>


        <View style={styles.profilPic}>
          <TouchableOpacity onPress={openGallery}>
            <Image source={{ uri: imageURL }} style={styles.profileImage} resizeMode='stretch' />
            <Icon name="camera" size={11} color="#fff" style={styles.cameraIcon} />
          </TouchableOpacity>
          <Modal visible={showGallery} animationType="slide">
            <View style={styles.modalContainerP}>
              <Text style={styles.title}>Select Profile Picture</Text>
              <TouchableOpacity onPress={openGallery} style={styles.selectButton}>
                <Text style={styles.selectButtonText}>Select from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowGallery(false)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        <View style={{ marginTop: responsiveHeight(-21), marginLeft: responsiveWidth(44), }}>
          <Text style={styles.profile_name}>{userName}</Text>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.followers}>

              <Text style={styles.followers_text}>10Followers</Text>

            </TouchableOpacity>
            <TouchableOpacity style={styles.followings}>
              <Text style={styles.followings_text}>10Followings</Text>
            </TouchableOpacity>

          </View>
          {/* //////////////////////////////////////////////////////*/}
          <View style={{ flexDirection: "row", position: "absolute", top: responsiveHeight(10), left: responsiveWidth(-39), }}>
            <Text style={styles.review}>Reviews </Text>
            <View style={styles.review_box}>
              <Text style={styles.review_num}>9.9</Text>
              <Image source={require("../../../Assets/Userprofile_And_Fonts/star.png")} style={styles.review_img} />
            </View>
          </View>
        </View>

        <View style={{ position: 'absolute', top: responsiveHeight(60), marginLeft: responsiveWidth(5) }}>
          <TouchableOpacity onPress={() => openModal()}  >
            <Image source={require('../../../Assets/Userprofile_And_Fonts/nine-Icons/Chats-Menu.png')} style={{ width: responsiveWidth(12), height: responsiveHeight(5) }} />
          </TouchableOpacity>

          <Modal
            visible={modalVisible}
            transparent={true}
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={handleImage1Press} >
                <Image source={require('../../../Assets/Userprofile_And_Fonts/nine-Icons/hire.png')} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleImage2Press}>
                <Image source={require('../../../Assets/Userprofile_And_Fonts/nine-Icons/remove.png')} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal}>
                <Image source={require('../../../Assets/Userprofile_And_Fonts/nine-Icons/pin.png')} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal}>
                <Image source={require('../../../Assets/Userprofile_And_Fonts/nine-Icons/chat.png')} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal}>
                <Image source={require('../../../Assets/Userprofile_And_Fonts/nine-Icons/call.png')} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal}>
                <Image source={require('../../../Assets/Userprofile_And_Fonts/nine-Icons/project.png')} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal}>
                <Image source={require('../../../Assets/Userprofile_And_Fonts/nine-Icons/block.png')} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal}>
                <Image source={require('../../../Assets/UserProfile_Icons_Fonts/Booking.png')} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal}>
                <Image source={require('../../../Assets/Userprofile_And_Fonts/nine-Icons/market.png')} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>




            </View>
          </Modal>
        </View> 



        <Biography />


        <Bodymeasurement />

        <Professionalinfo />

        <Education />

        <CurrentIndustry />


        <Profession />

        {/* <MyActivities /> */}
        {/* <Myactive /> */}


      </ScrollView>

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  },

  bgprofile: {
    height: responsiveHeight(24),
    borderWidth: 1,
    backgroundColor: "#F4EEE8"
  },
  profilPic: {
    height: responsiveHeight(25),
    width: responsiveWidth(35),
    borderRadius: responsiveWidth(5),
    // borderWidth:1,
    top: responsiveHeight(-12),
    left: responsiveWidth(0.5),
    // backgroundColor: "#C1E7FA"
  },
  modalContainer: {
    // flex: 1,
    // padding:30,
    margin: 50,
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    columnGap: responsiveWidth(3),
    rowGap: responsiveHeight(2),
    position: 'absolute',
    alignItems: 'center',
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundColor: 'gray',
    flexDirection: 'row',
    width: responsiveWidth(40),
    height: responsiveHeight(20),
    top: responsiveHeight(40),
    left: responsiveWidth(1),
    elevation: 2



  },
  coverimage: {
    width: "100%",
    height: "100%",
  },
  profileimage: {
    width: "100%",
    height: "100%",
    borderRadius: responsiveWidth(5),

  },
  profile_name: {
    fontWeight: "bold",
    fontSize: responsiveFontSize(3.5),
    color: "#323232"
  },
  review: {
    fontSize: responsiveFontSize(2.3),
    color: "#323232",
    marginTop: responsiveHeight(0.7),
    //fontWeight:"bold"
  },
  review_box: {
    marginTop: responsiveHeight(0.8),
    backgroundColor: "black",
    width: responsiveWidth(12),
    height: responsiveHeight(3.3),
    borderRadius: responsiveWidth(2)
  },
  review_num: {
    fontSize: responsiveFontSize(1.8),
    color: "#FFFF",
    marginLeft: responsiveWidth(1.5),
    marginTop: responsiveHeight(0.4),
    fontWeight: "bold"
  },
  review_img: {
    position: 'absolute',
    width: responsiveWidth(3),
    height: responsiveHeight(2),
    left: responsiveWidth(7),
    top: responsiveHeight(0.5)

  },
  followers: {
    borderWidth: 1,
    height: responsiveHeight(4.8),
    width: responsiveWidth(26),
    borderRadius: responsiveWidth(2),
    marginTop: responsiveHeight(2),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#949EE9"
  },
  cameraIcon: {
    position: 'absolute',
    right: -19,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 8,
    borderRadius: 12,
  },
  followings: {
    borderWidth: 1,
    height: responsiveHeight(4.8),
    width: responsiveWidth(26),
    borderRadius: responsiveWidth(2),
    marginLeft: responsiveWidth(2),
    marginTop: responsiveHeight(2),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#999999"
  },
  followers_text: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: "bold",
    color: "#001AD9",
  },
  followings_text: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: "bold",
    color: "#E4E4E4",
  },
  pagination: {
    bottom: 7,
    left: 10
  },
  profileImage: {
    width: responsiveHeight(18),
    height: responsiveHeight(25),
    borderRadius: responsiveWidth(3),
  },
  modalContainerP: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    marginBottom: 20,
  },
  selectButton: {
    backgroundColor: '#007bff',
    padding: responsiveWidth(2),
    width: responsiveWidth(60),
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center', borderRadius: responsiveWidth(3)
  },
  selectButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: '500',

  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: responsiveWidth(2),
    width: responsiveWidth(60),
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center', borderRadius: responsiveWidth(3)
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
  },


})


// import React, { useState } from 'react';
// import { StyleSheet, View, Image, TouchableOpacity, Modal, Text } from 'react-native';
// import Swiper from 'react-native-swiper';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import ImagePicker from 'react-native-image-crop-picker'; // Import the image picker library

// const MyComponent = () => {
//   const [showGallery, setShowGallery] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   // Example coverPics array with local images, replace these with your actual image sources
//   const coverPics = [
//     require('../../../Assets/app_logo/8641600.jpg'),
//     require('../../../Assets/app_logo/8641600.jpg'),
//     require('../../../Assets/app_logo/8641600.jpg'),
//     // Add more images as needed
//   ];

//   const openGallery = () => {
//     // Function to open the device's image gallery
//     ImagePicker.openPicker({
//       mediaType: 'photo',
//     }).then(image => {
//       // Set the selected image URI to the response URI
//       setSelectedImage({ uri: image.path });
//       // Close the gallery modal
//       setShowGallery(false);
//     }).catch(error => {
//       console.log('ImagePicker Error: ', error);
//     });
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <TouchableOpacity onPress={() => setShowGallery(true)}>
//         <Swiper
//           style={styles.bgprofile}
//           paginationStyle={styles.pagination}
//           dot={<View style={styles.dotStyle} />}
//           activeDot={<View style={styles.activeDotStyle} />}
//         >
//           {coverPics.slice(0, 7).map((coverPic, index) => (
//             <View key={index} style={styles.bgprofile}>
//               <Image source={coverPic} style={styles.coverimage} />
//             </View>
//           ))}
//         </Swiper>
//       </TouchableOpacity>
//       <Modal visible={showGallery} animationType="slide">
//         <View style={styles.modalContainerP}>
//           <Text style={styles.title}>Select Profile Picture</Text>
//           <TouchableOpacity onPress={openGallery} style={styles.selectButton}>
//             <Text style={styles.selectButtonText}>Select from Gallery</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => setShowGallery(false)} style={styles.cancelButton}>
//             <Text style={styles.cancelButtonText}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainerP: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
//   selectButton: {
//     padding: 10,
//     backgroundColor: '#007bff',
//     borderRadius: 5,
//   },
//   selectButtonText: {
//     color: '#ffffff',
//   },
//   cancelButton: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: '#6c757d',
//     borderRadius: 5,
//   },
//   cancelButtonText: {
//     color: '#ffffff',
//   },
//   bgprofile: {
//     flex: 1,
//     borderWidth:1
//   },
//   coverimage: {
//     width: '100%',
//     height: '100%',
//   },
//   pagination: {
//     bottom: 10,
//   },
//   dotStyle: {
//     backgroundColor: 'rgba(0,0,0,.2)',
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     marginLeft: 3,
//     marginRight: 3,
//   },
//   activeDotStyle: {
//     backgroundColor: '#007aff',
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     marginLeft: 3,
//     marginRight: 3,
//   },
// });

// export default MyComponent;