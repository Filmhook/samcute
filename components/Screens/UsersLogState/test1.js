import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export default function IndustryOne() {
    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const [selectedPlatform, setSelectedPlatform] = useState([]);
    const [selectedProfession, setSelectedProfession] = useState([]);
    const [selectedSubProfession, setSelectedSubProfession] = useState([]);

    const navigation = useNavigation();

    const dataIndustries = [
        { label: 'TOLLYWOOD', value: 'TOLLYWOOD' },
        { label: 'BHOJIWOOD', value: 'BHOJIWOOD' },
        { label: 'CHHOLLYWOOD', value: 'CHHOLLYWOOD' },
    ];

    const dataPlatforms = [
        { label: 'MOVIES', value: 'MOVIES' },
        { label: 'TV DRAMA SHOWS', value: 'TV DRAMA SHOWS' },
        { label: 'WEB SERIES', value: 'WEB SERIES' },
    ];

    const dataProfessions = [
        { label: 'PRODUCER', value: 'PRODUCER' },
        { label: 'DIRECTOR', value: 'DIRECTOR' },
        { label: 'CAMERAMAN', value: 'CAMERAMAN' },
        { label: 'PRO', value: 'PRO' },
        { label: 'CASTING DIRECTOR', value: 'CASTING DIRECTOR' },
        { label: 'ACTOR', value: 'ACTOR' },
    ];

    const dataSubProfessions = [
        { label: 'CASHIER', value: 'CASHIER' },
        { label: 'TALLY ACCOUNTANT', value: 'TALLY ACCOUNTANT' },
        { label: 'STUNT MASTER', value: 'STUNT MASTER' },
        { label: 'FIGHT MASTER', value: 'FIGHT MASTER' },
    ];

    const handleNavigate = () => {
        navigation.navigate("IndustryTwo", {
            selectedIndustries,
            selectedProfession,
            selectedSubProfession,
            selectedPlatform,
        });
    };

    const [isOpenProfSub, setIsOpenProfSub] = useState(false);
    const [isOpenPlatform, setIsOpenPlatform] = useState(false);
    const [isOpenProf, setIsOpenProf] = useState(false);


    const [professionSub, setProfessionSub] = useState([]);

    const dataSub = [
        {
            label: 'CASHIER', value: 'CASHIER',
        },
        { label: 'TALLY ACCOUNTANT', value: 'TALLY ACCOUNTANT' },
        { label: 'STUNT MASTER', value: 'STUNT MASTER' },
        { label: 'FIGHT MASTER', value: 'FIGHT MASTER' },
        { label: 'BOXING TRAINER', value: 'BOXING TRAINER' },
        { label: 'FITNESS MASTER', value: 'FITNESS MASTER' },
        { label: 'ACTION DIRECTOR', value: 'ACTION DIRECTOR' },
        { label: 'STUNT PERFORMER', value: 'STUNT PERFORMER' },
        { label: 'STUNT MAN', value: 'STUNT MAN' },
        { label: 'HERO', value: 'HERO' },
        { label: 'HEROINE', value: 'HEROINE' },
        { label: 'CHARACTER ARTIST', value: 'CHARACTER ARTIST' },
        { label: 'SUPPORTING ARTIST', value: 'SUPPORTING ARTIST' },
        { label: 'JUNIOR ARTIST CLASS', value: 'JUNIOR ARTIST CLASS' },
        { label: 'ANIMATOR MAKER', value: 'ANIMATOR MAKER' },
        { label: 'ANIMATION VOICE', value: 'ANIMATION VOICE' },
        { label: 'ART DIRECTOR', value: 'ART DIRECTOR' },
        { label: 'ASSISTANT ART DIRECTOR', value: 'ASSISTANT ART DIRECTOR' },
        { label: 'ASSOCIATE ART DIRECTOR', value: 'ASSOCIATE ART DIRECTOR' },
        { label: 'DOP', value: 'DOP' },
        { label: 'ASSISTANT DOP', value: 'ASSISTANT DOP' },
        { label: 'CAMERAMAN', value: 'CAMERAMAN' },
        { label: 'ASSISTANT CAMERAMAN', value: 'ASSISTANT CAMERAMAN' },
        { label: 'ASSOCIATE CAMERAMAN', value: 'ASSOCIATE CAMERAMAN' },
        { label: 'FOCUS PULLER', value: 'FOCUS PULLER' },
        { label: 'SECOND UNIT CAMERAMAN', value: 'SECOND UNIT CAMERAMAN' },
        { label: 'DRONE PILOT', value: 'DRONE PILOT' },
        { label: 'ASSISTANT DRONE PILOT', value: 'ASSISTANT DRONE PILOT' },
        { label: 'CELEBRITY MANAGER', value: 'CELEBRITY MANAGER' },
        { label: 'PRO', value: 'PRO' },
        { label: 'DANCER MASTER', value: 'DANCER MASTER' },
        { label: 'BACKGROUND DANCER', value: 'BACKGROUND DANCER' },
        { label: 'COSTUME DESIGNER', value: 'COSTUME DESIGNER' },
        { label: 'ASSISTANT COSTUME DESIGNER', value: 'ASSISTANT COSTUME DESIGNER' },
        { label: 'ASSOCIATE COSTUME DESIGNER', value: 'ASSOCIATE COSTUME DESIGNER' },
        { label: 'CRANE OPERATOR', value: 'CRANE OPERATOR' },
        { label: 'HELPER', value: 'HELPER' },
        { label: 'DIGITAL ARTIST', value: 'DIGITAL ARTIST' },
        { label: 'DIGITAL CREATOR', value: 'DIGITAL CREATOR' },
        { label: 'DIGITAL IMAGINER TECHNICIAN', value: 'DIGITAL IMAGINER TECHNICIAN' },
        { label: 'DIRECTOR', value: 'DIRECTOR' },
        { label: 'CO-DIRECTOR', value: 'CO-DIRECTOR' },
        { label: 'ASSISTANT DIRECTOR', value: 'ASSISTANT DIRECTOR' },
        { label: 'ASSOCIATE DIRECTOR', value: 'ASSOCIATE DIRECTOR' },
        { label: 'SECOND UNIT DIRECTOR', value: 'SECOND UNIT DIRECTOR' },
        { label: 'DUBBING ARTIST', value: 'DUBBING ARTIST' },
        { label: 'DUBBING INCHARGE', value: 'DUBBING INCHARGE' },
        { label: 'EDITOR', value: 'EDITOR' },
        { label: 'ASSISTANT EDITOR', value: 'ASSISTANT EDITOR' },
        { label: 'DTS COLLECTOR', value: 'DTS COLLECTOR' },
        { label: 'SET BOYS', value: 'SET BOYS' },
        { label: 'LIGHTING TECHNICAL DIRECTOR', value: 'LIGHTING TECHNICAL DIRECTOR' },
        { label: 'MAKEUP ARTIST', value: 'MAKEUP ARTIST' },
        { label: 'ASSISTANT MAKEUP ARTIST', value: 'ASSISTANT MAKEUP ARTIST' },
        { label: 'HAIR STYLIST', value: 'HAIR STYLIST' },
        { label: 'ASSISTANT HAIR STYLIST', value: 'ASSISTANT HAIR STYLIST' },
        { label: 'MARKETING TECHNOLOGIST', value: 'MARKETING TECHNOLOGIST' },
        { label: 'MUSIC DIRECTOR', value: 'MUSIC DIRECTOR' },
        { label: 'ASSISTANT MUSIC DIRECTOR', value: 'ASSISTANT MUSIC DIRECTOR' },
        { label: 'LYRICS WRITER', value: 'LYRICS WRITER' },
        { label: 'MUSIC COMPOSER', value: 'MUSIC COMPOSER' },
        { label: 'MUSIC EDITOR', value: 'MUSIC EDITOR' },
        { label: 'ASSISTANT MUSIC EDITOR', value: 'ASSISTANT MUSIC EDITOR' },
        { label: 'SINGER', value: 'SINGER' },

        { label: 'TRACK SINGER', value: 'TRACK SINGER' },
        { label: 'PRODUCER', value: 'PRODUCER' },
        { label: 'CO-PRODUCER', value: 'CO-PRODUCER' },
        { label: 'FINANCIER', value: 'FINANCIER' },
        { label: 'ASSOCIATE PRODUCER', value: 'ASSOCIATE PRODUCER' },
        { label: 'EXECUTIVE PRODUCER', value: 'EXECUTIVE PRODUCER' },
        { label: 'PRODUCTION MANAGER', value: 'PRODUCTION MANAGER' },
        { label: 'ASSISTANT PRODUCTION MANAGER', value: 'ASSISTANT PRODUCTION MANAGER' },
        { label: 'ASSISTANT MUSIC EDITOR', value: 'ASSISTANT MUSIC EDITOR' },
        { label: 'PRODUCTION UNIT MANAGER', value: 'PRODUCTION UNIT MANAGER' },

        { label: 'MANAGER', value: 'MANAGER' },

        { label: 'ASSISTANT MANAGER', value: 'ASSISTANT MANAGER' },
        { label: 'PRODUCTION ASSISTANT', value: 'PRODUCTION ASSISTANT' },
        { label: 'PROSTHETIC MAKER', value: 'PROSTHETIC MAKER' },
        { label: 'PUBLICITY DESIGNER MAKER', value: 'PUBLICITY DESIGNER MAKER' },
        { label: 'SOUND EFFECT ENGG', value: 'SOUND EFFECT ENGG' },
        { label: 'SPECIAL EFFECTS MAKER', value: 'SPECIAL EFFECTS MAKER' },
        { label: 'STILL PHOTOGRAPHER', value: 'STILL PHOTOGRAPHER' },
        { label: 'ASSISTANT STILL PHOTOGRAPHER', value: 'ASSISTANT STILL PHOTOGRAPHER' },
        { label: 'STILL PHOTOGRAPHER BEHIND SCENES', value: 'STILL PHOTOGRAPHER BEHIND SCENES' },

        { label: 'VFX EDITOR', value: 'VFX EDITOR' },
        { label: 'VFX CREATOR', value: 'VFX CREATOR' },
        { label: 'COLOURIST', value: 'COLOURIST' },
        { label: 'WRITER', value: 'WRITER' },
        { label: 'SCREEN PLAY WRITER', value: 'SCREEN PLAY WRITER' },
        { label: 'DIALOG WRITER', value: 'DIALOG WRITER' },
        { label: 'STORY WRITER', value: 'STORY WRITER' },
        { label: 'SCRIPT ASSOCIATE', value: 'SCRIPT ASSOCIATE' },



    ];
    const [isOpenIndustry, setisOpenIndustry] = useState(false)

    return (
        <View style={styles.container}>
            <ScrollView>
                {/* <DropDownPicker
                    items={dataIndustries}
                    multiple={true}
                    placeholder="Select your Industries"
                    onChangeItem={items => setSelectedIndustries(items)}
                    open={selectedIndustries.length > 0}
                    setOpen={setOpenIndustries}
                    value={selectedIndustries}
                    setValue={setSelectedIndustries}
                /> */}
                <View style={{ margin: 40 }}>
                    <DropDownPicker items={dataIndustries} open={isOpenIndustry} setOpen={() => setisOpenIndustry(!isOpenIndustry)} value={selectedIndustries}
                        setValue={(val) => setSelectedIndustries(val)}
                        maxHeight={responsiveHeight(20)}
                        // autoScroll
                        placeholder="List is your Industry"
                        placeholderStyle={{ fontSize: responsiveFontSize(2), color: 'black' }}
                        showTickIcon={true}
                        showArrowIcon={true}
                        dropDownContainerStyle={{ backgroundColor: 'gray', width: responsiveWidth(86), marginBottom: responsiveHeight(3) }}
                        dropDownDirection="BOTTOM"
                        searchable={true}
                        searchPlaceholderTextColor="search"
                        theme="LIGHT"
                        multiple={true}
                        mode="BADGE"
                        badgeColors={['#00d4ff']}
                        badgeDotColors={['green', 'red', 'blue', 'yellow']}
                        badgeTextStyle={'black'}
                        style={{
                            marginTop: responsiveHeight(2),
                            marginBottom: responsiveHeight(3),
                            borderWidth: responsiveWidth(0.5),
                            paddingHorizontal: responsiveWidth(2),
                            borderRadius: responsiveWidth(2),
                            height: responsiveHeight(8),
                            width: responsiveWidth(86),
                            //left: responsiveWidth(3),


                            zIndex: 2
                        }}

                    />
                </View>

                {/* <DropDownPicker
                    items={dataPlatforms}
                    multiple={true}
                    placeholder="Choose your Platforms"
                    onChangeItem={items => setSelectedPlatform(items)}
                    open={selectedPlatform.length > 0}
                    setOpen={() => { }}
                    value={selectedPlatform}
                    setValue={() => { }}
                /> */}
                <View style={{ margin: 40 }}>
                    <DropDownPicker items={dataPlatforms} open={isOpenPlatform} setOpen={() => setIsOpenPlatform(!isOpenPlatform)} value={selectedPlatform}
                        setValue={(val) => setSelectedPlatform(val)}
                        maxHeight={responsiveHeight(20)}
                        // autoScroll
                        placeholder="List is your platform"
                        placeholderStyle={{ fontSize: responsiveFontSize(2), color: 'black' }}
                        showTickIcon={true}
                        showArrowIcon={true}
                        dropDownContainerStyle={{ backgroundColor: 'gray', width: responsiveWidth(86), marginBottom: responsiveHeight(3) }}
                        dropDownDirection="TOP"
                        searchable={true}
                        searchPlaceholderTextColor="search"
                        theme="LIGHT"
                        multiple={true}
                        mode="BADGE"
                        badgeColors={['#00d4ff']}
                        badgeDotColors={['green', 'red', 'blue', 'yellow']}
                        badgeTextStyle={'black'}
                        style={{
                            marginTop: responsiveHeight(2),
                            marginBottom: responsiveHeight(3),
                            borderWidth: responsiveWidth(0.5),
                            paddingHorizontal: responsiveWidth(2),
                            borderRadius: responsiveWidth(2),
                            height: responsiveHeight(8),
                            width: responsiveWidth(86),
                            //left: responsiveWidth(3),


                            zIndex: 2
                        }}

                    />
                </View>

                {/* <DropDownPicker
                    items={dataProfessions}
                    multiple={true}
                    placeholder="What is your Profession?"
                    onChangeItem={items => setSelectedProfession(items)}
                    open={selectedProfession.length > 0}
                    setOpen={() => { }}
                    value={selectedProfession}
                    setValue={() => { }}
                /> */}

                <View style={{}}>
                    <DropDownPicker items={dataProfessions} open={isOpenProf} setOpen={() => setIsOpenProf(!isOpenProf)} value={selectedProfession}
                        setValue={(val) => setSelectedProfession(val)}
                        maxHeight={responsiveHeight(20)}
                        // autoScroll
                        placeholder="List is your Profession"
                        placeholderStyle={{ fontSize: responsiveFontSize(2), color: 'black' }}
                        showTickIcon={true}
                        showArrowIcon={true}
                        dropDownContainerStyle={{ backgroundColor: 'gray', width: responsiveWidth(86), marginBottom: responsiveHeight(3) }}
                        dropDownDirection="TOP"
                        searchable={true}
                        searchPlaceholderTextColor="search"
                        theme="LIGHT"
                        multiple={true}
                        mode="BADGE"
                        badgeColors={['#00d4ff']}
                        badgeDotColors={['green', 'red', 'blue', 'yellow']}
                        badgeTextStyle={'black'}
                        style={{
                            marginTop: responsiveHeight(2),
                            marginBottom: responsiveHeight(3),
                            borderWidth: responsiveWidth(0.5),
                            paddingHorizontal: responsiveWidth(2),
                            borderRadius: responsiveWidth(2),
                            height: responsiveHeight(8),
                            width: responsiveWidth(86),
                            //left: responsiveWidth(3),


                            zIndex: 2
                        }}

                    />
                </View>

                {/* <DropDownPicker
                    items={dataSubProfessions}
                    multiple={true}
                    placeholder="List is your Sub Profession"
                    onChangeItem={items => setSelectedSubProfession(items)}
                    open={selectedSubProfession.length > 0}
                    setOpen={() => { }}
                    value={selectedSubProfession}
                    setValue={() => { }}
                /> */}


                <View style={{}}>
                    <DropDownPicker items={dataSubProfessions} open={isOpenProfSub} setOpen={() => setIsOpenProfSub(!isOpenProfSub)} value={selectedSubProfession}
                        setValue={(val) => setSelectedSubProfession(val)}
                        maxHeight={responsiveHeight(20)}
                        // autoScroll
                        placeholder="List is your Sub Profession"
                        placeholderStyle={{ fontSize: responsiveFontSize(2), color: 'black' }}
                        showTickIcon={true}
                        showArrowIcon={true}
                        dropDownContainerStyle={{ backgroundColor: 'gray', width: responsiveWidth(86), marginBottom: responsiveHeight(3) }}
                        dropDownDirection="TOP"
                        searchable={true}
                        searchPlaceholderTextColor="search"
                        theme="LIGHT"
                        multiple={true}
                        mode="BADGE"
                        badgeColors={['#00d4ff']}
                        badgeDotColors={['green', 'red', 'blue', 'yellow']}
                        badgeTextStyle={'black'}
                        style={{
                            marginTop: responsiveHeight(2),
                            marginBottom: responsiveHeight(3),
                            borderWidth: responsiveWidth(0.5),
                            paddingHorizontal: responsiveWidth(2),
                            borderRadius: responsiveWidth(2),
                            height: responsiveHeight(8),
                            width: responsiveWidth(86),
                            //left: responsiveWidth(3),


                            zIndex: 2
                        }}

                    />
                </View>

                <Button title="Next" onPress={handleNavigate} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        // padding: responsiveWidth(3),
        backgroundColor: '#f5f5f5',

        width: '100%',
        height: '100%'
    },

    // inputContainer: {
    //   flexDirection: 'row',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   height: responsiveHeight(8.4),
    //   width: responsiveWidth(86.7),
    //   margin: responsiveWidth(1),
    //   color: 'black',
    //   resizeMode: 'contain'

    // },
    boxContent2: {
        height: responsiveHeight(8.3),
        width: responsiveWidth(86),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: responsiveHeight(2),
        borderRadius: responsiveWidth(3.2),
        // borderWidth: responsiveWidth(0.3),
        color: 'black',
        margin: 1,



    },
    picker: {
        width: responsiveWidth(87),
        borderRadius: 8,
        height: responsiveHeight(7),
        borderCurve: responsiveWidth(2),

        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(2)
        // backgroundColor:'red',

    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: responsiveHeight(8.4),
        width: responsiveWidth(86.7),
        margin: responsiveWidth(1),
        color: 'black',
        resizeMode: 'contain',
        zIndex: -1

    },
    formContainer: {
        width: '100%',

        // padding: responsiveWidth(3),
        backgroundColor: '#f5f5f5',
        borderRadius: responsiveWidth(5),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(3),


    },
    countryPickerContainer: {
        flexDirection: 'row',
        // justifyContent:'center',
        alignItems: 'center',
        marginBottom: responsiveHeight(2),

        borderWidth: responsiveWidth(0.5),
        paddingHorizontal: responsiveWidth(4),
        borderRadius: responsiveWidth(2),
        height: responsiveHeight(8.2),
        width: responsiveWidth(86),
        borderColor: 'black',
        margin: responsiveWidth(1)


    },
    selectContainer: {
        marginBottom: 20,
    },

    input: {
        height: responsiveHeight(4),
        borderColor: 'black',
        marginBottom: responsiveHeight(2),
        width: '100%',
        fontSize: responsiveFontSize(2),
        top: responsiveHeight(1),
        borderWidth: 1

    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'black'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',

    },
    backButton: {
        backgroundColor: 'black',
        // padding: responsiveWidth(2.5),
        borderRadius: responsiveWidth(2),
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'center',
        height: responsiveHeight(6),
        width: responsiveWidth(30),
        borderWidth: responsiveWidth(0.6),
        borderColor: 'black'
    },
    nextButton: {
        backgroundColor: '#616161',
        // padding: responsiveWidth(2.5),
        borderRadius: responsiveWidth(2),
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'center',
        height: responsiveHeight(6),
        width: responsiveWidth(30),
        //bottom: responsiveHeight(1.5)
        borderWidth: responsiveWidth(0.6),
        borderColor: 'black'
    },
});