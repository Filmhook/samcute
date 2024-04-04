import { View, Text,ScrollView,StyleSheet ,Image, Button, TouchableOpacity} from 'react-native';
import React,{useState} from 'react';


import ImagePicker from 'react-native-image-crop-picker';
import Profilepic_edit_page from './ProfilePic';
import Coverpic_edit_page from './Cover_Pic_Edit';
import Personalinfo_edit from './PersonalInfo_Edit';
import Education_edit_page from './EducationEdit';
import Professionalinfo from './BioEdit';
import BodyMeasurementsEdit from './BodyMeasurementsEdit';


 

export default function ProfileEditPage() {

  
      // const edit_profile_pic=async()=>{
      //   await ImagePicker.openPicker({
      //    cropping:true
      //  }).then( image => {
      //    console.log(image.path)
      //    setProfilepic(image.path) 
      //  })
      // }
      
      // const edit_cover_pic=async()=>{
      //   await ImagePicker.openPicker({
      //     cropping:true
      //   }).then( image => {
      //     console.log(image.path)
      //     setCoverpic(image.path) 
      //   })
      // }

  return (
    
        <ScrollView style={style.container}>

             <View style={style.profile}>

                {/* PROFILE PICTURE SECTION */}

                  <Profilepic_edit_page />

               {/* COVER PICTURE SECTION */}

                   <Coverpic_edit_page />

          {/* BIOGRAPHY SECTION   */}

                  <Professionalinfo />

       {/*BODY MEASUREMENT SECTION */}     
                  <BodyMeasurementsEdit />

        {/* ------- PERSONALINFORMATION SECTION */}      
                   <Personalinfo_edit />  

        {/* -------EDUCATION SECTION */} 
                   <Education_edit_page />  
                   
        {/* --------------- */} 
              </View>

              <View style={{flexDirection:'row',justifyContent:'flex-end',paddingBottom:20}}>
                             <TouchableOpacity style={{width:60,height:30,borderWidth:1,right:30,justifyContent:'center',backgroundColor:'#000000',borderRadius:10}}>
                                  <Text style={{textAlign:'center',color:'#ffffff',fontSize:16,fontWeight:400}}>Close</Text>
                             </TouchableOpacity>

                             <TouchableOpacity style={{width:60,height:30,borderWidth:1,right:20,justifyContent:'center',backgroundColor:'#000000',borderRadius:10}}>
                                  <Text style={{textAlign:'center',color:'#ffffff',fontSize:16,fontWeight:400}}>Done</Text>
                             </TouchableOpacity>
                        </View>
       

        </ScrollView>
        
 
  )
}

const style = StyleSheet.create({
    container:{
      height:"auto",
      backgroundColor:"#F5F5F5"
    },
    profile:{
      height:"auto",
      marginTop:100,
      borderRadius: 20,
      marginBottom:50,
      borderWidth:3,
      borderColor:"steelblue",
      margin:10,
    }
  })