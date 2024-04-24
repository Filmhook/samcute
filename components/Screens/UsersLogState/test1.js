// import React, { useState } from 'react';
// import { View, TouchableOpacity, StyleSheet, Text, Image, ActivityIndicator } from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

// const ModernDatePicker = () => {
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = (date) => {
//     const formattedDate = date.toISOString().split('T')[0];
//     setSelectedDate(formattedDate);
//     hideDatePicker();
//   };

//   const maximumDate = new Date(); // Today's date
//   const minimumDate = new Date('1900-01-01'); // Minimum date

//   const submit = async () => {
//     setLoading(true); // Set loading state to true when submitting
//     try {
//       const response = await PublicAPI.post('/user/register', {
//         firstName: name,
//         lastName:lastName,
//         middleName:middleName,
//         email: mail,
//         password: Password,
//         userType: 'commonUser',
//         phoneNumber: phonenumber,
//         district: selectedDistrict,
//         dob: selectedDate,
//         gender: selectedGender,
//         country: selectedCountry,
//         state: selectedState,
//       });
//       const userDetails = response.data.data.userDetails;
//       console.log('submit', userDetails)
//       const userId = userDetails.userId;
//       await AsyncStorage.setItem('userId', userId.toString());
//       const storedId = await AsyncStorage.getItem('userId');
//       console.log("idddddddd", storedId);
//       const mailId = userDetails.email;
//       await AsyncStorage.setItem('mail', mailId)
//       const strmail = await AsyncStorage.getItem('mail')
//       console.log(strmail)
//       Alert.alert('Registration successful OTP Sent');
//       console.log(response.data.data.userDetails.userId);
//       await AsyncStorage.setItem('userId', response.data.data.userDetails.userId?.toString());
//       console.log('Registration successful:', response.data);
//       // navigation.navigate('IndustryTwo')
//     } catch (error) {
//       Alert.alert('Registration failed');
//       console.error('Registration failed:', error);
//     } finally {
//       setLoading(false); // Set loading state to false after response received
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={showDatePicker} style={styles.dateContainer}>
//         <Image source={require('./calendar_icon.png')} style={styles.calendarIcon} />
//         <Text style={styles.dateText}>{selectedDate ? selectedDate : 'Select Date'}</Text>
//       </TouchableOpacity>
//       <DateTimePickerModal
//         isVisible={isDatePickerVisible}
//         mode="date"
//         maximumDate={maximumDate}
//         minimumDate={minimumDate}
//         onConfirm={handleConfirm}
//         onCancel={hideDatePicker}
//       />
//       {loading ? (
//         <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />
//       ) : (
//         <TouchableOpacity onPress={submit} style={styles.submitButton}>
//           <Text style={styles.submitButtonText}>Submit</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dateContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   calendarIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//   },
//   dateText: {
//     fontSize: 18,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderWidth: 1,
//     borderRadius: 5,
//   },
//   submitButton: {
//     marginTop: 20,
//     backgroundColor: '#007bff',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   loadingIndicator: {
//     marginTop: 20,
//   },
// });

// export default ModernDatePicker;
