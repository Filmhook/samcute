import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'


import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

export default function Education() {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <View style={style.container}>

                <View style={style.bio_title}>
                    <TouchableOpacity style={style.bio_title} onPress={toggleExpanded}>
                        <Text style={style.bio_title_text}>
                            Education
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
                    <View style={{ flexDirection: "row", marginTop: 15 }}>

                        <View style={style.Lhs}>

                            <Text style={style.Lhs_text}> School </Text>

                        </View>

                        <View style={style.Rhs}>
                            <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                                <Text style={style.Rhs_text}>St.Columbia's School</Text>
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
                                <Text style={style.Rhs_text}>NA</Text>
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
                                <Text style={style.Rhs_text}>MA, BA</Text>
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
        //  borderWidth:2,
        //  height: responsiveHeight(28),
        flex: 1

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


        width: '101%',
        height: '100%',
    },
    Rhs_text: {
        fontSize: responsiveFontSize(2),
        color: '#000000',
        fontWeight: '500',
        fontFamily: "Times New Roman",
        right: responsiveWidth(-5),
        bottom: -6
    },
    hr_tag: {
        borderBottomWidth: 4,
        borderBottomColor: '#D7D7D7',
        marginVertical: responsiveHeight(1),
    }
})