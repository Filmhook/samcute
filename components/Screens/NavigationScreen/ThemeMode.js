import React,{useState } from 'react'
import { StyleSheet, Text, View ,Switch} from 'react-native'


export default function Thememode() {
    const [theme, setTheme] = useState(false);
    const toggleSwitch=()=>{
        setTheme(!theme)
    }
    
  return (
    <View style={style.containerFive}>
    <Text style={style.text}>Dark mode</Text>
 
    <Switch  
     value={theme }
     onValueChange={toggleSwitch}
     style={{marginTop:-25}}
    />
    </View>
  )
}

const style = StyleSheet.create({
    containerFive:{
        height:60,
        width:280,
        borderRadius:20,
        marginTop:10,
        backgroundColor:"#3B3B3C",
    },
    text:{
        color:"white",
        fontSize:20,
        marginLeft:20,
        marginTop:20
    }
})