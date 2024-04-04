// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { BiographyProvider } from './BiographyContext';
// import BiographyScreen from './BiographyScreen';
// import EditBiographyScreen from './EditBiographyScreen';
// import ProfileRoot from './Screens/UserProfileScreen/ProfileMain/ProfileRoot';
// import { ScrollView, Text } from 'react-native';
// import PersonalRoot from './PersonalRoot';



// const Stack = createStackNavigator();

// export default function BioRoot() {
//   return (
//    <>

//       <BiographyProvider>
//         <Stack.Navigator>
       
//           <Stack.Screen name="Biography" component={BiographyScreen}  options={{headerShown:false}}/>
//           <Stack.Screen name="EditBiography" component={EditBiographyScreen}  options={{headerShown:false}} />

//         </Stack.Navigator>
//       </BiographyProvider>

//       {/* <PersonalRoot/> */}

 
//  </>
   
//   );
// }

//---------------------HomePage-------------------------------------
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

// const HomePage = () => {
//   const [status, setStatus] = useState('');
//   const [posts, setPosts] = useState([]);

//   // Function to handle status update
//   const handleStatusUpdate = () => {
//     if (status.trim() !== '') {
//       setPosts(prevPosts => [...prevPosts, { id: Date.now(), text: status, likes: 0, comments: [] }]);
//       setStatus('');
//     }
//   };

//   // Function to handle like button press
//   const handleLike = (postId) => {
//     setPosts(prevPosts => prevPosts.map(post => {
//       if (post.id === postId) {
//         return { ...post, likes: post.likes + 1 };
//       }
//       return post;
//     }));
//   };

//   // Function to handle comment submission
//   const handleComment = (postId, comment) => {
//     setPosts(prevPosts => prevPosts.map(post => {
//       if (post.id === postId) {
//         return { ...post, comments: [...post.comments, comment] };
//       }
//       return post;
//     }));
//   };

//   return (
//     <View style={styles.container}>
//       {/* Status input */}
//       <View style={styles.statusContainer}>
//         <TextInput
//           style={styles.statusInput}
//           placeholder="What's on your mind?"
//           value={status}
//           onChangeText={setStatus}
//         />
//         <Button title="Post" onPress={handleStatusUpdate} />
//       </View>

//       {/* Posts */}
//       <FlatList
//         data={posts}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.postContainer}>
//             {/* Profile Picture */}
//             <Image
//               source={require('../components/Assets/AllSearch_Icon_And_Fonts/Booking.png')} // Replace 'PROFILE_PICTURE_URL' with the actual URL of the profile picture
//               style={styles.profileImage}
//             />

//             {/* Post Content */}
//             <View style={{ flex: 1 }}>
//               <Text style={styles.postText}>{item.text}</Text>

//               {/* Like Button */}
//               <TouchableOpacity onPress={() => handleLike(item.id)}>
//                 <Text style={styles.actionText}>{item.likes} Likes</Text>
//               </TouchableOpacity>

//               {/* Comment Section */}
//               <View style={styles.commentContainer}>
//                 {item.comments.map((comment, index) => (
//                   <Text key={index} style={styles.commentText}>{comment}</Text>
//                 ))}
//               </View>

//               {/* Comment Input */}
//               <TextInput
//                 style={styles.commentInput}
//                 placeholder="Add a comment..."
//                 onSubmitEditing={({ nativeEvent }) => handleComment(item.id, nativeEvent.text)}
//               />
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   statusInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//   },
//   postContainer: {
//     flexDirection: 'row',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   postText: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   actionText: {
//     color: 'blue',
//     marginBottom: 5,
//   },
//   commentContainer: {
//     marginVertical: 5,
//   },
//   commentText: {
//     fontSize: 14,
//     color: '#555',
//   },
//   commentInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 5,
//     marginTop: 5,
//   },
// });

// export default HomePage;

//----------------------dateFormat--------------------

import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateInputField = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editedDate, setEditedDate] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setSelectedDate(currentDate);
    setEditedDate(currentDate.toISOString().slice(0, 10)); // Update editedDate when date is changed
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
    
  };
 // console.log(editedDate)

  return (
    <View>
      <Button title="Select Date" onPress={openDatePicker} />
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      <TextInput
      placeholder='YYYY-MM-DD'
        value={editedDate}
        onChangeText={setEditedDate} // Update editedDate when TextInput changes
      />
    </View>
  );
};

export default DateInputField;




//---------------------------------------------------
// import React, { useState } from 'react';
// import { View, TextInput, Button } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';

// const DateInput = () => {
//   const [date, setDate] = useState(new Date());

//   const handleDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setDate(currentDate);
//   };

//   return (
//     <View>
//       <DateTimePicker
//         testID="dateTimePicker"
//         value={date}
//         mode="date"
//         is24Hour={true}
//         display="default"
//         onChange={handleDateChange}
//       />
//       <TextInput
//         style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, paddingHorizontal: 10 }}
//         onChangeText={(text) => setDate(text)}
//         value={date.toISOString().split('T')[0]} // Display in yyyy-mm-dd format
//         keyboardType="numeric"
//       />
//     </View>
//   );
// };

// export default DateInput;
