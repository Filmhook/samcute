import React from 'react';
import { View, Text, Button } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 30 }}>
        Welcome to Film-hook!
      </Text>
      <Text style={{ marginBottom: 30 }}>
        {/* Add your welcome message and app description here */}
        Ready to explore and connect? Get started by creating an account.
      </Text>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default WelcomeScreen;