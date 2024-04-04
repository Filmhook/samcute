import { CountryPicker } from "react-native-country-codes-picker";
import React, { useState ,useEffect} from "react";
import { StyleSheet, View, TouchableOpacity, Text, TextInput,Image, ImageBackground} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection, getFirestore, getDocs, query, where } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from 'firebase/auth';

import app from "../../../../FirebaseConfig";

 import dynamicLinks from '@react-native-firebase/dynamic-links';
 import { EmailLink } from 'react-native-email-link';

import { get } from "http";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";


export default function SignUpThree({route}) {

  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [number, setNumber] = useState('');
  const [Password, setPassword] = useState('');
  const [CPassword, setCPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [mail, setMail] = useState('');
  const [verificationStatus,setVerificationStatus]=useState("");
  const [error, setError] = useState('');

  const navigation = useNavigation();
  const firestore=getFirestore()
  const {name,dob,nationality,selected} = route.params
  const collectionName='userProfile'
  const countrycode = nationality.callingCode

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }


	const [suggestions, setSuggestions] = useState([]); 
	const [strength, setStrength] = useState(''); 
//==========================================================
  const handlepress = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W])(?!.*\s).{8,}$/;
  
    if (!passwordRegex.test(Password)) {
      alert('Password must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.');
      return;
    }
  } 
//============================================================


	const validatePassword = (input) => { 
		let newSuggestions = []
  //  console.log('Pas '+input)
		if (input.length < 8) { 
      			newSuggestions.push('-Password contains "0-9, A-Z, a-z, @-$"') 
      		} 
      		// if (!/\d/.test(input)) { 
      		// 	newSuggestions.push('Add at least one number') 
      		// } 
  
      		// if (!/[A-Z]/.test(input) || !/[a-z]/.test(input)) { 
      		// 	newSuggestions.push('-Include both upper and lower case letters') 
      		// } 
      
      		// if (!/[^A-Za-z0-9]/.test(input)) { 
      		// 	newSuggestions.push('-Include at least one special character') 
      		// } 
        
  


		setSuggestions(newSuggestions); 

  //  console.log('password '+newSuggestions)

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


  
  

  





//---------------------------------------------------------
  const getNextUserId = async () => {
        const usersQuery = query(collection(firestore, collectionName), where('id', '!=', null));
        const userSnapshot = await getDocs(usersQuery);
        return userSnapshot.size + 1;
      };
  const generateUserId = async () => {
        const nextUserId = await getNextUserId();
        return `@FH${nextUserId.toString().padStart(2, '0')}`;
      };

  const handleRegistration = async ()=>{

     try { 
      // For Auth Purpose 
       const authInstance = getAuth(app)

       const {user} = await createUserWithEmailAndPassword(authInstance,mail,Password);
     
       await sendEmailVerification(user);
      const userId = await generateUserId();
     
       const docRef = await addDoc(collection(firestore, collectionName), {
        id: userId,
        Name: name,
        DOB: dob,  
        Gender: selected,
        Nationality: nationality,
        
       });
      
      alert('Sign Up Successfull');
      console.log('Document written with ID: ', docRef.id);
      navigation.navigate('ProfileRoot', {userId,name, dob, selected, nationality });
      }
      catch(err){
        console.log('mail error',err);
      }
  }

 
    

  const handlePressNav = () => {
    
    if (Password.trim() === '' || CPassword.trim() === '' || mail.trim() === '' || number.trim() === '') {
      alert('Mail, Password,Confirm Password and Mobile Number cannot be empty');
    }

    
    else {
      Password === CPassword?
     // handleNext()
        handleRegistration()
      
        : alert('Password does not match the Confirm Password');
    }
  }

  



  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.header}>Step 3</Text>
        <ImageBackground style={styles.inputContainer} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}>
        <TextInput
          placeholder="Your Mail ID"
          value={mail}
          onChangeText={setMail}
          style={{
            height: responsiveHeight(8.2),
    width:responsiveWidth(85),
    fontSize:responsiveFontSize(2),paddingHorizontal:responsiveWidth(4)
          }}
        />
      </ImageBackground>

      <ImageBackground style={styles.inputContainer} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}>
          <TextInput
            placeholder="Password"
            maxLength={12}
            value={Password}
            onChangeText={(text)=>{
              setPassword(text); 
						validatePassword(text) 
            }}
           // onEndEditing={handlepress}
           onEndEditing={validatePassword}
            secureTextEntry={!showPassword} // Use secureTextEntry based on showPassword state
            style={{
            
              height: responsiveHeight(8.2),
              width:responsiveWidth(85),
              fontSize:responsiveFontSize(2),paddingHorizontal:responsiveWidth(4)
              //  borderWidth:1
              }}
            
          />
           <TouchableOpacity onPress={toggleShowPassword} style={{ position: 'absolute', right: responsiveWidth(6),height:responsiveHeight(2),width:responsiveWidth(7) }}>
           {showPassword ? <Image source={require("../../../Assets/SignIn&Up_And_Font/password_eye_show.png")}  style={{width:"100%",height:"100%"}}/> : <Image source={require("../../../Assets/SignIn&Up_And_Font/eye.png")} style={{width:"100%",height:"100%"}}/>} 
          </TouchableOpacity>
         </ImageBackground>
<View style={{flexDirection:'row',borderWidth:1,columnGap:responsiveWidth(2)}}>
          <Text style={styles.strengthText}> 
				Password Strength: {strength} 
			</Text> 
		
			<View style={styles.strengthMeter}> 
				<View style={{width: `${(strength === 'Very Strong' ? 100 : 
									(strength === 'Strong' ? 75 : 
									(strength === 'Moderate' ? 50 : 
									(strength === 'Weak' ? 25 : 0))))}%`, 
							height: 20, 
							backgroundColor: strength === 'Too Weak' ? 'red' : 
									(strength === 'Weak' ? 'orange' : 
									(strength === 'Moderate' ? 'yellow' : 
									(strength === 'Strong' ? 'green' : 'limegreen')))}}> 
				</View> 
			</View> 
      </View>
      	<Text style={styles.suggestionsText}> 
				{suggestions.map((suggestion, index) => ( 
					<Text key={index}> 
						{suggestion}{'\n'} 
					</Text>))} 
			</Text> 
           
      <ImageBackground style={styles.inputContainer} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}>
          <TextInput
            placeholder="Confirm Password"
            value={CPassword}
            onChangeText={setCPassword}
            secureTextEntry={true}
            style={{
              height: responsiveHeight(5),
             
               padding:responsiveWidth(1),
               left:responsiveWidth(2),
                fontSize: responsiveFontSize(2),
            }} 
          />
         </ImageBackground>

         <View style={{flexDirection:'row',columnGap:responsiveWidth(10),marginBottom:responsiveHeight(4)}}>
 
         {/* <ImageBackground style={styles.inputContainerPhn} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}> */}
        
         {/* </ImageBackground> */}
      
          
          <TouchableOpacity
            onPress={() => setShow(true)}
            style={{
              width: responsiveWidth(25),
              height: responsiveHeight(7),
            //  padding: responsiveWidth(1),
              borderWidth:  responsiveWidth(0.4),
              borderColor: 'black',
              justifyContent:'center',
              alignItems:'center',        
          //  bottom:responsiveHeight(7),
              borderRadius: responsiveWidth(2),
            }}
          >
            <Text
              style={{
                color: 'gray',
                fontSize: responsiveFontSize(2),
                borderRadius: 20,
                alignSelf: 'center',
              }}
            >
              {countryCode || `+${countrycode}`}
            </Text>
          </TouchableOpacity>
          <View style={styles.inputContainerPhn}>
            
          <TextInput
            placeholder="Phone Number"
            value={number}
            onChangeText={setNumber}
            keyboardType={'phone-pad'}
            style={{
              height: responsiveHeight(6.5),
             width:responsiveWidth(40),
             // padding:responsiveWidth(1),
              //left:responsiveWidth(2),
               fontSize: responsiveFontSize(2),
              // borderWidth:1
            }}
          />

          </View>
        </View>


   <View style={{flexDirection:'row',columnGap:responsiveWidth(7),marginBottom:responsiveHeight(4)}}>
   <TouchableOpacity onPress={() => navigation.navigate("SignUpTwo",{name,dob,nationality,selected})} style={{
           // backgroundColor: 'blue',
           borderRadius: responsiveWidth(2),
           justifyContent: 'center',
 
           alignItems: 'center',
          
           borderWidth: responsiveWidth(0.4),
           backgroundColor: 'black',
           height: responsiveHeight(7),
           width: responsiveWidth(30),
          }}>
            <Text style={{
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize:responsiveFontSize(2)
            }}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePressNav} style={styles.nextButton}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

         
          </View>
          <CountryPicker
            show={show}
            style={{
              height: 20,
              paddingLeft: 5,
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
    // justifyContent: 'center',
    alignItems: 'center',
    padding: responsiveWidth(3),
    backgroundColor: '#f5f5f5',

    width: '100%',
    height: '100%'
  },
 
  formContainer: {
    width: '95%',
 
    padding: responsiveWidth(3),
    backgroundColor: '#f5f5f5',
    borderRadius: responsiveWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(3),
 //   borderWidth:1
  },

  //-------------------------------

  inputContainer:{
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  
    borderColor: 'gray',
    //borderWidth: responsiveWidth(0.4),
    paddingHorizontal: responsiveWidth(8),
   // borderRadius: responsiveWidth(1),
    height: responsiveHeight(8.2),
    width:responsiveWidth(85),
    borderColor: 'gray',
    margin: responsiveWidth(1)
  },

  inputContainerPhn:{
   
    // justifyContent:'center',
     alignItems: 'center',
 
   borderWidth: responsiveWidth(0.4),
  // paddingHorizontal: responsiveWidth(8),
  borderRadius:responsiveWidth(2),
    height: responsiveHeight(7),
    width:responsiveWidth(46),
   // borderColor: 'black',
   


  },
  inputContainerPhn1:{

    width:responsiveWidth(45),
    height:responsiveHeight(6)
   // height:responsiveHeight(10)


  },



  nextButton: {
    backgroundColor: '#616161',
    padding: responsiveWidth(3),
    borderRadius: responsiveWidth(2),
    alignItems: 'center',
    width:responsiveWidth(35),
    height:responsiveHeight(7),
    justifyContent:'center',
    
    
   // left:responsiveWidth(42),
   // top:-15
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

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize:responsiveFontSize(2)
  },
  //---------------------------------------------
  strengthText: { 
		fontWeight: 'bold', 
		fontSize: responsiveFontSize(1.5), 
		color: '#007700', 
  //  right:responsiveHeight(5.5)
   // left:responsiveWidth(1)
	}, 
	suggestionsText: { 
		color: 'red', 
    left:responsiveWidth(1)
	}, 
	strengthMeter: { 
		width: '35%', 
		height: responsiveHeight(1), 
		backgroundColor: '#ccc', 
		//marginTop: responsiveHeight(1), 
		borderRadius: responsiveWidth(5), 
		overflow: 'hidden', 
   // left:responsiveWidth(24),
    //right:responsiveWidth(3),
    marginBottom:responsiveHeight(1),
    marginTop:responsiveHeight(0.8)
    //marginBottom:responsiveHeight(2)
	}, 
  
});


// import { CountryPicker } from "react-native-country-codes-picker";
// import React, { useState ,useEffect} from "react";
// import { StyleSheet, View, TouchableOpacity, Text, TextInput,Image} from "react-native";
// import { useNavigation } from "@react-navigation/native";

// import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from 'firebase/auth';
// import app from "../../../../FirebaseConfig";
// import { addDoc, collection, getFirestore, getDocs, query, where } from "firebase/firestore";

// export default function SignUpThree({route}) {
//   const [show, setShow] = useState(false);
//   const [countryCode, setCountryCode] = useState('');
//   const [number, setNumber] = useState('');
//   const [Password, setPassword] = useState('');
//   const [CPassword, setCPassword] = useState('');
//   const [showPassword, setShowPassword] = useState('');
//   const [mail, setMail] = useState('');
//   const [verificationStatus,setVerificationStatus]=useState("");
//   const navigation = useNavigation();
//   const firestore = getFirestore();

//   const {name, dob, nationality, selected} = route.params;
//   const collectionName = 'userProfile';

//   const countrycode = nationality.callingCode;

//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword);
//   }

//   const handlepress = () => {
//     const passwordRegex = /^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[\W])(?!.*\s).{8,}$/;
  
//     if (!passwordRegex.test(Password)) {
//       alert('Password must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.');
//       return;
//     }
//   } 

//   const getNextUserId = async () => {
//     const usersQuery = query(collection(firestore, collectionName), where('id', '!=', null));
//     const userSnapshot = await getDocs(usersQuery);
//     return userSnapshot.size + 1;
//   };

//   const generateUserId = async () => {
//     const nextUserId = await getNextUserId();
//     return `@FH${nextUserId.toString().padStart(2, '0')}`;
//   };

//   const handleRegistration = async () => {
//     try {
//       const authInstance = getAuth(app);
//       const {user} = await createUserWithEmailAndPassword(authInstance, mail, Password);

//       await sendEmailVerification(user);
//       const userId = await generateUserId();

//       const docRef = await addDoc(collection(firestore, collectionName), {
//         id: userId,
//         Name: name,
//         DOB: dob,  
//         Gender: selected,
//         Nationality: nationality,
//       });

//       alert('Sign Up Successful');
//       console.log('Document written with ID: ', docRef.id);
//       navigation.navigate('ProfileRoot', { userId, name, dob, selected, nationality });
//     } catch (err) {
//       console.error('Registration error', err);
//     }
//   }

//   const handlePressNav = () => {
//     if (Password.trim() === '' || CPassword.trim() === '' || mail.trim() === '' || number.trim() === '') {
//       alert('Mail, Password, Confirm Password, and Mobile Number cannot be empty');
//     } else {
//       Password === CPassword
//         ? handleRegistration()
//         : alert('Password does not match the Confirm Password');
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.formContainer}>
//         <Text style={styles.header}>Sign Up</Text>
//         <TextInput
//           placeholder="Your Mail ID"
//           value={mail}
//           onChangeText={setMail}
//           style={styles.input}
//         />

//         <TextInput
//           placeholder="Password"
//           maxLength={12}
//           value={Password}
//           onChangeText={setPassword}
//           onEndEditing={handlepress}
//           secureTextEntry={!showPassword}
//           style={styles.input}
//         />
//         <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
//           {showPassword ? <Image source={require("../../../Assets/SignIn&Up_And_Font/password_eye_show.png")}  style={styles.eyeIconImage} /> : <Image source={require("../../../Assets/SignIn&Up_And_Font/eye.png")} style={styles.eyeIconImage} />}
//         </TouchableOpacity>

//         <TextInput
//           placeholder="Confirm Password"
//           value={CPassword}
//           onChangeText={setCPassword}
//           secureTextEntry={true}
//           style={styles.input}
//         />

//         <TextInput
//           placeholder="Phone Number"
//           value={number}
//           onChangeText={setNumber}
//           keyboardType={'phone-pad'}
//           style={styles.input}
//         />
        
//         <TouchableOpacity
//           onPress={() => setShow(true)}
//           style={styles.countryPickerButton}
//         >
//           <Text style={styles.countryPickerText}>
//             {`countryCode || +${countrycode}`}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={handlePressNav} style={styles.nextButton}>
//           <Text style={styles.buttonText}>Verify Account</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate("SignUpTwo", { name, dob, nationality, selected })} style={styles.backButton}>
//           <Text style={styles.buttonText}>Back</Text>
//         </TouchableOpacity>

//         <CountryPicker
//           show={show}
//           style={styles.countryPickerButton}
//           pickerButtonOnPress={(item) => {
//             setCountryCode(item.dial_code);
//             setShow(false);
//           }}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'grey'
//   },
//   formContainer: {
//     padding: 20,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     elevation: 10,
//     width: 350,
//     height: 400
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: 'black'
//   },
//   input: {
//     height: 40,
//     borderColor: 'black',
//     borderWidth: 2,
//     paddingLeft: 8,
//     width: 300,
//     borderRadius: 10,
//     fontSize: 18,
//     marginBottom: 10
//   },
//   eyeIcon: {
//     position: 'absolute',
//     right: 20,
//     top: 15,
//     height: 25,
//     width: 25
//   },
//   eyeIconImage: {
//     width: '100%',
//     height: '100%'
//   },
//   countryPickerButton: {
//     width: '25%',
//     height: 40,
//     padding: 5,
//     borderWidth: 2,
//     borderColor: 'black',
//     margin: 5,
//     left: 0,
//     bottom: 0,
//     marginBottom: 40,
//     top: 0,
//     marginLeft: 2,
//     borderRadius: 10,
//   },
//   countryPickerText: {
//     color: 'gray',
//     fontSize: 18,
//     borderRadius: 20,
//     alignSelf: 'center',
//   },
//   nextButton: {
//         backgroundColor: 'black',
//         padding: 15,
//         borderRadius: 5,
//         alignItems: 'center',
//         width:130,
//         left:165,
//         top:-15
//         },
    
//         header: {
//           fontSize: 28,
//           fontWeight: 'bold',
//           marginBottom: 20,
//           textAlign: 'center',
//           color:'black'
//         },
    
//       buttonText: {
//         color: 'white',
//         fontWeight: 'bold',
//         textAlign: 'center',
//       },
      
//     });