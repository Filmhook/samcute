import React from 'react'
import { View,StyleSheet,Text, ScrollView } from 'react-native'
import Msgfooterroot from '../MessageFooter/MessageFooterRoot/MessageFooterRoot'


export default function Messagesection() {
  return (
    <>
    <ScrollView  
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    style={style.container}
    >
     
        <Text style={style.text}>Chats Yet To Come...</Text>
        <Text style={style.text}>Chats Yet To Come...</Text>
        <Text style={style.text}>Chats Yet To Come...</Text>
        <Text style={style.text}>Chats Yet To Come...</Text>
        <Text style={style.text}>Chats Yet To Come...</Text>
        <Text style={style.text}>Chats Yet To Come...</Text>
        <Text style={style.text}>Chats Yet To Come...</Text>
        <Text style={style.text}>Chats Yet To Come...</Text>
        <Text style={style.text}>Chats Yet To Come...</Text>
        <Text style={style.text}>Chats Yet To Come...</Text>
        <Text style={style.text}>Chats Yet To Come...</Text>
        <Text style={style.text}>Chats Yet To Come...</Text>
        <Text style={style.text}>Chats Yet To Come...</Text>
        <Text style={style.text}>Chats Yet To Come...</Text>
        <Text style={style.text}>Chats Yet To Come...</Text>
        <Text style={style.text}>Chats Yet To Come...</Text>
        <Text style={style.text}>Chats Yet To Come...</Text>
        <Text style={style.text}>Chats Yet To Come...</Text>
        <Text style={style.text}>Chats Yet To Come...</Text>
        <Text style={style.text}>Chats Yet To Come...</Text>
        <Text style={style.text}>Chats Yet To Come...</Text>
        <Text style={style.text}>Chats Yet To Come...</Text>
    </ScrollView>
    </>
  )
}

const style = StyleSheet.create({
    container:{
        height:"auto",
    },
    text:{
      fontSize:20,
      margin:10
    }
})