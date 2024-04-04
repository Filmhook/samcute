import React from 'react'
import { TouchableOpacity, View ,Image,StyleSheet} from 'react-native'

export default function Videocall() {
  return (
    <> 
      <TouchableOpacity>
        <View style={style.imagediv}> 
            <Image source={require('../../../../../../../components/Assets/Chats_Icon_And_Fonts/Video_call_icon.png')}  style={style.image}/>
        </View>
      </TouchableOpacity>
    </>
  )
}

const style = StyleSheet.create({
    imagediv:{
        height:60,
        width:60,
        marginLeft:170,
        marginTop:-60,
        borderRadius:50,
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"black",
        justifyContent:"center",
        alignItems:"center"
    },
    image:{
        width:'70%',
        height:'60%' 
    }
})