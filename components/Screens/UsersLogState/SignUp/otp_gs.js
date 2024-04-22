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
import React, {useEffect, useState} from 'react';
import PublicAPI from '../../../api/publicAPI';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function Otp_GS() {
  const [otp, setOTP] = useState('');
  const navigation = useNavigation();
  const [mail,setMail]=useState('');

  useEffect(() => {
    const retrieveMail = async () => {

        const mailId = await AsyncStorage.getItem('mail');
        if (mailId !== null) {
          setMail(mailId)

        }
    };

    // Call the async function inside useEffect
    retrieveMail();
  }, []);


  const verifyOtp = async () => {
    try {
      const response = await PublicAPI.post(`/user/verifyEmailOtp`, {
        emailOtp: otp, // Assuming otp is a variable holding the OTP input value
      });



      console.log('success', response.data);
      Alert.alert('Email number Verified successfully');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
      console.log('Input OTP:', otp);
    }
  };

  console.log('mail', mail)

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        // padding: responsiveWidth(3),
        backgroundColor: '#f5f5f5',

        width: '100%',
        height: '100%',
      }}>
      {
        <>
          <View style={styles.headerContainer}>
            <Image
              style={{
                height: responsiveHeight(21),
                width: responsiveWidth(41),
                alignSelf: 'center',
              }}
              source={require('../../../Assets/Login_page/FH_logos.png')}
              resizeMode="stretch"
            />
          </View>
          {/* <View style={styles.titleContainer}> */}
          <Text style={styles.header}>Verification </Text>
          {/* </View> */}
          <View
            style={{
              height: responsiveHeight(8),
              width: responsiveWidth(85),
              marginBottom: responsiveHeight(2),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{height: responsiveHeight(7), width: responsiveWidth(85)}}
              source={require('../../../Assets/Login_page/Film_hook.png')}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.text}>
              <Text style={{fontSize:responsiveFontSize(2.2), fontWeight:'bold', color:'black'}}>OTP sent to {mail}</Text>
            </View>
          <View>

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
                color: "black",
                  height: responsiveHeight(5),
                  paddingHorizontal: responsiveWidth(4),
                  fontSize: responsiveFontSize(1.8),
                  fontWeight: '500',
                  // borderWidth:5
                }}
              />
            </ImageBackground>
            {/* <TouchableOpacity
              style={{
                borderRadius: responsiveWidth(2),
                justifyContent: 'center',
                alignItems: 'center',
                height: responsiveHeight(5),
                width: responsiveWidth(25),
                borderWidth: responsiveWidth(0),
                left: responsiveWidth(60),
              }}>
              <Text style={{color: 'blue'}}>Resend OTP</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={verifyOtp}
              style={{
                borderRadius: responsiveWidth(2),
                marginBottom: responsiveHeight(2),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#2d51c5',
                height: responsiveHeight(5),
                width: responsiveWidth(25),
                borderWidth: responsiveWidth(0),
                left: responsiveWidth(35),
                marginTop: responsiveHeight(3),
              }}>
              <Text style={{color: 'white'}}>Verify</Text>
            </TouchableOpacity>
          </View>
        </>
      }
    </View>
  );
}
const styles = StyleSheet.create({
  otpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // alignItems:'center',
    // marginRight: responsiveWidth(16),
    // marginLeft: responsiveWidth(20),
    marginBottom: responsiveHeight(1),
    height: responsiveHeight(9),
    width: responsiveWidth(88),
    borderRadius: responsiveWidth(2),
    marginTop: responsiveHeight(6.5),
    left: responsiveWidth(2),
    // overflow: 'hidden',
  },
  text: {
    color: 'black',
    margin: responsiveHeight(1),
    // left: responsiveWidth(7),
   // borderWidth:1,


  },
  headerContainer: {
    height: responsiveHeight(22),
    width: responsiveWidth(35),
    bottom: responsiveHeight(1),
    // borderWidth: 1
    marginTop: responsiveHeight(3),
  },
  header: {
    fontSize: responsiveFontSize(3.5),
    fontWeight: 'bold',
    // bottom: responsiveHeight(8.5),
    color: '#1e1ff5',
    fontFamily: 'ArianaVioleta-dz2K',
    textAlign: 'center',
  },
});
