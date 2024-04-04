import React from 'react'
import { View } from 'react-native'
import Camera from './Camera'
import Voicecall from './VoiceCall/VoiceCall'
import Videocall from './VideoCall/VideoCall'
import Imgpicker from './ImagePicker/ImagePicker'
import Location from './Location/Location'
import Groupcall from './GroupCall/GroupCall'
import Documentpicker from './DocPicker/DocPicker'
import Market from './Market/Market'
import Settings from './Settings/Settings'
// import Camera from './camera'
// import Voicecall from './voicecall/voicecall'
// import Videocall from './videocall/videocall'
// import Location from './location/location'
// import Groupcall from './groupcall/groupcall'
// import Market from './market/market'
// import Settings from './settings/settings'
// import Imgpicker from './imagepicker/imagepicker'
// import Documentpicker from './docpicker/docpicker'

export default function Iconmodalsroot() {
  return (
    <>
     <View> 
        <Camera/>
        <Voicecall />
        <Videocall/>
        <Imgpicker />
        <Location />
        <Groupcall />
        <Documentpicker />
        <Market />
        <Settings />
     </View>
    </>
  )
}