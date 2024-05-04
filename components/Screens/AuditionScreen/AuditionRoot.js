
// import * as React from "react";

// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import FloatingButton from "./JobFormButton";
// import SearchBar from "./SearchBar";
// import Timeline from "./Feeds";
// import AccountsTeamScreen from "./AccountsTeam";
// import ScreenOne from "./SOne";
// import ScreenTwo from "./STwo";
// import ScreenThree from "./SThree";
// import { NavigationContainer } from "@react-navigation/native";


// const Stack = createNativeStackNavigator();

// export default function AuditionRoot() {
//   return (
//     <Stack.Navigator >
//       <Stack.Screen name="FloatingButton" component={FloatingButton} options={{headerShown: false}}/>
//       <Stack.Screen name="SearchBars" component={SearchBar} options={{headerShown: false}}/>
//       <Stack.Screen name="Timeline" component={Timeline} options={{headerShown: false}}/>
//       <Stack.Screen name="AccountsTeamScreen" component={AccountsTeamScreen} options={{headerShown:false}}/>
//       <Stack.Screen name="ScreenOne" component={ScreenOne} options={{ headerShown: false }} />
//       <Stack.Screen name="ScreenTwo" component={ScreenTwo} options={{ headerShown: false }}/>
//       <Stack.Screen name="ScreenThree" component={ScreenThree} options={{headerShown: false}}/>
//     </Stack.Navigator>

//   )
// }    

import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FloatingButton from "./JobFormButton";
import SearchBar from "./SearchBar";
import Timeline from "./Feeds";
import AccountsTeamScreen from "./AccountsTeam";
import ScreenOne from "./SOne";
import ScreenTwo from "./STwo";
import ScreenThree from "./SThree";
import { NavigationContainer } from "@react-navigation/native";


import SampleFeed from "./sampleFeed";
import Postview from "./Postview";


const Stack = createNativeStackNavigator();

export default function AuditionRoot() {
  return (
    <Stack.Navigator initialRouteName="SearchBars">
      <Stack.Screen name="FloatingButton" component={FloatingButton} options={{ headerShown: false }} />
      <Stack.Screen name="SearchBars" component={SearchBar} options={{ headerShown: false }} />
      <Stack.Screen name="Timeline" component={Timeline} options={{ headerShown: false }} />
      <Stack.Screen name="AccountsTeamScreen" component={AccountsTeamScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ScreenOne" component={ScreenOne} options={{ headerShown: false }} />
      <Stack.Screen name="ScreenTwo" component={ScreenTwo} options={{ headerShown: false }} />
      <Stack.Screen name="ScreenThree" component={ScreenThree} options={{ headerShown: false }} />
      <Stack.Screen name="Postview" component={Postview} options={{ headerShown: false }} />
      <Stack.Screen name="SampleFeed" component={SampleFeed} />
    </Stack.Navigator>

  )
}    