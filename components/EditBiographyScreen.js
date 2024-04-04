// EditBiographyScreen.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBiography } from './BiographyContext'; 

export default function EditBiographyScreen() {
  const { biography, updateBiography } = useBiography();
  const navigation = useNavigation();
  const [editedBiography, setEditedBiography] = useState(biography);

  const handleSave = () => {
    updateBiography(editedBiography);
    navigation.navigate('Biography');
  };

  return (
    <View>
      <Text>Edit Biography</Text>
      <TextInput
        placeholder="Name"
        value={editedBiography.name}
        onChangeText={(text) => setEditedBiography({ ...editedBiography, name: text })}
      />
     
       <TextInput
        placeholder="Additional Field"
        value={editedBiography.additionalField}
        onChangeText={(text) => setEditedBiography({ ...editedBiography, additionalField: text })}
      />
      {/* Add other input fields for editing */}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}
