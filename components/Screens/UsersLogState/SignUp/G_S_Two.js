import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
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

import { SelectList } from 'react-native-dropdown-select-list';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { CountryPicker, countryCodes } from 'react-native-country-codes-picker';
import CheckBox from '@react-native-community/checkbox';

// import auth from "@react-native-firebase/auth"
import app from '../../../../FirebaseConfig';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import PublicAPI from '../../../api/publicAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

export default function SignUpTwo() {
  const route = useRoute();
  const {
    name,
    selectedDate,
    selectedGender,
    selectedCountry,
    selectedState,
    selectedDistrict,
    middleName,
    lastName,
  } = route.params;
  // const { checked } = route.params;

  const [mail, setMail] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [current, setCurrent] = useState('');
  const [Password, setPassword] = useState('');
  const [living, setLiving] = useState('');
  const [CPassword, setCPassword] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [number, setNumber] = useState('');
  const [show, setShow] = useState(false);
  const [otp, setOTP] = useState('');

  const [isOtpEntered, setIsOtpEntered] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);


  const [checked, setChecked] = useState(false);
  //const [selected, setSelected] = useState('');
  const navigation = useNavigation();
  const firestore = getFirestore();
  const collectionName = 'userProfile';

  const phonenumber = number;

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


  //----------------------------------------------------


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
    }


    else if (!emailRegex.test(mail.trim())) {
      alert('Please enter a valid email address');
      return;
    } else if (!passwordRegex.test(Password.trim())) {
      alert('Password contains "0-9, A-Z, a-z, @-$"');
      return;
    } else if (Password.trim().length < 8) {
      alert('password length at least 8 characters');

    } else {
      Password === CPassword
        ? // handleNext()
        //  navigation.navigate("SignUpTwo")
        submit()
        : alert('Password does not match the Confirm Password');
    }
  };

  console.log('names ', name,
    selectedDate,
    selectedGender,
    selectedCountry,
    selectedState,
    selectedDistrict,
    middleName,
    lastName,)

  const [loading, setLoading] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);

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

  // const commanUser = async () => {
  //   try {
  //     const response = await PublicAPI.post('/user/register', {
  //       name: name,
  //       email: mail,
  //       password: Password,
  //       userType: 'commonUser',
  //       phoneNumber: phonenumber,
  //       district: selectedDistrict,
  //       dob: editedDate,
  //       gender: selectedGender,
  //       country: selectedCountry,
  //       state: selectedState
  //     });

  //     console.log('Registration successful:', response.data);
  //     navigation.navigate('Otp');

  //   } catch (error) {
  //     console.error('Registration failed:', error);
  //     console.log(phonenumber, selectedCountry, selectedDistrict, selectedGender, selectedState, editedDate, mail, name, Password);
  //     // Handle error as needed
  //   }
  // };
  const submit = async () => {
    setLoading(true); // Set loading state to true when submitting
    try {
      const response = await PublicAPI.post('/user/register', {
        firstName: name,
        lastName: lastName,
        middleName: middleName,
        email: mail,
        password: Password,
        userType: 'commonUser',
        phoneNumber: phonenumber,
        district: selectedDistrict,
        dob: selectedDate,
        gender: selectedGender,
        country: selectedCountry,
        state: selectedState,
      });
      const userDetails = response.data.data.userDetails;
      console.log('submit', userDetails)
      const userId = userDetails.userId;
      await AsyncStorage.setItem('userId', userId.toString());
      const storedId = await AsyncStorage.getItem('userId');
      console.log("idddddddd", storedId);
      const mailId = userDetails.email;
      await AsyncStorage.setItem('mail', mailId)
      const strmail = await AsyncStorage.getItem('mail')
      console.log(strmail)
      Alert.alert('Registration successful OTP Sent');
      console.log(response.data.data.userDetails.userId);
      await AsyncStorage.setItem('userId', response.data.data.userDetails.userId?.toString());
      console.log('Registration successful:', response.data);
      // navigation.navigate('IndustryTwo')
    } catch (error) {
      Alert.alert('Registration failed');
      console.error('Registration failed:', error);
    } finally {
      setLoading(false); // Set loading state to false after response received
    }
  };

  const emailOtp = async () => {
    try {
      if (!checked) {
        Alert.alert('Error', 'Please agree to continue')
        return;
      }

      const userId = await AsyncStorage.getItem('userId');
      const response = await PublicAPI.post(`/user/emailNotification`, {
        userId: userId
      });
      Alert.alert("Otp sent to your email")
      console.log("email sent ", response.data)
      navigation.navigate('Otp_GS')
    } catch (error) {
      console.error(error)
    }
  };
  const emailOtpIs = async () => {
    try {
      if (!checked) {
        Alert.alert('Error', 'Please agree to continue')
        return;
      }

      const userId = await AsyncStorage.getItem('userId');
      const response = await PublicAPI.post(`/user/emailNotification`, {
        userId: userId
      });
      Alert.alert("Otp sent to your email")
      console.log("email sent ", response.data)
      navigation.navigate('Otp')
    } catch (error) {
      console.error(error)
    }
  };



  const verify = async () => {

   
    try {
      const response = await PublicAPI.post(`/user/verify`, {
        otp: otp,
      });
      Alert.alert("Mobile verified")
      console.log('Mobile verified', response.data);
      setIsMobileVerified(true); // Set mobile verified to true if OTP is successfully verified
    } catch (error) {
      Alert.alert("Invalid OTP")
      console.error('Error', error);
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
      // Clear OTP if phone number is not valid
    }
  };



  const handleOtpChange = (text) => {
    setOTP(text);
    setIsOtpEntered(text.trim() !== '');
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
                  placeholder="ENTER YOUR EMAIL ID"
                  value={mail}
                  placeholderTextColor="black"
                  onChangeText={setMail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={{
                    color: "#000",
                    fontWeight: '500',
                    height: responsiveHeight(8.2),
                    width: responsiveWidth(85),
                    fontSize: responsiveFontSize(2),
                    paddingHorizontal: responsiveWidth(4),
                    // borderWidth:1,
                    borderRadius: responsiveWidth(3.2)
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
                  placeholder="PASSWORD"
                  maxLength={30}
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
                    color: "#000",
                    fontWeight: '500',
                    height: responsiveHeight(8.2),
                    width: responsiveWidth(85),
                    fontSize: responsiveFontSize(2),
                    paddingHorizontal: responsiveWidth(4),

                    borderRadius: responsiveWidth(3.2)
                  }}
                />

                <TouchableOpacity
                  onPress={toggleShowPassword}
                  style={{
                    color: "#000",
                    position: 'absolute',
                    right: responsiveWidth(6),
                    height: responsiveHeight(2),
                    width: responsiveWidth(7),
                  }}>
                  {/* {showPassword ? (
                    <Image
                      source={require('../../../Assets/SignIn&Up_And_Font/password_eye_show.png')}
                      style={{ width: '100%', height: '100%' }}
                    />
                  ) : (
                    <Image
                      source={require('../../../Assets/SignIn&Up_And_Font/eye.png')}
                      style={{ width: '100%', height: '100%' }}
                    />
                  )} */}
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
                  placeholder="CONFIRM PASSWORD"
                  value={CPassword}
                  placeholderTextColor="black"
                  onChangeText={setCPassword}
                  //  secureTextEntry={true}
                  secureTextEntry={!showPassword}
                  style={{
                    color: "#000",
                    fontWeight: '500',
                    height: responsiveHeight(8.2),
                    width: responsiveWidth(85),
                    fontSize: responsiveFontSize(2),
                    paddingHorizontal: responsiveWidth(4),

                    borderRadius: responsiveWidth(3.2)
                  }}
                />
              </ImageBackground>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', right: responsiveWidth(22) }}>
              <CheckBox
                value={showPassword}
                onValueChange={toggleShowPassword}
              />
              <Text style={{ fontSize: responsiveFontSize(2), color: 'black' }}>Show Password</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: responsiveHeight(2.2),
                width: responsiveWidth(86.7),
                columnGap: responsiveWidth(3),
                paddingHorizontal: 2
              }}>
              {/* <ImageBackground style={styles.inputContainerPhn} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}> */}

              {/* </ImageBackground> */}

              <TouchableOpacity
                onPress={() => setShow(true)}
                style={{
                  width: responsiveWidth(20),
                  height: responsiveHeight(7),
                  //  padding: responsiveWidth(1),

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

                      alignSelf: 'center',
                      fontWeight: '500',
                    }}>
                    {countryCode || `+${countryCode}`}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <View style={{
                flexDirection: 'column', alignItems: 'center', height: responsiveHeight(6.5),
                width: responsiveWidth(40), borderRadius: responsiveWidth(3.2)
              }}>
                <View style={styles.inputContainerPhn}>
                  <ImageBackground
                    style={styles.changenumber}
                    source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                    resizeMode="stretch">
                    <TextInput
                      placeholder="PHONE NUMBER"
                      value={number}
                      placeholderTextColor={'black'}
                      onChangeText={handlePhoneNumberChange}
                      keyboardType={'phone-pad'}
                      style={{
                        color: "#000",
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

              {loading ? (
                <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />
              ) : (

                <TouchableOpacity
                  style={{
                    borderRadius: responsiveWidth(2),
                    marginTop: responsiveHeight(1.5),
                    //  marginLeft: responsiveWidth(2),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#2d51c5',
                    height: responsiveHeight(4),
                    width: responsiveWidth(20),
                    borderWidth: responsiveWidth(0),
                  }}>
                  <Text style={{ color: 'white' }} onPress={handlePressNav}>
                    SEND OTP
                  </Text>
                </TouchableOpacity>
              )}
              {/* OTP TextInput */}
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                      onChangeText={handleOtpChange}
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
                      onPress={verify}
                      disabled={!isOtpEntered || isMobileVerified}
                      style={

                        [styles.verifyButton, !isOtpEntered && styles.disabledButton]}>
                      <Text style={{ color: 'white' }}>Verify</Text>
                    </TouchableOpacity>
                
                </>
              )}
            </View>

            <TouchableOpacity
              onPress={emailOtpIs}
              style={[styles.buttonIs, !isMobileVerified && styles.disabledButton]
              }
              disabled={!isMobileVerified}
            >
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2),
                }}>
                Get verify as Industry
              </Text>
            </TouchableOpacity>

            <View
              style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
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

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    left: responsiveWidth(3),
                    fontWeight: '500',
                    fontSize: responsiveFontSize(1.8),
                    color: 'black',
                    left: responsiveWidth(2)
                  }}>
                  I agree to the
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Terms&Conditions')}>
                  <Text style={{ color: '#0c92f0', left: responsiveWidth(2) }}> Terms & Conditions </Text>
                </TouchableOpacity>
                <Text style={{
                  left: responsiveWidth(2),
                  fontWeight: '500',
                  fontSize: responsiveFontSize(1.8),
                  color: 'black',
                }}> and </Text>
                <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
                  <Text style={{ color: '#0c92f0', left: responsiveWidth(2) }}> Privacy Policy </Text>
                </TouchableOpacity>
              </View>
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
                onPress={() => navigation.navigate('SignUpCountry', {
                  name,
                  selectedDate,
                  selectedGender,
                  selectedCountry,
                  selectedState,
                  selectedDistrict,
                  middleName,
                  lastName,
                })}
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
                style={[styles.nextButton, !isMobileVerified && styles.disabledButton]}
                disabled={!isMobileVerified}
                onPress={emailOtp}>
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
    backgroundColor: '#F0F0F0',

    width: '100%',
    height: '100%',
  },
  verifyButton: {
    borderRadius: responsiveWidth(2),
    marginBottom: responsiveHeight(2),
    marginRight: responsiveWidth(-4),
    marginLeft: responsiveWidth(-13),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d51c5',
    height: responsiveHeight(4),
    width: responsiveWidth(20),
    borderWidth: responsiveWidth(0),
    marginTop: responsiveHeight(1)
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
  disabledButton: {
    opacity: 0.5, // Reduce opacity instead of changing background color
  },

  buttonIs: {
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d51c5',
    height: responsiveHeight(5),
    width: responsiveWidth(50),
    borderWidth: responsiveWidth(0.5),
    marginTop: responsiveHeight(2),

  },

  inputContainerPhn: {
    // justifyContent:'center',
    alignItems: 'center',


    borderRadius: responsiveWidth(2),
    height: responsiveHeight(6),
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
    width: responsiveWidth(20),



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
    marginLeft: responsiveWidth(24),
    marginBottom: responsiveHeight(1),
    height: responsiveHeight(5),
    width: responsiveWidth(38),
    borderRadius: responsiveWidth(2),
    marginTop: responsiveHeight(1)
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
    backgroundColor: '#F0F0F0',
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


