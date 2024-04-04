import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {key_id,key_secret} from '@env'
import RazorpayCheckout from 'react-native-razorpay';


export default function AuditionRazorPay() {
    const amount =1000;
    const currency = 'INR';

    const handlePayment = () => {
    var options = {
        description: 'summa oru try',
        image: 'https://i.imgur.com/3g7nmJC.jpg',
        currency: currency,
        key: key_id,
        amount: amount*100,  
        name: 'Acme Corp',
        order_id: "",
        prefill: {
          email: 'hlo@gmail.com',
          contact: '7904156164',
          name: 'Gaurav Kumar',
        },
      }
      RazorpayCheckout.open(options).then((data) => {

        alert(`Success: ${data.razorpay_payment_id}`);
      }).catch((error) => {

        alert(`Error: ${error.code} | ${error.description}`);
      });
    }
    console.log('key_id:', key_id);
    console.log('key_secret:', key_secret);
 

  return (
    <View>
        <Text style={{fontWeight:'bold',textAlign:'center',textAlignVertical:'center',fontSize:20 }}>Hey!! Buddy.</Text> 
        <Text style={{fontWeight:'bold',textAlign:'center', textAlignVertical:'center'}}>Your On a Right Track. To Post Your Audition, And to Ensure the Authenticity of the post. We Recommend you to Pay for the Post.</Text>
        <TouchableOpacity onPress={handlePayment} style={{alignSelf:'center',margin:5,}}>
            <Text  style={{color:'white',backgroundColor:'blue',width:70,padding:5,alignSelf:'center'}}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  ) 
}