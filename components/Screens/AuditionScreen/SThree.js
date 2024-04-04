
// import { launchImageLibrary } from 'react-native-image-picker';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import React, { useState } from 'react';
// import { useNavigation } from '@react-navigation/native';


// export default function ScreenThree({ navigation }) {

//     const [selectedImage, setSelectedImage] = useState(null);


//     const openImagePicker = () => {
//       const options = {
//         mediaType: 'photo',
//         includeBase64: false,
//         maxHeight: 300,
//         maxWidth: 300,
//       };

//       launchImageLibrary(options, (response) => {
//         if (response.didCancel) {
//           console.log('User cancelled image picker');
//         } else if (response.error) {
//           console.log('Image picker error: ', response.error);
//         } else {
//           let imageUri = response.uri || response.assets?.[0]?.uri;
//           setSelectedImage(imageUri);
//         }
//       });
//     };

//     const postContent = () => {
//       // Replace this with your actual posting logic
//       console.log('Posting content:', {
//         title: 'Your Title', // Replace with the actual title
//         experience: 'Your Experience', // Replace with the actual experience
//         startDate: 'Your Start Date', // Replace with the actual start date
//         endDate: 'Your End Date', // Replace with the actual end date
//         requirements: 'Your Requirements', // Replace with the actual requirements
//         logo: selectedImage, // Replace with the actual logo
//       });

//       // After posting, you can navigate to the home or any other screen
//       navigation.navigate('FloatingButton'); // Replace 'Home' with your screen name
//     };

//   return (
//     <View>
//               <TouchableOpacity
//         onPress={() => navigation.navigate("ScreenTwo")}
//         style={{ backgroundColor: 'blue', borderRadius: 10, marginTop: 10, width: 100, alignSelf: 'center', top:30, right:140}}
//       >
//         <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 10 }}>Back</Text>
//         </TouchableOpacity>

//     <View style={{ borderWidth: 3, borderRadius: 10, margin: 5, borderColor: 'blue', backgroundColor: 'white', top: 120, overflow: 'scroll', paddingBottom: 50, shadowColor: '#080504', shadowOffset: { width: -2, height: 40 }, shadowOpacity: 0.2, shadowRadius: 50, elevation: 20 }}>
//       <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>Finally</Text>
//       <View style={{ borderWidth: 1, padding: 10 }}>
//         <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>Your Logo</Text>
//         {selectedImage && (
//           <Image
//             source={{ uri: selectedImage }}
//             style={{ width: 150, height: 250, alignSelf: 'center' }} // Adjust the dimensions as needed
//             resizeMode="contain"
//           />
//         )}
//       </View>
//       <TouchableOpacity
//         onPress={openImagePicker}
//         style={{ backgroundColor: 'blue', borderRadius: 10, marginTop: 10 }}>
//         <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 10 }}>
//           Select Your Logo
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={postContent} style={{ backgroundColor: 'blue', borderRadius: 10, marginTop: 10, width: 320, alignSelf: 'center' }}>
//         <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 10 }}>
//           Post
//         </Text>
//       </TouchableOpacity>
//     </View>
//     </View>
//   );
// }
// const style = StyleSheet.create({
//   Date: {
//     margin: 5,
//     top: 12
//   },
//   Text: {
//     margin: 0,
//     width: 320,
//     top: 10
//   },
//   TextStart: {
//     margin: 5
//   },
//   TextEnd: {
//     margin: 5
//   }
// });
//=====================================================================

import { launchImageLibrary } from 'react-native-image-picker';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { collection, addDoc } from '@react-native-firebase/firestore';
import app from '../../../FirebaseConfig';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import {getFirestore, collection, addDoc} from 'firebase/firestore'

export default function ScreenThree() {

  const [selectedImage, setSelectedImage] = useState(null);
  const route = useRoute()
  const navigation = useNavigation()
  const { TitleText, selected, startDate, endDate, inputText, items } = route.params
  const FormatedStartDate = startDate.toISOString().split('T')[0]
  const FormatedEndDate = endDate.toISOString().split('T')[0]
  const firestore = getFirestore(app);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 300,
      maxWidth: 300,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  const collectionName = 'Audition-Form';


  const postContent = async () => {
    try {
      const docRef = await addDoc(collection(firestore, collectionName), {
        title: TitleText,
        experience: selected,
        startDate: FormatedStartDate,
        endDate: FormatedEndDate,
        requirements: items,
        logo: selectedImage,
      });

      alert('Job Posted Successfull');
      console.log('Document written with ID: ', docRef.id);
      navigation.navigate('SearchBars', { TitleText, selected, startDate, endDate, inputText, selectedImage, collectionName });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <View style={{height:'100%',alignItems:'center',justifyContent:'center'}} >
      

      <View style={{ borderRadius: responsiveWidth(4), backgroundColor: '#e0e3e6', overflow: 'scroll', width: responsiveWidth(94), paddingVertical:responsiveHeight(2)}}>
        <View style={style.headerContainer}>
          <Image style={{
            height: responsiveHeight(12),
            width: responsiveWidth(25), alignSelf: 'center'
          }} source={require("../../Assets/Login_page/FH_logos.png")} />
          {/* <Text style={styles.header}>Login</Text> */}
        </View>
        <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: 'bold', color: 'black',alignSelf:'center',bottom:responsiveHeight(2),right:responsiveWidth(3) }}>Finally</Text>
       
        
        <TouchableOpacity
          onPress={openImagePicker}
          style={{ backgroundColor: '#001adc', borderColor: 'black', opacity: 0.8, borderWidth: responsiveWidth(0.3), width: responsiveWidth(40), height: responsiveHeight(4), borderRadius: responsiveWidth(2), justifyContent: 'center', alignItems: 'center', alignSelf:'center',padding:1 }}>
          <Text style={{ color: 'white', fontSize: responsiveFontSize(1.9), fontWeight: 'bold'}}>
            Select Your Logo
          </Text>
        </TouchableOpacity>
        <View style={{ margin: '2%' }}>
          {/* <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>Your Logo Comes Here</Text> */}
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: responsiveWidth(50), height: responsiveHeight(28), alignSelf: 'center' }} // Adjust the dimensions as needed
              resizeMode="contain"
            />
          )}
        </View>

        <View style={{ flexDirection: 'row', columnGap: responsiveWidth(20), marginTop:responsiveHeight(5) ,marginLeft:responsiveWidth(8)}}>
        <TouchableOpacity
           onPress={() => navigation.navigate("ScreenTwo", { TitleText, selected, startDate, endDate, inputText })}

            style={{ borderRadius: responsiveWidth(2),
              justifyContent: 'center',

              alignItems: 'center',

              borderWidth: responsiveWidth(0.4),
              backgroundColor: 'black',
              height: responsiveHeight(6),
              width: responsiveWidth(30), }}
          >
            {/* <Image
              source={require('../../Assets/Audition_Icons_Fonts/back.png')}
              style={{ width: responsiveWidth(10), height: responsiveHeight(5) }}
            /> */}
            <Text style={{ color: 'white',
                fontWeight: 'bold',
                textAlign: 'center', fontSize: responsiveFontSize(2), height: responsiveHeight(3)}}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={postContent} 

            style={{  backgroundColor: '#616161',
            // padding: responsiveWidth(2.5),
            borderRadius: responsiveWidth(2),
            justifyContent: 'center',
            alignItems: 'center',
            // alignSelf: 'center',
            height: responsiveHeight(6),
            width: responsiveWidth(30),
           // bottom: responsiveHeight(1.5)
           }}
          >
             <Text style={{ color: 'white',
                fontWeight: 'bold',
                textAlign: 'center', fontSize: responsiveFontSize(2), height: responsiveHeight(3)}}>Post</Text>
           
          </TouchableOpacity>
        </View>

       
      </View>
    </View>
  );
}
const style=StyleSheet.create({
  headerContainer: {
   
    marginTop:responsiveHeight(1),
   
    height: responsiveHeight(15),
    width: responsiveWidth(30),
    left:responsiveWidth(30)
    


  },

})