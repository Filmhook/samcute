import { View, Text, TextInput, TouchableHighlight, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import privateApi from "../../api/privateAPI"


import BuyProducts from './BuyProducts';
import RentalProducts from './RentalProducts';
import Cart from './CartRental';
import { getAuth } from 'firebase/auth';
import app from '../../../FirebaseConfig';

const MarketPlace = () => {
  const navigation = useNavigation();
  const [showRentalProducts, setShowRentalProducts] = useState(false);
  const [showBuyProducts, setShowBuyProducts] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [buyData, setBuyData] = useState([]);
  console.log('buyData', buyData)

  const handleFloatingButtonPress = () => {
    navigation.navigate('MarketPost');
    console.log('Navigating to MarketPost');
  };

  const handleRentalPress = () => {
    setShowRentalProducts(true);
    setShowBuyProducts(false);
  };

  const handleBuyPress = () => {
    setShowRentalProducts(false);
    setShowBuyProducts(true);
  };

  useEffect(() => {
    const fetchMarketplaceData = async () => {
      try {
        let url = '';
        if (showBuyProducts) {
          url = 'marketPlace/getMarketPlaceByRentalOrSale?RentalOrSale=true';
          const response = await privateApi.get(url);
          console.log('Fetched buy data:', response.data.body.data);
          setBuyData(response.data.body.data);
        } else {
          url = 'marketPlace/getMarketPlaceByRentalOrSale?RentalOrSale=false';
          const response = await privateApi.get(url);
          console.log('Fetched rental data:', response.data.body.data);
          setResponseData(response.data.body.data);
        }
      } catch (error) {
        console.log('Fetching marketplace data failed:', error);
        // Handle error
      }
    };

    fetchMarketplaceData();
  }, [showBuyProducts]);

  const handleProductSelect = (product) => {
    const existingProduct = selectedProducts.find((item) => item.productId === product.productId);

    if (existingProduct) {
      setSelectedProducts((prevProducts) =>
        prevProducts.map((item) =>
          item.productId === product.productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else if (product.productId && product.productName && product.price) {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };
  return (

    <View style={style.container}>
      <View style={style.buttonContainer}>
        {/* <ImageBackground  source={require('../../Assets/Login_page/Medium_B_User_Profile.png')}  resizeMode="stretch"></ImageBackground>  */}
        <TouchableOpacity style={{ borderRadius: responsiveWidth(3), width: responsiveWidth(25), height: responsiveHeight(5), backgroundColor: '#7e7d7c', borderWidth: 1, justifyContent: 'center', margin: 5 }} onPress={handleBuyPress}>
          <Text style={style.buttonText}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ borderRadius: responsiveWidth(3), width: responsiveWidth(25), height: responsiveHeight(5), backgroundColor: '#7e7d7c', borderWidth: 1, justifyContent: 'center', margin: 5 }} onPress={handleRentalPress}>
          <Text style={style.buttonText}>Rental</Text>
        </TouchableOpacity>


        <TouchableOpacity style={style.floatingButton} onPress={handleFloatingButtonPress}>
          <Image
            source={require('../../Assets/Audition_Icons_Fonts/write_icon_148501-removebg.png')}
            style={style.floatingButtonIcon}
          />
        </TouchableOpacity>

      </View>
      <View style={{ margin: 5, width: responsiveWidth(95), }}>
        {showRentalProducts ? (
          <RentalProducts
            onProductSelect={handleProductSelect}
            responseData={responseData}

          />
        ) : (
          <BuyProducts
            onProductSelect={handleProductSelect}
            responseData={buyData}

          />
        )}
      </View>

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
    columnGap: responsiveWidth(15),
    alignSelf: 'center',
    padding: responsiveWidth(2)
  },
  buttonText: {
    color: 'black',
    alignSelf: 'center',
    fontWeight: '800',
    fontSize: responsiveFontSize(2)
  },
  floatingButton: {
    position: 'absolute',
    //right: 0,
    backgroundColor: '#656ce6',
    borderRadius: responsiveWidth(15),
    height: responsiveWidth(15),
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


export default MarketPlace;