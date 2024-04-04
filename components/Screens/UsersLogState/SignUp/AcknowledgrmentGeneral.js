import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
import SwipeButton from 'rn-swipe-button';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Login from '../SignIn/Login';
import SignUpOne from './G_S_One';

const General_Ack = () => {
  const navigation = useNavigation();

  const handleSwipe = () => {
    navigation.navigate('IndustryOne');
  };

  //======================================
  const [checked, setChecked] = useState(false);
  //const navigation = useNavigation();

  const handleCheckboxPress = () => {
    setChecked(!checked);
  };

  const handleNextPress = () => {

    if (checked) {
      // Navigate to the next screen
      navigation.navigate('SignUpTwo', { checked, setChecked });
    } else {
      // Show a message or perform some action when the checkbox is not checked
      alert('Please agree to continue.');
    }


  };
  //===================================

  const [showTerms, setShowTerms] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{ height: responsiveHeight(8), width: responsiveWidth(55), marginBottom: responsiveHeight(0.2), flexDirection: 'row', position: 'relative', alignSelf: 'center', }}>

        <Image style={{
          height: responsiveHeight(8.3),
          width: responsiveWidth(18), bottom: responsiveHeight(1), alignSelf: 'center',
        }} source={require("../../../Assets/Login_page/FH_logos.png")} />

        <Image style={{ height: responsiveHeight(3.5), width: responsiveWidth(40), position: 'absolute', left: responsiveWidth(10), top: responsiveHeight(3) }} source={require('../../../Assets/Login_page/Film_hook_name.png')} />
        <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: responsiveFontSize(1.3), position: 'absolute', left: responsiveWidth(35), top: responsiveHeight(6), }}>Public User</Text>


      </View>
      <View style={styles.formContainer}>



        <View style={styles.headerContainer}>
          <Text style={styles.header}>ACKNOWLEDGMENT</Text>
        </View>
        <Text style={styles.subHeader}>Welcome, Industry Professional!</Text>
        <Text style={styles.description}>
          By taking this step, you're acknowledging that you're part of our esteemed industry users. Your commitment is vital to our community.
        </Text>
        <Text style={styles.nextSteps}>What's Next?</Text>
        <Text style={styles.description}>
          In adherence to our Terms and Conditions, your account may be deactivated within 24 hours if any violations are detected.
        </Text>
        <Text style={styles.impact}>Your Impact Matters!</Text>
        <Text style={styles.description}>
          Your contributions enhance the quality of our platform.
        </Text>
        <Text style={styles.thankYou}>Thank you for choosing us...</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Terms&Conditions')}>
          <Text style={styles.termsButton}>TERMS & CONDITIONS</Text>
        </TouchableOpacity>
        {/* <SwipeButton
          title="            Accept Terms & Conditions"
          titleFontSize={15}
          titleColor='white'
          onSwipeSuccess={handleSwipe}
        //   railFillBackgroundColor="#e688a1"
          railFillBorderColor="blue"
          thumbIconBackgroundColor="#ed9a73"
          thumbIconBorderColor="#ed9aff"
          railBackgroundColor="blue"
          railBorderColor="blue"
          height={60} 
        /> */}

        {/* //============================================= */}


        <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
          <TouchableOpacity onPress={handleCheckboxPress}>
            <View
              style={{
                width: responsiveWidth(6),
                height: responsiveWidth(6),
                // borderRadius: responsiveWidth(6),
                borderWidth: responsiveWidth(0.5),
                borderColor: 'black',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {checked && (
                <Image source={require("../../../Assets/Login_page/greenTickmark-FilmHook.png")} style={{ height: responsiveHeight(3), width: responsiveWidth(6), bottom: responsiveHeight(0.8), left: responsiveWidth(0.8) }}>

                </Image>
              )}
            </View>
          </TouchableOpacity>

          <Text style={{ left: responsiveWidth(3), fontWeight: '500', fontSize: responsiveFontSize(1.8), bottom: responsiveHeight(0.5), color: 'black' }}>I agree to the <Text style={{ color: '#0c92f0' }}>Term & Conditions</Text> and <Text style={{ color: '#0c92f0' }}> Privacy Policy </Text></Text>

        </View>
        {/* <Text>{checked ? 'You agreed!' : 'Not agreed yet.'}</Text> */}
        <TouchableOpacity onPress={handleNextPress} style={{ width: responsiveFontSize(20), borderWidth: 1, justifyContent: 'center', alignItems: 'center', height: responsiveHeight(5), marginTop: responsiveHeight(2), left: responsiveWidth(14), backgroundColor: 'blue', borderRadius: responsiveWidth(3) }}>
          <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '800', color: 'white' }}>Next</Text>
        </TouchableOpacity>


        {/* //================================================ */}



      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f5f5f5"
  },
  formContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 10,
    marginTop: responsiveHeight(1)
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    alignSelf: 'center',
    left: 36,
    textDecorationLine: 'underline',
  },
  subHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    textAlign: 'justify',
    marginBottom: 10,
  },
  nextSteps: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  impact: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  thankYou: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  termsButton: {
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default General_Ack;