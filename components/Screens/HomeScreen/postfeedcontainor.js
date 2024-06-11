import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, TextInput, ScrollView, Share, useColorScheme, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Modal from 'react-native-modal'
import ImagePicker from 'react-native-image-crop-picker'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import privateApi from "../../api/privateAPI"
import Video from 'react-native-video'
import { DefaultTheme, DarkTheme, Provider as PaperProvider, useTheme } from 'react-native-paper';
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import { error } from 'console'
import { useNavigation } from '@react-navigation/native'
import privateAPI from '../../api/privateAPI'
import Swiper from 'react-native-swiper'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Postfeedcontainor() {
  const navigation = useNavigation();
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : DefaultTheme;

  // Ensure theme object exists and has colors property
  const { colors } = theme || {};

  // If theme or colors is undefined, provide default values
  const backgroundColor = colors ? colors.background : 'white';
  const textColor = colors ? colors.text : 'black';
  const [userPost, setUserPost] = useState([]);

  useEffect(() => {
    const fetchUserPost = async () => {
      try {
        const posts = await privateApi.get(`user/post/getAllUsersPosts`);
        setUserPost(posts.data.data);
        console.log("Fetched User Post");
        console.log('post dataaa', posts.data.professionNames);
      } catch (e) {
        console.log("Fetching Failed in user post", e);
      }
    };

    // Fetch data initially
    fetchUserPost();

    // Set up interval to fetch data every 10 minutes
    const intervalId = setInterval(fetchUserPost, 5 * 60 * 1000); // 5 minutes

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);






  //renderitem lists
  const Datas = ({ item }) => {




    const [imageUrl, setImageUrl] = useState(item.postFiles.filePath)
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
    const [profileURL, setProfileURL] = useState();
    // Initialize likes with the value from the item
    // const [hitlike, setHitlike] = useState(false);




    useEffect(() => {
      if (item.postFiles && item.postFiles.length > 0) {
        const firstPostFile = item.postFiles[0]; // Access the first element of the postFiles array
        setImageUrl(firstPostFile.filePath);
        setElapsedTime(firstPostFile.elapsedTime);
        setPostId(item.id);
      }

      setUserId(item.userId);
      fetchProfilePicture();
      // setCountLike(item.LikeCount);
    }, []);
    const fetchProfilePicture = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');

        const requestData = {
          userId: id
        };

        const response = await privateAPI.post(
          'user/getProfilePic',
          requestData,
        );

        const data = response.data;

        if (data.status === 1) {
          const profilePicUrl = data.data.filePath;
          setProfileURL(profilePicUrl);
          console.log('Profile pic found successfully:', profilePicUrl);
        } else {
          setProfileURL(null);
          console.log('Profile pic not found:', data.message);
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };





    // Call the function to fetch initial counts







    const options = {
      notation: 'compact',
      compactDisplay: 'short'
    }

    function formatCmpctNumber(number) {
      const usformatter = Intl.NumberFormat('en-US', options);
      return usformatter.format(number)
    }






    const handleLikePress = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId')
        // Call the API to add or remove like
        const likeResponse = await privateAPI.post('user/post/addLike', {
          userId: userId,
          postId: postId,
          // status: !hitLike // Negate hitLike to post true for like and false for dislike
        });



        // Update like state based on the response
        if (!hitLike) {
          // If post wasn't liked, now liking it
          console.log('Like posted successfully for post with id:', postId);
          console.log("response", likeResponse.data)
          setLike(like + 1); // Update the like count
          setHitLike(true); // Set like status to true
          // setLikeId(newLikeId); // Store the new likeId
        } else {
          // If post was liked, now unliking it
          console.log('Post unliked successfully:', postId);
          console.log("response", likeResponse.data)

          setLike(like - 1); // Decrement the like count
          setHitLike(false); // Set like status to false
          // setLikeId(null); // Clear the stored likeId

        }
        const count = likeResponse.data.data;
        console.log("count", count.totalLikesCount)
        setLikeCount(count.totalLikesCount);// Update like count from the response
        setLikeStatus(count.status);


      } catch (error) {
        console.error('Error:', error.message);
        console.log("postid", postId)
        const userId = await AsyncStorage.getItem('userId')
        console.log("suriD", userId)
        // Alert.alert('Error', error.message);
      }
    };


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


    const LongTextComponent = ({ text }) => {
      const [showFullText, setShowFullText] = useState(false);

      const toggleTextVisibility = () => {
        setShowFullText(!showFullText);
      };

      const handleSeeLess = () => {
        setShowFullText(false);
      };

      

      return (
        <View style={{
          width: responsiveWidth(94), padding: responsiveWidth(1), left: responsiveWidth(2)
        }}>
          <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: "400", lineHeight: responsiveHeight(2.5), color: "#000000", textAlign: 'justify', flexDirection: 'row' }} numberOfLines={showFullText ? undefined : 3}>
            {text}
          </Text>
          {text.length > 3 && (
            <View>
              {showFullText ? (
                <TouchableOpacity onPress={handleSeeLess}>
                  <Text style={{ color: 'blue' }}>See Less</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={toggleTextVisibility}>
                  <Text style={{ color: 'blue' }}>See More</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      );
    };


    const onSharePress = async () => {

      const options = {
        // Your default message
        // message: `${item.caption} `,
        message: imageUrl
      };
      try {
        const result = await Share.share(options);
        if (result.action === Share.sharedAction) {
          console.log('Post shared successfully');
          // Assuming you want to share the file after sharing via Share API
          const shareResponse = await privateApi.post('user/post/addShare', {
            userId: userId,
            // postUrl: imageUrl,
            postId: postId
          });
          console.log('File shared via API successfully');
          console.log("psotId", postId);
          const count = shareResponse.data.data;
          setShareCount(count.totalSharesCount);
          console.log("share count ", count.totalSharesCount)

        } else if (result.action === Share.dismissedAction) {
          console.log('Share dismissed');
        }
      } catch (error) {
        console.error('Error sharing post:', error.message);
      }
    };
    const [visible, setVisible] = useState(false)

    const handle_seemoreicon = () => {
      setVisible(!visible)
    }

    const [comvisible,setcomvisible] = useState(false)

    const commentvisible=()=>{
      setcomvisible(!comvisible)
    }

    const pinPost = async (postId) => {
      try {
        const body = {
          flag: 1,
          pinMediaId: postId
        };

        // Make API call to pin the post using postId
        const response = await privateAPI.post('/pin/addPin', body);
        // Handle response as needed
        console.log('Post pinned successfully:', response.data);
        Alert.alert('success', 'Post pinned successfully')
      } catch (error) {
        console.error('Error pinning post:', error);
      }
    };

    const reportPost = async (postId) => {
      try {
        const body = {
          postId: postId,
          reason: 'report'
        }
        const response = await privateAPI.post('/report/addPostReport', body);
        console.log('reported Post successfully:', response.data)
        Alert.alert('success', 'reported Post successfully')
      } catch (error) {
        console.log('Error repoting post:', error);
      }
    };
    const pinProfile = async (userId) => {
      try {
        const body = {
          flag: 0,
          pinProfileId: userId
        }
        const response = await privateAPI.post('pin/addPin', body);
        console.log('profile pinned successfully:', response.data)
        Alert.alert('success', 'profile pinned successfully')
      } catch (error) {
        console.log('Error pinning profile:', error);
      }
    };

    const [modalVisible, setModalVisible] = useState(false);

    const handleOptionPress = (option) => {
      console.log(option);
      // Handle the option press (e.g., navigate to edit screen, perform update, etc.)
      setModalVisible(false);
    };
    return (
      <View>
        <View style={{}}>
          <View>

            <View style={{ flexDirection: "row", alignItems: 'center' }}>

              {/* <LongTextComponent  text={caption}/> */}

              <View style={{ width: responsiveWidth(18), justifyContent: 'center', alignContent: 'center', left: responsiveWidth(2), bottom: responsiveHeight(1) }}>
                <TouchableOpacity style={{ marginLeft: responsiveWidth(0), width: responsiveWidth(13), height: responsiveHeight(7), borderWidth: responsiveWidth(0.5), borderRadius: responsiveWidth(3), backgroundColor: "grey", top: responsiveHeight(1) }} onPress={() => navigation.navigate('profilepage')}>
                  <Image source={{ uri: item.userProfilePic }} style={{ width: '100%', height: '100%', borderRadius: 10, }} resizeMode='stretch' />
                </TouchableOpacity>
                <View style={{ width: responsiveWidth(9), height: responsiveHeight(2.4), borderRadius: responsiveWidth(2), borderWidth: 1, backgroundColor: "#000000", left: responsiveWidth(2) }}>
                  <Text
                    style={{ color: "#ffffff", fontSize: responsiveFontSize(1.4), fontWeight: '800', left: responsiveWidth(0.2) }}>9.4</Text>
                  <View
                    style={{ width: responsiveWidth(3), height: responsiveHeight(1.8), left: responsiveWidth(4.8), bottom: responsiveHeight(1.9) }}>
                    <Image source={require('../../Assets/Home_Icon_And_Fonts/star_icon.png')}
                      style={{ width: "100%", height: "100%" }} resizeMode='stretch' />
                  </View>
                </View>


              </View>

              <View
                style={{ width: responsiveWidth(43), bottom: responsiveHeight(1.5) }}
              >
                <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { userId: item.userId, userName: item.userName })}>
                  <Text
                    style={{ fontSize: responsiveFontSize(2), fontWeight: "900", color: "#000000", letterSpacing: 0.5 }}>
                    {/* {name} */}
                    {item.userName}
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{ fontWeight: "500", color: "black", fontSize: responsiveFontSize(1.2),   }}>
                  {/* {profession} */}
                  {item.professionNames.join(',')}
                </Text>
                <View
                  style={{ width: responsiveWidth(10), height: responsiveHeight(2), top: responsiveHeight(0.6), flexDirection: 'row', right: responsiveWidth(1) }}>
                  <Image source={require('../../Assets/Home_Icon_And_Fonts/postfeed_loc.png')}
                    style={{ width: '40%', height: '100%',bottom:responsiveHeight(0.5) }} resizeMode='stretch' />

                  <Text
                    style={{ fontSize: responsiveFontSize(1.4), color: "black", fontWeight: '500',bottom:responsiveHeight(0.5),width: responsiveWidth(15) }}>
                    {/* {place} */}
                    {item.locationName}
                  </Text>
                </View>


              </View>
              <View
                style={{
                  width: responsiveWidth(8),
                  height: responsiveWidth(9),
                  borderRadius: responsiveWidth(5),
                  overflow: 'hidden',  // This ensures the image respects the border radius
                  justifyContent: 'center', // This centers the image
                  alignItems: 'center', // This centers the image
                  right: responsiveWidth(8),
                  bottom: responsiveHeight(2)
                }}
              >
                {pinStatus === true && (
                  <Image
                    source={require('../../Assets/Home_Icon_And_Fonts/pin_icon.png')}
                    style={{ width: '100%', height: '85%' }}
                    resizeMode='stretch'
                  />
                )}
              </View>

              <View
                style={{ flexDirection: "row", width: responsiveWidth(32), justifyContent: "space-evenly", alignItems: "center", bottom: responsiveHeight(2), right: responsiveWidth(4) }}>
                <Text style={{ fontWeight: "bold", color: "#000000", fontSize: responsiveHeight(2), right: responsiveWidth(2) }} >{elapsedTime}</Text>
                <View
                  style={{ width: responsiveWidth(6), height: responsiveHeight(3.6), borderRadius: responsiveWidth(5) , top:responsiveHeight(0.5)}}>
                  {privateOrPublic === true ?
                    <Image source={require('../../Assets/Home_Icon_And_Fonts/lock_icon.png')} style={{ width: "90%", height: '70%' }} resizeMode='stretch' />
                    :
                    <Image source={require('../../../components/Assets/Home_Icon_And_Fonts/public_earth.png')} style={{ width: "90%", height: '90%' }} resizeMode='stretch' />
                  }
                </View>
                <View style={{ flexDirection: "row", left: responsiveWidth(1) }}>
                  <Text
                    style={{ fontWeight: "bold", color: "#000000", width: responsiveWidth(3), fontSize: responsiveFontSize(2.5), width: "30%", left: responsiveWidth(1), }}>
                    {item.followersCount}</Text>
                  <Image source={require('../../Assets/Home_Icon_And_Fonts/Followers.png')} style={{ width: responsiveWidth(5), height: responsiveHeight(3) }}></Image>
                </View>

                <View>
                  <View>
                    <TouchableOpacity
                      onPress={handle_seemoreicon}
                      style={{ width: responsiveWidth(7), height: responsiveHeight(3.5), justifyContent: "center" }}>
                      {visible ? (
                        <Image source={require('../../../components/Assets/Home_Icon_And_Fonts/see_more_icon.png')}
                          style={{ width: '100%', height: '80%', backgroundColor: '#d3d3d3' }} />
                      ) : <Image source={require('../../../components/Assets/Home_Icon_And_Fonts/see_more_icon.png')}
                        style={{ width: '100%', height: '80%' }} resizeMode='stretch' />}
                    </TouchableOpacity>
                    {visible ? (
                      <View
                        style={{ position: "absolute", marginTop: responsiveHeight(4), right: responsiveWidth(2.2), width: responsiveWidth(35), height: responsiveHeight(10),  borderRadius: responsiveWidth(3), justifyContent: 'center', alignItems: 'center', rowGap: responsiveHeight(1.1), zIndex: 3 }}>
                        <TouchableOpacity onPress={() => pinPost(postId)}
                          style={{ height: responsiveHeight(5), width: responsiveWidth(30), backgroundColor: "#000000", borderRadius: responsiveWidth(2), alignItems: 'center', justifyContent:'center', borderColor: 'white', borderWidth: responsiveWidth(0.3), flexDirection: 'row', paddingHorizontal: responsiveWidth(2), columnGap: responsiveWidth(3) }} >
                          <Text
                            style={{ color: '#ffffff',fontWeight:"bold" , fontSize:responsiveFontSize(2)}}>Pin Post</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => pinProfile(userId)}
                          style={{ height: responsiveHeight(3), width: responsiveWidth(30), backgroundColor: "#000000", borderRadius: responsiveWidth(2), alignItems: 'center', borderColor: 'white', borderWidth: responsiveWidth(0.3), flexDirection: 'row', paddingHorizontal: responsiveWidth(2), columnGap: responsiveWidth(3) }} >
                          <Image style={{ height: responsiveHeight(3), width: responsiveWidth(3), tintColor: 'white', zIndex: 3 }} source={require('../../Assets/Home_Icon_And_Fonts/pin_icon.png')} resizeMode='stretch'></Image>
                          <Text
                            style={{ color: '#ffffff' }}>Pin Profile</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={() => reportPost(postId)}
                          style={{ height: responsiveHeight(5), width: responsiveWidth(30), backgroundColor: "#000000", borderRadius: responsiveWidth(2), justifyContent: 'center', borderColor: 'white', alignItems: 'center', borderWidth: responsiveWidth(0.3),bottom:responsiveHeight(1.1) }}
                        >
                          <Text
                            style={{ color: '#ffffff',fontWeight:"bold", fontSize:responsiveFontSize(2) }}
                          >Report Post</Text>
                        </TouchableOpacity>

                      </View>
                    ) : null}
                  </View>
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
                  {item.description}
                </Text>
                {/* </LongTextComponent> */}
              </Text>
            </View>


            <TouchableOpacity onPress={() => setPaused(!paused)}>
              <View style={{ borderColor: "grey", width: responsiveWidth(100), height: responsiveHeight(50), paddingLeft: responsiveWidth(3), paddingRight: responsiveWidth(3) }}>
                <Swiper style={styles.wrapper} showsButtons={false} loop={true}>
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
                              source={require('../../../components/Assets/video/play_button.png')}
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
              <View>

                {/* like button */}
                <Text
                  style={{ textAlign: "center", fontWeight: "500", fontSize: responsiveFontSize(1.4), fontWeight: "500", color: "#000000" }}>{likeCount} likes</Text>
                <TouchableOpacity
                  onPress={() => handleLikePress(item.id)} // Call handleLikePress with postId
                  style={{
                    width: responsiveWidth(28),
                    height: responsiveHeight(4.5),
                    borderWidth: 1,
                    borderRadius: responsiveWidth(2),
                    flexDirection: "row",
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{ width: responsiveWidth(6), height: responsiveHeight(3.5), right: responsiveWidth(1) }}>
                    {likeStatus ? // Check if LikeStatus is true
                      <Image source={require('../../../components/Assets/Home_Icon_And_Fonts/Like_after_Icon.png')} style={{ width: "100%", height: "100%", }} resizeMode='stretch'/>
                      :
                      <Image source={require('../../Assets/Home_Icon_And_Fonts/Like_icon.png')} style={{ width: "100%", height: "98%", }} resizeMode='stretch' />
                    }
                  </View>
                  <Text style={{ alignSelf: "center", fontSize: responsiveFontSize(1.9), fontWeight: "500", color: "#000000" }}>
                    {likeStatus ? "LIke" : "Like"} {/* Conditional rendering for Like/Unlike text */}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* comments button */}
              <View >
                <Text
                  style={{ textAlign: "center", fontWeight: "500", fontSize: responsiveFontSize(1.4), fontWeight: "500", color: "#000000", right: responsiveWidth(2.1) }}>{commentCount} Comments</Text>
                <TouchableOpacity
                  onPress={() => onCommentPress(item.id)}
                  style={{ width: responsiveWidth(28), height: responsiveHeight(4.5), borderWidth: 1, borderRadius: responsiveWidth(2), flexDirection: "row", justifyContent: 'center', alignItems: 'center', right: responsiveWidth(2) }}>
                  <View
                    style={{ width: responsiveWidth(6), height: responsiveHeight(3.5), right: responsiveWidth(1) }}>
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
                <Text style={{ textAlign: "center", fontWeight: "500", fontSize: responsiveFontSize(1.4), fontWeight: "500", color: "#000000", right: responsiveWidth(5) }}>{shareCount} Shares</Text>
                <TouchableOpacity
                  onPress={() => onSharePress(item.filePath, item.userId)}
                  style={{ width: responsiveWidth(28), height: responsiveHeight(4.5), borderWidth: 1, borderRadius: responsiveWidth(2), flexDirection: "row", justifyContent: 'center', alignItems: 'center', right: responsiveWidth(2) }}>
                  <View
                    style={{ width: responsiveWidth(6), height: responsiveHeight(3.5), right: responsiveWidth(1) }}>
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
                  style={{ width: responsiveWidth(10), height: responsiveWidth(10), borderRadius: responsiveWidth(8), top: responsiveHeight(48), borderWidth: responsiveWidth(0.1), borderColor: 'black', right: responsiveWidth(3) }}>
                  <Image source={{ uri: profileURL }}
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
                        <View key={index} style={styles.commentItem} >
                          <View style={{ flexDirection: 'row', columnGap: responsiveWidth(13) }}>
                            <View style={{ flexDirection: 'row', width: responsiveWidth(65) }}>
                              <TouchableOpacity
                                style={{ width: responsiveWidth(8), height: responsiveWidth(8), borderColor: '#000000', borderRadius: responsiveWidth(8) }}>
                                <Image source={{ uri: comment.userProfilePic }}
                                  style={{ width: responsiveWidth(8), height: responsiveWidth(8), borderRadius: responsiveWidth(8) }} />
                              </TouchableOpacity>
                              <TouchableOpacity style={{ left: 3 }}>
                                <Text style={{ fontSize: 10, color: '#000000', fontWeight: '700' }}>{comment.userName}</Text>
                              </TouchableOpacity>
                              <Text style={{ fontSize: 10, color: '#000000', height: 15, fontWeight: '400', top: 13, left: -45 }}>{comment.time}</Text>
                            </View>
                            <View>
                            {/* onPress={() => handle_cmnt_dlt(comment.commentId)} */}
                            <TouchableOpacity
        onPress={commentvisible}
        style={{ width: responsiveWidth(5), height: responsiveWidth(5), top: 2 }}
      >
         {visible ? (
        <Image
          source={require('../../../components/Assets/Home_Icon_And_Fonts/see_more_icon.png')}
          style={{ width: '100%', height: '100%' }}
        />
      ) : <Image
      source={require('../../../components/Assets/Home_Icon_And_Fonts/see_more_icon.png')}
      style={{ width: '100%', height: '100%' }}
    />}
      </TouchableOpacity>

      {comvisible ? (
        <View
          style={{
            position: 'absolute',
          
            right: responsiveWidth(3.5),
            width: responsiveWidth(35),
            height: responsiveHeight(10),
            borderRadius: responsiveWidth(3),
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: responsiveHeight(1.1),
            zIndex: 3,
            backgroundColor: '#ffffff', // Added background color for visibility
          }}
        >
          <TouchableOpacity
          
            style={{
              height: responsiveHeight(4),
              width: responsiveWidth(15),
              backgroundColor: '#000000',
              borderRadius: responsiveWidth(2),
              alignItems: 'center',
              borderColor: 'white',
              borderWidth: responsiveWidth(0.3),
              flexDirection: 'row',
              paddingHorizontal: responsiveWidth(2),
              columnGap: responsiveWidth(3),
              bottom:responsiveHeight(1)
            }}
          >
          
            <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
           
            style={{
              height: responsiveHeight(4),
              width: responsiveWidth(14),
              backgroundColor: '#000000',
              borderRadius: responsiveWidth(2),
              justifyContent: 'center',
              borderColor: 'white',
              alignItems: 'center',
              borderWidth: responsiveWidth(0.3),
              bottom: responsiveHeight(2.2),
            }}
          >
            <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Delete</Text>
          </TouchableOpacity>
        </View>
      ) : null}
                            </View>
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
  

  playButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: '50%', // Position the button at the vertical center of the container
    left: '50%', // Position the button at the horizontal center of the container
    marginLeft: -25, // Adjust for half of the button width to center it precisely
    marginTop: -25, // Adjust for half of the button height to center it precisely
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#F3F3F3',
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
    bottom: responsiveHeight(3),
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
    marginBottom: responsiveHeight(1.5),
    padding: responsiveWidth(2),
    backgroundColor: '#f0f0f0',
    borderRadius: responsiveWidth(3),
    backgroundColor: 'white'


  },
  
  
})