import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import PublicAPI from '../../../api/publicAPI';
import { TextInput } from 'react-native';
import privateAPI from '../../../api/privateAPI';
export default function Education() {
    const [expanded, setExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [school, setSchool] = useState();
    const [collage, setCollege] = useState();
    const [qualification, setQualification] = useState();

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                const userIdString = userId.toString(); // Convert to string if needed
                const jwt = await AsyncStorage.getItem('jwt');

                console.log('idddd', userIdString)

                const response = await privateAPI.get(`user/getUserByUserId?userId=${userIdString}`, {

                });

                // Handle response data as needed
                console.log('User data:', response.data);
                // setHeight(response.data.data.height);
                setSchool(response.data.data.schoolName);
                setCollege(response.data.data.collegeName);
                setQualification(response.data.data.qualification);




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


    const handleSave = async () => {
        try {
            const jwt = await AsyncStorage.getItem('jwt');
            const userId = await AsyncStorage.getItem('userId');
            const userIdString = userId.toString();

            console.log('save', userId)

            const response = await PublicAPI.put(
                `/user/updateEducationInfo`,
                {
                    userId: userIdString,
                    schoolName: school,
                    collegeName: collage,
                    qualification: qualification
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                },
            );
            console.log('data saved successfully', response.data);
            Alert.alert('Success', 'Update Successfully')



            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <View style={style.container}>

                {/* <View style={style.bio_title}>
                    <TouchableOpacity style={style.bio_title} onPress={toggleExpanded}>
                        <Text style={style.bio_title_text}>
                                EDUCATION
                        </Text>

                        <View style={{ width: responsiveWidth(5), height: responsiveHeight(4), alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={require("../../../Assets/Userprofile_And_Fonts/update/down-arrow.png")}
                                style={style.downArrow}
                            />
                        </View>
                    </TouchableOpacity>
                </View> */}
                <View style={style.bio_title}>
                    <TouchableOpacity style={style.bio_title_touchable} onPress={toggleExpanded}>
                        <Text style={style.bio_title_text}>EDUCATION</Text>
                        <View style={style.downArrowContainer}>
                            <Image
                                source={require('../../../Assets/Userprofile_And_Fonts/update/down-arrow.png')}
                                style={style.downArrow}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                {expanded && (
                    <View>
                        {isEditing ? null : (
                            <TouchableOpacity onPress={() => setIsEditing(true)}>
                                <Text style={style.editButton}>Edit</Text>
                            </TouchableOpacity>
                        )}

                        {isEditing && (
                            <TouchableOpacity onPress={handleSave}>
                                <Text style={style.editButton}>Save</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}

                {expanded && (


                    <View style={{ flexDirection: "row", marginTop: 15 }}>

                        <View style={style.Lhs}>

                            <Text style={style.Lhs_text}> School </Text>

                        </View>

                        <View style={style.Rhs}>
                            <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">

                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    {isEditing ? (<TextInput
                                        style={{
                                            fontSize: responsiveFontSize(2),
                                            color: '#000000',
                                            fontWeight: '500',
                                            fontFamily: "Times New Roman",
                                            textAlign: 'center'
                                        }}
                                        value={school}
                                        onChangeText={setSchool}
                                        placeholder="Enter your school"
                                    />
                                    ) :

                                        <Text style={style.Rhs_text}>{school}</Text>

                                    }
                                </View>
                            </ImageBackground>
                        </View>

                    </View>
                )}

                {/* -------------------------------------------------- */}
                {expanded && (
                    <View style={{ flexDirection: "row", marginTop: 15 }}>

                        <View style={style.Lhs}>

                            <Text style={style.Lhs_text}> Collage </Text>

                        </View>

                        <View style={style.Rhs}>
                            <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">

                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    {isEditing ? (<TextInput
                                        style={{
                                            fontSize: responsiveFontSize(2),
                                            color: '#000000',
                                            fontWeight: '500',
                                            fontFamily: "Times New Roman",
                                            textAlign: 'center'
                                        }}
                                        value={collage}
                                        onChangeText={setCollege}
                                        placeholder="Enter your college"
                                    />
                                    ) :

                                        <Text style={style.Rhs_text}>{collage}</Text>

                                    }
                                </View>
                            </ImageBackground>
                        </View>

                    </View>
                )}
                {/* -------------------------------------------------- */}
                {expanded && (
                    <View style={{ flexDirection: "row", marginTop: 15 }}>

                        <View style={style.Lhs}>

                            <Text style={style.Lhs_text}> Qualification </Text>

                        </View>

                        <View style={style.Rhs}>
                            <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">

                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    {isEditing ? (<TextInput
                                        style={{
                                            fontSize: responsiveFontSize(2),
                                            color: '#000000',
                                            fontWeight: '500',
                                            fontFamily: "Times New Roman",
                                            textAlign: 'center'
                                        }}
                                        value={qualification}
                                        onChangeText={setQualification}
                                        placeholder="Your qualification"
                                    />
                                    ) :

                                        <Text style={style.Rhs_text}>{qualification}</Text>

                                    }
                                </View>
                            </ImageBackground>
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
      

    },
    headder_text: {
        fontWeight: "bold",
        fontSize: responsiveFontSize(2.2),
        color: "#323232",
        marginLeft: responsiveWidth(2),
        fontFamily: "Times New Roman",
        textDecorationLine: "underline",
    },
    bio_title_text: {
        fontWeight: "bold",
        fontSize: responsiveFontSize(2.2),
        color: "black",
        marginLeft: responsiveWidth(2),
        fontFamily: 'Cochin',
        // textDecorationLine: "underline",
        //  borderWidth:1,
        width: responsiveWidth(70)

    },
    bio_title: {
        flex: responsiveWidth(0.2),
        width: '100%',
        flexDirection: 'row',
        columnGap: responsiveWidth(20),
        marginTop: responsiveHeight(1),
        marginTop: responsiveHeight(1)
        // borderWidth:1
    },
    downArrow: {
        width: 20,
        height: 20,
        marginRight: responsiveWidth(2),
        // Add styles for your down arrow icon
    },
    Lhs: {
        height: responsiveHeight(5),
        width: responsiveWidth(38),
        justifyContent: "center",
        alignItems: "center",
    },
    Lhs_text: {
        fontWeight: "bold",
        fontSize: responsiveFontSize(2.1),
        color: "#323232",
        marginLeft: responsiveWidth(1.5),
        fontFamily: "Times New Roman",
    },
    Rhs: {
        height: responsiveHeight(5.5),
        width: responsiveWidth(53),
        // borderWidth: responsiveWidth(0.3),
        borderColor: "black",
        borderRadius: responsiveWidth(2),
        marginLeft: responsiveWidth(5.5),
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainer: {

        justifyContent: 'center',
        alignItems: 'center',
        width: '101%',
        height: '100%',
    },
    Rhs_text: {
        fontSize: responsiveFontSize(2),
        color: '#000000',
        fontWeight: '500',
        fontFamily: "Times New Roman",
        // borderWidth: 1
    },
    hr_tag: {
        borderBottomWidth: 4,
        borderBottomColor: '#D7D7D7',
        marginVertical: responsiveHeight(1),
    },
    editButton: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 10,
        textDecorationLine: 'underline',
        alignSelf: 'flex-end',
        paddingRight: responsiveWidth(3),
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