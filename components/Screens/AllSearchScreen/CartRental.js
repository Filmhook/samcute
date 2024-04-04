import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

const CartRental = ({ route, navigation }) => {
  const { cartRentalItems } = route.params;

  const [items, setItems] = useState(cartRentalItems || []);

  const increaseQuantity = (productId) => {
    const updatedItems = items.map((item) => {
      if (item && item.id === productId) {
        const newQuantity = parseInt(item.quantity, 10) + 1 || 1;
        const newPrice = parseFloat(item.data.Price) * newQuantity || 0;
  
        const updatedItem = {
          ...item,
          quantity: newQuantity.toString(),
          totalPrice: newPrice.toFixed(2),
        };
        
        // Update the cart items in AsyncStorage
        const updatedCartRentalItems = items.map((cartItem) => (cartItem.id === productId ? updatedItem : cartItem));
        AsyncStorage.setItem('cartRentalItems', JSON.stringify(updatedCartRentalItems))
          .then(() => setItems(updatedCartRentalItems))
          .catch((error) => console.error('Error updating cart items: ', error));
  
        return updatedItem;
      }
      return item;
    });
  
    setItems(updatedItems);
  };
  
  const decreaseQuantity = (productId) => {
    let updatedItems = items.map((item) => {
      if (item && item.id === productId) {
        const newQuantity = parseInt(item.quantity, 10) - 1 || 0;
        const newPrice = parseFloat(item.data.Price) * newQuantity || 0;
        if (newQuantity === 0) {
          // Remove item from the cart if quantity becomes zero
          return null;
        }
        const updatedItem = {
          ...item,
          quantity: newQuantity.toString(),
          totalPrice: newPrice.toFixed(2),
        };
        // Update the cart items in AsyncStorage
        const updatedCartRentalItems = items.map((cartItem) => (cartItem.id === productId ? updatedItem : cartItem));
        AsyncStorage.setItem('cartRentalItems', JSON.stringify(updatedCartRentalItems))
          .then(() => setItems(updatedCartRentalItems))
          .catch((error) => console.error('Error updating cart items: ', error));
  
        return updatedItem;
      }
      return item;
    });
    updatedItems = updatedItems.filter((item) => item !== null);
    setItems(updatedItems);
  };
  const checkout = () => {
    const totalRentalCost = items.reduce(
      (total, item) => total + parseFloat(item.data.Price) * parseInt(item.quantity, 10),
      0
    );

    // Clear the cart in AsyncStorage and reset the state
    AsyncStorage.removeItem('cartRentalItems')
      .then(() => {
        setItems([]); // Clear the cart items in the state
        navigation.navigate('CheckOutRental', { cartRentalItems: items, totalRentalCost }); // Navigate to Checkout screen
      })
      .catch((error) => console.error('Error clearing cart:', error));
  };
  useFocusEffect(
    React.useCallback(() => {
      const updatecartRentalItems = async () => {
        try {
          const storedcartRentalItems = await AsyncStorage.getItem('cartRentalItems');
          if (storedcartRentalItems !== null) {
            setItems(JSON.parse(storedcartRentalItems));
          }
        } catch (error) {
          console.error('Error retrieving cart items: ', error);
        }
      };
      updatecartRentalItems();
    }, [])
  );

  const renderCartItem = ({ item }) => {
    if (!item || !item.data) {
      return null; // Handle cases where item or item.data might be null
    }
  
    return (
      <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ddd' }}>
      {/* Product Details */}
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
          <Image source={{ uri: item.data.CompanyLogo }} style={{ width: 30, height: 30, marginRight: 10 }} />
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.data.Company_Name}</Text>
        </View>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.data.Product_Name}</Text>
        <Text>Condition: {item.data.ProductCondition}</Text>
        <Text>{item.data.Product_Description}</Text>
        <Text>Price per Day: INR {item.data.Price}</Text>
        {/* Quantity and Total Price */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20,}}>
          <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
            <Text style={{ paddingHorizontal: 10, color: 'blue' }}>-</Text>
          </TouchableOpacity>
          <Text>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
            <Text style={{ paddingHorizontal: 10, color: 'blue' }}>+</Text>
          </TouchableOpacity>
          <View style={{flexDirection:'column'}}>
          <Text>{`Total Price: ${item.totalPrice}`}</Text>
          <Text>{`Total Quantity: ${item.quantity}`}</Text>
          </View>
        </View>
      </View>
  
      {/* Product Image */}
      <View style={{ bottom:0,right:50,top:20 }}>
        {item.data.ProductImage && (
          <Image
            source={{ uri: item.data.ProductImage }}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
          />
        )}
      </View>
      </View>
    );
  };
  
  return (
    <>
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center', marginTop: 10 }}>Cart Items</Text>
        <FlatList
  data={items}
  renderItem={renderCartItem}
  keyExtractor={(item, index) => index.toString()} // Use index as a key if items don't have unique IDs
/>
      </View>
      <View>
        <TouchableOpacity onPress={checkout}style={{marginTop:10,alignSelf:'center'}}>
          <Text>Checkout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CartRental;
