import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { Dimensions } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const Director = () => {
  
    const navigation=useNavigation();

    const handleFixedIcon1Press = () => {
        // Logic to show/hide the 9 icons related to fixed icon 1
        setShowIcons(!showIcons);
      };

    return (

        <View style={styles.container}>
            <View style={{ borderWidth: 1, width: '100%', padding: responsiveWidth(1) ,}}>

                <View >
                    <Text style={{ fontSize: responsiveFontSize(3), margin: responsiveHeight(1),color:'black' }}>Producers</Text>
                </View>
              

                    <TouchableOpacity onPress={()=>{navigation.navigate('User Profile')}} style={styles.boxOne}>

                        <View>
                            <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Filmhook-thalaivar_profile.jpeg')} style={styles.images} />

                            <View style={styles.rating}>

                                <Text style={{ color: 'white' }}>9.2</Text>
                                <Image source={require("../../Assets/AllSearch_Icon_And_Fonts/Filmhook-star.png")} style={{ width: '26%', height: '80%', top: responsiveHeight(1) }} />
                            </View>


                            <View style={{ height: 15, width: 15, borderRadius: 50, backgroundColor: '#2af117', position: 'absolute', left: 81, top: 11 }}>

                            </View>
                        </View>
                        <View style={{ bottom: responsiveHeight(6.6) }}>
                            <Text style={styles.name}>Rajni</Text>
                        </View>

                        <View style={{ bottom: responsiveHeight(6.5) }}>
                            <View style={styles.detials} >

                                <View style={styles.imageContainer}>

                                    <Image source={require("../../Assets/AllSearch_Icon_And_Fonts/Filmhook-Workexp_icon.png")} style={styles.image}>
                                    </Image>
                                </View>

                                <Text style={{ fontSize: 12, fontWeight: '500' }}>25 years Exp</Text>
                            </View>

                            <View style={styles.detials}>

                                <View style={styles.imageContainer}>

                                    <Image source={require("../../Assets/AllSearch_Icon_And_Fonts/movies-icon-removebg-preview.png")} style={styles.image}>
                                    </Image>
                                </View>

                                <Text style={{ fontSize: 12, fontWeight: '500' }}>Movies</Text>
                            </View>

                            <View style={styles.detials}>

                                <View style={styles.imageContainer}>

                                    <Image source={require("../../Assets/AllSearch_Icon_And_Fonts/reservation-icon.jpg")} style={styles.image}>
                                    </Image>
                                </View>

                                <Text style={{ fontSize: 12, fontWeight: '500' }}>DOB</Text>
                            </View>

                            <View style={styles.detials}>

                                <View style={styles.imageContainer}>

                                    <Image source={require("../../Assets/AllSearch_Icon_And_Fonts/Net-worth-icon-removebg-preview.png")} style={styles.image}>
                                    </Image>
                                </View>

                                <Text style={{ fontSize: 12, fontWeight: '500' }}>NetWorth</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
              




            </View>
        </View>

    )
}
export default Director;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        // borderWidth: 1,
        // borderColor: 'red',


        // alignItems: 'center'
    },

    boxOne: {
        height: responsiveHeight(28.5), borderRadius: responsiveWidth(5), width: responsiveWidth(34) ,borderWidth:1




    },
    detials: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: responsiveWidth(3),
        alignSelf: 'flex-start',
        marginLeft: responsiveWidth(1),
        width: '85%',
        height: '15%',
        margin: responsiveWidth(0.3),
    },
    images: {
        height: '50%',
        width: '50%',
        borderRadius: responsiveWidth(8),
        alignSelf: 'center',
        top: responsiveHeight(1)

    },
    rating: {
        borderWidth: 1,
        borderRadius: responsiveWidth(2),

        height: '15%',
        width: '35%',
        flexDirection: 'row',
        backgroundColor: 'black',
        alignSelf: 'center',
        flexWrap: 'wrap',
        bottom: responsiveHeight(1)

    },
    name: {
        fontSize: responsiveFontSize(2),
        alignSelf: 'center',
        fontWeight: 'bold'

    },
    imageContainer: {
        borderRadius: responsiveWidth(4),
        borderColor: 'black',
        borderWidth: 1.5,
        height: '100%',
        width: '22%'


    },
    image: {
        width: '85%',
        height: '95%',
        top: responsiveHeight(0.2),
        //  backgroundColor: 'cyan',
        borderWidth: 1,
        borderRadius: responsiveWidth(2),
        left: responsiveWidth(0.4)

    }

})