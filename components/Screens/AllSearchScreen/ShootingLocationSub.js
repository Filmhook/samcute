

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Calendar } from 'react-native-calendars';

const DetailsScreen = ({ route }) => {

    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [startDates, setStartDate] = useState();
    const [endDates, setEndDate] = useState();
    const [finalendDates, finalsetEndDate] = useState();




    const showStartDatePickers = () => {
        setShowStartDatePicker(true);
    };

    const showEndDatePickers = () => {
        setShowEndDatePicker(true);
    };

    const hideStartDatePicker = () => {
        setShowStartDatePicker(false);
    };

    const hideEndDatePicker = () => {
        setShowEndDatePicker(false);
    };

    const handleStartDateSelect = (date) => {
        setStartDate(date.dateString);
        hideStartDatePicker();
    };

    const handleEndDateSelect = (date) => {
        setEndDate(date.dateString);

        hideEndDatePicker();
    };


    const { location, startDate, endDate, image, link, rate, refer, description, day, terms } = route.params;

    return (
        <ScrollView style={{ flex: 1, }}>
            <View style={{ alignItems: 'center' }}>
                <Image source={{ uri: image }} style={{
                    width: responsiveWidth(95),
                    height: responsiveHeight(30),
                    resizeMode: 'stretch',
                    borderRadius: responsiveWidth(5)
                }} resizeMode='stretch' />

                <View style={{ flexDirection: 'row', alignItems: 'flex-start', columnGap: responsiveWidth(42), marginTop: responsiveHeight(1), right: responsiveWidth(15), width: "60%" }}>
                    <Text style={{ fontSize: responsiveFontSize(3), fontWeight: 'bold', color: 'black', }}>{location}</Text>


                </View >

                <View style={{ left: responsiveWidth(35), bottom: responsiveHeight(3) }}>
                    <Text style={{ width: responsiveWidth(20), height: responsiveHeight(3), borderRadius: responsiveWidth(2), backgroundColor: '#616161', textAlign: 'center', textAlignVertical: 'center', color: 'white', fontWeight: '800' }}>₹{rate}{day}</Text>
                </View>

                <View style={{ width: responsiveWidth(100), marginTop: responsiveHeight(2) }}>

                    <Text style={{ color: 'blue', textDecorationLine: 'underline', fontSize: responsiveFontSize(2.5), marginHorizontal: responsiveWidth(4) }}>{link}</Text>

                    <Text style={{ marginHorizontal: responsiveWidth(4), color: 'black', marginTop: responsiveHeight(2) }}><Text style={{ fontWeight: '800', color: 'black' }}>Description: </Text>{description}</Text>

                    <Text style={{ marginHorizontal: responsiveWidth(4), color: 'black', marginTop: responsiveHeight(2), fontWeight: '800', fontSize: responsiveFontSize(1.8), width: "90%" }}>Do's & Don'ts Apply:
                        <Text style={{ fontWeight: '400', color: 'black' }}>  {terms}</Text>
                    </Text>

                    <Text style={{ marginHorizontal: responsiveWidth(4), color: 'blue', width: responsiveWidth(40), fontWeight: "700", textDecorationLine: 'underline', marginTop: responsiveHeight(2), fontSize: responsiveFontSize(2) }}>{refer}</Text>




                    <Text style={{ color: 'red', fontSize: responsiveFontSize(2), fontWeight: '600', marginHorizontal: responsiveWidth(4), marginTop: responsiveHeight(2) }}>Select your Booking Dates</Text>



                    <View style={{ flexDirection: 'row', marginHorizontal: responsiveWidth(4), marginTop: responsiveHeight(2), columnGap: responsiveWidth(10) }}>
                        <TouchableOpacity onPress={showStartDatePickers} style={{ width: responsiveWidth(40), height: responsiveHeight(5), borderWidth: responsiveWidth(0.5), borderRadius: responsiveWidth(3), justifyContent: 'center', alignItems: 'center', flexDirection: 'row', columnGap: responsiveWidth(3) }}>
                            <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Booking.png')} style={{ width: responsiveWidth(5), height: responsiveHeight(2) }} />
                            <Text style={{ color: 'black' }}>{startDates ? startDates : startDate}</Text></TouchableOpacity>
                        <TouchableOpacity onPress={showEndDatePickers} style={{ width: responsiveWidth(40), borderRadius: responsiveWidth(3), height: responsiveHeight(5), borderWidth: responsiveWidth(0.5), justifyContent: 'center', alignItems: 'center', flexDirection: 'row', columnGap: responsiveWidth(3) }}>
                            <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Booking.png')} style={{ width: responsiveWidth(5), height: responsiveHeight(2) }} />
                            <Text style={{ color: 'black' }}>{endDates ? endDates : endDate}</Text></TouchableOpacity>
                    </View>




                    <TouchableOpacity style={{ marginHorizontal: responsiveWidth(60), marginTop: responsiveHeight(4), borderWidth: 0.4, width: responsiveWidth(35), height: responsiveHeight(6), justifyContent: 'center', alignItems: 'center', borderRadius: responsiveWidth(2), backgroundColor: '#1d54dd', }}>
                        <Text style={{ color: 'white', fontWeight: '600', fontSize: responsiveFontSize(1.8) }}>Confirm Booking</Text>
                    </TouchableOpacity>
                </View>


            </View>
            {showStartDatePicker && (
                <Calendar
                    style={styles.calendar}
                    onDayPress={handleStartDateSelect}
                    markedDates={{ [startDates]: { selected: true } }}
                />
            )}

            {showEndDatePicker && (
                <Calendar
                    style={styles.calendar}
                    onDayPress={handleEndDateSelect}
                    markedDates={{ [endDates]: { selected: true } }}
                />
            )}



            {/* Add other details you want to display */}
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    calendar: {
        borderWidth: 2,
        bottom: responsiveHeight(40),
        borderColor: '#ccc',
        borderRadius: 5,
    },

})



export default DetailsScreen;