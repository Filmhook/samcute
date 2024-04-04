import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import ImagePicker from "react-native-image-crop-picker"

export default function Profilepic_edit_page() {
  // -------- Profile hide and show  ---------------
  const [profilevisible, setProfilevisible] = useState(false)
  const profile_pic_dropdown = () => {
    setProfilevisible(!profilevisible)

  }

  // -------- Profile state hook ---------------
  const [profilepic, setProfilepic] = useState();

  const edit_profile_pic = async () => {
    await ImagePicker.openPicker({
      cropping: true
    }).then(image => {
      console.log(image.path)
      setProfilepic(image.path)
    })
  }
  return (
    <>
      <View >
        <TouchableOpacity
          onPress={profile_pic_dropdown}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold", fontWeight: "bold", color: "#323232", marginLeft: 25, marginTop: 20 }}>Profile picture</Text>
        </TouchableOpacity>

        {profilevisible && (
          <TouchableOpacity
            onPress={edit_profile_pic}
            style={{
              width: 150,
              height: 150,
              backgroundColor: "#C9CCD1",
              borderRadius: 80,
              justifyContent: "center",
              marginTop: 20,
              marginLeft: 100
            }}>
            <Image source={{ uri: profilepic }} style={{ width: "100%", height: "100%" }} />
          </TouchableOpacity>
        )}

        <View style={style.hr_tag} />
      </View>
    </>
  )
}
const style = StyleSheet.create({
  hr_tag: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginVertical: 15,
    marginLeft: 10,
    marginRight: 10
  }
})