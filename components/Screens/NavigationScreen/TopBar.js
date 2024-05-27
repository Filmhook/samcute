
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, styles, Switch } from 'react-native';
// import Modal from "react-native-modal"


// import ProfileModalRoot from './PlusModel';



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


//   return (

//     <View style={style.topBar}>



//       <View style={{ width: 200, height: 50, top: 6, left: 8, }}>
//         <Image source={require('../../Assets/Chats_Icon_And_Fonts/Film_hook.png')} style={{ width: 200, height: 35, bottom: 1, alignSelf: 'center', justifyContent: 'center', top: 7 }} />
//       </View>


//       <View style={{ width: 150, height: 50, left: 130, alignSelf: 'center', bottom: 45 }}>
//         <TouchableOpacity onPress={handleOpenPopup} style={{ width: 35, height: 35, borderRadius: 25, elevation: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', left: 100, top: 5 }}>
//           <Image source={require('../../Assets/Home_Icon_And_Fonts/Filmhook_Plus.png')} style={{ width: 30, height: 30, bottom: 1 }} />
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


//         <TouchableOpacity style={{ width: 35, height: 35, borderRadius: 25, elevation: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', left: 40, bottom: 30 }}>
//           <Image source={require('../../Assets/Home_Icon_And_Fonts/211694_bell_icon.png')} style={{ width: 30, height: 30, bottom: 1 }} />
//         </TouchableOpacity>

//       </View>
//     </View>
//   );
// };

// export default TopBar;

// const style = StyleSheet.create({
//   View: {
//     height: 600,
//     width: 300,
//     marginTop: -100,
//     borderRadius: 30,
//   },
//   arrowdiv: {
//     width: 85,
//     height: 50,
//     borderRadius: 10,
//     backgroundColor: "#3B3B3C",
//     marginLeft: 300,
//     marginTop: -600

//   },
//   arrowicon: {
//     width: "60%",
//     marginLeft: 15,
//   },
//   topBar: {
//     backgroundColor: 'white',
//     height: 60,

//   },
//   container: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//   },
//   popupContainer: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   popupTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   closeButton: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: 'blue',
//     borderRadius: 5,
//   },
//   closeButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   container: {
//     height: 250,
//     width: 280,
//     borderRadius: 20,
//     backgroundColor: "#3B3B3C",
//     bottom: 250,
//     left: 30
//   },
//   imgdiv: {
//     height: 200,
//     width: 190,
//     borderRadius: 20,
//     marginLeft: 45,
//     marginTop: 20,
//     backgroundColor: "white",
//   },
//   containerOne: {
//     height: 60,
//     width: 280,
//     borderRadius: 20,
//     marginTop: 40,
//     backgroundColor: "#3B3B3C",
//   },
//   containerTwo: {
//     height: 60,
//     width: 280,
//     borderRadius: 20,
//     marginTop: 10,
//     backgroundColor: "#3B3B3C",
//   },
//   containerThree: {
//     height: 60,
//     width: 280,
//     borderRadius: 20,
//     marginTop: 10,
//     backgroundColor: "#3B3B3C",
//   },
//   containerFour: {
//     height: 60,
//     width: 280,
//     borderRadius: 20,
//     marginTop: 10,
//     backgroundColor: "#3B3B3C",
//   },
//   containerFive: {
//     height: 60,
//     width: 280,
//     borderRadius: 20,
//     marginTop: 10,
//     backgroundColor: "#3B3B3C",
//   },
//   text: {
//     color: "white",
//     fontSize: 20,
//     marginLeft: 20,
//     marginTop: 20
//   },
//   containerSix: {
//     height: 60,
//     width: 280,
//     borderRadius: 20,
//     marginTop: 10,
//     backgroundColor: "#3B3B3C",
//   },
//   containerSeven: {
//     height: 60,
//     width: 280,
//     borderRadius: 20,
//     marginTop: 10,
//     backgroundColor: "#3B3B3C",
//   },
// })


//======================================
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, styles, Switch } from 'react-native';
import Modal from "react-native-modal"
import SettingsContent from './SettingsContent';
import { useNavigation } from '@react-navigation/native';
import ProfileModalRoot from './PlusModel';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

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


  return (
    //TopBar Style
    <View style={style.topBar}>

      {/* //Film_hook Logo */}

      <View style={{ width: responsiveWidth(50), height: responsiveHeight(7), top: responsiveHeight(1), left: responsiveWidth(2) }}>
        <Image source={require('../../Assets/Chats_Icon_And_Fonts/Film_hook.png')} style={{ width: responsiveWidth(50), height: responsiveHeight(4), alignSelf: 'center', justifyContent: 'center', top: responsiveHeight(1) }} />
      </View>

      {/* Plus Icon */}

      <View style={{ width: responsiveWidth(35), height: responsiveHeight(6), left: responsiveWidth(30), alignSelf: 'center', bottom: responsiveHeight(5) }}>
        <TouchableOpacity onPress={handleOpenPopup} style={{ width: responsiveWidth(10), height: responsiveWidth(10), borderRadius: responsiveWidth(10), elevation: responsiveWidth(2), backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', left: responsiveWidth(24), bottom: responsiveHeight(0.5) }}>
          <Image source={require('../../Assets/Home_Icon_And_Fonts/plus_icon.png')} style={{ width: responsiveWidth(6), height: responsiveHeight(3) }} />
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
        {/* modal Style */}
        {/* <Modal visible={isVisible} transparent={true} animationType="fade">
        <TouchableOpacity style={style.modalBackground} activeOpacity={1} onPress={handleClosePopup}>
 


        <View style={style.container}>
      <TouchableOpacity style={style.imgdiv}>
      </TouchableOpacity>
      <View style={style.containerOne}>
            <TouchableOpacity ><Text style={style.text}>Pinned Profile</Text></TouchableOpacity>
        </View>
        <View style={style.containerTwo}>
   <TouchableOpacity><Text  style={style.text}>Help & Support</Text></TouchableOpacity>
   </View>
   <View style={style.containerThree}>
   <TouchableOpacity ><Text style={style.text}>Blocked Profiles</Text></TouchableOpacity>
   </View>
   <View style={style.containerFour}>
   <TouchableOpacity><Text style={style.text}>Near To Me</Text></TouchableOpacity>
   </View>
   <View style={style.containerFive}>
   <Text style={style.text}>Dark mode</Text>

   <Switch  
    value={theme }
    onValueChange={toggleSwitch}
    style={{marginTop:-25}}
   />
   </View>
   <View style={style.containerSix}>
   <TouchableOpacity ><Text style={style.text}>Settings</Text></TouchableOpacity>
   </View>
   <View style={style.containerSeven}>
   <TouchableOpacity ><Text style={style.text}>Logout</Text></TouchableOpacity>
   </View>
    </View>  
        </TouchableOpacity>
      </Modal> */}


        <TouchableOpacity style={{ width: responsiveWidth(10), height: responsiveWidth(10), borderRadius: responsiveWidth(10), elevation: responsiveWidth(2), backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', left: responsiveWidth(6), bottom: responsiveHeight(5) }}>
          <Image source={require('../../Assets/Chats_Icon_And_Fonts/211694_bell_icon.png')} style={{ width: responsiveWidth(6), height: responsiveHeight(3) }} />
        </TouchableOpacity>

      </View>
    </View>
  );
};
export default TopBar;

const style = StyleSheet.create({



  topBar: {
    backgroundColor: 'white',
    height: responsiveHeight(8),


  }
})