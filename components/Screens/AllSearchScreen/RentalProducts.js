import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const RentalProducts = ({ responseData, onProductSelect }) => {
  const navigation = useNavigation();
  const [rentalCartItems, setRentalCartItems] = useState([]);

  const addToCart = (productId) => {
    const selectedProduct = responseData.find((item) => item.marketPlaceId === productId);

    if (selectedProduct) {
      const existingCartItem = rentalCartItems.find((item) => item.marketPlaceId === productId);

      if (existingCartItem) {
        const updatedCart = rentalCartItems.map((item) =>
          item.marketPlaceId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setRentalCartItems(updatedCart);
      } else {
        setRentalCartItems([...rentalCartItems, { ...selectedProduct, quantity: 1 }]);
      }
      console.log('Product added to cart with ID:', productId);
    }
  };

  const renderItem = ({ item }) => (
    
    <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ddd' }}>
      <View style={{ flex: 1, backgroundColor: 'rgba(189, 186, 187, 0.8)', padding: responsiveWidth(3), borderRadius: responsiveWidth(5) }}>
        <View style={{justifyContent:"center",alignItems:"center"}}>
        <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold' , color:'black'}}>{item.companyName}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, width: responsiveWidth(85),marginTop:responsiveHeight(2) }}>
        
          <Image source={{  uri: item.fileOutputWebModel[0]?.filePath}} style={{ width: responsiveWidth(45), height: responsiveHeight(20), marginRight: 10 }} />
          <Text style={{ fontSize: responsiveFontSize(2.5), lineHeight: responsiveHeight(3), color: 'black',flexWrap:'wrap',width:"45%",}}>{item.productDescription}</Text>
        </View>
        <View style={{left:responsiveWidth(10),top:responsiveHeight(1)}}>
        <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold' ,color:'black' }}>{item.productName}</Text>
        </View>
        <Text style={{ fontSize: responsiveFontSize(1.9), lineHeight: responsiveHeight(3), color: 'black',left:responsiveWidth(8) }}> {'\n'}₹ {item.cost}{'\n'}</Text>
        <View style={{left:responsiveWidth(40),bottom:responsiveHeight(5)}}>
          
        </View>
        
        <View>
    <TouchableOpacity style={{justifyContent:"center",alignItems:"center",borderWidth:responsiveWidth(0.5),width:responsiveWidth(15),left:responsiveWidth(60),height:responsiveHeight(4),borderRadius:responsiveWidth(1.5),backgroundColor:"black"}}>
      <Text style={{color:"white",fontSize:responsiveFontSize(2)}}>Rental</Text>
    </TouchableOpacity>
        </View>

        {/* <TouchableOpacity onPress={() => addToCart(item.marketPlaceId)} style={{ borderRadius: responsiveWidth(3), width: responsiveWidth(25), height: responsiveHeight(4), backgroundColor: '#001adc', borderWidth: 1, justifyContent: 'center', margin: 5 }}>
          <Text style={{ color: 'white', alignSelf: 'center', fontSize: responsiveFontSize(1.9), fontWeight: '700' }}>Add to Cart</Text>
        </TouchableOpacity> */}
      </View>

     
    </View>
  );

  return (
    <FlatList
      data={responseData}
      renderItem={renderItem}
      keyExtractor={(item) => item.marketPlaceId.toString()}
      // ListHeaderComponent={() => (
        // <View style={{ borderTopWidth: 1, borderColor: '#ddd', padding: 10 }}>
        //   <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: 'bold', alignSelf: 'center', marginTop: 10, color: 'black' }}>
        //     Products For Rent
        //   </Text>
        //   <TouchableOpacity onPress={() => navigation.navigate('CartRental', { rentalCartItems })} style={{ width: responsiveWidth(9), height: responsiveHeight(4), left: responsiveWidth(80), bottom: responsiveHeight(3.8), }}>
        //     <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/add-to-cart.png')} style={{ width: 32, height: 32 }} />
        //   </TouchableOpacity>
        // </View>
      // )}
    />
  );
};

export default RentalProducts;