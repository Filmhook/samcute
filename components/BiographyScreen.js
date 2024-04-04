// BiographyScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useBiography } from './BiographyContext'; 

export default function BiographyScreen({ navigation }) {
  const { biography } = useBiography();

  return (
    <View>

        
        
      <Text >Name: {biography.name}</Text>
      <Text>Date of Birth: {biography.dob}</Text>
      <Text>Additional Field: {biography.additionalField}</Text>
      <Text>Additional Field: {biography.birthplace}</Text>
      <Text>Additional Field: {biography.currentLocation}</Text>
      <Text>Additional Field: {biography.workSchedule}</Text>
      <Text>Additional Field: {biography.nationality}</Text>


      {/* Display other biography details */}
      <Button
        title="Edit"
        onPress={() => navigation.navigate('EditBiography')}
      />
    </View>
  );
}
