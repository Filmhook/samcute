// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';
// import Modal from "react-native-modal"


// const TopBar = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [theme, setTheme] = useState(false);

//   const toggleSwitch = () => {
//     setTheme(!theme)
//   }

//   const handleOpenPopup = () => {
//     setIsVisible(true);
//   };

//   const handleClosePopup = () => {
//     setIsVisible(false);
//   };

//   const style = StyleSheet.create({
//     View: {
//       height: 600,
//       width: 300,
//       marginTop: -100,
//       borderRadius: 30,
//     },
//     arrowdiv: {
//       width: 85,
//       height: 50,
//       borderRadius: 10,
//       backgroundColor: "#3B3B3C",
//       marginLeft: 300,
//       marginTop: -600
//       //  borderWidth:1,
//       //  borderBlockColor:"white"
//     },
//     arrowicon: {
//       width: "60%",
//       marginLeft: 15,
//     },
//     topBar: {
//       backgroundColor: 'white',
//       height: responsiveHeight(7.5),
//     //  borderWidth: 2,
//       flexDirection: 'row'

//     },
//     container: {
//       flex: 1,
//     },
//     title: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       marginBottom: 20,
//     },
//     button: {
//       backgroundColor: 'blue',
//       padding: 10,
//       borderRadius: 5,
//       marginBottom: 20,
//     },
//     buttonText: {
//       color: 'white',
//       fontSize: 16,
//       fontWeight: 'bold',
//     },
//     modalBackground: {
//       flex: 1,
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderRadius: 10,
//     },
//     popupContainer: {
//       backgroundColor: 'white',
//       padding: 20,
//       borderRadius: 5,
//       alignItems: 'center',
//     },
//     popupTitle: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       marginBottom: 20,
//     },
//     closeButton: {
//       marginTop: 20,
//       padding: 10,
//       backgroundColor: 'blue',
//       borderRadius: 5,
//     },
//     closeButtonText: {
//       color: 'white',
//       fontSize: 16,
//       fontWeight: 'bold',
//     },
//     container: {
//       height: 250,
//       width: 280,
//       borderRadius: 20,
//       backgroundColor: "#3B3B3C",
//       bottom: 250,
//       left: 30
//     },
//     imgdiv: {
//       height: 200,
//       width: 190,
//       borderRadius: 20,
//       marginLeft: 45,
//       marginTop: 20,
//       backgroundColor: "white",
//     },
//     containerOne: {
//       height: 60,
//       width: 280,
//       borderRadius: 20,
//       marginTop: 40,
//       backgroundColor: "#3B3B3C",
//     },
//     containerTwo: {
//       height: 60,
//       width: 280,
//       borderRadius: 20,
//       marginTop: 10,
//       backgroundColor: "#3B3B3C",
//     },
//     containerThree: {
//       height: 60,
//       width: 280,
//       borderRadius: 20,
//       marginTop: 10,
//       backgroundColor: "#3B3B3C",
//     },
//     containerFour: {
//       height: 60,
//       width: 280,
//       borderRadius: 20,
//       marginTop: 10,
//       backgroundColor: "#3B3B3C",
//     },
//     containerFive: {
//       height: 60,
//       width: 280,
//       borderRadius: 20,
//       marginTop: 10,
//       backgroundColor: "#3B3B3C",
//     },
//     text: {
//       color: "white",
//       fontSize: 20,
//       marginLeft: 20,
//       marginTop: 20
//     },
//     containerSix: {
//       height: 60,
//       width: 280,
//       borderRadius: 20,
//       marginTop: 10,
//       backgroundColor: "#3B3B3C",
//     },
//     containerSeven: {
//       height: 60,
//       width: 280,
//       borderRadius: 20,
//       marginTop: 10,
//       backgroundColor: "#3B3B3C",
//     },
//   })

//   return (
//     //TopBar Style
//     <View style={style.topBar}>

//       {/* //Film_hook Logo */}

//       <View style={{ width: responsiveWidth(55), height: responsiveHeight(6), left: responsiveWidth(1), }}>
//         <Image source={require('../Assets/Chats_Icon_And_Fonts/Film_hook.png')} style={{ width: responsiveWidth(52), height: responsiveHeight(4.5), alignSelf: 'center', justifyContent: 'center', top: responsiveHeight(2) }} />
//       </View>

//       {/* Plus Icon */}

//       <View style={{ width: responsiveWidth(28), height: responsiveHeight(6), alignSelf: 'center',flexDirection:'row' ,columnGap:responsiveWidth(5),alignItems:'center',justifyContent:'center',left:responsiveWidth(15)}}>


//         <TouchableOpacity style={{ width: responsiveWidth(10), height: responsiveWidth(10), borderRadius: responsiveWidth(10), elevation: 10, backgroundColor: 'white', alignItems: 'center',  justifyContent: 'center',  }}>
//           <Image source={require('../Assets/UserProfile_Icons_Fonts/211694_bell_icon.png')} style={{ width: responsiveWidth(8), height: responsiveHeight(4), bottom: 1 }} />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleOpenPopup} style={{ width: responsiveWidth(10), height: responsiveWidth(10), borderRadius: responsiveWidth(10), elevation: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }}>
//           <Image source={require('../Assets/Home_Icon_And_Fonts/plus_icon.png')} style={{ width: responsiveWidth(8), height: responsiveHeight(4), }} />
//         </TouchableOpacity>
//         <Modal
//           visible={isVisible}
//           transparent={true}
//           animationType="fade"
//           onBackdropPress={() => setIsVisible(false)}
//           backdropTransitionInTiming={500}
//           backdropTransitionOutTiming={0}
//           animationIn={"slideInLeft"}
//           animationOut={"slideOutLeft"}
//           backdropOpacity={0.70}

//         >

//           <TouchableOpacity style={style.modalBackground} activeOpacity={1} onPress={handleClosePopup}>
//             <View style={style.container}>
//               <ProfileModalRoot />
//             </View>
//           </TouchableOpacity>

//         </Modal>



//       </View>
//     </View>
//   );
// };

// // bottom bar =======


// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
// import { NavigationContainer } from '@react-navigation/native';
// import ChatRoot from './ChatScreen/ChatRoot/ChatRoot';
// import SearchRoot from './AllSearchScreen/SearchRoot';
// import AuditionRoot from './AuditionScreen/AuditionRoot';
// import ProfileRoot from './UserProfileScreen/ProfileMain/ProfileRoot';
// import HomeRoot from './HomeScreen/HomeRoot';
// import ProfileModalRoot from './NavigationScreen/PlusModel';
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';




// // const tabBarIcon = ({source,focused}) =>(
// //      <View 
// //      style={{alignItems:'center',justifyContent:'center',padding:5}}
// //      >
// //         <Image style={{width:focused ? 35 : 30 , height:focused? 35 : 30 , borderRadius:focused ? 50 : 0 ,}} source={source} />
// //      </View>
// // )


// const Tab = createMaterialBottomTabNavigator();

// function BottomBar() {
//   return (

//     <Tab.Navigator initialRouteName='Home'
//       activeColor='blue'
//       inactiveColor='black'
//       barStyle={{ backgroundColor: 'white', height: responsiveHeight(8) }}
//       backBehavior='order '
//       style={{}}
//       tabBarOptions={{ showlabel: false }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeRoot}

//         options={{
//           tabBarLabel: false,
//           tabBarIcon: ({ focused }) => {
//             return (
//               <Image
//                 style={{ width: responsiveWidth(6), height: responsiveHeight(4), bottom: 1, alignSelf: 'center', }}
//                 source={
//                   require('../Assets/Home_Icon_And_Fonts/Home.png')
//                 }
//                 focused={focused}
//               />
//             );
//           },

//         }}
//       />
//       <Tab.Screen
//         name="Chat"
//         component={ChatRoot}
//         options={{
//           tabBarLabel: false,
//           tabBarIcon: ({ focused: boolean, color: string }) => {
//             return (
//               <Image
//                 style={{ width: responsiveWidth(7), height: responsiveHeight(4), bottom: 1, alignSelf: 'center', }}
//                 source={
//                   require('../Assets/Chats_Icon_And_Fonts/Filmhook_chat.png')
//                 }
//               />
//             );
//           },
//         }}
//       />
//       <Tab.Screen
//         name="Search"
//         component={SearchRoot}
//         options={{
//           tabBarLabel: false,
//           tabBarIcon: ({ focused: boolean, color: string }) => {
//             return (
//               <Image
//                 style={{ width: responsiveWidth(7), height: responsiveHeight(4), bottom: 1, alignSelf: 'center', }}
//                 source={
//                   require('../Assets/app_logo/all_search.png')
//                 }
//               />
//             );
//           },
//         }}
//       />
//       <Tab.Screen
//         name="Audition"
//         component={AuditionRoot}
//         options={{
//           tabBarLabel: false,
//           tabBarIcon: ({ focused: boolean, color: string }) => {
//             return (
//               <Image
//                 style={{ width: responsiveWidth(7), height: responsiveHeight(4), bottom: 1, alignSelf: 'center', }}
//                 source={
//                   require('../Assets/Audition_Icons_Fonts/Filmhook_Audition.png')
//                 }
//               />
//             );
//           },
//         }}
//       />

//       <Tab.Screen
//         name="User Profile"
//         component={ProfileRoot}
//         options={{
//           tabBarLabel: false,
//           tabBarIcon: ({ focused: boolean, color: string }) => {
//             return (
//               <Image
//                 style={{ width: 30, height: 30, bottom: 4, top: 0, alignSelf: 'center', padding: 5 }}
//                 source={
//                   require('../Assets/UserProfile_Icons_Fonts/Filmhook_UserProfile.png')
//                 }
//               />
//             );
//           },
//         }}
//       />
//     </Tab.Navigator>

//   )
// }


// // import {  Text , StyleSheet} from 'react-native'
// // import React from 'react'

// export default function Tabbar() {

//   const style = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff'
//     },
//     content: {
//       flex: 1
//     }
//   })

//   return (
//     <>
//       {/* <View style={style.container}> */}
//       <TopBar />
//       <View></View>
//       <BottomBar />
//       {/* </View> */}
//     </>
//   )
// }



import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import Modal from "react-native-modal"


const TopBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [theme, setTheme] = useState(false);

  const toggleSwitch = () => {
    setTheme(!theme)
  }

  const handleOpenPopup = () => {
    setIsVisible(true);
  };

  const handleClosePopup = () => {
    setIsVisible(false);
  };

  const style = StyleSheet.create({
    View: {
      height: 600,
      width: 300,
      marginTop: -100,
      borderRadius: 30,
    },
    arrowdiv: {
      width: 85,
      height: 50,
      borderRadius: 10,
      backgroundColor: "#3B3B3C",
      marginLeft: 300,
      marginTop: -600
      //  borderWidth:1,
      //  borderBlockColor:"white"
    },
    arrowicon: {
      width: "60%",
      marginLeft: 15,
    },
    topBar: {
      backgroundColor: 'white',
      height: responsiveHeight(7.8),
      flexDirection:'row',
      columnGap:responsiveWidth(14)
      //borderWidth:1

    },
    // container: {
    //   flex: 1,
    // },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      // justifyContent: 'center',
       alignItems: 'center',
      borderRadius: responsiveWidth(2),
      width:responsiveWidth(90)
    },
    popupContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 5,
      alignItems: 'center',
    },
    popupTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    closeButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: 'blue',
      borderRadius: 5,
    },
    closeButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    container: {
      height: responsiveHeight(90),
      width: 280,
      borderRadius: 3,
     // borderWidth:1,
     // backgroundColor: "#3B3B3C",
     // bottom: 250,
      left: 30
    },
    imgdiv: {
      height: 200,
      width: 190,
      borderRadius: 20,
      marginLeft: 45,
      marginTop: 20,
      backgroundColor: "white",
    },
    containerOne: {
      height: 60,
      width: 280,
      borderRadius: 20,
      marginTop: 40,
      backgroundColor: "#3B3B3C",
    },
    containerTwo: {
      height: 60,
      width: 280,
      borderRadius: 20,
      marginTop: 10,
      backgroundColor: "#3B3B3C",
    },
    containerThree: {
      height: 60,
      width: 280,
      borderRadius: 20,
      marginTop: 10,
      backgroundColor: "#3B3B3C",
    },
    containerFour: {
      height: 60,
      width: 280,
      borderRadius: 20,
      marginTop: 10,
      backgroundColor: "#3B3B3C",
    },
    containerFive: {
      height: 60,
      width: 280,
      borderRadius: 20,
      marginTop: 10,
      backgroundColor: "#3B3B3C",
    },
    text: {
      color: "white",
      fontSize: 20,
      marginLeft: 20,
      marginTop: 20
    },
    containerSix: {
      height: 60,
      width: 280,
      borderRadius: 20,
      marginTop: 10,
      backgroundColor: "#3B3B3C",
    },
    containerSeven: {
      height: 60,
      width: 280,
      borderRadius: 20,
      marginTop: 10,
      backgroundColor: "#3B3B3C",
    },
  })

  return (
    //TopBar Style
    <View style={style.topBar}>

      {/* //Film_hook Logo */}

      {/* <View style={{ width: responsiveWidth(60), height: responsiveHeight(5), top: responsiveHeight(1),left:responsiveWidth(1),}}>
        <Image source={require('../Assets/Chats_Icon_And_Fonts/Film_hook.png')} style={{ width: responsiveWidth(60), height: responsiveHeight(5), alignSelf: 'center', justifyContent: 'center',  }} resizeMode='stretch'/>
      </View> */}
       <View
        style={{
          height: responsiveHeight(7),
          width: responsiveWidth(60),
          marginBottom: responsiveHeight(3),
          flexDirection: 'row',
          position: 'relative',
          
        }}>
        <Image
          style={{
            height: responsiveHeight(6),
            width: responsiveWidth(16),
            alignSelf: 'center',
          }}
          source={require('../Assets/Login_page/FH_logos.png')}
          resizeMode="stretch"
        />

        <Image
          style={{
            height: responsiveHeight(5),
            width: responsiveWidth(48),
            position: 'absolute',
             left: responsiveWidth(12),
             top: responsiveHeight(1.8),
          }}
          source={require('../Assets/Login_page/Film_hook_name.png')}
          resizeMode="stretch"
        />
        
        <Text
          style={{
            color: 'blue',
            fontWeight: 'bold',
            position: 'absolute',
            left: responsiveWidth(42),
           top: responsiveHeight(5.8),
          }}>
          Public User
        </Text>
      </View>

      {/* Plus Icon */}

      <View style={{ width: responsiveWidth(25), height: responsiveHeight(7),flexDirection:'row',columnGap:responsiveWidth(5),  justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity style={{width: responsiveWidth(9), height: responsiveWidth(9), borderRadius: responsiveWidth(9), elevation: 10, backgroundColor: 'white', alignItems: 'center',justifyContent: 'center', }}>
          <Image source={require('../Assets/UserProfile_Icons_Fonts/211694_bell_icon.png')} style={{width: responsiveWidth(8), height: responsiveHeight(4),  }} resizeMode='stretch'/>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleOpenPopup} style={{ width: responsiveWidth(9), height: responsiveWidth(9), borderRadius: responsiveWidth(9), elevation: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
          <Image source={require('../Assets/Home_Icon_And_Fonts/plus_icon.png')} style={{ width: responsiveWidth(8), height: responsiveHeight(4), }} resizeMode='stretch'/>
        </TouchableOpacity>
        <Modal
          visible={isVisible}
          transparent={true}
          animationType="fade"
          onBackdropPress={() => setIsVisible(false)}
          backdropTransitionInTiming={500}
          backdropTransitionOutTiming={0}
          animationIn={"slideInLeft"}
          animationOut={"slideOutLeft"}
          backdropOpacity={0.70}

        >

          <TouchableOpacity style={style.modalBackground} activeOpacity={1} onPress={handleClosePopup}>
            <View style={style.container}>
              <ProfileModalRoot />
            </View>
          </TouchableOpacity>

        </Modal>

       

      </View>
    </View>
  );
};

// bottom bar =======


import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import ChatRoot from './ChatScreen/ChatRoot/ChatRoot';
import SearchRoot from './AllSearchScreen/SearchRoot';
import AuditionRoot from './AuditionScreen/AuditionRoot';
import ProfileRoot from './UserProfileScreen/ProfileMain/ProfileRoot';
import HomeRoot from './HomeScreen/HomeRoot';
import ProfileModalRoot from './NavigationScreen/PlusModel';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';




// const tabBarIcon = ({source,focused}) =>(
//      <View 
//      style={{alignItems:'center',justifyContent:'center',padding:5}}
//      >
//         <Image style={{width:focused ? 35 : 30 , height:focused? 35 : 30 , borderRadius:focused ? 50 : 0 ,}} source={source} />
//      </View>
// )


const Tab = createMaterialBottomTabNavigator();

function BottomBar() {
  return (

    <Tab.Navigator initialRouteName='Home'
      activeColor='blue'
      inactiveColor='black'
      barStyle={{ backgroundColor: 'white' ,height:responsiveHeight(8)}}
      backBehavior='order '
      style={{ }}
      tabBarOptions={{ showlabel: false }}
    >
      <Tab.Screen
        name="Home"
        component={HomeRoot}

        options={{
          tabBarLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{ width: responsiveWidth(8), height: responsiveHeight(5), bottom: 1, alignSelf: 'center',  }}
                source={
                  require('../Assets/Home_Icon_And_Fonts/Home.png')
                }
                focused={focused}
              />
            );
          },

        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatRoot}
        options={{
          tabBarLabel: false,
          tabBarIcon: ({ focused: boolean, color: string }) => {
            return (
              <Image
                style={{  width: responsiveWidth(8), height: responsiveHeight(5), bottom: 1, alignSelf: 'center',  }}
                source={
                  require('../Assets/Chats_Icon_And_Fonts/Filmhook_chat.png')
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
          tabBarLabel: false,
          tabBarIcon: ({ focused: boolean, color: string }) => {
            return (
              <Image
                style={{  width: responsiveWidth(8), height: responsiveHeight(5), bottom: 1, alignSelf: 'center',  }}
                source={
                  require('../Assets/app_logo/all_search.png')
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
          tabBarLabel: false,
          tabBarIcon: ({ focused: boolean, color: string }) => {
            return (
              <Image
                style={{  width: responsiveWidth(8), height: responsiveHeight(5), bottom: 1, alignSelf: 'center',  }}
                source={
                  require('../Assets/Audition_Icons_Fonts/Filmhook_Audition.png')
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
          tabBarLabel: false,
          tabBarIcon: ({ focused: boolean, color: string }) => {
            return (
              <Image
                style={{  width: responsiveWidth(8), height: responsiveHeight(5), bottom: 4, top: 0, alignSelf: 'center', padding: 5 }}
                source={
                  require('../Assets/UserProfile_Icons_Fonts/Filmhook_UserProfile.png')
                }
              />
            );
          },
        }}
      />
    </Tab.Navigator>

  )
}


// import {  Text , StyleSheet} from 'react-native'
// import React from 'react'

export default function Tabbar() {

  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    content: {
      flex: 1
    }
  })

  return (
    <>
      {/* <View style={style.container}> */}
      <TopBar />
      <View></View>
      <BottomBar />
      {/* </View> */}
    </>
  )
}
