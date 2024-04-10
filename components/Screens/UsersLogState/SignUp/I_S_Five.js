import { CountryPicker } from "react-native-country-codes-picker";
import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, TextInput, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from 'firebase/auth';
import app from "../../../../FirebaseConfig";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";


export default function Industry_S_Five({ route }) {

  // for country callingcode purpose 
  const {
    nationality,
    selected,
    current,
    native,
    profession,
    name,
    dob,
    showDatePicker,
    profilepic,
    coverpic } = route.params

  const callcode = nationality.callingCode;

  // for country callingcode purpose 

  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [number, setNumber] = useState('');
  const [Password, setPassword] = useState('');
  const [CPassword, setCPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [mail, setMail] = useState('');

  const [suggestions, setSuggestions] = useState([]);
  const [strength, setStrength] = useState('');

  const navigation = useNavigation();


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handlepress = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W])(?!.*\s).{8,}$/;

    if (!passwordRegex.test(Password)) {
      alert('Password must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.');
      return;
    }

  }

  //=============================================================================
  const validatePassword = (input) => {
    let newSuggestions = [];
    // console.log('Pas '+input)
    if (input.length < 8) {
      newSuggestions.push('-Password should be at least 8 characters long')
    }
    // if (!/\d/.test(input)) { 
    // 	newSuggestions.push('Add at least one number') 
    // } 

    if (!/[A-Z]/.test(input) || !/[a-z]/.test(input)) {
      newSuggestions.push('-Include both upper and lower case letters')
    }

    if (!/[^A-Za-z0-9]/.test(input)) {
      newSuggestions.push('-Include at least one special character')
    }




    setSuggestions(newSuggestions);

    //console.log('password '+newSuggestions)

    // Determine password strength based on suggestions 
    if (newSuggestions.length == 0) {
      setStrength('Very Strong');
    }
    else if (newSuggestions.length <= 1) {
      setStrength('Strong')
    }
    else if (newSuggestions.length <= 2) {
      setStrength('Moderate')
    }
    else if (newSuggestions.length <= 3) {
      setStrength('Weak')
    }
    else {
      setStrength('Too Weak')
    }
  }
  //==============================================================================

  const handlepressNav = () => {

    if (Password !== CPassword || mail === '' || number === '') {
      alert('Some datas Missing')
    }
    else {
      Password === CPassword
        ? handleRegistration()
        : alert('Password does not match the Confirm Password');
    }


    // Password !== CPassword || mail === '' || number === ''? 
    // alert('Some datas Missing') : navigation.navigate("Subscription")
  }
  const handleRegistration = async () => {

    try {
      // For Auth Purpose 
      const authInstance = getAuth(app)

      const { user } = await createUserWithEmailAndPassword(authInstance, mail, Password);
      console.log("signup succesfully");
      await sendEmailVerification(user);
      navigation.navigate("Login")
      console.log("verified Mail Sended");
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.header}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Your Mail ID"
            value={mail}
            onChangeText={setMail}
            style={{
              height: responsiveHeight(5.2),
              paddingLeft: responsiveWidth(2),
              width: responsiveWidth(75),

              fontSize: responsiveFontSize(2.2),
            }}
          />
        </View>
        <View style={styles.inputContainer}>

          <TextInput
            placeholder="Password"
            maxLength={12}
            value={Password}
            //   onChangeText={setPassword}
            onChangeText={(text) => {
              setPassword(text);
              validatePassword(text)
            }}
            onEndEditing={validatePassword}
            secureTextEntry={!showPassword} // Use secureTextEntry based on showPassword state
            style={{
              height: responsiveHeight(5),

              padding: responsiveWidth(1),
              left: responsiveWidth(2),
              fontSize: responsiveFontSize(2.2),
            }}
          />

          <TouchableOpacity onPress={toggleShowPassword} style={{ position: 'absolute', top: responsiveHeight(1.5), right: responsiveWidth(6), height: responsiveHeight(2), width: responsiveWidth(7) }}>
            {showPassword ? <Image source={require('../../../Assets/SignIn&Up_And_Font/password_eye_show.png')} style={{ width: "100%", height: "100%" }} /> : <Image source={require("../../../Assets/SignIn&Up_And_Font/eye.png")} style={{ width: "100%", height: "100%" }} />}



          </TouchableOpacity>
        </View>


        <Text style={styles.strengthText}>
          Password Strength: {strength}
        </Text>
        <Text style={styles.suggestionsText}>
          {suggestions.map((suggestion, index) => (
            <Text key={index}>
              {suggestion}{'\n'}
            </Text>))}
        </Text>
        <View style={styles.strengthMeter}>
          <View style={{
            width: `${(strength === 'Very Strong' ? 100 :
              (strength === 'Strong' ? 75 :
                (strength === 'Moderate' ? 50 :
                  (strength === 'Weak' ? 25 : 0))))}%`,
            height: 20,
            backgroundColor: strength === 'Too Weak' ? 'red' :
              (strength === 'Weak' ? 'orange' :
                (strength === 'Moderate' ? 'yellow' :
                  (strength === 'Strong' ? 'green' : 'limegreen')))
          }}>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Confirm Password"
            value={CPassword}
            onChangeText={setCPassword}
            secureTextEntry={true}
            style={{
              height: responsiveHeight(5),

              padding: responsiveWidth(1),
              left: responsiveWidth(2),
              fontSize: responsiveFontSize(2.2),
            }}
          />
        </View>
        <View style={styles.inputContainerPassword}>
          <TextInput
            placeholder="Phone Number"
            value={number}
            onChangeText={setNumber}
            keyboardType={'phone-pad'}
            style={{
              height: responsiveHeight(5),

              padding: responsiveWidth(1),
              left: responsiveWidth(2),
              fontSize: responsiveFontSize(2),
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => setShow(true)}
          style={{
            width: responsiveWidth(25),
            height: responsiveHeight(5),
            padding: responsiveWidth(1),
            borderWidth: responsiveWidth(0.4),
            borderColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            bottom: responsiveHeight(7),
            borderRadius: responsiveWidth(5),
          }}
        >
          <Text
            style={{
              color: 'gray',
              fontSize: responsiveFontSize(2),
              // borderRadius: 20,
              alignSelf: 'center',
            }}
          >
            {countryCode || `+${callcode}`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlepressNav} style={styles.nextButton}>
          <Text style={styles.buttonText}>Verify Mail</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("IndustryFour", {
          nationality,
          selected,
          current,
          native,
          profession,
          name,
          dob,
          showDatePicker,
          profilepic,
          coverpic
        })} style={{
          padding: responsiveWidth(3),
          borderRadius: responsiveWidth(2),
          alignItems: 'center',
          width: responsiveWidth(35),
          borderColor: 'blue',
          borderWidth: 1,
          bottom: responsiveHeight(5.3)
        }}>
          <Text style={{
            color: 'blue',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>Back</Text>
        </TouchableOpacity>



        <CountryPicker
          show={show}
          style={{
            height: 40,
            paddingLeft: 8,
            modal: {
              height: responsiveHeight(55),
              backgroundColor: 'white',
            },
          }}
          pickerButtonOnPress={(item) => {
            setCountryCode(item.dial_code);
            setShow(false);
          }}
        />
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
    //height:responsiveHeight(50),
    borderWidth: 1

  },
  inputContainerPassword: {

    // alignItems: 'center',
    // justifyContent:'center',
    marginBottom: responsiveHeight(2),
    borderWidth: responsiveWidth(0.4),
    borderColor: 'black',
    left: responsiveWidth(28),
    // paddingHorizontal: responsiveWidth(4),
    borderRadius: responsiveWidth(5),
    height: responsiveHeight(5),
    width: responsiveWidth(50)

  },
  inputContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent:'center',
    marginBottom: responsiveHeight(2),
    borderWidth: responsiveWidth(0.4),
    borderColor: 'black',

    // paddingHorizontal: responsiveWidth(4),
    borderRadius: responsiveWidth(5),
    height: responsiveHeight(5),

  },

  nextButton: {
    backgroundColor: 'blue',
    padding: responsiveWidth(3),
    borderRadius: responsiveWidth(2),
    alignItems: 'center',
    width: responsiveWidth(35),
    left: responsiveWidth(42),

  },
  header: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    top: responsiveHeight(2),
    marginBottom: responsiveHeight(5),
    color: 'black',
    // left:70,
    fontFamily: 'ArianaVioleta-dz2K',
    textAlign: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',

  },
  //----------------------------------------
  strengthText: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
    color: '#007700',
    left: responsiveWidth(1)
  },
  suggestionsText: {
    color: 'red',
    left: responsiveWidth(1)
  },
  strengthMeter: {
    width: '80%',
    height: responsiveHeight(2.5),
    backgroundColor: '#ccc',
    //marginTop: responsiveHeight(1), 
    borderRadius: responsiveWidth(5),
    overflow: 'hidden',
    marginBottom: responsiveHeight(2)
  },

});