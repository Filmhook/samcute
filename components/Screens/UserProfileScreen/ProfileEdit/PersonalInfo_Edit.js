import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {Children, useState} from 'react';
import {SelectList} from 'react-native-dropdown-select-list';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import AsyncStorage from '@react-native-async-storage/async-storage';
import PublicAPI from '../../../api/publicAPI';

export default function Personalinfo_edit() {
  const [personalInfovisible, setPersonalInfovisible] = useState(false);

  const navigateData = async () => {
    try {
      // Fetch userEmail from AsyncStorage
      const userEmail = await AsyncStorage.getItem('userEmail');
      if (!userEmail) {
        Alert.alert('User email not found');
        return;
      }

      // Make a POST request with userEmail included in the request body
      await PublicAPI.put('http://10.0.2.2:8000/user/', {
        email: userEmail, // Include userEmail in the request body
        religion,
        martialstatus,
        spouse,
        children,
        mother,
        father,
        brother,
        sister,
      });

      Alert.alert('User details saved');
      navigation.navigate('BioGraphy');
    } catch (error) {
      Alert.alert('Failed to save user details');
      console.log(error);
    }
  };

  const PersonalInfo_dropdown = () => {
    setPersonalInfovisible(!personalInfovisible);
  };

  {
    /* Relegion values */
  }

  const [religion, setReligion] = useState('');
  const [caste, setCaste] = useState('');
  const [martialstatus, setmartialstatus] = useState('');
  const [spouse, setSpouse] = useState('');
  const [children, setChildren] = useState('');
  const [mother, setMother] = useState('');
  const [father, setFather] = useState('');
  const [brother, setBrother] = useState('');
  const [sister, setSister] = useState('');
  const navigation = useNavigation();

  const relegion_data = [
    {key: '1', value: 'Select Religion'},
    {key: '2', value: 'Hindu'},
    {key: '3', value: 'Islam'},
    {key: '4', value: 'Christian'},
    {key: '5', value: 'Buddhis'},
    {key: '6', value: 'Sikhism'},
    {key: '7', value: 'Others'},
  ];

  {
    /* Relegion values */
  }

  // const [martialstatus, setmartialstatus] = useState("");

  const martialstatus_data = [
    {key: '1', value: 'Select martialstatus'},
    {key: '2', value: 'Single'},
    {key: '3', value: 'Married'},
    {key: '4', value: 'widowed'},
    {key: '5', value: 'divorced'},
    {key: '6', value: 'Others'},
  ];
  return (
    <>
      <View>
        <TouchableOpacity onPress={PersonalInfo_dropdown}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              fontWeight: 'bold',
              color: '#323232',
              marginLeft: 25,
            }}>
            Personal Information
          </Text>
        </TouchableOpacity>
        {personalInfovisible && (
          <View style={{marginTop: 10}}>
            {/* Religion Editor */}
            <SelectList
              setSelected={val => setReligion(val)}
              data={relegion_data}
              save="value"
              selectedValue={religion}
              boxStyles={{
                marginBottom: 20,
                width: 300,
                marginLeft: 40,
                borderColor: 'black',
              }}
              dropdownStyles={{
                width: 300,
                marginLeft: 40,
                marginBottom: 10,
                marginTop: -10,
              }}
              inputStyles={{marginLeft: -15}}
              search={false}
              defaultOption={{key: '1', value: 'Select Religion'}}
            />
            {/* Caste Editor */}
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: 20,
                width: 300,
                marginLeft: 40,
              }}
              onChangeText={setCaste}
              placeholder="Enter Your Caste"
              value={caste}
            />
            {/* martialstatus Editor */}
            <SelectList
              setSelected={val => setmartialstatus(val)}
              data={martialstatus_data}
              save="value"
              selectedValue={martialstatus}
              boxStyles={{
                marginBottom: 20,
                width: 300,
                marginLeft: 40,
                borderColor: 'black',
              }}
              dropdownStyles={{
                width: 300,
                marginLeft: 40,
                marginBottom: 10,
                marginTop: -10,
              }}
              inputStyles={{marginLeft: -15}}
              search={false}
              defaultOption={{key: '1', value: 'Select martialstatus'}}
            />
            {/* Spouse Editor */}
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: 20,
                width: 300,
                marginLeft: 40,
              }}
              value={spouse}
              onChangeText={setSpouse}
              placeholder="Enter Your Spouse"
            />
            {/* Children Editor */}
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: 20,
                width: 300,
                marginLeft: 40,
              }}
              value={children}
              onChangeText={setChildren}
              placeholder="Children"
            />
            {/* Mother Editor */}
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: 20,
                width: 300,
                marginLeft: 40,
              }}
              value={mother}
              onChangeText={setMother}
              placeholder="Mother"
            />
            {/* Father Editor */}
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: 20,
                width: 300,
                marginLeft: 40,
              }}
              value={father}
              onChangeText={setFather}
              placeholder="Father"
            />
            {/* Brother Editor */}
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: 20,
                width: 300,
                marginLeft: 40,
              }}
              value={brother}
              onChangeText={setBrother}
              placeholder="Brother"
            />
            {/* Sister Editor */}
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: 20,
                width: 300,
                marginLeft: 40,
              }}
              value={sister}
              onChangeText={setSister}
              placeholder="Sister"
            />
            <TouchableOpacity
              style={{
                borderRadius: responsiveWidth(2),
                marginTop: responsiveHeight(1.5),
                marginLeft: responsiveWidth(2),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#2d51c5',
                height: responsiveHeight(4),
                width: responsiveWidth(20),
                borderWidth: responsiveWidth(0),
              }}>
              <Text style={{color: 'white'}} onPress={navigateData}>
                SAVE
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={style.hr_tag} />
      </View>
    </>
  );
}

const style = StyleSheet.create({
  profile: {
    width: 350,
    height: 2000,
    marginTop: 20,
    marginLeft: 25,
    borderRadius: 10,
    marginBottom: 50,
    borderWidth: 1,
  },
  hr_tag: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginVertical: 15,
    marginLeft: 10,
    marginRight: 10,
  },
});
