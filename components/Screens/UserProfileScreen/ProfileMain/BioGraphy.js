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

export default function Biography() {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  //const [dob, setDob] = useState('131');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [district, setDistrict] = useState();
  const [workExperience, setworkExperience] = useState('');
  const [workSchedule, setWorkSchedule] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {

    console.log('hiioiiiii')
    // Save the edited profile details
    setIsEditing(false);
    // You can send the updated profile details to your backend or update the state accordingly
  };

const bio=()=>{
    if(userType === "IndustryUser"){
      return(
        <View>
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
                  textAlign:'center',
                  left:responsiveWidth(3)
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
                  textAlign:'center',
                  left:responsiveWidth(3)
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
      </View>
      )
    }
    return null;
  }

const [userType,setuserType]=useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const jwt = await AsyncStorage.getItem('jwt');
        const value=await AsyncStorage.getItem('usertype')
        if(value !== null){
         setuserType(value)
        }
        console.log('usertype:',value)

        const response = await PublicAPI.get(`user/getUserByUserId?userId=${userId}`, {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });

        const user = response.data.data;
        setDob(user.dob ? moment(user.dob).toDate() : new Date());
        setGender(user.gender || '');
        setCountry(user.country || '');
        setState(user.state || '');
        setDistrict(user.district || '');
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
    const userIdString = userId.toString();
    const jwt = await AsyncStorage.getItem('jwt');


    console.log('edit iiiiiii', userIdString)

    const url = 'https://filmhook.annularprojects.com/filmhook-0.0.1-SNAPSHOT/user/updateBiographyDetails';
    const requestBody = {
      userId: userId,
      dob: moment(dob).format('YYYY-MM-DD'), // Format dob as 'yyyy-mm-dd'
      gender: gender,
      country: country,
      state: state,
      district: district,



    };



    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}` // Include the JWT token in the Authorization header
        },
        body: JSON.stringify(requestBody),
      });

      console.log('User data:', response.data);
      if (!response.ok) {
        throw new Error('Failed to update personal info');
      }



      setIsEditing(false)
      Alert.alert('Success', 'Personal info updated successfully');
    } catch (error) {
      // setIsLoading(false);
      Alert.alert('Error', error.message);
    }
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
    const day = formattedDate.getDate().toString().padStart(2, '0'); // Add leading zero if needed
    return `${year}-${month}-${day}`;
  };




  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(Platform.OS === 'ios');
    setDob(currentDate);
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  // const formatDate = dateStr => {
  //   let date= new Date(dateStr)
  //   const year = date.getFullYear();
  //   let month = date.getMonth() + 1;
  //   let day = date.getDate();

  //   month = month < 10 ? '0' + month : month;
  //   day = day < 10 ? '0' + day : day;

  //   return `${year}-${month}-${day}`;
  // };

  return (
    <>
      <View style={style.container}>
        <View style={style.bio_title}>
          <Text style={style.bio_title_text}>BIOGRAPHY</Text>
        </View>


        {/* ///////////////////////////////////////////////*/}
        <View style={style.bio_content}>
          <View>
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
                  marginLeft: responsiveWidth(0.2),
                  marginTop: responsiveHeight(0.5),
                  width: responsiveWidth(8),
                  height: responsiveHeight(4),
                }}>
                <Image
                  source={require('../../../Assets/Userprofile_And_Fonts/update/Dob_Icon.png')}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="stretch"
                />
              </View>

              <View style={style.bioTextContainer}>
                {/* {isEditing ? (
                  <TouchableOpacity onPress={openDatePicker}>
                    <TextInput
                      style={{
                        fontSize: 16,
                        color: '#000000',
                        fontWeight: '500',
                        fontFamily: 'Times New Roman',
                      }}
                      value={dob} // Format the date string
                      editable={false}
                    />
                  </TouchableOpacity>
                ) : (
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#000000',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                    }}>
                    {dob}
                  </Text>
                )}

                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={dob}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateChange}
                    maximumDate={new Date()}
                  />
                )} */}
                {isEditing ? (
                  <TouchableOpacity onPress={openDatePicker} style={{bottom:responsiveHeight(5),width:responsiveWidth(40)}}>
                    <TextInput
                      style={{ paddingHorizontal:responsiveWidth(8),fontSize: responsiveFontSize(2), color: '#000000', fontWeight: '500', fontFamily: 'Times New Roman' }}
                      value={moment(dob).format('YYYY-MM-DD')}
                      editable={false}
                    />
                  </TouchableOpacity>
                ) : (
                  <Text  style={{
                    fontSize: responsiveFontSize(2),
                    color: '#000000',
                    fontWeight: '500',
                    fontFamily: 'Times New Roman',
                    bottom:responsiveHeight(3)
                  }} >{moment(dob).format('YYYY-MM-DD')}</Text>
                )}
                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={dob}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateChange}
                    maximumDate={new Date()}
                  />
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
                  width: responsiveWidth(7.2),
                  height: responsiveHeight(4),
                  marginLeft: responsiveWidth(1),
                  marginTop: responsiveHeight(0.5),
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
                  width: responsiveWidth(37),
                  height:responsiveHeight(4),
                 // borderWidth:1,
                  justifyContent:'center',
                  alignSelf:'center'
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
                      //top: responsiveHeight(1.8),
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
                  style={{ width: '70%', height: '100%' }}
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
                      textAlign:'center'
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
                  style={{ width: '70%', height: '100%' }}
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
                      alignSelf:'center',
                      fontFamily: 'Times New Roman',
                      top: responsiveHeight(-4.5),
                      textAlign:'center'

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
                      textAlign:'center'
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
          <View>
          {bio()}
          </View>
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
    color:'black'
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
  //  left: '22%',
    justifyContent:'center',
    alignItems:'center'
  },
});