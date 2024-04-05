import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  TextInput
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal'
import { useNavigation } from "@react-navigation/native";
import { responsiveWidth } from 'react-native-responsive-dimensions';

export default function Settings() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
    password: 'Sharukhan', // New state for password
    privacy: true, // State for privacy option
    storageAndData: true, // State for storage and data option
    email: 'Sharukhan@gmail.com', // State for email
    phoneNumber: '123-456-7890', // State for phone number
    timeSpent: '2 hours', // New state for time spent
    archive: true, // New state for archive
    yourActivity: true, // New state for your activity
    savedItems: true, // New state for saved items
    accountPrivacy: true, // New state for account privacy
    closeFriends: false, // New state for close friends
    blockedUsers: false, // New state for blocked users
    hideStory: true, // New state for hiding story
    hideLive: true, // New state for hiding live
  });
  const [isModalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    console.log('clicked');

    // Close the modal after logging out
    setModalVisible(true);
  }

  const handleConfirmLogout = async () => {

    try {
      navigation.navigate("Login")
      console.log("logout success");
    } catch (err) {
      console.log('Error in logout:', err);
    }

    // Close the modal after logging out
    setModalVisible(true);
  };

  const handleCancelLogout = () => {
    setModalVisible(false);
  };

  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [isPhoneNumber, setPhoneNumbere] = useState(false);

  const handleEditPhoneNumber = () => {
    setNewPhoneNumber(form.phoneNumber); // Set the initial value of newPhoneNumber
    setPhoneNumbere(true); // Open the modal for editing phone number
  };

  const handleSavePhoneNumber = () => {
    // Update the phone number in the form state
    setForm({ ...form, phoneNumber: newPhoneNumber });

    // Close the modal
    setPhoneNumbere(false);
  };

  const [newEmail, setNewEmail] = useState('');
  const [isEmail, setEmail] = useState(false);
  const handleEditemail = () => {
    setNewEmail(form.email); // Set the initial value of newPhoneNumber
    setEmail(true); // Open the modal for editing phone number
  };
  const handleSaveEmail = () => {
    // Update the phone number in the form state
    setForm({ ...form, email: newEmail });

    // Close the modal
    setEmail(false);
  };

  //this function will
  // const [newPassword, setNewPassword] = useState('');
  // const [isPassword, setPassword] = useState(false);
  // const [showTextInput, setShowTextInput] = useState(false);
  // const handlePassword = () => {
  //   setNewPassword(form. password); // Set the initial value of newPhoneNumber
  //   setPassword(true); // Open the modal for editing phone number
  //   setShowTextInput(!showTextInput);
  // };
  // const handleSavePassword = () => {
  //   // Update the phone number in the form state
  //   setForm({ ...form, password: newPassword});

  //   // Close the modal
  //   setPassword(false);
  // };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>

          <Text style={styles.subtitle}>
            Lorem ipsum dolor sit amet consectetur.
          </Text>
        </View>

        <ScrollView>
          <View style={styles.profile}>
            <TouchableOpacity>
              <Image source={require('../../../components/Assets/app_logo/8641606.jpg')} style={styles.profileAvatar} />
            </TouchableOpacity>

            <Text style={styles.profileName}>Sharukhan</Text>

            <Text style={styles.profileEmail}>Sharukhan@gmail.com</Text>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <View style={styles.profileAction}>
                <Text style={styles.profileActionText}>Edit Profile</Text>

                <FeatherIcon color="#fff" name="edit" size={16} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#fe9400' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="globe"
                      size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Language</Text>

                  <View style={styles.rowSpacer} />

                  <Text style={styles.rowValue}>English</Text>

                  <FeatherIcon
                    color="#C6C6C6"
                    name="chevron-right"
                    size={20} />
                </TouchableOpacity>
              </View>

              <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#007AFF' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="moon"
                      size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Dark Mode</Text>

                  <View style={styles.rowSpacer} />

                  <Switch
                    onValueChange={darkMode => setForm({ ...form, darkMode })}
                    value={form.darkMode} />
                </View>
              </View>

              <View style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="navigation"
                      size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Location</Text>

                  <View style={styles.rowSpacer} />

                  <Text style={styles.rowValue}>Los Angeles, CA</Text>

                  <FeatherIcon
                    color="#C6C6C6"
                    name="chevron-right"
                    size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>

            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <View style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="at-sign"
                      size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Email Notifications</Text>

                  <View style={styles.rowSpacer} />

                  <Switch
                    onValueChange={emailNotifications =>
                      setForm({ ...form, emailNotifications })
                    }
                    value={form.emailNotifications} />
                </View>
              </View>

              <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="bell"
                      size={20} />
                  </View>

                  <Text style={styles.rowLabel}> Notifications</Text>

                  <View style={styles.rowSpacer} />

                  <Switch
                    onValueChange={pushNotifications =>
                      setForm({ ...form, pushNotifications })
                    }
                    value={form.pushNotifications} />
                </View>
              </View>

              <View style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#FE3C30' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="music"
                      size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Sound</Text>

                  <View style={styles.rowSpacer} />

                  <Text style={styles.rowValue}>Default</Text>

                  <FeatherIcon
                    color="#C6C6C6"
                    name="chevron-right"
                    size={20} />
                </TouchableOpacity>
              </View>


            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Privacy</Text>
            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <View style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#6200EE' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="lock"
                      size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Privacy</Text>

                  <View style={styles.rowSpacer} />

                  <Switch
                    onValueChange={privacy =>
                      setForm({ ...form, privacy })
                    }
                    value={form.privacy} />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Storage and Data</Text>
            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <View style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#536DFE' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="database"
                      size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Storage Usage</Text>

                  <View style={styles.rowSpacer} />

                  <Text style={styles.rowValue}>1.5 GB</Text>
                </View>
              </View>
              <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#FF6E40' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="activity"
                      size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Data Usage</Text>

                  <View style={styles.rowSpacer} />

                  <Text style={styles.rowValue}>500 MB</Text>
                </View>
              </View>
            </View>
          </View>

          {/* New Email and Phone Number sections */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <View style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#536DFE' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="mail"
                      size={20}
                    />
                  </View>
                  <Text style={styles.rowLabel}>Email</Text>
                  <View style={styles.rowSpacer} />
                  <TouchableOpacity onPress={handleEditemail}>
                    <Text style={styles.rowValue}>{form.email}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('changePassword')}>
              <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  



              
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#FF6C00' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="lock"
                      size={20} />
                  </View>

                

                  <View style={styles.rowSpacer} />
                  <Text style={styles.rowLabel2}>change assword</Text>
                    <Text style={styles.rowValue}>*****</Text>
                
                </View>
              </View>
              </TouchableOpacity>
              {/* <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#FF6C00' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="lock"
                      size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Password</Text>

                  <View style={styles.rowSpacer} />

                  
                 
                  <TouchableOpacity onPress={handlePassword}>
                  <Text style={styles.rowValue}>*****</Text>
                    {showTextInput && (
                    
                    <Text style={styles.rowValue}>{form.password}</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View> */}
              <View style={[styles.rowWrapper]}>
                <View style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#FF6E40' }]}
                  >
                    <FeatherIcon
                      color="#fff"
                      name="phone"
                      size={20}
                    />
                  </View>
                  <Text style={styles.rowLabel}>Phone Number</Text>
                  <View style={styles.rowSpacer} />
                  <TouchableOpacity onPress={handleEditPhoneNumber}>
                    <Text style={styles.rowValue}>{form.phoneNumber}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Time Spent</Text>
            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <View style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#536DFE' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="clock"
                      size={20}
                    />
                  </View>
                  <Text style={styles.rowLabel}>Time Spent on App</Text>
                  <View style={styles.rowSpacer} />
                  <Text style={styles.rowValue}>{form.timeSpent}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* New section for archive */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Archive</Text>
            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <View style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#536DFE' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="archive"
                      size={20}
                    />
                  </View>
                  <Text style={styles.rowLabel}>Archive</Text>
                  <View style={styles.rowSpacer} />
                  <Switch
                    onValueChange={archive => setForm({ ...form, archive })}
                    value={form.archive}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* New section for your activity */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Activity</Text>
            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <View style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#536DFE' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="activity"
                      size={20}
                    />
                  </View>
                  <Text style={styles.rowLabel}>Your Activity</Text>
                  <View style={styles.rowSpacer} />
                  <Switch
                    onValueChange={yourActivity => setForm({ ...form, yourActivity })}
                    value={form.yourActivity}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* New section for saved items */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Saved Items</Text>
            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <View style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#536DFE' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="bookmark"
                      size={20}
                    />
                  </View>
                  <Text style={styles.rowLabel}>Saved Items</Text>
                  <View style={styles.rowSpacer} />
                  <Switch
                    onValueChange={savedItems => setForm({ ...form, savedItems })}
                    value={form.savedItems}
                  />
                </View>
              </View>
            </View>
          </View>

          
          {/* New section for "Who can see your content" */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Who can see your content</Text>
            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <View style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#536DFE' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="lock"
                      size={20}
                    />
                  </View>
                  <Text style={styles.rowLabel}>Account Privacy</Text>
                  <View style={styles.rowSpacer} />
                  <Switch
                    onValueChange={accountPrivacy => setForm({ ...form, accountPrivacy })}
                    value={form.accountPrivacy}
                  />
                </View>
              </View>
              {/* <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#536DFE' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="users"
                      size={20}
                    />
                  </View>
                  <Text style={styles.rowLabel}>Close Friends</Text>
                  <View style={styles.rowSpacer} />
                  <Switch
                    onValueChange={closeFriends => setForm({ ...form, closeFriends })}
                    value={form.closeFriends}
                  />
                </View>
              </View> */}

<View style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#FE3C30' }]}>
                   <FeatherIcon
                      color="#fff"
                      name="users"
                      size={20}
                    />
                  </View>

                  <Text style={styles.rowLabel}>Close Friends</Text>

                  <View style={styles.rowSpacer} />

                  <Text style={styles.rowValue}></Text>

                  <FeatherIcon
                    color="#C6C6C6"
                    name="chevron-right"
                    size={20} />
                </TouchableOpacity>
               
              </View>
              <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#536DFE' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="user-x"
                      size={20}
                    />
                  </View>
                  <Text style={styles.rowLabel}>Blocked Users</Text>
                  <View style={styles.rowSpacer} />
                  {/* <Switch
                    onValueChange={blockedUsers => setForm({ ...form, blockedUsers })}
                    value={form.blockedUsers}
                  /> */}
                   
                </View>
              </View>
              <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#536DFE' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="eye-off"
                      size={20}
                    />
                  </View>
                  <Text style={styles.rowLabel}>Hide Story</Text>
                  <View style={styles.rowSpacer} />
                  <Switch
                    onValueChange={hideStory => setForm({ ...form, hideStory })}
                    value={form.hideStory}
                  />
                </View>
              </View>
              <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: '#536DFE' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="eye-off"
                      size={20}
                    />
                  </View>
                  <Text style={styles.rowLabel}>Hide Live</Text>
                  <View style={styles.rowSpacer} />
                  <Switch
                    onValueChange={hideLive => setForm({ ...form, hideLive })}
                    value={form.hideLive}
                  />
                </View>
              </View>
            </View>
          </View>


          {/* Modal for editing email */}
          <Modal
            isVisible={isEmail}
            animationIn="fadeIn"
            animationOut="fadeOut"
            onBackdropPress={() => setEmail(false)}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>Edit email id</Text>
              <TextInput
                style={styles.input}
                value={newEmail}
                onChangeText={setNewEmail}
                placeholder="Enter new email id"
              />
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setEmail(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleSaveEmail}
                >
                  <Text style={styles.modalButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Modal for editing password */}
          {/* <Modal
            isVisible={isPassword}
            animationIn="fadeIn"
            animationOut="fadeOut"
            onBackdropPress={() => setPassword(false)}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>Edit Password</Text>
              <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new Password"
              />
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setPassword(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleSavePassword}
                >
                  <Text style={styles.modalButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal> */}


          {/* Modal for editing phone number */}
          <Modal
          isVisible={isPhoneNumber}
          animationIn="fadeIn"
          animationOut="fadeOut"
          onBackdropPress={() =>  setPhoneNumbere(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Edit Phone Number</Text>
            <TextInput
              style={styles.input}
              value={newPhoneNumber}
              onChangeText={setNewPhoneNumber}
              placeholder="Enter new phone number"
            />
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>  setPhoneNumbere(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleSavePhoneNumber}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>




          {/* Your existing settings content */}

          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>

        </ScrollView>
        <Text style={styles.contentFooter}>Made with ❤️ in Seattle</Text>


        {/* Modal for logout confirmation */}
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Are you sure you want to logout?</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity onPress={handleConfirmLogout} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancelLogout} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  /** Profile */
  profile: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '600',
    color: '#090909',
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '400',
    color: '#848484',
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  /** Section */
  section: {
    paddingTop: 12,
  },
  sectionTitle: {
    marginVertical: 8,
    marginHorizontal: 24,
    fontSize: 14,
    fontWeight: '600',
    color: '#a7a7a7',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionBody: {
    paddingLeft: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  /** Row */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 16,
    height: 50,
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  rowFirst: {
    borderTopWidth: 0,
  },
  rowIcon: {
    width: 30,
    height: 30,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
  },
  rowLabel2:{
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
    marginRight:responsiveWidth(51)
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 17,
    fontWeight: '500',
    color: '#8B8B8B',
    marginRight: 4,
  },
  logoutButton: {
    marginTop: 20,
    marginHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#FF6961',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  modalButton: {
    padding: 5,
    width: 70,
    borderRadius: 5,
    backgroundColor: '#3B3B3C',
    alignItems: 'center'
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
