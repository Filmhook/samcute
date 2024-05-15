import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';


// Sample data for shooting locations
const shootingLocations = [
    {
        id: 1,
        name: 'Location 1',
        link: 'http://example.com/location1',
        bookingDates: 'Feb 22 - Feb 28',
        ratePerDay: '$200',
        image: require('../../Assets/app_logo/8641612.jpg'),
        refer:'filmhook001',
        rate:40
    },
    {
        id: 2,
        name: 'Location 2',
        link: 'http://example.com/location2',
        bookingDates: 'Mar 1 - Mar 7',
        ratePerDay: '$250',
        image: require('../../Assets/app_logo/8641612.jpg'),
        refer:'filmhook002',
        rate:30
    },
    // Add more locations as needed
];

const ShootingLocationPage = () => {
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchText, setSearchText] = useState('');
    const [filteredLocations, setFilteredLocations] = useState(shootingLocations);
    const [selectedDates, setSelectedDates] = useState({});
   
    const [selectedLocationId, setSelectedLocationId] = useState(null);
    const [locationDates, setLocationDates] = useState({});
    const navigation = useNavigation();

    // const handleStartDatePress = () => {
    //     setShowStartDatePicker(true);
    //     setShowEndDatePicker(false);
    // };

    // const handleEndDatePress = () => {
    //     if (startDate !== '') {
    //         setShowEndDatePicker(true);
    //     } else {
    //         alert('Please select start date first.');
    //     }
    // };

    // const handleDateChange = (date) => {
    //     if (showStartDatePicker) {
    //         setStartDate(date);
    //         setShowStartDatePicker(false);
    //     } else if (showEndDatePicker) {
    //         if (new Date(date) > new Date(startDate)) {
    //             setEndDate(date);
    //             setShowEndDatePicker(false);
    //         } else {
    //             alert('End date must be greater than start date.');
    //         }
    //     }
    // };

    const navigateToDetails = (item) => {
        navigation.navigate('DetailsScreen', {
            location: item.name,
            startDate: locationDates[item.id]?.startDate,
            endDate: locationDates[item.id]?.endDate,
            image: item.image,
            link: item.link,
            rate: item.rate,
            refer: item.refer
        });
    };

    const handleStartDatePress = (locationId) => {
        setShowStartDatePicker(true);
        setShowEndDatePicker(false);
        setSelectedLocationId(locationId);
    };

    const handleEndDatePress = (locationId) => {
        if (startDate !== '') {
            setShowEndDatePicker(true);
            setSelectedLocationId(locationId);
        } else {
            alert('Please select start date first.');
        }
    };

    const handleDateChange = (date) => {
        const newLocationDates = { ...locationDates };

        if (showStartDatePicker) {
            newLocationDates[selectedLocationId] = { startDate: date };
            setStartDate(date);
            setShowStartDatePicker(false);
            setLocationDates(newLocationDates);
        } else if (showEndDatePicker) {
            newLocationDates[selectedLocationId].endDate = date;
            setEndDate(date);
            setShowEndDatePicker(false);
            setLocationDates(newLocationDates);
        }
    };

    const handleSearch = (text) => {
        const filteredLocations = shootingLocations.filter(location =>
            location.name.toLowerCase().includes(text.toLowerCase())
        );
        setSearchText(text);
        setFilteredLocations(filteredLocations);
    };




    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Search Locations..."
                    onChangeText={handleSearch}
                    value={searchText}
                />
                <Image source={require('../../Assets/Audition_Icons_Fonts/filter_tickmark.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(9), position: 'absolute', bottom: responsiveHeight(2), left: responsiveWidth(86) }} resizeMode='stretch' />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' ,}}>
                <FlatList
                    data={filteredLocations}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigateToDetails(item)}>
                        <View style={styles.itemContainer}>
                            <Image source={item.image} style={styles.imageStyle} />
                            <View style={styles.itemContainerDetials}>
                                <Text style={styles.locationName}>{item.name}</Text>
                                <TouchableOpacity><Text style={{ color: 'blue', textDecorationLine: 'underline' }}> {item.link}</Text></TouchableOpacity>
                                <Text style={{ color: 'red', fontWeight: '500', }}>Select your Booking Dates</Text>
                                <View style={{ flexDirection: 'row', marginTop: responsiveHeight(1), columnGap: responsiveWidth(1) }}>
                                    <View style={{ width: responsiveWidth(22.5), height: responsiveHeight(4), borderWidth: 1, borderRadius: responsiveWidth(3), borderColor: 'black', flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => handleStartDatePress(item.id)} style={{ flexDirection: 'row', alignItems:'center'}}>
                                            <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Booking.png')} style={{ width: responsiveWidth(5), height: responsiveHeight(2) }} />
                                            {locationDates[item.id] && locationDates[item.id].startDate && (
                                                <Text style={{ width: responsiveWidth(16), fontSize: responsiveFontSize(1.5), color: 'black',bottom:responsiveHeight(1) }}> {locationDates[item.id].startDate}</Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: responsiveWidth(22.5), height: responsiveHeight(4), borderWidth: 1, borderRadius: responsiveWidth(3), borderColor: 'black', flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => handleEndDatePress(item.id)} style={{ flexDirection: 'row' ,alignItems:'center'}}>
                                            <Image source={require('../../Assets/AllSearch_Icon_And_Fonts/Booking.png')} style={{ width: responsiveWidth(5), height: responsiveHeight(2) }} />
                                            {locationDates[item.id] && locationDates[item.id].endDate && (
                                                <Text style={{ width: responsiveWidth(16), height: responsiveHeight(4), fontSize: responsiveFontSize(1.5), color: 'black',bottom:responsiveHeight(1) }}> {locationDates[item.id].endDate}</Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                </View>

                              

                                <View style={{ flexDirection: 'row', columnGap: responsiveWidth(5) }}>
                                    <Text style={{ width: responsiveWidth(20), height: responsiveHeight(3), borderRadius: responsiveWidth(2), backgroundColor: '#616161', textAlign: 'center', textAlignVertical: 'center', marginTop: responsiveHeight(1), color: 'white', fontWeight: '800' }}>₹{item.rate}k/day</Text>
                                  
                                    <TouchableOpacity onPress={() => navigateToDetails(item)}>
                                        <Text style={{ width: responsiveWidth(20), height: responsiveHeight(5), borderRadius: responsiveWidth(3), backgroundColor: '#1d54dd', textAlign: 'center', textAlignVertical: 'center', marginTop: responsiveHeight(3), color: 'white', fontWeight: '800', fontSize: responsiveFontSize(2) }}>Reserve</Text>
                                    </TouchableOpacity>
                                </View>
                               

                                <Text style={{color:'blue',width:responsiveWidth(40),right:responsiveWidth(45), fontWeight:"700",textDecorationLine:'underline'}}>{item.refer}</Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            </View>

          


            {showStartDatePicker && (
                <Calendar
                    style={styles.calendar}
                    onDayPress={(day) => handleDateChange(day.dateString)}
                    markedDates={{ [startDate]: { selected: true } }}
                />
            )}

            {showEndDatePicker && (
                <Calendar
                    style={styles.calendar}
                    onDayPress={(day) => handleDateChange(day.dateString)}
                    markedDates={{ [endDate]: { selected: true } }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1
    },
    hr_tag: {
        borderBottomWidth: responsiveWidth(1.5),
        borderBottomColor: '#D7D7D7',
        marginVertical: responsiveHeight(0.5),
    },
    calendar: {
        borderWidth: 2,
        bottom: responsiveHeight(22),
        borderColor: '#ccc',
        borderRadius: 5,
    },
    imageStyle: {
        width: responsiveWidth(43),
        height: responsiveHeight(20),
        resizeMode: 'stretch',
        borderRadius: responsiveWidth(5)
    },
    input: {
        height: responsiveHeight(6),
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: responsiveWidth(5),
        padding: 10,
        marginBottom: 10,
        margin: responsiveHeight(1)
    },
    itemContainerDetials: {
        width: responsiveWidth(45),
        marginLeft: responsiveWidth(2),
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginBottom: 10,
        width: responsiveWidth(95),
        borderRadius: 5,
        marginBottom:responsiveWidth(2),
        borderBottomWidth: responsiveWidth(1.5),
        borderBottomColor: '#D7D7D7',
        marginVertical: responsiveHeight(0.5),
    },
    locationName: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        marginBottom: responsiveHeight(1),
        color: 'black'
    }
});

export default ShootingLocationPage;

