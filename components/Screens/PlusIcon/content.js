import React from "react";

import { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput, searchQuery } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


const Content=()=> {
    const navigation = useNavigation();
    const jobPosts = [
        {
            id: 1,
            profession: 'PROFILE',
        },
        {
            id: '2',
            profession: 'HELP AND CONTENT',
        },
        {
            id: '3',
            profession: 'BLOCKED PROFILE',
        },
       
        {
            id: '4',
            profession: 'NEAR TO ME',
        },
        {
            id: '5',
            profession: 'THEME MODE',
        },
        {
            id: '6',
            profession: 'SETTINGS',
        },
        {
            id: '7',
            profession: 'LOGOUT',
        },
       
       

    ];

    const JobPosts = ({ profession }) => (
        <View style={styles.content}>
            <Text style={styles.title}>{profession}</Text>
        </View>
    );

    const [select, setSelect] = useState(jobPosts)
    const handleOnPress = (item) => {
        const newItem = select.map((value) => {
            if (item.profession == 'PROFILE') {
                return (
                    navigation.navigate("Director")
                )
            }
            if (item.profession == 'HELP AND CONTENT') {
                return (
                    navigation.navigate("HelpAndContent")
                )
            }
            if (item.profession == 'BLOCKED PROFILE') {
                return (
                    navigation.navigate("Director")
                )
            }
            
            if (item.profession == 'NEAR TO ME') {
                return (
                    navigation.navigate("Director")
                )
            }
            if (item.profession == 'THEME MODE') {
                return (
                    navigation.navigate("Director")
                )
            }
            if (item.profession == 'SETTINGS') {
                return (
                    navigation.navigate("Director")
                )
            }
            if (item.profession == 'LOGOUT') {
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

export default Content;

const styles = StyleSheet.create({

    content: {
       margin: responsiveWidth(2),
       width: responsiveWidth(75),
       height: responsiveHeight(6),
       marginTop:responsiveHeight(2)
       
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },

    flatListContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },

    box: {

        width: responsiveWidth(95),
        height: responsiveHeight(9),
        margin: responsiveHeight(0.3),
        borderRadius: responsiveWidth(5),
        backgroundColor: '#fff',
        borderWidth: 1,
        alignContent:'center'
    },

    title: {
        fontSize: responsiveFontSize(2.3),
        fontWeight: 'bold',
        color: 'black',
        left: responsiveWidth(6),
        marginTop:responsiveHeight(0.5)
      },

});

