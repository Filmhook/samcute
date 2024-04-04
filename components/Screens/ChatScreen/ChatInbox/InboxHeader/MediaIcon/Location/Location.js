import React from 'react'
import { Image, TouchableOpacity, View ,StyleSheet} from 'react-native'
//import Geolocation from "react-native-geolocation-service"
//import Geolocation from "@react-native-community/geolocation"

export default function Location() {

    //  const [location, setLocation] = useState(null);

    // const Locationshare=()=>{
    //     console.log("clicked")
    //       Geolocation.getCurrentPosition(
    //         (position)=>{
    //             console.log(position);
    //         },
    //         (error) =>{
    //             console.log(error);
    //         },
    //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000}
    //       )
    //         Geolocation.getCurrentPosition(
    //             (position) => {
    //               console.log(position);
    //             },
    //             (error) => {
    //               // See error code charts below.
    //               console.log(error);
    //             },
    //             { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000}
    //         );
          
    // }

  return (
    <> 
    <TouchableOpacity >
        <View style={style.imagediv}>
            <Image source={require('../../../../../../../components/Assets/Chats_Icon_And_Fonts/location_icon.png')} style={style.image}/>
        </View>
    </TouchableOpacity>
    </>
  )
}

const style = StyleSheet.create({
    imagediv:{
        height:60,
        width:60,
        marginLeft:100,
        marginTop:-60,
        borderRadius:50,
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"black",
        justifyContent:"center",
        alignItems:"center"
    },
    image:{
        width:'80%',
        height:'80%'
    }
})
