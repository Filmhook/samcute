import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, ImageBackground, Alert } from 'react-native'
// import Swiper from 'react-native-swiper'
import Biography from './BioGraphy'
import Bodymeasurement from './BodyMeasurements'
import Professionalinfo from './Professional_Info'
import Education from './Education'
import Profession from './Profession'
import CurrentIndustry from './Current_Industry'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Swiper from 'react-native-swiper'
import MyActivities from './MyActivities'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

// for firebase sirestore 
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import {getFirestore, query, collection, getDocs, where } from 'firebase/firestore';
// import { app ,database } from '../../../../FirebaseConfig';
// for firebase sirestore 

export default function ProfileRoot() {

  const [userData, setUserData] = useState(null);


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
      width:  400,
      height:  500,
      compressImageQuality: 1,
    }).then(image => {
      setSelectedImage({ uri: image.path });
      setShowGallery(false);
      // Here you can send a request to your backend to update the profile picture
    }).catch(error => {
      console.log('ImagePicker Error: ', error);
    });
  };

  const [showGalleryCover, setShowGalleryCover] = useState(false);
  const [selectedImageCover, setSelectedImageCover] = useState(null);

  const openGalleryCover = () => {
    ImagePicker.openPicker({
      cropping: true,
      width:  400,
      height:  500,
      compressImageQuality: 1,
    }).then(image => {
      setSelectedImage({ uri: image.path });
      setShowGallery(false);
      // Here you can send a request to your backend to update the profile picture
    }).catch(error => {
      console.log('ImagePicker Error: ', error);
    });
  };




  //forfirebase data save 

  // const [fetchData, setFetchData] = useState([]);
  // const [loading , setLoading] = useState(false);

  // Accessing properties
  //const user = fetchData[0]
  // Accessing properties


  //   useEffect(() => {

  //             const auth = getAuth(app);
  //             let unsubscribe; 

  //         const fetchUserData = async (userUid) => {
  //               console.log(userUid);
  //     // Firestore Schema
  //         const firestore = getFirestore(app)
  //         const collectionName = 'IndutryUser';
  //         const collectionName1 = 'IndutryUser';
  //         const collectionName2 = 'userProfile';
  //    // Firestore Schema

  //     try{
  //       setLoading(true);

  //       const postQuery = query(collection(firestore,collectionName),
  //        where('AutoUid','==',userUid)
  //        );

  //       const querySnapshot = await getDocs(postQuery)

  //       const data = querySnapshot.docs.map( doc => {
  //         return {
  //             ...doc.data()
  //         }  
  //       });

  //       setFetchData(data);
  //       setLoading(false);

  //     }catch(err){
  //        setLoading(false);
  //        console.log('Error fetching data:',err);
  //     }
  //   }; 

  //   const getUserUid = async () => {
  //    unsubscribe = onAuthStateChanged(auth, (user) => {
  //      if (user) {
  //        const userUid = user.uid;
  //        // Fetch user data using the obtained UID
  //        fetchUserData(userUid);
  //      }
  //    });
  //  };

  //  getUserUid();

  //  // Cleanup the subscription when the component is unmounted
  //  return () => {
  //    if (unsubscribe) {
  //     unsubscribe();
  //    }
  //  };

  // }, []);

  const [coverPics, setCoverPics] = useState([
    require('../../../Assets/app_logo/8641606.jpg'),
    require('../../../Assets/app_logo/8641612.jpg'),
    require('../../../Assets/app_logo/8641615.jpg'),
    require('../../../Assets/app_logo/8641600.jpg'),
    require('../../../Assets/app_logo/8641606.jpg'),
    require('../../../Assets/app_logo/8641612.jpg'),
    require('../../../Assets/app_logo/8641615.jpg'),
    require('../../../Assets/app_logo/8641600.jpg'),
    require('../../../Assets/app_logo/8641606.jpg'),
    require('../../../Assets/app_logo/8641612.jpg'),
    require('../../../Assets/app_logo/8641615.jpg'),
    require('../../../Assets/app_logo/8641600.jpg'),
    require('../../../Assets/app_logo/8641606.jpg'),
    require('../../../Assets/app_logo/8641612.jpg'),
    require('../../../Assets/app_logo/8641615.jpg'),
    require('../../../Assets/app_logo/8641600.jpg'),
  ]);





  return (
    <>

      <ScrollView style={styles.container}>
        {/* <TouchableOpacity style={style.bgprofile}>
            <Image source={{ uri: coverPic }} style={style.coverimage} />
          </TouchableOpacity>
          <View style={style.profilPic}>
            <TouchableOpacity >
               <Image source={{ uri: profilePic }} style={style.profileimage} />
            </TouchableOpacity>
          </View> */}
        <Swiper
          style={styles.bgprofile}
          paginationStyle={styles.pagination}
          dot={styles.dotStyle}
        >
          {coverPics.slice(0, 7).map((coverPic, index) => (
            <View key={index} style={styles.bgprofile}>
              <Image source={coverPic} style={styles.coverimage} />
            </View>
          ))}
        </Swiper>






        {/* <View style={style.profilPic}>
            <TouchableOpacity >
              <Image source={{ uri: profilePic }} style={style.profileimage} />
            </TouchableOpacity>
          </View> */}
        <View style={styles.profilPic}>
          <TouchableOpacity onPress={openGallery}>
            <Image source={selectedImage ? selectedImage : require('../../../Assets/app_logo/8641606.jpg')} style={styles.profileImage}  resizeMode='stretch' />
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
        {/* ... Other components ... */}




        {/* <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={style.modalContainer}>
            <Image source={{ uri: selectedImage }} style={style.fullscreenImage} />
            <TouchableOpacity style={style.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={style.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal> */}
        {/* //////////////////////////////////////////////////////*/}




        <View style={{ marginTop: responsiveHeight(-21), marginLeft: responsiveWidth(44), }}>
          <Text style={styles.profile_name}>SRK</Text>

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

        <MyActivities />


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
    width:responsiveWidth(60),
    marginBottom: 10,
    justifyContent:'center',
    alignItems:'center',borderRadius:responsiveWidth(3)
  },
  selectButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight:'500',
    
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: responsiveWidth(2),
    width:responsiveWidth(60),
    marginBottom: 10,
    justifyContent:'center',
    alignItems:'center',borderRadius:responsiveWidth(3)
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight:'500',
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
