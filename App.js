import { View, Text, SafeAreaView, StyleSheet,useColorScheme } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Appnavigator from './components/Screens/appnavigator';
import Industry_S_One from './components/Screens/UsersLogState/SignUp/I_S_One';












export default function App() {
 
  return (
    <View style={styles.container}>
      
    
       <Appnavigator/>
       
       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
  lightModeContainer: {
    backgroundColor: 'white',
  },
  darkModeContainer: {
    backgroundColor: 'black',
  },
  lightModeText: {
    color: 'black',
  },
  darkModeText: {
    color: 'white',
  },
 
});

// App.js




// //App.js
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { BiographyProvider } from './components/BiographyContext'; 
// import BiographyScreen from './components/BiographyScreen';
// import EditBiographyScreen from './components/EditBiographyScreen';


// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <BiographyProvider>
//         <Stack.Navigator>
//           <Stack.Screen name="Biography" component={BiographyScreen} />
//           <Stack.Screen name="EditBiography" component={EditBiographyScreen} />
//         </Stack.Navigator>
//       </BiographyProvider>
//     </NavigationContainer>
//   );
// }



//===========================================================

// import React, { useState } from 'react';

// import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
// import SignUpOne from './components/Screens/UsersLogState/SignUp/G_S_One';

// import HomeRoot from './components/Screens/HomeScreen/HomeRoot';
// import WelcomeScreen from './components/Screens/UsersLogState/Welcome_Page/Welcome_Page';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// //import { NavigationContainer,  } from '@react-navigation/native';
// import SignUpTwo from './components/Screens/UsersLogState/SignUp/G_S_Two';
// import SignUpThree from './components/Screens/UsersLogState/SignUp/G_S_Three';
// import Industry_Ack from './components/Screens/UsersLogState/SignUp/Acknowledgement';
// import Industry_S_One from './components/Screens/UsersLogState/SignUp/I_S_One';
// import Industry_S_Two from './components/Screens/UsersLogState/SignUp/I_S_Two';
// import Industry_S_Three from './components/Screens/UsersLogState/SignUp/I_S_Three';
// import Industry_S_Four from './components/Screens/UsersLogState/SignUp/I_S_Four';
// import Industry_S_Five from './components/Screens/UsersLogState/SignUp/I_S_Five';
// import SignUpRoot from './components/Screens/UsersLogState/SignUp/signUpRoot';
// import Login from './components/Screens/UsersLogState/SignIn/Login';
// import BottomBar from './components/Screens/NavigationScreen/BottomBar';
// import chatRoot from './components/Screens/ChatScreen/chatRoot';
// import { NavigationContainer, useNavigation } from '@react-navigation/native';



// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isFirstTimeUser, setIsFirstTimeUser] = useState(true); // Assume true for first-time user

//   // Mock sign in/out functions:
//   const handleSignIn = () => setIsLoggedIn(true);
//   const handleSignOut = () => setIsLoggedIn(false);
//  // const navigation=useNavigation();
//  const Stack = createNativeStackNavigator();
//   return (

//     //  initialRouteName={
//     //   isFirstTimeUser ? 'Welcome' : isLoggedIn ? 'Home' : 'SignIn'
//     // }

//     <NavigationContainer>
//       <Stack.Navigator
        
//       >
//         <Stack.Screen
//           name="Welcome"
//           component={WelcomeScreen}
//           options={{ headerShown: false }} // Hide header for Welcome screen
//         />
//         <Stack.Screen name="Login" component={Login} />
        
//         <Stack.Screen name="SignIn" component={chatRoot} />
//         <Stack.Screen
//           name="BottomBar"
//           component={BottomBar}
        
//         />
       
//       </Stack.Navigator>
      
// </NavigationContainer>
     
 
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

// export default App;
