import { View, ScrollView, TouchableOpacity, Image, StyleSheet, TextInput, Button, Modal, Text, ImageBackground, Dimensions, FlatList, Alert } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth, } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import PublicAPI from '../../api/publicAPI';
import { Appearance } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import privateAPI from '../../api/privateAPI';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';


const ProfilePic = (userId, userName) => {
  const [filePaths, setFilePaths] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filePath, setFilePath] = useState('');

  const [noCoverPic, setNoCoverPic] = useState(false);
  const [noProfilePic, setNoProfilePic] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = await AsyncStorage.getItem('jwt');
        const response = await privateAPI.post(
          'user/getCoverPic',
          { userId },

        );
        const data = response.data;
        if (data.status === 1 && data.data.length > 0) {
          const paths = data.data.map(item => item.filePath);
          setFilePaths(paths);
          setNoCoverPic(false);
        } else {
          setNoCoverPic(true);
        }
      } catch (error) {
        console.error('Error fetching file paths:', error);
        setNoCoverPic(true);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const jwt = await AsyncStorage.getItem('jwt');
        const response = await privateAPI.post(
          'user/getProfilePic',
          { userId },

        );
        const data = response.data;
        if (data.status === 1 && data.data) {
          setFilePath(data.data.filePath);
          setNoProfilePic(false);
        } else {
          setNoProfilePic(true);
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
        setNoProfilePic(true);
      }
    };

    fetchProfilePic();
  }, [userId]);

  // useEffect(() => {
  //   const fetchUserName = async () => {
  //     const username = await AsyncStorage.getItem('username');
  //     setUserName(username);
  //   };
  //   fetchUserName();
  // }, [userName]);

  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={styleProfileCover.image} />
  );

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filePaths.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? filePaths.length - 1 : prevIndex - 1));
  };
  const [followingCount, setFollowingCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  useEffect(() => {
    const followingCount = async () => {
      try {
        const response = await privateAPI.get(`friendRequest/getFriendRequest?userId=${userId}`);
        const data = response.data.data;
        if (data && data.followingList) {
          setFollowingCount(data.followingList.length); // Set the count of following
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  }, [followingCount])

  useEffect(() => {
    const followerCount = async () => {
      try {

        const response = await privateAPI.get(`friendRequest/getFriendRequest?userId=${userId}`);
        const data = response.data.data;
        if (data && data.followersList) {
          setFollowerCount(data.followersList.length); // Set the count of following
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    followerCount()
  }, [followerCount])

  const navigation = useNavigation();


  return (
    <View style={styleProfileCover.container}>

      <View style={{ height: responsiveHeight(27), borderWidth: 1 }}>
        {filePaths.length > 0 ? (
          <>
            <FlatList
              data={filePaths}
              renderItem={renderItem}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              onMomentumScrollEnd={(event) => {
                const width = Dimensions.get('window').width;
                const newIndex = Math.floor(event.nativeEvent.contentOffset.x / width);
                setCurrentIndex(newIndex);
              }}
            />
          </>
        ) : noCoverPic ? (
          <Text style={styleProfileCover.noCoverText}>No cover picture available</Text>
        ) : null}

      </View>
      <View style={styleProfileCover.profilePic}>
        {filePath ? (
          <Image source={{ uri: filePath }} style={styleProfileCover.imagePic} />
        ) : noProfilePic ? (
          <Text style={styleProfileCover.noProfileText}>No profile pic</Text>
        ) : null}
      </View>
      <View>
        <Text style={styleProfileCover.userName}>{userName}</Text>
      </View>
      <View style={{ flexDirection: 'row', position: 'absolute', top: '92%', left: '43%' }}>
        <TouchableOpacity style={styleProfileCover.followers} onPress={() => navigation.navigate('FollowersList', { userId })}>
          <Text style={styleProfileCover.followers_text}>{followerCount} Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styleProfileCover.followings} onPress={() => navigation.navigate('FollowingList', { userId })}>
          <Text style={styleProfileCover.followings_text}>{followingCount} Followings</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', position: 'absolute', top: '105%', left: '5%' }}>
        <Text style={styleProfileCover.review}>Reviews</Text>
        <View style={styleProfileCover.review_box}>
          <Text style={styleProfileCover.review_num}>9.9</Text>
          <Image source={require('../../Assets/Userprofile_And_Fonts/star.png')} style={styleProfileCover.review_img} />
        </View>
      </View>
    </View>
  );
};

const styleProfileCover = StyleSheet.create({
  container: {
    flex: 1
  },
  followers: {
    borderWidth: 1,
    height: responsiveHeight(4.8),
    width: responsiveWidth(26),
    borderRadius: responsiveWidth(2),
    marginTop: responsiveHeight(2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#949EE9'
  },
  followings: {
    borderWidth: 1,
    height: responsiveHeight(4.8),
    width: responsiveWidth(26),
    borderRadius: responsiveWidth(2),
    marginLeft: responsiveWidth(2),
    marginTop: responsiveHeight(2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#999999'
  },
  followings_text: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    color: '#E4E4E4'
  },
  followers_text: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    color: '#001AD9'
  },
  review: {
    fontSize: responsiveFontSize(2.3),
    color: '#323232',
    marginTop: responsiveHeight(0.7)
  },
  review_box: {
    marginTop: responsiveHeight(0.8),
    backgroundColor: 'black',
    width: responsiveWidth(12),
    height: responsiveHeight(3.3),
    borderRadius: responsiveWidth(2)
  },
  review_num: {
    fontSize: responsiveFontSize(1.8),
    color: '#FFFF',
    marginLeft: responsiveWidth(1.5),
    marginTop: responsiveHeight(0.4),
    fontWeight: 'bold'
  },
  review_img: {
    position: 'absolute',
    width: responsiveWidth(3),
    height: responsiveHeight(2),
    left: responsiveWidth(7),
    top: responsiveHeight(0.5)
  },
  userName: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3.5),
    color: '#323232',
    left: responsiveWidth(38),
    margin: responsiveHeight(2)
  },
  profilePic: {
    position: 'absolute',
    height: responsiveHeight(22),
    width: responsiveWidth(38),
    marginLeft: responsiveWidth(1),
    borderRadius: responsiveWidth(6),
    top: responsiveHeight(15),
    borderWidth: 1
  },
  imagePic: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    borderRadius: responsiveWidth(5)
  },
  image: {
    width: Dimensions.get('window').width,
    height: responsiveHeight(27),
    resizeMode: 'cover',
    backgroundColor: 'Gray'

  },
  indicatorContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: '104%',
    right: responsiveWidth(50),
    borderWidth: 1
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5
  },
  activeIndicator: {
    backgroundColor: 'red'
  },
  prevButton: {
    borderWidth: 1,
    position: 'absolute',
    left: 10,
    top: '40%',
    transform: [{ translateY: -20 }]
  },
  nextButton: {
    position: 'absolute',
    right: 10,
    top: '40%',
    transform: [{ translateY: -20 }]
  },
  noCoverText: {
    fontSize: responsiveFontSize(2.3),
    color: 'black',
    textAlign: 'center',
    marginTop: responsiveHeight(10),
    //  borderWidth:1
  },
  noProfileText: {
    fontSize: responsiveFontSize(2.3),
    color: 'black',
    textAlign: 'center',
    marginTop: responsiveHeight(12)
  }
});

const Biography = (userId) => {
  const navigation = useNavigation();
  const [dob, setDob] = useState();
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [workSchedule, setWorkSchedule] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        //  const userId = await AsyncStorage.getItem('userId');
        const jwt = await AsyncStorage.getItem('jwt');
        const userType = await AsyncStorage.getItem('usertype');

        const response = await privateAPI.get(`user/getUserByUserId?userId=${userId}`, {

        });

        const user = response.data.data;
        setDob(user.dob || '');
        setGender(user.gender || '');
        setCountry(user.country || '');
        setState(user.state || '');
        setDistrict(user.district || '');
        setWorkExperience(user.workExperience || '');
        setWorkSchedule(user.workSchedule || '');
        setUserType(userType || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
        }
      }
    };

    fetchData();
  }, []);

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
    const day = formattedDate.getDate().toString().padStart(2, '0'); // Add leading zero if needed
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <View style={style.container}>
        <View style={style.bio_title}>
          <Text style={style.bio_title_text}>BIOGRAPHY</Text>
        </View>

        <View style={style.bio_content}>
          <View style={style.bio_content_section}>
            <ImageBackground
              style={style.inputContainer}
              source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
              resizeMode="stretch">
              <View
                style={{
                  marginLeft: responsiveWidth(0.2),
                  marginTop: responsiveHeight(0.5),
                  width: responsiveWidth(8),
                  height: responsiveHeight(4),
                }}>
                <Image
                  source={require('../../Assets/Userprofile_And_Fonts/update/Dob_Icon.png')}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="stretch"
                />
              </View>

              <View style={style.bioTextContainer}>
                <Text style={{
                  fontSize: responsiveFontSize(2),
                  color: '#000000',
                  fontWeight: '500',
                  fontFamily: 'Times New Roman',
                  bottom: responsiveHeight(3)
                }}>{dob}</Text>
              </View>
            </ImageBackground>
          </View>

          <View style={style.bio_content_section}>
            <ImageBackground
              style={style.inputContainer}
              source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
              resizeMode="stretch">
              <View
                style={{
                  width: responsiveWidth(7.2),
                  height: responsiveHeight(4),
                  marginLeft: responsiveWidth(1),
                  marginTop: responsiveHeight(0.5),
                }}>
                <Image
                  source={require('../../Assets/Userprofile_And_Fonts/update/Gender_Icon.png')}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>

              <View style={style.bioTextContainer}>
                <Text style={{
                  fontSize: responsiveFontSize(2),
                  color: '#000000',
                  fontWeight: '500',
                  fontFamily: 'Times New Roman',
                  bottom: responsiveHeight(3)
                }}>{gender}</Text>
              </View>
            </ImageBackground>
          </View>

          <View style={style.bio_content_section}>
            <ImageBackground
              style={style.inputContainer}
              source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
              resizeMode="stretch">
              <View
                style={{
                  width: responsiveWidth(7.2),
                  height: responsiveHeight(4),
                  marginLeft: responsiveWidth(1),
                  marginTop: responsiveHeight(0.5),
                }}>
                <Image
                  source={require('../../Assets/Userprofile_And_Fonts/update/Birthplace_icon.png')}
                  style={{ width: '70%', height: '100%' }}
                />
              </View>
              <View style={style.bioTextContainer}>
                <Text style={{
                  fontSize: responsiveFontSize(2),
                  color: '#000000',
                  fontWeight: '500',
                  fontFamily: 'Times New Roman',
                  bottom: responsiveHeight(3)
                }}>{country}</Text>
              </View>
            </ImageBackground>
          </View>

          <View style={style.bio_content_section}>
            <ImageBackground
              style={style.inputContainer}
              source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
              resizeMode="stretch">
              <View
                style={{
                  width: responsiveWidth(7.2),
                  height: responsiveHeight(4),
                  marginLeft: responsiveWidth(1),
                  marginTop: responsiveHeight(0.5),
                }}>
                <Image
                  source={require('../../Assets/Userprofile_And_Fonts/update/Leaving_Place_icon.png')}
                  style={{ width: '70%', height: '100%' }}
                />
              </View>
              <View style={style.bioTextContainer}>
                <Text style={{
                  fontSize: responsiveFontSize(2),
                  color: '#000000',
                  fontWeight: '500',
                  fontFamily: 'Times New Roman',
                  bottom: responsiveHeight(3)
                }}>{state}</Text>
              </View>
            </ImageBackground>
          </View>

          <View style={style.bio_content_section}>
            <ImageBackground
              style={style.inputContainer}
              source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
              resizeMode="stretch">
              <View
                style={{
                  width: responsiveWidth(7.2),
                  height: responsiveHeight(4),
                  marginLeft: responsiveWidth(1),
                  marginTop: responsiveHeight(0.5),
                }}>
                <Image
                  source={require('../../Assets/Userprofile_And_Fonts/update/hometown_icon.png')}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
              <View style={style.bioTextContainer}>
                <Text style={{
                  fontSize: responsiveFontSize(2),
                  color: '#000000',
                  fontWeight: '500',
                  fontFamily: 'Times New Roman',
                  bottom: responsiveHeight(3)
                }}>{district}</Text>
              </View>
            </ImageBackground>
          </View>

          {userType === 'IndustryUser' && (
            <View>
              <View style={style.bio_content_section}>
                <ImageBackground
                  style={style.inputContainer}
                  source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
                  resizeMode="stretch">
                  <View
                    style={{
                      width: responsiveWidth(7.2),
                      height: responsiveHeight(4),
                      marginLeft: responsiveWidth(1),
                      marginTop: responsiveHeight(0.5),
                    }}>
                    <Image
                      source={require('../../Assets/Userprofile_And_Fonts/update/Work_Exp.png')}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </View>
                  <View style={style.bioTextContainer}>
                    <Text style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      bottom: responsiveHeight(3)
                    }}>{workExperience}</Text>
                  </View>
                </ImageBackground>
              </View>

              <View style={style.bio_content_section}>
                <ImageBackground
                  style={style.inputContainer}
                  source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
                  resizeMode="stretch">
                  <View
                    style={{
                      width: responsiveWidth(7.2),
                      height: responsiveHeight(4),
                      marginLeft: responsiveWidth(1),
                      marginTop: responsiveHeight(0.5),
                    }}>
                    <Image
                      source={require('../../Assets/Userprofile_And_Fonts/update/Booking.png')}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </View>
                  <View style={style.bioTextContainer}>
                    <Text style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      bottom: responsiveHeight(3)
                    }}>{workSchedule}</Text>
                  </View>
                </ImageBackground>
              </View>
            </View>
          )}
        </View>
      </View>
      <View style={style.hr_tag} />
    </>
  );
}




const style = StyleSheet.create({
  container: {

    marginTop: responsiveHeight(12),
    // height: responsiveHeight(55)
  },
  saveButton: {
    backgroundColor: 'blue',
    color: 'white',
    textAlign: 'center',
    //   paddingVertical: 10,
    borderRadius: 5,
  },
  inputContainer: {

    flex: 1,
    width: '101%',
    height: '100%',
  },
  bio_title: {
    flex: responsiveWidth(0.2),
    // borderWidth: 1
  },
  editButton: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    paddingRight: responsiveWidth(3),
    top: responsiveHeight(0.5),
    color: 'black'
  },
  bio_title_text: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3),
    color: '#323232',
    marginLeft: responsiveWidth(2),
    fontFamily: 'Times New Roman',
    textDecorationLine: 'underline',
  },
  bio_content: {
    flex: 1,
    left: '43%',
    marginTop: responsiveHeight(1)
    //  borderWidth:1
  },
  bio_content_section: {
    flexDirection: 'row',
    width: responsiveWidth(53),
    height: responsiveHeight(5.5),
    // borderWidth:responsiveWidth(0.3),
    borderRadius: responsiveWidth(2),
    marginBottom: responsiveHeight(1.5),
  },
  // text:{
  //     fontSize:18,
  //     color:'#323232',
  //     fontWeight:'bold',
  //     marginLeft:20,
  //     marginTop:6,
  //     fontFamily:"Times New Roman",
  // },
  // hr_tag: {
  //     borderBottomWidth: responsiveWidth(1.5),
  //     borderBottomColor: '#D7D7D7',
  //     marginVertical: responsiveHeight(0.5),
  // },
  bioTextContainer: {
    // borderWidth: 1,

    // left:responsiveWidth(4),
    //  left: '22%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bio_title: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#d3d3d3', // Light gray background color
    padding: responsiveWidth(4),
    borderRadius: 8,
    marginTop: responsiveHeight(1),
  },
  bio_title_touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  bio_title_text: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.2),
    color: 'black',
    fontFamily: 'Cochin',
    width: responsiveWidth(70),
  },
  downArrowContainer: {
    width: responsiveWidth(6),
    height: responsiveHeight(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  downArrow: {
    width: 20,
    height: 20,
  },
});

// BodyMeasurment



const BodyMeasurement = (userId) => {
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [skinTone, setSkinTone] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [biceps, setBiceps] = useState('');
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const userId = await AsyncStorage.getItem('userId');

        const jwt = await AsyncStorage.getItem('jwt');

        const response = await privateAPI.get(
          `user/getUserByUserId?userId=${userId}`,

        );

        setHeight(response.data.data.height);
        setWeight(response.data.data.weight);
        setSkinTone(response.data.data.skinTone);
        setChest(response.data.data.chestSize);
        setWaist(response.data.data.waistSize);
        setBiceps(response.data.data.bicepsSize);

      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
        }
      }
    };

    fetchData();
  }, []);

  const styles = getStyles(theme);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.bio_title}>
          <TouchableOpacity style={styles.bio_title_touchable} onPress={toggleExpanded}>
            <Text style={styles.bio_title_text}>BODY MEASUREMENT</Text>
            <View style={styles.downArrowContainer}>
              <Image
                source={require('../../Assets/Userprofile_And_Fonts/update/down-arrow.png')}
                style={styles.downArrow}
              />
            </View>
          </TouchableOpacity>
        </View>
        {expanded && (
          <View style={styles.bio_content}>
            <View style={styles.bio_content_section}>
              <ImageBackground
                style={styles.inputContainer}
                source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">
                <View
                  style={{
                    marginLeft: responsiveWidth(2),
                    marginTop: responsiveHeight(0.5),
                    width: responsiveWidth(7.2),
                    height: responsiveHeight(4),
                  }}>
                  <Image
                    source={require('../../Assets/Userprofile_And_Fonts/update/Dob_Icon.png')}
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
                <View style={styles.bioTextContainer}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      top: responsiveHeight(-3.5),
                      left: responsiveWidth(15),
                    }}>
                    {height} cm
                  </Text>
                </View>
              </ImageBackground>
            </View>

            <View style={styles.bio_content_section}>
              <ImageBackground
                style={styles.inputContainer}
                source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">
                <View
                  style={{
                    marginLeft: responsiveWidth(2),
                    marginTop: responsiveHeight(0.5),
                    width: responsiveWidth(7.2),
                    height: responsiveHeight(4),
                  }}>
                  <Image
                    source={require('../../../components/Assets/Userprofile_And_Fonts/update/Weight_icon.png')}
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
                <View style={styles.bioTextContainer}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      top: responsiveHeight(-3.5),
                      left: responsiveWidth(15),
                    }}>
                    {weight} kg
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.bio_content_section}>
              <ImageBackground
                style={styles.inputContainer}
                source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">
                <View
                  style={{
                    marginLeft: responsiveWidth(2),
                    marginTop: responsiveHeight(0.5),
                    width: responsiveWidth(7.2),
                    height: responsiveHeight(4),
                  }}>
                  <Image
                    source={require('../../../components/Assets/Userprofile_And_Fonts/update/skin_tone_icon.png')}
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
                <View style={styles.bioTextContainer}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      top: responsiveHeight(-3.5),
                      left: responsiveWidth(15),
                    }}>
                    {skinTone}
                  </Text>
                </View>
              </ImageBackground>
            </View>

            <View style={{ flexDirection: 'column', flex: 1 }}>
              <View
                style={{
                  width: responsiveWidth(19),
                  height: responsiveHeight(6),
                  borderRadius: responsiveWidth(2.5),
                }}>
                <ImageBackground
                  style={{ width: '99.5%', height: '98.7%' }}
                  source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
                  resizeMode="stretch">
                  <Image
                    source={require('../../../components/Assets/Userprofile_And_Fonts/update/BMI_Icon.png')}
                    style={{
                      width: responsiveWidth(10),
                      height: responsiveHeight(5),
                      marginLeft: responsiveWidth(3),
                    }}
                  />
                </ImageBackground>
              </View>

              <View
                style={{
                  width: responsiveWidth(31.8),
                  height: responsiveHeight(5.5),
                  left: responsiveWidth(20.8),
                  top: responsiveHeight(-6),
                }}>
                <ImageBackground
                  style={{ width: '100%', height: '100%' }}
                  source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
                  resizeMode="stretch">
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      textAlign: 'center',
                      top: responsiveHeight(1),
                    }}>
                    {chest} Inch
                  </Text>
                </ImageBackground>
              </View>

              <View
                style={{
                  width: responsiveWidth(31.8),
                  height: responsiveHeight(5.5),
                  borderRadius: responsiveWidth(2),
                  left: responsiveWidth(20.8),
                  top: responsiveHeight(-5),
                }}>
                <ImageBackground
                  style={{ width: '100%', height: '100%' }}
                  source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
                  resizeMode="stretch">
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      textAlign: 'center',
                      top: responsiveHeight(1),
                    }}>
                    {waist} Inch
                  </Text>
                </ImageBackground>
              </View>

              <View
                style={{
                  width: responsiveWidth(31.8),
                  height: responsiveHeight(5.5),
                  borderRadius: responsiveWidth(2),
                  left: responsiveWidth(20.8),
                  top: responsiveHeight(-4),
                }}>
                <ImageBackground
                  style={{ width: '100%', height: '100%' }}
                  source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
                  resizeMode="stretch">
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      textAlign: 'center',
                      top: responsiveHeight(1),
                    }}>
                    {biceps} Inch
                  </Text>
                </ImageBackground>
              </View>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

const getStyles = theme => {
  return StyleSheet.create({
    container: {

      marginTop: responsiveHeight(0.2),


    },
    bio_title: {
      flex: responsiveWidth(0.2),
      width: '100%',
      flexDirection: 'row',
      columnGap: responsiveWidth(20),
      marginTop: responsiveHeight(1),
    },
    downArrow: {
      width: 20,
      height: 20,
      marginRight: responsiveWidth(2),
    },
    bio_title_text: {
      fontWeight: 'bold',
      fontSize: responsiveFontSize(2.2),
      color: 'black',
      marginLeft: responsiveWidth(2),
      fontFamily: 'Cochin',
      width: responsiveWidth(70),
    },
    bio_content: {
      flex: 1,
      marginTop: responsiveHeight(1),
      left: '43%'
    },
    bio_content_section: {
      flexDirection: 'row',
      height: responsiveHeight(5.5),
      width: responsiveWidth(53),
      borderColor: 'black',
      borderRadius: responsiveWidth(2),
      marginBottom: responsiveHeight(1.5),
    },
    inputContainer: {
      flex: 1,
      height: '100%',
    },
    text: {
      fontSize: responsiveFontSize(2),
      color: '#000000',
      fontWeight: '500',
      fontFamily: 'Times New Roman',
      top: responsiveHeight(1),
      left: responsiveWidth(4),
    },
    hr_tag: {
      borderBottomWidth: 1,
    },
    bio_title: {
      width: '100%',
      flexDirection: 'row',
      backgroundColor: '#d3d3d3', // Light gray background color
      padding: responsiveWidth(4),
      borderRadius: 8,
      marginTop: responsiveHeight(1),
    },
    bio_title_touchable: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    bio_title_text: {
      fontWeight: 'bold',
      fontSize: responsiveFontSize(2.2),
      color: 'black',
      fontFamily: 'Cochin',
      width: responsiveWidth(70),
    },
    downArrowContainer: {
      width: responsiveWidth(6),
      height: responsiveHeight(4),
      alignItems: 'center',
      justifyContent: 'center',
    },
    downArrow: {
      width: 20,
      height: 20,
    },
  });
};

//Personal Info



const Professionalinfo = (userId) => {
  const [expanded, setExpanded] = useState(false)
  const [religion, setReligion] = useState('');
  const [caste, setCaste] = useState('');
  const [marital, setMarital] = useState('');
  const [spouse, setSpouse] = useState('');
  const [mother, setMother] = useState('');
  const [father, setFather] = useState('');
  const [sister, setSister] = useState([]);
  const [brother, setBrother] = useState([]);

  const [dataArray, setDataArray] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        // const userId = await AsyncStorage.getItem('userId');
        // const userIdString = userId.toString();
        const jwt = await AsyncStorage.getItem('jwt');

        const response = await PublicAPI.get(`user/getUserByUserId?userId=${userId}`, {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });

        setDataArray(response.data.data.childrenNames || []);
        setReligion(response.data.data.religion || '');
        setCaste(response.data.data.caste || '');
        setMarital(response.data.data.maritalStatus || '');
        setSpouse(response.data.data.spouseName || '');
        setMother(response.data.data.motherName || '');
        setFather(response.data.data.fatherName || '');
        setBrother(response.data.data.brotherNames || []);
        setSister(response.data.data.sisterNames || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
        }
      }
    };

    fetchData();
  }, []);



  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <View style={stylePi.container}>
        <View style={style.bio_title}>
          <TouchableOpacity style={style.bio_title_touchable} onPress={toggleExpanded}>
            <Text style={style.bio_title_text}>PERSONAL INFORMATION</Text>
            <View style={style.downArrowContainer}>
              <Image
                source={require('../../Assets/Userprofile_And_Fonts/update/down-arrow.png')}
                style={style.downArrow}
              />
            </View>
          </TouchableOpacity>
        </View>


        {expanded && (
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
            <View style={stylePi.Lhs}>
              <Text style={stylePi.Lhs_text}> Religion </Text>
            </View>

            <View style={stylePi.Rhs}>
              <ImageBackground
                style={stylePi.inputContainer}
                source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">

                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    color: '#000000',
                    fontWeight: '500',
                    fontFamily: 'Times New Roman',
                    textAlign: 'center',


                  }}>
                  {religion}
                </Text>

              </ImageBackground>
            </View>
          </View>
        )}

        {/* -------------------------------------------------- */}
        {expanded && (
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
            <View style={stylePi.Lhs}>
              <Text style={stylePi.Lhs_text}> Caste </Text>
            </View>

            <View style={stylePi.Rhs}>
              <ImageBackground
                style={stylePi.inputContainer}
                source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">

                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    color: '#000000',
                    fontWeight: '500',
                    fontFamily: 'Times New Roman',
                    textAlign: 'center',
                  }}>
                  {caste}
                </Text>

              </ImageBackground>
            </View>
          </View>
        )}

        {/* -------------------------------------------------- */}
        {expanded && (
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
            <View style={stylePi.Lhs}>
              <Text style={stylePi.Lhs_text}> Marital Status </Text>
            </View>

            <View style={stylePi.Rhs}>
              <ImageBackground
                style={stylePi.inputContainer}
                source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">

                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    color: '#000000',
                    fontWeight: '500',
                    fontFamily: 'Times New Roman',
                    textAlign: 'center',
                  }}>
                  {marital}
                </Text>

              </ImageBackground>
            </View>
          </View>
        )}

        {/* -------------------------------------------------- */}
        {expanded && (
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
            <View style={stylePi.Lhs}>
              <Text style={stylePi.Lhs_text}> Spouse </Text>
            </View>

            <View style={stylePi.Rhs}>
              <ImageBackground
                style={stylePi.inputContainer}
                source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">

                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    color: '#000000',
                    fontWeight: '500',
                    fontFamily: 'Times New Roman',
                    textAlign: 'center',
                  }}>
                  {spouse}
                </Text>

              </ImageBackground>
            </View>
          </View>
        )}
        {/* -------------------------------------------------- */}
        {expanded && (
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
            <View style={stylePi.Lhs}>
              <Text style={stylePi.Lhs_text}> Children </Text>
            </View>

            <View style={{ rowGap: responsiveHeight(1) }}>
              {dataArray.map((value, index) => (
                <ImageBackground

                  style={{
                    height: responsiveHeight(5.5),
                    width: responsiveWidth(53),
                    // borderWidth: responsiveWidth(0.3),
                    borderColor: 'black',
                    borderRadius: responsiveWidth(2),
                    marginLeft: responsiveWidth(5.5),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
                  resizeMode="stretch">
                  <Text
                    key={index}
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      textAlign: 'center',
                      // marginLeft: responsiveWidth(20), top: responsiveHeight(1)
                    }}>
                    {value}
                  </Text>
                </ImageBackground>
              ))}
            </View>
          </View>
        )}


        {expanded && (
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
            <View style={stylePi.Lhs}>
              <Text style={stylePi.Lhs_text}> Mother </Text>
            </View>

            <View style={stylePi.Rhs}>
              <ImageBackground
                style={stylePi.inputContainer}
                source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">

                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    color: '#000000',
                    fontWeight: '500',
                    fontFamily: 'Times New Roman',
                    textAlign: 'center',
                  }}>
                  {mother}
                </Text>

              </ImageBackground>
            </View>
          </View>
        )}

        {/* -------------------------------------------------- */}
        {expanded && (
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
            <View style={stylePi.Lhs}>
              <Text style={stylePi.Lhs_text}> Father </Text>
            </View>

            <View style={stylePi.Rhs}>
              <ImageBackground
                style={stylePi.inputContainer}
                source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">

                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    color: '#000000',
                    fontWeight: '500',
                    fontFamily: 'Times New Roman',
                    textAlign: 'center',
                  }}>
                  {father}
                </Text>

              </ImageBackground>
            </View>
          </View>
        )}

        {/* -------------------------------------------------- */}
        {expanded && (
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
            <View style={stylePi.Lhs}>
              <Text style={stylePi.Lhs_text}> Brother </Text>
            </View>

            <View style={{ rowGap: responsiveHeight(1) }}>
              {/* <ImageBackground style={style.inputContainer} source={require("../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                            <View style={{rowGap:responsiveHeight(1)}}> */}

              {brother.map((value, index) => (
                <ImageBackground
                  key={`brother-${index}`}
                  style={{
                    height: responsiveHeight(5.5),
                    width: responsiveWidth(53),
                    // borderWidth: responsiveWidth(0.3),
                    borderColor: 'black',
                    borderRadius: responsiveWidth(2),
                    marginLeft: responsiveWidth(5.5),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
                  resizeMode="stretch">
                  <Text
                    key={index}
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      textAlign: 'center',
                    }}>
                    {value}
                  </Text>
                </ImageBackground>
              ))}

            </View>
          </View>
        )}
        {/* -------------------------------------------------- */}
        {expanded && (
          <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
            <View style={stylePi.Lhs}>
              <Text style={stylePi.Lhs_text}> Sister </Text>
            </View>

            <View style={{ rowGap: responsiveHeight(1) }}>
              {sister.map((value, index) => (
                <ImageBackground
                  style={{
                    height: responsiveHeight(5.5),
                    width: responsiveWidth(53),
                    // borderWidth: responsiveWidth(0.3),
                    borderColor: 'black',
                    borderRadius: responsiveWidth(2),
                    marginLeft: responsiveWidth(5.5),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}
                  resizeMode="stretch">
                  <Text
                    key={index}
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      textAlign: 'center',
                    }}>
                    {value}
                  </Text>
                </ImageBackground>
              ))}

            </View>

          </View>
        )}
      </View>

      {/* <View style={style.hr_tag} /> */}
    </>
  );
}

const stylePi = StyleSheet.create({
  container: {

    marginBottom: responsiveHeight(1)
    // height:responsiveHeight(71)
  },
  addButton: {
    fontSize: responsiveFontSize(2),
    color: 'white',

  },
  bio_title: {
    flex: responsiveWidth(0.2),
    width: '100%',
    flexDirection: 'row',
    columnGap: responsiveWidth(20),
    marginTop: responsiveHeight(1),
    // borderWidth:1
  },
  bio_title_text: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.2),
    color: 'black',
    marginLeft: responsiveWidth(2),
    fontFamily: 'Cochin',
    //  textDecorationLine: "underline",
    //  borderWidth:1,
    width: responsiveWidth(70),
  },
  downArrow: {
    width: 20,
    height: 20,
    marginRight: responsiveWidth(2),
    // Add styles for your down arrow icon
  },
  headder: {
    // marginTop: 20,
  },
  headder_text: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3),
    color: '#323232',
    marginLeft: responsiveWidth(2),
    fontFamily: 'Times New Roman',
    textDecorationLine: 'underline',
  },
  Lhs: {
    height: responsiveHeight(5),
    width: responsiveWidth(38),
    justifyContent: 'center',
    alignItems: 'center',
  },

  editButton: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    paddingRight: responsiveWidth(3),
    color: 'black'
  },
  Lhs_text: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.1),
    color: '#323232',
    marginLeft: responsiveWidth(1.5),
    fontFamily: 'Times New Roman',
  },
  Rhs: {
    height: responsiveHeight(5.5),
    width: responsiveWidth(53),
    //borderWidth: responsiveWidth(0.3),
    borderColor: 'black',
    borderRadius: responsiveWidth(2),
    marginLeft: responsiveWidth(5.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '101%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Rhs_childOne: {
    height: responsiveHeight(5.5),
    width: responsiveWidth(53),
    // borderWidth: responsiveWidth(0.3),
    borderColor: 'black',
    borderRadius: responsiveWidth(2),
    marginLeft: responsiveWidth(5.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  Rhs_ChildTwo: {
    height: responsiveHeight(5.5),
    width: responsiveWidth(53),
    // borderWidth: responsiveWidth(0.3),
    borderColor: 'black',
    borderRadius: responsiveWidth(2),
    marginLeft: responsiveWidth(5.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
  Rhs_text: {
    fontSize: responsiveFontSize(2),
    color: '#000000',
    fontWeight: '500',
    fontFamily: 'Times New Roman',
    marginLeft: responsiveWidth(20),
    top: responsiveHeight(1),
  },
  hr_tag: {
    borderBottomWidth: 4,
    borderBottomColor: '#D7D7D7',
    marginVertical: responsiveHeight(1),
  },
  bio_content: {
    flex: 1,
    marginTop: responsiveHeight(1),
  },
  editButton: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    paddingRight: responsiveWidth(3),
    color: 'black'
    // top: responsiveHeight(1)
  },
  textInput: {

    height: responsiveHeight(5.5),
    width: responsiveWidth(53),
    paddingHorizontal: 10,
    // marginBottom: 10,
    width: 200,
    textAlign: 'center'
  },
  bio_title: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#d3d3d3', // Light gray background color
    padding: responsiveWidth(4),
    borderRadius: 8,
    marginTop: responsiveHeight(1),
  },
  bio_title_touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  bio_title_text: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.2),
    color: 'black',
    fontFamily: 'Cochin',
    width: responsiveWidth(70),
  },
  downArrowContainer: {
    width: responsiveWidth(6),
    height: responsiveHeight(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  downArrow: {
    width: 20,
    height: 20,
  },
});

//Education

const Education = (userid) => {

  // console.log('educ', useriii)
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [school, setSchool] = useState();
  const [collage, setCollege] = useState();
  const [qualification, setQualification] = useState();

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const userId = await AsyncStorage.getItem('userId');
        // const userIdString = userId.toString(); // Convert to string if needed
        const jwt = await AsyncStorage.getItem('jwt');



        const response = await PublicAPI.get(`user/getUserByUserId?userId=${userid}`, {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });

        // Handle response data as needed
        console.log('User data:', response.data);
        // setHeight(response.data.data.height);
        setSchool(response.data.data.schoolName);
        setCollege(response.data.data.collegeName);
        setQualification(response.data.data.qualification);




      } catch (error) {
        console.error('Error fetching user data:', error);
        // Log additional details
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
        }
      }
    };

    fetchData();
  }, []);





  return (
    <>
      <View style={styleEducation.container}>

        <View style={style.bio_title}>
          <TouchableOpacity style={style.bio_title_touchable} onPress={toggleExpanded}>
            <Text style={style.bio_title_text}>EDUCATION</Text>
            <View style={style.downArrowContainer}>
              <Image
                source={require('../../Assets/Userprofile_And_Fonts/update/down-arrow.png')}
                style={style.downArrow}
              />
            </View>
          </TouchableOpacity>
        </View>


        {expanded && (


          <View style={{ flexDirection: "row", marginTop: 15 }}>

            <View style={styleEducation.Lhs}>

              <Text style={styleEducation.Lhs_text}> School </Text>

            </View>

            <View style={styleEducation.Rhs}>
              <ImageBackground style={styleEducation.inputContainer} source={require("../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>


                  <Text style={styleEducation.Rhs_text}>{school}</Text>


                </View>
              </ImageBackground>
            </View>

          </View>
        )}

        {/* -------------------------------------------------- */}
        {expanded && (
          <View style={{ flexDirection: "row", marginTop: 15 }}>

            <View style={styleEducation.Lhs}>

              <Text style={styleEducation.Lhs_text}> Collage </Text>

            </View>

            <View style={styleEducation.Rhs}>
              <ImageBackground style={styleEducation.inputContainer} source={require("../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>


                  <Text style={styleEducation.Rhs_text}>{collage}</Text>


                </View>
              </ImageBackground>
            </View>

          </View>
        )}
        {/* -------------------------------------------------- */}
        {expanded && (
          <View style={{ flexDirection: "row", marginTop: 15 }}>

            <View style={styleEducation.Lhs}>

              <Text style={styleEducation.Lhs_text}> Qualification </Text>

            </View>

            <View style={styleEducation.Rhs}>
              <ImageBackground style={styleEducation.inputContainer} source={require("../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>


                  <Text style={styleEducation.Rhs_text}>{qualification}</Text>


                </View>
              </ImageBackground>
            </View>

          </View>
        )}
      </View>

      {/* <View style={style.hr_tag} /> */}
    </>
  )
}
const styleEducation = StyleSheet.create({
  container: {
    //  borderWidth:2,
    //  height: responsiveHeight(28),
    // flex: 1,
    marginBottom: responsiveHeight(1)

  },
  headder_text: {
    fontWeight: "bold",
    fontSize: responsiveFontSize(2.2),
    color: "#323232",
    marginLeft: responsiveWidth(2),
    fontFamily: "Times New Roman",
    textDecorationLine: "underline",
  },
  bio_title_text: {
    fontWeight: "bold",
    fontSize: responsiveFontSize(2.2),
    color: "black",
    marginLeft: responsiveWidth(2),
    fontFamily: 'Cochin',
    // textDecorationLine: "underline",
    //  borderWidth:1,
    width: responsiveWidth(70)

  },
  bio_title: {
    flex: responsiveWidth(0.2),
    width: '100%',
    flexDirection: 'row',
    columnGap: responsiveWidth(20),
    marginTop: responsiveHeight(1),
    marginTop: responsiveHeight(1)
    // borderWidth:1
  },
  downArrow: {
    width: 20,
    height: 20,
    marginRight: responsiveWidth(2),
    // Add styles for your down arrow icon
  },
  Lhs: {
    height: responsiveHeight(5),
    width: responsiveWidth(38),
    justifyContent: "center",
    alignItems: "center",
  },
  Lhs_text: {
    fontWeight: "bold",
    fontSize: responsiveFontSize(2.1),
    color: "#323232",
    marginLeft: responsiveWidth(1.5),
    fontFamily: "Times New Roman",
  },
  Rhs: {
    height: responsiveHeight(5.5),
    width: responsiveWidth(53),
    // borderWidth: responsiveWidth(0.3),
    borderColor: "black",
    borderRadius: responsiveWidth(2),
    marginLeft: responsiveWidth(5.5),
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {

    justifyContent: 'center',
    alignItems: 'center',
    width: '101%',
    height: '100%',
  },
  Rhs_text: {
    fontSize: responsiveFontSize(2),
    color: '#000000',
    fontWeight: '500',
    fontFamily: "Times New Roman",
    // borderWidth: 1
  },
  hr_tag: {
    borderBottomWidth: 4,
    borderBottomColor: '#D7D7D7',
    marginVertical: responsiveHeight(1),
  },
  editButton: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    paddingRight: responsiveWidth(3),
  },
  bio_title: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#d3d3d3', // Light gray background color
    padding: responsiveWidth(4),
    borderRadius: 8,
    marginTop: responsiveHeight(1),
  },
  bio_title_touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  bio_title_text: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.2),
    color: 'black',
    fontFamily: 'Cochin',
    width: responsiveWidth(70),
  },
  downArrowContainer: {
    width: responsiveWidth(6),
    height: responsiveHeight(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  downArrow: {
    width: 20,
    height: 20,
  },
})

// profession


const Profession = (userId) => {
  const us = userId
  const [platformData, setPlatformData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();


  const [filmCountInput, setFilmCountInput] = useState('');
  const [netWorthInput, setNetWorthInput] = useState('');
  const [dailySalaryInput, setDailySalaryInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [editingPlatformId, setEditingPlatformId] = useState(null);
  const [isModalVisibleExp, setModalVisibleExp] = useState(false);
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [currentSubProfessionId, setCurrentSubProfessionId] = useState(null);
  const [subProfessions, setSubProfessions] = useState([]);
  // const toggleModal = () => {
  //   setModalVisibleExp(!isModalVisibleExp);
  // };

  // const years = Array.from(new Array(124), (val, index) => 1900 + index).concat('Present');

  // const toggleEditMode = (platformId) => {

  //   setIsEditing(true)
  //   if (platformId === editingPlatformId) {
  //     // Save changes and exit edit mode
  //     handleSave();
  //     setEditingPlatformId(null);
  //   } else {
  //     // Enter edit mode for the selected platform
  //     setEditingPlatformId(platformId);
  //   }
  // };

  // // useEffect(() => {

  // //   fetchData(); // Fetch data initially when component mounts if expanded

  // // }, []);



  // const handleSave = async () => {
  //   setIsEditing(false)
  //   try {
  //     const platform = platformData.find(platform => platform.platformPermanentId === editingPlatformId);
  //     if (!platform) {
  //       console.error('Platform not found for editing.');
  //       return;
  //     }

  //     const response = await privateAPI.post(
  //       'industryUser/updateIndustryUserPermanentDetails',
  //       {
  //         platformPermanentId: editingPlatformId,
  //         filmCount: filmCountInput,
  //         netWorth: netWorthInput,
  //         dailySalary: dailySalaryInput,

  //         // subProfession: subProfessionsInput.map((sp) => ({
  //         //   subProfessionId: sp.subProfessionId,
  //         //   startingYear: sp.startYear,
  //         //   endingYear: sp.endYear,
  //         // })),
  //       },
  //     );
  //     Alert.alert('Update', `${platform.platformName} Updated`);

  //     console.log('Platform details updated successfully:', response.data);

  //     setFilmCountInput('');
  //     setNetWorthInput('');
  //     setDailySalaryInput('');
  //     setEditingPlatformId(null); // Reset editingPlatformId after saving changes
  //     // Update the state with the new values
  //     setPlatformData(prevState =>
  //       prevState.map(p => {
  //         if (p.platformPermanentId === editingPlatformId) {
  //           return {
  //             ...p,
  //             filmCount: filmCountInput,
  //             netWorth: netWorthInput,
  //             dailySalary: dailySalaryInput,
  //           };
  //         }
  //         return p;
  //       })
  //     );
  //   } catch (error) {
  //     console.error('Error updating platform details:', error);
  //   }
  // };

  const years = Array.from(new Array(124), (val, index) => 1900 + index).concat('Present');

  const toggleModal = (subProfessionId) => {
    const subProfession = subProfessions.find((sp) => sp.subProfessionId === subProfessionId);
    if (subProfession) {
      setStartYear(subProfession.startingYear);
      setEndYear(subProfession.endingYear);
    }
    setCurrentSubProfessionId(subProfessionId);
    setModalVisibleExp(true);
  };

  const saveYearSelection = () => {
    updateSubProfessionYears(currentSubProfessionId, startYear, endYear);
    setModalVisibleExp(false);
  };

  const toggleEditMode = (platformId) => {
    setIsEditing(true);
    if (platformId === editingPlatformId) {
      handleSave();
      setEditingPlatformId(null);
    } else {
      setEditingPlatformId(platformId);
      const platform = platformData.find((platform) => platform.platformPermanentId === platformId);
      if (platform) {
        setFilmCountInput(platform.filmCount.toString());
        setNetWorthInput(platform.netWorth.toString());
        setDailySalaryInput(platform.dailySalary.toString());
        setSubProfessions(platform.professions.flatMap((profession) => profession.subProfessions));
      }
    }
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      const platform = platformData.find((platform) => platform.platformPermanentId === editingPlatformId);
      if (!platform) {
        console.error('Platform not found for editing.');
        return;
      }

      const response = await privateAPI.post('industryUser/updateIndustryUserPermanentDetails', {
        platformPermanentId: editingPlatformId,
        filmCount: filmCountInput,
        netWorth: netWorthInput,
        dailySalary: dailySalaryInput,
        subProfession: subProfessions.map((subProf) => ({
          subProfessionId: subProf.subProfessionId,
          startingYear: subProf.startingYear,
          endingYear: subProf.endingYear,
        })),
      });

      Alert.alert('Update', `${platform.platformName} Updated`);

      console.log('Platform details updated successfully:', response.data);

      setFilmCountInput('');
      setNetWorthInput('');
      setDailySalaryInput('');
      setEditingPlatformId(null);

      setPlatformData((prevState) =>
        prevState.map((p) => {
          if (p.platformPermanentId === editingPlatformId) {
            return {
              ...p,
              filmCount: filmCountInput.toString(),
              netWorth: netWorthInput.toString(),
              dailySalary: dailySalaryInput.toString(),
              professions: p.professions.map((profession) => ({
                ...profession,
                subProfessions: profession.subProfessions.map((subProf) => {
                  const updatedSubProf = subProfessions.find((sp) => sp.subProfessionId === subProf.subProfessionId);
                  return updatedSubProf || subProf;
                }),
              })),
            };
          }
          return p;
        })
      );
    } catch (error) {
      console.error('Error updating platform details:', error);
    }
  };

  const updateSubProfessionYears = (subProfessionId, startYear, endYear) => {
    setSubProfessions((prev) =>
      prev.map((subProf) =>
        subProf.subProfessionId === subProfessionId
          ? { ...subProf, startingYear: startYear, endingYear: endYear }
          : subProf
      )
    );
  };


  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      console.log('check userid', userId)
      const resp = await privateAPI.post(`industryUser/getIndustryUserPermanentDetails?userId=${userId}`);
      const response = resp.data;

      // console.log(response[0].professions[0].subProfessions[0].subProfessionName);

      const modifiedData = response.map(item => ({
        platformName: item.platformName,
        industries: item.industries.map(industry => ({
          industryName: industry.industryName,
          imageURL: `data:image/jpeg;base64,${industry.industryimage}`, // Decode base64 to image URL
        })),
        professions: item.professions.map(profession => ({
          professionName: profession.professionName,
          // subProfessions: profession.subProfessionName || [],
          subProfessions: profession.subProfessions.map(subName => subName.subProfessionName) || [],
          startYear: profession.subProfessions.map(subName => subName.startingYear) || [],
          endYear: profession.subProfessions.map(subName => subName.endingYear) || [],
          subProfessionId: profession.subProfessions.map(subName => subName.subProfessionId) || [],
          imageURL: `data:image/jpeg;base64,${profession.image}`, // Decode base64 to image URL
        })),
        filmCount: item.filmCount,
        netWorth: item.netWorth,
        dailySalary: item.dailySalary,
        platformPermanentId: item.platformPermanentId,
        platformImageURL: `data:image/jpeg;base64,${item.platformImage}`, // Decode base64 to image URL
        filePaths: item.outputWebModelList.map(file => ({
          filePath: file.filePath,
          description: file.description,
        })),

      }));

      setPlatformData(modifiedData);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoading(false);
    }
  };






  // State to track the platform being edited
  const [projectPlatformId, setProjectPlatformId] = useState(null);
  const [openingImagePicker, setOpeningImagePicker] = useState(false);

  const project = (platformId) => {
    console.log('platformId', platformId)
    if (platformId === projectPlatformId) {
      // Save changes and exit edit mode
      openImagePicker(platformId);
      setProjectPlatformId(null);
    } else {
      // Enter edit mode for the selected platform
      setProjectPlatformId(platformId);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {

        console.log('check userid', userId)
        const response = await privateAPI.post(
          `industryUser/getIndustryUserPermanentDetails?userId=${userId}`,
          {},

        );
        setPlatformData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);




  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  //project

  const [description, setDescription] = useState('');
  const [platformId, setPlatformId] = useState(null);

  const openImagePicker = (id) => {
    setPlatformId(id);
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 300,
      maxWidth: 300,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorMessage);
      } else {
        const selectedImage = response.assets[0];
        setSelectedImage(selectedImage);
        setModalVisible(true);  // Show the modal to enter description
      }
    });
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      Alert.alert('No image selected', 'Please select an image first.');
      return;
    }
    if (!description.trim()) {
      Alert.alert('No description', 'Please enter a description.');
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('userId');
      const jwt = await AsyncStorage.getItem('jwt');

      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('platformPermanentId', platformId); // Replace with actual platform ID
      formData.append('fileInputWebModel.description', description);

      const imageUriParts = selectedImage.uri.split('.');
      const fileType = imageUriParts[imageUriParts.length - 1];
      formData.append('fileInputWebModel.files[0]', {
        uri: selectedImage.uri,
        name: `image.${fileType}`,
        type: `image/${fileType}`,
      });

      const response = await privateAPI.post(
        'IndustryUser/project/saveProjectFiles',
        formData,
        {
          headers: {

            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.status === 1) {
        Alert.alert('Success', 'Image uploaded successfully.');
      } else {
        Alert.alert('Upload failed', `Server returned status: ${response.data.status}`);
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    }

    // Reset state
    setSelectedImage(null);
    setDescription('');
    setModalVisible(false);
  };


  // Render JSX based on fetched data
  return (
    <View style={styleProfession.containers}>

      <View style={styleProfession.bio_title}>
        <TouchableOpacity style={styleProfession.bio_title_touchable} onPress={toggleExpanded}>
          <Text style={styleProfession.bio_title_text}>PROFESSION</Text>
          <View style={styleProfession.downArrowContainer}>
            <Image
              source={require('../../Assets/Userprofile_And_Fonts/update/down-arrow.png')}
              style={styleProfession.downArrow}
            />
          </View>
        </TouchableOpacity>
      </View>

      {expanded && (


        <ScrollView style={{ width: responsiveWidth(100), }}>
          {isEditing && (
            <TouchableOpacity onPress={() => navigation.navigate('IndustryUpdateOne')} style={{
              height: responsiveHeight(5.5),
              width: responsiveWidth(45.5),
              borderWidth: responsiveWidth(0.3),
              borderColor: 'black',
              borderRadius: responsiveWidth(2),
              left: responsiveWidth(51),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'blue'
            }}>
              <Text style={{
                fontSize: responsiveFontSize(2),
                color: 'white',
              }}>Add Industry</Text>
            </TouchableOpacity>
          )}
          {loading ? (
            <Text style={{ textAlign: 'center' }}>Loading...</Text>
          ) : (
            platformData.map((platform, index) => (
              <View key={index} style={styleProfession.platformContainer}>
                {/* <View style={{ width: responsiveWidth(96) }}>
                  {editingPlatformId === platform.platformPermanentId ? (
                    <TouchableOpacity onPress={() => toggleEditMode(platform.platformPermanentId, platform.platformName)}>
                      <Text style={styleProfession.editButton}>Save</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => toggleEditMode(platform.platformPermanentId)}>
                      <Text style={styleProfession.editButton}>Edit</Text>
                    </TouchableOpacity>
                  )}
                </View> */}


                <View style={{ flexDirection: 'row', columnGap: responsiveWidth(10), width: responsiveWidth(100), padding: responsiveWidth(1) }}>
                  <View style={{ width: responsiveHeight(19), height: responsiveHeight(12), justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                    <ImageBackground style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }} source={require("../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                      <View style={{ width: responsiveWidth(21), height: responsiveHeight(6.5), right: responsiveWidth(2), margin: responsiveWidth(1) }}>
                        <Image source={{ uri: platform.platformImageURL }} style={{ width: '100%', height: '80%' }} resizeMode='stretch' />
                      </View>

                      <Text style={[styleProfession.platformName, styleProfession.border]}>{platform.platformName}</Text>
                    </ImageBackground>
                  </View>
                  <View style={{ width: responsiveWidth(58) }}>
                    <View style={styleProfession.industriesContainer}>
                      {platform.industries.map((industry, index) => (
                        <ImageBackground key={index} style={{ width: responsiveWidth(45), marginBottom: responsiveHeight(1), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }} source={require("../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                          <View style={{ width: responsiveWidth(9), height: responsiveHeight(5), right: responsiveWidth(2), }}>
                            <Image source={{ uri: industry.imageURL }} style={{ width: '90%', height: '80%', padding: 1 }} resizeMode='stretch' />
                          </View>
                          <View style={{ width: responsiveWidth(29) }}>
                            <Text style={styleProfession.industry}>{industry.industryName}</Text>
                          </View>
                        </ImageBackground>
                      ))}
                    </View>
                    <View style={styleProfession.professionsContainer}>
                      {platform.professions.map((profession, index) => (
                        <View key={index} style={styleProfession.professionContainer}>
                          <ImageBackground style={{ width: responsiveWidth(45), marginBottom: responsiveHeight(1), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }} source={require("../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                            <View style={{ width: responsiveWidth(9), height: responsiveHeight(5), right: responsiveWidth(2) }}>
                              <Image source={{ uri: profession.imageURL }} style={{ width: '100%', height: '80%' }} resizeMode='stretch' />
                            </View>
                            <View style={{ width: responsiveWidth(29) }}>
                              <Text style={styleProfession.profession}>{profession.professionName}</Text>
                            </View>
                          </ImageBackground>
                          {profession.subProfessions.map((subProfession, subIndex) => (
                            <View style={{ flexDirection: 'row', rowGap: 1, width: responsiveWidth(48), justifyContent: 'center', alignItems: 'center', }}>
                              <ImageBackground key={subIndex} style={{ width: responsiveWidth(26), marginBottom: responsiveHeight(1), padding: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: responsiveWidth(1) }} source={require("../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">

                                <Text style={styleProfession.subProfession}>{subProfession.subProfessionName} </Text>




                              </ImageBackground>

                              {editingPlatformId === platform.platformPermanentId ? (
                                <TouchableOpacity onPress={() => toggleModal(subProfession.subProfessionId)} style={{ marginLeft: responsiveWidth(3) }}>
                                  <Icon name="calendar" size={responsiveWidth(7)} color="blue" />
                                </TouchableOpacity>
                              ) : (



                                <Text style={styleProfession.subProfessionYear}>{subProfession.startingYear ?? 'N/A'} - {subProfession.endingYear ?? 'N/A'}</Text>
                              )}

                              {/* <Text style={styles.subProfession}>{profession.endYear}</Text> */}
                            </View>
                          ))}
                        </View>
                      ))}
                    </View>
                    <Modal
                      transparent={true}
                      animationType="slide"
                      visible={isModalVisibleExp}
                      onRequestClose={() => setModalVisibleExp(false)}
                    >
                      <View style={styleProfession.modalContainer}>
                        <View style={styleProfession.modalContent}>
                          <Text style={styleProfession.modalTitle}>Select Start and End Year</Text>

                          <Text style={styleProfession.label}>Start Year:</Text>
                          <Picker
                            selectedValue={startYear}
                            style={styleProfession.picker}
                            onValueChange={(itemValue) => setStartYear(itemValue)}
                          >
                            {years.map((year, index) => (
                              <Picker.Item key={index} label={year.toString()} value={year.toString()} />
                            ))}
                          </Picker>

                          <Text style={styleProfession.label}>End Year:</Text>
                          <Picker
                            selectedValue={endYear}
                            style={styleProfession.picker}
                            onValueChange={(itemValue) => setEndYear(itemValue)}
                          >
                            {years.map((year, index) => (
                              <Picker.Item key={index} label={year.toString()} value={year.toString()} />
                            ))}
                          </Picker>

                          <Button title="Confirm" onPress={saveYearSelection} />
                          <Button title="Cancel" onPress={() => setModalVisibleExp(false)} />
                        </View>
                      </View>
                    </Modal>
                    <View style={styleProfession.professionContainer}>
                      <ImageBackground style={{ width: responsiveWidth(45), height: responsiveHeight(5.5), marginBottom: responsiveHeight(1), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: responsiveWidth(2) }} source={require("../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                        {editingPlatformId === platform.platformPermanentId ? (
                          <TextInput
                            placeholder="Film Count"
                            value={filmCountInput}
                            onChangeText={text => setFilmCountInput(text)}
                            keyboardType="numeric"
                          />
                        ) : (
                          <Text style={{ color: 'black' }}>Film Count: {platform.filmCount}</Text>
                        )}
                      </ImageBackground>
                    </View>
                    <View style={styleProfession.professionContainer}>
                      <ImageBackground style={{ width: responsiveWidth(45), height: responsiveHeight(5.5), marginBottom: responsiveHeight(1), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: responsiveWidth(2) }} source={require("../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                        {editingPlatformId === platform.platformPermanentId ? (
                          <TextInput
                            placeholder="Net Worth"
                            value={netWorthInput}
                            onChangeText={text => setNetWorthInput(text)}
                            keyboardType="numeric"
                          />
                        ) : (
                          <Text style={{ color: 'black' }}>Net Worth: {platform.netWorth}</Text>
                        )}
                      </ImageBackground>
                    </View>
                    <View style={styleProfession.professionContainer}>
                      <ImageBackground style={{ width: responsiveWidth(45), height: responsiveHeight(5.5), marginBottom: responsiveHeight(1), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: responsiveWidth(2) }} source={require("../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                        {editingPlatformId === platform.platformPermanentId ? (
                          <TextInput
                            placeholder="Daily Salary"
                            value={dailySalaryInput}
                            onChangeText={text => setDailySalaryInput(text)}
                            keyboardType="numeric"
                          />
                        ) : (
                          <Text style={{ color: 'black' }}>Daily Salary: {platform.dailySalary}</Text>
                        )}
                      </ImageBackground>
                    </View>
                  </View>
                </View>
                <View style={{ width: '100%' }}>
                  <Text style={{ fontSize: 25, color: '#323232', fontWeight: 'bold', marginLeft: 10, textDecorationLine: 'underline' }}>Projects</Text>
                </View>
                <ScrollView horizontal contentContainerStyle={{ margin: 1 }} style={{ width: '100%', padding: responsiveWidth(1) }}>
                  {/* <View style={{ marginRight: responsiveWidth(2) }}>
                    <TouchableOpacity onPress={() => openImagePicker(platform.platformPermanentId)} style={{ width: 130, height: 150, borderWidth: 1, backgroundColor: "#F5F5F5", }} >
                      <Image source={require('../../Assets/Home_Icon_And_Fonts/plus_icon.png')} style={{ width: 80, height: 80, alignSelf: 'center', top: 29 }} />
                    </TouchableOpacity>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <View style={styleProfession.modalView}>
                        {selectedImage && (
                          <Image source={{ uri: selectedImage.uri }} style={styleProfession.image} />
                        )}
                        <TextInput
                          style={styleProfession.textInput}
                          placeholder="Enter description"
                          value={description}
                          onChangeText={setDescription}
                        />
                        <TouchableOpacity
                          style={styleProfession.uploadButton}
                          onPress={uploadImage}
                        >
                          <Text style={styleProfession.textStyle}>Upload Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styleProfession.cancelButton}
                          onPress={() => setModalVisible(!modalVisible)}
                        >
                          <Text style={styleProfession.textStyle}>Cancel</Text>
                        </TouchableOpacity>
                      </View>
                    </Modal>
                  </View> */}

                  {platform.outputWebModelList.map((file, index) => (
                    <View style={{ width: 130, height: 150, borderWidth: 1, backgroundColor: "#F5F5F5", marginRight: responsiveWidth(2) }} >
                      <Image key={index} source={{ uri: file.filePath }} style={{ width: '100%', height: '100%' }} resizeMode='stretch' />
                      <View style={{ borderWidth: 1 }}>
                        <Text style={styles.fileDescription}>{file.description}</Text>
                      </View>

                    </View>
                  ))}

                </ScrollView>

                <View style={styleProfession.horizontalLine} />
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );

}

const styleProfession = StyleSheet.create({
  containers: {
    alignItems: 'center',
    justifyContent: 'center',


  },
  horizontalLine: {
    borderBottomWidth: 6,
    borderBottomColor: 'black',
    marginVertical: 5, // Adjust the vertical margin as needed
  },
  editButton: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    paddingRight: responsiveWidth(3),
    top: responsiveHeight(0.5),
    color: 'black'
  },
  downArrow: {
    width: 20,
    height: 20,
    marginRight: responsiveWidth(2),
    // Add styles for your down arrow icon
  },
  bio_title_text: {
    fontWeight: "bold",
    fontSize: responsiveFontSize(2.2),
    color: "black",
    marginLeft: responsiveWidth(2),
    fontFamily: 'Cochin',
    // textDecorationLine: "underline",
    //  borderWidth:1,
    width: responsiveWidth(70)
  },
  bio_title: {
    flex: responsiveWidth(0.2),
    width: '100%',
    flexDirection: 'row',
    columnGap: responsiveWidth(20),
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(2)
  },
  platformContainer: {
    flex: 1,

    alignItems: 'center'


  },
  bottomLine: {
    borderBottomWidth: 6,
    borderBottomColor: 'red',
    marginBottom: responsiveHeight(1)
  },
  platformName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',

    textAlign: 'center'
  },
  industriesContainer: {
    marginLeft: responsiveWidth(2),
    marginBottom: 5,

  },
  industry: {
    fontWeight: 'bold',
    color: 'black'
  },
  professionsContainer: {
    marginLeft: responsiveWidth(2),
  },
  professionContainer: {
    marginBottom: 5,
  },
  profession: {
    fontWeight: 'bold',
    color: 'black'
  },
  subProfession: {
    color: 'black',
    textAlign: 'center',

  },
  subProfessionYear: {
    color: 'black',
    textAlign: 'center',
    width: responsiveWidth(22)

  },
  image: {
    alignSelf: 'center',
    width: 300,
    height: 300,
    // marginVertical: 16,
  },
  textInput: {
    width: '100%',
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 8,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  uploadButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bio_title: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#d3d3d3', // Light gray background color
    padding: responsiveWidth(4),
    borderRadius: 8,
    marginTop: responsiveHeight(1),
  },
  bio_title_touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  bio_title_text: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.2),
    color: 'black',
    fontFamily: 'Cochin',
    width: responsiveWidth(70),
  },
  downArrowContainer: {
    width: responsiveWidth(6),
    height: responsiveHeight(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  downArrow: {
    width: 20,
    height: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: 'black'
  },
  picker: {
    width: '100%',
    height: 50,
  },

});








export default function UserProfileDetials({ route }) {

  const { userId, userName } = route.params;

  console.log('useridddd', userId, 'userName', userName)

  const [showIcons, setShowIcons] = useState(false);


  const [showRequestModal, setShowRequestModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [startPickerVisible, setStartPickerVisible] = useState(false);
  const [endPickerVisible, setEndPickerVisible] = useState(false);

  const handleFloatingButtonClick = () => {
    setShowIcons(!showIcons);
  };

  const navigation = useNavigation();



  const handleChat = (userId, userName) => {

    const data = { userId: userId, userName: userName }
    console.log(data)
    navigation.navigate('ChatScreen', {
      data: data
    })


  }

  const handlePressBlock = (userId) => {


    const apiUrl = 'https://filmhook.annularprojects.com/filmhook-0.1/block/addBlock';


    // const payload = {
    //   blockedBy: userId,
    //   blockUserId: 
    // };

    const postData = async () => {
      try {
        const userLoginId = await AsyncStorage.getItem('userId')
        const jwt = await AsyncStorage.getItem('jwt')
        console.log('useridlogin', userLoginId, 'userId', userId)
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
          },
          body: JSON.stringify({
            blockedBy: userLoginId,
            blockedUser: userId
          })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        Alert.alert('Success', 'Blocked Profile')
        console.log('Success:', data);

      } catch (error) {
        console.error('Error:', error);
      }
    };

    postData();

  }

  const pinProfile = async (userId) => {
    try {
      const body = {
        flag: 0,
        pinProfile: 283
      }
      const response = await privateAPI.post('pin/addPin', body);
      Alert.alert('Success', 'Added profile to pin')
      console.log('profile pinned successfully:', response.data)
    } catch (error) {
      console.log('Error pinning profile:', error);
    }
  };

  const handleFollow = async (userId) => {
    try {
      senderId = await AsyncStorage.getItem('id')
      console.log("userId for folloow post ", userId)
      const response = await privateAPI.post(`friendRequest/saveFriendRequest`, {
        followersRequestSenderId: senderId,
        followersRequestReceiverId: userId,
      });
      Alert.alert('Success', 'Profile successfully followed')
      console.log("Follow response", response.data)
    } catch (error) {
      console.error(error)
    }
  };


  const handleIconClick = (icon) => {
    // Implement functionality for each icon
    switch (icon) {
      case 'Icon 1':
        handleFollow(userId)
        console.log('Functionality for Icon 1');
        break;
      case 'Icon 2':

        console.log('Functionality for Icon 2');
        break;

      case 'Icon 3':
        pinProfile(userId)
        console.log('Functionality for Icon 3');
        break;
      case 'Icon 4':
        handleChat(userId, userName)
        console.log('Functionality for Icon 4');
        break;
      case 'Icon 5':
        console.log('Functionality for Icon 5');
        break;
      case 'Icon 6':
        navigation.navigate('ProjectByuser', {userId,  userName})
        console.log('Functionality for Icon 6');
        break;
      case 'Icon 7':
        console.log('Functionality for Icon 7');
        handlePressBlock(userId);
        break;
      case 'Icon 8':
        console.log('Functionality for Icon 8')
        setShowRequestModal(true);
        break;
      case 'Icon 9':
        navigation.navigate('BuyRental', { userId })
        console.log('Functionality for Icon 9');
        break;

      default:
        console.log('Unknown icon clicked');
    }
  };


  const handleFormSubmit = () => {
    // Validate form inputs
    if (!projectName || !startDate || !endDate) {
      alert('Please fill in all fields');
      return;
    }
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);

    // Perform actions with form data

    // Close the modal
    setShowRequestModal(false);
  };

  const handleFormCancel = () => {
    // Close the modal
    setShowRequestModal(false);
  };


  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
    setStartPickerVisible(false);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
    setEndPickerVisible(false);
  };

  const saveBookingRequest = async () => {
    try {

      if (!projectName || !startDate || !endDate) {
        alert('Please fill in all fields');
        return;
      }
      console.log('projectName', projectName)
      console.log('Start Date:', startDate);
      console.log('End Date:', endDate);

      const formattedStartDate = moment(startDate).format('DD-MM-YYYY');
      const formattedEndDate = moment(endDate).format('DD-MM-YYYY');
      const userIdLogin = await AsyncStorage.getItem('id')

      console.log('Start Date:', formattedStartDate);
      console.log('End Date:', formattedEndDate);

      const response = await privateAPI.post('user/booking/saveBookingRequest', {
        currentUserId: userIdLogin,
        bookingUserId: userId,
        projectName: projectName,
        fromDate: formattedStartDate,
        toDate: formattedEndDate,
        bookingStatus: 'Pending'
      },)

      Alert.alert('Success', 'Booked Sucessfully')
      console.log('booked successfully:', response.data)
    }
    catch (error) {
      console.error('Error:', error);
    }
    finally {
      setShowRequestModal(false);

    }

  };



  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {ProfilePic(userId, userName)}

        {Biography(userId)}

        {BodyMeasurement(userId)}

        {Professionalinfo(userId)}

        {Education(userId)}

        {Profession(userId)}





      </ScrollView>

      <Modal
        visible={showRequestModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowRequestModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Project Name"
              value={projectName}
              onChangeText={setProjectName}
            />
            <TouchableOpacity onPress={() => setStartPickerVisible(true)}>
              <View style={styles.rowContainer}>
                <Text style={styles.label}>Start Date:</Text>
                <Image
                  source={require('../../Assets/Userprofile_And_Fonts/nine-Icons/Booking.png')}
                  style={styles.calendarIcon}
                />
                <Text style={styles.dateText}>{startDate.toLocaleDateString()}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setEndPickerVisible(true)}>
              <View style={styles.rowContainer}>
                <Text style={styles.label}>End Date:</Text>
                <Image
                  source={require('../../Assets/Userprofile_And_Fonts/nine-Icons/Booking.png')}
                  style={styles.calendarIcon}
                />
                <Text style={styles.dateText}>{endDate.toLocaleDateString()}</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              <Button title="Submit" onPress={saveBookingRequest} />
              <Button title="Cancel" onPress={handleFormCancel} />
            </View>
          </View>
        </View>
      </Modal>
      {startPickerVisible && (
        <DateTimePicker
          value={startDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleStartDateChange}
        />
      )}
      {endPickerVisible && (
        <DateTimePicker
          value={endDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleEndDateChange}
        />
      )}



      {showIcons && (
        <View style={styles.iconGrid}>
          {/* Example icons */}
          {Array.from({ length: 9 }, (_, index) => (
            <TouchableOpacity
              key={index}
              style={styles.iconContainer}
              onPress={() => handleIconClick(`Icon ${index + 1}`)}>
              {/* Replace with your icon images */}
              {index === 0 && (
                <Image
                  source={require('../../Assets/Userprofile_And_Fonts/nine-Icons/hire.png')}
                  style={styles.iconImage}
                />
              )}
              {index === 1 && (
                <Image
                  source={require('../../Assets/Userprofile_And_Fonts/nine-Icons//remove.png')}
                  style={styles.iconImage}
                />
              )}
              {index === 2 && (
                <Image source={require('../../Assets/Userprofile_And_Fonts/nine-Icons/pin.png')} style={styles.iconImage} />
              )}
              {index === 3 && (
                <Image source={require('../../Assets/Userprofile_And_Fonts/nine-Icons/chat.png')} style={styles.iconImage} />
              )}
              {index === 4 && (
                <Image source={require('../../Assets/Userprofile_And_Fonts/nine-Icons/call.png')} style={styles.iconImage} />
              )}
              {index === 5 && (
                <Image source={require('../../Assets/Userprofile_And_Fonts/nine-Icons/project.png')} style={styles.iconImage} />
              )}
              {index === 6 && (
                <Image source={require('../../Assets/Userprofile_And_Fonts/nine-Icons/block.png')} style={styles.iconImage} />
              )}
              {index === 7 && (
                <Image source={require('../../Assets/Userprofile_And_Fonts/nine-Icons/Booking.png')} style={styles.iconImage} />
              )}
              {index === 8 && (
                <Image source={require('../../Assets/Userprofile_And_Fonts/nine-Icons/market.png')} style={styles.iconImage} />
              )}


              {/* Add more conditions for other icons */}
            </TouchableOpacity>
          ))}
        </View>
      )}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleFloatingButtonClick}>
        {/* Replace with your floating button icon */}
        <Image
          source={require('../../Assets/Userprofile_And_Fonts/nine-Icons/Chats-Menu.png')}
          style={styles.floatingButtonImage}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 50,
    left: responsiveWidth(5),
    width: 60,

    height: 60,
    borderRadius: 30,
    //  backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1, // Shadow for Android
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    elevation: 5, // Add elevation to create a shadow effect
  },
  calendarIcon: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    // marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  floatingButtonImage: {
    width: '50%',
    height: '50%',
  },
  iconGrid: {
    position: 'absolute',
    bottom: 100,
    width: responsiveWidth(40),
    height: responsiveHeight(20),
    left: responsiveWidth(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    // borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    width: responsiveWidth(10),
    height: responsiveHeight(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: 'rgba(245, 40, 145, 0.05)',
    borderRadius: 10,
  },
  iconImage: {
    width: 30,
    height: 30,
  },
});