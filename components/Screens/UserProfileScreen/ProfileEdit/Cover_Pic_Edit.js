import { View, Text ,StyleSheet ,Image,TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import ImagePicker from "react-native-image-crop-picker"

export default function Coverpic_edit_page() {
    // -------- Profile hide and show  ---------------
    const [coverpicvisible,setCoverpicvisible] = useState(false)

    const cover_pic_dropdown=()=>{
        setCoverpicvisible(!coverpicvisible)
     }

      // -------- Profile state hook ---------------
      const [coverpic , setCoverpic] = useState();

      const edit_cover_pic= async()=>{
        await ImagePicker.openPicker({
             cropping:true
         }).then(image => {
           console.log(image.path)
           setCoverpic(image.path)
         });
  }  

  return (
    <> 
    <View >
    <TouchableOpacity onPress={cover_pic_dropdown}>
            <Text style={{fontSize:22,fontWeight:"bold",fontWeight:"bold",color:"#323232",marginLeft:25}}>Cover picture</Text>
                </TouchableOpacity>

                {coverpicvisible && (
                    <TouchableOpacity 
                    onPress={edit_cover_pic} 
                      style={{
                        width:250,
                        height:150,
                        backgroundColor:"#C9CCD1",
                        borderRadius:10,
                        justifyContent:"center",
                        marginTop:20,
                        marginLeft:60
                                    }}> 
               { coverpic && <Image source={{ uri:coverpic.uri }} style={{width:"100%",height:"100%"}} /> }
                </TouchableOpacity> 
                )}
                   
                <View style={style.hr_tag}/>
                </View> 
    </>
  )
}

const style = StyleSheet.create({
    hr_tag:{
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      marginVertical: 15,
      marginLeft:10,
      marginRight:10
    }
  })