// import React, { useState } from 'react';
// import {
//     StyleSheet,
//     SafeAreaView,
//     View,
//     ScrollView,
//     Text,
//     TouchableOpacity,
//     Switch,
//     Image,
// } from 'react-native';
// import { Header } from 'react-native-elements';
// import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
// import FeatherIcon from 'react-native-vector-icons/Feather';

// export default function HelpAndSupport() {

//     const SECTIONS = [
//         {
//             header: 'Preferences',
//             items: [
//                 { id: 'language', icon: 'global', label: 'language', type: 'select' },
//                 { id: 'darkmode', icon: 'moon', label: 'Dark Mode', type: 'toggle' },
//                 { id: 'wifi', icon: 'wifi', label: 'Use-Wi-fi', type: 'toggle' },
//             ],

//         },
//         {
//             header: 'Help',
//             items: [
//                 { id: 'bug', icon: 'flag', label: 'Report blog', type: 'link' },
//                 { id: 'contact', icon: 'mail', label: 'Contact Us', type: 'link' }
//             ],

//         },
//         {
//             header: 'content',
//             Items: [
//                 { id: 'save', icon: 'save', label: 'Saved', type: 'link' },
//                 { id: 'download', icon: 'download', label: 'Downloads', type: 'link' },
//             ],
//         },

//     ];

//     const [form,setFrom]=useState({
//         langauge:'English',
//         darkMode:'true',
//         wifi:false,
//     })

//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6' }}>

//             <ScrollView contentContainerStyle={styles.container}>
//                 <View style={styles.header}>
//                     <Text style={styles.title}>HelpAndSupport</Text>
//                     <Text style={styles.subtitle}>Update</Text>

//                 </View>
//                 {SECTIONS.map(({ header, items }) => (
//                     <View style={styles.section} key={header}>
//                         <View style={styles.sectionHeader}>
//                             <Text style={styles.sectionHeaderText}>{header}</Text>
//                         </View>
//                         <View style={styles.sectionBody}>
//                             {items.map(({label,id,type,icon})=>(
//                                 <View style={[styles.rowWrapper,index ===0 && {borderTopWidth:0}]} key={id}>
//                                     <TouchableOpacity onPress={()=>{

//                                     }}>
//                                         <View style={styles.row}>
//                                    <FeatherIcon name={icon} color='#616161' size={22} style={{marginRight:12}}/>
//                                    <Text style={styles.rowlabel}>{label}</Text>
//                                    <View style={styles.rowlabel}/>
//                                    {type === 'select' && (
//                                     <Text style={styles.rowValue}>{form[id]}</Text>
//                                    )}
//                                    {type === 'toggle' &&(
//                                     <Switch value={form[id]} onValueChange={(value)=>setFrom({...form,[id]:value})}/>
//                                    )}
//                                    {['select','link'].includes(type)&&(
//                                     <FeatherIcon
//                                     name='chevron-right'
//                                     color='#ababab'
//                                     size={22}/>
//                                    )}
//                                     </View>
//                                     </TouchableOpacity>
//                                 </View>
//                             ))}

//                         </View>
//                     </View>
//                 ))}
//             </ScrollView>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         paddingVertical: 24,
//     },
//     header: {
//         paddingHorizontal: 24,
//         marginBottom: 12,
//     },
//     title: {
//         fontSize: 32,
//         fontWeight: '700',
//         color: '#1d1d1d',
//         marginBottom: 6,
//     },
//     subtitle: {
//         fontSize: 15,
//         fontWeight: '500',
//         color: '#929292'
//     },
//     section: {
//         paddingTop: 12
//     },
//     sectionHeader: {
//         paddingHorizontal: 24,
//         paddingVertical: 8,
//     },
//     sectionHeaderText: {
//         fontSize: 14,
//         fontWeight: '600',
//         color: '#a7a7a7',
//         textTransform: 'uppercase',
//         letterSpacing: 1.2,
//     },
//     rowWrapper:{
//         paddingLeft:24,
//         borderTopWidth:1,
//         borderColor:'#e3e3e3',
//         backgroundColor:'#fff'
//     },
//     row:{
//         height:50,
//         flexDirection:'row',
//         alignItems:'center',
//         justifyContent:'flex-start',
//         paddingRight:24,
//     },
//     rowlabel:{
//         fontSize:17,
//         fontWeight:'500',
//         color:'#000'
//     },
//     rowSpacer:{
//         flex:1,
//     },
//     rowValue:{
//         fontSize:17,
//         color:'#616161',
//         marginRight:4,
//     }
// })

import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Switch,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function HelpAndSupport() {

    const SECTIONS = [
        {
            header: 'Preferences',
            items: [
                { id: 'language', icon: 'globe', label: 'Language', type: 'select' },
                { id: 'darkmode', icon: 'moon', label: 'Dark Mode', type: 'toggle' },
                { id: 'wifi', icon: 'wifi', label: 'Use Wi-Fi', type: 'toggle' },
            ],
        },
        {
            header: 'Help',
            items: [
                { id: 'bug', icon: 'flag', label: 'Report Bug', type: 'link' },
                { id: 'contact', icon: 'mail', label: 'Contact Us', type: 'link' }
            ],
        },
        {
            header: 'Content',
            items: [
                { id: 'save', icon: 'save', label: 'Saved', type: 'link' },
                { id: 'download', icon: 'download', label: 'Downloads', type: 'link' },
            ],
        },
    ];

    const [form, setForm] = useState({
        language: 'English',
        darkmode: true,
        wifi: false,
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Help And Support</Text>
                    <Text style={styles.subtitle}>Update your Preferences here </Text>
                </View>
                {SECTIONS.map(({ header, items }) => (
                    <View style={styles.section} key={header}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionHeaderText}>{header}</Text>
                        </View>
                        <View style={styles.sectionBody}>
                            {items.map(({ label, id, type, icon }) => (
                                <TouchableOpacity key={id} onPress={() => {
                                    // Action on press
                                }}>
                                    <View style={styles.row}>
                                        <FeatherIcon name={icon} color='#616161' size={22} style={{ marginRight: 12 }} />
                                        <Text style={styles.rowLabel}>{label}</Text>
                                        {type === 'select' && (
                                            <Text style={styles.rowValue}>{form[id]}</Text>
                                        )}
                                        {type === 'toggle' && (
                                            <Switch
                                                value={form[id]}
                                                onValueChange={(value) => setForm({ ...form, [id]: value })}
                                            />
                                        )}
                                        {['select', 'link'].includes(type) && (
                                            <FeatherIcon
                                                name='chevron-right'
                                                color='#ababab'
                                                size={22}
                                            />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
    },
    header: {
        paddingHorizontal: 24,
        marginBottom: 12,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1d1d1d',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#929292',
    },
    section: {
        paddingTop: 12,
    },
    sectionHeader: {
        paddingHorizontal: 24,
        paddingVertical: 8,
    },
    sectionHeaderText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#a7a7a7',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    sectionBody: {
        backgroundColor: '#ffffff',
    },
    row: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderColor: '#e3e3e3',
    },
    rowLabel: {
        fontSize: 17,
        fontWeight: '500',
        color: '#000',
        flex: 1,
    },
    rowValue: {
        fontSize: 17,
        color: '#616161',
        marginRight: 4,
    },
});
