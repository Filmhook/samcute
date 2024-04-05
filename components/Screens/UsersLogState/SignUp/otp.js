
import { View, TextInput, Button, TouchableOpacity, Dimensions, Text, StyleSheet, ImageBackground, Image, } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Otp() {
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
            navigation.navigate('IndustryOne')
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
        <View style={{
            flex: 1,
            // justifyContent: 'center',
            alignItems: 'center',
            // padding: responsiveWidth(3),
            backgroundColor: '#f5f5f5',

            width: '100%',
            height: '100%'
        }}>
            {(
                <>
                    <View style={styles.headerContainer}>
                        <Image style={{
                            height: responsiveHeight(21),
                            width: responsiveWidth(41), alignSelf: 'center'
                        }} source={require("../../../Assets/Login_page/FH_logos.png")} resizeMode="stretch" />

                    </View>
                    {/* <View style={styles.titleContainer}> */}
                    <Text style={styles.header}>Verification </Text>
                    {/* </View> */}
                    <View style={{ height: responsiveHeight(8), width: responsiveWidth(85), marginBottom: responsiveHeight(2), justifyContent: 'center', alignItems: 'center', }}>
                        <Image style={{ height: responsiveHeight(7), width: responsiveWidth(85) }} source={require('../../../Assets/Login_page/Film_hook.png')} resizeMode="stretch" />

                    </View>
                    <View>
                        <View style={styles.text}>
                            <Text>Check your mail for otp</Text>
                        </View>
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
                        <TouchableOpacity style={{
                            borderRadius: responsiveWidth(2), justifyContent: 'center', alignItems: 'center', height: responsiveHeight(5),
                            width: responsiveWidth(25), borderWidth: responsiveWidth(0), left: responsiveWidth(60),
                        }}>
                            <Text style={{ color: 'blue', }} >Resend OTP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={verifyOtp} style={{
                            borderRadius: responsiveWidth(2), marginBottom: responsiveHeight(2), justifyContent: 'center', alignItems: 'center', backgroundColor: '#2d51c5', height: responsiveHeight(5),
                            width: responsiveWidth(25), borderWidth: responsiveWidth(0), left: responsiveWidth(35), marginTop: responsiveHeight(3)
                        }}>
                            <Text style={{ color: 'white' }} >Verify</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    )
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
        left: responsiveWidth(2)
        // overflow: 'hidden',

    },
    text: {
        color: 'black',
        top: responsiveHeight(5),
        left: responsiveWidth(7)
    },
    headerContainer: {
        height: responsiveHeight(22),
        width: responsiveWidth(35),
        bottom: responsiveHeight(1),
        // borderWidth: 1
        marginTop: responsiveHeight(3)

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