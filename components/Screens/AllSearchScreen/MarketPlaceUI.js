import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { TextInput } from 'react-native-paper'

export default function MarketPlaceUI() {
    return (
        <View style={styles.container}>

            <View style={styles.searchBox}>
                <ImageBackground style={{ width: responsiveWidth(85), height: responsiveHeight(8), justifyContent: 'center', alignItems: 'center',  flexDirection: 'row',
        columnGap: responsiveWidth(12)}} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}>
                    <TextInput style={{ height: responsiveHeight(5), width: responsiveWidth(50),left:responsiveWidth(2) }}>
                        <Text>Search</Text>
                    </TextInput>
                    <Image style={{ height: responsiveHeight(4), width: responsiveWidth(8), borderWidth: responsiveWidth(0.2),left:responsiveWidth(7) }} source={require('../../Assets/AllSearch_Icon_And_Fonts/search_icon.png')} />

                </ImageBackground>
            </View>

            <View style={{ flexDirection: 'row', top: responsiveHeight(5), columnGap: responsiveWidth(20) }}>

                <TouchableOpacity style={{ height: responsiveHeight(6), width: responsiveWidth(30), borderLeftWidth: responsiveWidth(0.4), borderRightWidth: responsiveWidth(0.4), justifyContent: 'center', alignItems: 'center', borderRadius: responsiveWidth(3) }}>
                    <ImageBackground style={{ width: responsiveWidth(28), height: responsiveHeight(5.6), justifyContent: 'center', alignItems: 'center', }} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}>
                        <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '700', color: 'black' }}>Buy</Text>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity style={{ height: responsiveHeight(6), width: responsiveWidth(30), borderLeftWidth: responsiveWidth(0.4), borderRightWidth: responsiveWidth(0.4), justifyContent: 'center', alignItems: 'center', borderRadius: responsiveWidth(3) }}>
                    <ImageBackground style={{ width: responsiveWidth(28), height: responsiveHeight(5.6), justifyContent: 'center', alignItems: 'center', }} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}>
                        <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '700', color: 'black' }}>Rentals</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>



        </View>
    )



}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        borderWidth: 2,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    searchBox: {
        width: '80%',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: responsiveHeight(7),
        top: responsiveHeight(2),
        borderRadius: responsiveWidth(3),
        flexDirection: 'row',
       // columnGap: responsiveWidth(8)


    },



})
