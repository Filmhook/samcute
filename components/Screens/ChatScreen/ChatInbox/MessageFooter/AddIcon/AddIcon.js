import React from 'react'
import {Image,StyleSheet,TouchableOpacity} from "react-native"

export default function Addicon() {
  return (
    <>
    <TouchableOpacity>
    <Image source={require('../../../../../../components/Assets/Chats_Icon_And_Fonts/add_icon.png')} style={style.addimage}/>
    </TouchableOpacity>
    </>
  )
}

const style = StyleSheet.create({
      addimage:{
        width:35,
        height:35,
        marginLeft:5,
        marginTop:20
      }
  })