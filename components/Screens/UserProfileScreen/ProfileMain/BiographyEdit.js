// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';

// const UserProfile = () => {
//   const [editing, setEditing] = useState(false);
//   const [user, setUser] = useState({
//     name: 'John Doe',
//     profilePic: 'https://example.com/profilepic.jpg',
//     bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   });

//   const handleEditProfile = () => {
//     setEditing(true);
//   };

//   const handleSaveProfile = (editedUser) => {
//     setUser(editedUser);
//     setEditing(false); // Turn off editing mode
//   };

//   return (
//     <View style={styles.container}>
//       {editing ? (
//         <EditProfile user={user} onSave={handleSaveProfile} onCancel={() => setEditing(false)} />
//       ) : (
//         <View style={styles.profileContainer}>
//           <Image source={{ uri: user.profilePic }} style={styles.profilePic} />
//           <Text style={styles.name}>{user.name}</Text>
//           <Text style={styles.bio}>{user.bio}</Text>
//           <Button title="Edit Profile" onPress={handleEditProfile} />
//         </View>
//       )}
//     </View>
//   );
// };

// const EditProfile = ({ user, onSave, onCancel }) => {
//   const [editedUser, setEditedUser] = useState(user);

//   const handleNameChange = (name) => {
//     setEditedUser({ ...editedUser, name });
//   };

//   const handleBioChange = (bio) => {
//     setEditedUser({ ...editedUser, bio });
//   };

//   const handleSave = () => {
//     onSave(editedUser); // Save the edited user data
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.profilePicContainer}>
//         <Image source={{ uri: editedUser.profilePic }} style={styles.profilePic} />
//       </View>
//       <TextInput
//         style={styles.input}
//         value={editedUser.name}
//         onChangeText={handleNameChange}
//         placeholder="Name"
//       />
//       <TextInput
//         style={styles.input}
//         value={editedUser.bio}
//         onChangeText={handleBioChange}
//         placeholder="Bio"
//         multiline={true}
//       />
//       <Button title="Save" onPress={handleSave} />
//       <Button title="Cancel" onPress={onCancel} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   profileContainer: {
//     alignItems: 'center',
//   },
//   profilePicContainer: {
//     marginBottom: 20,
//   },
//   profilePic: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     marginBottom: 10,
//     borderWidth:2
//   },
//   input: {
//     width: '100%',
//     height: 40,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   bio: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 10,
//   },
// });

// export default UserProfile;

import React, { useState } from 'react';
import { Image } from 'react-native';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ImageBackground } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const UserProfile = () => {
    const [name, setName] = useState('John Doe');
    const [bio, setBio] = useState('Hello, I am John Doe.');
    const [education, setEducation] = useState('Computer Science');
    const [dob, setDob] = useState('131');
    const [nationality, setNationality] = useState('');
    const [address, setAddress] = useState('jnjknkjnkn');
    const [dobe, setDobe] = useState('8888');
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        // Save the edited profile details
        setIsEditing(false);
        // You can send the updated profile details to your backend or update the state accordingly
    };

    return (
        <View style={style.container}>
            <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Text style={style.editButton}>Edit</Text>
            </TouchableOpacity>

            <View style={style.profileInfo}>
                <Text style={style.label}>Name:</Text>
                {isEditing ? (
                    <TextInput
                        style={style.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter your name"
                    />
                ) : (
                    <Text>{name}</Text>
                )}

                {/* Bio, Education, DOB, Nationality, Address */}
                {/* Implement similar logic for bio, education, dob, nationality, address */}

                {/* Date of Birth */}
                <Text style={style.label}>Date of Birth:</Text>
                {isEditing ? (
                    <TextInput
                        style={style.input}
                        value={dob}
                        onChangeText={setDob}
                        placeholder="Enter your date of birth"
                    />
                ) : (
                    <Text>{dob}</Text>
                )}

                {/* Nationality */}
                {/* <Text style={styles.label}>Nationality:</Text>
                {isEditing ? (
                    <TextInput
                        style={styles.input}
                        value={nationality}
                        onChangeText={setNationality}
                        placeholder="Enter your nationality"
                    />
                ) : (
                    <Text>{nationality}</Text>
                )} */}

                {/* Address */}
                <Text style={style.label}>Address:</Text>

                {isEditing ? (
                    <ImageBackground style={{ padding: 8, width: responsiveWidth(60) }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                        <TextInput
                            style={style.input}
                            value={address}
                            onChangeText={setAddress}
                            placeholder="Enter your address"
                        />
                    </ImageBackground>
                ) : (
                    <ImageBackground style={{ padding: 8, width: responsiveWidth(60) }} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                        <Text>{address}</Text>
                    </ImageBackground>
                )}
            </View>
            <View style={style.containerbio}>
                <View style={style.bio_title}>
                    <Text style={style.bio_title_text}>Biography</Text>
                </View>
                {/* 
                <TouchableOpacity  onPress={navigation.navigate('BiographyEdit')}>
                    <Text>Edit</Text>
                </TouchableOpacity> */}

                {/* ///////////////////////////////////////////////*/}
                <View style={style.bio_content}>
                    <View style={style.bio_content_section}>
                        <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                            <View style={{ marginLeft: responsiveWidth(0.2), marginTop: responsiveHeight(0.5), width: responsiveWidth(7.2), height: responsiveHeight(4), }}>
                                <Image source={require("../../../Assets/Userprofile_And_Fonts/update/Dob_Icon.png")} style={{ width: '100%', height: '100%' }} />

                            </View>


                            <View style={style.bioTextContainer}>
                                <Text style={{
                                    fontSize: responsiveFontSize(2),
                                    color: '#000000',
                                    fontWeight: '500',
                                    fontFamily: "Times New Roman",
                                    top: responsiveHeight(-3.5),
                                    // top:responsiveHeight(1)
                                }}>
                                    Date of Birth</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    {/* ///////////////////////////////////////////////*/}
                    <View style={style.bio_content_section}>
                        <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                            <View style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5) }}>
                                <Image source={require("../../../Assets/Userprofile_And_Fonts/update/Gender_Icon.png")}
                                    style={{ width: '100%', height: '100%' }} />
                            </View>
                            <View style={style.bioTextContainer}>
                                <Text style={{
                                    fontSize: responsiveFontSize(2),
                                    color: '#000000',
                                    fontWeight: '500',
                                    fontFamily: "Times New Roman",
                                    top: responsiveHeight(-3.5),
                                    // top:responsiveHeight(1)

                                }}>
                                    Gender
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>
                  
                    <View style={style.bio_content_section}>
                        <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                            <View style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5) }}>
                                <Image source={require("../../../Assets/Userprofile_And_Fonts/update/hometown_icon.png")}
                                    style={{ width: '100%', height: '100%' }} />
                            </View>
                            <View style={style.bioTextContainer}>
                                <Text style={{
                                    fontSize: responsiveFontSize(2),
                                    color: '#000000',
                                    fontWeight: '500',
                                    fontFamily: "Times New Roman",
                                    top: responsiveHeight(-3)
                                }}>
                                    Nationality
                                </Text>


                            </View>
                        </ImageBackground>
                    </View>
                    {/* ///////////////////////////////////////////////*/}
                    <View style={style.bio_content_section}>
                        <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                            <View style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5) }}>
                                <Image source={require("../../../Assets/Userprofile_And_Fonts/update/Work_Exp.png")}
                                    style={{ width: '100%', height: '100%' }} />
                            </View>
                            <View style={style.bioTextContainer}>
                                <Text style={{
                                    fontSize: responsiveFontSize(2),
                                    color: '#000000',
                                    fontWeight: '500',
                                    fontFamily: "Times New Roman",
                                    top: responsiveHeight(-3.5)
                                }}>
                                    Work Experience
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>
                    {/* ///////////////////////////////////////////////*/}
                    <View style={style.bio_content_section}>
                        <ImageBackground style={style.inputContainer} source={require("../../../Assets/Login_page/Medium_B_User_Profile.png")} resizeMode="stretch">
                            <View style={{ width: responsiveWidth(7.2), height: responsiveHeight(4), marginLeft: responsiveWidth(1), marginTop: responsiveHeight(0.5) }}>
                                <Image source={require("../../../Assets/Userprofile_And_Fonts/update/Booking.png")}
                                    style={{ width: '100%', height: '100%' }} />
                            </View>
                            {isEditing ? (
                                <View style={style.bioTextContainer}>
                                    {/* <Text style={{
                                        fontSize: responsiveFontSize(2),
                                        color: '#000000',
                                        fontWeight: '500',
                                        fontFamily: "Times New Roman",
                                        top: responsiveHeight(-3.5)
                                    }}>
                                        Work Shedule
                                    </Text> */}
                                    <TextInput
                                        style={{ fontSize: responsiveFontSize(2),
                                            color: '#000000',
                                            fontWeight: '500',
                                            fontFamily: "Times New Roman",
                                            top: responsiveHeight(-3.5)}}
                                        value={dobe}
                                        onChangeText={setDobe}
                                        placeholder="dob"
                                    />
                                </View>
                            ) : (

                                <View style={style.bioTextContainer}>
                                    <Text style={{
                                        fontSize: responsiveFontSize(2),
                                        color: '#000000',
                                        fontWeight: '500',
                                        fontFamily: "Times New Roman",
                                        top: responsiveHeight(-3.5)
                                    }}>
                                        {dobe}
                                    </Text>
                                </View>
                            )}
                        </ImageBackground>
                    </View>
                    {/* ///////////////////////////////////////////////*/}
                </View>
            </View>

            {isEditing && (
                <TouchableOpacity style={{ bottom: responsiveHeight(10) }} onPress={handleSave}>
                    <Text style={style.saveButton}>Save</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    containerbio: {
        flexDirection: "row",
        marginTop: responsiveHeight(5),
        height: responsiveHeight(49)
    },
    editButton: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    profileInfo: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: 'blue',
        color: 'white',
        textAlign: 'center',
        //   paddingVertical: 10,
        borderRadius: 5,
    },
    inputContainer: {
        //     flexDirection: 'row',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     height: responsiveHeight(8.4),
        //     width: responsiveWidth(88),
        //  //   bottom:responsiveHeight(1),
        //     margin:responsiveHeight(1),
        //  //   margin: responsiveWidth(1),
        //     color: 'black',
        //     resizeMode: 'cover',
        flex: 1,
        width: '101%',
        height: '100%',
    },
    bio_title: {
        flex: responsiveWidth(0.2),
    },
    bio_title_text: {
        fontWeight: "bold",
        fontSize: responsiveFontSize(3),
        color: "#323232",
        marginLeft: responsiveWidth(2),
        fontFamily: "Times New Roman",
        textDecorationLine: "underline",
    },
    bio_content: {
        flex: 1,
    },
    bio_content_section: {
        flexDirection: "row",
        width: responsiveWidth(53),
        height: responsiveHeight(5.5),
        // borderWidth:responsiveWidth(0.3),
        borderRadius: responsiveWidth(2),
        marginBottom: responsiveHeight(1.5),
    },
    // text:{
    //     fontSize:18,
    //     color:'#323232',
    //     fontWeight:'bold',
    //     marginLeft:20,
    //     marginTop:6,
    //     fontFamily:"Times New Roman",
    // },
    hr_tag: {
        borderBottomWidth: responsiveWidth(1.5),
        borderBottomColor: '#D7D7D7',
        marginVertical: responsiveHeight(0.5),
    },
    bioTextContainer: {

        // left:responsiveWidth(4),
        left: "22%",

    }
});

export default UserProfile;

