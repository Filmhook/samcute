import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function MyComponent() {
  const [dob, setDob] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      // Format the selected date as YYYY-MM-DD
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDob(formattedDate);
    }
    Keyboard.dismiss(); // Hide the keyboard after selecting a date
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
    Keyboard.dismiss(); // Hide the keyboard when date picker is shown
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.inputContainer} onPress={showDatePickerModal}>
        <TextInput
          value={dob}
          placeholder="YYYY-MM-DD"
          style={styles.input}
          editable={false} // Disable direct text editing
        />
        <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Booking.png')} style={styles.calendarIcon} />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dob ? new Date(dob) : new Date()}
          mode="date"
          maximumDate={new Date()} // Set maximum date to today
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  calendarIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});
