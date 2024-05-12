// import React, { Component } from 'react';
// import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import { useNavigation } from '@react-navigation/native';


// // Sample data for shooting locations
// const shootingLocations = [
//     {
//         id: 1,
//         name: 'Location 1',
//         link: 'http://example.com/location1',
//         bookingDates: 'Feb 22 - Feb 28',
//         ratePerDay: '$200',
//         image: require('../../../components/Assets/app_logo/8641612.jpg'),
//     },

//     // Add more locations as needed
// ];

// class ShootingLocationSubPage extends Component {
//     state = {
//         showStartDatePicker: false,
//         showEndDatePicker: false,
//         startDate: '',
//         endDate: '',

//     };

//     handleStartDatePress = () => {
//         this.setState({ showStartDatePicker: true, showEndDatePicker: false });
//     };

//     handleEndDatePress = () => {
//         if (this.state.startDate !== '') {
//             this.setState({ showEndDatePicker: true });
//         } else {
//             alert('Please select start date first.');
//         }
//     };

//     handleDateChange = (date) => {
//         if (this.state.showStartDatePicker) {
//             this.setState({ startDate: date, showStartDatePicker: false });
//         } else if (this.state.showEndDatePicker) {
//             if (new Date(date) > new Date(this.state.startDate)) {
//                 this.setState({ endDate: date, showEndDatePicker: false });
//             } else {
//                 alert('End date must be greater than start date.');
//             }
//         }
//     };

//     handleSearch = text => {
//         const filteredLocations = shootingLocations.filter(location =>
//             location.name.toLowerCase().includes(text.toLowerCase())
//         );
//         this.setState({ searchText: text, filteredLocations });
//     };

//     state = {
//         searchText: '',
//         filteredLocations: shootingLocations,
//     };

//     handleSearch = text => {
//         const filteredLocations = shootingLocations.filter(location =>
//             location.name.toLowerCase().includes(text.toLowerCase())
//         );
//         this.setState({ searchText: text, filteredLocations });
//     };



//     render() {
//         return (
//             <View style={styles.container}>
//                 <View>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Search Locations..."
//                         onChangeText={this.handleSearch}
//                         value={this.state.searchText}
//                     />
//                     <Image source={image} style={{ height: responsiveHeight(5), width: responsiveWidth(9), position: 'absolute', bottom: responsiveHeight(2), left: responsiveWidth(78) }} resizeMode='stretch' />

//                 </View>
//                 <View style={{ justifyContent: 'center', alignItems: 'center', }}>
//                     <FlatList
//                         data={this.state.filteredLocations}
//                         renderItem={({ item }) => (


//                             <View style={styles.itemContainer}>

//                                 <Image source={item.image} style={styles.imageStyle} />

//                                 <View style={styles.itemContainerDetials}>

//                                     <View style={{ flexDirection: 'row', columnGap: responsiveWidth(40) }}>
//                                         <Text style={styles.locationName}>{item.name}</Text>
//                                         <Text style={{ width: responsiveWidth(20), height: responsiveHeight(3), borderRadius: responsiveWidth(2), backgroundColor: '#616161', textAlign: 'center', textAlignVertical: 'center', marginTop: responsiveHeight(2), color: 'white', fontWeight: '800' }}>₹20k/day</Text>

//                                     </View>
//                                     <TouchableOpacity><Text style={{ color: 'blue', textDecorationLine: 'underline', fontSize: responsiveFontSize(2) }}> {item.link}</Text></TouchableOpacity>

//                                     <Text style={{ color: 'black', marginTop: responsiveHeight(1) }}>  This property can be given for the shooting only based on request on Forest Officer Support. Its very good for Song Shooting. </Text>

//                                     <Text style={{ marginTop: responsiveHeight(1), fontSize: responsiveFontSize(1.8), color: 'black', fontWeight: '600' }}>Do's & Don'ts Apply </Text>

//                                     <Text style={{ color: 'red', fontWeight: '500', marginTop: responsiveHeight(2) }}>Select your Booking Dates</Text>


//                                     <View style={{ flexDirection: 'row', marginTop: responsiveHeight(1), columnGap: responsiveWidth(4) }}>
//                                         <View style={{ width: responsiveWidth(40), height: responsiveHeight(5), borderWidth: 1, borderRadius: responsiveWidth(3), borderColor: 'black', flexDirection: 'row', alignItems: 'center' }}>
//                                             <TouchableOpacity onPress={this.handleStartDatePress} style={{ flexDirection: 'row' }}>
//                                                 <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Booking.png')} style={{ width: responsiveWidth(5), height: responsiveHeight(2) }} />

//                                                 {this.state.startDate !== '' && (
//                                                     <Text style={{ width: responsiveWidth(30), height: responsiveHeight(3), fontSize: responsiveFontSize(2), color: 'black' }}>{this.state.startDate}</Text>
//                                                 )}
//                                             </TouchableOpacity>
//                                         </View>
//                                         <View style={{width: responsiveWidth(40), height: responsiveHeight(5), borderWidth: 1, borderRadius: responsiveWidth(3), borderColor: 'black', flexDirection: 'row', alignItems: 'center' }}>
//                                             <TouchableOpacity onPress={this.handleEndDatePress} style={{ flexDirection: 'row' }}>
//                                                 <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Booking.png')} style={{ width: responsiveWidth(5), height: responsiveHeight(2) }} />
//                                                 {this.state.endDate !== '' && (
//                                                     <Text style={{ width: responsiveWidth(30), height: responsiveHeight(3), fontSize: responsiveFontSize(2), color: 'black' }}>{this.state.endDate}</Text>
//                                                 )}
//                                             </TouchableOpacity>
//                                         </View>





//                                     </View>
//                                     <View style={{ flexDirection: 'row', columnGap: responsiveWidth(5) }}>


//                                         <TouchableOpacity>
//                                             <Text style={{ width: responsiveWidth(40), height: responsiveHeight(5), borderRadius: responsiveWidth(3), backgroundColor: '#1d54dd', textAlign: 'center', textAlignVertical: 'center', marginTop: responsiveHeight(3), color: 'white', fontWeight: '800', fontSize: responsiveFontSize(2),left:responsiveWidth(50) }}>Confirm Booking</Text>
//                                         </TouchableOpacity>

//                                     </View>




//                                     {/* <Text>Booking Dates: {item.bookingDates}</Text>
//                                     <Text>Rate Per Day: {item.ratePerDay}</Text> */}

//                                 </View>

//                             </View>
//                         )}
//                         keyExtractor={item => item.id.toString()}


//                     />



//                 </View>



//                 {this.state.showStartDatePicker && (
//                     <Calendar
//                         style={styles.calendar}
//                         onDayPress={(day) => this.handleDateChange(day.dateString)}
//                         markedDates={{ [this.state.startDate]: { selected: true } }}
//                     />
//                 )}



//                 {this.state.showEndDatePicker && (
//                     <Calendar
//                         style={styles.calendar}
//                         onDayPress={(day) => this.handleDateChange(day.dateString)}
//                         markedDates={{ [this.state.endDate]: { selected: true } }}
//                     />
//                 )}

//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         //  padding: 10,
//         borderWidth: 1

//     },
//     hr_tag: {
//         borderBottomWidth: responsiveWidth(1.5),
//         borderBottomColor: '#D7D7D7',
//         marginVertical: responsiveHeight(0.5),
//     },
//     calendar: {
//         borderWidth: 2,
//         bottom: responsiveHeight(50),
//         borderColor: '#ccc',
//         borderRadius: 5,

//     },
//     imageStyle: {
//         width: responsiveWidth(100),
//         height: responsiveHeight(30),
//         resizeMode: 'stretch',

//         borderRadius: responsiveWidth(5)
//     },
//     input: {
//         height: responsiveHeight(6),
//         borderColor: 'black',
//         borderWidth: 1,
//         borderRadius: responsiveWidth(5),
//         padding: 10,
//         marginBottom: 10,
//         margin: responsiveHeight(1)
//     },
//     itemContainerDetials: {
//         width: responsiveWidth(90),
//         // marginLeft: responsiveWidth(2),
//      //   borderWidth: 1


//     },
//     itemContainer: {
//         //  flexDirection: 'row',
//         backgroundColor: '#f9f9f9',
//         padding: 10,
//         marginBottom: 10,
//         width: responsiveWidth(95),
//         borderRadius: 5,
//         marginBottom: responsiveWidth(2),
//         borderBottomWidth: responsiveWidth(1.5),
//         borderBottomColor: '#D7D7D7',
//         marginVertical: responsiveHeight(0.5),
//     },
//     locationName: {
//         fontSize: responsiveFontSize(2.5),
//         fontWeight: 'bold',
//         marginBottom: responsiveHeight(1),
//         color: 'black',
//         marginTop: responsiveHeight(1)
//     }
// });

// export default ShootingLocationSubPage;

//===================================================

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


    const { location, startDate, endDate, image, link, rate, refer ,description } = route.params;

    return (
        <ScrollView style={{ flex: 1, }}>
            <View style={{ alignItems: 'center' }}>
                <Image source={{uri : image}} style={{
                    width: responsiveWidth(95),
                    height: responsiveHeight(30),
                    resizeMode: 'stretch',
                    borderRadius: responsiveWidth(5)
                }} resizeMode='stretch' />

                <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: responsiveWidth(42), marginTop: responsiveHeight(1) }}>
                    <Text style={{ fontSize: responsiveFontSize(3), fontWeight: 'bold', color: 'black' }}>{location}</Text>
                    <Text style={{ width: responsiveWidth(20), height: responsiveHeight(3), borderRadius: responsiveWidth(2), backgroundColor: '#616161', textAlign: 'center', textAlignVertical: 'center', color: 'white', fontWeight: '800' }}>₹{rate}/day</Text>

                </View >


                <View style={{ width: responsiveWidth(100), marginTop: responsiveHeight(2) }}>

                    <Text style={{ color: 'blue', textDecorationLine: 'underline', fontSize: responsiveFontSize(2.5), marginHorizontal: responsiveWidth(4) }}>{link}</Text>

                    <Text style={{ marginHorizontal: responsiveWidth(4), color: 'black', marginTop: responsiveHeight(2) }}><Text style={{ fontWeight: '800', color: 'black' }}>Description:</Text>{description }</Text>

                    <Text style={{ marginHorizontal: responsiveWidth(4), color: 'black', marginTop: responsiveHeight(2), fontWeight: '800', fontSize: responsiveFontSize(1.8) }}>Do's & Don'ts Apply</Text>

                    <Text style={{ marginHorizontal: responsiveWidth(4), color: 'blue', width: responsiveWidth(40), fontWeight: "700", textDecorationLine: 'underline', marginTop: responsiveHeight(2), fontSize: responsiveFontSize(2) }}>{refer}</Text>




                    <Text style={{ color: 'red', fontSize: responsiveFontSize(2), fontWeight: '600', marginHorizontal: responsiveWidth(4), marginTop: responsiveHeight(2) }}>Select your Booking Dates</Text>



                    <View style={{ flexDirection: 'row', marginHorizontal: responsiveWidth(4), marginTop: responsiveHeight(2), columnGap: responsiveWidth(10) }}>
                        <TouchableOpacity onPress={showStartDatePickers} style={{ width: responsiveWidth(40), height: responsiveHeight(5), borderWidth: responsiveWidth(0.5), borderRadius: responsiveWidth(3), justifyContent: 'center', alignItems: 'center',flexDirection:'row',columnGap:responsiveWidth(3) }}>
                            <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Booking.png')} style={{ width: responsiveWidth(5), height: responsiveHeight(2) }} />
                            <Text style={{ color: 'black' }}>{startDates ? startDates : startDate}</Text></TouchableOpacity>
                        <TouchableOpacity onPress={showEndDatePickers} style={{ width: responsiveWidth(40), borderRadius: responsiveWidth(3), height: responsiveHeight(5), borderWidth: responsiveWidth(0.5), justifyContent: 'center', alignItems: 'center',flexDirection:'row',columnGap:responsiveWidth(3) }}>
                        <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Booking.png')} style={{ width: responsiveWidth(5), height: responsiveHeight(2) }} />
                            <Text style={{ color: 'black' }}>{endDates ? endDates : endDate}</Text></TouchableOpacity>
                    </View>


                    {/* <View style={{ width: responsiveWidth(22.5), height: responsiveHeight(4), borderWidth: 1, borderRadius: responsiveWidth(3), borderColor: 'black', flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => handleEndDatePress(item.id)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Booking.png')} style={{ width: responsiveWidth(5), height: responsiveHeight(2) }} />
                            {locationDates[item.id] && locationDates[item.id].endDate && (
                                <Text style={{ width: responsiveWidth(16), height: responsiveHeight(4), fontSize: responsiveFontSize(1.5), color: 'black', bottom: responsiveHeight(1) }}> {locationDates[item.id].endDate}</Text>
                            )}
                        </TouchableOpacity>
                    </View> */}

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