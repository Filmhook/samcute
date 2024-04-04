// BiographyScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

import { usePersonal } from './PersonalContext';

export default function PersonalScreen({ navigation }) {
  const { personal } = usePersonal();

  return (
    <View>

        
        
      <Text >Name: {personal.name}</Text>
      <Text>Date of Birth: {personal.dob}</Text>
      <Text>Additional Field: {personal.additionalField}</Text>
      <Text>Additional Field: {personal.birthplace}</Text>
      <Text>Additional Field: {personal.currentLocation}</Text>
      <Text>Additional Field: {personal.workSchedule}</Text>
      <Text>Additional Field: {personal.nationality}</Text>


      {/* Display other biography details */}
      <Button
        title="Edit"
        onPress={() => navigation.navigate('EditPersonalScreen')}
      />
    </View>
  );
}
