
//this code work 

// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StatusBar, Image, TextInput, Animated, FlatList, Dimensions, TouchableOpacity, } from 'react-native';
// // import Ionic from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

// // import Video from 'react-native-video';

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
//         if (flatListRef.current) {
//           flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
//         }
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
//       <View style={{ height: 3, width: '95%', borderWidth: 1, backgroundColor: 'gray', position: 'absolute', top: responsiveHeight(9.5)}}>
//         <Animated.View style={{
//           height: '100%', backgroundColor: 'white', width: progress.interpolate({
//             inputRange: [0, width * (story.images.length - 1)],
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
//           // right: responsiveWidth(43),
//           // borderWidth: responsiveWidth(0.5),
//           // borderColor: 'red',
//           right:responsiveWidth(40),
//           borderRadius: responsiveHeight(5),
//         }}
//       >
//         <Image
//         source={require('../../../Assets/app_logo/8641606.jpg')}
//         style={{
//           width: responsiveWidth(14),
//           height: responsiveHeight(7),
//           // position: 'absolute',
//           borderRadius: responsiveHeight(5),
          
        
//         }}
//         resizeMode="stretch"
//       />
//       </TouchableOpacity>
//       <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%',left:responsiveWidth(18),bottom:responsiveHeight(3) }}>
//         <Text style={{ color: 'white', fontSize: 15, }}> {story.name}
//         </Text>


//         {/* <Text style={{ color: 'white', fontSize: 15, paddingLeft: 10 }}>Profession: {story.profession}</Text> */}
//         {/* <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionic name="close" style={{ fontSize: 20, color: 'red', opacity: 0.6 }} />
//         </TouchableOpacity> */}
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
//       <View style={{ position: 'absolute',bottom:responsiveHeight(2),left: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '90%' }}>
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

  const [userPost, setUserPost] = useState([]);

  useEffect(() => {
    const fetchUserPost = async () => {
      try {
        const posts = await privateAPI.get(`user/stories/getUserStories?userId=3`);
        setUserPost(posts.data.data);
        console.log("Fetched User Post", posts.data);
      } catch (e) {
        console.log("Fetching Failed in user post", e);
      }
    }
    fetchUserPost();
  }, []);

  const Datas = ({ item }) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
      fetchImage(item.fileId);
    }, [item.fileId]);

    const fetchImage = async (fileId) => {
      try {
        console.log(`Fetching File id - ${fileId}`)
        const jwt = await AsyncStorage.getItem("jwt");
        const response = await fetch(`https://filmhook.annularprojects.com/filmhook-0.0.1-SNAPSHOT/stories/downloadStoryFile?userId=3&category=Stories&fileId=${fileId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }

        const imageBlob = await response.blob();
        const base64Data = await blobToBase64(imageBlob);

        // Assuming you receive a single image as base64 data
        const base64Image = base64Data.split(',')[1];
        setImageUrl(base64Image);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch image');
      }
    };

    const blobToBase64 = async (blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Failed to convert blob to base64'));
        reader.readAsDataURL(blob);
      });
    };



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
        <View style={{ height: 3, width: '95%', borderWidth: 1, backgroundColor: 'gray', position: 'absolute', top: responsiveHeight(9.5) }}>
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
            right: responsiveWidth(40),
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
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%', left: responsiveWidth(18), bottom: responsiveHeight(3) }}>
          <Text style={{ color: 'white', fontSize: 15, }}> {story.name}
          </Text>


          {/* <Text style={{ color: 'white', fontSize: 15, paddingLeft: 10 }}>Profession: {story.profession}</Text> */}
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionic name="close" style={{ fontSize: 20, color: 'red', opacity: 0.6 }} />
        </TouchableOpacity> */}
        </View>
        <FlatList
          ref={flatListRef}
          data={userpost}
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
        <View style={{ position: 'absolute', bottom: responsiveHeight(2), left: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '90%' }}>
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
}

export default Status;