import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import app from '../../../../FirebaseConfig';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


export default function Forgetpass() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      const auth = getAuth(app);
      await sendPasswordResetEmail(auth, email);

      // Show a success message to the user
      Alert.alert(
        'Password Reset Email Sent',
        'Please check your email to reset your password.'
      );
    } catch (error) {
      console.error('Error sending password reset email:', error.message);

      // Show an error message to the user
      Alert.alert('Error', 'Failed to send password reset email. Please try again.');
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

          <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'center', alignItems: 'center', top: responsiveHeight(2.2) }}>

            <Text style={styles.backTopic}>Already have an account </Text>
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.signInButtonText}> Login</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.resetButton} onPress={handleForgotPassword} >
            <Text style={styles.resetButtonText}>Reset Password</Text>
          </TouchableOpacity> 
        </View>
      </View>

    </>
  )
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
  }

});