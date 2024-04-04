// EditBiographyScreen.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { usePersonal } from './PersonalContext';

export default function EditPersonalScreen() {
  const { personal, updatePersonal } = usePersonal();
  const navigation = useNavigation();
  const [editedPersonal, setEditedPersonal] = useState(personal);

  const handleSave = () => {
    updatePersonal(editedPersonal);
    navigation.navigate('PersonalScreen');
  };

  return (
    <View>
      <Text>Edit Personal</Text>
      <TextInput
        placeholder="Name"
        value={editedPersonal.name}
        onChangeText={(text) => setEditedPersonal({ ...editedPersonal, name: text })}
      />
       <TextInput
        placeholder="Additional Field"
        value={editedPersonal.additionalField}
        onChangeText={(text) => setEditedPersonal({ ...editedPersonal, additionalField: text })}
      />
      {/* Add other input fields for editing */}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}
