import { View, TextInput, Button, TouchableOpacity, Dimensions, Text, StyleSheet, ImageBackground, Image, } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Otp_GS() {
    const [otp, setOTP] = useState('');
    const navigation = useNavigation();


    const verifyOtp = async () => {
        try {
            const id = await AsyncStorage.getItem('userId'); // Retrieve id from AsyncStorage
            const response = await axios.post('http://18.61.66.68:8080/filmhook-0.0.1/user/verify', {
                userId: parseInt(id), // Convert id to an integer if needed
                otp: otp // Assuming otp is a variable holding the OTP input value
            });

            console.log("success", response.data);
            Alert.alert("Mobile number Verified successfully");
            navigation.navigate('Login')
        } catch (error) {
            const id = await AsyncStorage.getItem('userId'); // Retrieve id again in the catch block
            console.error("Error while verifying OTP:", error);
            console.log("Failed to verify OTP. User ID:", id);
            console.log("Input OTP:", otp);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Retrieve the code from AsyncStorage
                const code = await AsyncStorage.getItem('code');

                // Fetch data from the API endpoint using the retrieved code
                const response = await axios.get(`http://18.61.66.68:8080/filmhook-0.0.1/user/verifyUser?code=${code}`);

                // Log the retrieved code
                console.log(code);
                console.log(response.data)
                
            } catch (error) {
                console.error(error);
                const code = await AsyncStorage.getItem('code');
                console.log(code);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []);




    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {(
                <>
                    <ImageBackground style={styles.otpContainer} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
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
                    <TouchableOpacity onPress={verifyOtp} style={{
                        borderRadius: responsiveWidth(2), marginBottom: responsiveHeight(2), marginRight: responsiveWidth(-4), marginLeft: responsiveWidth(-11), justifyContent: 'center', alignItems: 'center', backgroundColor: '#2d51c5', height: responsiveHeight(3),
                        width: responsiveWidth(15), borderWidth: responsiveWidth(0)
                    }}>
                        <Text style={{ color: 'white' }} >Verify</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
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
});






// import React, { useState } from 'react';
// import { View, StyleSheet, Button } from 'react-native';
// import OTPInputView from '@twotalltotems/react-native-otp-input'

// const OTPPage = () => {
//   const [otp, setOtp] = useState('');

//   const handleOTPChange = (otp) => {
//     setOtp(otp);
//   };

//   const handleVerifyOTP = () => {
//     // Implement OTP verification logic here
//     console.log('Verifying OTP:', otp);
//   };

//   return (
//     <View style={styles.container}>
//       <OTPInputView
//         style={styles.otpInput}
//         pinCount={4}
//         code={otp}
//         onCodeChanged={handleOTPChange}
//         autoFocusOnLoad
//         codeInputFieldStyle={styles.otpInputField}
//       />
//       <Button title="Verify OTP" onPress={handleVerifyOTP} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   otpInput: {
//     width: '80%',
//     height: 200,
//   },
//   otpInputField: {
//     borderWidth: 2,
//     borderRadius: 10,
//     borderColor: 'gray',
//     fontSize: 20,
//   },
// });

// export default OTPPage;
