import React from 'react'
import { Image, TouchableOpacity, View ,StyleSheet} from 'react-native'

export default function Groupcall() {
  return (
    <> 
    <TouchableOpacity onPress={()=>console.log('clicked')}>
        <View style={style.imagediv}>
            <Image source={require('../../../../../../../components/Assets/Chats_Icon_And_Fonts/group_call_icon.png')} style={style.image}/>
        </View>
    </TouchableOpacity>
    </>
  )
}

const style = StyleSheet.create({
    imagediv:{
        height:60,
        width:60,
        marginLeft:175,
        marginTop:-60,
        borderRadius:50,
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"black",
        justifyContent:"center",
        alignItems:"center"
    },
    image:{
        width:'65%',
        height:'65%'
    }
})