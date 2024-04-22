import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PublicAPI from '../../../api/publicAPI';


export default function ForgotPasswordSecondPage() {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword = async () => {
    try {
      const otp = await AsyncStorage.getItem('otp'); // Retrieve OTP from AsyncStorage

      // Check if password fields are empty
      if (!password || !cPassword) {
        Alert.alert('Error', 'Please enter the password.');
        return;
      }

      // Check if passwords match
      if (password !== cPassword) {
        Alert.alert('Error', "Passwords don't match.");
        return;
      }

      const response = await PublicAPI.post(`/user/changePassword`, {
        forgotOtp: otp, // Use retrieved OTP
        password: password
      });

      console.log('Password changed', response.data);
      // Show success message to the user
      Alert.alert('Password Changed', 'Your password has been changed successfully.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error changing password:', error);
      // Show error message to the user
      Alert.alert('Error', 'An error occurred while changing your password. Please try again later.');
    }
  };


  const validatePassword = input => {
    let newSuggestions = [];

    if (input.length < 8) {
      newSuggestions.push('-Password contains "0-9, A-Z, a-z, @-$"');
    }


    setSuggestions(newSuggestions);


  };

  const [suggestions, setSuggestions] = useState([]);


  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.headerContainer}>
          <Image style={{ height: responsiveHeight(25), width: responsiveWidth(46), alignSelf: 'center' }} source={require("../../../Assets/Login_page/FH_logos.png")} resizeMode="stretch" />
        </View>
        <View style={{ height: responsiveHeight(8), width: responsiveWidth(89), marginBottom: responsiveHeight(2), justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ height: responsiveHeight(7), width: responsiveWidth(87) }} source={require('../../../Assets/Login_page/Film_hook.png')} resizeMode="stretch" />
        </View>

        <View style={styles.boxContent}>
          <ImageBackground style={styles.inputContainer} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
            <TextInput
              placeholder="Password"
              maxLength={12}
              placeholderTextColor="black"
              value={password}
              onChangeText={text => {
                //setPassword(text);
                setPassword(text);
                validatePassword(text);
              }}
              secureTextEntry={!showPassword}
              style={styles.input}
            />
            <TouchableOpacity onPress={toggleShowPassword} style={styles.togglePasswordButton}>
              <Image source={showPassword ? require("../../../Assets/SignIn&Up_And_Font/password_eye_show.png") : require("../../../Assets/SignIn&Up_And_Font/eye.png")} style={styles.togglePasswordIcon} />
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
          <ImageBackground style={styles.inputContainer} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
            <TextInput
              placeholder="Confirm Password"
              value={cPassword}
              placeholderTextColor="black"
              onChangeText={(text) => setCPassword(text)}
              secureTextEntry={true}
              style={styles.input}
            />
          </ImageBackground>
        </View>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.resetButtonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    width: '100%',
    height: '100%'
  },
  headerContainer: {
    height: responsiveHeight(25),
    width: responsiveWidth(35)
  },
  boxContent: {
    height: responsiveHeight(8),
    width: responsiveWidth(85.1),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
    borderRadius: responsiveWidth(3.2),
    borderWidth: responsiveWidth(0.3),
    color: 'black'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(8.4),
    width: responsiveWidth(86.7),
    margin: responsiveWidth(3),
    color: 'black',
    resizeMode: 'cover'
  },
  input: {
    fontWeight: '500',
    height: responsiveHeight(6),
    width: '90%',
    fontSize: responsiveFontSize(2),
    paddingHorizontal: responsiveWidth(4),
    color: 'black',
  },
  togglePasswordButton: {
    position: 'absolute',
    right: responsiveWidth(6),
    height: responsiveHeight(2),
    width: responsiveWidth(7)
  },
  togglePasswordIcon: {
    width: "100%",
    height: "100%"
  },
  resetButton: {
    backgroundColor: 'black',
    borderRadius: responsiveWidth(2),
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    top: responsiveHeight(8),
    marginTop: responsiveHeight(2),
    width: responsiveWidth(36),
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(6),
  },
  resetButtonText: {
    color: 'white',
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'bold'
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: responsiveWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(3),
  },
  signInButtonText: {
    color: 'blue',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    textDecorationLine: "underline"
  },
  backTopic: {
    color: 'black',
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
  },
  suggestionsText: {
    color: 'red',
    right:responsiveWidth(12),
    //left: responsiveWidth(1.3),
     bottom: responsiveHeight(1)
  },
});