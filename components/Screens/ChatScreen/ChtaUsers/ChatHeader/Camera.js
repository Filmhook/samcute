import React,{useState} from 'react'
import { Image ,TouchableOpacity } from 'react-native'
import { launchCamera } from 'react-native-image-picker'

export default function Chatcamera() {

  const [selectedImage, setSelectedImage] = useState(null);

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
        setSelectedImage(imageUri);
        console.log(imageUri);
      }
    });
  }
  return (
    <>
        <TouchableOpacity  onPress={handleCameraLaunch}>
             <Image source={require('../../../../../components/Assets/Chats_Icon_And_Fonts/camera_icon.png')} style={{width:40,height:32,marginTop:18,marginLeft:10}}  />
        </TouchableOpacity>
    </>
  )
}