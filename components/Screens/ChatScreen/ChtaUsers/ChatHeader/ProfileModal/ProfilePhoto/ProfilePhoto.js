import React from 'react'
import { Image, StyleSheet, View,Text } from 'react-native'

export default function Profilephoto() {
  return (
    <> 
    <View style={style.container}>
      <View style={style.imgdiv}>
      </View>
    </View>  
    </>
  )
}

const style = StyleSheet.create({
    container:{
        height:250,
        width:280,
        borderRadius:20,
        backgroundColor:"#3B3B3C",
    },
    imgdiv:{
        height:200,
        width:190,
        borderRadius:20,
        marginLeft:45,
        marginTop:20,
        backgroundColor:"white",
    }
})