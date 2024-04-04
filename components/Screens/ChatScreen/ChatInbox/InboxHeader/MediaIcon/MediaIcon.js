import React,{useState} from 'react'
import { Image,StyleSheet,TouchableOpacity,Button,Text,View} from 'react-native'
import Modal from "react-native-modal";
import Iconmodalsroot from './IconModalsRoot';


export default function Mediaicon() {

  const [Visible, setVisible] = useState(false);

  const toggleModal = () => {
    setVisible(!Visible)
    console.log('clicked');
  };


  return (
    <>
        <TouchableOpacity onPress={toggleModal}>
            <Image source={require("../../../../../../components/Assets/Chats_Icon_And_Fonts/Chat_menu.png")} style={style.image}/>
       </TouchableOpacity>

         <Modal 
         isVisible={Visible}
         onBackdropPress={() => setVisible(false)}
         animationIn={"fadeInDown"}
         animationInTiming={600}
         animationOut={"fadeOutUp"}
         animationOutTiming={300}
         backdropTransitionInTiming={500}
         backdropTransitionOutTiming={0}
        >
             <View style={style.view}>
              <Iconmodalsroot />
           </View> 
         </Modal>
        {/* <Modal
          isVisible={Visible}
          onBackdropPress={() => setVisible(false)}
          animationIn={"fadeInDown"}
          animationInTiming={600}
          animationOut={"fadeOutUp"}
          animationOutTiming={300}
          backdropTransitionInTiming={500}
          backdropTransitionOutTiming={0}
        > 
           <View style={style.view}>
              <Iconmodalsroot />
           </View>   
        </Modal> */}


       {/* <Modal 
          isVisible={Visible}
          onBackdropPress={() => setVisible(false)}
          animationIn={"fadeInDown"}
          animationInTiming={600}
          animationOut={"fadeOutUp"}
          animationOutTiming={300}
          backdropTransitionInTiming={500}
          backdropTransitionOutTiming={0}
       >
        
        <View style={style.view}>
              <Iconmodalsroot />
        </View>
       </Modal> */}
    </>
  )
}

const style = StyleSheet.create({
    image:{
        height:55,
        width:55,
        marginLeft:60,
        marginTop:10,
        borderWidth:1,
        borderColor:"black",
        shadowOffset:{width:-2,height:40},
        borderRadius:13,
    },
    view:{
      width:250,
      height:250,
      borderRadius:30,
      borderWidth:1,
      borderColor:"black",
      backgroundColor:'transparent',
      top:-130,
      left:130,
      color:"white",
      opacity:0.7
    }
})