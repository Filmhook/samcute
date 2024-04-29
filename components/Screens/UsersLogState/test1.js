import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import privateAPI from '../../api/privateAPI';


export default function Profession() {
  const [platformData, setPlatformData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(); // Fetch data initially when component mounts
  }, []);

  const fetchData = async () => {
    try {
      const resp = await privateAPI.post(`industryUser/getIndustryUserPermanentDetails?userId=248`);
      const response = resp.data;

      // Update state with fetched data
      setPlatformData(response);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoading(false); // Set loading to false if an error occurs
    }
  };

  const handleEdit = async (platformPermanentId, filmCount, netWorth, dailySalary) => {
    try {
      const token = 'YOUR_JWT_TOKEN'; // Replace 'YOUR_JWT_TOKEN' with your actual JWT token

      // Make the API request with the updated data and platform ID
      const response = await privateAPI.post(
        'industryUser/updateIndustryUserPermanentDetails',
        {
          platformPermanentId: 2,
          filmCount: filmCount,
          netWorth: netWorth,
          dailySalary: dailySalary,
        }
      );
      
console.log()
      console.log('Platform details updated successfully:', response.data);
      // Optionally, you can handle success actions here, such as showing a success message or updating state
    } catch (error) {
      console.error('Error updating platform details:', error);
      // Optionally, you can handle error actions here, such as showing an error message to the user
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {loading ? (
          <Text>Loading...</Text> 
        ) : (
          platformData.map((platform, index) => (
            <View key={index} style={styles.platformContainer}>
              <TouchableOpacity onPress={() => handleEdit(platform.platformPermanentId, 77,99,99)}>
                <Text>Edit</Text> 
              </TouchableOpacity>
             
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width: responsiveWidth(100),
  },
  platformContainer: {
    width: responsiveWidth(100),
    marginBottom: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(2),
  },
});

