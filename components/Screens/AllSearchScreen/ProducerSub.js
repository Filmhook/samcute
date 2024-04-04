


import React from "react";

import { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput, searchQuery, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';



const SubScreen = () => {

    const navigation = useNavigation();
    const jobPosts = [
        {
            id: 1,
            profession: 'PRODUCER',
        },
        {
            id: '2',
            profession: 'CO-PRODUCER',
        },
        {
            id: '3',
            profession: 'FINANCIER',
        },
        {
            id: '4',
            profession: 'ASSOCIATE PRODUCER',
        },

    ];

    const JobPosts = ({ profession }) => (

        <ImageBackground style={styles.inputContainer} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode='stretch'>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>{profession}</Text>
            </View>
        </ImageBackground>

    );

    const [select, setSelect] = useState(jobPosts)
    const handleOnPress = (item) => {
        const newItem = select.map((value) => {
            if (item.profession == 'PRODUCER') {
                return (
                    navigation.navigate("Director")
                )
            }
            if (item.profession == 'CO-PRODUCER') {
                return (
                    navigation.navigate("Director")
                )
            }
            if (item.profession == 'FINANCIER') {
                return (
                    navigation.navigate("Director")
                )
            }
            if (item.profession == 'ASSOCIATE PRODUCER') {
                return (
                    navigation.navigate("Director")
                )
            }

        }
        )
        setSelect(newItem)


    }

    return (
        <View style={styles.container}>

            <View style={styles.flatListContainer}>
                <FlatList
                    // data={jobPosts.filter((item) => ((item.profession).toLocaleLowerCase()).includes(search.toLocaleLowerCase()))}
                    data={jobPosts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (<TouchableOpacity onPress={() => handleOnPress(item)} style={styles.box}><JobPosts {...item} />
                    </TouchableOpacity>)}
                // style={{margin:5}}
                />
            </View>
        </View>

    )


};

export default SubScreen;

const styles = StyleSheet.create({

    content: {
        //borderWidth:1,
        //    flex: 1,
        //    flexDirection: 'row',
        //    flexWrap: 'wrap',
        //   alignItems: 'center',
        margin: responsiveWidth(2),
        width: responsiveWidth(75),
        height: responsiveHeight(6),
        marginTop: responsiveHeight(2)


    },
    container: {
        flex: 1,
        flexDirection: 'column',
        // borderWidth: 1,
        // borderColor: 'red',


        alignItems: 'center'
    },
    flatListContainer: {
        // borderWidth: 2,
        // borderColor: 'yellow',
        width: '100%',
        height: '100%',
        alignItems: 'center'

    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderRadius: responsiveWidth(3),
        height: responsiveHeight(9.2),
        width: responsiveWidth(87.5),
        margin: responsiveWidth(1),
        justifyContent:'center',
        

    },


    // box: {

    //     width: responsiveWidth(95),
    //     height: responsiveHeight(9),
    //     margin: responsiveHeight(0.3),
    //     borderRadius: responsiveWidth(5),
    //     backgroundColor: '#fff',
    //     borderWidth: 1,
    //     elevation:5
    // },



    // left:230,
    // top:40,
    //margin:5,

    title: {
        fontSize: responsiveFontSize(2.3),
        fontWeight: 'bold',
        color: 'black',
       // left: responsiveWidth(6),
      //  textAlign: 'center',
        
    },


});


