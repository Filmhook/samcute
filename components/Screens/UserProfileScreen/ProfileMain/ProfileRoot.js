import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground, Alert } from 'react-native'
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
import Modal from 'react-native-modal';

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
    setShowGallery(true);
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
      width: 400,
      height: 500,
      compressImageQuality: 1,
    })
      .then((image) => {
        let generateName = image.path.split('/')[image.path.split('/')?.length - 1];
        setSelectedImage({ uri: image.path, type: image.mime, name: generateName });
        console.log('images', { uri: image.path, type: image.mime, name: generateName });
        setShowGallery(false);
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const openImagePicker = () => {
    ImagePicker.openPicker({
      cropping: true,
      width: 400,
      height: 500,
      compressImageQuality: 1,
    })
      .then((image) => {
        let generateName = image.path.split('/')[image.path.split('/')?.length - 1];
        setSelectedImage({ uri: image.path, type: image.mime, name: generateName });
        console.log('images', { uri: image.path, type: image.mime, name: generateName });
        setShowGallery(false);
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };

  useEffect(() => {
    if (selectedImage) {
      handleUpload();
    }
  }, [selectedImage]);

  const handleUpload = async () => {
    try {
      if (!selectedImage) return; // No image selected
  
      const id = await AsyncStorage.getItem('userId');
      const jwt = await AsyncStorage.getItem('jwt');
  
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
  
      const response = await privateAPI.post(
        'user/saveProfilePhoto',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
           
          },
        }
      );
  
      console.log('Profile pic upload response:', response.data); // Log the entire response object
  
      if (response.data && response.data.status === 1) {
        console.log('Profile pic uploaded successfully.');
        fetchProfilePicture();
        Alert.alert('Success', 'Profile picture updated successfully.');
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      // Handle upload error
      Alert.alert('Error', 'There was an error uploading the profile picture. Please try again.');
    }
  };
  const handleDeleteProfile = async () => {
    try {
      const id = await AsyncStorage.getItem('userId');

      const response = await privateAPI.post(`user/deleteProfilePic`, {
        userId: id
      });
      fetchProfilePicture();
      Alert.alert('Deleted', 'ProfilePic deleted')
      console.log("delete response ", response.data)
    } catch (error) {
      console.log("delete profile error", error)
    }
  };

  const fetchProfilePicture = async () => {
    try {
      const jwt = await AsyncStorage.getItem('jwt');
      const id = await AsyncStorage.getItem('userId');

      const myHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      };

      const requestData = {
        userId: id
      };

      const response = await privateAPI.post(
        'user/getProfilePic',
        requestData,
       
      );

      const data = response.data;

      if (data.status === 1) {
        const profilePicUrl = data.data.filePath;
        setImageURL(profilePicUrl);
        console.log('Profile pic found successfully:', profilePicUrl);
      } else {
        setImageURL(null);
        console.log('Profile pic not found:', data.message);
      }
    } catch (error) {
      console.error('Error fetching profile picture:', error);
    }
  };


  const [selectedImageCover, setSelectedImageCover] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);


  const [showGalleryCover, setShowGalleryCover] = useState(false);
  const [selectedImagesCover, setSelectedImagesCover] = useState([]);

  const openGalleryCover = () => {
    setShowGalleryCover(true);
  };

  const openCameraCover = () => {
    ImagePicker.openCamera({
      cropping: true,
      width: 400,
      height: 500,
      compressImageQuality: 1,
    })
      .then((image) => {
        let generateName = image.path.split('/')[image.path.split('/')?.length - 1];
        setSelectedImage({ uri: image.path, type: image.mime, name: generateName });
        console.log('images', { uri: image.path, type: image.mime, name: generateName });
        setShowGallery(false);
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const openGalleryCovernew = () => {
    ImagePicker.openPicker({
      multiple: true,
      cropping: true,
      width: 400,
      height: 500,
      compressImageQuality: 1,
    })
      .then((images) => {
        const formattedImages = images.map((image) => {
          let generateName = image.path.split('/')[image.path.split('/')?.length - 1];
          return { uri: image.path, type: image.mime, name: generateName };
        });

        setSelectedImagesCover(formattedImages);
        console.log('Selected images:', formattedImages);
        setShowGalleryCover(false);
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };

  useEffect(() => {
    if (selectedImagesCover.length > 0) {
      selectedImagesCover.forEach(image => {
        handleUploadCover(image);
      });
    }
  }, [selectedImagesCover]);

  const handleUploadCover = async (image) => {
    try {
      if (!image) return; // No image provided
  
      const id = await AsyncStorage.getItem('userId');
      const jwt = await AsyncStorage.getItem('jwt');
  
      const formData = new FormData();
      formData.append('userId', id);
      const imageUriParts = image.uri.split('.');
      const fileType = imageUriParts[imageUriParts.length - 1];
      formData.append('coverPhoto.files', {
        uri: image.uri,
        type: `image/${fileType}`,
        name: `image.${fileType}`,
      });
      formData.append('coverPhoto.description', 'Cover Pic');
  
      const response = await axios.post(
        'https://filmhook.annularprojects.com/filmhook-0.1/user/saveCoverPhoto',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + jwt,
          },
        }
      );
  
      console.log('Cover pic upload response:', response.data); // Log the entire response object
  
      if (response.data && response.data.status === 1) {
        console.log('Cover pic uploaded successfully.');
        fetchCover();
        Alert.alert('Success', 'Cover picture updated successfully.');
      } else {
        console.error('Cover pic upload failed:', response.data.message);
        Alert.alert('Error', 'Cover picture upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading cover picture:', error);
      Alert.alert('Error', 'There was an error uploading the cover picture. Please try again.');
    }
  };

  const [coverPics, setCoverPics] = useState([]);


  const handleDeleteCover = async () => {
    try {
      const id = await AsyncStorage.getItem('userId');

      const response = await privateAPI.post(`user/deleteCoverPic`, {
        userId: id
      });
      fetchCover();
      console.log("delete response ", response.data)
    } catch (error) {
      console.log("delete cover error", error)
    }
  };
  const fetchCover = async () => {
    try {
      const id = await AsyncStorage.getItem("userId");
      console.log("userId from async", id);
      const response = await privateAPI.post(`user/getCoverPic`, {
        userId: id
      });
      const responseData = response.data;

      // Log the entire responseData object to see its structure

      // Check if responseData contains 'data' property and it's an array
      if (responseData && responseData.data && Array.isArray(responseData.data)) {
        // Accessing the array of cover pic objects
        const coverPicsData = responseData.data;

        // Set coverPics state with the array of cover pic objects
        setCoverPics(coverPicsData);
      } else {
        console.error("Invalid data format in API response.");
      }



    } catch (error) {
      console.error(error);
    }
  }

  const [followingCount, setFollowingCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  useEffect(() => {
    const followingCount = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        const response = await privateAPI.get(`friendRequest/getFriendRequest?userId=${id}`);
        const data = response.data.data;
        if (data && data.followingList) {
          setFollowingCount(data.followingList.length); // Set the count of following
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    followingCount()
  }, [followingCount])

  useEffect(() => {
    const followerCount = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        const response = await privateAPI.get(`friendRequest/getFriendRequest?userId=${id}`);
        const data = response.data.data;
        if (data && data.followersList) {
          setFollowerCount(data.followersList.length); // Set the count of following
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    followerCount()
  }, [followerCount]);
  useEffect(() => {
    fetchCover();
    fetchProfilePicture();
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
              <Image source={{ uri: coverPic.filePath }} style={styles.coverimage} />
            </View>
          ))}
        </Swiper>
        <Modal visible={showGalleryCover} animationType="slide">
          <View style={{ backgroundColor: '#ffffff', padding: responsiveWidth(2), borderRadius: responsiveWidth(2), }}>
            <TouchableOpacity style={{ padding: responsiveWidth(2) }} onPress={openCameraCover}>
              <Text style={{color:'black'}}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: responsiveWidth(2) }} onPress={openGalleryCovernew}>
              <Text style={{color:'black'}}>Upload your Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: responsiveWidth(2) }} onPress={handleDeleteCover}>
              <Text style={{color:'black'}}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowGalleryCover(false)} style={{ padding: responsiveWidth(2) }} >
              <Text style={{color:'black'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity onPress={openGalleryCover}>

          <Icon name="camera" size={15} color="#fff" style={styles.cameraIconC} />
        </TouchableOpacity>


        <View style={styles.profilPic}>
          {imageURL ? (
            <Image source={{ uri: imageURL }} style={styles.profileImage} resizeMode='stretch' />
          ) : (
            <Text style={styles.noProfileText}>No profile pic</Text>
          )}
          <Modal visible={showGallery} animationType="slide">
            <View style={{ backgroundColor: '#ffffff', padding: responsiveWidth(2), borderRadius: responsiveWidth(2), }}>
              <TouchableOpacity style={{ padding: responsiveWidth(2) }} onPress={openCamera}>
                <Text style={{color:'black'}}>Open Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ padding: responsiveWidth(2) }} onPress={openImagePicker}>
                <Text style={{color:'black'}}>Upload your Image</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ padding: responsiveWidth(2) }} onPress={handleDeleteProfile}>
                <Text style={{color:'black'}}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowGallery(false)} style={{ padding: responsiveWidth(2) }} >
                <Text style={{color:'black'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        <TouchableOpacity onPress={openGallery} style={{ width: responsiveWidth(8), height: responsiveWidth(8), borderRadius: responsiveWidth(8), position: 'absolute', top: responsiveHeight(32), left: responsiveWidth(31), justifyContent: 'center', alignItems: 'center' }} >

          <Icon name="camera" size={11} color="#fff" style={styles.cameraIcon} />
        </TouchableOpacity>
        <View style={{ marginTop: responsiveHeight(-21), marginLeft: responsiveWidth(44), }}>
          <Text style={styles.profile_name}>{userName}</Text>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.followers} >

              <Text style={styles.followers_text}>{followerCount} Followers</Text>

            </TouchableOpacity>
            <TouchableOpacity style={styles.followings}>
              <Text style={styles.followings_text}>{followingCount} Followings</Text>
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







        <Biography />


        <Bodymeasurement />

        <Professionalinfo />

        <Education />

        <CurrentIndustry />


        <Profession />

        {/* <MyActivities /> */}
        <Myactive />


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
    borderRadius: responsiveWidth(6),
    // borderWidth:1,
    top: responsiveHeight(-12),
    left: responsiveWidth(0.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
    // backgroundColor: "#C1E7FA"
  },
  noProfileText: {
    color: 'black',
    fontSize: responsiveFontSize(2),
    top: responsiveHeight(1)
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
  cameraIconC: {
    position: 'absolute',
    bottom: 1,
    right: 10,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',

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
    top: responsiveHeight(2),
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