import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet, ImageBackground } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";




const IndustryScreenOthers = () => {
    // const navigation = useNavigation();
    // const handleNavigation = () => {
    //     navigation.navigate("Home")
    // }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.contentBox}>
                    <ImageBackground source={require('../../Assets/AllSearch_Icon_And_Fonts/Filmhook-bg.png')} style={styles.imgbg} resizeMode="stretch">
                    <TouchableOpacity style={styles.contentDetials} >

                    <View style={{ marginTop: responsiveHeight(2) }}>
                            <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_Movies.png')} style={{ borderWidth: 1, width: responsiveWidth(25), height: responsiveHeight(13), }} />
                        </View>

                        <View style={{ height: '28%', width: '100%', marginTop: responsiveHeight(2),justifyContent:'center' }}>
                            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: "900", textAlign: 'center' ,color:'black'}}>MOVIES</Text>
                        </View>
                      
                    </TouchableOpacity>
                    </ImageBackground>
                </View>

                <View style={styles.contentBox}>
                <ImageBackground source={require('../../Assets/AllSearch_Icon_And_Fonts/Filmhook-bg.png')} style={styles.imgbg} resizeMode="stretch">
                    <TouchableOpacity style={styles.contentDetials}> 
                      
                        <View style={{ marginTop: responsiveHeight(2) }}>
                            <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_tv_drama.png')} style={{ borderWidth: 1, width: responsiveWidth(25), height: responsiveHeight(13), }} />
                        </View>

                        <View style={{ height: '28%', width: '100%', marginTop: responsiveHeight(2) ,justifyContent:'center' }}>
                            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: "900", textAlign: 'center',color:'black' }}>TV DRAMA SHOW</Text>
                        </View>

                    </TouchableOpacity>
                    </ImageBackground>
                </View>
                <View style={styles.contentBox}>
                <ImageBackground source={require('../../Assets/AllSearch_Icon_And_Fonts/Filmhook-bg.png')} style={styles.imgbg} resizeMode="stretch">

                    <TouchableOpacity style={styles.contentDetials}>
                       
                        <View style={{ marginTop: responsiveHeight(2) }}>
                            <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_web_series.png')} style={{ borderWidth: 1, width: responsiveWidth(25), height: responsiveHeight(13) }} />
                        </View>
                        <View style={{ height: '28%', width: '100%', marginTop: responsiveHeight(2)  ,justifyContent:'center'}}>
                            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: "900", textAlign: 'center' ,color:'black'}}>WEB SERIES</Text>
                        </View>

                    </TouchableOpacity>
                    </ImageBackground>
                </View>

                <View style={styles.contentBox}>
                <ImageBackground source={require('../../Assets/AllSearch_Icon_And_Fonts/Filmhook-bg.png')} style={styles.imgbg}>

                    <TouchableOpacity style={styles.contentDetials}>
                       
                        <View style={{ marginTop: responsiveHeight(2) }}>
                            <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_Documentry.png')} style={{ borderWidth: 1, width: responsiveWidth(25), height: responsiveHeight(13), }} />
                        </View>

                        <View style={{ height: '28%', width: '100%', marginTop: responsiveHeight(2),justifyContent:'center'  }}>
                            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: "900", textAlign: 'center',color:'black' }}>DOCUMENTARY</Text>
                        </View>

                    </TouchableOpacity>
                    </ImageBackground>
                </View>

                <View style={styles.contentBox}>
                <ImageBackground source={require('../../Assets/AllSearch_Icon_And_Fonts/Filmhook-bg.png')} style={styles.imgbg}>

                    <TouchableOpacity style={styles.contentDetials}>
                       
                        <View style={{ marginTop: responsiveHeight(2) }}>
                            <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Update/news_reporter_icon-PhotoRoom.png')} style={{ borderWidth: 1, width: responsiveWidth(25), height: responsiveHeight(13), }} />
                        </View>
                        <View style={{ height: '28%', width: '100%', marginTop: responsiveHeight(2) ,justifyContent:'center' }}>
                            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: "900", textAlign: 'center' ,color:'black'}}>NEWS REPORTER</Text>
                        </View>

                    </TouchableOpacity>
                    </ImageBackground>
                </View>
                <View style={styles.contentBox}>
                <ImageBackground source={require('../../Assets/AllSearch_Icon_And_Fonts/Filmhook-bg.png')} style={styles.imgbg}>

                    <TouchableOpacity style={styles.contentDetials}>
                        
                        <View style={{ marginTop: responsiveHeight(2) }}>
                            <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Update/Advertisement-icon-PhotoRoom.png')} style={{ borderWidth: 1, width: responsiveWidth(25), height: responsiveHeight(13), }} />
                        </View>
                        <View style={{ height: '28%', width: '100%', marginTop: responsiveHeight(2) ,justifyContent:'center' }}>
                            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: "900", textAlign: 'center',color:'black' }}>ADS INDUSTRY</Text>
                        </View>

                    </TouchableOpacity>
                    </ImageBackground>
                </View>

                <View style={styles.contentBox}>
                <ImageBackground source={require('../../Assets/AllSearch_Icon_And_Fonts/Filmhook-bg.png')} style={styles.imgbg}>

                    <TouchableOpacity style={styles.contentDetials} >
                        
                        <View style={{ marginTop: responsiveHeight(2) }}>
                            <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Update/Modeling-Industry-icon-PhotoRoom.png')} style={{ borderWidth: 1, width: responsiveWidth(25), height: responsiveHeight(13), }} />
                        </View>
                        <View style={{ height: '28%', width: '100%', marginTop: responsiveHeight(2),justifyContent:'center'}}>
                            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: "900", textAlign: 'center',color:'black' }}>MODELING INDUSTRY</Text>
                        </View>

                    </TouchableOpacity>
                    </ImageBackground>
                </View>

                <View style={styles.contentBox}>
                <ImageBackground source={require('../../Assets/AllSearch_Icon_And_Fonts/Filmhook-bg.png')} style={styles.imgbg}>

                    <TouchableOpacity style={styles.contentDetials} >
                        
                        <View style={{ marginTop: responsiveHeight(2) }}>
                            <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Filmhook-Shooting_location_spot-removebg-preview.png')} style={{ borderWidth: 1, width: responsiveWidth(25), height: responsiveHeight(13), }} />
                        </View>
                        <View style={{ height: '28%', width: '100%', marginTop: responsiveHeight(2),justifyContent:'center'  }}>
                            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: "900", textAlign: 'center',color:'black' }}>SHOOTING LOCATIONS</Text>
                        </View>

                    </TouchableOpacity>
                    </ImageBackground>
                </View>
                <View style={styles.contentBox}>
                <ImageBackground source={require('../../Assets/AllSearch_Icon_And_Fonts/Filmhook-bg.png')} style={styles.imgbg}>

                    <TouchableOpacity style={styles.contentDetials}  >
                       
                        <View style={{ marginTop: responsiveHeight(2) }}>
                            <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Update/FH_MarketPlace.png')} style={{ borderWidth: 1, width: responsiveWidth(25), height: responsiveHeight(13), }} />
                        </View>
                        <View style={{ height: '28%', width: '100%', marginTop: responsiveHeight(2),justifyContent:'center'  }}>
                            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: "900", textAlign: 'center' ,color:'black'}}>MARKET</Text>
                        </View>

                    </TouchableOpacity>
                    </ImageBackground>
                </View>
            </View>





            {/* <TouchableOpacity>
            <Text>Film</Text>
           </TouchableOpacity>
           <TouchableOpacity>
            <Text>Film</Text>
           </TouchableOpacity>
           <TouchableOpacity>
            <Text>Film</Text>
           </TouchableOpacity>
           <TouchableOpacity>
            <Text>Film</Text>
           </TouchableOpacity>
           <TouchableOpacity>
            <Text>Film</Text>
           </TouchableOpacity>
           <TouchableOpacity>
            <Text>Film</Text>
           </TouchableOpacity>
           <TouchableOpacity>
            <Text>Film</Text>
           </TouchableOpacity> */}




        </View>
    )


}
export default IndustryScreenOthers;

const styles = StyleSheet.create({

    // container: {
    //     borderWidth: 1,
    //     borderColor:'red',
    //     height: 691,
    //     width: 400,
    //     margin: 5,
    //     display: 'flex',
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     justifyContent: 'space-around',
    //     flexWrap: 'wrap',

    //     //top: 60,

    // }
    container: {
        flex: 1,
        flexDirection: 'column',
        
        
        alignItems: 'center'
    },
    content:{
      
       
        width:'100%',
        flexDirection:'row',
        height:'100%',
        flexWrap:'wrap',
        columnGap:responsiveWidth(2),
        justifyContent:'center',
        alignContent:'center'
        

    },
    contentBox:{
        borderRadius: responsiveWidth(5), height: '31%', width: '31.5%',marginTop: responsiveHeight(1),

    },
    contentDetials:{
        borderRadius: responsiveWidth(5), height: '100%', width: '100%', alignItems: 'center',

    },
    imgbg:{
        height:responsiveHeight(25.3),
        width:responsiveWidth(31)
       // borderWidth:1

    }




})