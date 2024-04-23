import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, TextInput, ScrollView, Share } from 'react-native'
import React, { useState, useEffect } from 'react'
import Modal from 'react-native-modal'
import ImagePicker from 'react-native-image-crop-picker'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import privateApi from "../../api/privateAPI"
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Postfeedcontainor() {
  const [userPost, setUserPost] = useState([])

  useEffect(() => {

    const fetchUserPost = async () => {

      try {
        const posts = await privateApi.get("user/gallery/getGalleryFilesByUserId?userId=3");

        setUserPost(posts.data.data)
        console.log("Fetched User Post")
        console.log(posts.data)


      } catch (e) {
        console.log("Fetching Failed in user post", e)
      }

    }

    fetchUserPost()

  }, [])

  //renderitem lists
  const Datas = ({ item }) => {
    const [imageUrl, setImageUrl] = useState("");
    const [like, setLike] = useState(item.likes || 0); // Initialize likes with the value from the item
    const [hitlike, setHitlike] = useState(false);

    const blobToBase64 = async (blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = () => reject(new Error('Failed to convert blob to base64'));
        reader.readAsDataURL(blob);
      });
    };

    const fetchImage = async (fileId) => {
      try {
        console.log(`Fetching File id - ${fileId}`)
        const jwt = await AsyncStorage.getItem("jwt");
        const response = await fetch(`https://filmhook.annularprojects.com/filmhook-0.0.1-SNAPSHOT/user/gallery/downloadGalleryFile?userId=3&category=Gallery&fileId=${fileId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }

        const imageBlob = await response.blob();

        const base64Data = await blobToBase64(imageBlob);

        // Assuming you receive multiple images as base64 data separated by a delimiter
        const base64Images = base64Data.split('delimiter');


        // console.log(base64Images)
        console.log("Blob fetching...")
        setImageUrl(base64Images)
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch images');
      }
    };
    // for number format functions

    useEffect(() => {
      fetchImage(item.fileId)
    }, [])

    const options = {
      notation: 'compact',
      compactDisplay: 'short'
    }

    function formatCmpctNumber(number) {
      const usformatter = Intl.NumberFormat('en-US', options);
      return usformatter.format(number)
    }

    // for number format functions
    // ==============================================
    //for like and dislike


    const handleLikePress = async (postId) => {
      try {
        const likeResponse = await privateApi.post('action/addLike', { postId });

        if (likeResponse.status === 200) {
          console.log('Like posted successfully for post with id:', postId);
          setLike(like + 1); // Update the like count
          setHitlike(true);
        } else {
          throw new Error('Failed to post like');
        }
      } catch (error) {
        console.error('Error:', error.message);
        Alert.alert('Error', 'Failed to add like');
      }
    };

    // Call the function to fetch data and post like







    //for like and dislike
    //======================================================

    // for comment section

    const [isCommentVisible, setCommentVisible] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);


    const [postId, setPostId] = useState(null); // Add postId state

    useEffect(() => {
      setPostId(item.id); // Set postId when item changes
    }, [item.id]);


    // Handle comment press function
    const onCommentPress = async (postId) => {
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
        const commentResponse = await privateApi.post(`action/addComment`, {
          postId: postId,
          content: trimmedComment // Pass the trimmed comment text
        });

        console.log('Comment posted successfully:', commentResponse);
        console.log(postId)
        console.log(trimmedComment)

        // Update comments state if needed
        // This depends on whether you want to fetch the comments again after posting a new comment
        // If you do, you can fetch the comments here and update the comments state accordingly

        // Clear the comment input
        setCommentText('');

        // Close the comment modal if needed
        // closeCommentModal();
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    };

    const fetchComment = async (postId) => {
      try {
        if (!postId) {
          console.error('PostId is null');
          return;
        }

        // Make the API call to fetch comments for the postId
        const response = await privateApi.post(`action/getComment`, {
          postId: postId
        });

        // Extract the comments' content from the response data
        const commentsData = response.data.map(comment => comment.content);

        console.log(commentsData);

        // Update the comments state with the fetched comments' content
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };







    // comment delete option
    const handle_cmnt_dlt = async (commentId) => {
      try {
        console.log('Deleting comment with ID:', commentId);

        const response = await privateApi.post(`action/deleteComment`, {
          commentId: commentId
        });

        if (response.data.status === 1) {
          // Update the comments state after deletion
          const updatedComments = comments.filter(comment => comment.commentId !== commentId);
          setComments(updatedComments);
          console.log('Updated comments after deletion:', updatedComments);
        } else {
          console.error('Error deleting comment:', response.data.message);
        }
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    };







    const onSharePress = async (id) => {
      console.log(id);
      const options = {
        // Your default message
        //message:`${item.caption} `,
        message: 'Share Your Link'
      }
      try {
        const result = await Share.share(options);
        if (result.action === Share.sharedAction) {
          console.log('Post shared successfully');
        } else if (result.action === Share.dismissedAction) {
          console.log('Share dismissed');
        }
      } catch (error) {
        console.error('Error sharing post:', error.message);
      }
    }
    const [visible, setVisible] = useState(false)

    const handle_seemoreicon = () => {
      setVisible(!visible)
    }
    return (
      <View>
        <View style={{ padding: responsiveWidth(0.8) }}>
          <View>
            <TouchableOpacity>
              <View
                style={{ borderColor: "grey", width: responsiveWidth(100), height: responsiveHeight(50), }}>
                <Image source={{ uri: `data:image/jpeg;base64,${imageUrl}` }}
                  style={{ width: "100%", height: '100%' }} />
              </View>
            </TouchableOpacity>

            <View
              style={{ height: responsiveHeight(7), width: responsiveWidth(98), flexDirection: "row", justifyContent: "space-between", top: responsiveHeight(0.5), left: responsiveWidth(2.5) }}>
              <View>

                {/* like button */}
                <Text
                  style={{ textAlign: "center", fontWeight: "500", fontSize: responsiveFontSize(1.4), fontWeight: "500", color: "#000000" }}>{`${formatCmpctNumber(like)} Likes`}</Text>
                <TouchableOpacity
                  //  {`${formatCmpctNumber(like)} Likes`}
                  onPress={() => handleLikePress(item.id)} // Call onLikePress with fileId
                  style={{ width: responsiveWidth(30), height: responsiveHeight(4.5), borderWidth: 1, borderRadius: responsiveWidth(2), flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                  <View
                    style={{ width: responsiveWidth(7), height: responsiveHeight(4), right: responsiveWidth(2) }}>
                    {hitlike && hitlike ?
                      <Image source={require('../../../components/Assets/Home_Icon_And_Fonts/Like_after_Icon.png')} style={{ width: "100%", height: "100%", }} resizeMode='stretch' />

                      :
                      <Image source={require('../../Assets/Home_Icon_And_Fonts/Like_icon.png')}
                        style={{ width: "100%", height: "98%", }} resizeMode='stretch'
                      />
                    }
                  </View>
                  <Text
                    style={{ alignSelf: "center", fontSize: responsiveFontSize(1.9), fontWeight: "500", color: "#000000" }}>Like</Text>
                </TouchableOpacity>
              </View>

              {/* comments button */}
              <View >
                <Text
                  style={{ textAlign: "center", fontWeight: "500", fontSize: responsiveFontSize(1.4), fontWeight: "500", color: "#000000", right: responsiveWidth(2.1) }}>{`${formatCmpctNumber(comments.length)} comments`}</Text>
                <TouchableOpacity
                  onPress={() => onCommentPress(item.id)}
                  style={{ width: responsiveWidth(28), height: responsiveHeight(3.9), borderWidth: 1, borderRadius: responsiveWidth(2), flexDirection: "row", justifyContent: 'center', alignItems: 'center', right: responsiveWidth(2) }}>
                  <View
                    style={{ width: responsiveWidth(6), height: responsiveHeight(2.5), right: responsiveWidth(1) }}>
                    <Image source={require('../../Assets/Home_Icon_And_Fonts/comment.png')}
                      style={{ width: "100%", height: "100%" }} resizeMode='stretch'
                    />
                  </View>
                  <Text
                    style={{ alignSelf: "center", fontSize: responsiveFontSize(1.9), fontWeight: "500", color: "#000000" }}>Comments</Text>
                </TouchableOpacity>
              </View>

              {/* shares button */}
              <View>
                <Text style={{ textAlign: "center", fontWeight: "500", fontSize: responsiveFontSize(1.4), fontWeight: "500", color: "#000000", right: responsiveWidth(5) }}>0 Share</Text>
                <TouchableOpacity
                  onPress={() => onSharePress(id)}
                  style={{ width: responsiveWidth(20), height: responsiveHeight(3.9), borderWidth: 1, borderRadius: responsiveWidth(2), flexDirection: "row", justifyContent: 'center', alignItems: 'center', right: responsiveWidth(4.8) }}>
                  <View
                    style={{ width: responsiveWidth(6), height: responsiveHeight(2.5), right: responsiveWidth(1) }}>
                    <Image source={require('../../Assets/Home_Icon_And_Fonts/share_icon.png')}
                      style={{ width: "100%", height: "95%", }} resizeMode='stretch'
                    />
                  </View>
                  <Text
                    style={{ alignSelf: "center", fontSize: responsiveFontSize(1.9), fontWeight: "500", color: "#000000" }}>Share</Text>
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
                  <Image source={require('../../../components/Assets/app_logo/8641606.jpg')}
                    style={{ width: responsiveWidth(10), height: responsiveWidth(10), borderRadius: responsiveWidth(8), borderWidth: responsiveWidth(0.3), borderColor: 'black' }} />

                </TouchableOpacity>

                {/* Comment Input */}
                <TextInput
                  style={styles.commentInput}
                  placeholder="Add a Comment..."
                  multiline

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
                  {(comments.length) ? (
                    <ScrollView style={styles.commentsScrollView}>
                      {/* Map through the comments array and render each comment */}
                      {comments.map((comment, index) => (
                        <View key={index} style={styles.commentItem}>
                          <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                              style={{ width: responsiveWidth(8), height: responsiveWidth(8), borderColor: '#000000', borderRadius: responsiveWidth(8), }}>
                              <Image source={require('../../../components/Assets/app_logo/8641606.jpg')}
                                style={{ width: responsiveWidth(8), height: responsiveWidth(8), borderRadius: responsiveWidth(8), }} />

                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{ left: 3 }}>
                              <Text style={{ fontSize: 10, color: '#000000', fontWeight: '700' }}>User names</Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 10, color: '#000000', height: 15, fontWeight: '400', top: 13, left: -45 }}>1w</Text>
                            <TouchableOpacity
                              onPress={() => handle_cmnt_dlt(comment.commentId)}
                              style={{ width: responsiveWidth(5), height: responsiveWidth(5), borderRadius: responsiveWidth(5), left: responsiveWidth(55), top: 2, backgroundColor: '#ffffff', borderWidth: 1 }}>
                              <Image source={require('../../Assets/Home_Icon_And_Fonts/link_icon.png')}
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
      <FlatList
        data={userPost}
        style={{ padding: 0, margin: 0 }}
        renderItem={({ item }) => (
          <Datas item={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
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