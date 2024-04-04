// import { CountryPicker } from "react-native-country-codes-picker";
// import React, { useState } from "react";
// import { StyleSheet, View, TouchableOpacity, Text, TextInput, Image } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import ImagePicker from 'react-native-image-picker';

// export default function Industry_S_Five() {
//   const [show, setShow] = useState(false);
//   const [countryCode, setCountryCode] = useState('');
//   const [number, setNumber] = useState('');
//   const [Password, setPassword] = useState('')
//   const [CPassword, setCPassword] = useState('')
//   const [showPassword, setShowPassword] = useState('')
//   const [name, setName] = useState('');
//   const [profileImage, setProfileImage] = useState(null);
//   const [coverImage, setCoverImage] = useState(null);
//   const navigation = useNavigation();

//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword);
//   }

//   const handleProfileImage = () => {
//     ImagePicker.showImagePicker((response) => {
//       if (!response.didCancel && !response.error) {
//         setProfileImage(response.uri);
//       }
//     });
//   }

//   const handleCoverImage = () => {
//     ImagePicker.showImagePicker((response) => {
//       if (!response.didCancel && !response.error) {
//         setCoverImage(response.uri);
//       }
//     });
//   }

//   const handlepressNav = () => {
//     Password === CPassword ? 
//       navigation.navigate("Subscription") : ''
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.formContainer}>
//         <Text style={styles.header}>Sign Up</Text>
//         {/* ... existing code ... */}
//         <TouchableOpacity onPress={handleProfileImage} style={styles.imagePickerButton}>
//           <Text style={styles.buttonText}>Select Profile Image</Text>
//         </TouchableOpacity>
//         {profileImage && <Image source={{ uri: profileImage }} style={styles.imagePreview} />}

//         <TouchableOpacity onPress={handleCoverImage} style={styles.imagePickerButton}>
//           <Text style={styles.buttonText}>Select Cover Image</Text>
//         </TouchableOpacity>
//         {coverImage && <Image source={{ uri: coverImage }} style={styles.imagePreview} />}

//         <TouchableOpacity onPress={handlepressNav} style={styles.nextButton}>
//           <Text style={styles.buttonText}>Next</Text>
//         </TouchableOpacity>

//         {/* ... existing code ... */}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   // ... existing styles ...

//   imagePickerButton: {
//     backgroundColor: '#007BFF',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: 'black',
//     width: 200,
//     marginTop: 10,
//   },
//   imagePreview: {
//     width: 200,
//     height: 200,
//     marginTop: 10,
//   },
// });

// ==== ++++ --- +++ -- ===========

import { View, Text, TouchableOpacity, StyleSheet, Image, styles } from 'react-native'
import React, { useState } from 'react'
import ImagePicker from "react-native-image-crop-picker"
import { useNavigation } from '@react-navigation/native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

export default function Industry_S_Four({ route }) {

  // for country callingcode purpose
  const { nationality,
    selected,
    current,
    native,
    profession,
    name,
    dob,
    showDatePicker } = route.params
  // for country callingcode purpose 


  const navigation = useNavigation();
  // -------- Profile hide and show  ---------------
  const [profilevisible, setProfilevisible] = useState(false)
  const profile_pic_dropdown = () => {
    setProfilevisible(!profilevisible)
  }

  // -------- Profile state hook ---------------
  const [profilepic, setProfilepic] = useState();
  // -------- Profile state hook ---------------

  const edit_profile_pic = async () => {
    await ImagePicker.openPicker({
      cropping: true
    }).then(image => {
      console.log(image.path)
      setProfilepic(image.path)
    })
  }

  // ========================================

  // -------- Profile hide and show  ---------------
  const [coverpicvisible, setCoverpicvisible] = useState(false)

  const cover_pic_dropdown = () => {
    setCoverpicvisible(!coverpicvisible)
  }

  // -------- Profile state hook ---------------
  const [coverpic, setCoverpic] = useState();

  const edit_cover_pic = async () => {
    await ImagePicker.openPicker({
      cropping: true
    }).then(image => {
      console.log(image.path)
      setCoverpic(image.path)
    });
  }
  return (
    <>
      <View style={{
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
         padding: responsiveHeight(1),
         backgroundColor: '#f5f5f5',
     
         width: '100%',
      }}>
        <View style={{
          width: responsiveWidth(85),
          padding: responsiveWidth(3),
          backgroundColor: '#f5f5f5',
          borderRadius: responsiveWidth(4),
          // elevation: responsiveWidth(2),
          // height:responsiveHeight(50),
          borderWidth: responsiveWidth(0.4)
        }}>
          <TouchableOpacity
            onPress={profile_pic_dropdown}
          >
            <Text style={{ fontSize: responsiveFontSize(3), fontWeight: "bold",color: "black", marginLeft: responsiveWidth(6), marginTop: responsiveHeight(2) }}>Profile picture</Text>
          </TouchableOpacity>

          {profilevisible && (
            <TouchableOpacity
              onPress={edit_profile_pic}
              style={{
                width: responsiveWidth(40),
                height: responsiveWidth(40),
                backgroundColor: "#C9CCD1",
                borderRadius: responsiveWidth(40),
                justifyContent: "center",
                alignSelf:'center',
                marginTop: responsiveHeight(2),
                marginLeft: responsiveWidth(1)
              }}>
              <Image source={{ uri: profilepic }} style={{ width:  responsiveWidth(40), height:  responsiveWidth(40), borderRadius:  responsiveWidth(40), }} />
            </TouchableOpacity>
          )}

          <View style={style.hr_tag} />

          {/* //===================================== */}

          <TouchableOpacity onPress={cover_pic_dropdown}>
            <Text style={{fontSize: responsiveFontSize(3), fontWeight: "bold",color: "black", marginLeft: responsiveWidth(6), marginTop: responsiveHeight(1) }}>Cover picture</Text>
          </TouchableOpacity>

          {coverpicvisible && (
            <TouchableOpacity
              onPress={edit_cover_pic}
              style={{
                width: responsiveWidth(65),
                height: responsiveHeight(20),
                backgroundColor: "#C9CCD1",
                borderRadius: responsiveWidth(2),
                justifyContent: "center",
                marginTop: responsiveHeight(2),
                marginLeft: responsiveWidth(7)
              }}>
              {coverpic && <Image source={{ uri: coverpic }} style={{ width: "100%", height: "100%", borderRadius: responsiveWidth(2), }} />}
            </TouchableOpacity>
          )}


          <View style={style.hr_tag} />
          <TouchableOpacity onPress={() => navigation.navigate("IndustryFive", {
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
            backgroundColor: 'blue',
            //  padding: responsiveWidth(2),
              borderRadius: responsiveWidth(5),
              justifyContent:'center',
              alignItems: 'center',
              width:responsiveWidth(34),
              left:responsiveWidth(42),
              marginTop:responsiveHeight(4),
              height:responsiveHeight(6),
          }}>
            <Text style={{
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("IndustryThree", {
            nationality,
            selected,
            current,
            native,
            profession,
            name,
            dob,
            showDatePicker
          })} style={{
            borderRadius: responsiveWidth(5),
          justifyContent:'center',
          alignItems: 'center',
          width:responsiveWidth(34),
          bottom:responsiveHeight(9.8),
          borderWidth:1,
          borderColor:'blue',
        //  left:responsiveWidth(42),
          marginTop:responsiveHeight(4),
          height:responsiveHeight(6),
          }}>
            <Text style={{
              color: 'blue',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}
const style = StyleSheet.create({
  hr_tag: {
    borderBottomWidth: responsiveWidth(0.4),
    borderBottomColor: 'black',
    marginVertical: responsiveHeight(2),
    marginLeft: responsiveWidth(2),
    marginRight: responsiveWidth(2)
  },


})