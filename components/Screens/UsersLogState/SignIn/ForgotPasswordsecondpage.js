import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPasswordsecondpage() {
    const navigation = useNavigation();
  const [Password, setPassword] = useState('');
  const [CPassword, setCPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword = async () => {
    // Implement your password reset logic here
    Alert.alert('Password Reset Email Sent', 'Please check your email to reset your password.');
  };

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
              placeholder="Reenter Password"
              maxLength={12}
              placeholderTextColor="black"
              value={Password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!showPassword}
              style={styles.input}
            />
            <TouchableOpacity onPress={toggleShowPassword} style={styles.togglePasswordButton}>
              <Image source={showPassword ? require("../../../Assets/SignIn&Up_And_Font/password_eye_show.png") : require("../../../Assets/SignIn&Up_And_Font/eye.png")} style={styles.togglePasswordIcon} />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={styles.boxContent}>
          <ImageBackground style={styles.inputContainer} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
            <TextInput
              placeholder="Confirm Password"
              value={CPassword}
              placeholderTextColor="black"
              onChangeText={(text) => setCPassword(text)}
              secureTextEntry={true}
              style={styles.input}
            />
          </ImageBackground>
        </View>
      </View>
      <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'center', alignItems: 'center', top: responsiveHeight(2.2) }}>
            <Text style={styles.backTopic}>Already have an account </Text>
            <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signInButtonText}> Login</Text>
            </TouchableOpacity>
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
});
