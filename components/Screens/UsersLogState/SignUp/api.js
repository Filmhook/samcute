import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Modal, Text } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default function ProfileRoot() {
  const [showIcons, setShowIcons] = useState(false); // State to toggle visibility of the 9 icons
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control the visibility of the modal

  // Function to handle press event for fixed icon 1
  const handleFixedIcon1Press = () => {
    // Logic to show/hide the 9 icons related to fixed icon 1
    setShowIcons(!showIcons);
  };

  // Function to handle opening the modal
  const openModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View>
      {/* Fixed Icons */}
      <TouchableOpacity onPress={handleFixedIcon1Press}>
        <Image source={require('../../../Assets/AllSearch_Icon_And_Fonts/Booking.png')} style={{height:30,width:30}}/>
      </TouchableOpacity>

      {/* Render 9 separate icons when showIcons state is true */}
      {showIcons && (
        <View style={{borderWidth:1,width:responsiveWidth(22.5),height:responsiveHeight(11.5),right:-8}}>
          {/* Icon 1 */}
          <TouchableOpacity onPress={   openModal}>
            <Image source={require('../../../Assets/AllSearch_Icon_And_Fonts/Booking.png')} style={{height:30,width:30}}/>
          </TouchableOpacity>

          {/* Implement similar TouchableOpacity components for the remaining 8 icons */}
        </View>
      )}

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text>This is the modal content</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
