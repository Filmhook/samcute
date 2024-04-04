import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image , ScrollView} from 'react-native';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import app from '../../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


const BuyProducts = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [BuycartItems, setBuyCartItems] = useState([]);

  useEffect(() => {
    // Fetch rental products from Firestore
    const fetchProducts = async () => {
      const firestore = getFirestore(app);
      const productsCollection = collection(firestore, 'Product-Post');
      const snapshot = await getDocs(productsCollection);
      const productsData = [];
      
      snapshot.forEach((doc) => {
        // Assuming 'Type' field denotes rental products
        if (doc.data().Type === '2') {
          productsData.push({
            id: doc.id,
            data: doc.data(),
          });
        }
      });
  
      setProducts(productsData);
    };
  
    fetchProducts();
  }, []);

  const addToCart = (productId) => {
    // Find the selected product from products
    const selectedProduct = products.find((item) => item.id === productId);
  
    if (selectedProduct) {
      // Check if the item is already in the cart
      const existingCartItem = BuycartItems.find((item) => item.id === productId);
      
      if (existingCartItem) {
        // Increase quantity by 1 if the item is already in the cart
        const updatedCart = BuycartItems.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setBuyCartItems(updatedCart);
      } else {
        // Add the selected product to the cartItems state with default quantity 1
        setBuyCartItems([...BuycartItems, { ...selectedProduct, quantity: 1 }]);
      }
      console.log('Product added to cart with ID:', productId);
    }
  };
  
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ddd' }}>
      {/* Product Details */}
      <View style={{ flex: 1 ,backgroundColor:'rgba(189, 186, 187, 0.8)',padding:responsiveWidth(3),borderRadius:responsiveWidth(5) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5,width:responsiveWidth(85) }}>
          <Image source={{ uri: item.data.CompanyLogo }} style={{ width: 30, height: 30, marginRight: 10 }} />
          <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>{item.data.Company_Name}</Text>
        </View>
        <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>{item.data.Product_Name}</Text>
        <Text style={{fontSize:responsiveFontSize(1.9),lineHeight:responsiveHeight(3)}}>Condition: {item.data.ProductCondition}{'\n'}{item.data.Product_Description}{'\n'}Price per Day: INR {item.data.Price}{'\n'}</Text>
        
        <TouchableOpacity onPress={() => addToCart(item.id)} style={{borderRadius: responsiveWidth(3), width: responsiveWidth(25), height: responsiveHeight(4), backgroundColor: '#001adc', borderWidth: 1, justifyContent: 'center', margin: 5 }}>
          <Text style={{ color: 'white', alignSelf: 'center',fontSize:responsiveFontSize(1.9),fontWeight:'700' }}>Add to Cart</Text>
        </TouchableOpacity>
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
  

  return (
//     <View style={{borderTopWidth: 1,
//       borderColor: '#ddd',
//       padding: 10,}}>
//       <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: 'bold', alignSelf: 'center', marginTop: 10 ,color:'black' }}>
//         Products For Sale
//       </Text>
      
//       <View style={{height:responsiveHeight(65)}}> 
//       {/* <FlatList
//     data={products}
//     renderItem={renderItem}
//     keyExtractor={(item) => item.id}
//     horizontal={false}
//     numColumns={1} // Set numColumns to 1 to display items in a single column
// /> */}
// </View>
// <Text>hdshs</Text>

        
        
        
//     </View>
//   );
// };

<View style={{
  borderTopWidth: 1,
  borderColor: '#ddd',
  padding: 10,
  height: '100%'
}}>
   <View >
    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: 'bold', alignSelf: 'center', marginTop: 10, color: 'black' }}>
    Products For Sale
    </Text>
    <TouchableOpacity onPress={() => navigation.navigate('CartRental', { cartRentalItems })} style={{ width: responsiveWidth(9), height: responsiveHeight(4), left: responsiveWidth(80), bottom: responsiveHeight(3.8), }}>
      <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/add-to-cart.png')} style={{ width: 32, height: 32
      
      }} />
    </TouchableOpacity>
  </View>


  
<ScrollView>
  <View style={{ flexDirection: 'row', padding: 2, borderColor: '#ddd', backgroundColor: 'rgba(189, 186, 187, 0.8)', padding: responsiveWidth(2), height: responsiveHeight(25), width: responsiveWidth(90), borderRadius: responsiveWidth(5), flexWrap: 'wrap', borderWidth: responsiveWidth(0.2), borderColor: 'black',marginBottom:5 }}>
          <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Update/camera.jpg')} style={{ width: responsiveWidth(32), height: responsiveHeight(17), marginRight: 10, }} />

          <View style={{ width: responsiveWidth(47), height: responsiveHeight(13), }}>
            <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold', alignSelf: 'center', color: 'black' }}>RED Weapon DSMC2 W/ HELIUM 8K S35 Sensor Cine Camera W/ Extras -Rready to Shoot. Pre-Owned:Red</Text>
          </View>
          <View style={{
            width: responsiveWidth(8), height: responsiveHeight(4), left: 300, position: 'absolute', top: 100

          }}>
            <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Update/view.png')} style={{ width: responsiveWidth(5), height: responsiveWidth(5), }} />
            <Text style={{ fontFamily: "bold", color: "black", top: -20, right: 19 }}>16</Text>
          </View>

          <Text style={{ color: 'black', fontSize: responsiveFontSize(2), fontWeight: '700', width: responsiveWidth(20),right:-10 }}>₹20.67L</Text>


          <TouchableOpacity style={{
            width: responsiveWidth(13), borderWidth: 1, backgroundColor: 'black', position: 'absolute', top: 170, right: 40, borderRadius: 4
          }}>
            <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '700', color: 'white', textAlign: 'center', }}>Buy</Text>
          </TouchableOpacity>

        </View>
        <View style={{ flexDirection: 'row', padding: 2, borderColor: '#ddd', backgroundColor: 'rgba(189, 186, 187, 0.8)', padding: responsiveWidth(2), height: responsiveHeight(25), width: responsiveWidth(90), borderRadius: responsiveWidth(5), flexWrap: 'wrap', borderWidth: responsiveWidth(0.2), borderColor: 'black',marginBottom:5 }}>
          <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Update/group.jpg')} style={{ width: responsiveWidth(32), height: responsiveHeight(17), marginRight: 10, }} />

          <View style={{ width: responsiveWidth(47), height: responsiveHeight(13), }}>
            <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold', alignSelf: 'center', color: 'black' }}>Photoshoot  Dresses For sale.With hot looking best out-fits</Text>
          </View>
          <View style={{
            width: responsiveWidth(8), height: responsiveHeight(4), left: 300, position: 'absolute', top: 100

          }}>
            <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Update/view.png')} style={{ width: responsiveWidth(5), height: responsiveWidth(5), }} />
            <Text style={{ fontFamily: "bold", color: "black", top: -20, right: 25 }}>118</Text>
          </View>

          <Text style={{ color: 'black', fontSize: responsiveFontSize(2), fontWeight: '700', width: responsiveWidth(20),right:-40 }}>₹2k</Text>


          <TouchableOpacity style={{
            width: responsiveWidth(13), borderWidth: 1, backgroundColor: 'black', position: 'absolute', top: 170, right: 40, borderRadius: 4
          }}>
            <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '700', color: 'white', textAlign: 'center', }}>Buy</Text>
          </TouchableOpacity>

        </View>
        {/* <View style={{ flexDirection: 'row', padding: 2, borderColor: '#ddd', backgroundColor: 'rgba(189, 186, 187, 0.8)', padding: responsiveWidth(2), height: responsiveHeight(25), width: responsiveWidth(90), borderRadius: responsiveWidth(5), flexWrap: 'wrap', borderWidth: responsiveWidth(0.2), borderColor: 'black' }}>
          <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Update/camera.jpg')} style={{ width: responsiveWidth(32), height: responsiveHeight(17), marginRight: 10, }} />

          <View style={{ width: responsiveWidth(47), height: responsiveHeight(13), }}>
            <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold', alignSelf: 'center', color: 'black' }}>RED Weapon DSMC2 W/ HELIUM 8K S35 Sensor Cine Camera W/ Extras -Rready to Shoot. Pre-Owned:Red</Text>
          </View>
          <View style={{
            width: responsiveWidth(8), height: responsiveHeight(4), left: 300, position: 'absolute', top: 100

          }}>
            <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Update/view.png')} style={{ width: responsiveWidth(5), height: responsiveWidth(5), }} />
            <Text style={{ fontFamily: "bold", color: "black", top: -20, right: 19 }}>16</Text>
          </View>

          <Text style={{ color: 'black', fontSize: responsiveFontSize(2), fontWeight: '700', width: responsiveWidth(20) }}>₹20.67L</Text>


          <TouchableOpacity style={{
            width: responsiveWidth(13), borderWidth: 1, backgroundColor: 'black', position: 'absolute', top: 170, right: 40, borderRadius: 4
          }}>
            <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '700', color: 'white', textAlign: 'center', }}>Buy</Text>
          </TouchableOpacity>

        </View> */}
        </ScrollView>
 </View> 
);
};

export default BuyProducts;