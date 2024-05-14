import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const GetJobResponse = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings data
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyTmFtZSI6Inlhc3dhbnRoc2hhbmthcjI3MDVAZ21haWwuY29tIiwidXNlclR5cGUiOiJJbmR1c3RyeVVzZXIiLCJpYXQiOjE3MTU2Nzk2NzYsImV4cCI6MTcxNTY4MDg3Nn0.StFi7jM2mI37VG0IMXzlKhnWvt-D2XslzM36YhBc2Gl6ywHjislHvcpndAbiaR398PM7q7o-ryLfLof7zGu2JA'; // Replace with your bearer token
      const response = await fetch('http://3.27.162.120:8080/filmhook-0.0.1-SNAPSHOT/user/booking/getBookingsByUserId?userId=3', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.status === 1) {
        setBookings(data.data);
      } else {
        console.error('Failed to fetch bookings:', data.message);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleAcceptBooking = async (bookingId, currentUserId, bookingUserId) => {
    console.log('bookingId, currentUserId, bookingUserId', bookingId, currentUserId, bookingUserId)
    try {
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyTmFtZSI6Inlhc3dhbnRoc2hhbmthcjI3MDVAZ21haWwuY29tIiwidXNlclR5cGUiOiJJbmR1c3RyeVVzZXIiLCJpYXQiOjE3MTU2Nzk2NzYsImV4cCI6MTcxNTY4MDg3Nn0.StFi7jM2mI37VG0IMXzlKhnWvt-D2XslzM36YhBc2Gl6ywHjislHvcpndAbiaR398PM7q7o-ryLfLof7zGu2JA'; // Replace with your bearer token
      const response = await fetch('http://3.27.162.120:8080/filmhook-0.0.1-SNAPSHOT/user/booking/acceptBookingRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            bookingId: bookingId,
            currentUserId: currentUserId,
            bookingUserId: bookingUserId
        }),
      });
      const data = await response.json();
      if (data.status === 1) {
        Alert.alert('Booking Accepted', 'Booking request accepted successfully');
        // Refetch bookings after accepting
        fetchBookings();
      } else {
        console.error('Failed to accept booking:', data.message);
      }
    } catch (error) {
      console.error('Error accepting booking:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Project Name: {item.projectName}</Text>
      <Text>From Date: {item.fromDate}</Text>
      <Text>To Date: {item.toDate}</Text>
      <TouchableOpacity 
       style={{width:responsiveWidth(15),height:responsiveHeight(4), position:'absolute',backgroundColor:'blue', alignItems:'center', justifyContent:'center', left:'90%', top:'95%', borderRadius:responsiveWidth(2)}}
        onPress={() => handleAcceptBooking(item.bookingId, item.currentUserId, item.bookingUserId)}
      >
        <Text style={{color:'white', fontWeight:'700'}}>Accept</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
    <View style={{alignItems:'center', justifyContent:'center', padding:responsiveWidth(5)}}>
      <Text style={{color:'black', fontSize:responsiveFontSize(2.5), fontWeight:'800'}}>JOB</Text>
    </View>
    <FlatList
      data={bookings}
      renderItem={renderItem}
      keyExtractor={(item) => item.bookingId.toString()}
    />
    </>
  );
};

const styles = StyleSheet.create({
  item: {
   
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth:1,
    borderRadius:responsiveWidth(3)
  },
});

export default GetJobResponse;
