import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SelectList = () => {
  const countries = [
    { id: 1, name: 'USA', states: [
      { name: 'New York', districts: ['Manhattan', 'Brooklyn', 'Queens'] },
      { name: 'California', districts: ['Los Angeles', 'San Francisco', 'San Diego'] },
      { name: 'Texas', districts: ['Houston', 'Dallas', 'Austin'] }
    ]},
    { id: 2, name: 'Canada', states: [
      { name: 'Ontario', districts: ['Toronto', 'Ottawa', 'Mississauga'] },
      { name: 'Quebec', districts: ['Montreal', 'Quebec City', 'Laval'] },
      { name: 'Alberta', districts: ['Calgary', 'Edmonton', 'Red Deer'] }
    ]}
  ];

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const handleCountryChange = (countryId) => {
    setSelectedCountry(countryId);
    setSelectedState(null); // Reset state when country changes
    setSelectedDistrict(null); // Reset district when country changes
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectContainer}>
        <Text>Select Country:</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedCountry}
          onValueChange={(itemValue) => handleCountryChange(itemValue)}>
          <Picker.Item label="Select Country" value={null} enabled={false} />
          {countries.map(country => (
            <Picker.Item key={country.id} label={country.name} value={country.id} />
          ))}
        </Picker>
      </View>

      {selectedCountry && (
        <View style={styles.selectContainer}>
          <Text>Select State:</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedState}
            onValueChange={(itemValue) => setSelectedState(itemValue)}>
            <Picker.Item label="Select State" value={null} enabled={false} />
            {countries.find(country => country.id === selectedCountry).states.map((state, index) => (
              <Picker.Item key={index} label={state.name} value={state.name} />
            ))}
          </Picker>
        </View>
      )}

      {selectedState && (
        <View style={styles.selectContainer}>
          <Text>Select District:</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedDistrict}
            onValueChange={(itemValue) => setSelectedDistrict(itemValue)}>
            <Picker.Item label="Select District" value={null} enabled={false} />
            {countries.find(country => country.id === selectedCountry).states.find(state => state.name === selectedState).districts.map((district, index) => (
              <Picker.Item key={index} label={district} value={district} />
            ))}
          </Picker>
        </View>
      )}

      {selectedDistrict && (
        <View style={styles.selectContainer}>
          <Text>Selected Country: {countries.find(country => country.id === selectedCountry).name}</Text>
          <Text>Selected State: {selectedState}</Text>
          <Text>Selected District: {selectedDistrict}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  selectContainer: {
    marginBottom: 20,
    borderWidth:1,

  },
  picker: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default SelectList;
