import React, { useState } from 'react';
import { ImageBackground, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const ChangePasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = async () => {
    try {
      const response = await fetch('http://18.61.66.68:8080/DemoProject-0.0.1-SNAPSHOT/user/changeUserPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyTmFtZSI6IkpvaG4gRG9lIiwidXNlclR5cGUiOiJjb21tb25Vc2VyIiwiaWF0IjoxNzEwMzMwMjkzLCJleHAiOjE3MTAzMzExOTN9.Ko_mw5RzwyX9Jnn2sfRgEx3iNg8zeKMlryDjVuHJZ6e2STcSFlv-EW51Idv9GwYrAdN5hjAcvuIsu42o9T-emw'
        },
        body: JSON.stringify({
          email: email,
          currentPassword: currentPassword,
          newPassword: newPassword
        })
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      // Password changed successfully
      Alert.alert('Success', 'Password changed successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.headerContainer}>
            <Image style={{
              height: responsiveHeight(25),
              width: responsiveWidth(35), alignSelf: 'center'
            }} source={require("../../../Assets/Login_page/FH_logos.png")} resizeMode="stretch" />

          </View>
          <View style={{ height: responsiveHeight(8), width: responsiveWidth(89), marginBottom: responsiveHeight(2), justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ height: responsiveHeight(7), width: responsiveWidth(87) }} source={require('../../../Assets/Login_page/Film_hook.png')} resizeMode="stretch" />

          </View>
          {/* <View style={{ borderWidth:1,justifyContent:'center',alignItems:'center'}}>

          <Text style={styles.header}>Forgot Password</Text>
        </View> */}
          <View style={styles.boxContent}>
            <ImageBackground style={styles.inputContainer} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">

              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor='black'
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </ImageBackground>
          </View>

          <View style={styles.boxContent}>
            <ImageBackground style={styles.inputContainer} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">

              <TextInput
                style={styles.input}
                placeholder="Current Password"
                placeholderTextColor='black'
                onChangeText={text => setCurrentPassword(text)}
                value={currentPassword}
              />
            </ImageBackground>
          </View>
          <View style={styles.boxContent}>
            <ImageBackground style={styles.inputContainer} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">

              <TextInput
                style={styles.input}
                placeholder="New Password"
                placeholderTextColor='black'
                onChangeText={text => setNewPassword(text)}
                value={newPassword}
              />
            </ImageBackground>
          </View>



          <TouchableOpacity style={styles.resetButton} onPress={handleChangePassword} >
            <Text style={styles.resetButtonText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </View>

    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    //padding: responsiveWidth(3),
    backgroundColor: '#f5f5f5',

    width: '100%',
    height: '100%'

  },
  headerContainer: {
    // flexDirection: 'row',
    // alignSelf: 'center',
    // borderWidth:1,
    //bottom:responsiveHeight(5),

    height: responsiveHeight(25),
    width: responsiveWidth(35)

  },
  boxContent: {
    height: responsiveHeight(8),
    width: responsiveWidth(85.1),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(1),
    borderRadius: responsiveWidth(3.2),
    borderWidth: responsiveWidth(0.3),
    color: 'black'

  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //marginBottom: responsiveHeight(2),


    //borderWidth: responsiveWidth(0.4),
    //paddingHorizontal: responsiveWidth(8),
    // borderRadius: responsiveWidth(1),
    height: responsiveHeight(8.4),
    width: responsiveWidth(86.7),

    margin: responsiveWidth(1),
    color: 'black',
    resizeMode: 'cover'

  },


  header: {
    color: '#3545ec',
    fontFamily: 'Italic-trial',
    fontSize: responsiveFontSize(3),
    fontWeight: '500'



  },
  input: {

    height: responsiveHeight(6),
    borderColor: 'black',
    width: '90%',
    fontSize: responsiveFontSize(2),
    // right: responsiveWidth(2),
    color: 'black',
    fontWeight: '500'

  },
  formContainer: {
    width: '100%',
    // height: '60%',
    // padding: responsiveWidth(3),
    backgroundColor: '#f5f5f5',
    borderRadius: responsiveWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(3),
    //  paddingTop: 0,
    // bottom:responsiveHeight(2)
    // borderWidth:1


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
  resetButton: {
    backgroundColor: 'black',
    borderRadius: responsiveWidth(2),
    padding: responsiveWidth(2),

    justifyContent: 'center',
    alignItems: 'center',
    top: responsiveHeight(2),
    marginTop: responsiveHeight(2),
    width: responsiveWidth(40),

    borderRadius: responsiveWidth(3),
    // height: responsiveHeight(6),
  },
  resetButtonText: {
    color: 'white',
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'bold',
    textAlign: ''

  }
});
export default ChangePasswordScreen;