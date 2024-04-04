import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import VideoPlayer from 'react-native-video-player';


export default function Promote() {
  const navigation = useNavigation();
  const [selectedDays, setSelectedDays] = useState(1);
  const [inventoryCount, setInventoryCount] = useState(0); // Initial inventory count

  // Function to update inventory count based on slider value
  const handleSliderChange = (value) => {
    // Calculate the inventory count based on the slider's discrete steps
    const inventory = value * 20; // Assuming increments of Rs.10K
    setInventoryCount(inventory);
  };
  const handleSliderChangeDays = (value) => {
    // Update selected days based on the slider's value (from 1 to 30)
    setSelectedDays(Math.round(value)); // Rounds to the nearest integer
  };
  const images = [
    require('../../../Assets/app_logo/8641606.jpg'),
    require('../../../Assets/app_logo/8641615.jpg'),
    require('../../../Assets/app_logo/8641600.jpg'),
    require('../../../Assets/app_logo/8641612.jpg'),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const previousIndex = (currentIndex === 0 ? images.length - 1 : (currentIndex - 1));
  const nextIndex = (currentIndex === images.length - 1 ? 0 : (currentIndex + 1));
  const handlePromote = () => {
    navigation.navigate('PromoteEdit')
  }

  const handlePromoteDelete = () => {
    alert('Deleted Successfull')
    navigation.navigate('Homecontents')
  }
  const VideoSample = require('../../../Assets/app_logo/Netflix_Intro.mp4')
  return (
    <ScrollView>
    <View style={{ flex: 1 }}>
      <Text style={{ color: 'black', fontSize: responsiveFontSize(3),fontWeight:'600'}}>Promote:</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',  }}>
        <View style={{  width: responsiveWidth(60), height: responsiveHeight(30), justifyContent: 'center',alignItems: 'center' ,top:responsiveHeight(2)}}>
          <Image
            source={images[previousIndex]}
            style={{ width: responsiveWidth(50), height: responsiveHeight(25), position: 'absolute', left: -responsiveWidth(40) }}
            resizeMethod='resize'
          />
          <Image
            source={images[currentIndex]}
            style={{ width: responsiveWidth(45), height: responsiveHeight(30), alignSelf: 'center', zIndex: 2 }}
            resizeMethod='resize'
          />
          <Image
            source={images[nextIndex]}
            style={{ width: responsiveWidth(50), height: responsiveHeight(25), position: 'absolute', right: -responsiveWidth(40) }}
            resizeMethod='resize'
          />
          {/* Left and Right Arrows */}
          <TouchableOpacity onPress={() => setCurrentIndex(nextIndex)} style={{ position: 'absolute', left: responsiveWidth(48), bottom: responsiveWidth(20), zIndex: 3,}}>
      <View style={{ borderRadius: responsiveWidth(8), height: responsiveWidth(8), width: responsiveWidth(8), backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../../../Assets/app_logo/arrow-right.png')} style={{ borderRadius: responsiveWidth(8), height: responsiveWidth(8), width: responsiveWidth(8) }} />
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setCurrentIndex(previousIndex)} style={{ position: 'absolute', right: responsiveWidth(0), bottom: responsiveWidth(20), zIndex: 2, left: responsiveWidth(2),width:responsiveWidth(10) }}>
      <View style={{ borderRadius: responsiveWidth(8), height: responsiveWidth(8), width: responsiveWidth(8), backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../../../Assets/app_logo/arrow-left.png')} style={{ borderRadius: responsiveWidth(8), height: responsiveWidth(8), width: responsiveWidth(8) }} />
      </View>
    </TouchableOpacity>
  </View>
</View>

<View style={{marginTop:responsiveHeight(4),}}>
  <TouchableOpacity style={{borderWidth:1,width:responsiveWidth(30),height:responsiveHeight(5),alignItems:'center',justifyContent:'center',borderRadius:responsiveWidth(4),left:responsiveWidth(20),backgroundColor:'#000000'}} onPress={handlePromote}>
<Text style={{fontSize:responsiveFontSize(2),color:'white',fontWeight:'bold'}}>Edit</Text>
</TouchableOpacity>
</View>

<View style={{marginTop:responsiveHeight(5),left:responsiveWidth(40),bottom:responsiveHeight(10)}}>
<TouchableOpacity style={{borderWidth:1,width:responsiveWidth(30),height:responsiveHeight(5),alignItems:'center',justifyContent:'center',borderRadius:responsiveWidth(4),left:responsiveWidth(20),backgroundColor:'#000000'}} onPress={handlePromoteDelete}>
<Text style={{fontSize:responsiveFontSize(2),color:'white',fontWeight:'bold'}}>Delete</Text>
</TouchableOpacity>
</View>
    <View style={{ borderBottomWidth: 6,
        borderBottomColor: '#BDBDBD',
        marginVertical: responsiveHeight(1),bottom:responsiveHeight(9)}}></View>
    </View>
    {/* <Video source={VideoSample}  
       ref={(ref) => {
         this.player = ref
       }}                                      // Store reference
       onBuffer={this.onBuffer}                // Callback when remote video is buffering
       onError={this.videoError}               // Callback when video cannot be loaded
        /> */}

{/* <VideoPlayer
  video={require('../../../Assets/app_logo/Netflix_Intro.mp4')}
  autoplay={true} // Autoplay the video
  muted={true}    // Start with audio muted
  style={{ width: responsiveWidth(100), height: responsiveHeight(30) }} // Custom video player style
  videoWidth={responsiveWidth(100)}  // Set video width
  videoHeight={responsiveHeight(30)} // Set video height
/> */}
    </ScrollView>
  );
}


// import { useNavigation } from '@react-navigation/native';
// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import Slider from '@react-native-community/slider';

// export default function Promote() {
//   const navigation = useNavigation();
//   const [selectedDays, setSelectedDays] = useState(1);
//   const [inventoryCount, setInventoryCount] = useState(0); // Initial inventory count

//   // Function to update inventory count based on slider value
//   const handleSliderChange = (value) => {
//     // Calculate the inventory count based on the slider's discrete steps
//     const inventory = value * 20; // Assuming increments of Rs.10K
//     setInventoryCount(inventory);
//   };
//   const handleSliderChangeDays = (value) => {
//     // Update selected days based on the slider's value (from 1 to 30)
//     setSelectedDays(Math.round(value)); // Rounds to the nearest integer
//   };
//   const images = [
//     require('../../../Assets/app_logo/8641606.jpg'),
//     require('../../../Assets/app_logo/8641615.jpg'),
//     require('../../../Assets/app_logo/8641600.jpg'),
//     require('../../../Assets/app_logo/8641612.jpg'),
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const previousIndex = (currentIndex === 0 ? images.length - 1 : (currentIndex - 1));
//   const nextIndex = (currentIndex === images.length - 1 ? 0 : (currentIndex + 1));
//   const handlePromote = () => {
//     navigation.navigate('PromoteEdit')
//   }
//   return (
//     <ScrollView>
//     <View style={{ flex: 1 }}>
//       <Text style={{ color: 'black', fontSize: 23 }}>Promote:</Text>
//       <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginHorizontal: 100, marginTop: 20 }}>
//         <View style={{ position: 'relative', width: responsiveWidth(60), height: responsiveHeight(25), justifyContent: 'center', alignItems: 'center' }}>
//           <Image
//             source={images[previousIndex]}
//             style={{ width: responsiveWidth(50), height: responsiveHeight(25), position: 'absolute', left: -responsiveWidth(40) }}
//             resizeMethod='resize'
//           />
//           <Image
//             source={images[currentIndex]}
//             style={{ width: responsiveWidth(45), height: responsiveHeight(33), alignSelf: 'center', zIndex: 2 }}
//             resizeMethod='resize'
//           />
//           <Image
//             source={images[nextIndex]}
//             style={{ width: responsiveWidth(50), height: responsiveHeight(25), position: 'absolute', right: -responsiveWidth(40) }}
//             resizeMethod='resize'
//           />
//           {/* Left and Right Arrows */}
//           <TouchableOpacity onPress={() => setCurrentIndex(nextIndex)} style={{ position: 'absolute', left: responsiveWidth(48), bottom: responsiveWidth(30), zIndex: 3,}}>
//       <View style={{ borderRadius: responsiveWidth(10), height: responsiveWidth(10), width: responsiveWidth(10), backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
//         <Image source={require('../../../Assets/app_logo/arrow-right.png')} style={{ borderRadius: responsiveWidth(10), height: responsiveWidth(10), width: responsiveWidth(10) }} />
//       </View>
//     </TouchableOpacity>
//     <TouchableOpacity onPress={() => setCurrentIndex(previousIndex)} style={{ position: 'absolute', right: responsiveWidth(0), bottom: responsiveWidth(30), zIndex: 2, left: responsiveWidth(2),width:responsiveWidth(10) }}>
//       <View style={{ borderRadius: responsiveWidth(10), height: responsiveWidth(10), width: responsiveWidth(10), backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
//         <Image source={require('../../../Assets/app_logo/arrow-left.png')} style={{ borderRadius: responsiveWidth(10), height: responsiveWidth(10), width: responsiveWidth(10) }} />
//       </View>
//     </TouchableOpacity>
//   </View>
// </View>
// <View style={{marginTop:responsiveHeight(5)}}>
// <Text style={{textDecorationLine:'underline', fontSize:16,color:'black',fontWeight:'bold'}}>Set your Budget:</Text>
// </View>
// <View style={{borderRadius:responsiveWidth(6),width:responsiveWidth(6),height:responsiveWidth(6),backgroundColor:'black',left:responsiveWidth(90),top:responsiveHeight(-2.5)}}>
// <Text style={{fontSize:16,color:'white',fontWeight:'bold',alignSelf:'center',justifyContent:'center'}}>i</Text>
// </View>
// <View style={{left:responsiveWidth(10) }}>
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
//         <Text>0</Text>
//         <Text>10K</Text>
//       </View>
//       <Slider
//         style={{ width: '80%', marginBottom: 10 }}
//         minimumValue={0}
//         maximumValue={500}
//         step={1}
//         minimumTrackTintColor="#000000"
//         maximumTrackTintColor="#BDBDBD"
//         thumbTintColor="blue"
//         onValueChange={handleSliderChange}
//       />
//       <Text style={{left:responsiveWidth(40)}}>
//         {`₹ ${inventoryCount}`}</Text>
//     </View>
//     <View style={{ borderBottomWidth: 6,
//         borderBottomColor: '#BDBDBD',
//         marginVertical: responsiveHeight(1)}}></View>
//         <View style={{marginTop:responsiveHeight(3)}}>
// <Text style={{textDecorationLine:'underline', fontSize:16,color:'black',fontWeight:'bold'}}>Set your Days:</Text>
// </View>
// <View style={{borderRadius:responsiveWidth(6),width:responsiveWidth(6),height:responsiveWidth(6),backgroundColor:'black',left:responsiveWidth(90),top:responsiveHeight(-2.5)}}>
// <Text style={{fontSize:16,color:'white',fontWeight:'bold',alignSelf:'center',justifyContent:'center'}}>i</Text>
// </View>
// <View style={{left:responsiveWidth(10), }}>
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
//         <Text>1D</Text>
//         <Text>30D</Text>
//       </View>
//       <Slider
//           style={{ width: '80%', marginBottom: 10 }}
//           minimumValue={1}
//           maximumValue={30}
//           step={1}
//           minimumTrackTintColor="#000000"
//           maximumTrackTintColor="#BDBDBD"
//           thumbTintColor="blue"
//           onValueChange={handleSliderChangeDays}
//         />
// <Text style={{left:responsiveWidth(40)}}>{`${selectedDays} D`}</Text>
//     </View>
//     <View style={{ borderBottomWidth: 6,
//         borderBottomColor: '#BDBDBD',
//         marginVertical: responsiveHeight(1)}}></View>
//                <View style={{marginTop:responsiveHeight(3)}}>
// <Text style={{textDecorationLine:'underline', fontSize:16,color:'black',fontWeight:'bold'}}>Set your Target Audience:</Text>
// </View>
// <View style={{borderRadius:responsiveWidth(6),width:responsiveWidth(6),height:responsiveWidth(6),backgroundColor:'black',left:responsiveWidth(90),top:responsiveHeight(-2.5)}}>
// <Text style={{fontSize:16,color:'white',fontWeight:'bold',alignSelf:'center',justifyContent:'center'}}>i</Text>
// </View>
// <View style={{left:responsiveWidth(10), }}>
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
// <Text style={{fontSize:16,color:'black',fontWeight:'bold'}}>Location</Text>
// <TextInput
// placeholder='Target Location'
// style={{right:responsiveWidth(0),bottom:responsiveHeight(1.8),width:responsiveWidth(60),borderRadius:responsiveWidth(3)}}/>
//     </View>
//     <TouchableOpacity style={{backgroundColor:'#000000',fontWeight:'bold',left:responsiveWidth(65),borderWidth:1,width:responsiveWidth(23),height:responsiveHeight(5),alignItems:'center',justifyContent:'center',borderRadius:responsiveWidth(5),marginBottom:responsiveHeight(2)}}>
//       <Text style={{color:'white',fontWeight:'bold',fontSize:17}}>Promote</Text>
//     </TouchableOpacity>
//     </View>
//     {/* <View style={{ borderBottomWidth: 6,
//         borderBottomColor: '#BDBDBD',
//         marginVertical: responsiveHeight(1)}}>
//         </View> */}
//     </View>
//     </ScrollView>
//   );
// }