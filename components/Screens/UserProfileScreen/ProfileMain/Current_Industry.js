import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import PublicAPI from '../../../api/publicAPI';
import privateAPI from '../../../api/privateAPI';

export default function CurrentIndustry() {

    // if industry becomes two or more values come 
    // const industries = user.Industry || [];
    //console.log('industries:',industries);
    const [expanded, setExpanded] = useState(false);         
    const [industryData, setIndustryData] = useState([]);

    useEffect(() => {
        // Function to fetch industry data
        const fetchIndustryData = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                const response = await privateAPI.get(`industryUser/getIndustryByuserId?userId=${userId}`);
                setIndustryData(response.data.industryData);
            } catch (error) {
                console.log('Error fetching the industry data:', error);
            }
        };
    
        fetchIndustryData();
    }, []);


    const toggleExpanded = () => {
        setExpanded(!expanded);
    };


    return (
        <>

            <View style={style.container}>

                
                <View style={style.bio_title}>
                    <TouchableOpacity style={style.bio_title_touchable} onPress={toggleExpanded}>
                        <Text style={style.bio_title_text}>CURRENTLY WORKING INDUSTRY</Text>
                        <View style={style.downArrowContainer}>
                            <Image
                                source={require('../../../Assets/Userprofile_And_Fonts/update/down-arrow.png')}
                                style={style.downArrow}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                {expanded && (
                    <View style={style.bio_content}>
                        {/* <View style={style.bio_content_section}>
                            <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                                <Text style={{
                                    fontSize: responsiveFontSize(2),
                                    color: '#000000',
                                    fontWeight: '500',
                                    fontFamily: "Times New Roman",

                                }}> Cinema Of India</Text>
                            </ImageBackground>
                        </View> */}

                        {/* ///////////////////////////////////////////////*/}
                        <View style={{}}>

                            <View style={{ rowGap: responsiveHeight(1) }}>
                                {industryData.map((value, index) => (
                                    <ImageBackground

                                        style={{
                                            height: responsiveHeight(5.5),
                                            width: responsiveWidth(53),
                                            // borderWidth: responsiveWidth(0.3),
                                            borderColor: 'black',
                                            borderRadius: responsiveWidth(2),

                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'row',

                                        }}
                                        source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                                        resizeMode="stretch">
                                        <View style={style.imageContainer}>
                                            <Image
                                                source={{ uri: value.image }} // Assuming the image URL is directly usable
                                                style={style.image}
                                            />
                                        </View>
                                        <Text
                                            key={index}
                                            style={{
                                                fontWeight: 'bold',
                                                color: 'black'
                                                // marginLeft: responsiveWidth(20), top: responsiveHeight(1)
                                            }}>
                                            {value.industryName}
                                        </Text>
                                    </ImageBackground>
                                ))}
                            </View>
                        </View>


                    </View>
                )}

            </View>
            {/* <View style={style.hr_tag} /> */}
        </>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        // marginBottom:responsiveHeight(1)

    },
    imageContainer: {
        width: responsiveWidth(12),
        height: responsiveHeight(5),
        justifyContent: 'center'
        //  borderWidth:1

    },
    image: {
        width: responsiveWidth(9),
        height: responsiveHeight(4),
        resizeMode: 'stretch'
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
        left: responsiveWidth(43.5),
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(1)
    },
    bio_content_section: {
        // flexDirection:"row",
        width: responsiveWidth(52.5),
        height: responsiveHeight(5.5),
        //  borderWidth:responsiveWidth(0.3),
        borderRadius: responsiveWidth(2),
        marginBottom: responsiveHeight(1),
        justifyContent: 'center',
        alignItems: 'center',

    },
    hr_tag: {
        borderBottomWidth: 4,
        borderBottomColor: '#D7D7D7',
        marginVertical: 5,
    },
    bio_title: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#d3d3d3', // Light gray background color
        padding: responsiveWidth(4),
        borderRadius: 8,
        marginTop: responsiveHeight(1),
    },
    bio_title_touchable: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    bio_title_text: {
        fontWeight: 'bold',
        fontSize: responsiveFontSize(2.2),
        color: 'black',
        fontFamily: 'Cochin',
        width: responsiveWidth(70),
    },
    downArrowContainer: {
        width: responsiveWidth(6),
        height: responsiveHeight(4),
        alignItems: 'center',
        justifyContent: 'center',
    },
    downArrow: {
        width: 20,
        height: 20,
    },
})  