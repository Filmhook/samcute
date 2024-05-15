import { View, Text, TextInput, TouchableHighlight, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import BuyProducts from './BuyProducts';
import RentalProducts from './RentalProducts';
import Cart from './CartRental';
import { getAuth } from 'firebase/auth';
import app from '../../../FirebaseConfig';

export default function MarketPlace() {
  const navigation = useNavigation();
  const [showRentalProducts, setShowRentalProducts] = useState(false);
  console.log(showRentalProducts)
  const [showBuyProducts, setShowBuyProducts] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const auth = getAuth(app);
  const user = auth.currentUser;

  const handleFloatingButtonPress = () => {
    navigation.navigate('PostProducts');
  };
  const handleRentalPress = () => {
    setShowRentalProducts(true);
    setShowBuyProducts(false);
  };

  const handleBuyPress = () => {
    setShowRentalProducts(false);
    setShowBuyProducts(true);
  };
  // const handleCart = () =>{
  //   navigation.navigate('Cart',{selectedProducts,})
  // }
  const handleProductSelect = (product) => {
    const existingProduct = selectedProducts.find((item) => item.productId === product.productId);

    if (existingProduct) {
      setSelectedProducts((prevProducts) =>
        prevProducts.map((item) =>
          item.productId === product.productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else if (product.productId && product.productName && product.price) {
      // Ensure the selected item has required properties before adding to the cart
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1, userId: user.uid }]);
    }
  }

  console.log(selectedProducts);

  // const handleProductSelect = (product) => {
  //   const existingProduct = selectedProducts.find((item) => item.productId === product.productId);

  //   if (existingProduct) {

  //     setSelectedProducts((prevProducts) =>
  //       prevProducts.map((item) =>
  //         item.productId === product.productId ? { ...item, quantity: item.quantity + 1 } : item
  //       )
  //     );
  //   } else {

  //     setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
  //   }
  // };
  console.log('Render State:', showBuyProducts, showRentalProducts)
  return (

    <View style={style.container}>
      <View style={style.buttonContainer}>
      {/* <ImageBackground  source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}  resizeMode="stretch"></ImageBackground>  */}
       <TouchableOpacity style={{  borderRadius: responsiveWidth(3), width: responsiveWidth(25), height: responsiveHeight(5), backgroundColor: '#7e7d7c', borderWidth: 1, justifyContent: 'center', margin: 5 }} onPress={handleBuyPress}>
          <Text style={style.buttonText}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ borderRadius: responsiveWidth(3), width: responsiveWidth(25), height: responsiveHeight(5), backgroundColor: '#7e7d7c', borderWidth: 1, justifyContent: 'center', margin: 5 }} onPress={handleRentalPress}>
          <Text style={style.buttonText}>Rental</Text>
        </TouchableOpacity>
       
        {/* <TouchableOpacity onPress={handleCart}>
            <Image source={require('../../Assets/AllSearch_Icons_&_Fonts/add-to-cart.png')} style={{width:32,height:32, left:60,top:8}}/>
        </TouchableOpacity> */}
        <TouchableOpacity style={style.floatingButton} onPress={handleFloatingButtonPress}>
          <Image
            source={require('../../Assets/Audition_Icons_Fonts/write_icon_148501-removebg.png')}
            style={style.floatingButtonIcon}
          />
        </TouchableOpacity>

      </View>
      <View style={{ margin: 5, width: responsiveWidth(95),  }}>
        {showRentalProducts ? (
          <RentalProducts
            onProductSelect={handleProductSelect}
          // onProductSelect={(product) => {
          //   setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
          // }}
          />
        ) : (
          <BuyProducts
            onProductSelect={handleProductSelect}
          // onProductSelect={(product) => {

          //   setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
          // }}
          />
        )}
      </View>
      {/* {selectedProducts.length > 0 && (
        <Cart
        key="productId"
        cartItems={selectedProducts}
        increaseQuantity={(productId) => {
          // Handle increasing quantity for the selected product
          setSelectedProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.productId === productId ? { ...product, quantity: product.quantity + 1 } : product
            )
          );
        }}
        decreaseQuantity={(productId) => {
          // Handle decreasing quantity for the selected product
          setSelectedProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.productId === productId && product.quantity > 1
                ? { ...product, quantity: product.quantity - 1 }
                : product
            )
          );
        }}
        removeFromCart={(productId) => {
          // Handle removing product from the cart
          setSelectedProducts((prevProducts) =>
            prevProducts.filter((product) => product.productId !== productId)
          );
        }}
      />
      )} */}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative'
  },
  buttonContainer: {
    flexDirection: 'row',
    columnGap:responsiveWidth(15),
    alignSelf: 'center',
    padding:responsiveWidth(2)
  },
  buttonText: {
    color: 'black',
    alignSelf: 'center',
    fontWeight: '800',
    fontSize:responsiveFontSize(2)
  },
  floatingButton: {
    position: 'absolute',
    //right: 0,
    backgroundColor: '#656ce6',
    borderRadius: responsiveWidth(15),
    height:responsiveWidth(15),
    padding: responsiveWidth(2.5),
    width: responsiveWidth(15),
   
    elevation: 10,
    left: responsiveWidth(68),
    top: responsiveHeight(70),
    zIndex: 1,
  },
  floatingButtonIcon: {
    width: responsiveWidth(8),
    height: responsiveHeight(4.5),
   // tintColor: 'white',
    alignSelf: 'center',
  },
})