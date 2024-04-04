// import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
// import React from 'react'
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'


// const ShootinglocationPost = () => {
//   return (
// //    <ScrollView>
//     <View style={{justifyContent:'center',alignItems:'center'}}>
//       <Text style={{color:'black',fontWeight:'bold',margin:5,fontSize:responsiveHeight(2),fontStyle:"normal"}}>ShootinglocationPost</Text>
//       <View style={{flexDirection:'row',justifyContent:'center',borderWidth:responsiveWidth(0.5),width:'80%',height:'90%',}}>
//         <TouchableOpacity>

//         </TouchableOpacity>
//       {/* <Text style={{}}>filmhook001</Text> */}
//       </View>
//     </View>
//     // {/* </ScrollView> */}
//   )
// }

// export default ShootinglocationPost

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';
// import ImageCropPicker from 'react-native-image-crop-picker';
// import { TextInput } from 'react-native-paper';
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


// const ShootinglocationPost = () => {
//   const [images, setImages] = useState([]);
//   const [price, setPrice]=useState([]);
//   const [productDescription, setProductDescription] = useState('');
//   const [terms,setTerms]=useState();
//   const { width: screenWidth } = Dimensions.get('window');
//   const flexWrapStyle = screenWidth > 600 ? 'nowrap' : 'wrap';

//   const selectImages = () => {
//     ImageCropPicker.openPicker({ multiple: true }).then((response) => {
//       if (!response || response.length === 0) {
//         console.log('No images selected');
//         return;
//       }

//       const selectedImages = response.map((image) => ({
//         uri: image.path,
//         width: image.width,
//         height: image.height,
//       }));
//       setImages(selectedImages);
//     }).catch((error) => {
//       console.log('ImagePicker Error: ', error);
//     });
//   };

//   const cropImage = (index) => {
//     ImageCropPicker.openCropper({
//       path: images[index].uri,
//       width: responsiveWidth(80),
//       height: responsiveHeight(50),
//       cropping: true,
//       includeBase64: true,
//     }).then((croppedImage) => {
//       const newImages = [...images];
//       newImages[index].uri = croppedImage.path;
//       setImages(newImages);
//     });
//   };

//   return (
//     <ScrollView style={{flex:1}}>
//       <View style={{ justifyContent: 'center', alignItems: 'center',flex:1 }}>
//         <Text style={{ color: 'black', fontWeight: 'bold',marginTop:responsiveHeight(5), fontSize: responsiveHeight(2), fontStyle: "normal" }}>ShootinglocationPost</Text>
//         <View style={{width:responsiveWidth(85),marginTop:responsiveWidth(5)}}>
//         <ImageBackground source={require('../../Assets/AllSearch_Icon_And_Fonts/Update/new.png')} style={{width: '100%',

//       overflow:'hidden',
//     // backgroundColor: "lightblue",
//     // borderRadius: responsiveWidth(2),

//     }} resizeMode="stretch">

//         <View style={{borderWidth:1,width:responsiveWidth(70),  marginTop:responsiveHeight(1),padding:responsiveWidth(2),alignSelf: 'center'}}>
//         <TouchableOpacity onPress={selectImages}>
//           <Text>Select Images</Text>
//         </TouchableOpacity>
//         <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
//           {images.map((image, index) => (
//             <TouchableOpacity key={index} onPress={() => cropImage(index)}>
//               <Image source={{ uri: image.uri }} style={{ width: 100, height: 100, margin: 5 }} />
//             </TouchableOpacity>
//           ))}
//           </View>
//         </View>
//         <TextInput placeholder='you paste a link here' style={{
//           marginTop:responsiveHeight(1),borderWidth:responsiveWidth(0.4),padding:responsiveWidth(2),width:responsiveWidth(70),height:responsiveHeight(4),alignSelf: 'center'
//         }}
//         />
//        <TextInput style={{width:responsiveWidth(70),height:responsiveHeight(4), marginTop: responsiveHeight(1),
//             borderWidth: responsiveWidth(0.4), padding: responsiveWidth(2), alignSelf: 'center'}} placeholder='price'>

//         </TextInput>
//         <TextInput
//           placeholder='Your Product Description'
//           multiline
//           value={productDescription}
//           onChangeText={setProductDescription}
//           style={{
//             marginTop: responsiveHeight(1),
//             borderWidth: responsiveWidth(0.4),
//             //  borderColor: '#004242',
//             borderRadius: responsiveWidth(2),
//             padding: responsiveWidth(2),
//             overflow: 'scroll',
//             width: responsiveWidth(70), alignSelf: 'center'
//           }} />
//           <TextInput placeholder='terms&condition' multiline
//           value={terms} onChangeText={setTerms} style={{marginTop: responsiveHeight(1),
//             borderWidth: responsiveWidth(0.4),
//             padding: responsiveWidth(2),
//             overflow:'scroll',width:responsiveWidth(70),
//             alignSelf:'center',height:responsiveHeight(4)}} />
//             <View style={{width:responsiveWidth(70),height:responsiveHeight(4),borderWidth:responsiveWidth(0.2),marginTop:responsiveHeight(3),padding:responsiveWidth(2),alignSelf:'center',bottom:responsiveHeight(1.8)}}>
//               <Text>
//               filmhook001
//               </Text>
//             </View>
//             </ImageBackground>
//             </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default ShootinglocationPost;


import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, ImageBackground, StyleSheet, TextInput } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';

import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


const ShootinglocationPost = () => {
  const [images, setImages] = useState([]);

  const [productDescription, setProductDescription] = useState('');
  const [terms, setTerms] = useState();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const { width: screenWidth } = Dimensions.get('window');
  const flexWrapStyle = screenWidth > 600 ? 'nowrap' : 'wrap';

  const selectImages = () => {
    ImageCropPicker.openPicker({ multiple: true }).then((response) => {
      if (!response || response.length === 0) {
        console.log('No images selected');
        return;
      }

      const selectedImages = response.map((image) => ({
        uri: image.path,
        width: image.width,
        height: image.height,
      }));
      setImages(selectedImages);
    }).catch((error) => {
      console.log('ImagePicker Error: ', error);
    });
  };

  const cropImage = (index) => {
    ImageCropPicker.openCropper({
      path: images[index].uri,
      width: responsiveWidth(80),
      height: responsiveHeight(50),
      cropping: true,
      includeBase64: true,
    }).then((croppedImage) => {
      const newImages = [...images];
      newImages[index].uri = croppedImage.path;
      setImages(newImages);
    });
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#f5f5f5', }}>
        <Text style={{ color: 'black', fontWeight: 'bold', marginTop: responsiveHeight(5), fontSize: responsiveHeight(2), fontStyle: "normal" }}>ShootinglocationPost</Text>
        <View style={{ width: responsiveWidth(85), marginTop: responsiveWidth(5) }}>
          {/* <ImageBackground source={require('../../Assets/AllSearch_Icon_And_Fonts/Update/new.png')} style={{width: '100%',
      
      overflow:'hidden',
    // backgroundColor: "lightblue",
    // borderRadius: responsiveWidth(2),
    
    }} resizeMode="stretch"> */}
          {/* <View style={styles.boxContent}> */}
          <View style={styles.boxContent}>

            <ImageBackground style={styles.inputContainer} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
              <TextInput
                placeholder="Title"
                // placeholderTextColor="black"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
            </ImageBackground>
          </View>
          <View style={styles.boxContent}>

            <ImageBackground style={styles.inputContainer} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
              <TextInput placeholder='price' keyboardType={'phone-pad'} value={price} onChangeText={setPrice}style={styles.input}>

              </TextInput>
            </ImageBackground>
          </View>
          <View style={{ width: responsiveWidth(86.7), marginTop: responsiveHeight(1), alignSelf: 'center', borderRadius: responsiveHeight(1), }}>

            <ImageBackground style={styles.inputContainerchange} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">

              <TouchableOpacity onPress={selectImages}>
                <Text>Select Images</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                {images.map((image, index) => (
                  <TouchableOpacity key={index} onPress={() => cropImage(index)}>
                    <Image source={{ uri: image.uri }} style={{ width: 100, height: 100, margin: 5 }} />
                  </TouchableOpacity>
                ))}
              </View>
            </ImageBackground>
          </View>

          {/* </View> */}
          {/* <TextInput placeholder='paste your location link here' style={{
          marginTop:responsiveHeight(1),borderWidth:responsiveWidth(0.4),padding:responsiveWidth(2),width:responsiveWidth(70),height:responsiveHeight(4),alignSelf: 'center'
        }}
        /> */}
          
          <View style={styles.boxContentchange}>

            <ImageBackground style={styles.inputContainerchange1} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
          <TextInput
            placeholder='Location Description'
            multiline
            value={productDescription}
            onChangeText={setProductDescription}
            // style={{
            //   marginTop: responsiveHeight(1),
            //   borderWidth: responsiveWidth(0.4),
            //   //  borderColor: '#004242',
            //   borderRadius: responsiveWidth(2),
            //   padding: responsiveWidth(2),
            //   overflow: 'scroll',
            //   width: responsiveWidth(70), alignSelf: 'center'
            // }} 
            style={{
              overflow: 'scroll',
            }}
            />
            </ImageBackground>
            </View>
            <View style={styles.boxContentchange}>

<ImageBackground style={styles.inputContainerchange1} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
          <TextInput placeholder='Terms&Condition' multiline
            value={terms} onChangeText={setTerms} 
            // style={{
            //   marginTop: responsiveHeight(1),
            //   borderWidth: responsiveWidth(0.4),
            //   padding: responsiveWidth(2),
            //   overflow: 'scroll', width: responsiveWidth(70),
            //   alignSelf: 'center',
            // }} 
            />
             </ImageBackground>
            </View>
          {/* <View style={{ width: responsiveWidth(70), height: responsiveHeight(4), borderWidth: responsiveWidth(0.2), marginTop: responsiveHeight(3), padding: responsiveWidth(2), alignSelf: 'center', bottom: responsiveHeight(1.8) }}>
            <Text>
              filmhook001
            </Text>
          </View> */}
          {/* </ImageBackground> */}
        </View>
        <View style={{ width: responsiveWidth(25), height: responsiveHeight(5),borderWidth:responsiveWidth(0.2),marginTop:responsiveHeight(2),justifyContent:'center',alignItems:'center'}}>
          <Text>post</Text>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  boxContent: {
    height: responsiveHeight(8.3),
    width: responsiveWidth(86),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
    borderRadius: responsiveWidth(3.2),
    // borderWidth: responsiveWidth(0.3),
    color: 'black',
    marginTop: responsiveHeight(2)
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(8.4),
    width: responsiveWidth(86.7),
    margin: responsiveWidth(1),
    color: 'black',
    resizeMode: 'stretch',
    zIndex: -1,
  },
  inputContainerchange: {
    width: responsiveWidth(86.7),
    marginTop: responsiveHeight(1),
    alignSelf: 'center',
    borderRadius: responsiveHeight(1),
    padding: 24
  },
  input: {

    height: responsiveHeight(6),
    borderColor: 'black',
    width: '90%',
    fontSize: responsiveFontSize(2),
    // right: responsiveWidth(2),
    // color: 'black',
    // fontWeight: '500'
  },
  boxContentchange:{
    width: responsiveWidth(86.7), marginTop: responsiveHeight(1), alignSelf: 'center', borderRadius: responsiveHeight(1),
  },
  inputContainerchange1:{
    width: responsiveWidth(86.7),
    marginTop: responsiveHeight(1),
    alignSelf: 'center',
    borderRadius: responsiveHeight(1),
    padding:10
  }
})

export default ShootinglocationPost;


// import React, { useState } from 'react';
// import { View, TextInput, ImageBackground, StyleSheet } from 'react-native';
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

// const ShootinglocationPost = () => {
//   const [productDescription, setProductDescription] = useState('');
//   const [lineNumber, setLineNumber] = useState(1);

//   const handleKeyPress = ({ nativeEvent }) => {
//     if (nativeEvent.key === 'Enter') {
//       setProductDescription((prevDescription) => prevDescription + `\n${lineNumber + 1}`);
//       setLineNumber(lineNumber + 1);
//     }
//   };

//   return (
//     <View style={styles.boxContentchange}>
//       <ImageBackground style={styles.inputContainerchange1} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch">
//         <TextInput
//           placeholder={`Your Product Description\n1`}
//           multiline
//           value={productDescription}
//           onChangeText={setProductDescription}
//           onKeyPress={handleKeyPress}
//           style={{
//             overflow: 'scroll',
//           }}
//         />
//       </ImageBackground>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   boxContentchange: {
//     width: responsiveWidth(86.7), marginTop: responsiveHeight(1), alignSelf: 'center', borderRadius: responsiveHeight(1),
//   },
//   inputContainerchange1: {
//     width: responsiveWidth(86.7),
//     marginTop: responsiveHeight(1),
//     alignSelf: 'center',
//     borderRadius: responsiveHeight(1),
//     padding: 10
//   }
// });

// export default ShootinglocationPost;



