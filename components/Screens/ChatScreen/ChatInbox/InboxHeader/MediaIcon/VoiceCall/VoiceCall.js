import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

export default function Voicecall() {
  return (
    <> 
     <TouchableOpacity onPress={()=>console.log('clicked')}>
        <View style={style.imgdiv}>
        <Image source={require('../../../../../../../components/Assets/Chats_Icon_And_Fonts/Video_call_icon.png')} style={style.img}/>
        </View>
     </TouchableOpacity>
    </>
  )
}

const style = StyleSheet.create({
    imgdiv:{
        height:60,
        width:60,
        marginLeft:94,
        marginTop:-60,
        borderRadius:50,
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"black",
        justifyContent:"center",
        alignItems:"center"
    },
    img:{
        width:'65%',
        height:'65%'
    }

})