import { launchImageLibrary } from 'react-native-image-picker';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import React, { useState, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { collection, addDoc } from '@react-native-firebase/firestore';
import app from '../../../FirebaseConfig';
import { addDoc, collection, doc, getFirestore, updateDoc } from 'firebase/firestore';
// import {getFirestore, collection, addDoc} from 'firebase/firestore'
import { RadioButton } from 'react-native-paper';
import RadioGroup from 'react-native-radio-buttons-group';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import RazorpayCheckout from 'react-native-razorpay';

export default function PostProdcuts() {
  const [CompanyName, setCompanyName] = useState('');
  const [ProductName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productType, setProductType] = useState('');
  const [quantity, setQuantity] = useState(1)
  const [checked, setChecked] = useState('Rental');
  //  const [selectedImage, setSelectedImage] = useState(null);
  //  const [selectedImageProduct, setSelectedImageProduct] = useState(null);
  const navigation = useNavigation()
  const firestore = getFirestore(app);
  const [selectedId, setSelectedId] = useState();
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [selectedPriceType, setSelectedPriceType] = useState('');
  const [priceValue, setPriceValue] = useState('');

  const [selectedImage, setSelectedLogo] = useState(null);
const [selectedProductImage, setSelectedProductImage] = useState(null);

  const isFormValid = () => {
    return (
      CompanyName.trim() !== '' &&
      ProductName.trim() !== '' &&
      productDescription.trim() !== '' &&
      productType.trim() !== '' &&
      selectedId !== '' &&
      priceValue.trim() !== '' &&
      quantity > 0 &&
      selectedImage !== null && // Check if company logo is selected
      selectedProductImage !== null // Check if product image is selected
    );
  };

  const openImagePicker = (type) => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 300,
      maxWidth: 300,
    };
  
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        if (type === 'logo') {
          setSelectedLogo(imageUri);
        } else if (type === 'productImage') {
          setSelectedProductImage(imageUri);
        }
      }
    });
  };
  
  const deleteImage = (type) => {
    if (type === 'logo') {
      setSelectedLogo(null);
    } else if (type === 'productImage') {
      setSelectedProductImage(null);
    }
  };
  


  const collectionName = 'Product-Post';


  const postContent = async () => {
    if (!isFormValid()) {
      alert('Please fill in all the required fields.');
      return;
    }
    try {
      const docRef = await addDoc(collection(firestore, collectionName), {
        Company_Name: CompanyName,
        Product_Name: ProductName,
        Product_Description: productDescription,
        CompanyLogo: selectedImage,
        Type: selectedId,
        Price: priceValue,
        Quantity: quantity,
        ProductCondition: productType,
        ProductImage: selectedImageProduct,

      });
      const productId = docRef.id
      await updateDoc(doc(firestore, collectionName, productId), {
        ProductId: productId,
      })
      alert('Product Added to Market Successfully');
      console.log('Document written with ID: ', docRef.id);
      navigation.navigate('RentalProducts', {
        CompanyName,
        ProductName,
        productDescription,
        selectedImage,
        selectedId,
        priceValue,
        quantity,
        productType, collectionName, productId, selectedImageProduct
      });
      console.log('Product Id:', productId)
    } catch (error) {
      console.error('Error adding document: ', error);

    }
  };
  const radioButtons = useMemo(() => ([
    {
      id: '1',
      label: 'For Rental',
      value: 'For Rental'
    },
    {
      id: '2',
      label: 'For Sale',
      value: 'For Sale'
    }
  ]))

  const makePayment =() =>{
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_DN4L6WbNtUJb5f',
      amount: '100',
      method:{
        netbanking:true,
        card:true,
        upi:true
      },
      name: 'Filmhookapps',
      // order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
      prefill: {
        email: '',
        contact: '',
        name: ''
      },
      theme: {color: 'blue'}
    }
    RazorpayCheckout.open(options).then((data) => {
      // handle success
      alert(`Success: ${data.razorpay_payment_id}`);
    }).catch((error) => {
      // handle failure
      console.log(error)
      alert(`Error: ${error.code} | ${error.description}`);
    });
  }

  return (
    <ScrollView >
      <View style={{ borderRadius: responsiveWidth(3), margin: responsiveWidth(2), backgroundColor: '#e0e3e6', overflow: 'scroll', paddingBottom: responsiveHeight(5), elevation: 20, width: responsiveWidth(90), alignSelf: 'center', }}>
        <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: 'bold', alignSelf: 'center', color: 'black', padding: responsiveWidth(5) }}>Product Post</Text>
        <TextInput
          placeholder='Your Company Name'
          value={CompanyName}
          onChangeText={setCompanyName}
          style={{
            marginTop: responsiveHeight(1),
            borderWidth: responsiveWidth(0.4),
            //  borderColor: '#004242',
            borderRadius: responsiveWidth(2),
            padding: responsiveWidth(2),
            overflow: 'scroll',
            width: responsiveWidth(78), alignSelf: 'center'
          }}
        />
        <TextInput
          placeholder='Your Product Name'
          value={ProductName}
          onChangeText={setProductName}
          style={{
            marginTop: responsiveHeight(1),
            borderWidth: responsiveWidth(0.4),
            //  borderColor: '#004242',
            borderRadius: responsiveWidth(2),
            padding: responsiveWidth(2),
            overflow: 'scroll',
            width: responsiveWidth(78), alignSelf: 'center'
          }} />
        <TextInput
          placeholder='Your Product Description'
          multiline
          value={productDescription}
          onChangeText={setProductDescription}
          style={{
            marginTop: responsiveHeight(1),
            borderWidth: responsiveWidth(0.4),
            //  borderColor: '#004242',
            borderRadius: responsiveWidth(2),
            padding: responsiveWidth(2),
            overflow: 'scroll',
            width: responsiveWidth(78), alignSelf: 'center'
          }} />
        <TextInput
          placeholder='Used Product or New Product'
          multiline
          value={productType}
          onChangeText={setProductType}
          style={{
            marginTop: responsiveHeight(1),
            borderWidth: responsiveWidth(0.4),
            //  borderColor: '#004242',
            borderRadius: responsiveWidth(2),
            padding: responsiveWidth(2),
            overflow: 'scroll',
            width: responsiveWidth(78), alignSelf: 'center'
          }} />
        <RadioGroup
          radioButtons={radioButtons}
          onPress={setSelectedId}
          selectedId={selectedId}
          layout='row'
          containerStyle={{ alignSelf: 'center', marginTop: responsiveHeight(2), width: responsiveWidth(82), }}

        />

        <View style={{
          flexDirection: 'row', marginTop: 10,
          width: 320, alignSelf: 'center',
        }}>
          <TextInput
            placeholder='INR'
            value={selectedPriceType}
            onChangeText={setSelectedPriceType}
            editable={false}
            style={{
              borderWidth: responsiveWidth(0.4),
              alignItems: 'center',
              borderRadius: responsiveWidth(2),
              height: responsiveHeight(5),
              width: responsiveWidth(10),
            }}
          />
          <TouchableOpacity onPress={() => setQuantity(Math.max(quantity - 1, 1))}>

            <Text style={{ fontSize: responsiveFontSize(3), margin: responsiveWidth(2) ,bottom:responsiveHeight(0.8)}}>-</Text>

          </TouchableOpacity>

          <TextInput
            value={quantity.toString()}
            onChangeText={(text) => setQuantity(parseInt(text) || 1)}
            keyboardType="numeric"
            style={{
              borderWidth: responsiveWidth(0.4),
              alignItems: 'center',
              borderRadius: responsiveWidth(2),
              height: responsiveHeight(5),
              width: responsiveWidth(10),


            }}
          />

          <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
            <Text style={{ fontSize: responsiveFontSize(2.5), marginLeft: responsiveWidth(2),marginRight:responsiveWidth(2) ,top:responsiveHeight(0.4) }}>+</Text>
          </TouchableOpacity>



          {selectedId === '1' ? (

            <TextInput
              placeholder="Price per day per quantity"
              value={priceValue}
              onChangeText={setPriceValue}
              keyboardType='numeric'
              style={{
                borderWidth: responsiveWidth(0.4),
                //  / borderColor: '#004242',
                  borderRadius: 10,
                  padding: responsiveWidth(1),
                  overflow: 'scroll',
                  height: responsiveHeight(5.2),
                  width: responsiveWidth(45),
              }}
            />
          ) : (
            <TextInput
              placeholder="Price per quantity"
              value={priceValue}
              onChangeText={setPriceValue}
              keyboardType='numeric'
              style={{
                borderWidth: responsiveWidth(0.4),
              //  / borderColor: '#004242',
                borderRadius: 10,
                padding: responsiveWidth(1),
                overflow: 'scroll',
                height: responsiveHeight(5.2),
                width: responsiveWidth(45),
              }}
            />
          )}
        </View>
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <View style={{ alignSelf: 'center' }}>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={{ width: 10, height: 200, }}
                resizeMode="contain"
              />
            )}
          </View>

          <View style={{ alignSelf: 'center', }}>
            {selectedProductImage  && (
              <Image
                source={{ uri: selectedProductImage }}
                style={{ width: 100, height: 200, }}
                resizeMode="contain"
              />
            )}
          </View>
        </View> */}

        <TouchableOpacity
      onPress={() => openImagePicker('logo')}
      style={{ backgroundColor: '#3741f2', borderRadius: responsiveWidth(2), width: responsiveWidth(75), alignSelf: 'center', margin: responsiveWidth(2) }}
    >
      <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: responsiveWidth(2), fontSize: responsiveFontSize(2) }}>
        Select Your Logo
      </Text>
    </TouchableOpacity>

    {selectedImage && (
      <View>
        <Image source={{ uri: selectedImage }} style={{ width: responsiveWidth(30), height: responsiveHeight(15),left:responsiveWidth(30) }} />
        <TouchableOpacity onPress={() => deleteImage('logo')} style={{width:responsiveWidth(13),height:responsiveHeight(3),backgroundColor:'red',left:responsiveWidth(65),borderRadius:responsiveHeight(1)}}>
          <Text style={{color:'white',left:responsiveWidth(1.4),top:responsiveHeight(0.2)}}>Delete</Text>
        </TouchableOpacity>
      </View>
    )}

    <TouchableOpacity
      onPress={() => openImagePicker('productImage')}
      style={{ backgroundColor: '#3741f2', borderRadius: responsiveWidth(2), width: responsiveWidth(75), alignSelf: 'center', margin: responsiveWidth(2) }}
    >
      <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: responsiveWidth(2), fontSize: responsiveFontSize(2) }}>
        Your Product Image
      </Text>
    </TouchableOpacity>

    {selectedProductImage && (
      <View>
        <Image source={{ uri: selectedProductImage }} style={{width: responsiveWidth(30), height: responsiveHeight(15),left:responsiveWidth(30) }} />
        <TouchableOpacity onPress={() => deleteImage('productImage')} style={{width:responsiveWidth(14),height:responsiveHeight(3),backgroundColor:'red',borderRadius:responsiveHeight(1),left:responsiveWidth(65)}}>
          <Text style={{color:'white',left:responsiveWidth(1.9),top:responsiveHeight(0.2)}}>Delete</Text>
        </TouchableOpacity>
      </View>
    )}


        <TouchableOpacity onPress={postContent} style={{  backgroundColor: '#3741f2', borderRadius: responsiveWidth(2), width: responsiveWidth(75), alignSelf: 'center',margin:responsiveWidth(2)  }}>
          <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: responsiveWidth(2) ,fontSize:responsiveFontSize(2) }} disabled={!isFormValid()} onPress={makePayment}>
            Post
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}
const style = StyleSheet.create({
  Date: {
    margin: 5,
    top: 12
  },
  Text: {
    margin: 0,
    width: 320,
    top: 10
  },
  TextStart: {
    margin: 5
  },
  TextEnd: {
    margin: 5
  }
});