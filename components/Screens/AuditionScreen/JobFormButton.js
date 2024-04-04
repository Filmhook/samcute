// import React from 'react';
// import { View, TouchableOpacity, Image, ScrollView, Text } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const FloatingButton = () => {
//   const navigation = useNavigation();


//   return (
//     <View > 
//     <TouchableOpacity
//       style={{
//         // bottom: 16,
//         // right: 16,
//         backgroundColor: 'blue',
//         borderRadius: 100,
//         width:60,
//         padding:15,
//         borderWidth:1,
//         top:500,  
//         left:330,
//         shadowColor: 'black', 
//         shadowOffset: { width: -2, height: 40 },
//         shadowOpacity: 0.4,
//         shadowRadius: 60,
//         elevation: 10,
//         borderWidth:4,
//         borderColor:'red',
//         position:'absolute'
//       }}
//       onPress={() => navigation.navigate("ScreenOne")}>
//       <Image
//         source={require('../../Assets/Audition_Icons_Fonts/write_icon_148501-removebg.png')}
//         style={{ width: 28, height: 28, tintColor: 'white', alignSelf:'center'}}
//       />
//     </TouchableOpacity>
//     </View>
//   );
// };

// export default FloatingButton;
//===============================================================
import React from 'react';
import { View, TouchableOpacity, Image, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FloatingButton = () => {
  const navigation = useNavigation();


  return (
    <View > 
    <TouchableOpacity
      style={{
        // bottom: 16,
        // right: 16,
        // backgroundColor:'#004242',
        backgroundColor:'red',
        borderRadius: 100,
        width:60,
        padding:15,
        borderWidth:1,
        top:500,  
        left:330,
        shadowColor: 'black', 
        shadowOffset: { width: -2, height: 40 },
        shadowOpacity: 0.4,
        shadowRadius: 60,
        elevation: 10,
        borderWidth:4,
        position:'absolute'
      }}
      onPress={() => navigation.navigate("ScreenOne")}>
      <Image
        source={require('../../Assets/Audition_Icons_Fonts/write_icon_148501-removebg.png')}
        style={{ width: 28, height: 28, tintColor: 'white', alignSelf:'center'}}
      />
    </TouchableOpacity>
    </View>
  );
};

export default FloatingButton;