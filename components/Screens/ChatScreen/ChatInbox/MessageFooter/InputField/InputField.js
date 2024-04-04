import React,{useState} from 'react' 
import { TextInput , StyleSheet, Image, View , ScrollView,KeyboardAvoidingView} from 'react-native'

import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import Sendicon from '../SendIcon/SendIcon'


export default function Inputfield() { 
   
    const[typemsg , setTypemsg]=useState("")

  return (
    <>
    
    <View style={{width:'62%'}} > 
    <TextInput 
          style={style.textinput}
          placeholder="type here"
          value={typemsg}
          onChangeText={text => setTypemsg(text)}
      />
      </View> 
    <Sendicon />
    </>
  )
}

const style = StyleSheet.create({
      textinput:{
          width:"95%",
          height:50,
          borderWidth:2,
          borderColor:"gray",
          borderRadius:20,
          marginLeft:10,
          marginTop:10
      }
  })
  