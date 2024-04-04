


// import React, { useState, useEffect } from 'react';
// import { View, Text, StatusBar, Image, TouchableOpacity, TextInput, Animated, FlatList, Dimensions } from 'react-native';
// import Ionic from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';

// const { width } = Dimensions.get('window');

// const Status = ({ route, navigation }) => {
//   const { story } = route.params;

//   useEffect(() => {
//     let timer = setTimeout(() => {
//       navigation.goBack();
//     }, 5000);

//     Animated.timing(progress, {
//       toValue: 5,
//       duration: 5000,
//       useNativeDriver: false,
//     }).start();
//     return () => clearTimeout(timer);
//   }, []);

//   const [progress, setProgress] = useState(new Animated.Value(0));

//   const progressAnimation = progress.interpolate({
//     inputRange: [0, 5],
//     outputRange: ['0%', '100%'],
//   });

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const renderPhotoSlider = ({ item }) => (
//     <Image
//       source={{ uri: item.path }}
//       style={{ width: width, height: width, marginVertical: 10 }}
//       resizeMode="cover"
//     />
//   );

//   const handleNext = () => {
//     if (currentIndex < story.images.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   return (
//     <View style={{ backgroundColor: 'black', height: '100%', position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
//       <StatusBar backgroundColor="black" barStyle="light-content" />
//       <View style={{ height: 3, width: '95%', borderWidth: 1, backgroundColor: 'gray', position: 'absolute', top: 18 }}>
//         <Animated.View style={{ height: '100%', backgroundColor: 'white', width: progressAnimation }}></Animated.View>
//       </View>
//       <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
//         <Text style={{ color: 'white', fontSize: 15, paddingLeft: 10 }}>Status Name: {story.name}</Text>
//         <Text style={{ color: 'white', fontSize: 15, paddingLeft: 10 }}>Profession: {story.profession}</Text>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionic name="close" style={{ fontSize: 20, color: 'red', opacity: 0.6 }} />
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         data={story.images}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         renderItem={renderPhotoSlider}
//         keyExtractor={(item, index) => index.toString()}
//         onScroll={(event) => {
//           const { contentOffset } = event.nativeEvent;
//           const index = Math.round(contentOffset.x / width);
//           setCurrentIndex(index);
//         }}
//       />
//       <View style={{ position: 'absolute', bottom: 0, left: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: 10, width: '100%' }}>
//         <TouchableOpacity onPress={handlePrev}>
//           <Feather name="chevron-left" style={{ fontSize: 30, color: 'white' }} />
//         </TouchableOpacity>
//         <Text style={{ color: 'white' }}>{currentIndex + 1}/{story.images.length}</Text>
//         <TouchableOpacity onPress={handleNext}>
//           <Feather name="chevron-right" style={{ fontSize: 30, color: 'white' }} />
//         </TouchableOpacity>
//       </View>
//       <View style={{ position: 'absolute', bottom: 50, left: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
//         <TextInput
//           placeholder="send message"
//           placeholderTextColor="white"
//           style={{ borderColor: 'white', borderRadius: 25, width: '85%', height: 50, paddingLeft: 20, borderWidth: 1, fontSize: 20, color: 'white' }}
//         />
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Feather name="navigation" style={{ fontSize: 30, color: 'white' }} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Status;

//this code work but small issus
// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StatusBar, Image, TouchableOpacity, TextInput, Animated, FlatList, Dimensions } from 'react-native';
// import Ionic from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';

// const { width } = Dimensions.get('window');

// const Status = ({ route, navigation }) => {
//   const { story } = route.params;
//   const flatListRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const progress = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     let timer;
//     const startAutoScroll = () => {
//       timer = setInterval(() => {
//         let nextIndex = currentIndex + 1;
//         if (nextIndex >= story.images.length) {
//           nextIndex = 0;
//           clearInterval(timer); // Stop auto-scrolling at the end of the images
//           navigation.goBack(); // Go back when all images have been scrolled
//         }
//         flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
//         setCurrentIndex(nextIndex);
//       }, 5000); // Change the interval as per your requirement
//     };

//     startAutoScroll();

//     return () => {
//       clearInterval(timer);
//     };
//   }, [currentIndex, navigation, story.images.length]);

//   const renderPhotoSlider = ({ item }) => (
//     <Image
//       source={{ uri: item.path }}
//       style={{ width: width, height: width, marginVertical: 10 }}
//       resizeMode="cover"
//     />
//   );

//   return (
//     <View style={{ backgroundColor: 'black', height: '100%', position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
//       <StatusBar backgroundColor="black" barStyle="light-content" />
//       <View style={{ height: 3, width: '95%', borderWidth: 1, backgroundColor: 'gray', position: 'absolute', top: 18 }}>
//         <Animated.View style={{ height: '100%', backgroundColor: 'white', width: progress.interpolate({
//           inputRange: [0, width * (story.images.length - 1)],
//           outputRange: ['0%', '100%'],
//         }) }}></Animated.View>
//       </View>
//       <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
//         <Text style={{ color: 'white', fontSize: 15, paddingLeft: 10 }}>Status Name: {story.name}</Text>
//         <Text style={{ color: 'white', fontSize: 15, paddingLeft: 10 }}>Profession: {story.profession}</Text>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionic name="close" style={{ fontSize: 20, color: 'red', opacity: 0.6 }} />
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         ref={flatListRef}
//         data={story.images}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         renderItem={renderPhotoSlider}
//         keyExtractor={(item, index) => index.toString()}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: progress } } }],
//           { useNativeDriver: false }
//         )}
//       />
//       <View style={{ position: 'absolute', bottom: 50, left: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
//         <TextInput
//           placeholder="send message"
//           placeholderTextColor="white"
//           style={{ borderColor: 'white', borderRadius: 25, width: '85%', height: 50, paddingLeft: 20, borderWidth: 1, fontSize: 20, color: 'white' }}
//         />
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Feather name="navigation" style={{ fontSize: 30, color: 'white' }} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Status;



// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StatusBar, Image, TouchableOpacity, TextInput, Animated, FlatList, Dimensions } from 'react-native';
// import Ionic from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';

// const { width } = Dimensions.get('window');

// const Status = ({ route, navigation }) => {
//   const { story } = route.params;
//   const flatListRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const progress = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     let timer;
//     const startAutoScroll = () => {
//       timer = setInterval(() => {
//         let nextIndex = currentIndex + 1;
//         if (nextIndex >= story.images.length) {
//           nextIndex = 0;
//         }
//         if (flatListRef.current) {
//           flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
//         }
//         setCurrentIndex(nextIndex);
//       }, 5000); // Change the interval as per your requirement
//     };

//     const stopAutoScroll = () => {
//       clearInterval(timer);
//     };

//     startAutoScroll();

//     return () => {
//       stopAutoScroll();
//     };
//   }, [currentIndex, story.images.length]);

//   const renderPhotoSlider = ({ item }) => (
//     <Image
//       source={{ uri: item.path }}
//       style={{ width: width, height: width, marginVertical: 10 }}
//       resizeMode="cover"
//     />
//   );

//   const handleNext = () => {
//     if (currentIndex < story.images.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   const navigateToHome = () => {
//     navigation.goBack();
//   };

//   return (
//     <View style={{ backgroundColor: 'black', height: '100%', position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
//       <StatusBar backgroundColor="black" barStyle="light-content" />
//       <View style={{ height: 3, width: '95%', borderWidth: 1, backgroundColor: 'gray', position: 'absolute', top: 18 }}>
//         <Animated.View style={{ height: '100%', backgroundColor: 'white', width: progress.interpolate({
//           inputRange: [0, width * (story.images.length - 1)],
//           outputRange: ['0%', '100%'],
//         }) }}></Animated.View>
//       </View>
//       <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
//         <Text style={{ color: 'white', fontSize: 15, paddingLeft: 10 }}>Status Name: {story.name}</Text>
//         <Text style={{ color: 'white', fontSize: 15, paddingLeft: 10 }}>Profession: {story.profession}</Text>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionic name="close" style={{ fontSize: 20, color: 'red', opacity: 0.6 }} />
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         ref={flatListRef}
//         data={story.images}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         renderItem={renderPhotoSlider}
//         keyExtractor={(item, index) => index.toString()}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: progress } } }],
//           { useNativeDriver: false }
//         )}
//         onMomentumScrollEnd={(event) => {
//           const contentOffset = event.nativeEvent.contentOffset.x;
//           const index = Math.floor(contentOffset / width);
//           if (index === story.images.length - 1) {
//             // Last image reached, navigate to home page
//             navigateToHome();
//           }
//         }}
//       />
//       <View style={{ position: 'absolute', bottom: 50, left: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
//         <TextInput
//           placeholder="send message"
//           placeholderTextColor="white"
//           style={{ borderColor: 'white', borderRadius: 25, width: '85%', height: 50, paddingLeft: 20, borderWidth: 1, fontSize: 20, color: 'white' }}
//         />
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Feather name="navigation" style={{ fontSize: 30, color: 'white' }} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Status;
//this code work 

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StatusBar, Image, TextInput, Animated, FlatList, Dimensions, TouchableOpacity, } from 'react-native';
// import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

// import Video from 'react-native-video';

const { width } = Dimensions.get('window');

const Status = ({ route, navigation }) => {
  const { story } = route.params;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let timer;
    const startAutoScroll = () => {
      timer = setInterval(() => {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= story.images.length) {
          nextIndex = 0;
          clearInterval(timer); // Stop auto-scrolling at the end of the images
          navigation.goBack(); // Go back when all images have been scrolled
        }
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        }
        setCurrentIndex(nextIndex);
      }, 5000); // Change the interval as per your requirement
    };

    startAutoScroll();

    return () => {
      clearInterval(timer);
    };
  }, [currentIndex, navigation, story.images.length]);

  const renderPhotoSlider = ({ item }) => (
    <Image
      source={{ uri: item.path }}
      style={{ width: width, height: width, marginVertical: 10 }}
      resizeMode="cover"
    />
  );



  
  return (
    <View style={{ backgroundColor: 'black', height: '100%', position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={{ height: 3, width: '95%', borderWidth: 1, backgroundColor: 'gray', position: 'absolute', top: responsiveHeight(9.5)}}>
        <Animated.View style={{
          height: '100%', backgroundColor: 'white', width: progress.interpolate({
            inputRange: [0, width * (story.images.length - 1)],
            outputRange: ['0%', '100%'],
          })
        }}></Animated.View>
      </View>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          width: responsiveWidth(14),
          height: responsiveHeight(7),
          top: responsiveHeight(2),
          // right: responsiveWidth(43),
          // borderWidth: responsiveWidth(0.5),
          // borderColor: 'red',
          right:responsiveWidth(40),
          borderRadius: responsiveHeight(5),
        }}
      >
        <Image
        source={require('../../../Assets/app_logo/8641606.jpg')}
        style={{
          width: responsiveWidth(14),
          height: responsiveHeight(7),
          // position: 'absolute',
          borderRadius: responsiveHeight(5),
          
        
        }}
        resizeMode="stretch"
      />
      </TouchableOpacity>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%',left:responsiveWidth(18),bottom:responsiveHeight(3) }}>
        <Text style={{ color: 'white', fontSize: 15, }}> {story.name}
        </Text>


        {/* <Text style={{ color: 'white', fontSize: 15, paddingLeft: 10 }}>Profession: {story.profession}</Text> */}
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionic name="close" style={{ fontSize: 20, color: 'red', opacity: 0.6 }} />
        </TouchableOpacity> */}
      </View>
      <FlatList
        ref={flatListRef}
        data={story.images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderPhotoSlider}
        keyExtractor={(item, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: progress } } }],
          { useNativeDriver: false }
        )}
      />
      <View style={{ position: 'absolute',bottom:responsiveHeight(2),left: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '90%' }}>
        <TextInput
          placeholder="send message"
          placeholderTextColor="white"
          style={{ borderColor: 'white', borderRadius: 25, width: responsiveWidth(70), height: responsiveHeight(6), paddingLeft: 20, borderWidth: 1, fontSize: 20, color: 'white', left: responsiveWidth(9) }}
        />
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center' }}>
          <Feather name="navigation" style={{ fontSize: 30, color: 'white', left: responsiveWidth(10) }} />
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default Status;


// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StatusBar, Image, TextInput, Animated, FlatList, Dimensions, TouchableOpacity } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import ImagePicker from 'react-native-image-crop-picker';
// import Video from 'react-native-video';

// const { width } = Dimensions.get('window');

// const Status = ({ route, navigation }) => {
//   const { story } = route.params;
//   const flatListRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const progress = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     let timer;
//     if (story && story.media) {
//       const startAutoScroll = () => {
//         timer = setInterval(() => {
//           let nextIndex = currentIndex + 1;
//           if (nextIndex >= story.media.length) {
//             nextIndex = 0;
//             clearInterval(timer); // Stop auto-scrolling at the end of the media
//             navigation.goBack(); // Go back when all media have been scrolled
//           }
//           if (flatListRef.current) {
//             flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
//           }
//           setCurrentIndex(nextIndex);
//         }, 5000); // Change the interval as per your requirement
//       };

//       startAutoScroll();
//     }

//     return () => {
//       clearInterval(timer);
//     };
//   }, [currentIndex, navigation, story]);

//   const renderMedia = ({ item }) => {
//     if (item.isVideo) {
//       return (
//         <Video
//           source={{ uri: item.path }}
//           style={{ width: width, height: width, marginVertical: 10 }}
//           resizeMode="cover"
//           repeat
//           controls
//         />
//       );
//     } else {
//       return (
//         <Image
//           source={{ uri: item.path }}
//           style={{ width: width, height: width, marginVertical: 10 }}
//           resizeMode="cover"
//         />
//       );
//     }
//   };

//   const handleImageOption = async () => {
//     try {
//       const media = await ImagePicker.openPicker({
//         mediaType: 'any',
//       });
//       updateStory(media, media.mime.includes('video'));
//     } catch (error) {
//       console.log('Media picker operation canceled or failed:', error);
//     }
//   };

//   const updateStory = (media, isVideo = false) => {
//     const existingStory = stories.find((s) => s.id === 'unique_id');
//     if (existingStory) {
//       existingStory.media = [...existingStory.media, { path: media.path, isVideo }];
//       setStories([...stories.filter((s) => s.id !== 'unique_id'), existingStory]);
//     } else {
//       const newStory = {
//         id: 'unique_id',
//         media: [{ path: media.path, isVideo }],
//         name: 'Sharukkhan',
//         profession: 'Actor',
//       };
//       setStories([...stories, newStory]);
//     }
//   };

//   return (
//     <View style={{ backgroundColor: 'black', height: '100%', position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
//       <StatusBar backgroundColor="black" barStyle="light-content" />
//       <View style={{ height: 3, width: '95%', borderWidth: 1, backgroundColor: 'gray', position: 'absolute', top: responsiveHeight(9.5) }}>
//         <Animated.View style={{
//           height: '100%', backgroundColor: 'white', width: progress.interpolate({
//             inputRange: [0, width * (story.media ? story.media.length - 1 : 0)],
//             outputRange: ['0%', '100%'],
//           })
//         }}></Animated.View>
//       </View>
//       <TouchableOpacity
//         style={{
//           borderWidth: 1,
//           width: responsiveWidth(14),
//           height: responsiveHeight(7),
//           top: responsiveHeight(2),
//           right: responsiveWidth(40),
//           borderRadius: responsiveHeight(5),
//         }}
//         onPress={handleImageOption}
//       >
//         <Image
//           source={require('../../../Assets/app_logo/8641606.jpg')}
//           style={{
//             width: responsiveWidth(14),
//             height: responsiveHeight(7),
//             borderRadius: responsiveHeight(5),
//           }}
//           resizeMode="stretch"
//         />
//       </TouchableOpacity>
//       <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%', left: responsiveWidth(18), bottom: responsiveHeight(3) }}>
//         <Text style={{ color: 'white', fontSize: 15 }}>{story.name}</Text>
//       </View>
//       <FlatList
//         ref={flatListRef}
//         data={story.media ? story.media : []}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         renderItem={renderMedia}
//         keyExtractor={(item, index) => index.toString()}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: progress } } }],
//           { useNativeDriver: false }
//         )}
//       />
//       <View style={{ position: 'absolute', bottom: 50, left: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '90%' }}>
//         <TextInput
//           placeholder="send message"
//           placeholderTextColor="white"
//           style={{ borderColor: 'white', borderRadius: 25, width: responsiveWidth(70), height: responsiveHeight(6), paddingLeft: 20, borderWidth: 1, fontSize: 20, color: 'white', left: responsiveWidth(9) }}
//         />
//         <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center' }}>
//           <Feather name="navigation" style={{ fontSize: 30, color: 'white', left: responsiveWidth(10) }} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Status;


