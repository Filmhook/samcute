import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default function Demo1() {
    const [showIcons, setShowIcons] = useState(false); // State to toggle visibility of the 9 icons

  // Function to handle press event for fixed icon 1
  const handleFixedIcon1Press = () => {
    // Logic to show/hide the 9 icons related to fixed icon 1
    setShowIcons(!showIcons);
  };
    return (
        <View>
            <TouchableOpacity onPress={handleFixedIcon1Press}>
                {/* Your fixed icon 1 image */}
                <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Booking.png')} style={{ height: 30, width: 30 }} />
            </TouchableOpacity>
            {/* Implement similar TouchableOpacity components for other fixed icons */}

            {/* Render 9 separate icons when showIcons state is true */}
            {showIcons && (
                <View style={{ borderWidth: 1, width: responsiveWidth(22.5), height: responsiveHeight(11.5), right: -8 }}>
                    {/* Icon 1 */}
                    <TouchableOpacity>
                        <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Booking.png')} style={{ height: 30, width: 30 }} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Booking.png')} style={{ height: 30, width: 30 }} />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Booking.png')} style={{ height: 30, width: 30 }} />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Booking.png')} style={{ height: 30, width: 30, left: 30, top: -90 }} />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Booking.png')} style={{ height: 30, width: 30, left: 30, top: -90 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Booking.png')} style={{ height: 30, width: 30, left: 30, top: -90 }} />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Booking.png')} style={{ height: 30, width: 30, left: 60, top: -180 }} />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Booking.png')} style={{ height: 30, width: 30, left: 60, top: -180 }} />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Booking.png')} style={{ height: 30, width: 30, left: 60, top: -180 }} />
                    </TouchableOpacity>
                </View>
            )
            }


            {/* Implement similar TouchableOpacity components for the remaining 8 icons */}
        </View>
    )
}