import {Picker} from '@react-native-picker/picker';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import CountryPicker, {
  getAllCountries,
} from 'react-native-country-picker-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  MultipleSelectList,
  SelectList,
} from 'react-native-dropdown-select-list';
import {
  brown100,
  red100,
} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import PublicAPI from '../../../api/publicAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IndustryUpdateOne() {
  const [nationality, setNationality] = useState('');
  const [selctedIndustry, setSelectedIndustry] = useState([]);
  const navigation = useNavigation();
  const [selectedSubOption, setSelectedSubOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpendata, setIsOpendata] = useState(false);
  const [isOpenProf, setIsOpenProf] = useState(false);
  const [isOpenProfSub, setIsOpenProfSub] = useState(false); // Added missing state
  const [dropdownData, setDropdownData] = useState([]);
  const [platformData, setPlatformData] = useState([]);
  const [professionData, setProfessionData] = useState([]);
  const [subProfessionData, setSubProfessionData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [industrySelected, setindustrySelected] = useState(null);
  const route = useRoute();

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [profession, setProfession] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [subProfession, setSubProfession] = useState(null);
  const [professionSub, setProfessionSub] = useState(null);
  const [selectedProfessionId, setSelectedProfessionId] = useState(null);

  const handleCountryChange = countryId => {
    setPlatform(countryId);
    setProfession(null); // Reset state when country changes
    setSubProfession(null); // Reset district when country changes
  };
  const industryOpen = async () => {
    try {
      const response = await PublicAPI.post('/industryUser/getDetails', {
        industries: 1, // Assuming industries = 1 is the flag
      });

      const dropdownData = response.data.industries.map(item => ({
        label: item.industryName,
        value: item.industryName,
      }));

      setDropdownData(dropdownData);
    } catch (error) {
      console.error('Error fetching dropdown data:', error);
    }
  };

  const platformOpen = async () => {
    try {
      const response = await PublicAPI.post('/industryUser/getDetails', {
        platforms: 1, // Assuming platforms = 1 is the flag
      });

      const platformData = response.data.platform.map(item => ({
        label: item.platformName,
        value: item.platformName,
      }));

      setPlatformData(platformData);
    } catch (error) {
      console.error('Error fetching platform dropdown data:', error);
    }
  };

  const ProfessionOpen = async () => {
    try {
      const response = await PublicAPI.post('/Film/getProfessionMapList', {});

      if (response.status === 200) {
        const professions = response.data.professionMapList.map(item => ({
          label: item.professionName,
          value: item.filmProfessionId, // Store profession ID as value
        }));
        setProfessionData(professions);
        console.log('Profession Data:', professions);
        console.log(selectedProfessionId);
      } else {
        console.error(
          'Error fetching dropdown data: Invalid status code',
          response.status,
        );
      }
    } catch (error) {
      console.error('Error fetching dropdown data:', error);
    }
  };
  const SubProfessionOpen = async () => {
    try {
      let allSubProfessions = [];
      for (let id of selectedProfessionId) {
        const response = await PublicAPI.post(
          'https://filmhook.annularprojects.com/filmhook-0.1/Film/getProfessionList',
          { filmProfesssionId: id },
         
        );
        const data = response.data;
        allSubProfessions = [...allSubProfessions, ...data.subProfessionName];
      }
      const uniqueSubProfessions = [...new Set(allSubProfessions)].map((name, index) => ({
        label: name,
        value: name,
      }));
     // setItems(uniqueSubProfessions);
      setSubProfessionData(uniqueSubProfessions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // empty dependency array to ensure useEffect runs only once

  const handleProfessionChange = selectedProfessionId => {
    setSelectedProfessionId(selectedProfessionId);
    SubProfessionOpen(selectedProfessionId); // Fetch sub-professions when profession changes
  };

  const handlepressNav = async () => {
    try {
      const id = await AsyncStorage.getItem('userId');
      console.log(`User Id from IS One ${id}`);

      // Check if any of the required fields are empty
      if (!selected || !industrySelected || !profession || !professionSub) {
        Alert.alert('Error','Please fill in all required fields');
        return;
      }

      // Map profession names
      const mapProfessionName =  profession?.map(p => {
        const profName = professionData?.find(n => n.value === p)
        return profName?.label
      });

      // Add temporary details
      const response = await PublicAPI.post(
        '/industryUser/addTemporaryDetails',
        {
          userId: parseInt(id),
          industriesName: selected,
          platformName: industrySelected,
          professionName: mapProfessionName,
          subProfessionName: professionSub,
        },
      );

      console.log('Registration successful:', response.data);
      console.log(selected, industrySelected, profession, professionSub);
      navigation.navigate('IndustryUpdateTwo');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
console.log("wowowoowowow")
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.formContainer}>
          <View
            style={{
              height: responsiveHeight(14),
              width: responsiveWidth(89),
              marginBottom: responsiveHeight(3),
              flexDirection: 'row',
              position: 'relative',
            }}>
            <Image
              style={{
                height: responsiveHeight(15.2),
                width: responsiveWidth(30),
                alignSelf: 'center',
              }}
              source={require('../../../Assets/Login_page/FH_logos.png')}
              resizeMode="stretch"
            />

            <Image
              style={{
                height: responsiveHeight(6.2),
                width: responsiveWidth(65),
                position: 'absolute',
                left: responsiveWidth(15),
                top: responsiveHeight(8),
              }}
              source={require('../../../Assets/Login_page/Film_hook_name.png')}
              resizeMode="stretch"
            />
            <Text
              style={{
                color: 'blue',
                fontWeight: 'bold',
                position: 'absolute',
                left: responsiveWidth(58),
                top: responsiveHeight(14),
              }}>
              Industry User
            </Text>
          </View>

          <View style={{}}>
            <DropDownPicker
              items={dropdownData}
              open={isOpendata}
              setOpen={() => setIsOpendata(!isOpendata)}
              value={selected}
              setValue={val => setSelected(val)}
              maxHeight={responsiveHeight(30)}
              autoScroll
              placeholder="Select your Industries"
              searchable={true}
              searchPlaceholderTextColor="search"
              onPress={industryOpen}
              placeholderStyle={{
                fontSize: responsiveFontSize(2),
//                color: 'black',
              }}
              dropDownContainerStyle={{

                width: responsiveWidth(86),
                height : responsiveWidth(400),
                marginTop: 2,
              }}
              showTickIcon={true}
              showArrowIcon={true}
              dropDownDirection="BOTTOM"
//              theme="LIGHT"
              multiple={true}
              mode="BADGE"
              badgeColors={['#00d4ff']}
              badgeDotColors={['green', 'red', 'blue', 'yellow']}
              badgeTextStyle={'black'}
              style={{

                marginTop: responsiveHeight(1),
                marginBottom: responsiveHeight(1),
                borderWidth: responsiveWidth(0.5),
                paddingHorizontal: responsiveWidth(2),
                borderRadius: responsiveWidth(2),
                height: responsiveHeight(8),
                width: responsiveWidth(86),
                zIndex: 3,
              }}
            />
          </View>
          <View style={{}}>
            <DropDownPicker
              items={platformData}
              open={isOpen}
              setOpen={() => setIsOpen(!isOpen)}
              value={industrySelected}
              setValue={val => setindustrySelected(val)}
              maxHeight={responsiveHeight(30)}
              autoScroll
              placeholder="Choose your Platforms"
              placeholderStyle={{
                fontSize: responsiveFontSize(2),
//                color: 'black',
              }}
              showTickIcon={true}
              showArrowIcon={true}
              dropDownContainerStyle={{
//                backgroundColor: 'gray',
                width: responsiveWidth(86),

//                marginTop: responsiveHeight(2),
              }}
              dropDownDirection="BOTTOM"
              searchable={true}
              searchPlaceholderTextColor="search"
              onPress={platformOpen}
              theme="LIGHT"
              multiple={true}
              mode="BADGE"
              badgeColors={['#00d4ff']}
              badgeDotColors={['green', 'red', 'blue', 'yellow']}
              badgeTextStyle={'black'}
              style={{
                marginTop: responsiveHeight(2),
                marginBottom: responsiveHeight(1),
                borderWidth: responsiveWidth(0.5),
                paddingHorizontal: responsiveWidth(2),
                borderRadius: responsiveWidth(2),
                height: responsiveHeight(8),
                width: responsiveWidth(86),
                shadowOffset: {width: -3, height: 9},
                shadowOpacity: 0.6,
                shadowRadius: 2,
                elevation: 1,
                shadowColor: 'gray',
                zIndex: 2,
              }}
            />
          </View>

          <View>
            <DropDownPicker
              items={professionData}
              open={isOpenProf}
              setOpen={() => setIsOpenProf(!isOpenProf)}
              value={profession}
              setValue={val => {
              setProfession(val)
              }}
              onChangeValue={handleProfessionChange}
              maxHeight={responsiveHeight(22)}
              autoScroll
              placeholder="What is your Profession?"
              placeholderStyle={{
                fontSize: responsiveFontSize(2),
//                color: 'black',
              }}
              showTickIcon={true}
              showArrowIcon={true}
              searchable={true}
              searchPlaceholderTextColor="search"
              dropDownContainerStyle={{
//                backgroundColor: 'gray',
                width: responsiveWidth(86),
//                marginTop: responsiveHeight(2),
              }}
              dropDownDirection="BOTTOM"
              theme="LIGHT"
              onPress={ProfessionOpen}
              multiple={true}
              mode="BADGE"
              badgeColors={['#00d4ff']}
              badgeDotColors={['green', 'red', 'blue', 'yellow']}
              badgeTextStyle={'black'}
              style={{
                marginTop: responsiveHeight(2),
                marginBottom: responsiveHeight(1),
                borderWidth: responsiveWidth(0.5),
                paddingHorizontal: responsiveWidth(2),
                borderRadius: responsiveWidth(2),
                height: responsiveHeight(8),
                width: responsiveWidth(86),
                // left: responsiveWidth(3),
                zIndex: 1,

                // borderColor: 'black',
                // margin: responsiveWidth(1),
              }}
            />
          </View>
          <View style={{}}>
            <DropDownPicker
              items={subProfessionData}
              open={isOpenProfSub}
              setOpen={() => setIsOpenProfSub(!isOpenProfSub)}
              value={professionSub}
              setValue={val => setProfessionSub(val)}
              maxHeight={responsiveHeight(24)}
              placeholder="List is your Sub Profession"
              placeholderStyle={{
                fontSize: responsiveFontSize(2),
//                color: 'black',
              }}
              showTickIcon={true}
              showArrowIcon={true}
              dropDownContainerStyle={{
//                backgroundColor: 'gray',
//                width: responsiveWidth(86),
//                marginBottom: responsiveHeight(3),
              }}
              dropDownDirection="TOP"
              searchable={true}
              searchPlaceholderTextColor="search"
              onPress={SubProfessionOpen}
              theme="LIGHT"
              multiple={true}
              mode="BADGE"
              badgeColors={['#00d4ff']}
              badgeDotColors={['green', 'red', 'blue', 'yellow']}
              badgeTextStyle={'black'}
              style={{
                marginTop: responsiveHeight(2),
                marginBottom: responsiveHeight(3),
                borderWidth: responsiveWidth(0.5),
                paddingHorizontal: responsiveWidth(2),
                borderRadius: responsiveWidth(2),
                height: responsiveHeight(8),
                width: responsiveWidth(86),
                zIndex: 2,
              }}
            />
          </View>

          <View style={{flexDirection: 'row', columnGap: responsiveWidth(18)}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2),
                }}>
                Back
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlepressNav}
              style={styles.nextButton}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2),
                }}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // padding: responsiveWidth(3),
    backgroundColor: '#f5f5f5',

    width: '100%',
    height: '100%',
  },

  // inputContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: responsiveHeight(8.4),
  //   width: responsiveWidth(86.7),
  //   margin: responsiveWidth(1),
  //   color: 'black',
  //   resizeMode: 'contain'

  // },
  boxContent2: {
    height: responsiveHeight(8.3),
    width: responsiveWidth(86),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
    borderRadius: responsiveWidth(3.2),
    // borderWidth: responsiveWidth(0.3),
    color: 'black',
    margin: 1,
  },
  picker: {
    width: responsiveWidth(87),
    borderRadius: 8,
    height: responsiveHeight(7),
    borderCurve: responsiveWidth(2),

    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
    // backgroundColor:'red',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(8.4),
    width: responsiveWidth(86.7),
    margin: responsiveWidth(1),
    color: 'black',
    resizeMode: 'contain',
    zIndex: -1,
  },
  formContainer: {
    width: '100%',

    // padding: responsiveWidth(3),
    backgroundColor: '#f5f5f5',
    borderRadius: responsiveWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(3),
  },
  countryPickerContainer: {
    flexDirection: 'row',
    // justifyContent:'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),

    borderWidth: responsiveWidth(0.5),
    paddingHorizontal: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
    height: responsiveHeight(8.2),
    width: responsiveWidth(86),
    borderColor: 'black',
    margin: responsiveWidth(1),
  },
  selectContainer: {
    marginBottom: 20,
  },

  input: {
    height: responsiveHeight(4),
    borderColor: 'black',
    marginBottom: responsiveHeight(2),
    width: '100%',
    fontSize: responsiveFontSize(2),
    top: responsiveHeight(1),
    borderWidth: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: 'black',
    // padding: responsiveWidth(2.5),
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    height: responsiveHeight(6),
    width: responsiveWidth(30),
    borderWidth: responsiveWidth(0.6),
    borderColor: 'black',
  },
  nextButton: {
    backgroundColor: '#616161',
    // padding: responsiveWidth(2.5),
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    height: responsiveHeight(6),
    width: responsiveWidth(30),
    //bottom: responsiveHeight(1.5)
    borderWidth: responsiveWidth(0.6),
    borderColor: 'black',
  },
});
