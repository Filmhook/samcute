import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';

import {SelectList} from 'react-native-dropdown-select-list';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {CountryPicker, countryCodes} from 'react-native-country-codes-picker';
// import auth from "@react-native-firebase/auth"
import app from '../../../../FirebaseConfig';
import {addDoc, collection, getDocs, query, where} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpTwo() {
  const route = useRoute();
  const {
    name,
    editedDate,
    selectedGender,
    selectedCountry,
    selectedState,
    selectedDistrict,
  } = route.params;
  // const { checked } = route.params;

  const [otp, setOTP] = useState('');
  const [mail, setMail] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [current, setCurrent] = useState('');
  const [Password, setPassword] = useState('');
  const [living, setLiving] = useState('');
  const [CPassword, setCPassword] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [number, setNumber] = useState('');
  const [show, setShow] = useState(false);

  const [checked, setChecked] = useState(false);
  //const [selected, setSelected] = useState('');
  const navigation = useNavigation();
  const firestore = getFirestore();
  const collectionName = 'userProfile';

  const phonenumber = countryCode + number;

  //-----------------------------------------------------------------

  // const handlepressNav = () => {
  //   if (living === ''|| Password.trim() === '' || CPassword.trim() === '' || mail.trim() === '' || number.trim() === '') {
  //     alert('Nationalit, BirthPlace and Living Place cannot be empty.');
  //   }
  //   else {
  //     navigation.navigate("SignUpThree", { name, dob, nationality, selected, birthcity, living })
  //   }
  // }
  //========================================================

  console.log(editedDate);

  const handleCheckboxPress = () => {
    setChecked(!checked);
  };

  const handleNextPress = () => {
    if (checked) {
      // Navigate to the next screen
      // navigation.navigate('SignUpTwo', { checked, setChecked });
    } else {
      // Show a message or perform some action when the checkbox is not checked
      alert('Please agree to continue.');
    }
  };
  const signUpDemo = () => {
    auth()
      .createUserWithEmailAndPassword('Email@gmail.com', 'Password')
      .then(() => {
        Alert.alert('User Created');
      })
      .catch(err => {
        console.log(err);
      });
  };

  //----------------------------------------------------
  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      const formattedDate = `${selectedDate.getFullYear()}-${(
        '0' +
        (selectedDate.getMonth() + 1)
      ).slice(-2)}-${('0' + selectedDate.getDate()).slice(-2)}`;
      setDate(formattedDate);
      setShowDatePicker(false);
    }
  };
  const handleChange = text => {
    // Keep only digits and hyphens from the input
    const cleanedText = text.replace(/[^\d-]/g, '');
    // Split the text into parts separated by hyphens
    const parts = cleanedText.split('-');
    let formattedDate = '';
    // Format the date based on the parts
    if (parts.length > 0) {
      formattedDate += parts[0].slice(0, 4);
      if (parts[1]) formattedDate += '-' + parts[1].slice(0, 2);
      if (parts[2]) formattedDate += '-' + parts[2].slice(0, 2);
    }
    // Update the state with the formatted date
    setDate(formattedDate);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = input => {
    let newSuggestions = [];

    if (input.length < 8) {
      newSuggestions.push('-Password contains "0-9, A-Z, a-z, @-$"');
    }
    // if (!/\d/.test(input)) {
    //  newSuggestions.push('Add at least one number')
    // }

    // if (!/[A-Z]/.test(input) || !/[a-z]/.test(input)) {
    //  newSuggestions.push('-Include both upper and lower case letters')
    // }

    // if (!/[^A-Za-z0-9]/.test(input)) {
    //  newSuggestions.push('-Include at least one special character')
    // }

    setSuggestions(newSuggestions);

    //  console.log('password '+newSuggestions)

    // Determine password strength based on suggestions
    if (input.length == 0) {
      setStrength('Too Weak');
    } else if (input.length <= 3) {
      setStrength('Weak');
    } else if (input.length >= 3 && input.length <= 5) {
      setStrength('Moderate');
    } else if (input.length >= 5 && input.length < 8) {
      setStrength('Strong');
    } else {
      setStrength('Very Strong');
    }
  };

  const [suggestions, setSuggestions] = useState([]);
  const [strength, setStrength] = useState('');
  // const handlePasswordChange = (text) => {
  //   setPassword(text);
  // };

  const handlePasswordChange = text => {
    setPassword(text);
  };

  const handlePressNav = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

    if (
      Password.trim() === '' ||
      CPassword.trim() === '' ||
      mail.trim() === '' ||
      number.trim() === ''
    ) {
      alert(
        'Mail, Password, Confirm Password and Mobile Number cannot be empty',
      );
    } else if (!emailRegex.test(mail.trim())) {
      alert('Please enter a valid email address');
      return;
    } else if (!passwordRegex.test(Password.trim())) {
      alert('Password contains "0-9, A-Z, a-z, @-$"');
      return;
    } else if (Password.trim().length < 8) {
      alert('password length at least 8 characters');
    } else if (!checked) {
      // Navigate to the next screen

      alert('Oops!! Read the T&C and Enter the OTP received to you Mail Id');
    } else {
      Password === CPassword
        ? // handleNext()
          //  navigation.navigate("SignUpTwo")
          handleRegistration()
        : alert('Password does not match the Confirm Password');
    }
  };
  const getNextUserId = async () => {
    const usersQuery = query(
      collection(firestore, collectionName),
      where('id', '!=', null),
    );
    const userSnapshot = await getDocs(usersQuery);
    return userSnapshot.size + 1;
  };
  const generateUserId = async () => {
    const nextUserId = await getNextUserId();
    return `@FH${nextUserId.toString().padStart(2, '0')}`;
  };
  const commanUser = async () => {
    try {
      const response = await axios.post(
        'https://filmhook.annularprojects.com/filmhook-0.0.1/user/register',
        {
          name: name,
          email: mail,
          password: Password,
          userType: 'commonUser',
          phoneNumber: phonenumber,
          district: selectedDistrict,
          dob: editedDate,
          gender: selectedGender,
          country: selectedCountry,
          state: selectedState,
        },
      );
      console.log('Registration successful:', response.data);
      navigation.navigate('IndustryOne');
      // Handle response as needed
    } catch (error) {
      console.error('Registration failed:', error);
      console.log(
        phonenumber,
        selectedCountry,
        selectedDistrict,
        selectedGender,
        selectedState,
        editedDate,
        mail,
        name,
        Password,
      );
      // Handle error as needed
    }
  };
  const registerUser = async () => {
    try {
      const response = await axios.post(
        'https://filmhook.annularprojects.com/filmhook-0.0.1/user/register',
        {
          name: name,
          email: mail,
          password: Password,
          userType: 'commonUser',
          phoneNumber: phonenumber,
          district: selectedDistrict,
          dob: editedDate,
          gender: selectedGender,
          country: selectedCountry,
          state: selectedState,
        },
      );
      console.log('Registration successful:', response.data);
      navigation.navigate('SignUpLogin');
      // Handle response as needed
    } catch (error) {
      console.error('Registration failed:', error);
      console.log(
        phonenumber,
        selectedCountry,
        selectedDistrict,
        selectedGender,
        selectedState,
        editedDate,
        mail,
        name,
        Password,
      );
      // Handle error as needed
    }
  };

  const handlePhoneNumberChange = text => {
    setNumber(text);

    // Logic to generate OTP when phone number is filled
    if (text.length === 10) {
      // // Generate OTP logic here (e.g., using a library or custom function)
      // const generatedOTP = generateOTP(); // You need to implement this function
      // setOTP(generatedOTP);
    } else {
      setOTP(''); // Clear OTP if phone number is not valid
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.header}>STEP 2 </Text>

          <View
            style={{
              height: responsiveHeight(14),
              width: responsiveWidth(89),
              marginBottom: responsiveHeight(2),
              flexDirection: 'row',
              position: 'relative',
            }}>
            <Image
              style={{
                height: responsiveHeight(15.2),
                width: responsiveWidth(30),
                alignSelf: 'center',
              }}
              source={require('../../../Assets/Login_page/FH_logos.png')}
              resizeMode="stretch"
            />

            <Image
              style={{
                height: responsiveHeight(6.2),
                width: responsiveWidth(65),
                position: 'absolute',
                left: responsiveWidth(15),
                top: responsiveHeight(8),
              }}
              source={require('../../../Assets/Login_page/Film_hook_name.png')}
              resizeMode="stretch"
            />
            <Text
              style={{
                color: 'blue',
                fontWeight: 'bold',
                position: 'absolute',
                left: responsiveWidth(60),
                top: responsiveHeight(14),
              }}>
              Public User
            </Text>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: responsiveHeight(3),
            }}>
            <View style={styles.boxContent}>
              <ImageBackground
                style={styles.inputContainer}
                source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">
                <TextInput
                  placeholder="Enter Your Email ID"
                  value={mail}
                  placeholderTextColor="black"
                  onChangeText={setMail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={{
                    fontWeight: '500',
                    height: responsiveHeight(8.2),
                    width: responsiveWidth(85),
                    fontSize: responsiveFontSize(2),
                    paddingHorizontal: responsiveWidth(4),
                  }}
                />
              </ImageBackground>
            </View>

            <View style={styles.boxContent}>
              <ImageBackground
                style={styles.inputContainer}
                source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">
                <TextInput
                  placeholder="Password"
                  maxLength={12}
                  placeholderTextColor="black"
                  value={Password}
                  onChangeText={text => {
                    //setPassword(text);
                    handlePasswordChange(text);
                    validatePassword(text);
                  }}
                  // onEndEditing={handlepress}

                  secureTextEntry={!showPassword} // Use secureTextEntry based on showPassword state
                  style={{
                    fontWeight: '500',
                    height: responsiveHeight(8.4),
                    width: responsiveWidth(86.7),
                    fontSize: responsiveFontSize(2),
                    paddingHorizontal: responsiveWidth(4),
                    //  borderWidth:1
                  }}
                />

                <TouchableOpacity
                  onPress={toggleShowPassword}
                  style={{
                    position: 'absolute',
                    right: responsiveWidth(6),
                    height: responsiveHeight(2),
                    width: responsiveWidth(7),
                  }}>
                  {showPassword ? (
                    <Image
                      source={require('../../../Assets/SignIn&Up_And_Font/password_eye_show.png')}
                      style={{width: '100%', height: '100%'}}
                    />
                  ) : (
                    <Image
                      source={require('../../../Assets/SignIn&Up_And_Font/eye.png')}
                      style={{width: '100%', height: '100%'}}
                    />
                  )}
                </TouchableOpacity>
              </ImageBackground>
            </View>

            <Text style={styles.suggestionsText}>
              {suggestions.map((suggestion, index) => (
                <Text key={index}>
                  {suggestion}
                  {'\n'}
                </Text>
              ))}
            </Text>

            <View style={styles.boxContent}>
              <ImageBackground
                style={styles.inputContainer}
                source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                resizeMode="stretch">
                <TextInput
                  placeholder="Confirm Password"
                  value={CPassword}
                  placeholderTextColor="black"
                  onChangeText={setCPassword}
                  secureTextEntry={true}
                  style={{
                    height: responsiveHeight(8.4),
                    width: responsiveWidth(86.7),
                    // padding: responsiveWidth(1),
                    // left: responsiveWidth(2),
                    fontSize: responsiveFontSize(2),
                    fontWeight: '500',
                    paddingHorizontal: responsiveWidth(4),
                  }}
                />
              </ImageBackground>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: responsiveHeight(2.2),
                width: responsiveWidth(86.7),
                columnGap: responsiveWidth(5),
              }}>
              {/* <ImageBackground style={styles.inputContainerPhn} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}> */}

              {/* </ImageBackground> */}

              <TouchableOpacity
                onPress={() => setShow(true)}
                style={{
                  width: responsiveWidth(25),
                  height: responsiveHeight(7),
                  //  padding: responsiveWidth(1),
                  borderWidth: responsiveWidth(0.5),
                  borderColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  //  bottom:responsiveHeight(7),
                  borderRadius: responsiveWidth(2),
                  // shadowOffset: { width: 1, height: 4 }, // Shadow offset
                  // shadowOpacity: 0.6, // Shadow opacity
                  // shadowRadius: 2, // Shadow radius
                  // elevation: 1,
                  // shadowColor: 'gray',
                }}>
                <ImageBackground
                  style={styles.changeinputContainer}
                  source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                  resizeMode="stretch">
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: responsiveFontSize(2),
                      borderRadius: 20,
                      alignSelf: 'center',
                      fontWeight: '500',
                    }}>
                    {countryCode || `+${countryCode}`}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <View style={styles.inputContainerPhn}>
                  <ImageBackground
                    style={styles.changenumber}
                    source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                    resizeMode="stretch">
                    <TextInput
                      placeholder="Phone Number"
                      value={number}
                      placeholderTextColor={'black'}
                      onChangeText={handlePhoneNumberChange}
                      keyboardType={'phone-pad'}
                      style={{
                        alignSelf: 'center',
                        height: responsiveHeight(6.5),
                        width: responsiveWidth(40),
                        paddingHorizontal: responsiveWidth(4),
                        fontSize: responsiveFontSize(2),
                        fontWeight: '500',
                      }}
                    />
                  </ImageBackground>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  borderRadius: responsiveWidth(2),
                  marginTop: responsiveHeight(1.5),
                  marginLeft: responsiveWidth(2),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#2d51c5',
                  height: responsiveHeight(4),
                  width: responsiveWidth(20),
                  borderWidth: responsiveWidth(0),
                }}>
                <Text style={{color: 'white'}}>SEND OTP</Text>
              </TouchableOpacity>

              {/* OTP TextInput */}
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {number.length == 10 && (
                <>
                  <ImageBackground
                    style={styles.otpContainer}
                    source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                    resizeMode="stretch">
                    <TextInput
                      placeholder="Enter OTP"
                      value={otp}
                      placeholderTextColor={'black'}
                      onChangeText={setOTP}
                      keyboardType={'numeric'}
                      style={{
                        height: responsiveHeight(5),
                        paddingHorizontal: responsiveWidth(4),
                        fontSize: responsiveFontSize(1.8),
                        fontWeight: '500',
                        // borderWidth:5
                      }}
                    />
                  </ImageBackground>
                  <TouchableOpacity
                    style={{
                      borderRadius: responsiveWidth(2),
                      marginBottom: responsiveHeight(2),
                      marginRight: responsiveWidth(-4),
                      marginLeft: responsiveWidth(-11),
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#2d51c5',
                      height: responsiveHeight(3),
                      width: responsiveWidth(15),
                      borderWidth: responsiveWidth(0),
                    }}>
                    <Text style={{color: 'white'}}>Verify</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            <TouchableOpacity
              onPress={commanUser}
              style={{
                // padding: 15,
                borderRadius: responsiveWidth(2),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#2d51c5',
                height: responsiveHeight(4),
                width: responsiveWidth(40),
                borderWidth: responsiveWidth(0.5),
                marginTop: responsiveHeight(2),
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(1.5),
                }}>
                Get verify as Industry
              </Text>
            </TouchableOpacity>

            <View
              style={{flexDirection: 'row', marginTop: responsiveHeight(2)}}>
              <TouchableOpacity onPress={handleCheckboxPress}>
                <View
                  style={{
                    width: responsiveWidth(6),
                    height: responsiveWidth(6),
                    // borderRadius: responsiveWidth(6),
                    borderWidth: responsiveWidth(0.5),
                    borderColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {checked && (
                    <Image
                      source={require('../../../Assets/Login_page/greenTickmark-FilmHook.png')}
                      style={{
                        height: responsiveHeight(3),
                        width: responsiveWidth(6),
                        bottom: responsiveHeight(0.8),
                        left: responsiveWidth(0.8),
                      }}></Image>
                  )}
                </View>
              </TouchableOpacity>

              <Text
                style={{
                  left: responsiveWidth(3),
                  fontWeight: '500',
                  fontSize: responsiveFontSize(1.8),
                  bottom: responsiveHeight(0.5),
                  color: 'black',
                }}>
                I agree to the
                <TouchableOpacity
                  onPress={() => navigation.navigate('Terms&Conditions')}>
                  <Text style={{color: '#0c92f0'}}> Terms & Conditions </Text>
                </TouchableOpacity>
                and
                <Text style={{color: '#0c92f0'}}> Privacy Policy </Text>
              </Text>
            </View>

            {/* <TouchableOpacity onPress={() => navigation.navigate('GeneralAck')} style={{
              // padding: 15,
              borderRadius: responsiveWidth(2),
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: '#2d51c5',
              height: responsiveHeight(4),
              width: responsiveWidth(80),
              top: responsiveHeight(2)
            }}> */}

            {/* <Text style={{
                color: 'blue',
                fontWeight: '400',
                fontSize: responsiveFontSize(1.8), textDecorationLine: 'underline'
              }}>Read the Terms and Conditions, Privacy Policy</Text> */}
            {/* </TouchableOpacity> */}

            <View
              style={{
                flexDirection: 'row',
                columnGap: responsiveWidth(26),
                marginTop: responsiveHeight(3),
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUpOne')}
                style={{
                  // padding: 15,
                  borderRadius: responsiveWidth(2),
                  justifyContent: 'center',

                  alignItems: 'center',

                  borderWidth: responsiveWidth(0.4),
                  backgroundColor: 'black',
                  height: responsiveHeight(6),
                  width: responsiveWidth(30),
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: responsiveFontSize(2),
                    height: responsiveHeight(3),
                  }}>
                  Back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={registerUser}
                style={styles.nextButton}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: responsiveFontSize(2),
                    height: responsiveHeight(3),
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <CountryPicker
            show={show}
            style={{
              height: 20,
              paddingLeft: 5,
              modal: {
                height: responsiveHeight(55),
                backgroundColor: 'white',
              },
            }}
            pickerButtonOnPress={item => {
              setCountryCode(item.dial_code);
              setShow(false);
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // padding: responsiveWidth(3),
    backgroundColor: '#f5f5f5',

    width: '100%',
    height: '100%',
  },
  headerContainer: {
    height: responsiveHeight(25),
    width: responsiveWidth(35),
    bottom: responsiveHeight(1),
  },
  suggestionsText: {
    color: 'red',
    left: responsiveWidth(1.3),
    // bottom: responsiveHeight(1)
  },

  inputContainerPhn: {
    // justifyContent:'center',
    alignItems: 'center',

    // borderWidth: responsiveWidth(0.4),
    // paddingHorizontal: responsiveWidth(8),
    borderRadius: responsiveWidth(2),
    height: responsiveHeight(7),
    width: responsiveWidth(30),

    // shadowOffset: { width: 1, height: 4 }, // Shadow offset
    // shadowOpacity: 0.6, // Shadow opacity
    // shadowRadius: 2, // Shadow radius
    // elevation: 1,
    // shadowColor: 'gray',

    // borderColor: 'black',
  },
  changeinputContainer: {
    height: responsiveHeight(6),
    width: responsiveWidth(24),

    borderRadius: responsiveWidth(1),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changenumber: {
    marginTop: 'auto',
    marginBottom: 'auto',

    height: responsiveHeight(6),
    width: responsiveWidth(38),
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    overflow: 'hidden',
  },
  otpContainer: {
    justifyContent: 'center',
    // alignItems:'center',
    marginRight: responsiveWidth(16),
    marginLeft: responsiveWidth(20),
    marginBottom: responsiveHeight(1),
    height: responsiveHeight(4),
    width: responsiveWidth(38),
    borderRadius: responsiveWidth(2),
    // overflow: 'hidden'
  },

  boxContent: {
    height: responsiveHeight(8.3),
    width: responsiveWidth(85.1),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(2.2),
    //marginBottom: responsiveHeight(2),
    borderRadius: responsiveWidth(3.2),
    //  borderWidth: responsiveWidth(0.4),
    color: 'black',
  },
  boxContentConfirm: {
    height: responsiveHeight(8.3),
    width: responsiveWidth(85.1),
    justifyContent: 'center',
    alignItems: 'center',
    //  marginTop:responsiveHeight(1),
    marginBottom: responsiveHeight(1.5),
    borderRadius: responsiveWidth(3.2),
    // borderWidth: responsiveWidth(0.2),
    color: 'black',
  },
  boxContentPassword: {
    height: responsiveHeight(8.3),
    width: responsiveWidth(85.1),
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop:responsiveHeight(1),
    marginBottom: responsiveHeight(1),
    borderRadius: responsiveWidth(3.2),
    // borderWidth: responsiveWidth(0.2),
    color: 'black',
  },

  inputLiving: {
    height: responsiveHeight(6),
    borderColor: 'black',
    width: '90%',
    fontSize: responsiveFontSize(2),
    // right: responsiveWidth(2),
    color: 'black',
    fontWeight: '500',
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(8.4),
    width: responsiveWidth(86.7),
    margin: responsiveWidth(1),
    color: 'black',
    marginBottom: responsiveHeight(2),
    //resizeMode: 'cover',
  },
  formContainer: {
    width: '100%',
    // height:'100%',

    padding: responsiveWidth(3),
    backgroundColor: '#f5f5f5',
    borderRadius: responsiveWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(1),
    //borderWidth:2
  },
  titleContainer: {},
  countryPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    //  borderWidth: responsiveWidth(0.4),
    //borderColor: 'gray',
    width: responsiveWidth(83),
    paddingHorizontal: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
    height: responsiveHeight(5.5),
    backgroundColor: 'transparent',
  },
  nextButton: {
    backgroundColor: '#616161',
    // padding: responsiveWidth(2.5),
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    height: responsiveHeight(6),
    width: responsiveWidth(30),
    borderWidth: responsiveWidth(0.6),
    borderColor: 'black',
    //bottom: responsiveHeight(1.5)
  },
  header: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1.6),
    color: '#1e1ff5',
    fontFamily: 'ArianaVioleta-dz2K',
    textAlign: 'center',
    left: responsiveWidth(35),
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
