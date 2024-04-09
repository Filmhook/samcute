import { ImageBackground, StyleSheet, TextInput } from 'react-native'
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text ,ScrollView,Image } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Checkbox } from 'react-native-paper';import AsyncStorage from '@react-native-async-storage/async-storage';
import PublicAPI from '../../../api/publicAPI';

const Industry_S_Confirm = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [tempData , setTempData] = useState({})
    const checked = route?.params?.checked
    const [makeData , setMakeData] = useState([])
    const [toggleCheckBox, setToggleCheckBox] = useState([]);
    useEffect(() => {
//    setMakeData([])
     const fetchData = async () => {
          try {
             const id = await AsyncStorage.getItem('userId');
            console.log(`User Id from ISconfirm ${id}`)
            const response = await PublicAPI.post(
              `/industryUser/getTemporaryDuplicateDetails`,
              {
                userId: parseInt(id),
              },
            );
            console.log(response)
            setTempData(response.data || {});
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        fetchData();
    }, [])


    const makeActiveInd = (indKey , status) => {
        let prevInd = {...tempData};
        prevInd[indKey].inductryActive = status;
        setTempData(prevInd)
    }

    const makeActivePlatform = (indKey , status , platformInx) => {
            let prevInd = {...tempData};
            prevInd[indKey].platforms[platformInx].active = status;
            setTempData(prevInd)
        }

       const makeActiveProfessions = (indKey , status , platformInx, prefesInx) => {
                  let prevInd = {...tempData};
                  prevInd[indKey].platforms[platformInx].professions[prefesInx].active = status;
                  setTempData(prevInd)
              }

const makeFormattedData = (indName , platName, profName,subProfName) => {
        let prev = [...makeData];
            const isIndIndex = prev.findIndex(i => i.industriesName === indName);
            if(isIndIndex === -1){
            prev.push({industriesName : indName, platformDetails :[{platformName : platName, professionDetails : [{professionName : profName, subProfessionName: [subProfName]}]}]})
            }else{

            const isPlatformIndex = prev[isIndIndex].platformDetails.findIndex(p => p.platformName === platName);

            if(isPlatformIndex === -1){
            prev[isIndIndex].platformDetails.push({platformName : platName, professionDetails : [{professionName : profName, subProfessionName: [subProfName]}]})
            }else{
                const isProfNameIndex = prev[isIndIndex].platformDetails[isPlatformIndex].professionDetails.findIndex(pd => pd.professionName === profName)
console.log(isProfNameIndex)
                if(isProfNameIndex === -1){

                prev[isIndIndex].platformDetails[isPlatformIndex].professionDetails.push({professionName : profName,subProfessionName: [subProfName]  })
console.log("WORKOK")
                }else{

                const  isSubProfFound=  prev[isIndIndex].platformDetails[isPlatformIndex].professionDetails[isProfNameIndex].subProfessionName.includes(subProfName)
if(isSubProfFound){
//Sub Profession Found
console.log("Do remove")
//prev.splice(isIndIndex, 1)
}else{
prev[isIndIndex].platformDetails[isPlatformIndex].professionDetails[isProfNameIndex].subProfessionName.push(subProfName)
}
                }
            }
            }
            setMakeData(prev)

            let prevCheckTog= [...toggleCheckBox]
            const joinCheckBox = `${indName}-${platName}-${profName}-${subProfName}`
            const isFound = prevCheckTog.findIndex(p => p === joinCheckBox)
            if(isFound === -1){
            prevCheckTog.push(joinCheckBox)
            }else{
            prevCheckTog.splice(isFound , 1)
            prev.splice(isIndIndex, 1)
            }
            setToggleCheckBox(prevCheckTog)
}

const makeActiveCheckbox = (ind , plat , pref , subPre) => {
const isCheck = toggleCheckBox.includes(`${ind}-${plat}-${pref}-${subPre}`)
return isCheck ? "checked" : "unchecked"
}

console.log(`Organisations is : ${JSON.stringify(makeData)}`);
console.log(toggleCheckBox)

const handleSave =async () => {

try {
      const id = await AsyncStorage.getItem('userId');
console.log(`User Id from IS Confirm ${id}`)


      const response = await PublicAPI.post(
        `/industryUser/addIndustryUserPermanentDetails?userId=${id}`,

          makeData
        ,
      );

      console.log('Registration successful:', response.data);
    navigation.navigate('IndustryTwo');
    } catch (error) {
      console.error('Registration failed:', error);
    }


}

    return (
        <ScrollView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginTop:responsiveHeight(6) }}>

      <View style={{ height: responsiveHeight(14), width: responsiveWidth(89), marginBottom: responsiveHeight(2), flexDirection: 'row', position: 'relative', }}>

<Image style={{
  height: responsiveHeight(15.2),
  width: responsiveWidth(30), alignSelf: 'center',
}} source={require("../../../Assets/Login_page/FH_logos.png")} resizeMode="stretch" />

<Image style={{ height: responsiveHeight(6.2), width: responsiveWidth(65), position: 'absolute', left: responsiveWidth(15), top: responsiveHeight(8) }} source={require('../../../Assets/Login_page/Film_hook_name.png')} resizeMode="stretch" />
<Text style={{ color: 'blue', fontWeight: 'bold', position: 'absolute', left: responsiveWidth(60), top: responsiveHeight(14) }}> Industry User</Text>


</View>

{
Object.keys(tempData).map((industries) => (
<>
<View style={styles.searchBox}>
                <ImageBackground
                    style={styles.inputContainernew}
                    source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                    resizeMode="stretch"
                >
                    <Text style={styles.input}>{industries}</Text>
                    <TouchableOpacity
                        style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: 'black',
                            bottom: responsiveHeight(2.5),
                            justifyContent: 'center',
                            alignItems: 'center',
                            left: responsiveWidth(2)
                        }}
                        onPress={(e) => {
                        makeActiveInd(industries, !tempData[industries].inductryActive)
                        }}
                    >
                    {
                    tempData[industries]?.inductryActive &&    <View
                                                                                           style={{
                                                                                               width: 10,
                                                                                               height: 10,
                                                                                               borderRadius: 5,
                                                                                               backgroundColor: 'black',
                                                                                           }}
                                                                                       />
                    }


                    </TouchableOpacity>
                </ImageBackground>
            </View>

              {tempData[industries]?.inductryActive && tempData[industries].platforms.map((platform, platformInx) => (
              <>
                            <View style={styles.searchBox}>
                                <ImageBackground
                                    style={styles.inputContainernew}
                                    source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                                    resizeMode="stretch"
                                >
                                    <Text style={styles.input}>{platform.platformName}</Text>
                                    <TouchableOpacity
                                        style={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            borderColor: 'black',
                                            bottom: responsiveHeight(2.5),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            left: responsiveWidth(2)
                                        }}
                                        onPress={() => {
                                        makeActivePlatform(industries , !tempData[industries].platforms[platformInx].active , platformInx)
                                        }}
                                    >
                                        {tempData[industries].platforms[platformInx].active && (
                                            <View
                                                style={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: 5,
                                                    backgroundColor: 'black',
                                                }}
                                            />
                                        )}
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>

                            {tempData[industries].platforms[platformInx].active && tempData[industries].platforms[platformInx].professions.map((prof , profInx) => (
                                           <>
                                            <View style={styles.searchBox}>

                                                <ImageBackground
                                                    style={styles.inputContainernew}
                                                    source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')}
                                                    resizeMode="stretch"
                                                >
                                                    <Text style={styles.input}>{prof?.professionName}</Text>
                                                    <TouchableOpacity
                                                        style={{
                                                            width: 20,
                                                            height: 20,
                                                            borderRadius: 10,
                                                            borderWidth: 1,
                                                            borderColor: 'black ',
                                                            bottom: responsiveHeight(2.5),
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            left: responsiveWidth(2)
                                                        }}
                                                        onPress={() => {
                                                       makeActiveProfessions(industries , !tempData[industries].platforms[platformInx].professions[profInx].active , platformInx, profInx)

                                                        }}
                                                    >

                                                     {tempData[industries].platforms[platformInx].professions[profInx].active && (
                                                                                                 <View
                                                                                                     style={{
                                                                                                         width: 10,
                                                                                                         height: 10,
                                                                                                         borderRadius: 5,
                                                                                                         backgroundColor: 'black',
                                                                                                     }}
                                                                                                 />
                                                                                             )}

                                                    </TouchableOpacity>
                                                </ImageBackground>
                                            </View>
                                             {tempData[industries].platforms[platformInx].professions[profInx].active && prof.subProfessionName?.map( spName => (
                                                                                                    <View style={{flexDirection:"row",flexWrap:'wrap'}}>
                                                                                                       <View style={styles.checkboxContainer}>
                                                                                                            <Checkbox
status={makeActiveCheckbox(industries , platform.platformName, prof?.professionName,spName)}
                                                                                                             onPress={() => {
                                                                                                            makeFormattedData(industries , platform.platformName, prof?.professionName,spName)

                                                                                                            }}

                                                                                                             />
                                                                                                            <Text>{spName}</Text>
                                                                                                        </View>

                                                                                                    </View>
                                                                                                ))}


                                            </>
                                        ))}





                            </>
                        ))}




</>
))

}
 <View
        style={{
          flexDirection: 'row',
          columnGap: responsiveWidth(18),
          justifyContent: 'center',
          alignItems: 'center',
          padding: responsiveWidth(4),
        }}>
<TouchableOpacity
          onPress={() => navigation.navigate('IndustryOne', {checked})}
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
        <TouchableOpacity onPress={handleSave} style={styles.nextButton}>
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
    );
};

export default Industry_S_Confirm;

const styles = StyleSheet.create({
    searchBox: {
        width: '100%',
        marginBottom: 10,
        position: 'relative',
    },

    inputContainernew:{
        width: '100%',
        marginBottom: 10,
        padding: 5,
        height: responsiveHeight(8),
    },
    input: {
        // borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        top: responsiveHeight(0.6),
        left: responsiveWidth(5)
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: responsiveWidth(5),
        marginBottom: 10,
        borderWidth:responsiveWidth(0.5),
        width: responsiveWidth(44),
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
        borderColor: 'black'
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
        borderColor: 'black'
      },
});
