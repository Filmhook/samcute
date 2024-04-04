import React,{useState} from 'react'
import { Image ,TouchableOpacity} from 'react-native'
//import MessageCompose   from "react-native-message-compose"

export default function Chatcompose() {

  return (
     <>
     <TouchableOpacity >
         <Image source={require('../../../../../components/Assets/Chats_Icon_And_Fonts/write_icon.png')} style={{width:40,height:40,marginLeft:20,marginTop:15}} />
     </TouchableOpacity>
     </>
  )
}