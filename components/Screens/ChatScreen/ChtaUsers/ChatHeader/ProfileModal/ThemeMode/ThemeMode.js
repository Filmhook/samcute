import React,{useState} from 'react'
import { Button, StyleSheet, Switch, Text, TouchableOpacity, View,Appearance } from 'react-native'

export default function Thememode() {

    const [theme, setTheme] = useState('light');

    // const toggleSwitch = () => setTheme(previousState => !previousState);
    // const colorScheme = Appearance.getColorScheme();
    // if (colorScheme === 'dark') {
    //     setTheme(true); // true means dark
    //  }else{
    //     setTheme(false); // false means light
    //  }

  return (
   <> 
   <View style={style.container}>
   <Text style={style.text}>Dark mode</Text>
   
   {/* <Switch  
    value={theme === 'dark'}
    onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
    // onValueChange={toggleSwitch}
    // value={theme}
    style={{marginTop:-25}}
   /> */}
   </View>
   </>
  )
}

const style = StyleSheet.create({
    container:{
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