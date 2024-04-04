import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default function Industry_S_Three({route}) { 

   // for country callingcode purpose 
   const { 
    nationality, 
    selected,
    current,
    native,
    profession,birthcity,living} =  route.params

  // for country callingcode purpose 

  const [gender, setGender] = useState('');
const data = [
  { key: '1', value: 'Male' },
  { key: '2', value: 'Female' },
  { key: '3', value: 'Others' },
];
  const [name, setName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(false);
    setDob(currentDate);
  };

  const handlepressNav = () =>{
    if (name === '' || gender === '') {
      alert('Name and Gender cannot be empty.');
      }
      else{
      navigation.navigate("IndustryFour",{
        birthcity,
        living,
        nationality, 
        selected,
        current,
        native,
        profession,
        name,
        showDatePicker
      })
      }
 
  }

  
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Sign Up</Text>
        </View>

        <TextInput
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.datePickerButton}
        >
          <Text style={styles.buttonText}>DOB</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display='default'
            maximumDate={new Date()}
            onChange={onDateChange}
          />
        )}

        {dob && (
          <View style={styles.selectedDateContainer}>
            <Text style={styles.selectedDateText}>
              {dob.toDateString()}
            </Text>
          </View>
        )}
                {/* Gender Dropdown */}
        <SelectList
          placeholder='Your Gender'
          setSelected={(val) => setGender(val)}
          data={data}
          save="value"
          inputStyles={{fontSize:responsiveFontSize(2)}}
          search={false}
          boxStyles={{flexDirection: 'row', bottom:responsiveHeight(3.5),
          // alignItems: 'center',
          // justifyContent:'center',
         marginBottom: responsiveHeight(2),
          borderWidth: responsiveWidth(0.4),
          borderColor: 'black',
          paddingTop:responsiveHeight(1),
          paddingLeft:responsiveWidth(2),
         // paddingHorizontal: responsiveWidth(4),
          borderRadius: responsiveWidth(5),
          height: responsiveHeight(5)}}
          dropdownStyles={{ margin: responsiveWidth(1),bottom:responsiveHeight(4), borderRadius: responsiveWidth(1), height: responsiveHeight(15),fontSize:responsiveFontSize(1), }}/>
        <TouchableOpacity onPress={handlepressNav} style={styles.nextButton}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("IndustryTwo",{
          nationality, 
          selected,
          current,
          native,
          profession
        })} style={{    borderRadius: responsiveWidth(5),
          justifyContent:'center',
          alignItems: 'center',
          width:responsiveWidth(34),
          bottom:responsiveHeight(9.8),
          borderWidth:1,
          borderColor:'blue',
        //  left:responsiveWidth(42),
          marginTop:responsiveHeight(4),
          height:responsiveHeight(6),}}>
          <Text style={{    color: 'blue',
          
    fontWeight: 'bold',
    textAlign: 'center',}}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsiveHeight(1),
    backgroundColor: '#f5f5f5',

    width: '100%',
  },
  formContainer: {
    width: responsiveWidth(85),
    padding: responsiveWidth(3),
    backgroundColor: '#f5f5f5',
    borderRadius: responsiveWidth(4),
    // elevation: responsiveWidth(2),
    // height:responsiveHeight(50),
    borderWidth: responsiveWidth(0.4)
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: "center",
  },
  header: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    top:responsiveHeight(2),
    marginBottom: responsiveHeight(5),
    color: 'black',
    // left:70,
    fontFamily:'ArianaVioleta-dz2K',
    textAlign:'center'
  },
  menuTrigger: {
    fontSize: 24,
    color: 'black',
    justifyContent:'center',
    alignItems:'center',
  },
  input: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent:'center',
    marginBottom: responsiveHeight(2),
    borderWidth: responsiveWidth(0.4),
    borderColor: 'black',
    paddingTop: responsiveHeight(1),
    paddingLeft: responsiveWidth(2),
    // paddingHorizontal: responsiveWidth(4),
    borderRadius: responsiveWidth(5),
    height: responsiveHeight(5),
    fontSize:responsiveFontSize(2)
  },
  datePickerButton: {
    backgroundColor: '#a4ec35',
   // padding: 10,
    borderRadius: responsiveWidth(5),
    justifyContent:'center',
    alignItems: 'center',
    borderWidth: responsiveWidth(0.4),
    borderColor: 'black',
   // width: 100,
   width:responsiveWidth(25),
    height:responsiveHeight(5),
   // left: 2,
    //top:14
  },
  selectedDateContainer: {

    
    justifyContent:'center',
    alignItems:'center',
    //paddingBottom: 9,
    bottom: responsiveHeight(6.3),
    borderRadius: responsiveWidth(5),
    borderWidth: responsiveWidth(0.4),
    borderColor: 'black',
    marginTop: responsiveHeight(1.2),
    width: responsiveWidth(46),
    height:responsiveHeight(5),
    left: responsiveWidth(32),

    borderRadius: responsiveWidth(5),
  },
  selectedDateText: {
    fontSize: responsiveFontSize(2),
    height:responsiveHeight(6),
    top:responsiveHeight(1.3)
   // alignSelf:'center',
    //padding:7
  },
  nextButton: {
    backgroundColor: 'blue',
    //  padding: responsiveWidth(2),
      borderRadius: responsiveWidth(5),
      justifyContent:'center',
      alignItems: 'center',
      width:responsiveWidth(34),
      left:responsiveWidth(42),
      marginTop:responsiveHeight(2),
      height:responsiveHeight(6),
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
   
  },

})



// onSelect={() => {
//   if (option === 'General User') {
//     navigation.navigate('GeneralUserScreen'); // Replace 'GeneralUserScreen' with the actual screen name for General User
//   } else if (option === 'Industry User') {
//     navigation.navigate('ACKNOWLEDGMENT'); // Replace 'IndustryUserScreen' with the actual screen name for Industry User
//   }}}