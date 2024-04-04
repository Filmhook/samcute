import React,{useState} from 'react'
import { Image ,TouchableOpacity } from 'react-native'
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
             <Image source={require('../../../../../../components/Assets/Chats_Icon_And_Fonts/camera_icon.png')} style={{width:50,height:40,marginTop:12,marginLeft:5}}  />
        </TouchableOpacity>
    </>
  )
}
