import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';

const Subscription = () => {
  const handleSubscribe = (plan) => {
    // Add your subscription logic here
    alert(`Subscribed to ${plan} plan!`);
  };

  return (
    <View style={styles.container}>
      {/* <ImageBackground source={require('../../../assets/images/bg3-.jpg')} style={{width:412,height:710,}}> */}
      {/* Company Logo */}
        {/* <Image 
          source={require('../../../assets/images/new-logo.png')}
          style={{ width: 180, height: 180, bottom: 0, left: 140, top: 28 }}
        /> */}
        <ScrollView style={{ height: 600,top:70,marginBottom:50}}>
          <Text style={styles.subscriptionText}>Subscribe</Text>

          {/* Platinum Plan */}
          <View style={styles.planContainerPlat}>
            <Text style={styles.planTitlePlat}>Platinum</Text>
            <Text style={styles.planDescription}>Unlock premium features and exclusive content. Highly recommended for Tier 1 stars.</Text>
            <Text style={styles.planCost}>$19.99/month</Text>
            <TouchableOpacity style={styles.subscribeButtonPlat} onPress={() => handleSubscribe('Platinum')}>
              <Text style={styles.buttonTextPlat}>Subscribe</Text>
            </TouchableOpacity>
            {/* <Text style={styles.recommendedLabel}>Highly Recommended</Text> */}
          </View>

          {/* Gold Plan */}
          <View style={styles.planContainerGold}>
            <Text style={styles.planTitleGold}>Gold</Text>
            <Text style={styles.planDescription}>Enjoy enhanced features and special perks. Recommended for aspiring stars.</Text>
            <Text style={styles.planCost}>$14.99/month</Text>
            <TouchableOpacity style={styles.subscribeButtonGold} onPress={() => handleSubscribe('Gold')}>
              <Text style={styles.buttonTextGold}>Subscribe</Text>
            </TouchableOpacity>
          </View>

          {/* Silver Plan */}
          <View style={styles.planContainerSilver}>
            <Text style={styles.planTitleSilver}>Silver</Text>
            <Text style={styles.planDescription}>Access basic features and content. Suitable for beginners.</Text>
            <Text style={styles.planCost}>$9.99/month</Text>
            <TouchableOpacity style={styles.subscribeButtonSilver} onPress={() => handleSubscribe('Silver')}>
              <Text style={styles.buttonTextSilver}>Subscribe</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* </ImageBackground> */}
    </View>
  );
};

export default Subscription;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(52, 52, 52, alpha)'

      },
      logo: {
        flex: 1,
        justifyContent: 'center',
        width: 410,
      },
      subscriptionText: {
        fontSize: 28,
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',
      },
      planContainerPlat: {

      },
      planContainerGold: {
        marginBottom: 30,
      },
      planContainerSilver: {
        marginBottom: 30,
      },
      planTitlePlat: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fafafa',
        left:10
      },
      planTitleGold: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
        left:10
      },
      planTitleSilver: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
        left:10
      },
      planDescription: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
        marginBottom: 10,
        paddingHorizontal: 20,
        top:10
      },
      planCost: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
        marginBottom: 10,
        left:10,
        top:20,
      },
      subscribeButtonPlat: {
        backgroundColor: '#fafafa',
        borderRadius: 20,
        elevation: 20,
        shadowColor: 'black',
        alignItems: 'center',
        width: 120,
        height: 50,
        alignSelf: 'center',
        borderWidth:1,
        borderBlockColor:"black",
        top:40,

      },
      subscribeButtonGold: {
        backgroundColor: '#ffd600',
        borderRadius: 20,
        elevation: 20,
        shadowColor: 'black',
        alignItems: 'center',
        width: 120,
        height: 50,
        alignSelf: 'center',
        borderWidth:1,
        borderBlockColor:"black"

      },
      subscribeButtonSilver: {
        backgroundColor: '#fbe9e7',
        borderRadius: 20,
        elevation: 20,
        shadowColor: 'black',
        alignItems: 'center',
        width: 120,
        height: 50,
        alignSelf: 'center',
        borderWidth:1,
        borderBlockColor:"black"

      },
      buttonTextPlat: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        top: 13,
        

      },
      buttonTextGold: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        top: 13,
      },
      buttonTextSilver: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        top: 13,
      },
      recommendedLabel: {
        position: 'absolute',
        bottom: 10,
        right: 20,
        color: 'green',
      },
})