import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, StyleSheet,TouchableOpacity  } from 'react-native';
import axios from 'axios';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import privateAPI from '../../api/privateAPI';


const BuyRental = ({route}) => {
    const {userId}= route.params;
    const [marketPlaces, setMarketPlaces] = useState([]);

    useEffect(() => {
        const fetchMarketPlaces = async () => {
            try {
                const response = await privateAPI.get(`marketPlace/getUserMarketPlaces?userId=${userId}`, {
                   
                });
                setMarketPlaces(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchMarketPlaces();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Text style={styles.companyName}>Company Name: {item.companyName}</Text>
            <Text style={styles.productName}>Product Name: {item.productName}</Text>
            <Text style={styles.productDescription}>Product Description: {item.productDescription}</Text>
            <Text style={styles.newProduct}>New Product: {item.newProduct ? 'Yes' : 'No'}</Text>
            <Text style={styles.price}>Price: INR {item.cost}</Text>
            <Image source={{ uri: item.fileOutputWebModel.length > 0 ? item.fileOutputWebModel[0].filePath : '' }} style={styles.productImage} />
            <TouchableOpacity style={{justifyContent:'center',alignItems:'center',backgroundColor:'black',width:responsiveWidth(20),marginTop:responsiveHeight(2),height:responsiveHeight(4),borderRadius:responsiveHeight(1.5),left:responsiveWidth(62)}}>
                <Text style={{color:'white',fontSize:responsiveFontSize(2)}}>Confirm</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Posted Products</Text>
            <FlatList
                data={marketPlaces}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    productContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    companyName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 5,
    },
    productName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#34495e',
        marginBottom: 5,
    },
    productDescription: {
        fontSize: 16,
        fontWeight: '400',
        color: '#7f8c8d',
        marginBottom: 5,
    },
    newProduct: {
        fontSize: 16,
        fontWeight: '400',
        color: '#27ae60',
        marginBottom: 5,
    },
    price: {
        fontSize: 18,
        fontWeight: '700',
        color: '#e74c3c',
        marginBottom: 10,
    },
    productImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
});

export default BuyRental;
