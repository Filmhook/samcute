import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
// import {key_id,key_secret} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckOutBuy = ({ route, navigation }) => {
    const { BuycartItems, totalBuyCost } = route.params;
    const [BuyerAddressFields, setBuyerAddressFields] = useState({
        customerName: '',
        phoneNumber: '',
        alternatePhoneNumber: '',
        doorBuildingNo: '',
        streetName: '',
        cityTown: '',
        district: '',
        state: '',
        pincode: '',
      });

      const isAddressFilled =
      BuyerAddressFields.customerName &&
      BuyerAddressFields.phoneNumber &&
      BuyerAddressFields.doorBuildingNo &&
      BuyerAddressFields.streetName &&
      BuyerAddressFields.cityTown &&
      BuyerAddressFields.district &&
      BuyerAddressFields.state &&
      BuyerAddressFields.pincode;

      
    
  const handlePayment = () => {
    if (isAddressFilled) {

    const options = {
      description: 'Payment for products',
      image: 'https://your-company-logo.png', // Your company logo
      currency: 'INR', // Change to your currency
      key: rzp_test_0xl3XbYu8o1Q06, // Replace with your Razorpay API key
      amount: totalBuyCost * 100, // Total amount in smallest currency unit (e.g., paise)
      name: 'Film-hooks Mediaapps',
      prefill: {
        email: 'user@example.com', // User's email
        contact: '9999999999', // User's phone number
        name: 'John Doe', // User's name
      },
      theme: { color: '#53a20e' }, // Customize theme color
    };
    const generateOrderId = () => {
        // This is a basic example, you might use a more robust approach
        return `ORDER-${Math.floor(Math.random() * 1000000)}`;
      };
      
  
      const generateInvoice = (orderId, BuycartItems, totalCost, BuyerAddressFields, paymentId) => {
        const invoice = {
          orderId,
          orderDate: new Date().toLocaleDateString(),
          items: BuycartItems.map((item) => ({
            productId: item.id,
            productName: item.data.ProductName,
            price: item.data.Price,
            quantity: item.quantity,
            totalPrice: item.totalPrice,
          })),
          totalBuyCost,
          address: { ...BuyerAddressFields },
          paymentId, // Add paymentId to the invoice
          // Add more details if needed, like user details, invoice number, etc.
        };
      
        console.log('Generated Invoice:', invoice);
        // Here you can further process the invoice, such as sending it via email or generating a PDF
      };
      const orderId = generateOrderId();

      RazorpayCheckout.open(options)
        .then((data) => {
          // Handle successful payment
          console.log('Payment successful:', data);
          // Reset the cart after successful payment
          const paymentId = data.razorpay_payment_id;
          AsyncStorage.removeItem('BuycartItems');
          setAddressFields({
            customerName: '',
            phoneNumber: '',
            alternatePhoneNumber: '',
            doorBuildingNo: '',
            streetName: '',
            cityTown: '',
            district: '',
            state: '',
            pincode: '',
          });
          generateInvoice(orderId, BuycartItems, totalBuyCost, BuyerAddressFields, paymentId);

          navigation.goBack(); // Navigate back to the previous screen or the cart screen
          
        })
        .catch((error) => {
          // Handle payment failure/error
          console.error('Payment error:', error);
          // Display error message or take appropriate action
        });
    } else {
      alert('Please fill all address fields to proceed with payment.');
    }
  };
  
  return (
    <ScrollView style={{ flex: 1, padding: 10, }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Checkout</Text>
      <View style={{ marginBottom: 20 }}>
        {BuycartItems.map((item) => (
          <View key={item.id}>
            <View style={{borderTopWidth: 1,borderColor: '#ddd',padding: 10,}}>
            <Text>{`${item.data.CompanyName}`}</Text> 
            <Text>{`${item.data.ProductName}`}</Text>
            <Text> {`Price: ${item.data.Price}`}</Text>
            <Text>{`Quantity: ${item.quantity}`}</Text>
            {/* <Text>{`Total Price: ${item.totalPrice}`}</Text> */}
            </View>
          </View>
        ))}
        <Text style={{ fontWeight: 'bold' }}>{`Total Cost: ${totalBuyCost}`}</Text>
      </View>
      {/* Individual address input fields */}
      <TextInput
        placeholder="Customer Name*"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={BuyerAddressFields.customerName}
        onChangeText={(text) => setBuyerAddressFields({ ...BuyerAddressFields, customerName: text })}
      />
      <TextInput
        placeholder="Phone Number*"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={BuyerAddressFields.phoneNumber}
        onChangeText={(text) => setBuyerAddressFields({ ...BuyerAddressFields, phoneNumber: text })}
        keyboardType="numeric"
      />
      {/* Add more address fields here as needed */}
      <TextInput
        placeholder="Alternate Phone Number"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={BuyerAddressFields.alternatePhoneNumber}
        onChangeText={(text) => setBuyerAddressFields({ ...BuyerAddressFields, alternatePhoneNumber: text })}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Door/Building No*"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={BuyerAddressFields.doorBuildingNo}
        onChangeText={(text) => setBuyerAddressFields({ ...BuyerAddressFields, doorBuildingNo: text })}
      />
      <TextInput
        placeholder="Street Name*"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={BuyerAddressFields.streetName}
        onChangeText={(text) => setBuyerAddressFields({ ...BuyerAddressFields, streetName: text })}
      />
      <TextInput
        placeholder="City/Town Name*"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={BuyerAddressFields.cityTown}
        onChangeText={(text) => setBuyerAddressFields({ ...BuyerAddressFields, cityTown: text })}
      />
      <TextInput
        placeholder="District*"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={BuyerAddressFields.district}
        onChangeText={(text) => setBuyerAddressFields({ ...BuyerAddressFields, district: text })}
      />
      <TextInput
        placeholder="State*"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={BuyerAddressFields.state}
        onChangeText={(text) => setBuyerAddressFields({ ...BuyerAddressFields, state: text })}
      />
      <TextInput
        placeholder="Pincode*"
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
        value={BuyerAddressFields.pincode}
        onChangeText={(text) => setBuyerAddressFields({ ...BuyerAddressFields, pincode: text })}
        keyboardType="numeric"
      />
  
      <TouchableOpacity
        onPress={handlePayment}
        style={{
          backgroundColor: isAddressFilled ? '#53a20e' : '#ccc',
          padding: 15,
          alignItems: 'center',
          borderRadius: 5,
          marginBottom: 10,
        }}
        disabled={!isAddressFilled}>
        <Text style={{ color: 'white' }}>Proceed to Payment</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        onPress={handlePayment}
        style={{ backgroundColor: '#53a20e', padding: 15, alignItems: 'center', borderRadius: 5 }}>
        <Text style={{ color: 'white' }}>Proceed to Payment</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default CheckOutBuy;