import React,{useState} from 'react'
import { Image, TouchableOpacity, View ,StyleSheet} from 'react-native'
//import {DocumentPicker } from 'react-native-document-picker'
import DocumentPicker from "react-native-document-picker"

export default function Documentpicker() {
  //const [doc, setDoc] = useState(null);

    // const pickFile = async() => {
     
    // const result = await DocumentPicker.getDocumentAsync({
    //     type: "application/*"
    // });
    // console.log(result);
    // if (!result.cancelled) {
    //     setFile(result.name);
    // }
    // }
//  const pickFile=async()=>{
//       try{
//       const doc =await DocumentPicker.pick()
//       console.log(doc);
//     }
//     catch(err){
//       console.log(err);
//     }
//  }
  
 
    // const pickFile= async ()=>{
    //   try{
    //     const doc = await DocumentPicker.pick();
    //   } catch(err){
    //       if (DocumentPicker.isCancel(err)) {
    //       console.log("user cancelled",err);
    //     }
    //     else { 
    //      console.log(err)
    //     }
    //   }
    // }
    const [pickedDocument, setPickedDocument] = useState(null);

    const pickDocument = async () => {
      try {
        const result = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles], // You can specify the types of files to allow (e.g., DocumentPicker.types.pdf)
        });
  
        console.log(result);
  
        setPickedDocument(result);
      } catch (err) {
        if (Documentpicker.isCancel(err)) {
          // User canceled the picker
          console.log('Document picking canceled');
        } else {
          // An error occurred
          console.error('Error picking document', err);
        }
      }
    };

  return (
    <> 
     <TouchableOpacity onPress={pickDocument} > 
        <View style={style.imagediv}> 
            <Image source={require('../../../../../../../components/Assets/Chats_Icon_And_Fonts/doc_icon.png')} style={style.image} {...pickedDocument ? pickedDocument.name : 'None'}/>
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
        marginTop:15,
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