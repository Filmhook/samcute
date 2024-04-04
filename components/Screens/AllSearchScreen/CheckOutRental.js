import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
// import {key_id,key_secret} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckOutRental = ({ route, navigation }) => {
    const { cartRentalItems, totalRentalCost } = route.params;
    const [RentalAddressFields, setRentalAddressFields] = useState({
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
      RentalAddressFields.customerName &&
      RentalAddressFields.phoneNumber &&
      RentalAddressFields.doorBuildingNo &&
      RentalAddressFields.streetName &&
      RentalAddressFields.cityTown &&
      RentalAddressFields.district &&
      RentalAddressFields.state &&
      RentalAddressFields.pincode;

      
    
  const handlePayment = () => {
    if (isAddressFilled) {

    const options = {
      description: 'Payment for products',
      image: 'https://your-company-logo.png', // Your company logo
      currency: 'INR', // Change to your currency
      key: rzp_test_0xl3XbYu8o1Q06, // Replace with your Razorpay API key
      amount: totalRentalCost * 100, // Total amount in smallest currency unit (e.g., paise)
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
      
  
      const generateInvoice = (orderId, cartRentalItems, totalRentalCost, RentalAddressFields, paymentId) => {
        const invoice = {
          orderId,
          orderDate: new Date().toLocaleDateString(),
          items: cartRentalItems.map((item) => ({
            productId: item.id,
            productName: item.data.ProductName,
            price: item.data.Price,
            quantity: item.quantity,
            totalPrice: item.totalPrice,
          })),
          totalRentalCost,
          address: { ...RentalAddressFields },
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
          AsyncStorage.removeItem('cartRentalItems');
          setRentalAddressFields({
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
          generateInvoice(orderId, cartRentalItems, totalRentalCost, RentalAddressFields, paymentId);

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
        {cartRentalItems.map((item) => (
          <View key={item.id}>
            <View style={{borderTopWidth: 1,borderColor: '#ddd',padding: 10,}}>
            <Text>{`Product From: ${item.data.Company_Name}`}</Text> 
            <Text>{`Product Name: ${item.data.Product_Name}`}</Text>
            <Text>{`Quantity: ${item.quantity}`}</Text>
            <Text> {`Price: ${item.data.Price}`}</Text>
            <Text>{`Total Price: ${item.quantity*item.data.Price}`}</Text>
            </View>
          </View>
        ))}
        <Text style={{ fontWeight: 'bold' }}>{`Total Cost: ${totalRentalCost}`}</Text>
      </View>
      {/* Individual address input fields */}
      <TextInput
        placeholder="Customer Name*"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={RentalAddressFields.customerName}
        onChangeText={(text) => setRentalAddressFields({ ...RentalAddressFields, customerName: text })}
      />
      <TextInput
        placeholder="Phone Number*"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={RentalAddressFields.phoneNumber}
        onChangeText={(text) => setRentalAddressFields({ ...RentalAddressFields, phoneNumber: text })}
        keyboardType="numeric"
      />
      {/* Add more address fields here as needed */}
      <TextInput
        placeholder="Alternate Phone Number"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={RentalAddressFields.alternatePhoneNumber}
        onChangeText={(text) => setRentalAddressFields({ ...RentalAddressFields, alternatePhoneNumber: text })}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Door/Building No*"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={RentalAddressFields.doorBuildingNo}
        onChangeText={(text) => setRentalAddressFields({ ...RentalAddressFields, doorBuildingNo: text })}
      />
      <TextInput
        placeholder="Street Name*"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={RentalAddressFields.streetName}
        onChangeText={(text) => setRentalAddressFields({ ...RentalAddressFields, streetName: text })}
      />
      <TextInput
        placeholder="City/Town Name*"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={RentalAddressFields.cityTown}
        onChangeText={(text) => setRentalAddressFields({ ...RentalAddressFields, cityTown: text })}
      />
      <TextInput
        placeholder="District*"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={RentalAddressFields.district}
        onChangeText={(text) => setRentalAddressFields({ ...RentalAddressFields, district: text })}
      />
      <TextInput
        placeholder="State*"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={RentalAddressFields.state}
        onChangeText={(text) => setRentalAddressFields({ ...RentalAddressFields, state: text })}
      />
      <TextInput
        placeholder="Pincode*"
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
        value={RentalAddressFields.pincode}
        onChangeText={(text) => setRentalAddressFields({ ...RentalAddressFields, pincode: text })}
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

export default CheckOutRental;