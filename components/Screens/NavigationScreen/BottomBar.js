
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import React from 'react';
// import HomeRoot from '../HomeScreen/HomeRoot';
// import ChatRoot from '../ChatScreen/ChatRoot';
// import SearchRoot from '../AllSearchScreen/SearchRoot';
// import AuditionRoot from '../AuditionScreen/AuditionRoot';
// import ProfileRoot from '../UserProfileScreen/ProfileRoot';



// const Tab = createMaterialBottomTabNavigator();
// const BottomBar = () => {
//   return (
//     <NavigationContainer>
//         <Tab.Navigator  initialRouteName="Home"
//             activeColor="#f0edf6"
//             inactiveColor="#3e2465"
//             barStyle={{ backgroundColor: '#694fad' }}>
//             <Tab.Screen name='Home' component={HomeRoot}/>
//             <Tab.Screen name='Chat' component={ChatRoot}/>
//             <Tab.Screen name='Search' component={SearchRoot}/>
//             <Tab.Screen name='Audition' component={AuditionRoot}/>
//             <Tab.Screen name='Profile' component={ProfileRoot}/>
//         </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default BottomBar;
//=====================================================last ================

// import { View, Text } from 'react-native'
// import React from 'react'
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
// import { NavigationContainer } from '@react-navigation/native';


// import { Icon } from 'react-native-paper';
// import HomeRoot from '../HomeScreen/HomeRoot';
// // import ChatRoot from '../ChatScreen/ChatRoot/ChatRoot';
// import SearchRoot from '../AllSearchScreen/SearchRoot';
// import AuditionRoot from '../AuditionScreen/AuditionRoot';
// import ProfileRoot from '../UserProfileScreen/ProfileMain/ProfileRoot';
// import { responsiveHeight } from 'react-native-responsive-dimensions';
// import chatRoot from '../ChatScreen/chatRoot';
// import SignUpRoot from '../UsersLogState/SignUp/signUpRoot';




// const Tab = createMaterialBottomTabNavigator();
// export default function BottomBar() {
//   return (
//     <NavigationContainer>
//         <Tab.Navigator initialRouteName='Home'
//         activeColor='blue'
//         inactiveColor='black' barStyle={{ height: 70}}
//         >
//             <Tab.Screen name='Home' component={HomeRoot} options={{
//                 tabBarIcon:({color}) => (
//                     <Icon name='home' size={24} color={color}/>
//                 )
//             }}/>
//             <Tab.Screen name='Chat' component={SignUpRoot}/>
//             <Tab.Screen name='Search' component={SearchRoot}/>
//             <Tab.Screen name='Audition' component={AuditionRoot}/>
//             <Tab.Screen name='Profile' component={ProfileRoot}/>
//         </Tab.Navigator>
//     </NavigationContainer>
//   )
// }
//==================================================
import { View, Text, Image, Animated } from 'react-native'
import React, { useState } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-paper';
import ProfileRoot from '../UserProfileScreen/ProfileMain/ProfileRoot';
import AuditionRoot from '../AuditionScreen/AuditionRoot';
import HomeRoot from '../HomeScreen/HomeRoot';
//import ChatRoot from '../ChatScreen/ChatRoot';
import SearchRoot from '../AllSearchScreen/SearchRoot';

import SignUpRoot from '../UsersLogState/SignUp/signUpRoot';
import ChatRoot from '../ChatScreen/ChatRoot/ChatRoot';




const Tab = createMaterialBottomTabNavigator();
export default function BottomBar() {
  return (
    <NavigationContainer>
        <Tab.Navigator initialRouteName='Home'
        activeColor='blue'
        inactiveColor='black'
        barStyle={{ backgroundColor: 'white'}}
        backBehavior='order '
        style={{top:10}}
        >
             <Tab.Screen
          name="Home"
          component={HomeRoot}
          options={{
            // tabBarLabel:false,
            tabBarIcon: ({ focused: boolean, color: string }) => {
              return (
                <Image
                  style={{ width:30,height:30,bottom:4,top:0,alignSelf:'center', padding:5 }}
                  source={
                  require('../../Assets/Home_Icon_And_Fonts/Home.png')
                  }
                />
              );
            },
          }}
        />  
            <Tab.Screen
          name="Chat"
          component={SignUpRoot}
          options={{
            // tabBarLabel:false,
            tabBarIcon: ({ focused: boolean, color: string }) => {
              return (
                <Image
                  style={{ width:30,height:30,bottom:4,top:0,alignSelf:'center', padding:5 }}
                  source={
                  require('../../Assets/Chats_Icon_And_Fonts/Filmhook_chat.png')
                  }
                />
              );
            },
          }}
        />  
             <Tab.Screen
          name="Search"
          component={SearchRoot}
          options={{
            // tabBarLabel:false,
            tabBarIcon: ({ focused: boolean, color: string }) => {
              return (
                <Image
                  style={{ width:30,height:30,bottom:4,top:0,alignSelf:'center', padding:5 }}
                  source={
                  require('../../Assets/Audition_Icons_Fonts/Search_icon.png')
                  }
                />
              );
            },
          }}
        />  
             <Tab.Screen
          name="Audition"
          component={AuditionRoot}
          options={{
            // tabBarLabel:false,
            tabBarIcon: ({ focused: boolean, color: string }) => {
              return (
                <Image
                  style={{ width:30,height:30,bottom:4,top:0,alignSelf:'center', padding:5 }}
                  source={
                  require('../../Assets/Audition_Icons_Fonts/Filmhook_Audition.png')
                  }
                />
              );
            },
          }}
        />  
           
           <Tab.Screen
          name="User Profile"
          component={ProfileRoot}
          options={{
            // tabBarLabel:false,
            tabBarIcon: ({ focused: boolean, color: string }) => {
              return (
                <Image
                  style={{ width:30,height:30,bottom:4,top:0,alignSelf:'center', padding:5 }}
                  source={
                  require('../../Assets/Userprofile_And_Fonts/Filmhook_UserProfile.png')
                  }
                />
              );
            },
          }}
        />  
        </Tab.Navigator>

    </NavigationContainer>
  )
}