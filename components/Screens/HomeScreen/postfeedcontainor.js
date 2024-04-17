// import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, TextInput, ScrollView, Share } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import Modal from 'react-native-modal'
// import ImagePicker from 'react-native-image-crop-picker'
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

// export default function Postfeedcontainor() {

//   //-------------------------------------------
//   const LongTextComponent = ({ text }) => {
//     const [showFullText, setShowFullText] = useState(false);

//     const toggleTextVisibility = () => {
//       setShowFullText(!showFullText);
//     };

//     const handleSeeLess = () => {
//       setShowFullText(false);
//     };

//     return (
//       <View style={{
//         width: responsiveWidth(94), padding: responsiveWidth(1), left: responsiveWidth(2)
//       }}>
//         <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: "400", lineHeight: responsiveHeight(2.5), color: "#000000", textAlign: 'justify', flexDirection: 'row' }} numberOfLines={showFullText ? undefined : 3}>
//           {text}
//         </Text>
//         {text.length > 3 && (
//           <View>
//             {showFullText ? (
//               <TouchableOpacity onPress={handleSeeLess}>
//                 <Text style={{ color: 'blue' }}>See Less</Text>
//               </TouchableOpacity>
//             ) : (
//               <TouchableOpacity onPress={toggleTextVisibility}>
//                 <Text style={{ color: 'blue' }}>See More</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         )}
//       </View>
//     );
//   };

//   const [selectedItem, setSelectedItem] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);

//   const openModal = (item) => {
//     setSelectedItem(item);
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };



//   const data = [
//     {
//       id: 1,
//       profilepic: require('../../../components/Assets/app_logo/8641606.jpg'),
//       name: "SharukKhan",
//       profession: 'actor',
//       place: 'New York , United States',
//       time: '10h',
//       view_type: 'public',
//       views: '5.2k',
//       caption: 'It is a long established fact that a reader will be distracted by the the the  readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
//       image: require('../../../components/Assets/app_logo/8641612.jpg'),
//     }, {
//       id: 2,
//       profilepic: require('../../../components/Assets/app_logo/deepika.jpg'),
//       name: "Dheepika",
//       profession: 'actor',
//       place: 'New York , United States',
//       time: '10h',
//       view_type: 'industry',
//       views: '5.2k',
//       caption: 'It is a long established fact that a reader will be distracted by the the the  readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
//       image: require('../../../components/Assets/app_logo/8641602.jpg'),
//     }, {
//       id: 3,
//       profilepic: require('../../../components/Assets/app_logo/salman-Khan-header-1.jpg'),
//       name: "SalmonKhan",
//       profession: 'actor',
//       place: 'New York , United States',
//       time: '10h',
//       view_type: 'public',
//       views: '5.2k',
//       caption: 'It is a long established fact that a reader will be distracted by the the the  readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
//       image: require('../../../components/Assets/app_logo/8641615.jpg'),
//     }
//   ]

//   //renderitem lists
//   const Datas = ({ id, profilepic, name, profession, place, caption, image, view_type }) => {

//     // for number format functions

//     const options = {
//       notation: 'compact',
//       compactDisplay: 'short'
//     }

//     function formatCmpctNumber(number) {
//       const usformatter = Intl.NumberFormat('en-US', options);
//       return usformatter.format(number)
//     }

//     // for number format functions
//     // ==============================================
//     //for like and dislike
//     const [like, setLike] = useState(0)
//     const [hitlike, setHitlike] = useState(false)

//     const onLikePress = (id) => {
//       console.log(id);
//       setHitlike(!hitlike)
//       setLike(hitlike ? like - 1 : like + 1)
//     }
//     //for like and dislike
//     //======================================================

//     // for comment section

//     const [isCommentVisible, setCommentVisible] = useState(false);
//     const [commentText, setCommentText] = useState('');
//     const [comments, setComments] = useState([]);

//     const onCommentPress = (id) => {
//       console.log(id);
//       setCommentVisible(!isCommentVisible);
//     };

//     const closeCommentModal = () => {
//       setCommentVisible(!isCommentVisible);
//     };

//     const handleCommentSubmit = () => {

//       // Trim the comment text to remove leading and trailing whitespaces
//       const trimmedComment = commentText.trim();

//       // Check if the trimmed comment is empty or consists only of whitespaces
//       if (!trimmedComment) {
//         // Show an alert or perform any other validation action
//         alert('Comment section shouldnot be empty');
//         return;
//       }

//       // Handle the submission of the comment text
//       const newComment = {
//         id: comments.length + 1,
//         text: trimmedComment,
//       };


//       setComments([newComment, ...comments]);

//       // Clear the comment input
//       setCommentText('');

//       // Close the comment modal smoothly
//       //closeCommentModal();
//     };

//     // comment delete option
//     const handle_cmnt_dlt = (id) => {
//       const cmt_lists = comments.filter((item) => item.id !== id)
//       setComments(cmt_lists)
//     }
//     // for comment section


//     //===========================================================
//     // for share option
//     const onSharePress = async (id) => {
//       console.log(id);
//       const options = {
//         // Your default message
//         //message:`${item.caption} `,
//         message: 'Share Your Link'
//       }
//       try {
//         const result = await Share.share(options);
//         if (result.action === Share.sharedAction) {
//           console.log('Post shared successfully');
//         } else if (result.action === Share.dismissedAction) {
//           console.log('Share dismissed');
//         }
//       } catch (error) {
//         console.error('Error sharing post:', error.message);
//       }
//     }
//     // for share option


//     // const onCommentPress=(id)=>{
//     //    console.log(id);
//     //    alert(`you clicked ${name}`)
//     // }

//     //   const onSharePress=(id)=>{
//     //     console.log(id);
//     //     alert(`you clicked ${name}`)
//     //  }

//     // for see more modal

//     const [visible, setVisible] = useState(false)

//     const handle_seemoreicon = () => {
//       setVisible(!visible)
//     }
//     return (
//       <View>
//         <View style={{ padding: responsiveWidth(0.8) }}>
//           <View style={{ flexDirection: "row" }}>

//             {/* <LongTextComponent  text={caption}/> */}

//             <View>
//               <TouchableOpacity
//                 style={{
//                   width: responsiveWidth(13),
//                   height: responsiveWidth(13),
//                   borderWidth: responsiveWidth(0.4),
//                   borderRadius: responsiveWidth(13),
//                 }}>
//                 <Image source={profilepic}
//                   style={{ width: '100%', height: '100%', borderRadius: 50, }} resizeMode='stretch'
//                 />
//               </TouchableOpacity>
//               <View style={{ width: responsiveWidth(8), height: responsiveHeight(2), borderRadius: responsiveWidth(2), borderWidth: 1, top: responsiveHeight(-1.8), left: responsiveWidth(2.5), backgroundColor: "#000000" }}>
//                 <Text
//                   style={{ color: "#ffffff", fontSize: responsiveFontSize(1.2), fontWeight: '800', left: responsiveWidth(0.2) }}>9.4</Text>
//                 <View
//                   style={{ width: responsiveWidth(2), height: responsiveHeight(1.5), left: responsiveWidth(4.8), bottom: responsiveHeight(1.7) }}>
//                   <Image source={require('../../Assets/Userprofile_And_Fonts/star.png')}
//                     style={{ width: "100%", height: "100%" }} resizeMode='stretch' />
//                 </View>
//               </View>

//             </View>

//             <View
//               style={{ width: responsiveWidth(43), marginLeft: responsiveWidth(2) }}
//             >
//               <Text
//                 style={{ fontSize: responsiveFontSize(1.8), fontWeight: "900", color: "#000000", letterSpacing: 0.5 }}>
//                 {name}
//               </Text>
//               <Text
//                 style={{ fontWeight: "500", color: "black", fontSize: responsiveFontSize(1.4), top: 2 }}>
//                 {profession}
//               </Text>
//               <View
//                 style={{ width: responsiveWidth(3), height: responsiveHeight(2), top: responsiveHeight(0.4), left: responsiveWidth(-0.3) }}>
//                 <Image source={require('../../Assets/Home_Icon_And_Fonts/postfeed_loc.png')}
//                   style={{ width: '100%', height: '100%' }} resizeMode='stretch' />
//               </View>
//               <Text
//                 style={{ fontSize: responsiveFontSize(1.1), bottom: responsiveHeight(1.5), left: responsiveWidth(3), color: "black", fontWeight: '500' }}>
//                 {place}
//               </Text>

//             </View>

//             <View
//               style={{ flexDirection: "row", width: responsiveWidth(35), justifyContent: "space-evenly", alignItems: "center", left: responsiveWidth(7.2) }}>
//               <Text style={{ fontWeight: "bold", color: "#000000" }} >10h</Text>
//               <View
//                 style={{ width: responsiveWidth(5), height: responsiveWidth(5), borderRadius: responsiveWidth(5) }}>
//                 {view_type === 'public' ?
//                   <Image source={require('../../Assets/Home_Icon_And_Fonts/lock_icon.png')} style={{ width: "90%", height: '90%' }} resizeMode='stretch' />
//                   :
//                   <Image source={require('../../../components/Assets/Home_Icon_And_Fonts/public_earth.png')} style={{ width: "90%", height: '90%' }} resizeMode='stretch' />
//                 }
//               </View>
//               <Text
//                 style={{ fontWeight: "bold", color: "#000000" }}>
//                 5.2K</Text>
//               <View>
//                 <View>
//                   <TouchableOpacity
//                     onPress={handle_seemoreicon}
//                     style={{ width: responsiveWidth(3.5), height: responsiveHeight(3.5), justifyContent: "center" }}>
//                     {visible ? (
//                       <Image source={require('../../../components/Assets/Home_Icon_And_Fonts/see_more_icon.png')}
//                         style={{ width: '100%', height: '80%', backgroundColor: '#d3d3d3' }} />
//                     ) : <Image source={require('../../../components/Assets/Home_Icon_And_Fonts/see_more_icon.png')}
//                       style={{ width: '100%', height: '80%' }} resizeMode='stretch' />}
//                   </TouchableOpacity>
//                   {visible ? (
//                     <View
//                       style={{ position: "absolute", marginTop: responsiveHeight(4), right: responsiveWidth(2.2), width: responsiveWidth(35), height: responsiveHeight(10), backgroundColor: "#666666", borderRadius: responsiveWidth(3), justifyContent: 'center', alignItems: 'center', rowGap: responsiveHeight(1.1), zIndex: 3 }}>
//                       <TouchableOpacity
//                         style={{ height: responsiveHeight(3), width: responsiveWidth(30), backgroundColor: "#000000", borderRadius: responsiveWidth(2), alignItems: 'center', borderColor: 'white', borderWidth: responsiveWidth(0.3), flexDirection: 'row', paddingHorizontal: responsiveWidth(2), columnGap: responsiveWidth(3) }}>
//                         <Image style={{ height: responsiveHeight(3), width: responsiveWidth(3), tintColor: 'white', zIndex: 3 }} source={require('../../Assets/Home_Icon_And_Fonts/pin_icon.png')} resizeMode='stretch'></Image>
//                         <Text
//                           style={{ color: '#ffffff' }}>Pin Post</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity
//                         style={{ height: responsiveHeight(3), width: responsiveWidth(30), backgroundColor: "#000000", borderRadius: responsiveWidth(2), justifyContent: 'center', borderColor: 'white', alignItems: 'center', borderWidth: responsiveWidth(0.3) }}
//                       >
//                         <Text
//                           style={{ color: '#ffffff' }}
//                         >Report Post</Text>
//                       </TouchableOpacity>
//                     </View>
//                   ) : null}
//                 </View>
//               </View>
//             </View>

//           </View>

//           {/* posted image or video  \/\/\/\/\/\/\/\/\/\/  */}

//           <View>
//             <View
//               style={{

//               }}>
//               <Text
//                 style={{

//                 }}>
//                 <LongTextComponent text={caption} />
//               </Text>
//             </View>

//             {/* post image containor \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/ */}
//             <TouchableOpacity>
//               <View
//                 style={{ borderColor: "grey", width: responsiveWidth(100), height: responsiveHeight(50), }}>
//                 <Image source={image}
//                   style={{ width: "100%", height: '100%' }} />
//               </View>
//             </TouchableOpacity>


//             {/* post image containor \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/ */}
//             <View
//               style={{ height: responsiveHeight(7), width: responsiveWidth(98), flexDirection: "row", justifyContent: "space-between", top: responsiveHeight(0.5), left: responsiveWidth(2.5) }}>
//               <View>

//                 {/* like button */}
//                 <Text
//                   style={{ textAlign: "center", fontWeight: "500", fontSize: responsiveFontSize(1.4), fontWeight: "500", color: "#000000" }}>{`${formatCmpctNumber(like)} Likes`}</Text>
//                 <TouchableOpacity
//                   //  {`${formatCmpctNumber(like)} Likes`}
//                   onPress={() => onLikePress(id)}
//                   style={{ width: responsiveWidth(30), height: responsiveHeight(4.5), borderWidth: 1, borderRadius: responsiveWidth(2), flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
//                   <View
//                     style={{ width: responsiveWidth(7), height: responsiveHeight(4), right: responsiveWidth(2) }}>
//                     {hitlike && hitlike ?
//                       <Image source={require('../../../components/Assets/Home_Icon_And_Fonts/Like_after_Icon.png')} style={{ width: "100%", height: "100%", }} resizeMode='stretch' />

//                       :
//                       <Image source={require('../../Assets/Home_Icon_And_Fonts/Like_icon.png')}
//                         style={{ width: "100%", height: "98%", }} resizeMode='stretch'
//                       />
//                     }
//                   </View>
//                   <Text
//                     style={{ alignSelf: "center", fontSize: responsiveFontSize(1.9), fontWeight: "500", color: "#000000" }}>Like</Text>
//                 </TouchableOpacity>
//               </View>

//               {/* comments button */}
//               <View >
//                 <Text
//                   style={{ textAlign: "center", fontWeight: "500", fontSize: responsiveFontSize(1.4), fontWeight: "500", color: "#000000", right: responsiveWidth(2.1) }}>{`${formatCmpctNumber(comments.length)} comments`}</Text>
//                 <TouchableOpacity
//                   onPress={() => onCommentPress(id)}
//                   style={{ width: responsiveWidth(28), height: responsiveHeight(3.9), borderWidth: 1, borderRadius: responsiveWidth(2), flexDirection: "row", justifyContent: 'center', alignItems: 'center', right: responsiveWidth(2) }}>
//                   <View
//                     style={{ width: responsiveWidth(6), height: responsiveHeight(2.5), right: responsiveWidth(1) }}>
//                     <Image source={require('../../Assets/Home_Icon_And_Fonts/comment.png')}
//                       style={{ width: "100%", height: "100%" }} resizeMode='stretch'
//                     />
//                   </View>
//                   <Text
//                     style={{ alignSelf: "center", fontSize: responsiveFontSize(1.9), fontWeight: "500", color: "#000000" }}>Comments</Text>
//                 </TouchableOpacity>
//               </View>

//               {/* shares button */}
//               <View>
//                 <Text style={{ textAlign: "center", fontWeight: "500", fontSize: responsiveFontSize(1.4), fontWeight: "500", color: "#000000", right: responsiveWidth(5) }}>0 Share</Text>
//                 <TouchableOpacity
//                   onPress={() => onSharePress(id)}
//                   style={{ width: responsiveWidth(20), height: responsiveHeight(3.9), borderWidth: 1, borderRadius: responsiveWidth(2), flexDirection: "row", justifyContent: 'center', alignItems: 'center', right: responsiveWidth(4.8) }}>
//                   <View
//                     style={{ width: responsiveWidth(6), height: responsiveHeight(2.5), right: responsiveWidth(1) }}>
//                     <Image source={require('../../Assets/Home_Icon_And_Fonts/share_icon.png')}
//                       style={{ width: "100%", height: "95%", }} resizeMode='stretch'
//                     />
//                   </View>
//                   <Text
//                     style={{ alignSelf: "center", fontSize: responsiveFontSize(1.9), fontWeight: "500", color: "#000000" }}>Share</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//           </View>
//           {/* Comment Modal */}
//           <View style={styles.container}>
//             <Modal
//               isVisible={isCommentVisible}
//               onBackdropPress={closeCommentModal}
//               onBackButtonPress={closeCommentModal}
//               onSwipeComplete={closeCommentModal}
//               swipeDirection={'down'} // Disable swipe-down-to-close
//               animationIn="slideInUp"  // Slide in from bottom
//               animationOut="slideOutDown"  // Slide out to bottom
//               animationOutTiming={300}
//               backdropOpacity={0.2}
//               style={styles.modal}
//             >

//               <View style={styles.modalContainer}>
//               <TouchableOpacity
//                               style={{ width: responsiveWidth(10), height: responsiveWidth(10), borderRadius: responsiveWidth(8), top: responsiveHeight(48),borderWidth:responsiveWidth(0.3),borderColor:'black',right:responsiveWidth(3)  }}>
//                               <Image source={require('../../../components/Assets/app_logo/8641606.jpg')}
//                                 style={{ width: responsiveWidth(10), height: responsiveWidth(10),borderRadius: responsiveWidth(8),borderWidth:responsiveWidth(0.3),borderColor:'black'  }} />

//                             </TouchableOpacity>

//                 {/* Comment Input */}
//                 <TextInput
//                   style={styles.commentInput}
//                   placeholder="Add a Comment..."
//                   multiline
                  
//                   value={commentText}
//                   onChangeText={(text) => setCommentText(text)}
//                 />

//                 {/* Submit Button */}
//                 <TouchableOpacity style={styles.submitButton} onPress={handleCommentSubmit}>
//                   <Text style={styles.submitButtonText}>Post</Text>
//                 </TouchableOpacity>

//                 {/* Display Existing Comments */}
//                 <View style={styles.commentsSection}>
//                   {/* <Text style={styles.commentsTitle}>Comments</Text> */}
//                   {(comments.length) ? (
//                     <ScrollView style={styles.commentsScrollView}>
//                       {comments.map((item) => (
//                         <View key={item.id} style={styles.commentItem}>
//                           <View style={{ flexDirection: 'row' }}>
//                             <TouchableOpacity
//                               style={{ width: responsiveWidth(8), height: responsiveWidth(8),borderColor: '#000000', borderRadius: responsiveWidth(8), }}>
//                               <Image source={require('../../../components/Assets/app_logo/8641606.jpg')}
//                                 style={{ width: responsiveWidth(8), height: responsiveWidth(8),borderRadius: responsiveWidth(8),  }} />

//                             </TouchableOpacity>
//                             <TouchableOpacity
//                               style={{ left: 3 }}>
//                               <Text style={{ fontSize: 10, color: '#000000', fontWeight: '700' }}>User name</Text>
//                             </TouchableOpacity>
//                             <Text style={{ fontSize: 10, color: '#000000', height: 15, fontWeight: '400', top: 13, left: -45 }}>1w</Text>
//                             <TouchableOpacity
//                               onPress={() => handle_cmnt_dlt(item.id)}
//                               style={{ width: responsiveWidth(5), height: responsiveWidth(5), borderRadius: responsiveWidth(5), left: responsiveWidth(55), top: 2, backgroundColor: '#ffffff', borderWidth: 1 }}>
//                               <Image source={require('../../Assets/Home_Icon_And_Fonts/link_icon.png')}
//                                 style={{ width: '100%', height: '100%' }} />
//                             </TouchableOpacity>
//                           </View>
//                           <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: '700' ,color:'black'}}>{item.text}</Text>
//                         </View>
//                       ))}
//                     </ScrollView>
//                   ) : (

//                     <Text
//                       style={{ textAlign: 'center', top: 60, letterSpacing: 1, fontSize: 15 }}>No Comments Yet</Text>

//                   )}
//                 </View>

//               </View>

//             </Modal>
//           </View>

//           {/* Comment Modal */}
//         </View>
//         <View style={{
//           borderBottomWidth: 10,
//           borderBottomColor: '#D7D7D7',
//           marginVertical: 5
//         }} />
//         {/* ------------------------------------ */}

//       </View>
//     )
//   }
//   //renderitem lists
//   return (
//     <>
//       <FlatList
//         data={data}
//         style={{ padding: 0, margin: 0 }}
//         renderItem={({ item }) => (
//           <Datas  {...item} />
//         )}
//         keyExtractor={(item) => item.id}
//       />

//       {data.map((item) => (
//         <TouchableOpacity key={item.id} onPress={() => openModal(item)}>
//           <Image source={{}} style={styles.thumbnail} />
//         </TouchableOpacity>
//       ))}

//       {/* Modal for detailed view */}
//       <Modal visible={modalVisible} animationType="slide" onRequestClose={closeModal}>
//         <View style={styles.modalContainer}>
//           <Image source={{ uri: selectedItem?.image }} style={styles.modalImage} />
//           <Text style={styles.profileText}>
//             {selectedItem?.profile.name} - {selectedItem?.profile.bio}
//           </Text>
//           <Text style={styles.contentText}>{selectedItem?.content}</Text>
//           <TouchableOpacity onPress={closeModal}>
//             <Text style={styles.closeButton}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>


//     </>
//   )
// }

// const styles = StyleSheet.create({
//   // container: {
//   //   flex: 1,
//   //   justifyContent: 'center',
//   //   alignItems: 'center',
//   // },
//   modal: {
//     margin: 0,
//     justifyContent: 'flex-end',
//   },
//   modalContainer: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     height: 500,
//     borderWidth: 1,
   
//   },
//   commentInput: {
//     height: 50,

//     width: responsiveWidth(63.5),
//     position: 'absolute',
//     top: responsiveHeight(50),
//     marginLeft:responsiveWidth(13),
  
//     //left: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 10,
//     marginBottom: 10,
//     padding: 10,
//   },
//   submitButton: {
//     backgroundColor: '#000000',
//     position: 'absolute',
//     left: responsiveWidth(78),
//     //  top: 58,
//     top: responsiveHeight(51),
//     borderRadius: 10,
//     width: responsiveWidth(20),
//     padding: 7,
//     alignItems: 'center',
//     marginBottom: 10,
//     borderWidth: 2,
//     borderColor: 'grey'
//   },
//   submitButtonText: {
//     color: 'white',
//   },
//   commentsSection: {
//    width:responsiveWidth(90),
    
//    // borderWidth:1
//   },
//   // commentsTitle: {
//   //   fontSize: 16,
//   //   fontWeight: 'bold',
//   //   marginBottom: 10,
//   // },
//   commentsScrollView: {
//     maxHeight:380,
//   //  borderWidth:3

//   },
//   commentItem: {
//     marginBottom: 10,
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
   
//   },
// })
import React, { useState, useEffect } from 'react';
import { View, Image, Text, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ImageView = () => {
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchImageData = async () => {
    try {
      const jwt = await AsyncStorage.getItem("jwt");
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + jwt);

      const response = await fetch('http://filmhook.annularprojects.com/filmhook-0.0.1-SNAPSHOT/user/gallery/getGalleryFilesByUserId?userId=3', {
        headers: myHeaders
      });

      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      const imageData = await response.json();
      if (imageData.data.length > 0) {
        const imageURL = 'http://filmhook.annularprojects.com/' + imageData.data[0].filePath;
        setImageUri(imageURL);
      } else {
        throw new Error('No image found');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const showImage = async () => {
    fetchImageData();
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        {imageUri ? (
          <TouchableOpacity onPress={showImage}>
            <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
          </TouchableOpacity>
        ) : (
          <Text>No image available</Text>
        )}
      </View>
      <TouchableOpacity onPress={showImage}>
        <Text>Show Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageView;

