import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {signOut} from "firebase/auth"
import { useNavigation } from "@react-navigation/native";

import { getAuth } from 'firebase/auth';
import app from "../../../firebaseConfig";

export default function Logout() {

    const navigation = useNavigation();

    const handle_logout= async()=>{
        const authInstance = getAuth(app)
        try{
            await signOut(authInstance);
          navigation.navigate("SignOutLogin")
            console.log("logout succes");
        }
       catch(err){
        console.log(err);
       }
    }
  return (
    <> 
      <TouchableOpacity 
       onPress={handle_logout}
       style={ 
        {
        width:100,
        height:40,
        borderWidth:2,
        borderColor:"blue",
        alignSelf:"center",
        marginTop:300,
        justifyContent:"center",
        backgroundColor:"black",
        borderRadius:5
      }}>
        <Text style={{textAlign:"center",color:"white",fontWeight:"bold"}}>
            Logout
        </Text>
      </TouchableOpacity>
    </>
  )
}