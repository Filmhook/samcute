import React,{useState} from 'react'
import { Image , TouchableOpacity,View,Text,Button,StyleSheet,TouchableWithoutFeedback} from 'react-native'
import Modal from 'react-native-modal'
import ProfileModalRoot from './profilemodalroot';

export default function Userprofile() {

    const [picvisible, setPicvisible] = useState(false);

    const ProfileModal = () => {
      setPicvisible(!picvisible)
      
    };
 
  return (
    <>
     <TouchableOpacity onPress={ProfileModal}>
        <Image source={require('../../../../../../components/Assets/Chats_Icon_And_Fonts/userprofile.png')} style={{width:45,height:45,marginLeft:10,marginTop:10}} />
     </TouchableOpacity>
  
    <Modal 
       isVisible={picvisible}
       onBackdropPress={() => setPicvisible(false)}
       backdropTransitionInTiming={500}
       backdropTransitionOutTiming={0}
       animationIn={"slideInLeft"}
       animationOut={"slideOutLeft"}
       backdropOpacity={0.70}
    > 
    <View style={style.View}>
          <ProfileModalRoot />
             {/* <TouchableWithoutFeedback onPress={ProfileModal}>
               <View style={style.arrowdiv}>
                 <Image source={require('../../../../../../components/Assets/Chats_Icon_And_Fonts/left_arrow.png')} style={style.arrowicon}/>
                 </View>
             </TouchableWithoutFeedback> */}
          </View>

    </Modal>
     {/* <Modal 
        isVisible={picvisible}
        //onBackdropPress={() => setPicvisible(false)}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={0}
        animationIn={"slideInLeft"}
        animationOut={"slideOutLeft"}
        backdropOpacity={0.70}
        >
          <View style={style.View}>
             <ProfileModalRoot />
             <TouchableWithoutFeedback onPress={ProfileModal}>
               <View style={style.arrowdiv}>
                 <Image source={require('../../../../../../components/Assets/Chats_Icon_And_Fonts/left_arrow.png')} style={style.arrowicon}/>
                 </View>
             </TouchableWithoutFeedback>
          </View>
        </Modal> */}
    </>
  )
}

  const style = StyleSheet.create({
    View:{
       height:600,
       width:300,
       marginTop:-100,
       borderRadius:30,
    },
    arrowdiv:{
       width:85,
       height:50,
       borderRadius:10,
       backgroundColor:"#3B3B3C",
       marginLeft:300,
       marginTop:-600
      //  borderWidth:1,
      //  borderBlockColor:"white"
    },
    arrowicon:{
      width:"60%",
      marginLeft:15,
    }
  })