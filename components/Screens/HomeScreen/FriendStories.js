import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import privateAPI from '../../api/privateAPI';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FriendStories = () => {
  const [storyData, setStoryData] = useState([]);
  const navigation = useNavigation();

  const processProfessions = (professions) => {
    if (!professions || !Array.isArray(professions)) {
      return '';
    }
    return professions.length > 1 ? `${professions[0]}...` : professions[0];
  };

  const formatName = (name) => {
    if (!name) return '';
    return name.length > 10 ? `${name.substring(0, 10)}...` : name;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        const response = await privateAPI.get(`user/stories/getUserIdAndName?userId=${id}`);
        if (response.data && Array.isArray(response.data.data)) {
          const stories = response.data.data.map(item => ({
            id: item.userId,
            name: item.userName,
            profilePicUrl: item.profilePicUrl,
            additionalImageUrl: null,
            professions: processProfessions(item.professionName)
          }));
          setStoryData(stories);

          await Promise.all(
            stories.map(async (story, index) => {
              try {
                const additionalResponse = await privateAPI.get(`/user/stories/getUserStories?userId=${story.id}`);
                if (additionalResponse.data && Array.isArray(additionalResponse.data.data)) {
                  const imageUrl = additionalResponse.data.data[0]?.fileOutputWebModel[0]?.filePath || null;
                  setStoryData(prevData => {
                    const updatedStories = [...prevData];
                    updatedStories[index].additionalImageUrl = imageUrl;
                    return updatedStories;
                  });
                }
              } catch (error) {
                console.error('Error fetching additional image URL for user:', story.id, error);
              }
            })
          );
        } else {
          console.error('Invalid response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching story data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {storyData.map(item => (
        <View key={item.id} style={styles.friendStoryContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Status')}>
            <View style={styles.additionalImgContainer}>
              {item.additionalImageUrl && (
                <Image source={{ uri: item.additionalImageUrl }} style={styles.additionalImg} />
              )}
            </View>
            <View style={styles.profileImgContainer}>
              <Image source={{ uri: item.profilePicUrl }} style={styles.profileImg} />
            </View>
            <View style={styles.friendNameContainer}>
              <Text style={styles.friendName}>{formatName(item.name)}</Text>
              {/* <View style={styles.roleContainer}>
                <Text style={styles.roleText}>{item.professions}</Text>
              </View> */}
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  friendStoryContainer: {
    borderColor: 'lightgrey',
    borderRadius: 10,
    marginLeft: 5,
    position: 'relative',
    padding: responsiveWidth(0.5),
    right:responsiveWidth(7)
  },
  profileImg: {
    height: responsiveHeight(3),
    width: responsiveWidth(5.7),
    borderRadius: 50,
  },
  profileImgContainer: {
    position: 'absolute',
    top: responsiveHeight(10),
    left: 5,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 50,
    height: responsiveHeight(3.5),
    width: responsiveWidth(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendNameContainer: {
    position: 'absolute',
    left: responsiveWidth(7),
    width: '70%',
    padding: 10,
    top: responsiveHeight(9),
  },
  friendName: {
    color: 'white',
    fontSize: responsiveFontSize(1.2),
    fontWeight: '900',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  additionalImgContainer: {
    alignItems: 'center',
  },
  additionalImg: {
    height: responsiveHeight(14),
    width: responsiveWidth(22),
    borderRadius: 10,
    borderWidth:responsiveWidth(0.2),
    borderColor:"gray"
    
  },
  roleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '70%',
    top: responsiveHeight(3),
    left: responsiveWidth(2),
  },
  roleText: {
    color: 'white',
    fontSize: responsiveFontSize(0.7),
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
});

export default FriendStories;



// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import privateAPI from '../../api/privateAPI';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const FriendStories = () => {
//   const [storyData, setStoryData] = useState([]);
//   const navigation = useNavigation();

//   const processProfessions = (professions) => {
//     if (!professions || !Array.isArray(professions)) {
//       return '';
//     }
//     return professions.length > 1 ? `${professions[0]}...` : professions[0];
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const id = await AsyncStorage.getItem('userId');
//         const response = await privateAPI.get(`user/stories/getUserIdAndName?userId=${id}`);
//         if (response.data && Array.isArray(response.data.data)) {
//           const stories = response.data.data.map(item => ({
//             id: item.userId,
//             name: item.userName,
//             profilePicUrl: item.profilePicUrl,
//             additionalImageUrl: null,
//             professions: processProfessions(item.professionName),
//             statusCount: 0 // Initialize status count
//           }));
//           setStoryData(stories);

//           await Promise.all(
//             stories.map(async (story, index) => {
//               try {
//                 const additionalResponse = await privateAPI.get(`/user/stories/getUserStories?userId=${story.id}`);
//                 if (additionalResponse.data && Array.isArray(additionalResponse.data.data)) {
//                   const imageUrl = additionalResponse.data.data[0]?.fileOutputWebModel[0]?.filePath || null;
//                   const statusCount = additionalResponse.data.data.length; // Get the number of statuses

//                   setStoryData(prevData => {
//                     const updatedStories = [...prevData];
//                     updatedStories[index].additionalImageUrl = imageUrl;
//                     updatedStories[index].statusCount = statusCount; // Update status count
//                     return updatedStories;
//                   });
//                 }
//               } catch (error) {
//                 console.error('Error fetching additional image URL for user:', story.id, error);
//               }
//             })
//           );
//         } else {
//           console.error('Invalid response format:', response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching story data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const renderStatusDots = (count) => {
//     return (
//       <View style={styles.dotsContainer}>
//         {Array.from({ length: count }).map((_, index) => (
//           <View key={index} style={styles.dot} />
//         ))}
//       </View>
//     );
//   };

//   return (
//     <>
//       {storyData.map(item => (
//         <View key={item.id} style={styles.friendStoryContainer}>
//           <TouchableOpacity onPress={() => navigation.navigate('Status')}>
//             <View style={styles.additionalImgContainer}>
//               {item.additionalImageUrl && (
//                 <Image source={{ uri: item.additionalImageUrl }} style={styles.additionalImg} />
//               )}
//             </View>
//             <View style={styles.profileImgContainer}>
//               <Image source={{ uri: item.profilePicUrl }} style={styles.profileImg} />
//             </View>
//             <View style={styles.friendNameContainer}>
//               <Text style={styles.friendName}>{item.name}</Text>
//               <View style={styles.roleContainer}>
//                 <Text style={styles.roleText}>{item.professions}</Text>
//               </View>
//             </View>
//             {renderStatusDots(item.statusCount)} {/* Render the status dots */}
//           </TouchableOpacity>
//         </View>
//       ))}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   friendStoryContainer: {
//     borderColor: 'lightgrey',
//     borderRadius: 10,
//     marginLeft: 5,
//     position: 'relative',
//     padding: responsiveWidth(1)
//   },
//   profileImg: {
//     height: 30,
//     width: 30,
//     borderRadius: 50,
//   },
//   profileImgContainer: {
//     position: 'absolute',
//     top: responsiveHeight(12.4),
//     left: 5,
//     borderWidth: 3,
//     borderColor: 'white',
//     borderRadius: 50,
//     height: 36,
//     width: 36,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   friendNameContainer: {
//     position: 'absolute',
//     left: responsiveWidth(9),
//     width: '70%',
//     padding: 10,
//     top: responsiveHeight(11.5),
//   },
//   friendName: {
//     color: 'white',
//     fontSize: responsiveFontSize(1.3),
//     fontWeight: 'bold',
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: { width: -1, height: 1 },
//     textShadowRadius: 5,
//   },
//   additionalImgContainer: {
//     alignItems: 'center',
//   },
//   additionalImg: {
//     height: responsiveHeight(17),
//     width: responsiveWidth(28),
//     borderRadius: 10,
//   },
//   roleContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     bottom: 0,
//     width: '70%',
//     top: responsiveHeight(3),
//     left: responsiveWidth(2),
//   },
//   roleText: {
//     color: 'white',
//     fontSize: responsiveFontSize(0.8),
//     fontWeight: '900',
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: { width: -1, height: 1 },
//     textShadowRadius: 5,
//   },
//   dotsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: responsiveHeight(1),
//   },
//   dot: {
//     width: responsiveWidth(1),
//     height: responsiveWidth(1),
//     borderRadius: responsiveWidth(0.5),
//     backgroundColor: 'white',
//     marginHorizontal: responsiveWidth(0.5),
//   },
// });

// export default FriendStories;