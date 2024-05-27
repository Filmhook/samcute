import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AppC = () => {
  const [platformData, setPlatformData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      console.log('check userid', userId);
      const resp = await axios.get(`https://yourapi.com/industryUser/getIndustryUserPermanentDetails?userId=3`);
      const response = resp.data;
  
      if (!Array.isArray(response)) {
        throw new Error("Response is not an array.");
      }
  
      const modifiedData = response.map(item => ({
        platformName: item.platformName,
        industries: item.industries.map(industry => ({
          industryName: industry.industryName,
          imageURL: `data:image/jpeg;base64,${industry.industryimage}`, // Decode base64 to image URL
        })),
        professions: item.professions.map(profession => ({
          professionName: profession.professionName,
          subProfessions: profession.subProfessions.map(subProfession => ({
            subProfessionName: subProfession.subProfessionName,
            startingYear: subProfession.startingYear,
            endingYear: subProfession.endingYear,
          })) || [],
          imageURL: `data:image/jpeg;base64,${profession.image}`, // Decode base64 to image URL
        })),
        filmCount: item.filmCount,
        netWorth: item.netWorth,
        dailySalary: item.dailySalary,
        platformPermanentId: item.platformPermanentId,
        platformImageURL: `data:image/jpeg;base64,${item.platformImage}`, // Decode base64 to image URL
        filePaths: item.outputWebModelList.map(file => ({
          filePath: file.filePath,
          description: file.description,
        })),
      }));
  
      setPlatformData(modifiedData);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const renderPlatformData = (data) => {
    return data.map((item, index) => (
      <View key={index} style={styles.container}>
        <Text style={styles.title}>{item.platformName}</Text>
        {item.platformImageURL && <Image source={{ uri: item.platformImageURL }} style={styles.image} />}
        <Text>Film Count: {item.filmCount}</Text>
        <Text>Net Worth: {item.netWorth}</Text>
        <Text>Daily Salary: {item.dailySalary}</Text>

        <Text style={styles.subtitle}>Industries</Text>
        {item.industries.map((industry, indIndex) => (
          <View key={indIndex} style={styles.section}>
            <Text>{industry.industryName}</Text>
            {industry.imageURL && <Image source={{ uri: industry.imageURL }} style={styles.image} />}
          </View>
        ))}

        <Text style={styles.subtitle}>Professions</Text>
        {item.professions.map((profession, profIndex) => (
          <View key={profIndex} style={styles.section}>
            <Text>{profession.professionName}</Text>
            {profession.imageURL && <Image source={{ uri: profession.imageURL }} style={styles.image} />}
            {profession.subProfessions.map((subProfession, subIndex) => (
              <View key={subIndex} style={styles.subSection}>
                <Text>Sub-Profession: {subProfession.subProfessionName}</Text>
                <Text>Starting Year: {subProfession.startingYear}</Text>
                <Text>Ending Year: {subProfession.endingYear}</Text>
              </View>
            ))}
          </View>
        ))}

        <Text style={styles.subtitle}>Files</Text>
        {item.filePaths.map((file, fileIndex) => (
          <View key={fileIndex} style={styles.section}>
            <Text>Description: {file.description}</Text>
            <Text>File Path: {file.filePath}</Text>
          </View>
        ))}
      </View>
    ));
  };

  return (
    <ScrollView>
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : renderPlatformData(platformData)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  section: {
    marginTop: 5,
  },
  subSection: {
    paddingLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginTop: 5,
  },
});

export default AppC;
