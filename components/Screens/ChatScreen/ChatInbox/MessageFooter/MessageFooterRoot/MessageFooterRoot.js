import React from 'react'
//import Addicon from '../addicon/addicon'
//import Inputfield from '../inputfield/inputfield'
//import Camera from '../cameraicon/camera'
import { View,StyleSheet, ScrollView} from 'react-native'
//import Micicon from '../micicon/micicon'
import Addicon from '../AddIcon/AddIcon'
import Inputfield from '../InputField/InputField'
import Camera from '../CameraIcon/Camera'
import Micicon from '../MicIcon/MicIcon'


export default function Msgfooterroot() {

  return (
    <>
    
    <View style={style.container}>
      <Addicon />
      <Inputfield/>
      <Camera/>
      <Micicon/>
    </View>
    </>
  )
}

const style = StyleSheet.create({
    container:{
          flexDirection:"row",
          height:"auto"  
    }
})