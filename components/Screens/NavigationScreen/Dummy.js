import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatList } from 'react-native-gesture-handler';

export default function Dummy() {

  
  const navigation = useNavigation();
    const jobPosts = [
        {
            id: 1,
            profession: 'DIRECTOR',
        },
        {
            id: '2',
            profession: 'CO-DIRECTOR',
        },
        {
            id: '3',
            profession: 'ASSISTANT DIRECTOR',
        },
       
        {
            id: '4',
            profession: 'ASSOCIATE DIRECTOR',
        },
        {
            id: '5',
            profession: 'SECOND UNIT DIRECTOR',
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
            if (item.profession == 'DIRECTOR') {
                return (
                    navigation.navigate("Director")
                )
            }
            if (item.profession == 'CO-DIRECTOR') {
                return (
                    navigation.navigate("Director")
                )
            }
            if (item.profession == 'ASSISTANT DIRECTOR') {
                return (
                    navigation.navigate("Director")
                )
            }
            
            if (item.profession == 'ASSOCIATE DIRECTOR') {
                return (
                    navigation.navigate("Director")
                )
            }
            if (item.profession == 'SECOND UNIT DIRECTOR') {
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