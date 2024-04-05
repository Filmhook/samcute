import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';


const IndustryPage = ({ userId }) => {
    const [industryData, setIndustryData] = useState({});
    const [verified, setVerify] = useState(false);
    const navigation = useNavigation();
    const handlepressNav = () => {

        if (!verified) {
            // Navigate to the next screen

            alert('Oops!! Read the T&C and Enter the OTP received to you Mail Id');
        }
        else {
            navigation.navigate("IndustryTwo")



        }

    }


    const handleCheckboxPress = () => {
        setVerify(!verified);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = await AsyncStorage.getItem('userId');
                const response = await axios.post(`http://18.61.66.68:8080/filmhook-0.0.1/industryUser/getTemporaryDetails`, {
                    userId: parseInt(id)
                });
                setIndustryData(response.data || {});


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userId]);



    const isProfessionSelected = (industryName, platformIndex, profession) => {
        const industry = industryData[industryName];
        const platform = industry && industry.platforms && industry.platforms[platformIndex];
        return platform && platform.selectedProfessions && platform.selectedProfessions.includes(profession);
    };



    const isSubProfessionSelected = (industryName, platformIndex, subProfession) => {
        const industry = industryData[industryName];
        const platform = industry && industry.platforms && industry.platforms[platformIndex];
        return platform && platform.selectedSubProfessions && platform.selectedSubProfessions.includes(subProfession);
    };

    const toggleProfession = (industryName, platformIndex, profession) => {
        setIndustryData(prevData => {
            const updatedData = { ...prevData };
            const platform = updatedData[industryName].platforms[platformIndex];
            platform.selectedProfessions = platform.selectedProfessions || []; // Ensure selectedProfessions is initialized

            // Check if profession already exists
            const professionIndex = platform.selectedProfessions.indexOf(profession);

            if (professionIndex !== -1) {
                // If profession exists, remove it
                platform.selectedProfessions.splice(professionIndex, 1);
            } else {
                // If profession doesn't exist, add it
                platform.selectedProfessions.push(profession);
            }

            // This console.log statement logs the updated state of selected professions
            // console.log('Selected Professions :', platform.selectedProfessions);
            // console.log('Industry:', updatedData[industryName].platforms[platformIndex]);

            return updatedData;
        });
    };


    const toggleSubProfession = (industryName, platformIndex, subProfession) => {
        console.log('Sub-Profession:', subProfession); // Log subProfession
        setIndustryData(prevData => {
            const updatedData = { ...prevData };
            const platform = updatedData[industryName].platforms[platformIndex];
            platform.selectedSubProfessions = platform.selectedSubProfessions || []; // Ensure selectedSubProfessions is initialized
            const subProfessionIndex = platform.selectedSubProfessions.indexOf(subProfession);

            if (subProfessionIndex !== -1) {
                platform.selectedSubProfessions.splice(subProfessionIndex, 1);
            } else {
                platform.selectedSubProfessions.push(subProfession);
            }
            return updatedData;
        });
    };




    return (
        <ScrollView style={styles.container}>

            <View style={{ height: responsiveHeight(14), width: responsiveWidth(89), marginBottom: responsiveHeight(3), flexDirection: 'row', position: 'relative', }}>

                <Image style={{
                    height: responsiveHeight(15.2),
                    width: responsiveWidth(30), alignSelf: 'center',
                }} source={require("../../../Assets/Login_page/FH_logos.png")} resizeMode="stretch" />

                <Image style={{ height: responsiveHeight(6.2), width: responsiveWidth(65), position: 'absolute', left: responsiveWidth(15), top: responsiveHeight(8) }} source={require('../../../Assets/Login_page/Film_hook_name.png')} resizeMode="stretch" />
                <Text style={{ color: 'blue', fontWeight: 'bold', position: 'absolute', left: responsiveWidth(58), top: responsiveHeight(14) }}>Industry User</Text>


            </View>

            {Object.entries(industryData).map(([industryName, industry], index) => (

                <View key={index} style={styles.industryContainer}>
                    <View style={styles.searchBox}>
                        {/* <ImageBackground
                            style={styles.inputContainernew}
                            source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                            resizeMode="stretch"
                        > */}
                        <Text style={styles.industryTitle}>{industryName}</Text>
                        {/* </ImageBackground> */}
                    </View>

                    {industry.platforms.map((platform, platformIndex) => (
                        <View key={platformIndex} style={styles.platformContainer}>
                            <View style={styles.searchBox}>

                                <Text style={styles.platformName}>{platform.platformName}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', columnGap: responsiveWidth(2) }}>
                                <View style={styles.professionContainer}>
                                    {platform.professions.map((profession, professionIndex) => (
                                        <View key={professionIndex} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <CheckBox
                                                value={isProfessionSelected(industryName, platformIndex, profession)}
                                                onValueChange={() => toggleProfession(industryName, platformIndex, profession)}
                                            />
                                            <Text style={styles.profession}>{profession}</Text>
                                        </View>
                                    ))}
                                </View>
                                <View style={styles.subProfessionContainer}>
                                    {platform.subProfessions.map((subProfession, subProfessionIndex) => (
                                        <View key={subProfessionIndex} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <CheckBox
                                                value={isSubProfessionSelected(industryName, platformIndex, subProfession)}
                                                onValueChange={() => toggleSubProfession(industryName, platformIndex, subProfession)}
                                            />
                                            <Text style={styles.subProfession}>{subProfession}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            ))}
            <View style={{ flexDirection: 'row', borderWidth: 1, justifyContent: 'center', alignItems: 'center', padding: responsiveWidth(4) }}>

                <TouchableOpacity onPress={handleCheckboxPress}>
                    <View
                        style={{
                            width: responsiveWidth(5),
                            height: responsiveWidth(5),
                            // borderRadius: responsiveWidth(6),
                            borderWidth: responsiveWidth(0.5),
                            borderColor: 'black',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {verified && (<Image source={require("../../../Assets/Login_page/greenTickmark-FilmHook.png")} style={{ height: responsiveHeight(3), width: responsiveWidth(6), bottom: responsiveHeight(0.8), left: responsiveWidth(0.8) }}>

                        </Image>

                        )}
                    </View>
                </TouchableOpacity>



                <TouchableOpacity onPress={() => navigation.navigate('Terms_Conditions_Industry')} style={{
                    // padding: 15,

                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: '#2d51c5',
                    height: responsiveHeight(4),
                    width: responsiveWidth(80),
                    // bottom: responsiveHeight(1)


                }}>
                    <Text style={{
                        color: 'black',
                        fontWeight: '400',
                        fontSize: responsiveFontSize(1.8),
                    }}>Accept the Terms and Conditions, Privacy Policy</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', columnGap: responsiveWidth(18), justifyContent: 'center', alignItems: 'center', padding: responsiveWidth(4) }}>
                <TouchableOpacity onPress={() => navigation.navigate('IndustryTwo', { checked })} style={styles.backButton}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlepressNav} style={styles.nextButton}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: responsiveWidth(2),
    },
    industryContainer: {
        marginBottom: 20,
        //  borderWidth: 1
    },
    backButton: {
        backgroundColor: 'black',
        // padding: responsiveWidth(2.5),
        borderRadius: responsiveWidth(2),
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'center',
        height: responsiveHeight(6),
        width: responsiveWidth(30),
        borderWidth: responsiveWidth(0.6),
        borderColor: 'black'
    },
    nextButton: {
        backgroundColor: '#616161',
        // padding: responsiveWidth(2.5),
        borderRadius: responsiveWidth(2),
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'center',
        height: responsiveHeight(6),
        width: responsiveWidth(30),
        //bottom: responsiveHeight(1.5)
        borderWidth: responsiveWidth(0.6),
        borderColor: 'black'
    },
    industryTitle: {
        fontSize: responsiveFontSize(2.8),
        fontWeight: 'bold',
        color: 'black'

        //   marginBottom: 10,
    },
    platformContainer: {
        marginBottom: 10,
    },
    platformName: {
        fontSize: responsiveFontSize(2.8),
        fontWeight: 'bold',
        color: 'black'
    },
    professionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: responsiveHeight(0.5),
        borderWidth: responsiveWidth(0.5),
        width: '50%',
        padding: responsiveWidth(1),
        borderRadius: responsiveWidth(3)



    },
    profession: {
        // marginRight: 10,
        fontSize: responsiveFontSize(2),
        fontWeight: '700',
        color: 'black',
        width: '79%',

    },
    subProfessionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: responsiveHeight(0.5),
        borderWidth: responsiveWidth(0.5),
        width: '48%',
        padding: responsiveWidth(1),
        borderRadius: responsiveWidth(3)
    },
    subProfession: {
        fontSize: responsiveFontSize(2),
        fontWeight: '700',
        color: 'black',
        width: '79%',


    },
    searchBox: {
        flexDirection: 'row',
        borderWidth: responsiveWidth(0.5),
        height: responsiveHeight(8.4),
        width: '100%',
        marginBottom: responsiveWidth(1),
        //justifyContent:'center',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(2),
        borderRadius: responsiveWidth(3)



    },
    inputContainernew: {
        width: '100%',
        marginBottom: 10,
        padding: 5,
        height: responsiveHeight(8),
    },
});

export default IndustryPage;