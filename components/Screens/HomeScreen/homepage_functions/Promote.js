import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, TextInput, ScrollView, Share, useColorScheme } from 'react-native'
import React, { useState, useEffect } from 'react'
import Modal from 'react-native-modal'
import ImagePicker from 'react-native-image-crop-picker'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import privateApi from "../../../api/privateAPI"
import Video from 'react-native-video'
import { DefaultTheme, DarkTheme, Provider as PaperProvider, useTheme } from 'react-native-paper';
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import { error } from 'console'
import { useNavigation } from '@react-navigation/native'
import privateAPI from '../../../api/privateAPI'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Swiper from 'react-native-swiper'


export default function Promote() {
  const navigation = useNavigation();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : DefaultTheme;

  // Ensure theme object exists and has colors property
  const { colors } = theme || {};

  // If theme or colors is undefined, provide default values
  const backgroundColor = colors ? colors.background : 'white';
  const textColor = colors ? colors.text : 'black';
  const [userPost, setUserPost] = useState([]);


  const fetchUserPost = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId')
      const posts = await privateApi.get(`promote/getPromoteByUserId?userId=${userId}`);
      setUserPost(posts.data.data);
      console.log("Fetched User Post");
      console.log('post dataaa', posts.data);
    } catch (e) {
      console.log("Fetching Failed in user post", e);
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchUserPost();



  }, []);






  //renderitem lists
  const Datas = ({ item }) => {




    const [imageUrls, setImageUrls] = useState([]);
    const [caption, setCaption] = useState("");
    const [hitLike, setHitLike] = useState(false);
    const [likeId, setLikeId] = useState(null);
    const [likeCount, setLikeCount] = useState(item.likeCount);
    const [shareCount, setShareCount] = useState(item.shareCount);
    const [commentCount, setCommentCount] = useState(item.commentCount);
    const [profilePicUrl, setProfilePicUrl] = useState(null);
    const [userName, setuserName] = useState('');

    const [like, setLike] = useState(item.likes || 0);
    const [privateOrPublic, setPrivateOrPublic] = useState(item.privateOrPublic);
    const [likeStatus, setLikeStatus] = useState(item.likeStatus);
    const [pinStatus, setPinStatus] = useState(item.pinStatus);
    const [promoteFlag, setPromoteFlag] = useState(item.promoteFlag);
    // Initialize likes with the value from the item
    // const [hitlike, setHitlike] = useState(false);




    useEffect(() => {
      if (item.postFiles && item.postFiles.length > 0) {
        const postFilePaths = item.postFiles.map(file => file.filePath);
        setImageUrls(postFilePaths);
        setElapsedTime(item.postFiles[0].elapsedTime); // Assuming you need the elapsed time of the first post file
        setPostId(item.id);
      }

      setUserId(item.userId);
      // setCountLike(item.likeCount);
    }, [item]);

    handleDeletePromote = async () => {
      try {
        const response = await privateAPI.post(`promote/deletePromoteByUserId`, {
          postId: postId
        });
        fetchUserPost();
        console.log('delete response', response.data);
      } catch (error) {
        console.log("error on delete api", error)
      }
    };

    const options = {
      notation: 'compact',
      compactDisplay: 'short'
    }

    function formatCmpctNumber(number) {
      const usformatter = Intl.NumberFormat('en-US', options);
      return usformatter.format(number)
    }







    const [isCommentVisible, setCommentVisible] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [paused, setPaused] = useState(true);
    const [currentTime, setCurrentTime] = useState(0); // Current time of the video



    const [postId, setPostId] = useState(null); // Add postId state
    const [userId, setUserId] = useState(null);
    const [elapsedTime, setElapsedTime] = useState('');








    // Handle comment press function
    const onCommentPress = async () => {
      console.log(postId);
      setCommentVisible(!isCommentVisible);
      if (postId) {
        await fetchComment(postId); // Pass postId to fetchComment function
      } else {
        console.error('PostId is null');
      }
    };
    const closeCommentModal = () => {
      setCommentVisible(!isCommentVisible);
    };


    const handleCommentSubmit = async () => {
      try {
        // Trim the comment text to remove leading and trailing whitespaces
        const trimmedComment = commentText.trim();
        const userId = await AsyncStorage.getItem('userId');

        // Check if the trimmed comment is empty or consists only of whitespaces
        if (!trimmedComment) {
          // Show an alert or perform any other validation action
          alert('Comment section should not be empty');
          return;
        }

        if (!postId) {
          console.error('PostId is null');
          return;
        }

        // Make the API call to submit the comment
        const commentResponse = await privateApi.post(`user/post/addComment`, {
          postId: postId,
          content: trimmedComment,
          userId: userId// Pass the trimmed comment text
        });

        console.log('Comment posted successfully:', commentResponse.data);
        console.log(postId)
        console.log(trimmedComment)

        await fetchComment(postId); // Fetch comments after adding a new one
        setCommentText('');
        const count = commentResponse.data.data;
        console.log("post comment response", count)
        setCommentCount(count.totalCommentCount);

        // Now commentCount should be updated
        console.log("comment count", count.totalCommentCount); // Check comment count
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    };

    const fetchComment = async () => {
      try {
        if (!postId) {
          console.error('PostId is null');
          return;
        }

        // Make the API call to fetch comments for the postId
        const response = await privateApi.post('user/post/getComment', {
          postId: postId
        });

        // Extract the comments' content from the response data
        const commentsData = response.data.data;
        console.log("comments", commentsData);

        // Update the comments state with the fetched comments' content
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };







    // comment delete option
    const handle_cmnt_dlt = async (commentId) => {
      try {
        console.log('Deleting comment with ID:', commentId);

        const response = await privateApi.post(`user/post/deleteComment`, {
          postId: postId,
          commentId: commentId
        });

        if (response.data.status === 1) {
          // Update the comments state after deletion
          const updatedComments = comments.filter(comment => comment.commentId !== commentId);
          setComments(updatedComments);
          const count = response.data.data;
          console.log('Updated comments after deletion:', count.totalCommentCount);

          setCommentCount(count.totalCommentCount);
        } else {
          console.error('Error deleting comment:', response.data.message);
        }
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    };



    const promoteEdit = () => {
      navigation.navigate('PromoteEdit', {
        imageUrls,
        id: postId
      });
      console.log("Image URLs", imageUrls);
      console.log("ID passed", postId);
    };
    return (
      <View>
        <View style={{}}>
          <View>

            <View style={{ flexDirection: "row", alignItems: 'center' }}>



              <View style={{ width: responsiveWidth(18), justifyContent: 'center', alignContent: 'center', paddingHorizontal: responsiveWidth(1) }}>



              </View>

              <View
                style={{ width: responsiveWidth(43), bottom: responsiveHeight(1.5) }}
              >
                <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { userId })}>
                  <Text
                    style={{ fontSize: responsiveFontSize(1.8), fontWeight: "900", color: "#000000", letterSpacing: 0.5 }}>
                    {/* {name} */}
                    {/* {item.userName} */}
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{ fontWeight: "500", color: "black", fontSize: responsiveFontSize(1.4), top: 2 }}>
                  {/* {profession} */}
                  {/* {item.professionNames} */}
                </Text>
                <View
                  style={{ width: responsiveWidth(30), height: responsiveHeight(2), top: responsiveHeight(0.6), flexDirection: 'row', right: responsiveWidth(1) }}>

                  <Text
                    style={{ fontSize: responsiveFontSize(1.4), color: "black", fontWeight: '500' }}>
                    {/* {place} */}
                    {/* {item.locationName} */}
                  </Text>
                </View>


              </View>
              <View
                style={{
                  width: responsiveWidth(6),
                  height: responsiveWidth(6),
                  borderRadius: responsiveWidth(5),
                  overflow: 'hidden',  // This ensures the image respects the border radius
                  justifyContent: 'center', // This centers the image
                  alignItems: 'center', // This centers the image
                  right: responsiveWidth(4),
                  bottom: responsiveHeight(1.8)
                }}
              >
                {/* {pinStatus === true && (
                  <Image
                    source={require('../../../Assets/Home_Icon_And_Fonts/pin_icon.png')}
                    style={{ width: '90%', height: '90%' }}
                    resizeMode='stretch'
                  />
                )} */}
              </View>

              <View
                style={{ flexDirection: "row", width: responsiveWidth(32), justifyContent: "space-evenly", alignItems: "center", bottom: responsiveHeight(2) }}>
                <Text style={{ fontWeight: "bold", color: "#000000" }} ></Text>
                {/* <View
                  style={{ width: responsiveWidth(5), height: responsiveWidth(5), borderRadius: responsiveWidth(5) }}>
                  {privateOrPublic === true ?
                    <Image source={require('../../../Assets/Home_Icon_And_Fonts/lock_icon.png')} style={{ width: "90%", height: '90%' }} resizeMode='stretch' />
                    :
                    <Image source={require('../../../../components/Assets/Home_Icon_And_Fonts/public_earth.png')} style={{ width: "90%", height: '90%' }} resizeMode='stretch' />
                  }
                </View> */}
                <View>
                  <Text
                    style={{ fontWeight: "900", color: "#000000", width: responsiveWidth(3), fontSize: responsiveFontSize(2) }}>
                  </Text>
                </View>


              </View>

            </View>

            <View
              style={{
                flexDirection: "row", width: responsiveWidth(32), justifyContent: "space-evenly", marginLeft: responsiveWidth(1), bottom: responsiveHeight(1), marginTop: responsiveWidth(1)

              }}>
              <Text
                style={{

                }}>
                {/* <LongTextComponent > */}
                <Text style={{ color: textColor }}>

                </Text>
                {/* </LongTextComponent> */}
              </Text>
            </View>


            <TouchableOpacity onPress={() => setPaused(!paused)}>
              <View style={{ borderColor: "grey", width: responsiveWidth(100), height: responsiveHeight(50), paddingLeft: responsiveWidth(3), paddingRight: responsiveWidth(3) }}>
                <Swiper style={styles.wrapper} showsButtons loop={true}>
                  {item.postFiles.map((file) => (
                    <View style={styles.slide} key={file.id}>
                      {file.filePath.endsWith('.mp4') || file.filePath.endsWith('.mov') ? (
                        <View style={{ position: 'relative', width: '100%', height: '100%' }}>
                          <Video
                            source={{ uri: file.filePath }}
                            style={{ width: "100%", height: '100%' }}
                            paused={paused}
                            resizeMode="contain"
                            onLoad={() => setCurrentTime(0)} // Set the current time to the beginning when video loads
                            onProgress={({ currentTime }) => setCurrentTime(currentTime)} // Update current time as video progresses
                            seek={currentTime} // Seek to the current time
                          />
                          {paused && ( // Display play button only if video is paused
                            <Image
                              source={require('../../../../components/Assets/video/play_button.png')}
                              style={styles.playButton}
                            />
                          )}
                        </View>
                      ) : (
                        <Image
                          source={{ uri: file.filePath }}
                          style={{ height: '100%', width: '100%' }}
                        />
                      )}
                    </View>
                  ))}
                </Swiper>
              </View>
            </TouchableOpacity>


            <View
              style={{ height: responsiveHeight(7), width: responsiveWidth(100), flexDirection: "row", justifyContent: "space-between", top: responsiveHeight(0.5), paddingHorizontal: responsiveWidth(2) }}>





              {/* shares button */}
              <View>

                <TouchableOpacity
                  onPress={promoteEdit}
                  style={{ width: responsiveWidth(12), height: responsiveHeight(3.9), borderWidth: 1, borderRadius: responsiveWidth(4), flexDirection: "row", justifyContent: 'center', alignItems: 'center', left: responsiveWidth(4), backgroundColor: 'black', bottom: responsiveHeight(6) }}>


                  <Text
                    style={{ fontSize: responsiveFontSize(2.2), fontWeight: "500", color: "white" }}>Edit</Text>

                </TouchableOpacity>
              </View>



              {/* promate button */}
              <View style={{ margin: responsiveHeight(2), left: responsiveWidth(3) }}>
                <TouchableOpacity style={{ width: responsiveWidth(18), height: responsiveHeight(3.9), borderWidth: 1, borderRadius: responsiveHeight(1), backgroundColor: 'black' }} onPress={handleDeletePromote}>

                  <Text style={{ alignSelf: 'center', top: responsiveHeight(0.5), fontSize: responsiveFontSize(1.9), fontWeight: "500", color: "white" }}>Delete</Text>


                </TouchableOpacity>
              </View>
            </View>



          </View>
          {/* Comment Modal */}
          <View style={styles.container}>
            <Modal
              isVisible={isCommentVisible}
              onBackdropPress={closeCommentModal}
              onBackButtonPress={closeCommentModal}
              onSwipeComplete={closeCommentModal}
              swipeDirection={'down'} // Disable swipe-down-to-close
              animationIn="slideInUp"  // Slide in from bottom
              animationOut="slideOutDown"  // Slide out to bottom
              animationOutTiming={300}
              backdropOpacity={0.2}
              style={styles.modal}
            >

              <View style={styles.modalContainer}>
                <TouchableOpacity
                  style={{ width: responsiveWidth(10), height: responsiveWidth(10), borderRadius: responsiveWidth(8), top: responsiveHeight(48), borderWidth: responsiveWidth(0.3), borderColor: 'black', right: responsiveWidth(3) }}>
                  <Image source={require('../../../../components/Assets/app_logo/8641606.jpg')}
                    style={{ width: responsiveWidth(10), height: responsiveWidth(10), borderRadius: responsiveWidth(8), borderWidth: responsiveWidth(0.3), borderColor: 'black' }} />

                </TouchableOpacity>

                {/* Comment Input */}
                <TextInput
                  style={styles.commentInput}
                  placeholder="Add a Comment..."
                  multiline
                  placeholderTextColor='black'

                  value={commentText}
                  onChangeText={(text) => setCommentText(text)}
                />

                {/* Submit Button */}
                <TouchableOpacity style={styles.submitButton} onPress={handleCommentSubmit}>
                  <Text style={styles.submitButtonText}>Post</Text>
                </TouchableOpacity>

                {/* Display Existing Comments */}
                <View style={styles.commentsSection}>
                  {/* Check if there are comments */}
                  {(comments && comments.length) ? (
                    <ScrollView style={styles.commentsScrollView}>
                      {/* Map through the comments array and render each comment */}
                      {comments.map((comment, index) => (
                        <View key={index} style={styles.commentItem}>
                          <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                              style={{ width: responsiveWidth(8), height: responsiveWidth(8), borderColor: '#000000', borderRadius: responsiveWidth(8) }}>
                              <Image source={require('../../../../components/Assets/app_logo/8641606.jpg')}
                                style={{ width: responsiveWidth(8), height: responsiveWidth(8), borderRadius: responsiveWidth(8) }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ left: 3 }}>
                              <Text style={{ fontSize: 10, color: '#000000', fontWeight: '700' }}>User names</Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 10, color: '#000000', height: 15, fontWeight: '400', top: 13, left: -45 }}>1w</Text>
                            <TouchableOpacity
                              onPress={() => handle_cmnt_dlt(comment.commentId)}
                              style={{ width: responsiveWidth(5), height: responsiveWidth(5), borderRadius: responsiveWidth(5), left: responsiveWidth(55), top: 2, backgroundColor: '#ffffff', borderWidth: 1 }}>
                              <Image source={require('../../../Assets/Home_Icon_And_Fonts/link_icon.png')}
                                style={{ width: '100%', height: '100%' }} />
                            </TouchableOpacity>
                          </View>
                          {/* Render each comment using the comment variable */}
                          <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: '700', color: 'black' }}>{comment.content}</Text>
                        </View>
                      ))}
                    </ScrollView>
                  ) : (
                    // If there are no comments, display a message
                    <Text style={{ textAlign: 'center', top: 60, letterSpacing: 1, fontSize: 15 }}>No Comments Yet</Text>
                  )}
                </View>
              </View>

            </Modal>
          </View>

          {/* Comment Modal */}
        </View>
        <View style={{
          borderBottomWidth: 10,
          borderBottomColor: '#D7D7D7',
          marginVertical: 5
        }} />

        {/* ------------------------------------ */}

      </View>
    )
  }
  //renderitem lists
  return (
    <>
      <View style={{ marginTop: responsiveHeight(1), marginBottom: responsiveHeight(1), left: responsiveWidth(1.5) }}><Text style={{ color: "black", fontWeight: '900', fontStyle: 'normal', fontSize: responsiveHeight(3) }}>Promote :</Text></View>
      <FlatList
        data={userPost}
        style={{ padding: 0, margin: 0 }}
        renderItem={({ item }) => <Datas item={item} />}
        keyExtractor={(item, index) => index.toString()} // Use index as the key since there are no unique IDs in the data
      />


    </>

  )
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    // justifyContent: 'center',
    // alignItems: 'center',
    height: 500,
    borderWidth: 1,

  },
  playButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: '50%', // Position the button at the vertical center of the container
    left: '50%', // Position the button at the horizontal center of the container
    marginLeft: -25, // Adjust for half of the button width to center it precisely
    marginTop: -25, // Adjust for half of the button height to center it precisely
  },
  commentInput: {
    height: 50,

    width: responsiveWidth(63.5),
    position: 'absolute',
    top: responsiveHeight(50),
    marginLeft: responsiveWidth(13),

    //left: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    color: 'black'
  },
  submitButton: {
    backgroundColor: '#000000',
    position: 'absolute',
    left: responsiveWidth(78),
    //  top: 58,
    top: responsiveHeight(51),
    borderRadius: 10,
    width: responsiveWidth(20),
    padding: 7,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'grey'
  },
  submitButtonText: {
    color: 'white',
  },
  commentsSection: {
    width: responsiveWidth(90),

    // borderWidth:1
  },
  // commentsTitle: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   marginBottom: 10,
  // },
  commentsScrollView: {
    maxHeight: 380,
    //  borderWidth:3

  },
  commentItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,

  },
})