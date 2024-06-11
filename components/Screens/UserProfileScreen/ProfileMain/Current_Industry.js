import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import PublicAPI from '../../../api/publicAPI';
import privateAPI from '../../../api/privateAPI';

export default function CurrentIndustry() {
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
                if (error.response && error.response.status === 404) {
                    setIndustryData(null); // Set industry data to null if status is 404
                } else {
                    console.error('Error fetching the industry data:', error);
                }
            }
        };
    
        fetchIndustryData();
    }, []);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
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
                   
                        <View style={{ rowGap: responsiveHeight(1),}}>
                            {industryData ? (
                                industryData.map((value, index) => (
                                    <ImageBackground
                                        key={index}
                                        style={{
                                            height: responsiveHeight(8),
                                            width: responsiveWidth(90),
                                           columnGap:responsiveWidth(12),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                           
                                        }}
                                        source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                                        resizeMode="stretch"
                                    >
                                        <View style={style.imageContainer}>
                                            <Image
                                                source={{ uri: value.image }} 
                                                style={style.image}
                                            />
                                        </View>
                                        <Text
                                            key={index}
                                            style={{
                                                
                                                color: 'black', fontSize:responsiveFontSize(2.8)
                                            }}
                                        >
                                            {value.industryName}
                                        </Text>
                                    </ImageBackground>
                                ))
                            ) : (
                                <Text style={{ fontWeight: 'bold', color: 'black' }}>N/A</Text>
                            )}
                        </View>
                    
                </View>
            )}
        </View>
    );
}


const style = StyleSheet.create({
    container: {
        flex: 1,
       

    },
    imageContainer: {
        width: responsiveWidth(13),
        height: responsiveHeight(6),
        justifyContent: 'center',


    },
    image: {
        width: responsiveWidth(9),
        height: responsiveHeight(4),
        resizeMode: 'stretch'
    },

   
    inputContainer: {

        justifyContent: 'center',
        alignItems: 'center',
        width: '100.1%',
        height: '100%',
    },
    bio_content: {
        flex: 1,
      //  left: responsiveWidth(43.5),
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(1),
        justifyContent:'center',
        alignItems:'center'
    },
    bio_content_section: {
        // flexDirection:"row",
        width: responsiveWidth(52.5),
        height: responsiveHeight(5.5),
        //  borderWidth:responsiveWidth(0.3),
        borderRadius: responsiveWidth(2),
        marginBottom: responsiveHeight(1),
      

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