import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, styles, Switch } from 'react-native';
import Logout from './Logout'
import Profilephoto from './ProfilePhoto';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ChangePasswordScreen from './ChangePasswordScreen';

// pinnedprofile ===========
function PinnedProfile() {

  const navigation = useNavigation();

  const handle_pinnedprofile = () => {
    console.log('PinnedProfile');
    navigation.navigate('PinnedProfile')
  }

  const style = StyleSheet.create({
    containerOne: {
      height: responsiveHeight(7),
      width: responsiveWidth(65),
      borderRadius: responsiveWidth(4),
      marginTop: responsiveHeight(2),
      backgroundColor: "#3B3B3C",
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'white',
      //  alignItems:'center'
    },
    text: {
      color: "white",
      fontSize: responsiveFontSize(2.5),
      left: responsiveWidth(2)
      // marginLeft:20,
      // marginTop:20
    }
  })
  return (
    <>
      <View >
        <TouchableOpacity
          onPress={handle_pinnedprofile}
          style={style.containerOne}><Text style={style.text}>Pinned Profile</Text></TouchableOpacity>
      </View>
    </>
  )
}

// pinnedprofile ===========


// BlockedProfiles ===========
function BlockedProfiles() {
  const navigation = useNavigation();

  const handle_BlockedProfiles = () => {
    navigation.navigate('BlockedProfiles')
    //  console.log('BlockedProfiles');
  }

  const style = StyleSheet.create({
    containerThree: {
      height: responsiveHeight(7),
      width: responsiveWidth(65),
      borderRadius: responsiveWidth(4),
      marginTop: responsiveHeight(2),
      backgroundColor: "#3B3B3C",
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'white',
    },
    text: {
      color: "white",
      fontSize: responsiveFontSize(2.5),
      left: responsiveWidth(2)
    }
  })
  return (
    <>
      <TouchableOpacity
        onPress={handle_BlockedProfiles}
        style={style.containerThree}>
        <Text style={style.text}>Blocked Profiles</Text>
      </TouchableOpacity>
    </>
  )
}
// BlockedProfiles ===========


// Neartome ===========
function Neartome() {

  const navigation = useNavigation();

  const handle_Neartome = () => {
    navigation.navigate('GetBookingList')
    console.log('GetBookingList');
  }

  const style = StyleSheet.create({
    containerFour: {
      height: responsiveHeight(7),
      width: responsiveWidth(65),
      borderRadius: responsiveWidth(4),
      marginTop: responsiveHeight(2),
      backgroundColor: "#3B3B3C",
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'white',
    },
    text: {
      color: "white",
      fontSize: responsiveFontSize(2.5),
      left: responsiveWidth(2)
    }
  })
  return (
    <View >
      <TouchableOpacity
        onPress={handle_Neartome}
        style={style.containerFour}><Text style={style.text}>Get BookingList</Text></TouchableOpacity>
    </View>
  )
}
// Neartome ===========


// HelpAndSupport ===========
function HelpAndSupport() {
  const navigation = useNavigation();

  const handle_HelpAndSupport = () => {
    navigation.navigate('HelpAndSupport')
    console.log('HelpAndSupport');
  }

  const style = StyleSheet.create({
    containerTwo: {
      height: responsiveHeight(7),
      width: responsiveWidth(65),
      borderRadius: responsiveWidth(4),
      marginTop: responsiveHeight(2),
      backgroundColor: "#3B3B3C",
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'white',
    },
    text: {
      color: "white",
      fontSize: responsiveFontSize(2.5),
      left: responsiveWidth(2)
    }
  })

  return (
    <>
      <TouchableOpacity
        onPress={handle_HelpAndSupport}
        style={style.containerTwo}>
        <Text style={style.text}>Help&Support</Text>
      </TouchableOpacity>
    </>
  )
}

// HelpAndSupport ===========

function Settings() {
  const navigation = useNavigation();

  const handle_Settings = () => {
    // navigation.navigate('Settings')
    console.log('Settings');
  }

  const style = StyleSheet.create({
    containerSix: {
      height: responsiveHeight(7),
      width: responsiveWidth(65),
      borderRadius: responsiveWidth(4),
      marginTop: responsiveHeight(2),
      backgroundColor: "#3B3B3C",
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'white',
    },
    text: {
      color: "white",
      fontSize: responsiveFontSize(2.5),
      left: responsiveWidth(2)
    }
  })
  return (
    <>
      <TouchableOpacity
        onPress={handle_Settings}
        style={style.containerSix}>
        <Text style={style.text}>Settings</Text>
      </TouchableOpacity>
    </>
  )
}

// HelpAndSupport ===========

const ProfileModalRoot = ({ setIsVisible, IsVisible }) => {

  return (
    <>
      <View style={{ width: responsiveWidth(70), height: responsiveHeight(88) }}>
      <Image source={require('../../Assets/Chats_Icon_And_Fonts/next.png')} style={{ width: '18%', height: '6%',position:'absolute', right:'105%' ,backgroundColor:'gray', top:'2%'}}></Image>
        <Profilephoto
          setIsVisible={setIsVisible}
          IsVisible={IsVisible}
        />
        <PinnedProfile />
        <BlockedProfiles />
        <Neartome />
        {/* <Thememode/> */}
        <HelpAndSupport />
        <Settings />
        <Logout />
        
      </View>
    </>
  )
}
export default ProfileModalRoot;