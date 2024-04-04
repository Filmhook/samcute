import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ScrollView, Text } from 'react-native';
import { PersonalProvider } from './PersonalContext';
import PersonalScreen from './PersonalScreen';
import EditPersonalScreen from './EditPersonal';



const Stack = createStackNavigator();

export default function PersonalRoot() {
  return (
   <>
   
{/* <ProfileRoot/> */}
      <PersonalProvider>
        <Stack.Navigator>
       
          <Stack.Screen name="PersonalScreen" component={PersonalScreen}  options={{headerShown:false}}/>
          <Stack.Screen name="EditPersonalScreen" component={EditPersonalScreen}  options={{headerShown:false}} />
          
        </Stack.Navigator>
      </PersonalProvider>

 
      </>


     

 



   
  );
}