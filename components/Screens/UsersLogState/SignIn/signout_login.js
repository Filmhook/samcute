import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';

import {
  getAuth,
  initializeAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import app from '../../../../FirebaseConfig';
import {
  collection,
  doc,
  documentId,
  getDoc,
  getFirestore,
} from 'firebase/firestore';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import PublicAPI from '../../../api/publicAPI';
import {Alert} from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default function SignOut_Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');

  const navigation = useNavigation();

  // const isDarkMode = useColorScheme() === 'dark';
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  // const  collectionName='IndutryUser';

  // const firestore=getFirestore();

  //  const handleLogin = async () => {
  //     try {

  //       if (!email.trim() || !password.trim()) {
  //         // Check if email or password is empty or contains only whitespace
  //         alert('Please enter valid email and password');
  //         return;
  //       }

  //       const authInstance = getAuth(app)
  //       const {user} = await signInWithEmailAndPassword(authInstance, email, password);

  //      if (user.emailVerified){
  //           navigation.navigate('Tabbar');
  //           console.log('login succesfull',user.uid);
  //           setEmail('')
  //           setPassword('')
  //       }else {
  //         // Email is not verified
  //         alert('Email verification is pending. Please check your email and verify. Else Try Signup Again');
  //       }
  //     } catch (error) {
  //       //alert('email or password is invalid');
  //       console.log('Login Error:', error.message);
  //     }
  //   };

  const handle_forgotpass = async () => {
    console.log('clicked');
    navigation.navigate('Forgetpass');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //======================================================================

  const handlePasswordChange = text => {
    setPassword(text);
  };
  const loginUser = async () => {
    try {
      const response = await PublicAPI.post('/user/login', {
        email: email,
        password: password,
        userType: 'commonUser',
      });

      // Extract JWT token and ID from response data
      const jwt = response.data.jwt;
      const id = response.data.id;

      // Store JWT token and ID in AsyncStorage
      await AsyncStorage.setItem('jwt', jwt);
      await AsyncStorage.setItem('id', id.toString());

      // Log stored values for verification
      const storedJwt = await AsyncStorage.getItem('jwt');
      const storedId = await AsyncStorage.getItem('id');
      console.log('Stored JWT token:', storedJwt);
      console.log('Stored ID:', storedId);

      Alert.alert('Login Successful');
      console.log('Login successful:', response.data);
      navigation.navigate('Tabbar');

      // Handle response as needed
    } catch (error) {
      Alert.alert(error);
      console.error('Login failed:', error);
      // Handle error as needed
    }
  };

  //=======================================================================

  const handleLogin = () => {
    const emailRegex = /\S+@\S+\.\S+/; // Regex pattern for a basic email format check
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/; // Regex pattern to check password length (at least 6 characters)

    if (!emailRegex.test(email.trim())) {
      alert('Please enter a valid email address');
      return;
    } else if (!passwordRegex.test(password.trim())) {
      alert('Password contains "0-9, A-Z, a-z, @-$"');
      return;
    } else if (password.trim().length < 8) {
      alert('password length at least 8 characters');
    } else {
      // handleLoginAuth();
      navigation.navigate('Tabbar');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.headerContainer}>
          <Image
            style={{
              height: responsiveHeight(25),
              width: responsiveWidth(41),
              alignSelf: 'center',
            }}
            source={require('../../../Assets/Login_page/FH_logos.png')}
          />
          {/* <Text style={styles.header}>Login</Text> */}
        </View>
        <View
          style={{
            height: responsiveHeight(8),
            width: responsiveWidth(85),
            marginBottom: responsiveHeight(2),
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          <Image
            style={{height: responsiveHeight(7), width: responsiveWidth(85)}}
            source={require('../../../Assets/Login_page/Film_hook.png')}
            resizeMode="stretch"
          />
        </View>

        <View style={styles.boxContent}>
          {/* <Icon name="envelope" size={responsiveFontSize(5)} color="gray" style={styles.icon} /> */}
          <ImageBackground
            style={styles.inputContainer}
            source={require('../../../Assets/Login_page/newBoxImage.png')}
            resizeMode="stretch">
            <TextInput
              placeholder="Email Address"
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
              placeholderTextColor="black"
              // placeholderTextColor={'black'}
              keyboardType="email-address"
              autoCapitalize="none"
              //onLongPress={handlePaste}
            />
          </ImageBackground>
        </View>
        <View style={styles.boxContent}>
          <ImageBackground
            style={styles.inputContainer}
            source={require('../../../Assets/Login_page/newBoxImage.png')}
            resizeMode="stretch">
            {/* <Icon name="lock" size={20} color="gray" style={styles.icon} /> */}

            {/* <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!showPassword}
              style={styles.input}
            /> */}
            <TextInput
              placeholder="Password"
              value={password}
              placeholderTextColor="black"
              onChangeText={handlePasswordChange}
              secureTextEntry={!showPassword}
              style={styles.input}
            />

            <TouchableOpacity
              onPress={toggleShowPassword}
              style={{
                position: 'absolute',
                right: responsiveWidth(6),
                height: responsiveHeight(2.8),
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

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={handle_forgotpass}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={loginUser}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', top: responsiveHeight(20)}}>
          <Text style={styles.signupTopic}>I don't have an account?/</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpOne')}
            style={styles.IndustryButton}>
            <Text style={styles.signUpButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  icon: {
    marginRight: 10,
    width: responsiveWidth(4),
    height: responsiveHeight(7),
  },

  boxContent: {
    height: responsiveHeight(8),
    width: responsiveWidth(85.1),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
    borderRadius: responsiveWidth(3.2),
    borderWidth: responsiveWidth(0.3),
    color: 'black',
    // backgroundColor: 'rgba(162, 161, 151, 0.05)',
    // //shadowOffset: {width: 1, height: 4}, // Shadow offset
    // shadowOpacity: 1, // Shadow opacity
    // shadowRadius: 2, // Shadow radius
    // elevation: 0.2,
    // shadowColor: 'gray',
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(8.4),
    width: responsiveWidth(86.7),
    //   bottom:responsiveHeight(1),
    margin: responsiveHeight(1),
    //   margin: responsiveWidth(1),
    color: 'black',
    resizeMode: 'cover',
  },
  inputContainerO: {
    height: responsiveHeight(8),
    width: responsiveWidth(84),
  },
  formContainer: {
    width: '100%',

    // padding: responsiveWidth(3),
    backgroundColor: '#f5f5f5',
    borderRadius: responsiveWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(3),
    // borderWidth:1
  },
  forgotPasswordButton: {
    bottom: responsiveHeight(1),

    left: responsiveWidth(22),
  },
  header: {
    color: 'black',
    fontFamily: 'Italic-trial',
    fontSize: responsiveFontSize(4),
    marginBottom: responsiveHeight(2),
    // borderWidth:1,
  },
  headerContainer: {
    // flexDirection: 'row',
    // alignSelf: 'center',
    //  borderWidth:1,
    //bottom:responsiveHeight(5),

    height: responsiveHeight(25),
    width: responsiveWidth(35),
    bottom: responsiveHeight(1),
  },
  input: {
    height: responsiveHeight(5.6),
    borderColor: 'black',
    width: '93%',
    fontSize: responsiveFontSize(2),
    // right: responsiveWidth(2),
    color: 'black',
    fontWeight: '500',
    //backgroundColor: 'rgba(162,161,151,0.18)'
  },

  forgotPasswordText: {
    color: 'blue',
    fontSize: responsiveFontSize(2.1),
    // left: responsiveWidth(15),
    // top: responsiveHeight(0.5),
    fontWeight: 'bold',
    //  textDecorationLine: "underline"
  },
  loginButton: {
    backgroundColor: 'black',
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    top: responsiveHeight(8),
    marginTop: responsiveHeight(2),
    width: responsiveWidth(36),
    height: responsiveHeight(6),
  },
  loginButtonText: {
    color: 'white',
    fontSize: responsiveFontSize(2.3),
    fontWeight: '800',
  },
  signUpButton: {
    // alignSelf: 'center',
    // bottom: responsiveHeight(1.8)
  },
  signUpButtonText: {
    color: 'blue',
    fontSize: responsiveFontSize(2.1),
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    // top:responsiveHeight(0.1)
  },
  signupTopic: {
    color: 'black',
    fontSize: responsiveFontSize(2.1),
    fontWeight: 'bold',
  },
});
