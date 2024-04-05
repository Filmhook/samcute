import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker component

export default function Biography() {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  //const [dob, setDob] = useState('131');
  const [gender, setGender] = useState('male');
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [district, setDistrict] = useState();
  const [workExperience, setworkExperience] = useState('');
  const [workSchedule, setWorkSchedule] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    // Save the edited profile details
    setIsEditing(false);
    // You can send the updated profile details to your backend or update the state accordingly
  };
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(Platform.OS === 'ios');
    setDob(currentDate);
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const formatDate = date => {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <View style={style.container}>
        <View style={style.bio_title}>
          <Text style={style.bio_title_text}>BIOGRAPHY</Text>
        </View>

        {/* 
                <TouchableOpacity  onPress={navigation.navigate('BiographyEdit')}>
                    <Text>Edit</Text>
                </TouchableOpacity> */}

        {/* ///////////////////////////////////////////////*/}
        <View style={style.bio_content}>
          {/* <Image source={require("../../../Assets/Userprofile_And_Fonts/update/Dob_Icon.png")} style={{ width: responsiveWidth(15), height: responsiveHeight(5) }} resizeMode='stretch'/> */}
          {isEditing ? null : (
            <TouchableOpacity
              onPress={() => setIsEditing(true)}
              style={{
                width: responsiveWidth(13),
                height: responsiveHeight(5),
                left: responsiveWidth(40),
                bottom: responsiveHeight(1),
              }}>
              {/* <Text>hhh</Text> */}
              <Image
                source={require('../../../Assets/Userprofile_And_Fonts/update/edit-btn.png')}
                style={{width: '100%', height: '100%'}}
                resizeMode="stretch"
              />

              {/* <Image source={require("../../../Assets/Userprofile_And_Fonts/update/Dob_Icon.png")} style={{ width: '100%', height: '100%' }} resizeMode='stretch'/> */}

              {/* <Text style={style.editButton}>Edit</Text> */}
            </TouchableOpacity>
          )}

          {isEditing && (
            <TouchableOpacity style={{}} onPress={handleSave}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginBottom: 10,
                  textDecorationLine: 'underline',
                  alignSelf: 'flex-end',
                  paddingRight: responsiveWidth(3),
                  top: responsiveHeight(0.5),
                }}>
                Save
              </Text>
            </TouchableOpacity>
          )}
          <View style={style.bio_content_section}>
            <ImageBackground
              style={style.inputContainer}
              source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
              resizeMode="stretch">
              <View
                style={{
                  marginLeft: responsiveWidth(0.2),
                  marginTop: responsiveHeight(0.5),
                  width: responsiveWidth(8),
                  height: responsiveHeight(4),
                }}>
                <Image
                  source={require('../../../Assets/Userprofile_And_Fonts/update/Dob_Icon.png')}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="stretch"
                />
              </View>

              <View style={style.bioTextContainer}>
                {isEditing ? (
                  <TouchableOpacity
                    onPress={openDatePicker}
                    style={{top: responsiveHeight(-4.5)}}>
                    <TextInput
                      style={{
                        fontSize: responsiveFontSize(2),
                        color: '#000000',
                        fontWeight: '500',
                        fontFamily: 'Times New Roman',
                        //top: responsiveHeight(-4.5),
                      }}
                      value={formatDate(dob)}
                      editable={false}
                    />
                  </TouchableOpacity>
                ) : (
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      top: responsiveHeight(-3.5),
                    }}>
                    {formatDate(dob)}
                  </Text>
                )}
              </View>
            </ImageBackground>
          </View>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dob}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()} // Set maximum date to current date
            />
          )}
          {/* <View style={style.bio_content_section}>
                        <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                            <TouchableOpacity onPress={() => setIsEditing(true)}> 
                                <View style={{ marginLeft: responsiveWidth(0.2), marginTop: responsiveHeight(0.5), width: responsiveWidth(7.2), height: responsiveHeight(4), }}>
                                    <Image source={require("../../../Assets/Userprofile_And_Fonts/update/Dob_Icon.png")} style={{ width: '100%', height: '100%' }} />
                                </View>
                                <View style={style.bioTextContainer}>
                                    {isEditing && (
                                        <DateTimePicker 
                                            value={dob}
                                            mode="date"
                                            display="spinner"
                                            onChange={handleDateChange}
                                        />
                                    )}
                                </View>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View> */}
          {/* ///////////////////////////////////////////////*/}
          <View style={style.bio_content_section}>
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
                  source={require('../../../Assets/Userprofile_And_Fonts/update/Gender_Icon.png')}
                  style={{width: '100%', height: '100%'}}
                />
              </View>
              <View
                style={{
                  bottom: responsiveHeight(5),
                  left: responsiveWidth(9),
                  width: responsiveWidth(40),
                }}>
                {isEditing ? (
                  <Picker
                    selectedValue={gender}
                    onValueChange={(itemValue, itemIndex) =>
                      setGender(itemValue)
                    }>
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                    <Picker.Item label="Others" value="Others" />
                  </Picker>
                ) : (
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      left: responsiveWidth(3),
                      top: responsiveHeight(1.8),
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
                  width: responsiveWidth(7.2),
                  height: responsiveHeight(4),
                  marginLeft: responsiveWidth(1),
                  marginTop: responsiveHeight(0.5),
                }}>
                <Image
                  source={require('../../../Assets/Userprofile_And_Fonts/update/Birthplace_icon.png')}
                  style={{width: '70%', height: '100%'}}
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
                    }}
                    value={country}
                    onChangeText={setCountry}
                    placeholder="Enter your country"
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
                    {country}
                  </Text>
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
                  width: responsiveWidth(7.2),
                  height: responsiveHeight(4),
                  marginLeft: responsiveWidth(1),
                  marginTop: responsiveHeight(0.5),
                }}>
                <Image
                  source={require('../../../Assets/Userprofile_And_Fonts/update/Leaving_Place_icon.png')}
                  style={{width: '70%', height: '100%'}}
                />
              </View>
              <View></View>
              <View style={style.bioTextContainer}>
                {isEditing ? (
                  <TextInput
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      top: responsiveHeight(-4.5),
                    }}
                    value={state}
                    onChangeText={setState}
                    placeholder="Enter Your State"
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
                    {state}
                  </Text>
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
                  width: responsiveWidth(7.2),
                  height: responsiveHeight(4),
                  marginLeft: responsiveWidth(1),
                  marginTop: responsiveHeight(0.5),
                }}>
                <Image
                  source={require('../../../Assets/Userprofile_And_Fonts/update/hometown_icon.png')}
                  style={{width: '100%', height: '100%'}}
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
          </View>
          {/* ///////////////////////////////////////////////*/}
          <View style={style.bio_content_section}>
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
                  source={require('../../../Assets/Userprofile_And_Fonts/update/Work_Exp.png')}
                  style={{width: '100%', height: '100%'}}
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
                    }}
                    value={workExperience}
                    onChangeText={setworkExperience}
                    placeholder="Enter your Experience"
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
                    {workExperience}
                  </Text>
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
                  width: responsiveWidth(7.2),
                  height: responsiveHeight(4),
                  marginLeft: responsiveWidth(1),
                  marginTop: responsiveHeight(0.5),
                }}>
                <Image
                  source={require('../../../Assets/Userprofile_And_Fonts/update/Booking.png')}
                  style={{width: '100%', height: '100%'}}
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
                    }}
                    value={workSchedule}
                    onChangeText={setWorkSchedule}
                    placeholder="Enter your Schedule"
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
                    {workSchedule}
                  </Text>
                )}
              </View>
            </ImageBackground>
          </View>

          {/* ///////////////////////////////////////////////*/}
        </View>
      </View>
      <View style={style.hr_tag} />
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     height: responsiveHeight(8.4),
    //     width: responsiveWidth(88),
    //  //   bottom:responsiveHeight(1),
    //     margin:responsiveHeight(1),
    //  //   margin: responsiveWidth(1),
    //     color: 'black',
    //     resizeMode: 'cover',
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
    left: '22%',
  },
});

// import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
// import { useNavigation } from '@react-navigation/native';
// import { TextInput } from 'react-native';
// import PublicAPI from '@/api/publicAPI';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function Biography() {
//     const navigation = useNavigation();
//     const [isEditing, setIsEditing] = useState(false);
//     const [workExperience, setworkExperience] = useState('');
//     const [workSchedule, setWorkSchedule] = useState('');
//     const [dob, setDob] = useState('');
//     const [gender, setGender] = useState('');
//     const [country, setCountry] = useState('');
//     const [state, setState] = useState('');
//     const [district, setDistrict] = useState('');

//     const [editedDob, setEditedDob] = useState('');
//     const [editeGender, setEditedGender] = useState('');
//     const [editedCountry, setEditedCountry] = useState('');
//     const [editedState, setEditedState] = useState('');
//     const [editedDistrict, setEditedDistrict] = useState('');

//     const onChangeDob = (event, dob) => {
//         const finalDob = dob
//         setDob(finalDob)
//         setEditedDob(finalDob)
//     }
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Retrieve JWT token from AsyncStorage
//                 const jwt = await AsyncStorage.getItem('jwt');
//                 if (jwt) {
//                     // Retrieve user ID from AsyncStorage or any other source
//                     const StoredId = await AsyncStorage.getItem('id');
//                     const userId = parseInt(StoredId);

//                     // If JWT and user ID exist, send them in the request headers and as parameters
//                     const response = await axios.get(`/user/getUserByUserId?userId=${userId}`, {
//                         headers: {
//                             Authorization: `Bearer ${jwt}`
//                         }
//                     });
//                     // Handle response as needed
//                     console.log('Data retrieved:', response.data);
//                     console.log(userId)
//                     setDob(response.data.data.dob);
//                     setGender(response.data.data.gender)
//                     setCountry(response.data.data.country)
//                     setState(response.data.data.state)
//                     setDistrict(response.data.data.district)

//                     // Set initial values for editing to fetched data
//                     setEditedDob(response.data.data.dob);
//                     setEditedGender(response.data.data.gender);
//                     setEditedCountry(response.data.data.country);
//                     setEditedState(response.data.data.state);
//                     setEditedDistrict(response.data.data.district);

//                 } else {
//                     // If JWT does not exist, handle the case accordingly (e.g., redirect to login)
//                     console.log('JWT token not found');
//                     // Handle the scenario where JWT token is not found
//                 }
//             } catch (error) {
//                 console.error('Error fetching data:', error);

//                 console.log(userId)
//                 // Handle error as needed
//             }
//         };

//         fetchData(); // Call the function to fetch data when component mounts
//     }, []);

//     const editSave = async () => {
//         try {
//             // Make PUT API call to update user profile
//             const jwt = await AsyncStorage.getItem('jwt');
//             const userId = await AsyncStorage.getItem('id');

//             const response = await axios.put(
//                 `/user/updateBiographyDetails`,
//                 {
//                     userId: userId,
//                     dob: editedDob,
//                     gender: editeGender,
//                     country: editedCountry,
//                     state: editedState,
//                     district: editedDistrict,
//                     workExperience: workExperience,
//                     workSchedule: workSchedule
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${jwt}`
//                     }
//                 }
//             );

//             console.log('Profile updated successfully:', response.data);
//             console.log(editedDob);
//             // Optionally, you can show a success message to the user

//             setDob(response.data.data.dob);
//             setGender(response.data.data.gender);
//             setCountry(response.data.data.country);
//             setState(response.data.data.state);
//             setDistrict(response.data.data.district);

//             setIsEditing(false); // Move setIsEditing here

//         } catch (error) {
//             console.error('Error updating profile:', error);
//             // Handle error
//         }
//     };
//     return (
//         <>
//             <View style={style.container}>
//                 <View style={style.bio_title}>
//                     <Text style={style.bio_title_text}>Biography</Text>
//                 </View>
//                 <View style={style.bio_content}>
//                     {isEditing ? null : (
//                         <TouchableOpacity onPress={() => setIsEditing(true)} style={{}}>
//                             <Text style={style.editButton}>Edit</Text>
//                         </TouchableOpacity>
//                     )}
//                     {isEditing && (
//                         <TouchableOpacity style={{}} onPress={editSave}>
//                             <Text style={style.saveButton}>Save</Text>
//                         </TouchableOpacity>
//                     )}
//                     <View style={style.bio_content_section}>
//                         <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                             <View style={{ marginLeft: responsiveWidth(0.2), marginTop: responsiveHeight(0.5), width: responsiveWidth(7.2), height: responsiveHeight(4), }}>
//                                 <Image source={require("../../../Assets/Userprofile_And_Fonts/update/Dob_Icon.png")} style={{ width: '100%', height: '100%' }} />
//                             </View>
//                             <View style={style.bioTextContainer}>
//                                 {isEditing ? (
//                                     <TextInput
//                                         style={{
//                                             fontSize: responsiveFontSize(2),
//                                             color: '#000000',
//                                             fontWeight: '500',
//                                             fontFamily: "Times New Roman",
//                                             top: responsiveHeight(-4.5),
//                                         }}
//                                         value={editedDob}
//                                         onChangeText={setEditedDob}
//                                         onChange={onChangeDob}
//                                     />
//                                 ) : (
//                                     <Text style={{
//                                         fontSize: responsiveFontSize(2),
//                                         color: '#000000',
//                                         fontWeight: '500',
//                                         fontFamily: "Times New Roman",
//                                         top: responsiveHeight(-3.5),
//                                     }} >{dob}</Text>)
//                                 }
//                             </View>
//                         </ImageBackground>
//                     </View>
//                     {/* ///////////////////////////////////////////////*/}
//                     <View style={style.bio_content_section}>
//                         <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                             <View style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5) }}>
//                                 <Image source={require("../../../Assets/Userprofile_And_Fonts/update/Gender_Icon.png")}
//                                     style={{ width: '100%', height: '100%' }} />
//                             </View>
//                             <View style={style.bioTextContainer}>
//                                 {isEditing ? (
//                                     <TextInput
//                                         style={{
//                                             fontSize: responsiveFontSize(2),
//                                             color: '#000000',
//                                             fontWeight: '500',
//                                             fontFamily: "Times New Roman",
//                                             top: responsiveHeight(-4.5),
//                                         }}
//                                         value={editeGender}
//                                         onChangeText={setEditedGender}
//                                         placeholder="Enter your gender"
//                                     />
//                                 ) : (
//                                     <Text style={{
//                                         fontSize: responsiveFontSize(2),
//                                         color: '#000000',
//                                         fontWeight: '500',
//                                         fontFamily: "Times New Roman",
//                                         top: responsiveHeight(-3.5),
//                                     }} >{gender}</Text>)
//                                 }
//                             </View>
//                         </ImageBackground>
//                     </View>
//                     {/* ////////////////////////////////////////////*/}
//                     <View style={style.bio_content_section}>
//                         <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                             <View style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5) }}>
//                                 <Image source={require("../../../Assets/Userprofile_And_Fonts/update/Birthplace_icon.png")}
//                                     style={{ width: '70%', height: '100%', }} />
//                             </View>
//                             <View style={style.bioTextContainer}>
//                                 {isEditing ? (
//                                     <TextInput
//                                         style={{
//                                             fontSize: responsiveFontSize(2),
//                                             color: '#000000',
//                                             fontWeight: '500',
//                                             fontFamily: "Times New Roman",
//                                             top: responsiveHeight(-4.5),
//                                         }}
//                                         value={editedCountry}
//                                         onChangeText={setEditedCountry}
//                                         placeholder="Enter your country"
//                                     />
//                                 ) : (
//                                     <Text style={{
//                                         fontSize: responsiveFontSize(2),
//                                         color: '#000000',
//                                         fontWeight: '500',
//                                         fontFamily: "Times New Roman",
//                                         top: responsiveHeight(-3.5),

//                                     }} >{country}</Text>)
//                                 }
//                             </View>
//                         </ImageBackground>
//                     </View>

//                     {/* ///////////////////////////////////////////////*/}
//                     <View style={style.bio_content_section}>
//                         <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                             <View style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5) }}>
//                                 <Image source={require("../../../Assets/Userprofile_And_Fonts/update/Leaving_Place_icon.png")}
//                                     style={{ width: '70%', height: '100%', }} />
//                             </View>
//                             <View>
//                             </View>
//                             <View style={style.bioTextContainer}>
//                                 {isEditing ? (
//                                     <TextInput
//                                         style={{
//                                             fontSize: responsiveFontSize(2),
//                                             color: '#000000',
//                                             fontWeight: '500',
//                                             fontFamily: "Times New Roman",
//                                             top: responsiveHeight(-4.5),
//                                         }}
//                                         value={editedState}
//                                         onChangeText={setEditedState}
//                                         placeholder="Enter Your State"
//                                     />
//                                 ) : (
//                                     <Text style={{
//                                         fontSize: responsiveFontSize(2),
//                                         color: '#000000',
//                                         fontWeight: '500',
//                                         fontFamily: "Times New Roman",
//                                         top: responsiveHeight(-3.5),
//                                     }} >{state}</Text>)
//                                 }
//                             </View>
//                         </ImageBackground>
//                     </View>
//                     {/* ///////////////////////////////////////////////*/}
//                     <View style={style.bio_content_section}>
//                         <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                             <View style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5) }}>
//                                 <Image source={require("../../../Assets/Userprofile_And_Fonts/update/hometown_icon.png")}
//                                     style={{ width: '100%', height: '100%' }} />
//                             </View>
//                             <View style={style.bioTextContainer}>
//                                 {isEditing ? (
//                                     <TextInput
//                                         style={{
//                                             fontSize: responsiveFontSize(2),
//                                             color: '#000000',
//                                             fontWeight: '500',
//                                             fontFamily: "Times New Roman",
//                                             top: responsiveHeight(-4.5),
//                                         }}
//                                         value={editedDistrict}
//                                         onChangeText={setEditedDistrict}
//                                         placeholder="Enter your District"
//                                     />
//                                 ) : (
//                                     <Text style={{
//                                         fontSize: responsiveFontSize(2),
//                                         color: '#000000',
//                                         fontWeight: '500',
//                                         fontFamily: "Times New Roman",
//                                         top: responsiveHeight(-3.5),
//                                     }} >{district}</Text>)
//                                 }

//                             </View>
//                         </ImageBackground>
//                     </View>
//                     {/* ///////////////////////////////////////////////*/}
//                     <View style={style.bio_content_section}>
//                         <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                             <View style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5) }}>
//                                 <Image source={require("../../../Assets/Userprofile_And_Fonts/update/Work_Exp.png")}
//                                     style={{ width: '100%', height: '100%' }} />
//                             </View>
//                             <View style={style.bioTextContainer}>
//                                 {isEditing ? (
//                                     <TextInput
//                                         style={{
//                                             fontSize: responsiveFontSize(2),
//                                             color: '#000000',
//                                             fontWeight: '500',
//                                             fontFamily: "Times New Roman",
//                                             top: responsiveHeight(-4.5),
//                                         }}
//                                         value={workExperience}
//                                         onChangeText={setworkExperience}
//                                         placeholder="Enter your Experience"
//                                     />
//                                 ) : (
//                                     <Text style={{
//                                         fontSize: responsiveFontSize(2),
//                                         color: '#000000',
//                                         fontWeight: '500',
//                                         fontFamily: "Times New Roman",
//                                         top: responsiveHeight(-3.5),
//                                     }} >{workExperience}</Text>)
//                                 }
//                             </View>
//                         </ImageBackground>
//                     </View>
//                     {/* ///////////////////////////////////////////////*/}
//                     <View style={style.bio_content_section}>
//                         <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
//                             <View style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5) }}>
//                                 <Image source={require("../../../Assets/Userprofile_And_Fonts/update/Booking.png")}
//                                     style={{ width: '100%', height: '100%' }} />
//                             </View>
//                             <View style={style.bioTextContainer}>
//                                 {isEditing ? (
//                                     <TextInput
//                                         style={{
//                                             fontSize: responsiveFontSize(2),
//                                             color: '#000000',
//                                             fontWeight: '500',
//                                             fontFamily: "Times New Roman",
//                                             top: responsiveHeight(-4.5),
//                                         }}
//                                         value={workSchedule}
//                                         onChangeText={setWorkSchedule}
//                                         placeholder="Enter your Schedule"
//                                     />
//                                 ) : (
//                                     <Text style={{
//                                         fontSize: responsiveFontSize(2),
//                                         color: '#000000',
//                                         fontWeight: '500',
//                                         fontFamily: "Times New Roman",
//                                         top: responsiveHeight(-3.5),
//                                     }} >{workSchedule}</Text>)
//                                 }
//                             </View>
//                         </ImageBackground>
//                     </View>

//                     {/* ///////////////////////////////////////////////*/}
//                 </View>
//             </View>
//             <View style={style.hr_tag} />
//         </>
//     )
// }

// const style = StyleSheet.create({
//     container: {
//         flexDirection: "row",
//         marginTop: responsiveHeight(5),
//         // height: responsiveHeight(55)
//     },
//     saveButton: {
//         backgroundColor: 'blue',
//         color: 'white',
//         textAlign: 'center',
//         //   paddingVertical: 10,
//         borderRadius: 5,
//     },
//     inputContainer: {
//         //     flexDirection: 'row',
//         //     justifyContent: 'center',
//         //     alignItems: 'center',
//         //     height: responsiveHeight(8.4),
//         //     width: responsiveWidth(88),
//         //  //   bottom:responsiveHeight(1),
//         //     margin:responsiveHeight(1),
//         //  //   margin: responsiveWidth(1),
//         //     color: 'black',
//         //     resizeMode: 'cover',
//         flex: 1,
//         width: '101%',
//         height: '100%',
//     },
//     bio_title: {
//         flex: responsiveWidth(0.2),
//         // borderWidth: 1
//     },
//     editButton: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//         textDecorationLine: 'underline',
//         alignSelf: 'flex-end',
//         paddingRight: responsiveWidth(3),
//         top: responsiveHeight(0.5)

//     },
//     bio_title_text: {
//         fontWeight: "bold",
//         fontSize: responsiveFontSize(3),
//         color: "#323232",
//         marginLeft: responsiveWidth(2),
//         fontFamily: "Times New Roman",
//         textDecorationLine: "underline",
//     },
//     bio_content: {
//         flex: 1,
//         //  borderWidth:1
//     },
//     bio_content_section: {
//         flexDirection: "row",
//         width: responsiveWidth(53),
//         height: responsiveHeight(5.5),
//         // borderWidth:responsiveWidth(0.3),
//         borderRadius: responsiveWidth(2),
//         marginBottom: responsiveHeight(1.5),
//     },
//     // text:{
//     //     fontSize:18,
//     //     color:'#323232',
//     //     fontWeight:'bold',
//     //     marginLeft:20,
//     //     marginTop:6,
//     //     fontFamily:"Times New Roman",
//     // },
//     // hr_tag: {
//     //     borderBottomWidth: responsiveWidth(1.5),
//     //     borderBottomColor: '#D7D7D7',
//     //     marginVertical: responsiveHeight(0.5),
//     // },
//     bioTextContainer: {

//         // left:responsiveWidth(4),
//         left: "22%"

//     }
// })
