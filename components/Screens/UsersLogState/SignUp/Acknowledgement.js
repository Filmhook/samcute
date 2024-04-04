import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SwipeButton from 'rn-swipe-button';
import { useNavigation } from '@react-navigation/native';

const Industry_Ack = () => {
  const navigation = useNavigation();

  const handleSwipe = () => {
    navigation.navigate('IndustryOne');
  };

  const [showTerms, setShowTerms] = useState(false);

  return (
    <View style={styles.container}>
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
        <SwipeButton
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
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"grey"
  },
  formContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 10,
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
    left:36,
    textDecorationLine:'underline',
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

export default Industry_Ack;