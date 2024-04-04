import React,{useState} from 'react'
import { Image, TouchableOpacity, View ,StyleSheet} from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
//import ImagePicker from 'react-native-image-crop-picker';

//import {launchImageLibrary} from 'react-native-image-picker'

export default function Imgpicker() {

  //const [selectedImage, setSelectedImage] = useState(null);
  
  const pickImage = () => {

    // const options = {
    //   mediaType: 'photo',
    // };
 
    // launchImageLibrary(options, (response) => {
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('Image picker error: ', response.error);
    //   } else {
    //     let imageUri = response.uri || response.assets?.[0]?.uri;
    //     setSelectedImage(imageUri);
    //     console.log(imageUri )
    //   }
    // });
   console.log('clicked_1')
  }

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 300,
      maxWidth: 300,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  }

  return (
    <> 
     <TouchableOpacity onPress={openImagePicker}> 
        <View style={style.imagediv}> 
            <Image source={require('../../../../../../../components/Assets/Chats_Icon_And_Fonts/image_picker_icon.png')} style={style.image}/>
        </View>
     </TouchableOpacity>
     <View> 
        {/* {selectedImage && <Image source={{ uri: selectedImage }} />} */}
     </View>
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
        width:'100%',
        height:'100%'
    }
})