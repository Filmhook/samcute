import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MarketPlace from './MarketPlace';
import RentalProducts from './RentalProducts';
import BuyProducts from './BuyProducts';
import PostProdcuts from './PostProducts';
import CartRental from './CartRental';
import CheckOutBuy from './CheckOutBuy';
import CheckOutRental from './CheckOutRental';
import CartBuy from './cartBuy';
import IndustryScreen from './IndustryScreen';

const Stack = createNativeStackNavigator();
export default function MarketPalceRoot() {
    return (

        <Stack.Navigator>
          <Stack.Screen name="MarketPlace" component={MarketPlace} options={{headerShown:false}}/>
          <Stack.Screen name="RentalProducts" component={RentalProducts} options={{headerShown:false}}/>
          <Stack.Screen name="BuyProducts" component={BuyProducts} options={{headerShown:false}}/>
          <Stack.Screen name='PostProducts' component={PostProdcuts} options={{headerShown:false}}/>
          <Stack.Screen name='CartRental' component={CartRental} options={{headerShown:false}}/>
          <Stack.Screen name='CheckOutBuy' component={CheckOutBuy} options={{headerShown:false}}/>
          <Stack.Screen name='CheckOutRental' component={CheckOutRental} options={{headerShown:false}}/>
          <Stack.Screen name='CartBuy' component={CartBuy} options={{headerShown:true}}/>
          <Stack.Screen component={IndustryScreen} name="ScreenOne" options={{headerShown:false}} />

        </Stack.Navigator>

    );
  
}