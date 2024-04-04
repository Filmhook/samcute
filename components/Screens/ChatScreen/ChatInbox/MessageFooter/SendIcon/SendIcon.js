import React from 'react'
import { View,Image, TouchableOpacity } from 'react-native'

export default function Sendicon() {
  return (
    <> 
        <View style={{width:55,height:55,position:'absolute',left:230,top:6}}>
        <TouchableOpacity>
                    <Image source={require("../../../../../../components/Assets/Chats_Icon_And_Fonts/send_icon.png")} style={{width:"100%",height:"100%"}}
                        />
    </TouchableOpacity>
    </View>
    </>
  )
}