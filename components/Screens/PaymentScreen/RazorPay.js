// import { View, Text } from 'react-native'
// import React from 'react'
// import {key_id,key_secret} from '@env'
// import RazorpayCheckout from 'react-native-razorpay';


// export default function RazorPay() {
//     const amount =1000;
//     const currency = 'INR';

//     const handlePayment = () => {
//     var options = {
//         description: 'summa oru try',
//         image: 'https://i.imgur.com/3g7nmJC.jpg',
//         currency: currency,
//         key: key_id,
//         amount: amount*100,  
//         name: 'Acme Corp',
//         order_id: "",
//         prefill: {
//           email: 'hlo@gmail.com',
//           contact: '7904156164', 
//           name: 'Gaurav Kumar',
//         },
//       }
//       RazorpayCheckout.open(options).then((data) => {

//         alert(`Success: ${data.razorpay_payment_id}`);
//       }).catch((error) => {

//         alert(`Error: ${error.code} | ${error.description}`);
//       });
//     }
//     console.log('key_id:', key_id);
//     console.log('key_secret:', key_secret);
 

//   return (
//     <View>
//       <Text onPress={handlePayment} style={{color:'white', borderWidth:1,backgroundColor:'green'}}>Pay Now</Text>
//     </View>
//   )
// }

//i comment this 



// const createPaymentLink = async () => {
//     try {
//       const response = await axios.post(
//         'https://api.razorpay.com/v1/payment_links',
//         {
//           amount: 1000,
//           currency: 'INR',
//           description: 'Payment for Order #123',
//           customer: {
//             name: 'John Doe',
//             email: 'john.doe@example.com',
//             contact: '+919876543210',
//           },
//           notify: {
//             sms: true,
//             email: true,
//           },
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Bearer rzp_test_UgDclEehCNSk14',
//           },
//         }
//       );
//       console.log('Payment Link URL:', response.data.short_url);
//     } catch (error) {
//       console.error('Error creating payment link:', error);
//     }
//   };

//   createPaymentLink();