import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet, ImageBackground } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import privateAPI from "../../api/privateAPI";




const IndustryScreen = ({route}) => {

    const {selectedIndIds, selectedIds}=route.params;

    console.log('selectedIndIds', selectedIndIds,  )
    console.log('selectedIds',selectedIds)
    const [platforms, setPlatforms] = useState([]);

    const navigation = useNavigation();
    const handleNavigation = (platfornId) => {
        console.log('platformid', platfornId)

        if (platfornId === 8) {
            navigation.navigate("ShootingLocationPage");
        }
        else if(platfornId === 9){
            navigation.navigate("MarketPlace");
        }
        else{


        navigation.navigate("Home", {selectedIndIds, selectedIds, platfornId})
        }
    }

    const fetchData = async () => {
        try {
            const jwt = await AsyncStorage.getItem('jwt');
            const response = await privateAPI.get('masterData/getAllPlatform');
            const extractedData = response.data.data.map(item => ({
                id: item.id,
                name: item.platformName,

                imagePath: item.iconFilePath
            }));
            setPlatforms(extractedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.content}>

                {platforms.map(platform => (
                    <View key={platform.id} style={styles.contentBox}>
                        <ImageBackground source={require('../../Assets/AllSearch_Icon_And_Fonts/Filmhook-bg.png')} style={styles.imgbg} resizeMode="stretch">
                            <TouchableOpacity onPress={() => handleNavigation(platform.id)} style={styles.contentDetials}>
                                <View style={{ marginTop: responsiveHeight(3) }}>
                                    {/* Use platform.imagePath for the image source */}
                                    <Image source={{ uri: platform.imagePath  }} style={{ borderWidth: 1, width: responsiveWidth(25), height: responsiveHeight(13) }} />
                                </View>
                                <View style={{ height: '28%', width: '100%', marginTop: responsiveHeight(1), justifyContent: 'center' }}>
                                    <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: "900", textAlign: 'center', color: 'black' }}>{platform.name}</Text>
                                </View>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                ))}

               
            </View>



        </View>
    )


}
export default IndustryScreen;

const styles = StyleSheet.create({

   
    container: {
        flex: 1,
        flexDirection: 'column',


        alignItems: 'center'
    },
    content: {


        width: '100%',
        flexDirection: 'row',
        height: '100%',
        flexWrap: 'wrap',
        //  columnGap: responsiveWidth(0.5),
        justifyContent: 'center',
        alignContent: 'center'


    },
    contentBox: {
        height: '31%', width: '32%', marginTop: responsiveHeight(1), borderRadius: responsiveWidth(5)

    },
    contentDetials: {
        borderRadius: responsiveWidth(5), height: '100%', width: '100%', alignItems: 'center',

    },
    imgbg: {
        height: responsiveHeight(25.3),
        width: responsiveWidth(31)
        // borderWidth:1

    }




})