import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import PublicAPI from '../../api/publicAPI';


export default function Biography() {
  const [isEditing, setIsEditing] = useState(false);
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const jwt = await AsyncStorage.getItem('jwt');

        const response = await PublicAPI.get(`user/getUserByUserId?userId=${userId}`, {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });

        const user = response.data.data;
        setDob(user.dob ? moment(user.dob).toDate() : new Date());
        setGender(user.gender || '');
        setCountry(user.country || '');
        setState(user.state || '');
        setDistrict(user.district || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
        }
      }
    };

    fetchData();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(Platform.OS === 'ios');
    setDob(currentDate);
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleUpdatePersonalInfo = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const jwt = await AsyncStorage.getItem('jwt');
    const url = 'https://filmhook.annularprojects.com/filmhook-0.0.1-SNAPSHOT/user/updateBiographyDetails';

    const requestBody = {
      userId: userId,
      dob: moment(dob).format('YYYY-MM-DD'), // Format dob as 'yyyy-mm-dd'
      gender: gender,
      country: country,
      state: state,
      district: district,
    };

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to update personal info');
      }

      setIsEditing(false);
      Alert.alert('Success', 'Personal info updated successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <Text>BIOGRAPHY</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Text>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      <View>
        {isEditing ? (
          <TouchableOpacity onPress={openDatePicker}>
            <TextInput
              style={{ fontSize: 16, color: '#000000', fontWeight: '500', fontFamily: 'Times New Roman' }}
              value={moment(dob).format('YYYY-MM-DD')}
              editable={false}
            />
          </TouchableOpacity>
        ) : (
          <Text>{moment(dob).format('YYYY-MM-DD')}</Text>
        )}
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dob}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}
      </View>

      <TouchableOpacity onPress={handleUpdatePersonalInfo}>
        <Text>Update Personal Info</Text>
      </TouchableOpacity>
    </View>
  );
}
