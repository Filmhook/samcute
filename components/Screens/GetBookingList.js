import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetBookingList = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {

            const userId=await AsyncStorage.getItem('id')
            try {
                const token = 'your_bearer_token_here'; // Replace 'your_bearer_token_here' with your actual bearer token
                const response = await axios.get('https://filmhook.annularprojects.com/filmhook-0.0.1-SNAPSHOT/user/booking/getBookingsByUserId', {
                    params: {
                        userId: userId
                    },
                    headers: {
                        Authorization: `Bearer ${'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyTmFtZSI6Inlhc3dhbnRoc2hhbmthcjI3MDVAZ21haWwuY29tIiwidXNlclR5cGUiOiJJbmR1c3RyeVVzZXIiLCJpYXQiOjE3MTU3NzE4MDEsImV4cCI6MTcxNTc3MzAwMX0.ADeIRQKXSBMMHv8XbjG9Errb_x7ElTLk0hl6qZ5nRLqsFMN0rUhktIelDYfj_0ElnDqLAhUVEKJ_scojz96A0Q'}`
                    }
                });
                setBookings(response.data.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchBookings();
    }, []);

    const handleConfirmBooking = async (bookingId, bookingUserId) => {
        try {
            const userId=await AsyncStorage.getItem('id')
            const response = await axios.post('https://filmhook.annularprojects.com/filmhook-0.0.1-SNAPSHOT/user/booking/updateBookingRequest', {
                bookingId: bookingId,
                currentUserId: userId,
                bookingUserId: bookingUserId,
                bookingStatus: 'Confirm'
            }, {
                headers: {
                    Authorization: `Bearer ${'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyTmFtZSI6Inlhc3dhbnRoc2hhbmthcjI3MDVAZ21haWwuY29tIiwidXNlclR5cGUiOiJJbmR1c3RyeVVzZXIiLCJpYXQiOjE3MTU3NzE4MDEsImV4cCI6MTcxNTc3MzAwMX0.ADeIRQKXSBMMHv8XbjG9Errb_x7ElTLk0hl6qZ5nRLqsFMN0rUhktIelDYfj_0ElnDqLAhUVEKJ_scojz96A0Q'}`
                }
            });
            Alert.alert('Confirm', 'Booking Confirmed')
            console.log('Booking confirmed:', response.data);
            // Refresh bookings after confirmation
          
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRejectBooking = async (bookingId, bookingUserId) => {
        try {
            const userId=await AsyncStorage.getItem('id')
            const response = await axios.post('https://filmhook.annularprojects.com/filmhook-0.0.1-SNAPSHOT/user/booking/updateBookingRequest', {
                bookingId: bookingId,
                currentUserId: userId,
                bookingUserId: bookingUserId,
                bookingStatus: 'Reject'
            }, {
                headers: {
                    Authorization: `Bearer ${'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyTmFtZSI6Inlhc3dhbnRoc2hhbmthcjI3MDVAZ21haWwuY29tIiwidXNlclR5cGUiOiJJbmR1c3RyeVVzZXIiLCJpYXQiOjE3MTU3NzkwNTMsImV4cCI6MTcxNTc4MDI1M30.DsALRFwFwD4v59s03W-2ekKbRLEi_oDZRAkv33osB4ZxXdn88emEzdGHlZGF93XPat0LBn3dzayG6ZT6KLDuGA'}`
                }
            });
            Alert.alert('Reject', 'Booking Rejected')
            console.log('Booking rejected:', response.data);
            // Refresh bookings after rejection
          
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.bookingContainer}>
            <View style={styles.parent}>
                <View style={{ flexDirection: 'row', padding: responsiveWidth(1), width: responsiveWidth(75), flexWrap: 'wrap', backgroundColor: '#d8d9db',marginTop: responsiveHeight(1), elevation:responsiveWidth(2),marginBottom:responsiveHeight(2) }} >
                <View style={{ flexDirection: 'column', alignItems: 'flex-start', columnGap: responsiveHeight(6) }}>
              <Text style={styles.lhs}>Project Name</Text>
              <Text style={styles.lhs}>From Date</Text>

              <Text style={styles.lhs}>To Date</Text>
             
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', columnGap: responsiveHeight(6), left: responsiveWidth(10) }}>
              <Text style={styles.center}>:</Text>
              <Text style={styles.center}>:</Text>

              <Text style={styles.center}>:</Text>
             
            </View>


            <View style={{ flexDirection: 'column', alignItems: 'flex-start', columnGap: responsiveHeight(6), left: responsiveWidth(15) }}>
              <Text style={styles.rhs}> {item.projectName}</Text>
              <Text style={styles.rhs}> {item.fromDate}</Text>

              <Text style={styles.rhs}> {item.toDate}</Text>
             
            </View>

               
                </View>
            </View>
            <View style={styles.buttonContainer}>
               
                <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={() => handleConfirmBooking(item.bookingId, item.bookingUserId)}>
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button2, styles.rejectButton]} onPress={() => handleRejectBooking(item.bookingId, item.bookingUserId)}>
                    <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Booking List</Text>
            <FlatList
                data={bookings}
                renderItem={renderItem}
                keyExtractor={item => item.bookingId.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Times New Roman',
        color:'black'
    },
    bookingContainer: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        width: responsiveWidth(90),

    },

    buttonContainer: {
        flexDirection: 'row',
   
        marginTop: 10,
        left:responsiveWidth(30)
     
    },
    button: {
        padding: 10,
        borderRadius: 10,
       
    },
    button2:{
        padding:10,
        borderRadius:10,
        left:responsiveWidth(10)
    },
    rejectButton: {
        backgroundColor: 'red',
    },
    confirmButton: {
        backgroundColor: 'blue',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    parent: {
        // justifyContent:"center",
        // alignItems:'center'
        left: responsiveWidth(4)
    },
    lhs: {
        fontSize: responsiveFontSize(2),
        color: 'black',
        fontWeight: '800'
      },
      center: {
        fontSize: responsiveFontSize(2),
        color: 'black',
        fontWeight: '600'
      },
      rhs: {
        fontSize: responsiveFontSize(2),
        color: 'blue',
        fontWeight: '600'
    
      },
});

export default GetBookingList;