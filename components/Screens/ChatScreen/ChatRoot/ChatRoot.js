import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import ChatuserRoot from "./ChatUserRoot";
import Chatinputscreen from "./InboxRoot";
import ProfileRoot from "../../UserProfileScreen/ProfileMain/ProfileRoot";


const Stack = createNativeStackNavigator();
//const {Navigator,Screen} = Stack



export default function ChatRoot(){
     return ( 
        <Stack.Navigator initialRouteName="chatuser"> 
           <Stack.Screen name="chatuser" component={ChatuserRoot} options={{headerShown:false}} />
           <Stack.Screen name="chatinbox" component={Chatinputscreen} options={{headerShown:false}}/>
           <Stack.Screen name="userprofile" component={ProfileRoot}  options={{headerShown:false}}/>
        </Stack.Navigator>
     )
}

// import { View, Text } from 'react-native'
// import React from 'react'
// import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'

// export default function ChatRoot() {
//   return (
//     <View>
//       <Text style={{fontSize:responsiveFontSize(5), justifyContent:'center', alignSelf:'center',top:responsiveHeight(30), color:'black'}}>Coming Soon</Text>
//     </View>
//   )
// }