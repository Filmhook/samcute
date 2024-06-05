import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Pressable, FlatList, Platform, StyleSheet } from 'react-native';
import Modal from 'react-native-modal'; // Import the Modal component

// for firebase 
import { app, database } from '../../../../FirebaseConfig';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

// for firebase 

const Post_input = () => {
  const [visible, setVisible] = useState(false);
  const [textstory, setTextstory] = useState('');
  const [post, setPost] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [postVisibility, setPostVisibility] = useState('public');

  const handleFocus = () => {
    setVisible(!visible);
  };

  const handlePost = () => {
    const trimmedPost = textstory.trim();

    if (!trimmedPost) {
      alert('Status field should not be empty');
      return;
    }

    setPost(trimmedPost);
    setTextstory('');

    // Close the modal
    setVisible(!visible);

    // Firebase code to save data to the database
    postData();
  };

  // Firebase Firestore setup
  const firestore = getFirestore(app)
  const collectionName = 'Homepage-post';

  const postData = async () => {
    try {
      const docRef = await addDoc(collection(firestore, collectionName), {
        caption: textstory,
        view_type: postVisibility,
        timestamp: serverTimestamp(),
        postId: Math.random().toString(36).substring(2),
      })
      alert('Posted Successfully');
      console.log('Document written with ID: ', docRef.id);
      console.log('Post :', docRef);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  const showDropdown = () => {
    setIsDropdownVisible(true);
  };

  const hideDropdown = () => {
    setIsDropdownVisible(false);
  };

  const selectVisibility = (value) => {
    setPostVisibility(value);
    hideDropdown();
  };

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity onPress={() => selectVisibility(item.value)} style={{ padding: 10 }}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <>
     <View style={[styles.card, styles.shadowProp]}>

        <Pressable onPress={handleFocus}>
          <View style={{ pointerEvents: 'none' }}>
            <TextInput
              placeholder="What is in your mind?"
              showSoftInputOnFocus={false}
              placeholderTextColor={'gray'}
              style={{ left: responsiveWidth(1),fontSize:responsiveFontSize(2.5) }}
            />
          </View>
        </Pressable>

        <TouchableOpacity
          style={{ width: responsiveWidth(6), height: responsiveHeight(3), position: 'absolute', left: responsiveWidth(55) }}>
          {/* You can use a microphone icon image here */}
          <Image source={require('../../../Assets/Chats_Icon_And_Fonts/Filmhook_mic.png')} style={{ width: "100%", height: "100%" }} resizeMode='stretch' />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{justifyContent:'center',alignItems:'center',backgroundColor:'black',height:responsiveHeight(4),width:responsiveWidth(14),borderRadius:responsiveHeight(1),top:responsiveHeight(2.5),right:responsiveWidth(4.5)}}>
        <Text style={{color:'white',fontSize:responsiveFontSize(2.3)}}>Post</Text>
      </TouchableOpacity>

      {/* this modal for type post and post cancel icon */}
      <Modal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        backdropTransitionInTiming={500}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        backdropOpacity={0.5}
      >
        <View style={{ backgroundColor: '#ffffff', height: responsiveHeight(25), borderRadius: responsiveWidth(2), width: responsiveWidth(85), marginLeft: responsiveWidth(2) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: responsiveWidth(12), marginTop: responsiveHeight(3) }}>
            <TextInput
              value={textstory}
              placeholder="Write your caption..."
              multiline={true}
              onChangeText={(e) => setTextstory(e)}
              style={{ borderWidth: responsiveWidth(0.3), width: responsiveWidth(65), borderRadius: responsiveWidth(3), height: responsiveHeight(12), overflow: 'scroll' }}
            />
          </View>
          <View style={{ width: responsiveWidth(65), marginTop: responsiveHeight(1.4), flexDirection: 'row', left: responsiveWidth(12), justifyContent: 'space-around', }}>
            <TouchableOpacity
              onPress={() => setVisible(!visible)}
              style={{ width: responsiveWidth(20), height: responsiveHeight(4), backgroundColor: '#000000', borderRadius: responsiveWidth(2), justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#ffffff', fontWeight: 600 }}>Cancel</Text>
            </TouchableOpacity>
            {/* Custom dropdown for post visibility */}
            <TouchableOpacity
              onPress={isDropdownVisible ? hideDropdown : showDropdown}
              style={{ height: responsiveHeight(4), width: responsiveWidth(20), justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#000000', borderRadius: responsiveWidth(2) }}>
              <Text style={{ fontWeight: 600 }}>{postVisibility}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePost}
              style={{ width: responsiveWidth(20), height: responsiveHeight(4), backgroundColor: '#000000', borderRadius: responsiveWidth(2), justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#ffffff', fontWeight: 600 }}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* this modal for type post and post cancel icon */}

      {/* Modal for dropdown options */}
      <Modal
        isVisible={isDropdownVisible}
        onBackdropPress={hideDropdown}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={{ margin: 0 }}
      >
        <View style={{ backgroundColor: '#ffffff', padding: responsiveWidth(2), borderRadius: responsiveWidth(2), borderWidth: responsiveWidth(0.2), width: responsiveWidth(70), alignSelf: 'center' }}>
          <FlatList
            data={[
              { label: 'Public', value: 'public' },
              { label: 'Private', value: 'private' },
            ]}
            keyExtractor={(item) => item.value}
            renderItem={renderDropdownItem}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: responsiveWidth(2),
    width: responsiveWidth(65),
    right: responsiveWidth(6.5),
    height: responsiveHeight(7),
    // backgroundColor: 'white',
    top:responsiveHeight(1)
  },
  shadowProp: {
    shadowColor: 'black',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 0,
  },
});

export default Post_input;