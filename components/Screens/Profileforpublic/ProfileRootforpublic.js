import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, ImageBackground } from 'react-native'
import Swiper from 'react-native-swiper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Biographyforpublic from './Biographyforpublic'
import BodyMeasurementforpublic from './BodyMeasurementforpublic'
import Professional_infoforpublic from './Professional_infoforpublic'
import Educationforpublic from './Educationforpublic'
import Current_industryforpublic from './Current_industryforpublic'
import Professionforpublic from './Professionforpublic'
import MyActivitiesforpublic from './MyActivitiesforpublic'
export default function ProfileRootforpublic() {
    const [coverPic, setCoverpic] = useState(null)

    const [profilePic, setProfilepic] = useState(null)
  
    const [selectedImage, setSelectedImage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
  
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
      require('../../../Assets/app_logo/l8641606.jpg'),
      require('../../../../Assets/app_logo/8641612.jpg'),
      require('../../../../Assets/app_logo/8641615.jpg'),
      require('../../../../Assets/app_logo/8641600.jpg'),
      require('../../../../Assets/app_logo/8641606.jpg'),
      require('../../../../Assets/app_logo/8641612.jpg'),
      require('../../../../Assets/app_logo/8641615.jpg'),
      require('../../../../Assets/app_logo/8641600.jpg'),
      require('../../../../Assets/app_logo/8641606.jpg'),
      require('../../../../Assets/app_logo/8641612.jpg'),
      require('../../../../Assets/app_logo/8641615.jpg'),
      require('../../../../Assets/app_logo/8641600.jpg'),
      require('../../../../Assets/app_logo/8641606.jpg'),
      require('../../../../Assets/app_logo/8641612.jpg'),
      require('../../../../Assets/app_logo/8641615.jpg'),
      require('../../../../Assets/app_logo/8641600.jpg'),
    ]);
  
  
  
    return (
      <>
  
        <ScrollView style={style.container}>
          {/* <TouchableOpacity style={style.bgprofile}>
              <Image source={{ uri: coverPic }} style={style.coverimage} />
            </TouchableOpacity>
            <View style={style.profilPic}>
              <TouchableOpacity >
                 <Image source={{ uri: profilePic }} style={style.profileimage} />
              </TouchableOpacity>
            </View> */}
          <Swiper
            style={style.bgprofile}
            paginationStyle={style.pagination}
            dot={style.dotStyle}
          >
            {coverPics.slice(0, 7).map((coverPic, index) => (
              <View key={index} style={style.bgprofile}>
                <Image source={coverPic} style={style.coverimage} />
              </View>
            ))}
          </Swiper>
  
  
          {/* <View style={style.profilPic}>
              <TouchableOpacity >
                <Image source={{ uri: profilePic }} style={style.profileimage} />
              </TouchableOpacity>
            </View> */}
          <View style={style.profilPic}>
            <TouchableOpacity >
              <Image source={require('../../Assets/app_logo/8641606.jpg')} style={style.profileimage} />
            </TouchableOpacity>
          </View>
          {/* ... Other components ... */}
  
  
          <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
            <View style={style.modalContainer}>
              <Image source={{ uri: selectedImage }} style={style.fullscreenImage} />
              <TouchableOpacity style={style.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={style.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          {/* //////////////////////////////////////////////////////*/}
  
  
          <View style={{ marginTop: responsiveHeight(-21), marginLeft: responsiveWidth(44), }}>
            <Text style={style.profile_name}>SRK</Text>
  
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={style.followers}>
  
                <Text style={style.followers_text}>10Followers</Text>
  
              </TouchableOpacity>
              <TouchableOpacity style={style.followings}>
                <Text style={style.followings_text}>10Followings</Text>
              </TouchableOpacity>
            </View>
            {/* //////////////////////////////////////////////////////*/}
            <View style={{ flexDirection: "row", position: "absolute", top: responsiveHeight(10), left: responsiveWidth(-39), }}>
              <Text style={style.review}>Reviews </Text>
              <View style={style.review_box}>
                <Text style={style.review_num}>9.9</Text>
                <Image source={require("../../../Assets/Userprofile_And_Fonts/star.png")} style={style.review_img} />
              </View>
            </View>
          </View>
  
  
          <Biographyforpublic />
  
          {/* <Biography user={user}/> */}
  
          <BodyMeasurementforpublic />
  
          <Professional_infoforpublic />
  
          <Educationforpublic />
  
          <Current_industryforpublic />
  
          {/* <CurrentIndustry user={user}/> */}
  
          <Professionforpublic />
  
          <MyActivitiesforpublic />
  
  
        </ScrollView>
  
      </>
    )
  }
  
  const style = StyleSheet.create({
    container: {
      flex: 1,
     // height: '100%'
    },
    bgprofile: {
      height: responsiveHeight(24),
      borderWidth: 1,
      backgroundColor: "#F4EEE8"
    },
    profilPic: {
      height: responsiveHeight(24),
      width: responsiveWidth(35),
      borderRadius: responsiveWidth(5),
      // borderWidth:1,
      top: responsiveHeight(-12),
      borderColor:"black",
      borderWidth:responsiveWidth(0.7),
      left: responsiveWidth(0.5),
      // backgroundColor: "#C1E7FA"
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
    }
  })