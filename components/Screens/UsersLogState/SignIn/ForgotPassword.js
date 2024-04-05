// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image, ImageBackground } from 'react-native';
// import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
// import app from '../../../../FirebaseConfig';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';


// export default function Forgetpass() {
//   const navigation = useNavigation();

//   const [email, setEmail] = useState('');

//   const handleResetPassword = async () => {
//     try {
//       const auth = getAuth(app);
//       await sendPasswordResetEmail(auth, email);

//       // Show a success message to the user
//       Alert.alert(
//         'Password Reset Email Sent',
//         'Please check your email to reset your password.'
//       );
//     } catch (error) {
//       console.error('Error sending password reset email:', error.message);

//       // Show an error message to the user
//       Alert.alert('Error', 'Failed to send password reset email. Please try again.');
//     }
//   };
//   return (
//     <>
//       <View style={styles.container}>
//         <View style={styles.formContainer}>
//           <View style={styles.headerContainer}>
//             <Image style={{
//               height: responsiveHeight(21),
//               width: responsiveWidth(41), alignSelf: 'center'
//             }} source={require("../../../Assets/Login_page/FH_logos.png")} resizeMode="stretch" />

//           </View>
//           <View style={{ height: responsiveHeight(8), width: responsiveWidth(89), marginBottom: responsiveHeight(2), justifyContent: 'center', alignItems: 'center' }}>
//             <Image style={{ height: responsiveHeight(7), width: responsiveWidth(87) }} source={require('../../../Assets/Login_page/Film_hook.png')} resizeMode="stretch" />

//           </View>
//           {/* <View style={{ borderWidth:1,justifyContent:'center',alignItems:'center'}}>

//             <Text style={styles.header}>Forgot Password</Text>
//           </View> */}
//           <View style={styles.boxContent}>
//             <ImageBackground style={styles.inputContainer} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">

//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter your email"
//                 placeholderTextColor='black'
//                 value={email}
//                 onChangeText={(text) => setEmail(text)}
//               />
//             </ImageBackground>
//           </View>

//           {/* <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'center', alignItems: 'center', top: responsiveHeight(2.2) }}>

//             <Text style={styles.backTopic}>Already have an account </Text>
//             <TouchableOpacity
//               style={styles.signUpButton}
//               onPress={() => navigation.navigate('Login')}
//             >
//               <Text style={styles.signInButtonText}> Login</Text>
//             </TouchableOpacity>
//           </View> */}

//           <TouchableOpacity style={styles.resetButton} onPress={()=>navigation.navigate('ForgotPasswordsecondpage')} >
//             <Text style={styles.resetButtonText}>Reset Password</Text>
//           </TouchableOpacity> 
//         </View>
//       </View>

//     </>
//   )
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     alignItems: 'center',
//     //padding: responsiveWidth(3),
//     backgroundColor: '#f5f5f5',

//     width: '100%',
//     height: '100%'

//   },
//   headerContainer: {
//     // flexDirection: 'row',
//     // alignSelf: 'center',
//     // borderWidth:1,
//     //bottom:responsiveHeight(5),

//     height: responsiveHeight(25),
//     width: responsiveWidth(35)

//   },
//   boxContent: {
//     height: responsiveHeight(8),
//     width: responsiveWidth(85.1),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: responsiveHeight(1),
//     borderRadius: responsiveWidth(3.2),
//     borderWidth: responsiveWidth(0.3),
//     color: 'black'

//   },

//   inputContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     //marginBottom: responsiveHeight(2),


//     //borderWidth: responsiveWidth(0.4),
//     //paddingHorizontal: responsiveWidth(8),
//     // borderRadius: responsiveWidth(1),
//     height: responsiveHeight(8.4),
//     width: responsiveWidth(86.7),

//     margin: responsiveWidth(1),
//     color: 'black',
//     resizeMode: 'cover'

//   },


//   header: {
//     color: '#3545ec',
//     fontFamily: 'Italic-trial',
//     fontSize: responsiveFontSize(3),
//     fontWeight: '500'



//   },
//   input: {

//     height: responsiveHeight(6),
//     borderColor: 'black',
//     width: '90%',
//     fontSize: responsiveFontSize(2),
//     // right: responsiveWidth(2),
//     color: 'black',
//     fontWeight: '500'

//   },
//   formContainer: {
//     width: '100%',
//     // height: '60%',
//     // padding: responsiveWidth(3),
//     backgroundColor: '#f5f5f5',
//     borderRadius: responsiveWidth(5),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: responsiveHeight(3),
//     //  paddingTop: 0,
//     // bottom:responsiveHeight(2)
//     // borderWidth:1


//   },
//   signInButtonText: {
//     color: 'blue',
//     fontSize: responsiveFontSize(2),
//     fontWeight: 'bold',
//     textDecorationLine: "underline"
//   },
//   backTopic: {
//     color: 'black',
//     fontSize: responsiveFontSize(2),
//     fontWeight: '500',
//   },
//   resetButton: {
//     backgroundColor: 'black',
//     borderRadius: responsiveWidth(2),
//     padding: 3,

//     justifyContent: 'center',
//     alignItems: 'center',
//     top: responsiveHeight(8),
//     marginTop: responsiveHeight(2),
//     width: responsiveWidth(36),

//     borderRadius: responsiveWidth(3),
//     height: responsiveHeight(6),
//   },
//   resetButtonText: {
//     color: 'white',
//     fontSize: responsiveFontSize(2.3),
//     fontWeight: 'bold'
//   }

// });

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

export default function Forgetpass() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [send, setSend] = useState('');
  const [otp, setOTP] = useState('');
  const [verify, setVerify] = useState('');
  const [isSendClicked, setIsSendClicked] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [send, setSend] = useState('');
  const [otp, setOTP] = useState('');
  const [verify, setVerify] = useState('');
  const [isSendClicked, setIsSendClicked] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleResetPassword = async () => {
    // Implement your password reset logic here
    Alert.alert('Password Reset Email Sent', 'Please check your email to reset your password.');
  };

  const handleSendOTP = async () => {
    try {
      await sendOTP();
      setIsSendClicked(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleVerify = async () => {
    try {
      const response = await axios.post(`http://18.61.66.68:8080/filmhook-0.0.1/user/verifyForgotOtp`, {
        forgotOtp: otp
      });
      console.log('Email verified', response.data);
      navigation.navigate('ForgotPasswordsecondpage');
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const validateEmail = (text) => {
    // Basic email validation
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
    setIsEmailValid(isValid);
    setEmail(text);
  };

  const sendOTP = async () => {
    try {
      const response = await axios.post(`http://18.61.66.68:8080/filmhook-0.0.1/user/forgotPassword`, {
        email: email
      });
      console.log("Code sent to email", response.data);
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.headerContainer}>
            <Image style={{ height: responsiveHeight(25), width: responsiveWidth(46), alignSelf: 'center' }} source={require("../../../Assets/Login_page/FH_logos.png")} resizeMode="stretch" />
            <Image style={{ height: responsiveHeight(25), width: responsiveWidth(46), alignSelf: 'center' }} source={require("../../../Assets/Login_page/FH_logos.png")} resizeMode="stretch" />
          </View>
          <View style={{ height: responsiveHeight(8), width: responsiveWidth(89), marginBottom: responsiveHeight(2), justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ height: responsiveHeight(7), width: responsiveWidth(87) }} source={require('../../../Assets/Login_page/Film_hook.png')} resizeMode="stretch" />
          </View>
          <View style={styles.boxContent}>
            <ImageBackground style={styles.inputContainer} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor='black'
                value={email}
                onChangeText={validateEmail}
                onChangeText={validateEmail}
              />
            </ImageBackground>
          </View>
          <TouchableOpacity style={styles.boxContent1} onPress={handleSendOTP} disabled={!isEmailValid}>
            {/* <ImageBackground style={styles.inputContainer1} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch"> */}
            <Text style={styles.input2} >Send</Text>
            {/* </ImageBackground> */}
          </TouchableOpacity>
          {isSendClicked && (
            <>
              <View style={styles.boxContent}>
                <ImageBackground style={styles.inputContainer} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
                  <TextInput
                    style={styles.input}
                    placeholder="Enter OTP"
                    placeholderTextColor='black'
                    value={otp}
                    onChangeText={(text) => setOTP(text)}
                  />
                </ImageBackground>
              </View>
              <TouchableOpacity style={styles.boxContent1} onPress={handleVerify}>
                {/* <ImageBackground style={styles.inputContainer1} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch" > */}
                <Text style={styles.input2} >Verify</Text>
                {/* </ImageBackground> */}
              </TouchableOpacity>
            </>
          )}

        </View>
      </View>
    </>
  )
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
    marginBottom: responsiveHeight(1),
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
    color: 'black',
    fontWeight: '500'
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
  boxContent1: {
    height: responsiveHeight(4),
    width: responsiveWidth(18),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(1),
    borderRadius: responsiveWidth(2),
    borderWidth: responsiveWidth(0.3),
    color: 'black',
    backgroundColor: 'black'
  },
  inputContainer1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(4),
    width: responsiveWidth(18),
    margin: responsiveWidth(1),
    color: 'black',
    resizeMode: 'cover',
    backgroundColor: 'black'
  },
  input2: {
    height: responsiveHeight(6),
    borderColor: 'black',
    width: '90%',
    fontSize: responsiveFontSize(2),
    color: 'white',
    fontWeight: '500',
    top: responsiveHeight(1.5),
    left: responsiveWidth(2),

  }
});