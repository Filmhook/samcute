import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Profilepic from './ProfilePic/ProfilePic'
import Profilename from './ProfileName/ProfileName'
import Mediaicon from './MediaIcon/MediaIcon'



export default function Chatinputscreenheadder() {
  return (
    <>
    <View style={style.headder}>
        <Profilepic/>
        <Profilename/>
        <Mediaicon/>
    </View>
    </>
  )
}

const style = StyleSheet.create({
    headder:{
        height:"auto",
        backgroundColor:"whitesmoke",
        flexDirection:"row",
        // borderTopWidth:2,
        // borderTopColor:"black",
        // borderBottomWidth:2,
        // borderBottomColor:"black",
    }
})
