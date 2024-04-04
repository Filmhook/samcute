import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CheckBox from '@react-native-community/checkbox';

const IndustryPage = ({userId}) => {
  const [industryData, setIndustryData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `https://filmhook.annularprojects.com/filmhook-0.0.1/industryUser/getTemporaryDetails`,
          {
            userId: 1,
          },
        );
        setIndustryData(response.data || {});
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const isProfessionSelected = (industryName, platformIndex, profession) => {
    const industry = industryData[industryName];
    const platform =
      industry && industry.platforms && industry.platforms[platformIndex];
    return (
      platform &&
      platform.selectedProfessions &&
      platform.selectedProfessions.includes(profession)
    );
  };

  const isSubProfessionSelected = (
    industryName,
    platformIndex,
    subProfession,
  ) => {
    const industry = industryData[industryName];
    const platform =
      industry && industry.platforms && industry.platforms[platformIndex];
    return (
      platform &&
      platform.selectedSubProfessions &&
      platform.selectedSubProfessions.includes(subProfession)
    );
  };

  const toggleProfession = (industryName, platformIndex, profession) => {
    setIndustryData(prevData => {
      const updatedData = {...prevData};
      const platform = updatedData[industryName].platforms[platformIndex];
      platform.selectedProfessions = platform.selectedProfessions || []; // Ensure selectedProfessions is initialized
      const professionIndex = platform.selectedProfessions.indexOf(profession);

      if (professionIndex !== -1) {
        platform.selectedProfessions.splice(professionIndex, 1);
      } else {
        platform.selectedProfessions.push(profession);
      }
      return updatedData;
    });
  };

  const toggleSubProfession = (industryName, platformIndex, subProfession) => {
    setIndustryData(prevData => {
      const updatedData = {...prevData};
      const platform = updatedData[industryName].platforms[platformIndex];
      platform.selectedSubProfessions = platform.selectedSubProfessions || []; // Ensure selectedSubProfessions is initialized
      const subProfessionIndex =
        platform.selectedSubProfessions.indexOf(subProfession);

      if (subProfessionIndex !== -1) {
        platform.selectedSubProfessions.splice(subProfessionIndex, 1);
      } else {
        platform.selectedSubProfessions.push(subProfession);
      }
      return updatedData;
    });
  };

  return (
    <ScrollView style={styles.container}>
      {Object.entries(industryData).map(([industryName, industry], index) => (
        <View key={index} style={styles.industryContainer}>
          <View style={styles.searchBox}>
            <ImageBackground
              style={styles.inputContainernew}
              source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
              resizeMode="stretch">
              <Text style={styles.industryTitle}>{industryName}</Text>
            </ImageBackground>
          </View>
          {industry.platforms.map((platform, platformIndex) => (
            <View key={platformIndex} style={styles.platformContainer}>
              <View style={styles.searchBox}>
                <Text style={styles.platformName}>{platform.platformName}</Text>
              </View>
              <View style={styles.professionContainer}>
                {platform.professions.map((profession, professionIndex) => (
                  <View
                    key={professionIndex}
                    style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CheckBox
                      value={isProfessionSelected(
                        industryName,
                        platformIndex,
                        profession,
                      )}
                      onValueChange={() =>
                        toggleProfession(
                          industryName,
                          platformIndex,
                          profession,
                        )
                      }
                    />
                    <Text style={styles.profession}>{profession}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.subProfessionContainer}>
                {platform.subProfessions.map(
                  (subProfession, subProfessionIndex) => (
                    <View
                      key={subProfessionIndex}
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <CheckBox
                        value={isSubProfessionSelected(
                          industryName,
                          platformIndex,
                          subProfession,
                        )}
                        onValueChange={() =>
                          toggleSubProfession(
                            industryName,
                            platformIndex,
                            subProfession,
                          )
                        }
                      />
                      <Text style={styles.subProfession}>{subProfession}</Text>
                    </View>
                  ),
                )}
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  industryContainer: {
    marginBottom: 20,
    borderWidth: 1,
  },
  industryTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  platformContainer: {
    marginBottom: 10,
  },
  platformName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  professionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  profession: {
    marginRight: 10,
  },
  subProfessionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subProfession: {
    marginRight: 10,
    color: '#666',
  },
  searchBox: {
    width: '100%',
    marginBottom: 10,
    padding: 5,
    position: 'relative',
  },
  inputContainernew: {
    width: '100%',
    marginBottom: 10,
    padding: 5,
    height: responsiveHeight(8),
  },
});

export default IndustryPage;
