import React from 'react'
import { Image,StyleSheet,TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native' 


export default function Profilepic() {

    const navigation = useNavigation();
     
  return (
    <>
        <TouchableOpacity onPress={()=>navigation.navigate('userprofile')}>
            <Image source={require("../../../../../../components/Assets/Chats_Icon_And_Fonts/userprofile.png")} style={style.image}/> 
        </TouchableOpacity>

    </>
  )
}

const style = StyleSheet.create({
    image:{
        height:50,
        width:50,
        marginLeft:30,
        marginTop:10
    }
})