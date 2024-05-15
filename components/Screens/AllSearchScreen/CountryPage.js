import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, ScrollView, LogBox } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';



const CountryPage = () => {


  const navigation = useNavigation();
  const [search, setSearch] = useState('')

  const countryPage = [
    {
      id: '1',
      country: 'CINEMA OF INDIA',
      // countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_India.png')
      countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Compress/FH_India.png')


    },
  //   {
  //     id: '2',
  //     country: 'CINEMA OF AFGHANISTAN',
  //     //countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Afghanistan.png'),
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Compress/FH_Afghanistan.png'),

  //   },
  //   {
  //     id: '3',
  //     country: 'CINEMA OF ALBANIA',
  //    // countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Albania.png'),
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Compress/FH_Albania.png'),

  //   },
  //   {
  //     id: '4',
  //     country: 'CINEMA OF ALGERIA',
  //     //countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts//country/FH_Algeria.png'),
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts//country/Compress/FH_Algeria.png'),

  //   },
  //   {
  //     id: '5',
  //     country: 'CINEMA OF ANDORRA',
  //     //countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Andorra.png'),
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Compress/FH_Andorra.png'),

  //   },
  //   {
  //     id: '6',
  //     country: 'CINEMA OF ANGOLA',
  //  //   countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Angola.png'),
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Compress/FH_Angola.png'),

  //   },
  //   {
  //     id: '7',
  //     country: 'CINEMA OF ANTIGUA & BARBUDA',
  //    // countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Antigua_and_Barbuda.png'),
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Compress/FH_Antigua_and_Barbuda.png'),

  //   },
  //   {
  //     id: '8',
  //     country: 'CINEMA OF ARGENTINA',
  //     //countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Argentina.png'),
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Compress/FH_Argentina.png'),

  //   },
  //   {
  //     id: '9',
  //     country: 'CINEMA OF ARMENIA',
  //   //  countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Armenia.png'),
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Compress/FH_Armenia.png')

  //   },
  //   {
  //     id: '10',
  //     country: 'CINEMA OF AUSTRALIA',
  //  //   countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Australia.png'),
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Compress/FH_Australia.png'),

  //   },
  //   {
  //     id: '11',
  //     country: 'CINEMA OF AUSTRIA',
  //  //   countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Austria.png'),
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Compress/FH_Austria.png'),

  //   },
  //   {
  //     id: '12',
  //     country: 'CINEMA OF AZERBAIJAN',
  //    // countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Azerbaijan.png'),
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Compress/FH_Azerbaijan.png'),

  //   },
  //   {
  //     id: '13',
  //     country: 'CINEMA OF BAHAMAS',
  //    // countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Bahamas.png'),
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Compress/FH_Bahamas.png'),

  //   },
  //   {
  //     id: '14',
  //     country: 'CINEMA OF BAHRAIN',
  //     //countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Bahrain.png'),
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Compress/FH_Bahrain.png'),

  //   },
  //   {
  //     id: '15',
  //     country: 'CINEMA OF BANGLADESH',
  //    // countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Bangladesh.png'),
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Compress/FH_Bangladesh.png'),

  //   },
  //   {
  //     id: '16',
  //     country: 'CINEMA OF BARBADOS',
  //    // countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Barbados.png'),
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Compress/FH_Barbados.png'),

  //   },
  //   {
  //     id: '17',
  //     country: 'CINEMA OF BELARUS',
  //    // countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Belarus.png'),
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Compress/FH_Belarus.png'),

  //   },
  //   {
  //     id: '18',
  //     country: 'CINEMA OF BELGIUM',
  //    // countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Belgium.png'),
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Compress/FH_Belgium.png'),

  //   },
  //   {
  //     id: '19',
  //     country: 'CINEMA OF BELIZE',
  //    // countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Belize.png'),
  //   },
  //   {
  //     id: '20',
  //     country: 'CINEMA OF BENIN',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Benin.png'),
  //   },
  //   {
  //     id: '21',
  //     country: 'CINEMA OF BHUTAN',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Bhutan.png'),
  //   },
  //   {
  //     id: '22',
  //     country: 'CINEMA OF BOLIVIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Bolivia.png'),
  //   },
  //   {
  //     id: '23',
  //     country: 'CINEMA OF BOSNIA & HERZEGOVINA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Bosnia_and_Herzegovina.png'),
  //   },
  //   {
  //     id: '24',
  //     country: 'CINEMA OF BOTSWANA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Botswana.png'),
  //   },
  //   {
  //     id: '25',
  //     country: 'CINEMA OF BRAZIL',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Brazil.png'),
  //   },
  //   {
  //     id: '26',
  //     country: 'CINEMA OF BRUNEI',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Brunei.png'),
  //   },
  //   {
  //     id: '27',
  //     country: 'CINEMA OF BULGARIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Bulgaria.png'),
  //   },

  //   {
  //     id: '28',
  //     country: 'CINEMA OF BURKINA FASO',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Burkina_Faso.png'),
  //   },
  //   {
  //     id: '29',
  //     country: 'CINEMA OF BURUNDI',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Burundi.png'),
  //   },
  //   {
  //     id: '30',
  //     country: "CINEMA OF CÔTE D'IVOIRE",
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Côte_d_Ivoire.png'),
  //   },
  //   {
  //     id: '31',
  //     country: 'CINEMA OF CAPE VERDE',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Cape_Verde.png'),
  //   },
  //   {
  //     id: '32',
  //     country: 'CINEMA OF CAMBODIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Cambodia.png'),
  //   },
  //   {
  //     id: '33',
  //     country: 'CINEMA OF CAMEROON',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Cameroon.png'),
  //   },
  //   {
  //     id: '34',
  //     country: 'CINEMA OF CANADA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Canada.png'),
  //   },
  //   {
  //     id: '35',
  //     country: 'CINEMA OF CENTRAL AFRICA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Africa.png'),
  //   },
  //   {
  //     id: '36',
  //     country: 'CINEMA OF CHAD',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Chad.png'),
  //   },
  //   {
  //     id: '37',
  //     country: 'CINEMA OF CHILE',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Chile.png'),
  //   },
  //   {
  //     id: '38',
  //     country: 'CINEMA OF CHINA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_China.png'),
  //   },
  //   {
  //     id: '39',
  //     country: 'CINEMA OF COLOMBIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Colombia.png'),
  //   },
  //   {
  //     id: '40',
  //     country: 'CINEMA OF COMOROS',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Comoros.png'),
  //   },
  //   {
  //     id: '41',
  //     country: 'CINEMA OF CONGO',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Congo.png'),
  //   },

  //   {
  //     id: '42',
  //     country: 'CINEMA OF COSTA RICA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Costa_Rica.png'),

  //   },
  //   {
  //     id: '43',
  //     country: 'CINEMA OF CROATIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Croatia.png'),
  //   },
  //   {
  //     id: '44',
  //     country: 'CINEMA OF CUBA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Cuba.png'),
  //   },
  //   {
  //     id: '45',
  //     country: 'CINEMA OF CYPRUS',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Cyprus.png'),
  //   },
  //   {
  //     id: '46',
  //     country: 'CINEMA OF CZECHIA(CZECH REPUBLIC)',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Czech_Republic.png'),
  //   },
  //   {
  //     id: '47',
  //     country: 'CINEMA OF CONGO(KINSHASA)',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_CONGO(KINSHASA).png'),
  //   },
  //   {
  //     id: '48',
  //     country: 'CINEMA OF DENMARK',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Denmark.png'),
  //   },
  //   {
  //     id: '49',
  //     country: 'CINEMA OF DJIBOUTI',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Djibouti.png'),
  //   },
  //   {
  //     id: '50',
  //     country: 'CINEMA OF DOMINICA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Dominica.png'),
  //   },
  //   {
  //     id: '51',
  //     country: 'CINEMA OF DOMINICAN REPUBLIC',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Dominican_Republic.png'),
  //   },
  //   {
  //     id: '52',
  //     country: 'CINEMA OF ECUADOR',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Ecuador.png'),
  //   },
  //   {
  //     id: '53',
  //     country: 'CINEMA OF EGYPT',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Egypt.png'),
  //   },
  //   {
  //     id: '54',
  //     country: 'CINEMA OF EL SALVADOR',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_El_Salvador.png'),
  //   },
  //   {
  //     id: '55',
  //     country: 'CINEMA OF EQUATORIAL GUINEA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Equatorial_Guinea.png'),
  //   },


  //   {
  //     id: '56',
  //     country: 'CINEMA OF ERITREA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Eritrea.png'),
  //   },
  //   {
  //     id: '57',
  //     country: 'CINEMA OF ESTONIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Estonia.png'),
  //   },
  //   {
  //     id: '58',
  //     country: 'CINEMA OF ESWATINI',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Eswatini.png'),
  //   },
  //   {
  //     id: '59',
  //     country: 'CINEMA OF ETHIOPIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Ethiopia.png'),
  //   },
  //   {
  //     id: '60',
  //     country: 'CINEMA OF FIJI',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Fiji.png'),
  //   },
  //   {
  //     id: '61',
  //     country: 'CINEMA OF FINLAND',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Finland.png'),
  //   },
  //   {
  //     id: '62',
  //     country: 'CINEMA OF FRANCE',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_France.png'),
  //   },
  //   {
  //     id: '63',
  //     country: 'CINEMA OF GABON',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Gabon.png'),
  //   },
  //   {
  //     id: '64',
  //     country: 'CINEMA OF GAMBIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Gambia.png'),
  //   },
  //   {
  //     id: '65',
  //     country: 'CINEMA OF GEORGIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Georgia.png'),
  //   }, {
  //     id: '66',
  //     country: 'CINEMA OF GERMANY',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Germany.png'),
  //   },
  //   {
  //     id: '67',
  //     country: 'CINEMA OF GHANA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Ghana.png'),
  //   },
  //   {
  //     id: '68',
  //     country: 'CINEMA OF GREECE',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Greece.png'),
  //   },
  //   {
  //     id: '69',
  //     country: 'CINEMA OF GRENADA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Grenada.png'),
  //   },
  //   {
  //     id: '70',
  //     country: 'CINEMA OF GUATEMALA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Guatemala.png'),
  //   },
  //   {
  //     id: '71',
  //     country: 'CINEMA OF GUINEA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Guinea.png'),
  //   },
  //   {
  //     id: '72',
  //     country: 'CINEMA OF GUINEA-BISSAU',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Guinea-Bissau.png'),
  //   },
  //   {
  //     id: '73',
  //     country: 'CINEMA OF GUYANA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Guyana.png'),
  //   },
  //   {
  //     id: '74',
  //     country: 'CINEMA OF HAITI',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Haiti.png'),
  //   },
  //   {
  //     id: '75',
  //     country: 'CINEMA OF HOLY SEE',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/Film-hook-apps-Flag_of_the_Vatican_City.png'),
  //   },
  //   {
  //     id: '76',
  //     country: 'CINEMA OF HONDURAS',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Honduras.png'),
  //   },
  //   {
  //     id: '77',
  //     country: 'CINEMA OF HUNGARY',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Hungary.png'),
  //   },
  //   {
  //     id: '78',
  //     country: 'CINEMA OF ICELAND',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Iceland.png'),
  //   },
  //   {
  //     id: '79',
  //     country: 'CINEMA OF INDONESIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Indonesia.png'),
  //   },
  //   {
  //     id: '80',
  //     country: 'CINEMA OF IRAN',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Iran.png'),
  //   },
  //   {
  //     id: '81',
  //     country: 'CINEMA OF IRAQ',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Iraq.png'),
  //   },
  //   {
  //     id: '82',
  //     country: 'CINEMA OF IRELAND',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Ireland.png'),
  //   },
  //   {
  //     id: '83',
  //     country: 'CINEMA OF ISRAEL',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Israel.png'),
  //   },
  //   {
  //     id: '84',
  //     country: 'CINEMA OF ITALY',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Italy.png'),
  //   },
  //   {
  //     id: '85',
  //     country: 'CINEMA OF JAMAICA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Jamaica.png'),
  //   },
  //   {
  //     id: '86', 
  //     country: 'CINEMA OF JAPAN',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_japan.png'),
  //   },
  //   {
  //     id: '87',
  //     country: 'CINEMA OF JORDAN',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Jordan.png'),
  //   },
  //   {
  //     id: '88',
  //     country: 'CINEMA OF KAZAKHSTAN',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Kazakhstan.png'),
  //   },
  //   {
  //     id: '89',
  //     country: 'CINEMA OF KENYA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_kenya.png'),
  //   },
  //   {
  //     id: '90',
  //     country: 'CINEMA OF KIRIBATI',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Kiribati.png'),
  //   },
  //   {
  //     id: '91',
  //     country: 'CINEMA OF KUWAIT',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Kuwait.png'),
  //   },
  //   {
  //     id: '92',
  //     country: 'CINEMA OF KYRGYSTAN',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Kyrgyzstan.png'),
  //   },
  //   {
  //     id: '93',
  //     country: 'CINEMA OF LAOS',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Laos.png'),
  //   },
  //   {
  //     id: '94',
  //     country: 'CINEMA OF LATVIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Latvia.png'),
  //   },
  //   {
  //     id: '95',
  //     country: 'CINEMA OF LEBANON',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Lebanon.png'),
  //   },
  //   {
  //     id: '96',
  //     country: 'CINEMA OF LESOTHA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Lesotho.png'),
  //   },
  //   {
  //     id: '97',
  //     country: 'CINEMA OF LIBERIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Liberia.png'),
  //   },
  //   {
  //     id: '98',
  //     country: 'CINEMA OF LIBYA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Libya.png'),
  //   },
  //   {
  //     id: '99',
  //     country: 'CINEMA OF LIECHTENSTEIN',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Liechtenstein.png'),
  //   },
  //   {
  //     id: '100',
  //     country: 'CINEMA OF LITHUANIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Lithuania.png'),
  //   },
  //   {
  //     id: '101',
  //     country: 'CINEMA OF LUXEMBOURG',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Luxembourg.png'),
  //   },
  //   {
  //     id: '102',
  //     country: 'CINEMA OF MADAGASCAR',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Madagascar.png'),
  //   },
  //   {
  //     id: '103',
  //     country: 'CINEMA OF MALAWI',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Malawi.png'),
  //   },
  //   {
  //     id: '104',
  //     country: 'CINEMA OF MALASIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Malaysia.png'),
  //   },
  //   {
  //     id: '105',
  //     country: 'CINEMA OF MALDIVES',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Maldives.png'),
  //   },
  //   {
  //     id: '106',
  //     country: 'CINEMA OF MALI',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Mali.png'),
  //   },
  //   {
  //     id: '107',
  //     country: 'CINEMA OF MALTA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Malta.png'),
  //   },
  //   {
  //     id: '108',
  //     country: 'CINEMA OF MARSHALL ISLANDS',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Marshall_Islands.png'),
  //   },
  //   {
  //     id: '109',
  //     country: 'CINEMA OF MAURITANIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Mauritania.png'),
  //   },
  //   {
  //     id: '110',
  //     country: 'CINEMA OF MAURITIUS',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Mauritius.png'),
  //   },
  //   {
  //     id: '111',
  //     country: 'CINEMA OF MEXICO',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Mexico.png'),
  //   },
  //   {
  //     id: '112',
  //     country: 'CINEMA OF MICRONESIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Micronesia.png'),
  //   },
  //   {
  //     id: '113',
  //     country: 'CINEMA OF MOLDOVA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Moldova.png'),
  //   },
  //   {
  //     id: '114',
  //     country: 'CINEMA OF MONACO',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Monaco.png'),
  //   },
  //   {
  //     id: '115',
  //     country: 'CINEMA OF MONGOLIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Mongolia.png'),
  //   },
  //   {
  //     id: '116',
  //     country: 'CINEMA OF MONTENEGRO',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Montenegro.png'),
  //   },
  //   {
  //     id: '117',
  //     country: 'CINEMA OF MOROCCO',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Morocco.png'),
  //   },
  //   {
  //     id: '118',
  //     country: 'CINEMA OF MOZAMBIQUE',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Mozambique.png'),
  //   },



  //   {
  //     id: '119',
  //     country: 'CINEMA OF MYANMAR',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Myanmar.png'),
  //   },
  //   {
  //     id: '120',
  //     country: 'CINEMA OF NAMBIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Namibia.png'),
  //   },

  //   {
  //     id: '121',
  //     country: 'CINEMA OF NAURU',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Nauru.png'),
  //   },
  //   {
  //     id: '122',
  //     country: 'CINEMA OF NEPAL',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Nepal.png'),
  //   },
  //   {
  //     id: '123',

  //     country: 'CINEMA OF NETHERLAND',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Netherlands.png'),
  //   },

  //   {
  //     id: '124',
  //     country: 'CINEMA OF NEW ZEALAND',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_New_Zealand.png'),
  //   },

  //   {
  //     id: '125',
  //     country: 'CINEMA OF NICARAGUA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Nicaragua.png'),
  //   },

  //   {
  //     id: '126',
  //     country: 'CINEMA OF NIGER',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Niger.png'),
  //   },

  //   {
  //     id: '127',
  //     country: 'CINEMA OF NIGERIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Nigeria.png'),

  //   },

  //   {
  //     id: '128',
  //     country: 'CINEMA OF NORTH KOREA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_North_Korea.png'),
  //   },

  //   {
  //     id: '129',
  //     country: 'CINEMA OF NORTH MACEDONIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_North_Macedonia.png'),
  //   },

  //   {
  //     id: '130',
  //     country: 'CINEMA OF NORWAY',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Norway.png'),
  //   },

  //   {
  //     id: '131',
  //     country: 'CINEMA OF OMAN',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Oman.png'),
  //   },

  //   {
  //     id: '132',
  //     country: 'CINEMA OF PAKISTAN',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Pakistan.png'),
  //   },

  //   {
  //     id: '133',
  //     country: 'CINEMA OF PALAU',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Palau.png'),
  //   },

  //   {
  //     id: '134',
  //     country: 'CINEMA OF PALESTINE',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Palestine.png'),
  //   },

  //   {
  //     id: '135',
  //     country: 'CINEMA OF PANAMA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Panama.png'),
  //   },

  //   {
  //     id: '136',
  //     country: 'CINEMA OF PAPUA NEW GUINEA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Papua_New_Guinea.png'),
  //   },
  //   {
  //     id: '137',
  //     country: 'CINEMA OF PARAGUAY',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Paraguay.png'),
  //   },
  //   {
  //     id: '138',
  //     country: 'CINEMA OF PERU',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Peru.png'),
  //   },
  //   {
  //     id: '139',
  //     country: 'CINEMA OF PHILIPPINES',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Philippines.png'),
  //   },
  //   {
  //     id: '140',
  //     country: 'CINEMA OF POLAND',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Poland.png'),
  //   },
  //   {
  //     id: '141',
  //     country: 'CINEMA OF PORTUGAL',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Portugal.png'),
  //   },
  //   {
  //     id: '142',
  //     country: 'CINEMA OF QATAR',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Qatar.png'),
  //   },
  //   {
  //     id: '143',
  //     country: 'CINEMA OF ROMANIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Romania.png'),
  //   },
  //   {
  //     id: '144',
  //     country: 'CINEMA OF RUSSIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Russia.png'),
  //   },
  //   {
  //     id: '145',
  //     country: 'CINEMA OF RWANDA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Rwanda.png'),
  //   },
  //   {
  //     id: '146',
  //     country: 'CINEMA OF SAINT KITTS & NEVIS',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Saint_Kitts_and_Nevis.png'),
  //   },
  //   {
  //     id: '147',
  //     country: 'CINEMA OF SAINT LUCIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Saint_Lucia.png'),
  //   },
  //   {
  //     id: '148',
  //     country: 'CINEMA OF SAINT VINCENT & THE GRANADINES',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Saint_Vincent_and_the_Grenadines.png'),
  //   },
  //   {
  //     id: '149',
  //     country: 'CINEMA OF SAMOA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Samoa.png'),
  //   },
  //   {
  //     id: '150',
  //     country: 'CINEMA OF SAN MARINO',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_San_Marino.png'),
  //   },
  //   {
  //     id: '151',
  //     country: 'CINEMA OF SAO TOME & PRINCIPE',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Sao_Tome_and_Principe.png'),
  //   },
  //   {
  //     id: '152',
  //     country: 'CINEMA OF SAUDI ARABIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Saudi_Arabia.png'),
  //   },
  //   {
  //     id: '153',
  //     country: 'CINEMA OF SENEGAL',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Senegal.png'),
  //   },
  //   {
  //     id: '154',
  //     country: 'CINEMA OF SERBIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Serbia.png'),
  //   },
  //   {
  //     id: '155',
  //     country: 'CINEMA OF SEYCHELLES',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Seychelles.png'),
  //   },
  //   {
  //     id: '156',
  //     country: 'CINEMA OF SIERRA LEONE',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Sierra_Leone.png'),
  //   },
  //   {
  //     id: '157',
  //     country: 'CINEMA OF SINGAPORE',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Singapore.png'),
  //   },
  //   {
  //     id: '158',
  //     country: 'CINEMA OF SLOVAKIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Slovakia.png'),
  //   },
  //   {
  //     id: '159',
  //     country: 'CINEMA OF SLOVENIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Slovenia.png'),
  //   },
  //   {
  //     id: '160',
  //     country: 'CINEMA OF SOLOMON ISLANDS',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Solomon_Islands.png'),
  //   },
  //   {
  //     id: '161',
  //     country: 'CINEMA OF SOMALIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Somalia.png'),
  //   },
  //   {
  //     id: '162',
  //     country: 'CINEMA OF SOUTH AFRICA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_South_Africa.png'),
  //   },
  //   {
  //     id: '163',
  //     country: 'CINEMA OF SOUTH KOREA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_South_Korea.png'),
  //   },
  //   {
  //     id: '164',
  //     country: 'CINEMA OF SOUTH SUDAN',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_South_Sudan.png'),
  //   },
  //   {
  //     id: '165',
  //     country: 'CINEMA OF SPAIN',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Spain.png'),
  //   },
  //   {
  //     id: '166',
  //     country: 'CINEMA OF SRI LANKA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Sri_Lanka.png'),
  //   },
  //   {
  //     id: '167',
  //     country: 'CINEMA OF SUDAN',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Sudan.png'),
  //   },
  //   {
  //     id: '168',
  //     country: 'CINEMA OF SURINAME',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Suriname.png'),
  //   },
  //   {
  //     id: '169',
  //     country: 'CINEMA OF SWEDEN',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Sweden.png'),
  //   },
  //   {
  //     id: '170',
  //     country: 'CINEMA OF SWITZERLAND',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Switzerland.png'),
  //   },
  //   {
  //     id: '171',
  //     country: 'CINEMA OF SYRIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Syria.png'),
  //   },
  //   {
  //     id: '172',
  //     country: 'CINEMA OF TAJIKISTAN',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Tajikistan.png'),
  //   },
  //   {
  //     id: '173',
  //     country: 'CINEMA OF TANZANIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Tanzania.png'),
  //   },
  //   {
  //     id: '174',
  //     country: 'CINEMA OF THAILAND',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Thailand.png'),

  //   },
  //   {
  //     id: '175',
  //     country: 'CINEMA OF TIMOR-LESTE',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_East_Timor.png'),
  //   },
  //   {
  //     id: '176',
  //     country: 'CINEMA OF TOGO',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Somalia.png'),
  //   },
  //   {
  //     id: '177',
  //     country: 'CINEMA OF TONGA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Togo.png'),
  //   },
  //   {
  //     id: '178',
  //     country: 'CINEMA OF TRINIDAD & TOBAGO',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Trinidad_and_Tobago.png'),
  //   },
  //   {
  //     id: '179',
  //     country: 'CINEMA OF TUNISIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Tunisia.png'),
  //   },
  //   {
  //     id: '180',
  //     country: 'CINEMA OF TURKEY',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Turkey.png'),
  //   },
  //   {
  //     id: '181',
  //     country: 'CINEMA OF TURKMENISTAN',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Turkmenistan.png'),
  //   },
  //   {
  //     id: '182',
  //     country: 'CINEMA OF TUVALU',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Tuvalu.png'),
  //   },
  //   {
  //     id: '183',
  //     country: 'CINEMA OF UGANDA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Uganda.png'),
  //   },
  //   {
  //     id: '184',
  //     country: 'CINEMA OF UKRAINE',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Ukraine.png'),
  //   },
  //   {
  //     id: '185',
  //     country: 'CINEMA OF UNITED ARAB EMIRATES',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_UAE.png'),
  //   },
  //   {
  //     id: '186',
  //     country: 'CINEMA OF UNITED KINGDOM',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_UK.png'),
  //   },
  //   {
  //     id: '187',
  //     country: 'CINEMA OF UNITED STATES OF AMERICA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_United_States.png'),
  //   },
  //   {
  //     id: '188',
  //     country: 'CINEMA OF URUGUAY',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Uruguay.png'),
  //   },
  //   {
  //     id: '189',
  //     country: 'CINEMA OF UZBEKISTAN',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Uzbekistan.png'),
  //   },
  //   {
  //     id: '190',
  //     country: 'CINEMA OF VANUATU',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Vanuatu.png'),
  //   },
  //   {
  //     id: '191',
  //     country: 'CINEMA OF VENEZUELA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Venezuela.png'),
  //   },
  //   {
  //     id: '192',
  //     country: 'CINEMA OF VIETNAM',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Vietnam.png'),
  //   },
  //   {
  //     id: '193',
  //     country: 'CINEMA OF YEMEN',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Yemen.png'),
  //   },
  //   {
  //     id: '194',
  //     country: 'CINEMA OF ZAMBIA',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Zambia.png'),
  //   },
  //   {
  //     id: '195',
  //     country: 'CINEMA OF ZIMBABWE',
  //     countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Zimbabwe.png'),
  //   },
  //   {
  //     id: '196',
  //     country: 'CINEMA OF MORMON',
  //     // countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Zimbabwe.png'),
  //   },
  //   {
  //     id: '197',
  //     country: 'CINEMA OF U.K ENGLAND',
  //     // countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Zimbabwe.png'),
  //   },
  //   {
  //     id: '198',
  //     country: 'CINEMA OF TAIWAN',
  //     // countryLogo: require('../../Assets/AllSearch_Icon_And_Fonts/country/FH_Zimbabwe.png'),
  //   },





  ];

  const Country = ({ country, countryLogo }) => (

    <ImageBackground style={styles.inputContainer} source={require('../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode='stretch'>
      <View style={styles.inputContainer}>

        <ImageBackground source={require('../../Assets/AllSearch_Icon_And_Fonts/Bg-IMG.png')} style={{
          left: responsiveWidth(3), width: responsiveWidth(17),
          height: responsiveHeight(8), justifyContent: 'center',

          borderRadius: responsiveWidth(25), alignItems: 'center',
        }} resizeMode='stretch'>
          <View >

            <Image source={countryLogo} style={{ height: responsiveHeight(6.5), width: responsiveWidth(12), borderRadius: responsiveWidth(30), bottom: responsiveHeight(0.2) }} resizeMode='stretch' />

          </View>
        </ImageBackground>

        <Text style={styles.title}>{country}</Text>
      </View>
    </ImageBackground>



  );

  const [select, setSelect] = useState(countryPage)
  const handleOnPress = (item) => {
    const newItem = select.map((value) => {
      if (item.country == 'CINEMA OF INDIA') {
        return (
          navigation.navigate("Industry")
        )
      }

      else if (item.country == 'CINEMA OF CHINA') {
        return (
          navigation.navigate("ChinaSub")
        )
      }
      else if (item.country == 'CINEMA OF JAPAN') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF INDONESIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF FRANCE') {
        return (
          navigation.navigate("FranceSub")
        )

      }
      else if (item.country == 'CINEMA OF MORMON') {
        return (
          navigation.navigate("MormonSub")
        )

      }
      else if (item.country == 'CINEMA OF U.K ENGLAND') {
        return (
          navigation.navigate("EnglandSub")
        )

      }
      else if (item.country == 'CINEMA OF TAIWAN') {
        return (
          navigation.navigate("TaiwanSub")
        )

      }

      //------------------------------------------------------------
      else if (item.country == 'CINEMA OF MYANMAR') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF NAMBIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF NAURU') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF NEPAL') {
        return (
          navigation.navigate("NepalSub")
        )
      }
      else if (item.country == 'CINEMA OF NETHERLAND') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF NEW ZEALAND') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF NICARAGUA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF NIGER') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF NIGERIA') {
        return (
          navigation.navigate("NigeriaSub")
        )
      }
      else if (item.country == 'CINEMA OF NORTH KOREA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF NORTH MACEDONIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF NORWAY') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF OMAN') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF PAKISTAN') {
        return (
          navigation.navigate("PakistanSub")
        )
      }
      else if (item.country == 'CINEMA OF PALAU') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF PALESTINE') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF PANAMA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF PAPUA NEW GUINEA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF PARAGUAY') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF PERU') {
        return (
          navigation.navigate("PeruSub")
        )
      }
      else if (item.country == 'CINEMA OF PHILIPPINES') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF POLAND') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF PORTUGAL') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF QATAR') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF ROMANIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF RUSSIA') {
        return (
          navigation.navigate("RussiaSub")
        )
      }
      else if (item.country == 'CINEMA OF RWANDA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF SAINT KITTS & NEVIS') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF SAINT LUCIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF SAINT VINCENT & THE GRANADINES') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF SAMOA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF SAN MARINO') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF SAO TOME & PRINCIPE') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF SAUDI ARABIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF SENEGAL') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF SERBIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF SEYCHELLES') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF SIERRA LEONE') {
        return (
          navigation.navigate("SierreLeoneSub")
        )
      }
      else if (item.country == 'CINEMA OF SINGAPORE') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF SLOVAKIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF SLOVENIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF SOLOMON ISLANDS') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF SOMALIA') {
        return (
          navigation.navigate("SomaliaSub")
        )
      }
      else if (item.country == 'CINEMA OF SOUTH AFRICA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF SOUTH KOREA') {
        return (
          navigation.navigate("SouthKoreaSub")
        )
      }
      else if (item.country == 'CINEMA OF SOUTH SUDAN') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF SPAIN') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF SRI LANKA') {
        return (
          navigation.navigate("Srilanka")
        )
      }
      else if (item.country == 'CINEMA OF SUDAN') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF SURINAME') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF SWEDEN') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF SWITZERLAND') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF SYRIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF TAJIKISTAN') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF TANZANIA') {
        return (
          navigation.navigate("TanzaniaSub")
        )
      }
      else if (item.country == 'CINEMA OF THAILAND') {
        return (
          navigation.navigate("ThailandSub")
        )
      }
      else if (item.country == 'CINEMA OF TIMOR-LESTE') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF TOGO') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF TONGA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF CAPE VERDE') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF TRINIDAD & TOBAGO') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF TUNISIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF TURKEY') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF TUNISIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF TURKMENISTAN') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF TUVALU') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF UGANDA') {
        return (
          navigation.navigate("UgandaSub")
        )
      }
      else if (item.country == 'CINEMA OF UKRAINE') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF UNITED ARAB EMIRATES') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF UNITED KINGDOM') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF UNITED STATES OF AMERICA ') {
        return (
          navigation.navigate("NorthAmericaSub")
        )
      }
      else if (item.country == 'CINEMA OF URUGUAY') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF UZBEKISTAN') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF VANUATU') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF VENEZUELA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF VIETNAM') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF YEMEN') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF ZAMBIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF AFGHANISTAN') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF ALBANIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF ALGERIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF ANDORRA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF ANGOLA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF ANTIGUA & BARBUDA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF ARGENTINA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF ARMENIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF AUSTRALIA') {
        return (
          navigation.navigate("AustraliaSub")
        )
      }
      else if (item.country == 'CINEMA OF AUSTRIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF AZERBAIJAN') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF BAHAMAS') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF BAHRAIN') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF BANGLADESH') {
        return (
          navigation.navigate("BangladeshSub")
        )
      }
      else if (item.country == 'CINEMA OF BARBADOS') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF BELARUS') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF BELGIUM') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF BELIZE') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF BENIN') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF BHUTAN') {
        return (
          navigation.navigate("BhutanSub")
        )
      }
      else if (item.country == 'CINEMA OF BOLIVIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF BOSNIA & HERZEGOVINA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF BOTSWANA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF BRAZIL') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF BRUNEI') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF BULGARIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF BURKINA FASO') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF BURUNDI') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == "CINEMA OF COTE D'IVOIRA") {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF CABOVERDE') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF CAMBODIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF CAMEROON') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF CANADA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF CENTRAL AFRICAN REPUBLIC') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF CHAD') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF CHILE') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }

      else if (item.country == 'CINEMA OF COLOMBIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF COMOROS') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF CONGO(CONGO-BRAZZAVILLE)') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF COSTARICA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF CROATIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF CUBA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF CYPRUS') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF CZECHIA(CZECH REPUBLIC)') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF DEMOCRATIC REPUBLIC OF THE CONGO') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF DENMARK') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF DJIBOUTI') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF DOMINICA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF DOMINICAN REPUBLIC') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF ECUADOR') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF EGYPT') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF EL SALVADOR') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF EQUATORIAL GUINEA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF ERITREA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF ESTONIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF ESWATINI') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF ETHIOPIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF FIJI') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF FINLAND') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF GABON') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF GAMBIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF GEORGIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF GERMANY') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF GHANA') {
        return (
          navigation.navigate("GhanaSub")
        )
      }
      else if (item.country == 'CINEMA OF GREECE') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF GRENADA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF GUATEMALA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF GUINEA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF GUINEA-BISSAU') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF GUYANA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF HAITI') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF HOLY SEE') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF HONDURAS') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF HUNGARY') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF ICELAND') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF IRAN') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF IRAQ') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF IRELAND') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF ISRAEL') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF ITALY') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF JAMAICA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF JAPAN') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF JORDAN') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF KAZAKHSTAN') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF KENYA') {
        return (
          navigation.navigate("KenyaSub")
        )
      }
      else if (item.country == 'CINEMA OF KIRIBATI') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF KUWAIT') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF KYRGYSTAN') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF LAOS') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF LATVIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF LEBANON') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF LESOTHA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF LIBERIA') {
        return (
          navigation.navigate("LiberiaSub")
        )
      }
      else if (item.country == 'CINEMA OF LIBYA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF LIECHTENSTEIN') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF LITHUANIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF LUXEMBOURG') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF MADAGASCAR') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF MALAWI') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF MALASIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF MALDIVES') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF MALI') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF MALTA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF MARSHALL ISLANDS') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF MAURITANIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF MAURITIUS') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF MEXICO') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF MICRONESIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF MOLDOVA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF MONACO') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF MONGOLIA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF MONTENEGRO') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF MOROCCO') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF MOZAMBIQUE') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF ZIMBAWA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF ZIMBAWA') {
        return (
          navigation.navigate("IndustryScreenOthers")
        )
      }
      else if (item.country == 'CINEMA OF ZIMBABWE') {
        return (
          navigation.navigate("ZimbabweSub")
        )
      }

    }

    )
    setSelect(newItem)


  }

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, [])

  return (
    <View style={styles.container}>

      <View style={styles.searchBar}>
        <TextInput style={styles.searchText}
          placeholder="Search..."
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>

    

      <View style={{ paddingTop: '1%', width: '100%', height: '87%', alignItems: 'center', marginTop: '1%', borderWidth: 1 }}>

        <FlatList
          data={countryPage.filter((item) => ((item.country).toLocaleLowerCase()).includes(search.toLocaleLowerCase()))}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (<TouchableOpacity onPress={() => handleOnPress(item)} style={styles.box}><Country {...item} />
          </TouchableOpacity>)} />
      </View>


    </View>
  )
};

export default CountryPage;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    // borderWidth: 1,
    // borderColor: 'red',
    alignItems: 'center'
  },
  searchText: {
    borderWidth: 1,
    height: responsiveHeight(6),
    width: '100%',
    padding: responsiveWidth(2),
    textAlign: 'center',
    alignContent: 'center',
    borderRadius: responsiveWidth(3),
    color: 'black'


  },
  searchBar: {
    width: '95%',
    height: '11%',
    // backgroundColor:'blue',
    marginTop: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1
  },
  // logowithText: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   alignItems: 'center',
  //   // backgroundColor: '#e0e0e0',
  //   //  borderWidth:1,
  //   margin: responsiveWidth(2),
  //   width: responsiveWidth(90),
  //   height: responsiveHeight(5),
  //   bottom:responsiveHeight(1)
  //   //   borderColor:'green'
  // },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(9.2),
    width: responsiveWidth(87.5),
    margin: responsiveWidth(1)
  },

  boxContent: {
    height: responsiveHeight(8.3),
    width: responsiveWidth(85.1),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
    borderRadius: responsiveWidth(3.2),
    borderWidth: responsiveWidth(0.2),
    color: 'black',


  },

  // box: {
  //   width: responsiveWidth(95),
  //   height: responsiveHeight(9),
  //   margin: responsiveHeight(0.3),
  //   borderRadius: responsiveWidth(5),
  //   backgroundColor: '#fff',
  //   borderWidth: 1,
  // },
  logo: {

    // backgroundColor: '#E9E5E5',
    bottom: responsiveHeight(0.4)

  },
  title: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: 'bold',
    color: 'black',
    left: responsiveWidth(6),


  },


});