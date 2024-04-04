import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Blockedchats() {
  return (
   <> 
   <View style={style.container}>
   <Text style={style.text}>Blocked Chats</Text>
   </View>
   </>
  )
}

const style = StyleSheet.create({
    container:{
        height:60,
        width:280,
        borderRadius:20,
        marginTop:10,
        backgroundColor:"#3B3B3C",
    },
    text:{
        color:"white",
        fontSize:20,
        marginLeft:20,
        marginTop:20
    }
})