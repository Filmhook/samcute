import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TopBar from "./TopBar";
import SettingsContent from "./SettingsContent";
import Settings from "./Settings";  
import Dummy from "./Dummy";
import ProfileModalRoot from "./PlusModel";
import FilmhookHeader from "./TopBar";


const Stack = createNativeStackNavigator();

export default function PlusAuditionRoot() {
  return (



    
    <Stack.Navigator>

<Stack.Screen name='TopBar' component={FilmhookHeader} options={{headerShown:false}}/>
<Stack.Screen name="dummy" component={Dummy} options={{headerShown:false}} />

        {/* <Stack.Screen name="dummy" component={Dummy} options={{headerShown:false}} /> */}

        {/* <Stack.Screen name='ProfileModalRoot' component={ProfileModalRoot} options={{headerShown:false}}/> */}
       
        {/* <Stack.Screen name='SettingsContent' component={SettingsContent} options={{headerShown:false}}/>
        <Stack.Screen name='Settings' component={Settings} options={{headerShown:false}}/> */}
    </Stack.Navigator>

  )
}    