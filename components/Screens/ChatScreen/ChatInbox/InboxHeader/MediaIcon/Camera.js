import React,{useState} from 'react'
import { Image ,StyleSheet,TouchableOpacity, View } from 'react-native'
import { launchCamera } from 'react-native-image-picker'


export default function Camera() {

  const [cameraImage, setCameraImageImage] = useState(null);

  handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1000,
      maxWidth: 1000
    }

    launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        // Process the captured image
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setCameraImageImage(imageUri);
        console.log(imageUri);
      }
    });
  }
  return (
    <>
        <TouchableOpacity  onPress={handleCameraLaunch}>
            <View style={style.imagediv}>
                 <Image source={require('../../../../../../components/Assets/Chats_Icon_And_Fonts/camera_icon.png')} style={style.image}/>
            </View> 
        </TouchableOpacity>
    </>
  )
}

const style = StyleSheet.create({
    imagediv:{
        height:60,
        width:60,
        marginLeft:15,
        marginTop:20,
        borderRadius:50,
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"black",
        justifyContent:"center",
        alignItems:"center"
    },
    image:{
        width:"66%",
        height:"55%"
    }
})