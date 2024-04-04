import React, { useState } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const YourComponent = () => {
  const [selectedGender, setSelectedGender] = useState(null);

  return (
    <View>
      <Picker
        selectedValue={selectedGender}
        onValueChange={(itemValue) => setSelectedGender(itemValue)}>
        <Picker.Item label="Select Gender" value={null} />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>
    </View>
  );
};

export default YourComponent;
