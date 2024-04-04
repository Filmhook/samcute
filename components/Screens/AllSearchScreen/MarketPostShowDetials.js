import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default function MarketPostShowDetials() {
const navigation=useNavigation()
    const route = useRoute();
    const { CompanyName, profilepics } = route.params;

    const handleFloatingButtonPress = () => {
        navigation.navigate('MarketPost');
      };
    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={{flexDirection:'row',width:responsiveWidth(100),justifyContent:'center',columnGap:responsiveWidth(1)}}>

            <View style={{ width: responsiveWidth(85), alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'black', fontSize: responsiveFontSize(3), fontWeight: '600' }}>{CompanyName}</Text>
            </View>

            <View style={{width:responsiveWidth(10),}}>
                {profilepics.map((pic, index) => (
                    <Image key={index} source={pic} style={{ width: responsiveWidth(10), height: responsiveWidth(10), borderRadius: responsiveWidth(10), }} />
                ))}
            </View>
            </View>
            <TouchableOpacity style={styles.floatingButton} onPress={handleFloatingButtonPress}>
          <Image
            source={require('../../Assets/Audition_Icons_Fonts/write_icon_148501-removebg.png')}
            style={styles.floatingButtonIcon}  
          />
        </TouchableOpacity>
        </ScrollView>
    )

}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: responsiveHeight(2),
    },
    floatingButton: {
        position: 'absolute',
        //right: 0,
        backgroundColor: '#656ce6',
        borderRadius: responsiveWidth(15),
        height:responsiveWidth(15),
        padding: responsiveWidth(2.5),
        width: responsiveWidth(15),
       
        elevation: 10,
        left: responsiveWidth(78),
        top: responsiveHeight(70),
        zIndex: 1,
      },
      floatingButtonIcon: {
        width: responsiveWidth(8),
        height: responsiveHeight(4.5),
       // tintColor: 'white',
        alignSelf: 'center',
      },
})
