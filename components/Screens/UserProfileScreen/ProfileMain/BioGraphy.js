import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker component
import AsyncStorage from '@react-native-async-storage/async-storage';
import privateAPI from '../../../api/privateAPI';
import moment from 'moment';
import PublicAPI from '../../../api/publicAPI';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';

export default function Biography() {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  //const [dob, setDob] = useState('131');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [district, setDistrict] = useState();
  const [workExperience, setworkExperience] = useState('N/A');
  const [workSchedule, setWorkSchedule] = useState('N/A');
  const [dob, setDob] = useState('');



  // const bio = () => {
  //   if (userType === "IndustryUser") {
  //     return (
  //       <View>
  //         <View style={style.bio_content_section}>
  //           <ImageBackground
  //             style={style.inputContainer}
  //             source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
  //             resizeMode="stretch">
  //             <View
  //               style={{
  //                 width: responsiveWidth(7.2),
  //                 height: responsiveHeight(4),
  //                 marginLeft: responsiveWidth(1),
  //                 marginTop: responsiveHeight(0.5),
  //               }}>
  //               <Image
  //                 source={require('../../../Assets/Userprofile_And_Fonts/update/Work_Exp.png')}
  //                 style={{ width: '100%', height: '100%' }}
  //               />
  //             </View>
  //             <View style={style.bioTextContainer}>
  //               {isEditing ? (
  //                 <TextInput
  //                   style={{
  //                     fontSize: responsiveFontSize(2),
  //                     color: '#000000',
  //                     fontWeight: '500',

  //                     fontFamily: 'Times New Roman',
  //                     top: responsiveHeight(-4.5),
  //                     textAlign: 'center',
  //                     left: responsiveWidth(3)
  //                   }}
  //                   value={workExperience}
  //                   onChangeText={setworkExperience}
  //                   placeholder="Enter your Experience"
  //                 />
  //               ) : (
  //                 <Text
  //                   style={{
  //                     fontSize: responsiveFontSize(2),
  //                     color: '#000000',
  //                     fontWeight: '500',
  //                     fontFamily: 'Times New Roman',
  //                     top: responsiveHeight(-3.5),
  //                   }}>
  //                   {workExperience}
  //                 </Text>
  //               )}
  //             </View>
  //           </ImageBackground>
  //         </View>

  //         <View style={style.bio_content_section}>
  //           <ImageBackground
  //             style={style.inputContainer}
  //             source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
  //             resizeMode="stretch">
  //             <View
  //               style={{
  //                 width: responsiveWidth(7.2),
  //                 height: responsiveHeight(4),
  //                 marginLeft: responsiveWidth(1),
  //                 marginTop: responsiveHeight(0.5),
  //               }}>
  //               <Image
  //                 source={require('../../../Assets/Userprofile_And_Fonts/update/Booking.png')}
  //                 style={{ width: '100%', height: '100%' }}
  //               />
  //             </View>
  //             <View style={style.bioTextContainer}>
  //               {isEditing ? (
  //                 <TextInput
  //                   style={{
  //                     fontSize: responsiveFontSize(2),
  //                     color: '#000000',
  //                     fontWeight: '500',
  //                     fontFamily: 'Times New Roman',
  //                     top: responsiveHeight(-4.5),
  //                     textAlign: 'center',
  //                     left: responsiveWidth(3)
  //                   }}
  //                   value={workSchedule}
  //                   onChangeText={setWorkSchedule}
  //                   placeholder="Enter your Schedule"
  //                 />
  //               ) : (
  //                 <Text
  //                   style={{
  //                     fontSize: responsiveFontSize(2),
  //                     color: '#000000',
  //                     fontWeight: '500',
  //                     fontFamily: 'Times New Roman',
  //                     top: responsiveHeight(-3.5),
  //                   }}>
  //                   {workSchedule}
  //                 </Text>
  //               )}
  //             </View>
  //           </ImageBackground>
  //         </View>
  //       </View>
  //     )
  //   }
  //   return null;
  // }
  const bio = () => {
    const handleVerificationAlert = () => {
      Alert.alert(
        'Get Verified',
        'Please complete your verification process for Industry user.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => navigation.navigate('IndustryOne'), // Replace 'VerificationScreen' with your target screen name
          },
        ],
        { cancelable: false }
      );
    };
    if (userType === "IndustryUser") {
      return (
        <View >

          <View style={style.bio_content_section}>
            <ImageBackground
              style={style.inputContainer}
              source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
              resizeMode="stretch">
              <View
                style={{
                  marginLeft: responsiveWidth(6),
                  marginTop: responsiveHeight(0.5),
                  width: responsiveWidth(12),
                  height: responsiveHeight(6),
                }}>
                <Image
                  source={require('../../../Assets/Userprofile_And_Fonts/update/Experience.png')}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
              <View style={style.bioTextContainer}>
                {isEditing ? (
                  <TextInput
                    style={{
                      fontSize: responsiveFontSize(2.5),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      top: responsiveHeight(-5.2),
                      textAlign: 'center',
                      left: responsiveWidth(3)
                    }}
                    placeholderTextColor={'black'}
                    value={workExperience}
                    onChangeText={setworkExperience}
                    keyboardType='numeric'
                    placeholder="Enter your Experience"
                  />
                ) : (
                  <Text
                    style={{
                      width:responsiveWidth(35),
                      fontSize: responsiveFontSize(2.8),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      top: responsiveHeight(-4.5),
                    }}>
                    {workExperience}
                  </Text>
                )}
              </View>
            </ImageBackground>
          </View>
  
          <View style={style.bio_content_section}>
            <ImageBackground
              style={style.inputContainer}
              source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
              resizeMode="stretch">
              <View
                style={{
                  marginLeft: responsiveWidth(6),
                  marginTop: responsiveHeight(0.5),
                  width: responsiveWidth(12),
                  height: responsiveHeight(6),
                }}>
                <Image
                  source={require('../../../Assets/Userprofile_And_Fonts/update/Booking.png')}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
              <View style={style.bioTextContainer}>
                {isEditing ? (
                  <TextInput
                    style={{
                      fontSize: responsiveFontSize(2.5),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      top: responsiveHeight(-4.5),
                      textAlign: 'center',
                      left: responsiveWidth(3)
                    }}
                    placeholderTextColor={'black'}
                    value={workSchedule}
                    onChangeText={setWorkSchedule}
                    placeholder="Enter your Schedule"
                  />
                ) : (
                  <Text
                    style={{
                      width:responsiveWidth(35),
                      fontSize: responsiveFontSize(2.8),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      top: responsiveHeight(-4.5),
                    }}>
                    {workSchedule}
                  </Text>
                )}
              </View>
            </ImageBackground>
          </View>
        </View>
      );
    } else if (userType === "commonUser") {
      return (
        <TouchableOpacity style={style.bio_content_section} onPress={handleVerificationAlert}>
          <ImageBackground
            style={style.inputContainer}
            source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
            resizeMode="stretch">
            <View
              style={{
                marginLeft: responsiveWidth(0.8),
                  marginTop: responsiveHeight(0.5),
                  width: responsiveWidth(12),
                  height: responsiveHeight(6),
              }}>
              <Image
                source={require('../../../Assets/Userprofile_And_Fonts/update/Booking.png')}
                style={{ width: '100%', height: '100%' }}
              />
            </View>
            <View style={style.bioTextContainer}>
              <Text
                style={{
                  width:responsiveWidth(35),
                  fontSize: responsiveFontSize(2.8),
                  color: '#000000',
                  fontWeight: '500',
                  fontFamily: 'Times New Roman',
                  top: responsiveHeight(-4.5),
                }}>
                Get Verified
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      );
    }
    return null;
  }
  

  const [userType, setuserType] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const jwt = await AsyncStorage.getItem('jwt');
        const value = await AsyncStorage.getItem('usertype')
        if (value !== null) {
          setuserType(value)
        }
        console.log('usertype:', value)

        const response = await privateAPI.get(`user/getUserByUserId?userId=${userId}`, {
         
        });

        const user = response.data.data;
        console.log('dataaaaaa', (user.dob))
        setSelectedDate(user.dob || '');
        setGender(user.gender || '');
        setCountry(user.birthPlace || '');
        setState(user.livingPlace || '');
        setDistrict(user.district || '');
        setworkExperience(user.experience || 0);
        setWorkSchedule(user.schedule)
      } catch (error) {
        console.error('Error fetching user data:', error);
        const customError = "usertype not get from AsyncStorage"
        // console.log(error,"usertype not get from AsyncStorage")
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);

        }
        throw customError;
      }
    };

    fetchData();
  }, []);
  const handleUpdatePersonalInfo = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const jwt = await AsyncStorage.getItem('jwt');

console.log('updatebiograt', userId, gender, country, state, workExperience)
  
    const url = 'user/updateBiographyDetails';
    const requestBody = {
      userId: userId,
      dob: selectedDate, // Format dob as 'yyyy-mm-dd'
      gender: gender,
      livingPlace: state,
      birthPlace: country,
      experience: workExperience,
      schedule: workSchedule
    };

    try {
      const response = await privateAPI.put(url, requestBody, {
        headers: {
          'Content-Type': 'application/json',
         
        }
      });

      console.log('User data:', response.data);
      if (response.status !== 200) {
        throw new Error('Failed to update personal info');
      }

      setIsEditing(false);
      Alert.alert('Success', 'Personal info updated successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(Platform.OS === 'ios');
    setDob(currentDate);
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const showDatePicker = () => {
      setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
      setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      setSelectedDate(formattedDate);
      hideDatePicker();
    
  };

  const today = new Date();
  const minimumDate = new Date(1900, 0, 1); 

  return (
    <>
      <View style={style.container}>
        <View style={style.bio_title}>
          <Text style={style.bio_title_text}>BIOGRAPHY</Text>
        </View>


        {/* ///////////////////////////////////////////////*/}
        <View style={style.bio_content}>
          <View style={{alignSelf:'flex-end'}}>
            {isEditing ? null : (
              <TouchableOpacity onPress={() => setIsEditing(true)} style={{ color: 'black' }}>
                <Text style={style.editButton}>Edit</Text>
              </TouchableOpacity>
            )}

            {isEditing && (
              <TouchableOpacity onPress={handleUpdatePersonalInfo} style={{ color: 'black' }}>
                <Text style={style.editButton}>Save</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={style.bio_content_section}>
            <ImageBackground
              style={style.inputContainer}
              source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
              resizeMode="stretch">
              <View
                style={{
                  marginLeft: responsiveWidth(6),
                  marginTop: responsiveHeight(0.5),
                  width: responsiveWidth(12),
                  height: responsiveHeight(6),
                }}>
                <Image
                  source={require('../../../Assets/Userprofile_And_Fonts/update/Dob_Icon.png')}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="stretch"
                />
              </View>

              <View style={style.bioTextContainer}>

                {isEditing ? (
                  <TouchableOpacity onPress={showDatePicker} style={{ bottom: responsiveHeight(5), width: responsiveWidth(40) }}>
                    <TextInput
                      style={{marginLeft:responsiveWidth(2), fontSize: responsiveFontSize(2.5), color: '#000000', fontWeight: '500', fontFamily: 'Times New Roman' }}
                      value={selectedDate}
                      editable={false}
                    />
                  </TouchableOpacity>
                ) : (
                  <Text style={{
                    width:responsiveWidth(35),
                    fontSize: responsiveFontSize(2.8),
                    color: '#000000',
                    fontWeight: '500',
                    fontFamily: 'Times New Roman',
                    top: responsiveHeight(-4.5),
                  }} >{selectedDate}</Text>
                )}
                <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            
                            mode="date"
                            maximumDate={today}
                            minimumDate={minimumDate}
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                           
                        />

              </View>
            </ImageBackground>
          </View>

          <View style={style.bio_content_section}>
            <ImageBackground
              style={style.inputContainer}
              source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
              resizeMode="stretch">
              <View
                style={{
                  marginLeft: responsiveWidth(6),
                  marginTop: responsiveHeight(0.5),
                  width: responsiveWidth(12),
                  height: responsiveHeight(6),
                }}>
                <Image
                  source={require('../../../Assets/Userprofile_And_Fonts/update/Gender_Icon.png')}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
              <View
                style={{
                  bottom: responsiveHeight(4),
                  
                  left: responsiveWidth(9),
                  width: responsiveWidth(48),
                  height: responsiveHeight(4),
                  // borderWidth:1,
                  justifyContent: 'center',
                  alignSelf: 'center'
                  // alignItems:'center'

                }}>
                {isEditing ? (
                  <Picker
                    selectedValue={gender}
                    onValueChange={(itemValue, itemIndex) =>
                      setGender(itemValue)


                    }
                  //style={{width:100,borderWidth:1,height:responsiveHeight(6)}}
                  >
                    <Picker.Item label="Male" value="Male" style={{color:'black', fontSize:responsiveFontSize(2.8),}}/>
                    <Picker.Item label="Female" value="Female"  style={{color:'black',fontSize:responsiveFontSize(2.8)}}/>
                    <Picker.Item label="Others" value="Others"  style={{color:'black',fontSize:responsiveFontSize(2.8)}}/>
                  </Picker>
                ) : (
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.8),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                    bottom:responsiveHeight(1), right:responsiveWidth(1.5)
                   //  right:responsiveWidth(10),
                    
                    }}>
                    {gender}
                  </Text>
                )}
              </View>
            </ImageBackground>
          </View>
          {/* ////////////////////////////////////////////*/}
          <View style={style.bio_content_section}>
            <ImageBackground
              style={style.inputContainer}
              source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
              resizeMode="stretch">
              <View
                style={{
                  marginLeft: responsiveWidth(6),
                  marginTop: responsiveHeight(0.5),
                  width: responsiveWidth(12),
                  height: responsiveHeight(6),
                }}>
                <Image
                  source={require('../../../Assets/Userprofile_And_Fonts/update/BirthPlace.png')}
                  style={{ width: '90%', height: '100%' }}
                />
              </View>
              <View style={style.bioTextContainer}>
                {isEditing ? (
                  <View style={{top: responsiveHeight(-6), height:responsiveHeight(7), alignItems:'center', justifyContent:'center',width:responsiveWidth(50)}}>
                  <TextInput
                    style={{
                      fontSize: responsiveFontSize(2.5),
                      color: '#000000',
                      fontWeight: '500',
                      alignSelf: 'center',
                      fontFamily: 'Times New Roman',
                     
                      textAlign: 'center'

                    }}
                    placeholderTextColor={'black'}
                    value={country}
                    onChangeText={setCountry}
                    placeholder="Your Birth Place"
                  />
                  </View>
                ) : (
                  <View style={{top: responsiveHeight(-6), height:responsiveHeight(7), alignItems:'center', justifyContent:'center'}}>
                  <Text
                    style={{
                      width:responsiveWidth(50),
                      fontSize: responsiveFontSize(2.8),
                      color: '#000000',
                      left:responsiveWidth(7),
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                     
                    }}>
                    {country}
                  </Text>
                  </View>
                )}
              </View>
            </ImageBackground>
          </View>

          {/* ///////////////////////////////////////////////*/}
          <View style={style.bio_content_section}>
            <ImageBackground
              style={style.inputContainer}
              source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
              resizeMode="stretch">
              <View
                style={{
                  marginLeft: responsiveWidth(6),
                  marginTop: responsiveHeight(0.5),
                  width: responsiveWidth(12),
                  height: responsiveHeight(6),
                }}>
                <Image
                  source={require('../../../Assets/Userprofile_And_Fonts/update/LivingPlace.png')}
                  style={{ width: '90%', height: '100%' }}
                />
              </View>
              <View></View>
              <View style={style.bioTextContainer}>
                {isEditing ? (
                   <View style={{top: responsiveHeight(-6), height:responsiveHeight(7), alignItems:'center', justifyContent:'center',width:responsiveWidth(50)}}>
                  <TextInput
                    style={{
                      fontSize: responsiveFontSize(2.5),
                      color: '#000000',
                      fontWeight: '500',
                      alignSelf: 'center',
                      fontFamily: 'Times New Roman',
                     
                      textAlign: 'center'

                    }}
                    placeholderTextColor={'black'}
                    value={state}
                    onChangeText={setState}
                    placeholder="Your living place"
                  />
                  </View>
                ) : (
                  <View style={{top: responsiveHeight(-6), height:responsiveHeight(7), alignItems:'center', justifyContent:'center'}}>
                  <Text
                    style={{
                      width:responsiveWidth(50),
                      fontSize: responsiveFontSize(2.8),
                      color: '#000000',
                      left:responsiveWidth(7),
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                     
                    }}>
                    {state}
                  </Text>
                  </View>
                )}
              </View>
            </ImageBackground>
          </View>
          {/* ///////////////////////////////////////////////*/}
          {/* <View style={style.bio_content_section}>
            <ImageBackground
              style={style.inputContainer}
              source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
              resizeMode="stretch">
              <View
                style={{
                  width: responsiveWidth(7.2),
                  height: responsiveHeight(4),
                  marginLeft: responsiveWidth(1),
                  marginTop: responsiveHeight(0.5),
                }}>
                <Image
                  source={require('../../../Assets/Userprofile_And_Fonts/update/hometown_icon.png')}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
              <View style={style.bioTextContainer}>
                {isEditing ? (
                  <TextInput
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      top: responsiveHeight(-4.5),
                      textAlign: 'center'
                    }}
                    value={district}
                    onChangeText={setDistrict}
                    placeholder="Enter your District"
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      top: responsiveHeight(-3.5),
                    }}>
                    {district}
                  </Text>
                )}
              </View>
            </ImageBackground>
          </View> */}
         
            {bio()}
         
          {/* ///////////////////////////////////////////////*/}

          {/* ///////////////////////////////////////////////*/}
        </View>
      </View>
      <View style={style.hr_tag} />
    </>
  );
}

const style = StyleSheet.create({
  container: {
  //  flexDirection: 'row',
    marginTop: responsiveHeight(5),
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
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#d3d3d3', // Light gray background color
    padding: responsiveWidth(4),
    borderRadius: 8,
    marginTop: responsiveHeight(1),
  },
  editButton: {
    fontSize: responsiveFontSize(2.5),
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
      fontSize: responsiveFontSize(2.8),
      color: 'black',
      fontFamily: 'Cochin',
      width: responsiveWidth(70),
  },
  bio_content: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
   // left:responsiveWidth(43)
    //  borderWidth:1
  },
  bio_content_section: {
    flexDirection: 'row',
   
    width: '90%',
    height: responsiveHeight(10),
    padding:responsiveWidth(2),
  //   borderWidth:responsiveWidth(0.3),
    borderRadius: responsiveWidth(2),
    marginBottom: responsiveHeight(0.2),
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
});