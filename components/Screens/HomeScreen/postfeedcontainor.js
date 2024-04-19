import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, TextInput, ScrollView, Share } from 'react-native'
import React, { useState, useEffect } from 'react'
import Modal from 'react-native-modal'
import ImagePicker from 'react-native-image-crop-picker'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Postfeedcontainor() {
  const [postData, setPostData] = useState([]);

  //-------------------------------------------
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

      </View>
    );
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };



  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    try {
      const jwt = await AsyncStorage.getItem("jwt");
      const response = await fetch(`http://13.238.143.66:8080/filmhook-0.0.1-SNAPSHOT/user/gallery/downloadGalleryFiles?userId=3&category=Gallery`, {
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

      // Convert base64Images array to postData format
      const postData = base64Images.map((image, index) => ({
        id: index + 1,
        image: image
      }));

      setPostData(postData);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch images');
    }
  };

  const blobToBase64 = async (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = () => reject(new Error('Failed to convert blob to base64'));
      reader.readAsDataURL(blob);
    });
  };
  const renderItem = ({ item }) => (
    <ImageItem {...item} />
  );

  // ImageItem component
  const ImageItem = ({ id, image }) => (
    <View key={id} style={{ padding: 10 }}>
      <Image source={{ uri: `data:image/jpeg;base64,${image}` }} style={{ width: '100%', height: 200 }} />
    </View>
  );

  //renderitem lists
  const Datas = ({ id, profilepic, name, profession, place, caption, image, view_type }) => {

    // for number format functions

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
    const [like, setLike] = useState(0)
    const [hitlike, setHitlike] = useState(false)

    const onLikePress = (id) => {
      console.log(id);
      setHitlike(!hitlike)
      setLike(hitlike ? like - 1 : like + 1)
    }
    //for like and dislike
    //======================================================

    // for comment section

    const [isCommentVisible, setCommentVisible] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);

    const onCommentPress = (id) => {
      console.log(id);
      setCommentVisible(!isCommentVisible);
    };

    const closeCommentModal = () => {
      setCommentVisible(!isCommentVisible);
    };

    const handleCommentSubmit = () => {

      // Trim the comment text to remove leading and trailing whitespaces
      const trimmedComment = commentText.trim();

      // Check if the trimmed comment is empty or consists only of whitespaces
      if (!trimmedComment) {
        // Show an alert or perform any other validation action
        alert('Comment section shouldnot be empty');
        return;
      }

      // Handle the submission of the comment text
      const newComment = {
        id: comments.length + 1,
        text: trimmedComment,
      };


      setComments([newComment, ...comments]);

      // Clear the comment input
      setCommentText('');

      // Close the comment modal smoothly
      //closeCommentModal();
    };

    // comment delete option
    const handle_cmnt_dlt = (id) => {
      const cmt_lists = comments.filter((item) => item.id !== id)
      setComments(cmt_lists)
    }
    // for comment section


    //===========================================================
    // for share option
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
    // for share option


    // const onCommentPress=(id)=>{
    //    console.log(id);
    //    alert(`you clicked ${name}`)
    // }

    //   const onSharePress=(id)=>{
    //     console.log(id);
    //     alert(`you clicked ${name}`)
    //  }

    // for see more modal

    const [visible, setVisible] = useState(false)

    const handle_seemoreicon = () => {
      setVisible(!visible)
    }
    return (
      <ScrollView>
        {postData.map((item) => (
          <ImageItem key={item.id} {...item} />
        ))}
      </ScrollView>
    );
  }
  return (
    <>
      <FlatList
        data={postData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Modal for detailed view */}
      <Modal visible={modalVisible} animationType="slide" onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <Image source={{ uri: selectedItem?.image }} style={styles.modalImage} />
          <Text style={styles.profileText}>
            {selectedItem?.profile.name} - {selectedItem?.profile.bio}
          </Text>
          <Text style={styles.contentText}>{selectedItem?.content}</Text>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  )
} const styles = StyleSheet.create({
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
