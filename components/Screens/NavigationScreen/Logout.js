import React, { useState } from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import Modal from 'react-native-modal'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default function Logout() { 

  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

        const handle_logout=()=>{
              console.log('clicked');

               // Close the modal after logging out
              setModalVisible(true);
        }

        const handleConfirmLogout = async() => {
         
           try{
             navigation.navigate("Login")
             console.log("logout success");
           }catch(err){
              console.log('Error in logout:',err);
             }
      
          // Close the modal after logging out
          setModalVisible(true);
        };

        const handleCancelLogout = () => {
          setModalVisible(false);
        };
  return (
    <>  
    <TouchableOpacity style={style.containerSeven} onPress={handle_logout}>
      <Text style={style.text}>Logout</Text>
      </TouchableOpacity>


      
  {/* ============================== */}

<Modal isVisible={isModalVisible}>
<View style={style.modalContainer}>
  <Text style={style.modalText}>Are you sure you want to logout?</Text>
  <View style={style.modalButtonsContainer}>
    <TouchableOpacity onPress={handleConfirmLogout} style={style.modalButton}>
      <Text style={style.modalButtonText}>Yes</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleCancelLogout} style={style.modalButton}>
      <Text style={style.modalButtonText}>Cancel</Text>
    </TouchableOpacity>
  </View>
</View>
</Modal>

  {/* ============================== */}
    </>
  )
}

const style = StyleSheet.create({
    containerSeven:{
      height:responsiveHeight(7),
      width:responsiveWidth(65),
      borderRadius:responsiveWidth(4),
      marginTop:responsiveHeight(2),
      backgroundColor:"#3B3B3C",
      justifyContent:'center',
      alignItems:'center',
      borderWidth:1,
      borderColor:'white',
    },
    text:{
      color:"white",
      fontSize:responsiveFontSize(2.5),
      left:responsiveWidth(2)
    },
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
    },
    modalText: {
      fontSize: 15,
      fontWeight:'bold',
      textAlign:'center',
      marginBottom: 20,
    },
    modalButtonsContainer: {
      flexDirection: 'row',
      justifyContent:'space-around'
    },
    modalButton: {
      padding: 5,
      width:70,
      borderRadius: 5,
      backgroundColor: '#3B3B3C',
      alignItems:'center'
    },
    modalButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
})