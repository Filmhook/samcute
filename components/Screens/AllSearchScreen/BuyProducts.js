import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const BuyProducts = ({ responseData }) => {
  const navigation = useNavigation();
  const [buyCartItems, setBuyCartItems] = useState([]);

  const addToCart = (productId) => {
    const selectedProduct = responseData.find((item) => item.marketPlaceId === productId);

    if (selectedProduct) {
      const existingCartItem = buyCartItems.find((item) => item.marketPlaceId === productId);

      if (existingCartItem) {
        const updatedCart = buyCartItems.map((item) =>
          item.marketPlaceId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setBuyCartItems(updatedCart);
      } else {
        setBuyCartItems([...buyCartItems, { ...selectedProduct, quantity: 1 }]);
      }
      console.log('Product added to cart with ID:', productId);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ddd' }}>
      <View style={{ flex: 1, backgroundColor: 'rgba(189, 186, 187, 0.8)', padding: responsiveWidth(3), borderRadius: responsiveWidth(5) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, width: responsiveWidth(85) }}>
          <Image source={{ uri: item.fileOutputWebModel[0].filePath }} style={{ width: 30, height: 30, marginRight: 10 }} />
          <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold', color: 'black' }}>{item.companyName}</Text>
        </View>
        <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold', color: 'black' }}>{item.productName}</Text>
        <Text style={{ fontSize: responsiveFontSize(1.9), lineHeight: responsiveHeight(3), color: 'black' }}>Description: {item.productDescription}{'\n'}Price: INR {item.cost}{'\n'}</Text>

        <TouchableOpacity onPress={() => addToCart(item.marketPlaceId)} style={{ borderRadius: responsiveWidth(3), width: responsiveWidth(25), height: responsiveHeight(4), backgroundColor: '#001adc', borderWidth: 1, justifyContent: 'center', margin: 5 }}>
          <Text style={{ color: 'white', alignSelf: 'center', fontSize: responsiveFontSize(1.9), fontWeight: '700' }}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      <View style={{ position: 'absolute', right: 20, top: 25 }}>
        {item.fileOutputWebModel && item.fileOutputWebModel[0] && (
          <Image
            source={{ uri: item.fileOutputWebModel[0].filePath }}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
          />
        )}
      </View>
    </View>
  );

  return (
    <FlatList
      data={responseData}
      renderItem={renderItem}
      keyExtractor={(item) => item.marketPlaceId.toString()}
      ListHeaderComponent={() => (
        <View style={{ borderTopWidth: 1, borderColor: '#ddd', padding: 10 }}>
          <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: 'bold', alignSelf: 'center', marginTop: 10, color: 'black' }}>
            Products For Sale
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('CartRental', { buyCartItems })} style={{ width: responsiveWidth(9), height: responsiveHeight(4), left: responsiveWidth(80), bottom: responsiveHeight(3.8), }}>
            <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/add-to-cart.png')} style={{ width: 32, height: 32 }} />
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default BuyProducts;