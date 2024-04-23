import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import PublicAPI from '../../../api/publicAPI';

export default function CurrentIndustry() {

    // if industry becomes two or more values come 
    // const industries = user.Industry || [];
    //console.log('industries:',industries);
    const [expanded, setExpanded] = useState(false);

    const [industry, setIndustry] = useState(['Kollywood','bhojiwood','kollwood'])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                const userIdString = userId.toString(); // Convert to string if needed
                const jwt = await AsyncStorage.getItem('jwt');
    
                const response = await PublicAPI.get(`user/getUserByUserId?userId=${userIdString}`, {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                });
    
                // Handle response data as needed
                console.log('User data:', response.data);
    
                if (Array.isArray(response.data)) {
                    setIndustry(response.data);
                } else {
                    // Handle the case where response.data is not an array
                    console.error('Expected array data but received:', response.data);
                }
    
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Log additional details
                if (error.response) {
                    console.error('Response status:', error.response.status);
                    console.error('Response data:', error.response.data);
                }
            }
        };
    
        fetchData();
    }, []);
    

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };


    return (
        <>

            <View style={style.container}>

                <View style={style.bio_title}>
                    <TouchableOpacity style={style.bio_title} onPress={toggleExpanded}>
                        <Text style={style.bio_title_text}>CURRENTLY WORKING INDUSTRY

                        </Text>

                        <View style={{ width: responsiveWidth(5), height: responsiveHeight(4), alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={require("../../../Assets/Userprofile_And_Fonts/update/down-arrow.png")}
                                style={style.downArrow}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
              

                {expanded && (
                    <View style={style.bio_content}>
                        <View style={style.bio_content_section}>
                            <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                                <Text style={{
                                    fontSize: responsiveFontSize(2),
                                    color: '#000000',
                                    fontWeight: '500',
                                    fontFamily: "Times New Roman",

                                }}> Cinema Of India</Text>
                            </ImageBackground>
                        </View>

                        {/* ///////////////////////////////////////////////*/}
                        <View style={{}}>
                           
                            <View style={{ rowGap: responsiveHeight(1) }}>
                            {industry.map((value, index) => (
                                <ImageBackground

                                    style={{
                                        height: responsiveHeight(5.5),
                                        width: responsiveWidth(53),
                                        // borderWidth: responsiveWidth(0.3),
                                        borderColor: 'black',
                                        borderRadius: responsiveWidth(2),
                                      
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                                    resizeMode="stretch">
                                    <Text
                                        key={index}
                                        style={{
                                            fontSize: responsiveFontSize(2),
                                            color: '#000000',
                                            fontWeight: '500',
                                            fontFamily: 'Times New Roman',
                                            textAlign: 'center',
                                            // marginLeft: responsiveWidth(20), top: responsiveHeight(1)
                                        }}>
                                        {value}
                                    </Text>
                                </ImageBackground>
                            ))}
                            </View>
                        </View>

                        {/* <View style={style.bio_content_section}>
                            <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                                <Text style={{
                                    fontSize: responsiveFontSize(2),
                                    color: '#000000',
                                    fontWeight: '500',
                                    fontFamily: "Times New Roman",
                                    bottom: -6,
                                    right: -38
                                }}>
                                    KOLLYWOOD
                                </Text>
                            </ImageBackground>
                        </View> */}
                    </View>
                )}
               
            </View>
            {/* <View style={style.hr_tag} /> */}
        </>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        //marginTop:20
    },

    bio_title: {
        flex: responsiveWidth(0.2),
        width: '100%',
        flexDirection: 'row',
        columnGap: responsiveWidth(20),
        marginTop: responsiveHeight(1)
        // borderWidth:1
    },
    downArrow: {
        width: 20,
        height: 20,
        marginRight: responsiveWidth(2),
        // Add styles for your down arrow icon
    },
    bio_title_text: {
        fontWeight: "bold",
        fontSize: responsiveFontSize(2.2),
        color: "black",
        marginLeft: responsiveWidth(2),
        fontFamily: 'Cochin',
        //  textDecorationLine: "underline",
        //  borderWidth:1,
        width: responsiveWidth(70)

    },
    inputContainer: {

        justifyContent: 'center',
        alignItems: 'center',
        width: '100.1%',
        height: '100%',
    },
    bio_content: {
        flex: 1,
       
        marginTop: responsiveHeight(7)
    },
    bio_content_section: {
        // flexDirection:"row",
        width: responsiveWidth(52.5),
        height: responsiveHeight(5.5),
       //  borderWidth:responsiveWidth(0.3),
        borderRadius: responsiveWidth(2),
       marginBottom:responsiveHeight(1),
        justifyContent: 'center',
        alignItems: 'center'
    },
    hr_tag: {
        borderBottomWidth: 4,
        borderBottomColor: '#D7D7D7',
        marginVertical: 5,
    }
})  