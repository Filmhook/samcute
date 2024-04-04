import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dummy from '../AllSearchScreen/ReadyToPage';
import HelpAndContent from './HelpAndContent';
import { NavigationContainer } from '@react-navigation/native';
import TopBar from '../NavigationScreen/TopBar';

const Stack = createNativeStackNavigator();

export default function TopbarRoot() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      
        <Stack.Screen name='HelpAndContent' component={HelpAndContent}></Stack.Screen>
        <Stack.Screen name='test' component={Dummy}></Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>

  )
}