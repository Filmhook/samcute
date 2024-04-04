import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'


export default function Professional_infoforpublic() {
    return (
        <>
            <View style={style.container}>

                <View style={style.headder}>

                    <Text style={style.headder_text}>Personal Information</Text>

                </View>

                <View style={{ flexDirection: "row", marginTop: responsiveHeight(2) }}>

                    <View style={style.Lhs}>

                        <Text style={style.Lhs_text}> Religion </Text>

                    </View>

                    <View style={style.Rhs}>
                    <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">

                        <Text style={style.Rhs_text}>Islam</Text>
                        </ImageBackground> 
                    </View>

                </View>

                {/* -------------------------------------------------- */}

                <View style={{ flexDirection: "row", marginTop: responsiveHeight(2) }}>

                    <View style={style.Lhs}>

                        <Text style={style.Lhs_text}> Caste </Text>

                    </View>

                    <View style={style.Rhs}>
                    <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">

                        <Text style={style.Rhs_text}>Sunni</Text>
                        </ImageBackground> 
                    </View>

                </View>

                {/* -------------------------------------------------- */}

                <View style={{ flexDirection: "row", marginTop: responsiveHeight(2) }}>

                    <View style={style.Lhs}>

                        <Text style={style.Lhs_text}> Marital Status </Text>

                    </View>

                    <View style={style.Rhs}>
                    <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">

                        <Text style={style.Rhs_text}>Married</Text>
                        </ImageBackground> 
                    </View>

                </View>

                {/* -------------------------------------------------- */}

                <View style={{ flexDirection: "row", marginTop: responsiveHeight(2) }}>

                    <View style={style.Lhs}>

                        <Text style={style.Lhs_text}> Spouse </Text>

                    </View>

                    <View style={style.Rhs}>
                    <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                        <Text style={style.Rhs_text}>Gauri Khan</Text>
                        </ImageBackground> 
                    </View>

                </View>
                {/* -------------------------------------------------- */}

                <View style={{ flexDirection: "row", marginTop: responsiveHeight(2) }}>

                    <View style={style.Lhs}>

                        <Text style={style.Lhs_text}> Children </Text>

                    </View>

                    <View style={style.Rhs}>
                    <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                        <Text style={style.Rhs_text}>Aryan Khan</Text>
                        </ImageBackground> 
                    </View>

                </View>
                <View style={{ flexDirection: "column", marginTop: responsiveHeight(2), left:responsiveWidth(38) }}>
                <View style={style.Rhs_childOne}>
                <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                    <Text style={style.Rhs_text}>Abram Khan</Text>
                    </ImageBackground>
                </View>
                <View style={style.Rhs_ChildTwo}>
                <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                    <Text style={style.Rhs_text}>Suhana Khan</Text>
                    </ImageBackground>
                </View>

                </View>

                {/* -------------------------------------------------- */}

                <View style={{ flexDirection: "row", marginTop: responsiveHeight(2) }}>

                    <View style={style.Lhs}>

                        <Text style={style.Lhs_text}> Mother </Text>

                    </View>

                    <View style={style.Rhs}>
                    <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                        <Text style={style.Rhs_text}>Latee Fatima</Text>
                        </ImageBackground>
                    </View>

                </View>

                {/* -------------------------------------------------- */}

                <View style={{ flexDirection: "row", marginTop: responsiveHeight(2) }}>

                    <View style={style.Lhs}>

                        <Text style={style.Lhs_text}> Father </Text>

                    </View>

                    <View style={style.Rhs}>
                    <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                        <Text style={style.Rhs_text}> Khan</Text>
                        </ImageBackground>
                    </View>

                </View>

                {/* -------------------------------------------------- */}

                <View style={{ flexDirection: "row", marginTop: responsiveHeight(2) }}>

                    <View style={style.Lhs}>

                        <Text style={style.Lhs_text}> Brother </Text>

                    </View>

                    <View style={style.Rhs}>
                    <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                        <Text style={style.Rhs_text}>N/A</Text>
                        </ImageBackground>
                    </View>

                </View>
                {/* -------------------------------------------------- */}

                <View style={{ flexDirection: "row", marginTop: responsiveHeight(2) }}>

                    <View style={style.Lhs}>

                        <Text style={style.Lhs_text}> Sister </Text>
                    </View>

                    <View style={style.Rhs}>
                    <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                        <Text style={style.Rhs_text}>Shahnaz </Text>
                        </ImageBackground>
                    </View>

                </View>
            </View>

            <View style={style.hr_tag} />
        </>
    )
}


const style = StyleSheet.create({
    container:{
       flex:1
        // height:responsiveHeight(71)
    },

    headder: {
       // marginTop: 20,
    },
    headder_text: {
        fontWeight: "bold",
        fontSize: responsiveFontSize(3),
        color: "#323232",
        marginLeft: responsiveWidth(2),
        fontFamily: "Times New Roman",
        textDecorationLine: "underline",
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
        borderRadius:responsiveWidth(2),
        marginLeft: responsiveWidth(5.5),
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainer: {
       
      
          width: '101%',
          height: '100%',
       },
    Rhs_childOne: {
        height: responsiveHeight(5.5),
        width: responsiveWidth(53),
        // borderWidth: responsiveWidth(0.3),
        borderColor: "black",
        borderRadius:responsiveWidth(2),
        marginLeft: responsiveWidth(5.5),
        justifyContent: "center",
        alignItems: "center"
    },
    Rhs_ChildTwo: {
        height: responsiveHeight(5.5),
        width: responsiveWidth(53),
        // borderWidth: responsiveWidth(0.3),
        borderColor: "black",
        borderRadius:responsiveWidth(2),
        marginLeft: responsiveWidth(5.5),
        justifyContent: "center",
        alignItems: "center",
        marginTop:responsiveHeight(2)
    },
    Rhs_text: {
        fontSize:responsiveFontSize(2),
        color:'#000000',
        fontWeight:'500',
        fontFamily:"Times New Roman",
        marginLeft: responsiveWidth(20),
        top:responsiveHeight(1)
      
    },
    hr_tag: {
        borderBottomWidth: 4,
        borderBottomColor: '#D7D7D7',
        marginVertical: responsiveHeight(1),
    }
})