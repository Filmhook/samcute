import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Dimensions, ImageBackground, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import LinearGradient from 'react-native-linear-gradient'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { SelectList } from 'react-native-dropdown-select-list';
import CountryPicker from 'react-native-country-picker-modal';
import DropDownPicker from 'react-native-dropdown-picker';

import { Calendar } from 'react-native-calendars';

import { Picker } from '@react-native-picker/picker';


export default function SignUpOne() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [selectedGender, setSelectedGender] = useState(null);
  const navigation = useNavigation();

  const [nameError, setNameError] = useState('');
  const [dobError, setDobError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [stateError, setStateError] = useState('');
  const [districtError, setDistrictError] = useState('');

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const handleTextChange = (text) => {
    setName(capitalizeFirstLetter(text));
  };



  const countries = [
    {
      id: 1, name: 'INDIA', states: [
        {
          name: 'TAMILNADU',
          districts: ['Alandur', 'Ambattur', 'Ambur', 'Ariyalur', 'Avadi', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Hosur', 'Kallakurichi', 'Kanchipuram', 'Kanniyakumari', 'Karaikkudi', 'Karur', 'Krishnagiri', 'Kumbakonam', 'Kurichi', 'Madavaram', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Nagercoil', 'Namakkal', 'Neyveli', 'Nilgiris', 'Pallavaram', 'Perambalur', 'Pudukkottai', 'Rajapalayam', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivagangai', 'Tambaram', 'Tenkasi', 'Thanjavur', 'Theni', 'Tuticorin', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Tiruvottiyur', 'Vellore', 'Viluppuram', 'Virudhunagar', 'Pondicherry', 'Karaikal']
        },

        {
          name: 'Andhra Pradhesh', districts: ['Adoni',
            'Anantapuram',
            'Annamayya',
            'Bhimavaram',
            'Chilakaluripet',
            'Chittoor',
            'Dharmavaram',
            'East Godavari',
            'Eluru',
            'Gudivada',
            'Guntakal',
            'Guntur',
            'Hindupur',
            'Kadapa',
            'Kadiri',
            'Kakinada',
            'Krishna',
            'Kurnool',
            'Machilipatnam',
            'Madanapalle',
            'Mangalagiri',
            'Nandyal',
            'Narasaraopet',
            'Nellore',
            'Ongole',
            'Palnadu',
            'Prakasam',
            'Proddatur',
            'Rajahmundry',
            'SPSR Nellore',
            'Sri Sathya Sai',
            'Srikakulam',
            'Tadepalli',
            'Tadepalligudem',
            'Tadipatri',
            'Tenali',
            'Tirupati',
            'Vijayawada',
            'Visakhapatnam',
            'Vizianagaram',
            'West Godavari',
            'YSR',
            'Telangana States',
            'Achampet',
            'Adilabad',
            'Armoor',
            'Asifabad',
            'Badangpet',
            'Bandlaguda Jagir',
            'Banswada',
            'Bellampalle',
            'Bhadrachalam',
            'Bhadradri Kothagudem',
            'Bhainsa',
            'Bhupalpally',
            'Bhuvanagiri',
            'Bodhan',
            'Boduppal',
            'Chennur',
            'Dammaiguda',
            'Dasnapur',
            'Devarakonda',
            'Dubbaka',
            'Dundigal',
            'Gadwal',
            'Gajwel',
            'Ghatkesar',
            'Husnabad',
            'Huzurnagar',
            'Hyderabad',
            'Jagtial',
            'Jangaon',
            'Jawaharnagar',
            'Jayashankar Bhupalpally',
            'Jillelguda',
            'Jogulamba Gadwal',
            'Kagaznagar',
            'Kalwakurthy',
            'Kamareddy',
            'Karimnagar',
            'Khammam',
            'Khanapuram Haveli',
            'Kodad',
            'Komaram Bheem',
            'Kompally',
            'Korutla',
            'Kothagudem',
            'Kyathanpally',
            'Luxettipet',
            'Madhira',
            'Mahabubabad',
            'Mahabubnagar',
            'Malkajgiri',
            'Mancherial',
            'Mandamarri',
            'Manuguru',
            'Medak',
            'Medak district',
            'Medchal',
            'Meerpet',
            'Metpally',
            'Miryalaguda',
            'Nagar Kurnool',
            'Nagaram',
            'Nakrekal',
            'Nalgonda',
            'Narayanpet',
            'Narsampet',
            'Naspur',
            'Neredcherla',
            'Nirmal',
            'Nizamabad',
            'Palwancha',
            'Parigi',
            'Peddapalli',
            'Peerzadiguda',
            'Pocharam',
            'Rajanna Sircilla',
            'Ramagundam',
            'Ranga Reddy',
            'Sangareddy',
            'Sarapaka',
            'Shamshabad',
            'Siddipet',
            'Sircilla',
            'Suryapet',
            'Tandur',
            'Thumkunta',
            'Vikarabad',
            'Wanaparthy',
            'Warangal',
            'Y. Bhuvanagiri',
            'Zahirabad',]
        },

        {
          name: 'Karnataka', districts: ['Bagalkot',
            'Bangalore',
            'Belagavi',
            'Belgaum',
            'Bellary',
            'Betigeri',
            'Bhadravati',
            'Bidar',
            'Bijapur',
            'Chamarajanagara',
            'Chikkaballapura',
            'Chikkamagaluru',
            'Chitradurga',
            'Dakshina Kannada',
            'Davanagere',
            'Dharwad',
            'Gadag',
            'Gangawati',
            'Gulbarga',
            'Hassan',
            'Haveri',
            'Hospet',
            'Hubli',
            'Kalaburagi',
            'Kodagu',
            'Kolar',
            'Koppal',
            'Mandya',
            'Mangalore',
            'Mysore',
            'Raichur',
            'Ramanagara',
            'Ranibennur',
            'Robertson Pet',
            'Shimoga',
            'Tumkur',
            'Udupi',
            'Uttara Kannada',
            'Vijayanagar',
            'Vijayapura',
            'Yadgir',]
        },


        {
          name: 'Kerala', districts: ['Alappuzha',
            'Chalakudy',
            'Changanassery',
            'Cherthala',
            'Ernakulam',
            'Idukki',
            'Kanhangad',
            'Kannur',
            'Kasaragod',
            'Kayamkulam',
            'Kochi',
            'Kollam',
            'Kothamangalam',
            'Kottayam',
            'Kozhikode',
            'Malappuram',
            'Ottappalam',
            'Palakkad',
            'Pathanamthitta',
            'Thiruvananthapuram',
            'Thrissur',
            'Wayanad',]
        },
        {
          name: 'Goa', districts: ['Bicholim',
            'Canacona',
            'Cuncolim',
            'Curchorem',
            'Mapusa',
            'Margao',
            'Mormugao',
            'Panaji',
            'Pernem',
            'Ponda',
            'Quepem',
            'Sanguem',
            'Sanquelim',
            'Valpoi',]
        },
        {
          name: 'Uttar Pradesh', districts: ['Agra',
            'Akbarpur',
            'Aligarh',
            'Ambedkar Nagar',
            'Amroha',
            'Awagarh',
            'Ayodhya',
            'Azamgarh',
            'Baduan',
            'Bahraich',
            'Ballia',
            'Banda',
            'Barabanki',
            'Bareilly',
            'Basti',
            'Bijnor',
            'Budaun',
            'Bulandshahr',
            'Chandausi',
            'Deoria',
            'Etah', 'Etawah',
            'Farrukhabad',
            'Fatehgarh',
            'Fatehpur',
            'Firozabad',
            'Gautam Buddha Nagar',
            'Ghaziabad',
            'Ghazipur',
            'Gonda',
            'Gorakhpur',
            'Greater Noida',
            'Hapur',
            'Hardoi',
            'Hathras',
            'Jalaun',
            'Jaunpur',
            'Jhansi',
            'Kanpur',
            'Kasganj',
            'Khurja',
            'Lakhimpur'

          ]
        },
        {
          name: 'West Bengal', districts: ['Asansol',
            'Alipurduar',
            'Ashokenagar Kalyangarh',
            'Baharampur',
            'Baidyabati',
            'Bally',
            'Bally Town',
            'Balurghat',
            'Bankura',
            'Bansberia',
            'Baranagar',
            'Barasat',
            'Barddhaman',
            'Barrackpur',
            'Basirhat',
            'Bhadreswar',
            'Bhatpara',
            'Bidhan Nagar',
            'Birbhum',
            'Bongaon',
            'Champdani',
            'Chandannagar',
            'Chinsurah',
            'Cooch Behar',
            'Dabgram',
            'Dakshin Dinajpur',
            'Darjiling',
            'Dum Dum',
            'Durgapur',
            'English Bazar',
            'Habra',
            'Haldia',
            'Halisahar',
            'Hooghly',
            'Howrah',
            'Hugli ',
            'Jalpaiguri',
            'Jamuria',
            'Jhargram',
            'Kalimpong',
            'Kalyani',
            'Kamarhati',
            'Kanchrapara',
            'Kharagpur',
            'Khardaha',
            'Kolkata',
            'Krishnanagar',
            'Kulti',
            'Madhyamgram',
            'Maheshtala',
            'Maldah',

            'Medinipur',
            'Murshidabad',
            'Nabadwip',
            'Nadia',
            'Naihati',
            'North 24 Parganas',
            'North Barrackpur',
            'North Dum Dum',
            'Panihati',
            'Paschim Bardhaman',
            'Paschim Medinipur',
            'Purba Bardhaman',
            'Purba Medinipur',
            'Purulia',
            'Puruliya',
            'Raiganj',
            'Rajarhat Gopalpur',
            'Rajpur Sonarpur',
            'Raniganj',
            'Rishra',
            'Santipur',
            'Serampore',
            'Siliguri',
            'South 24 Parganas',
            'South Dum Dum',
            'Titagarh',
            'Uluberia',
            'Uttar Dinajpur',
            'Uttarpara Kotrung',

          ]
        },
        {
          name: 'Uttarakhand', districts: ['Uttrarakhand',
            'Almora',
            'Bageshwar',
            'Chamoli',
            'Champawat',
            'Dehradun',
            'Haldwani',
            'Haridwar',
            'Kashipur',
            'Nainital',
            'Pauri Garhwal',
            'Pithoragarh',
            'Rishikesh',
            'Roorkee',
            'Rudraprayag',
            'Rudrapur',
            'Tehri Garhwal',
            'Udham Singh Nagar',
            'Uttarkashi',
            'Kathgodam',

          ]
        },
        {
          name: 'Tripura', districts: ['Agartala',
            'Amarpur',
            'Ambassa',
            'Belonia',
            'Bishalgarh',
            'Dhalai',
            'Dharmanagar',
            'Gomati',
            'Jirania',
            'Kailashahar',
            'Kamalpur',
            'Khowai',
            'Kumarghat',
            'Melaghar',
            'Mohanpur',
            'North Tripura',
            'Panisagar',
            'Ranirbazar',
            'Sabroom',
            'Santirbazar',
            'Sipahijala',
            'Sonamura',
            'South Tripura',
            'Teliamura',
            'Udaipur',
            'Unakoti',
            'West Tripura',

          ]
        },
        {
          name: 'Sikkim', districts: ['Gangtok',
            'Geyzing',
            'Gyalshing',
            'Jorethang',
            'Mangan',
            'Namchi',
            'Naya Bazar',
            'Pakyong',
            'Rangpo',
            'Singtam',
            'Soreng',

          ]
        },
        {
          name: 'Rajasthan', districts: ['Ajmer',
            'Alwar',
            'Banswara',
            'Baran',
            'Barmer',
            'Beawar',
            'Bharatpur',
            'Bhilwara',
            'Bhiwadi',
            'Bikaner',
            'Bundi',
            'Chittaurgarh (Chittorgarh)',
            'Churu',
            'Dausa',
            'Dhaulpur (Dholpur)',
            'Dungarpur',
            'Ganganagar (Sri Ganganagar)',
            'Hanumangarh',
            'Jaipur',
            'Jaisalmer',
            'Jalor (Jalore)',
            'Jhalawar',
            'Jhunjhunu',
            'Jodhpur',
            'Karauli',
            'Kishangarh',
            'Kota',
            'Nagaur',
            'Pali',
            'Pratapgarh',
            'Rajsamand',
            'Sawai Madhopur',
            'Sikar',
            'Sirohi',
            'Tonk',
            'Udaipur',

          ]
        },
        {
          name: 'Punjab', districts: ['Abohar',
            'Amritsar',
            'Barnala',
            'Batala',
            'Bathinda',
            'Chandigarh',
            'Faridkot',
            'Fatehgarh Sahib',
            'Fazilka',
            'Firozpur',
            'Gurdaspur',
            'Hoshiarpur',
            'Jalandhar',
            'Kapurthala',
            'Khanna',
            'Ludhiana',
            'Malerkotla',
            'Mansa',
            'Moga',
            'Mohali',
            'Muktsar',
            'Pathankot',
            'Patiala',
            'Rupnagar',
            'Sahibzada Ajit Singh Nagar',
            'Sangrur',
            'Shahid Bhagat Singh Nagar',
            'Sri Muktsar Sahib',
            'Tarn Taran',

          ]
        },
        {
          name: 'Orissa', districts: ['Anandpur',
            'Angul',
            'Balangir',
            'Balangir District',
            'Balasore',
            'Bargarh',
            'Bargarh District',
            'Bhadrak',
            'Bhanjanagar',
            'Bhubaneswar',
            'Boudh',
            'Cuttack',
            'Debagarh',
            'Dhenkanal',
            'Gajapati',
            'Ganjam',
            'Ganjam District',
            'Jagatsinghpur',
            'Jajpur',
            'Jharsuguda',
            'Kalahandi',
            'Kandhamal',
            'Kendrapara',
            'Kendujhar',
            'Kendujhar District',
            'Khordha',
            'Khordha District',
            'Koraput',
            'Malkangiri',
            'Mayurbhanj',
            'Mayurbhanj District',
            'Nabarangpur',
            'Nayagarh',
            'Nuapada',
            'Nyayagarh',
            'Padampur',
            'Puri',
            'Rairangpur',
            'Rayagada',
            'Rourkela',
            'Sambalpur',
            'Subarnapur',
            'Sundargarh',
            'Sundargarh district',
            'Titlagarh',

          ]
        },
        {
          name: 'Nagaland', districts: ['Changtongya',
            'Chumukedima',
            'Dimapur',
            'Diphupar ‘A’',
            'Jalukie',
            'Kiphire',
            'Kohima',
            'Kohima Village',
            'Kuda',
            'Longleng',
            'Medziphema',
            'Mokokchung',
            'Mon Town',
            'Naginimora',
            'Peren',
            'Pfutsero',
            'Phek',
            'Puranabazar ‘A’',
            'Rangapahar',
            'Satakha Hq.',
            'Tseminyu',
            'Tsudikong',
            'Tuensang',
            'Tuli',
            'Wokha',
            'Zunheboto',

          ]
        },

        {
          name: 'Mizoram', districts: ['Aizawl',
            'Bairabi',
            'Biate',
            'Champhai',
            'Darlawn',
            'Hnahthial',
            'Khawhai',
            'Khawzawl',
            'Kolasib',
            'Lawngtlai',
            'Lengpui',
            'Lunglei',
            'Mamit',
            'N. Kawnpui',
            'North Vanlaiphai',
            'Saiha',
            'Sairang',
            'Saitual',
            'Serchhip',
            'Thenzawl',
            'Tlabung',
            'Vairengte',
            'Zawlnuam',

          ]
        },
        {
          name: 'Meghalaya', districts: ['Baghmara',
            'Cherrapunjee(Cherrapunji)',
            'Jowai',
            'Lawsohtun',
            'Madanriting(Madanrting)',
            'Mairang',
            'Mawlai',
            'Mawpat',
            'Nongkseh',
            'Nongmynsong',
            'Nongpoh',
            'Nongstoin',
            'Nongthymmai',
            'Pynthormukhrah(Pynthorumkhrah)',
            'Resubelpara',
            'Shillong',
            'Shillong Cantonment',
            'Tura',
            'Umlyngka',
            'Umpling',
            'Umroi',
            'Williamnagar',

          ]
        },
        {
          name: 'Manipur', districts: ['Bishnupur',
            'Chandel ',
            'Churachandpur',
            'Imphal East',
            'Imphal West',
            'Jiribam',
            'Kakching',
            'Kamjong',
            'Kangpokpi',
            'Noney',
            'Pherzawl',
            'Senapati',
            'Tamenglong',
            'Tengnoupal',
            'Thoubal',
            'Ukhrul',

          ]
        },
        {
          name: 'Maharashtra', districts: ['Achalpur',
            'Ahmednagar',
            'Akola',
            'Ambarnath',
            'Amravati',
            'Aurangabad',
            'Badlapur',
            'Barshi',
            'Beed',
            'Bhiwandi-Nizampur',
            'Bhusawal',
            'Chandrapur',
            'Chiplun',
            'Dhule',
            'Gondia',
            'Hinganghat',
            'Ichalkaranji',
            'Jalgaon',
            'Jalna',
            'Kalyan-Dombivli',
            'Kamptee',
            'Karad',
            'Kolhapur',
            'Latur',
            'Malegaon',
            'Mira-Bhayandar',
            'Miraj',
            'Mumbai',
            'Mumbai City, Mumbai Suburban',
            'Nagpur',
            'Nanded',
            'Nanded-Waghala',
            'Nandurbar',
            'Nashik',
            'Navi Mumbai',
            'Osmanabad',
            'Palghar',
            'Panvel',
            'Parbhani',
            'Parli',
            'Pimpri Chinchwad',
            'Pune',
            'Raigad',
            'Ratnagiri ',
            'Sangli',
            'Sangli-Miraj-Kupwad',
            'Satara',
            'Solapur',
            'Thane',
            'Udgir',
            'Ulhasnagar',
            'Vasai-Virar',
            'Wardha',
            'Yavatmal',

          ]
        },
        {
          name: 'Madhya Pradesh', districts: ['Betul',
            'Betul district',
            'Bhind',
            'Bhind district',
            'Bhopal',
            'Bhopal district',
            'Burhanpur',
            'Burhanpur district',
            'Chambal',
            'Chambal district',
            'Chhatarpur',
            'Chhatarpur district',
            'Chhindwara',
            'Chhindwara district',
            'Damoh',
            'Damoh district',
            'Datia',
            'Datia district',
            'Dewas',
            'Dewas district',
            'Dhar district',
            'Dindori',
            'Dindori district',
            'Gadarwara',
            'Guna',
            'Guna district',
            'Gwalior',
            'Gwalior district',
            'Indore',
            'Indore district',
            'Itarsi',
            'Jabalpur',
            'Jabalpur district',
            'Katni',
            'Katni district',
            'Khandwa',
            'Khandwa district',
            'Khargone',
            'Khargone district',
            'Mandsaur',
            'Mandsaur district',
            'Nagda',
            'Narmadapuram',
            'Narmadapuram district',
            'Narsinghpur district',
            'Neemuch',
            'Neemuch district',
            'Pithampur',
            'Ratlam',
            'Ratlam district',
            'Rewa',
            'Rewa District',
            'Sagar',
            'Sagar district',
            'Satna',
            'Satna district',
            'Sehore',
            'Sehore district',
            'Seoni',
            'Seoni district',
            'Shivpuri',
            'Shivpuri district',
            'Singrauli',
            'Singrauli district',
            'Ujjain',
            'Ujjain district',
            'Vidisha',
            'Vidisha district',

          ]
        },
        {
          name: 'Jharkhand', districts: ['Adityapur',
            'Bokaro',
            'Bokaro district',
            'Bokaro Steel City',
            'Chirkunda',
            'Deoghar',
            'Deoghar district',
            'Dhanbad',
            'Dhanbad district',
            'East Singhbhum',
            'Giridih',
            'Giridih district',
            'Hazaribagh',
            'Hazaribagh district',
            'Jamshedpur',
            'Mango',
            'Medininagar',
            'Medininagar (Daltonganj)',
            'Palamu',
            'Palamu district',
            'Phusro–Bermo–Bokaro Thermal',
            'Ramgarh',
            'Ramgarh district',
            'Ranchi',
            'Ranchi district',
            'Seraikela Kharsawan',

          ]
        },
        {
          name: 'Himachal Pradesh', districts: ['Bilaspur',
            'Chamba',
            'Dharamshala',
            'Hamirpur',
            ' Kullu',
            'Mandi',
            'Palampur',
            'Shimla',
            'Solan',
            'Una',
            'Kangra',
            'Lahaul',
            'Simraur',
            'Spiti',
            'Kinnaur',

          ]
        },
        {
          name: 'Haryana', districts: ['Ambala',
            'Bhiwani',
            'Charkhi Dadri',
            'Faridabad',
            'Fatehabad',
            'Gurugram',
            'Hisar',
            'Jhajjar',
            'Jind',
            'Kaithal',
            'Karnal',
            'Kurukshetra',
            'Mahendragarh',
            'Narnaul',
            'Nuh',
            'Palwal',
            'Panchkula',
            'Panipat',
            'Rewari',
            'Rohtak',
            'Sirsa',
            'Sonipat',
            'Yamunanagar',
            'Bahadurgarh',
            'Kosi',
            'Pundri',
            'Thanesar',

          ]
        },
        {
          name: 'Gujarat', districts: ['Ahmedabad',
            'Amreli',
            'Anand',
            'Banaskantha',
            'Bharuch',
            'Bhavnagar',
            'Bhuj',
            'Botad',
            'Dahod',
            'Deesa',
            'Gandhidham',
            'Gandhinagar',
            'Gir Somnath',
            'Godhra',
            'Gondal',
            'Jamnagar',
            'Jetpur',
            'Junagadh',
            'Kalol',
            'Kheda',
            'Kutch',
            'Mehsana',
            'Morbi',
            'Nadiad',
            'Navsari',
            'Palanpur',
            'Panchmahal',
            'Patan',
            'Porbandar',
            'Rajkot',
            'Surat',
            'Surendranagar',
            'Vadodara',
            'Valsad',
            'Vapi',
            'Veraval',

          ]
        },
        {
          name: 'Chhattisgarh', districts: ['Ahiwara',
            'Akaltara',
            'Ambagarh Chowki',
            'Ambikapur',
            'Ambikapur',
            'Arang',
            'Bade Bacheli',
            'Baghbahara',
            'Baikunthpur',
            'Baloda',
            'Baloda bazar',
            'Balodabazar Bhatapara',
            'Balrampur',
            'Bastar district',
            'Bemetra',
            'Bhatgaon',
            'Bhilai',
            'Bhilai-Durg',
            'Bijapur',
            'Bilaspur',
            'Bilaspur district',
            'Bilha',
            'Bishrampur',
            'Bodri',
            'Chandrapur',
            'Chhuikhadan',
            'Chirmiri',
            'Dabhra',
            'Dalli Rajhara',
            'Dantewada',
            'Dhamdha',
            'Dhamtari',
            'Dhamtari district',
            'Dharamjaigarh',
            'Dongergaon',
            'Durg',
            'Durg district',
            'Gandai',
            'Gaurella',
            'Gaurella-Pendra-Marwahi',
            'Gharghoda',
            'Jagdalpur',
            'Janjgir–Champa',
            'Jashpur',
            'Jashpur Nagar',
            'Kabirdham',
            'Kanker',
            'Katghora',
            'Khairagarh',
            'Khamharia',
            'Kharod',
            'Kharsia',
            'Kirandul',
            'Kondagaon',
            'Korba',
            'Korba district',
            'Koriya',
            'Kota',
            'Kurud',
            'Lormi',
            'Mahasamund',
            'Mahasamund district',
            'Manendragarh',
            'Manendragarh-Chirmiri-Bharatpur district',
            'Mungeli',
            'Narayanpur',
            'Naya Baradwar',
            'Odagi',
            'Pandariya',
            'Patan',
            'Pathalgaon',
            'Pendra',
            'Pithora',
            'Pratappur',
            'Raigarh',
            'Raigarh district',
            'Raipur',
            'Raipur district',
            'Rajnandgaon',
            'Rajnandgaon district',
            'Ramanujganj',
            'Ratanpur',
            'Sakti',
            'Saraipali',
            'Sarangarh',
            'Shivrinarayan',
            'Simga',
            'Sukma',
            'Surajpur',
            'Surajpur district',
            'Surguja district',
            'Takhatpur',
            'Telgaon',

          ]
        },
        {
          name: 'Bihar', districts: ['Arrah',
            'Begusarai',
            'Bettiah',
            'Bhagalpur',
            'Bhagalpur district',
            'Bihar Sharif',
            'Buxar',
            'Buxar district',
            'Chhapra',
            'Danapur',
            'Darbhanga',
            'Darbhanga district',
            'East Champaran',
            'Gaya',
            'Gaya district',
            'Katihar',
            'Katihar district',
            'Madhubani',
            'Mehsi',
            'Motihari',
            'Munger',
            'Muzaffarpur',
            'Muzaffarpur district',
            'Patna',
            'Patna district',
            'Purnia',
            'Purnia district',
            'Saharsa',
            'Samastipur',
            'Saran district',
            'Sasaram',
            'Sitamarhi',
            'West Champaran district',

          ]
        },
        {
          name: 'Assam', districts: ['Bongaigaon',
            'Chirang',
            'Cachar',
            'Dibrugarh',
            'Guwahati',
            'Jorhat',
            'Kamrup Metropolitan',
            'Silchar',
            'Sonitpur',
            'Tezpur',
            'Tinsukia',

          ]
        },
        {
          name: 'Andaman & Nicobar', districts: ['Bakultala',
            'Bambooflat',
            'Garacharma',
            'Malacca',
            'Mayabunder',
            'Nicobar',
            'North and Middle Andaman',
            'Port Blair',
            'Prothrapur',
            'South Andaman',

          ]
        },
        { name: 'Dadra and Nagar Haveli', districts: ['Daman', 'Diu',] },
        {
          name: 'Lakshadweep', districts: ['Agatti Island',
            'Amini',
            'Andrott',
            'Bangaram Atoll',
            'Bitra',
            'Chetlat Island',
            'Kadmat Island',
            'Kalpeni',
            'Kavaratti',
            'Kiltan',
            'Minicoy',

          ]
        },
        {
          name: 'Delhi', districts: ['Aali',
            'Ali Pur',
            'Asola',
            'Aya Nagar',
            'Babar Pur',
            'Bakhtawar Pur',
            'Bakkar Wala',
            'Bankauli',
            'Bankner',
            'Bapraula',
            'Baqiabad',
            'Barwala',
            'Bawana',
            'Begum Pur',
            'Bhalswa Jahangir Pur',
            'Bhati',
            'Bhor Garh',
            'Burari',
            'Chandan Hola',
            'Chattar Pur',
            'Chhawala (Chhawla)',
            'Chilla Saroda Bangar',
            'Chilla Saroda Khadar',
            'Dallo Pura',
            'Darya Pur Kalan',
            'Dayal Pur',
            'Deoli',
            'Dera Mandi',
            'Dindar Pur',
            'Fateh Pur Beri',
            'Gharoli',
            'Gharonda Neemka Bangar (Patparganj)',
            'Gheora',
            'Ghitorni',
            'Gokal Pur',
            'Hastsal',
            'Ibrahim Pur',
            'Jaffar Pur Kalan',
            'Jaffrabad',
            'Jait Pur',
            'Jharoda Kalan',
            'Jharoda Majra Burari',
            'Jiwan Pur (Johri Pur)',
            'Jona Pur',
            'Kair',
            'Kamal Pur Majra Burari',
            'Kanjhawala',
            'Kapas Hera',
            'Karala',
            'Karawal Nagar',
            'Khajoori Khas',
            'Khan Pur Dhani',
            'Khera',
            'Khera Kalan',
            'Khera Khurd',
            'Kirari Suleman Nagar',
            'Kondli',
            'Kotla Mahigiran',
            'Kusum Pur',
            'Lad Pur',
            'Libas Pur',
            'Maidan Garhi',
            'Malik Pur Kohi (Rang Puri)',
            'Mandoli',
            'Mir Pur Turk',
            'Mithe Pur',
            'Mitraon',
            'Mohammad Pur Majri',
            'Molar Band',
            'Moradabad Pahari',
            'Mubarak Pur Dabas',
            'Mukand Pur',
            'Mukhmel Pur',
            'Mundka',
            'Mustafabad',
            'Nangli Sakrawati',
            'Nangloi Jat',
            'Neb Sarai',
            'New Delhi',
            'Nilothi',
            'Nithari',
            'Pehlad Pur Bangar',
            'Pooth Kalan',
            'Pooth Khurd',
            'Pul Pehlad',
            'Qadi Pur',
            'Quammruddin Nagar',
            'Qutab Garh',
            'Raja Pur Khurd',
            'Rajokri',
            'Raj Pur Khurd',
            'Rani Khera',
            'Roshan Pura (Dichaon Khurd)',
            'Sadat Pur Gujran',
            'Sahibabad Daulat Pur',
            'Saidabad',
            'Saidul Azaib',
            'Sambhalka',
            'Shafi Pur Ranhola',
            'Shakar Pur Baramad',
            'Siras Pur',
            'Sultan Pur',
            'Sultan Pur Majra',
            'Taj Pul',
            'Tigri',
            'Tikri Kalan',
            'Tikri Khurd',
            'Tilang Pur Kotla',
            'Tukhmir Pur',
            'Ujwa',
            'Ziauddin Pur',

          ]
        },
        {
          name: 'Chandigarh', districts: ['Atawa',
            'Atawa Choa',
            'Badheri',
            'Bahlana',
            'Bahlolpur',
            'Bajwara',
            'Bijwari Bakhta',
            'Burail',
            'Buterla',
            'Dadu Majra',
            'Dariya',
            'Dhanas',
            'Dhanauran',
            'Fatehgarh',
            'Gurudwara',
            'Hala Majra',
            'Jhampur',
            'Kaimbwala',
            'Kanji Maira',
            'Kansil',
            'Kanthara',
            'Khoda Jassu',
            'Kujheri',
            'Kursan',
            'Madanpur',
            'Mahla Majra',
            'Malak',
            'Mariwala Town',
            'Mastgarh',
            'Moloia',
            'Palsaura',
            'Purnapani',
            'Raipur',
            'Raj Bhavan Haryana',
            'Raj Bhavan Punjab',
            'Sadoriaja Goth',
            'Saini Majra',
            'Sangariwala',
            'Sarangpur',
            'Shahpur Cholian',
            'Shahzadpur',
            'Togan',

          ]
        },
        {
          name: 'Ladakh', districts: ['Kargil',
            'Kargil district',
            'Karzok',
            'Khaltse',
            'Leh',
            'Leh district',
            'Nubra',
            'Nubra Valley',
            'Padum',
            'Sanku',
            'Thukje',

          ]
        },
        {
          name: 'J&K', districts: ['Samba',
            'Samba district',
            'Shopian',
            'Shopian district',
            'Srinagar',
            'Srinagar district',
            'Udhampur',
            'Udhampur district',

          ]
        },











      ]
    },
    {
      id: 2, name: 'NEPAL', states: [
        {
          name: 'Bagmati', districts: ['Bhaktapur',
            'Bhaktapur District',
            'Bharatpur',
            'Bhimeshwar',
            'Bidur',
            'Chautara',
            'Chitwan District',
            'Dhading District',
            'Dhulikhel',
            'Dhunche',
            'Dolakha District',
            'Hetauda',
            'Kamalamai',
            'Kathmandu',
            'Kathmandu District',
            'Kavrepalanchok District',
            'Lalitpur',
            'Lalitpur District',
            'Makwanpur District',
            'Manthali',
            'Nilkantha',
            'Nuwakot District',
            'Ramechhap District',
            'Rasuwa District',
            'Sindhuli District',
            'Sindhupalchok District',

          ]
        },

        {
          name: 'Koshi', districts: ['Aamchok',
            'Aathrai',
            'Aathrai Triveni',
            'Aiselukharka',
            'Arjundhara',
            'Arun',
            'Baraha',
            'Barahpokhari',
            'Barhadashi',
            'Barju',
            'Belaka',
            'Belbari',
            'Bhadrapur',
            'Bhojpur',
            'Bhokraha',
            'Bhot Khola',
            'Biratnagar',
            'Birtamod',
            'Buddha Shanti',
            'Budi Ganga',
            'Chainpur',
            'Champadevi',
            'Chaubise',
            'Chaudandigadhi',
            'Chhathar',
            'Chhathar Jorpati',
            'Chichila',
            'Chisankhugadhi',
            'Chulachuli',
            'Damak',
            'Deumai',
            'Dewangunj',
            'Dhankuta',
            'Dhanpalthan',
            'Dharan',
            'Dharmadevi',
            'Diprung',
            'Dudhkoshi',
            'Duhabi',
            'Gadhi',
            'Gauradaha',
            'Gaurigunj',
            'Gramthan',
            'Haldibari',
            'Halesi Tuwachung',
            'Harinagara',
            'Hatuwagadhi',
            'Hilihang',
            'Ilam',
            'Inaruwa',
            'Itahari',
            'Jahada',
            'Jantedhunga',
            'Jhapa',
            'Kachankawal',
            'Kamal',
            'Kanepokhari',
            'Kankai',
            'Katahari',
            'Katari',
            'Kepilasgadhi',
            'Kerabari',
            'Khalsa Chhintang Sahidbhumi',
            'Khandbari',
            'Khiji Demba',
            'Khotang',
            'Khumbu Pasang Lhamu',
            'Koshi',
            'Kummayak',
            'Laligurans',
            'Letang',
            'Likhu',
            'Likhu Pike',
            'Limchungbung',
            'Madi',
            'Maha Kulung',
            'Mahalaxmi Municipality',
            'Mai Jogmai',
            'Mai Municipality',
            'Maiwa Khola',
            'Makalu',
            'Manebhanjyang',
            'Mangsebung',
            'Mechinagar',
            'Menchayayem',
            'Meringden',
            'Miklajung',
            'Mikwa Khola',
            'Molung',
            'Morang District',
            'Myanglung',
            'Necha Salyan',
            'Okhaldhunga',
            'Pakhribas',
            'Panchkhapan',
            'Panchthar',
            'Pathari Shanischare',
            'Pathibhara Yangwarak',
            'Pauwadungma',
            'Phakphokthum',
            'Phaktanglung',
            'Phalelung',
            'Phalgunanda',
            'Phedap',
            'Phidim',
            'Phungling',
            'Ramdhuni',
            'Ramprasad Rai',
            'Rangeli',
            'Ratuwamai',
            'Rautamai',
            'Rawabesi',
            'Rong',
            'Rupakot Majhuwagadhi',
            'Sabhapokhari',
            'Sakela',
            'Salpasilichho',
            'Sandakpur',
            'Sangurigadhi',
            'Sankhuwasabha',
            'Shadanand',
            'Shivasatakshi Municipality',
            'Siddhicharan',
            'Sidingwa',
            'Silichong',
            'Sirijangha',
            'Solu Dudhkunda',
            'Solukhumbu',
            'Sotang',
            'Sunawarshi',
            'Sundar Haraicha',
            'Sunkoshi',
            'Sunsari',
            'Sunsari District',
            'Suryodaya',
            'Taplejung',
            'Tapli',
            'Tehrathum',
            'Triyuga',
            'Tumbewa',
            'Tyamke Maiyunm',
            'Udayapur',
            'Udayapurgadhi',
            'Urlabari',
            'Yangwarak',

          ]
        },

        {
          name: 'Gandaki', districts: ['Baglung',
            'Beni',
            'Besishahar',
            'Bhanu',
            'Bhimad',
            'Devchuli',
            'Gaindakot',
            'Galkot',
            'Galyang',
            'Gorkha',
            'Jaimini',
            'Kaski',
            'Kawasoti',
            'Kushma',
            'Lamgunj',
            'Madhyabindu',
            'Myagdi',
            'Nawalpur',
            'Palungtar',
            'Parbat',
            'Pokhara',
            'Putalibazar',
            'Shuklagandaki',
            'Syangja',
            'Tanahun',
            'Vyas',
            'Waling',
          ]
        },
        {
          name: 'Karnali', districts: ['Birendranagar',
            'Chandannath',
            'Dailekh District',
            'Dolpa District',
            'Dunai',
            'Gamgadhi',
            'Humla District',
            'Jajarkot District',
            'Jumla District',
            'Kalikot District',
            'Khalanga',
            'Manma',
            'Mugu District',
            'Musikot',
            'Narayan',
            'Salyan',
            'Salyan District',
            'Simikot',
            'Surkhet District',
            'Western Rukum District',

          ]
        },
        {
          name: 'Sudur Pashchim', districts: ['Achham District',
            'Baitadi District',
            'Bajhang District',
            'Bajura District',
            'Dadeldhura District',
            'Darchula District',
            'Doti District',
            'Kailali District',
            'Kanchanpur District',

          ]
        },
        {
          name: 'Lumbini', districts: ['Butwal',
            'Gulariya',
            'Nepalgunj',
            'Siddharthanagar',
            'Sitganga',
            'Tansen',
            'Tulsipur',
          ]
        },
        {
          name: 'Madhesh', districts: ['Bara District',
            'Birgunj',
            'Dhanusha District',
            'Gaur',
            'Jaleshwar',
            'Janakpur',
            'Kalaiya',
          ]
        },
        {
          name: 'Madhesh', districts: ['Bara District',
            'Birgunj',
            'Dhanusha District',
            'Gaur',
            'Jaleshwar',
            'Janakpur',
            'Kalaiya',
          ]
        },

      ]
    },
    {
      id: 3, name: 'SRI LANKA', states: [{
        name: 'Ampara', districts: ['Addalaichchenai',
          'Akkaraipattu',
          'Alayadivembu',
          'Ampara (Namal Oya)',
          'Damana',
          'Dehiattakandiya',
          'Irakkamam (Eragama)',
          'Kalmunai (Muslim)',
          'Kalmunai (Tamil)',
          'Karaitivu',
          'Lahugala',
          'Maha Oya',
          'Navithanveli',
          'Nintavur',
          'Padiyathalawa',
          'Pottuvil',
          'Sainthamaruthu',
          'Sammanthurai',
          'Thirukkovil',
          'Uhana',

        ]
      },
      {
        name: 'Anuradhapura', districts: ['Bulnewa',
          'Eppawala',
          'Galenbindunuwewa',
          'Galnewa',
          'Ganewalpola',
          'Habarana',
          'Horowupotana',
          'Kahatagasdigiliya',
          'Kebitigollawa',
          'Kekirawa',
          'Konapathirawa',
          'Konwewa',
          'Madatugama',
          'Mahailuppallama',
          'Maradankadawala',
          'Medawachchiya',
          'Mihintale',
          'Nachchaduwa',
          'Nochchiyagama',
          'Padawiya',
          'Palugaswewa',
          'Rambewa',
          'Seeppukulama',
          'Talawa',
          'Tambuttegama',
          'Thirappane',
          'Yakalla',
        ]
      },
      {
        name: 'Batticaloa', districts: ['Chenkalady',
          'Eravur',
          'Kalkudah',
          'Kaluvanchikudy',
          'Kathiraveli',
          'Kattankudy',
          'Kiran',
          'Kudumbimalai',
          'Oddamavadi',
          'Pasikudah',
          'Vakarai',
          'Valaichchenai',
          'Vavunathivu',
          'Vellavely'
        ]
      },
      {
        name: 'Colombo', districts: ['Avissawella',
          'Colombo',
          'Dehiwala',
          'Homagama',
          'Kaduwela',
          'Kesbewa',
          'Kolonnawa',
          'Maharagama',
          'Moratuwa',
          'Mount Lavinia',
          'Padukka',
          'Ratmalana',
          'Seethawaka',
          'Sri Jayawardenepura Kotte',
          'Thimbirigasyaya',
        ]
      },
      {
        name: 'Jaffna', districts: ['Achchuveli',
          'Alaveddy',
          'Aliyawalai',
          'Araly',
          'Chankanai',
          'Chavakachcheri',
          'Chunnakam',
          'Erlalai',
          'Kadduvan',
          'Kaithady',
          'Kankesanthurai',
          'Karainagar',
          'Karaveddy',
          'Kayts',
          'Keerimalai',
          'Kerudavil',
          'Kodikamam',
          'Kokkuvil',
          'Kondavil',
          'Kopay',
          'Mallakam',
          'Manipay',
          'Mirusuvil',
          'Moolai',
          'Myliddy',
          'Nagar Kovil',
          'Nallur',
          'Navaly',
          'Navatkuli',
          'Nelliady',
          'Nelliyady',
          'Palaly',
          'Point Pedro',
          'Polikandy',
          'Puttur',
          'Sandilipay',
          'Tellippalai',
          'Thampalai',
          'Thirunelveli',
          'Thondaimanaru',
          'Thoppu',
          'Thumpalai',
          'Tirunelveli East',
          'Tirunelveli West',
          'Udupiddy',
          'Uduthurai',
          'Uduvil',
          'Urelu',
          'Urumpirai',
          'Vaddukkoddai East',
          'Vaddukkoddai West',
          'Vaddukoddai',
          'Valalai',
          'Vallipuram',
          'Valveddi',
          'Varani',
          'Velanai',
          'Vellampakkaddy',
          'Vidattalpalai',
          'Viyaparimulai',

        ]
      },
      {
        name: 'Kilinochchi', districts: ['Kandavalai',
          'Karachchi',
          'Kilinochchi',
          'Pachchilaipalli',
          'Pallai',
          'Poonakary',

        ]
      },
      {
        name: 'Mannar', districts: ['Madhu',
          'Mannar',
          'Manthai West',
          'Musali',
          'Nanaddan',
          'Adampan',
          'Chilawathurai',
        ]
      },
      {
        name: 'Matale', districts: ['Elkaduwa',
          'Galewela',
          'Gammaduwa',
          'Kaikawala',
          'Kawatayamuna',
          'Maligatenna',
          'Nalanda',
          'Naula',
          'Palapathwela',
          'Pallepola',
          'Rattota',
          'Sigiriya',
          'Ukuwela',
          'Wahacotte',
          'Wehera',
          'Yatawatta',

        ]
      },
      {
        name: 'Matara', districts: ['Mirissa',
          'Morawaka',
          'Mulatiyana',
          'Nupe',
          'Pasgoda',
          'Pitabeddara',
          'Thelijjawila',
          'Thihagoda',
          'Tihagoda',
          'Weligama',
          'Welihinda',
          'Welipitiya',
          'Mirissa',
          'Morawaka',
          'Mulatiyana',
          'Nupe',
        ]
      },
      {
        name: 'Mullaitivu', districts: ['Ehatugaswewa',
          'Manthai East',
          'Maritimepattu',
          'Mullaitivu',
          'Oddusuddan',
          'Pandiyankulam',
          'Puthukkudiyiruppu',
          'Thunukkai',
          'Weli Oya (Manal Aru)',

        ]
      },
      {
        name: 'Polonnaruwa', districts: ['Bakamuna',
          'Dimbulagala',
          'Elahera',
          'Hingurakgoda',
          'Lankapura',
          'Manampitiya',
          'Medirigiriya',
          'Polonnaruwa',
          'Thalpotha',
        ]
      },
      {
        name: 'Sabaragamuwa', districts: ['Aguruwalla',
          'Ambepussa',
          'Aranayaka',
          'Balangoda',
          'Belihuloya',
          'Bulathkohupitiya',
          'Dehiowita',
          'Deraniyagala',
          'Eheliyagoda',
          'Embilipitiya',
          'Godakawela',
          'Imbulpe',
          'Kalawana',
          'Karawanalla',
          'Kegalle',
          'Kitulgala',
          'Kuruwita',
          'Mawanella',
          'Panamure',
          'Rakwana',
          'Rambukkana',
          'Ratnapura',
          'Ruwanwella',
          'Yatiyanthota',
        ]
      },
      {
        name: 'Sri Jayawardenepura Kotte', districts: ['Bandaranayakapura',
          'Ethul Kotte',
          'Ethul Kotte West',
          'Gangodavila East',
          'Gangodavila North',
          'Gangodavila South',
          'Gangodavila West',
          'Koswatta',
          'Meda Welikada',
          'Moragasmulla',
          'Nawala East',
          'Nawala West',
          'Nugegoda',
          'Nugegoda East',
          'Nugegoda West',
          'Obesekarapura',
          'Pagoda',
          'Pagoda East',
          'Pagoda North',
          'Pagoda South',
          'Pitakotte',
          'Pitakotte East',
          'Pitakotte West',
          'Rajagiriya',
          'Welikada East',
          'Welikada North',
          'Welikada West',
        ]
      },
      {
        name: 'Trincomalee', districts: ['Kantale',
          'Kinniya',
          'Kuchchaveli',
          'Mutur',
          'Nilaveli',
          'Sampur, Trincomalee',
          'Thampalakamam',
          'Uppuveli',

        ]
      },
      {
        name: 'Uva', districts: ['Badulla',
          'Bandarawela',
          'Ella',
          'Haputale',
          'Monaragala',
          'Welimada',
          'Wellawaya',
        ]
      },
      {
        name: 'Vavuniya', districts: ['Cheddikulam',
          'Kurumankadu',
          'Nedunkeni',
          'Omanthai',
          'Pandarikulam',
          'Puliyankulam',

        ]
      },
      {
        name: 'Dehiwela-Mount Lavinia', districts: ['Attidiya',
          'Dehiwala',
          'Kalubowila',
          'Kohuwala',
          'Mount-Lavinia',
          'Nedimala',
          'Ratmalana',


        ]
      },
      {
        name: 'Gampaha', districts: ['Dompe',
          'Gampaha',
          'Ja-Ela',
          'Katana',
          'Kelaniya',
          'Kiridiwela',
          'Mahara',
          'Minuwangoda',
          'Mirigama',
          'Negombo',
          'Nittambuwa',
          'Wattala',

        ]
      },
      {
        name: 'Kalutara', districts: ['Agalawatta',
          'Baduraliya',
          'Bandaragama',
          'Beruwala',
          'Bulathsinhala',
          'Dodangoda',
          'Horana',
          'Ingiriya',
          'Kalutara',
          'Madurawela',
          'Matugama',
          'Millaniya',
          'Palindanuwara',
          'Panadura',
          'Walallavita',


        ]
      },
      {
        name: 'Kurunegala', districts: ['Alawwa',
          'Bingirya',
          'Dambadeniya',
          'Dandagamuwa',
          'Galgamuwa',
          'Girathalana',
          'Giriulla',
          'Gomugomuwa',
          'Hettipola',
          'Hiripitiya',
          'Ibbagamuwa',
          'Maho',
          'Mawathagama',
          'Melsiripura',
          'Narammala',
          'Nikaweratiya',
          'Panagamuwa',
          'Panduwasnuwara',
          'Pannala',
          'Pannawa',
          'Polgahawela',
          'Potuhera',
          'Ridigama',
          'Wariyapola',
          'Yapahuwa',

        ]
      },
      {
        name: 'Mahiyanganaya', districts: ['Ampara',
          'Badulla',
          'Kandy',
          'Monaragala',
          'Polonnaruwa',

        ]
      },
      {
        name: 'Negombo', districts: ['Akkarapanaha',
          'Athgala',
          'Basiyawatte',
          'Bolawalana',
          'Dalupotha',
          'Daluwakotuwa',
          'Dungalpitiya',
          'Duwa',
          'Duwane',
          'Ethukala',
          'Kadirana',
          'Kadolkale',
          'Kamachchodai',
          'Kandawala',
          'Kapumgoda',
          'Katana',
          'Kattuwa',
          'Katunayake',
          'Katuwapitiya',
          'Kimbulapitiya',
          'Kochchikade',
          'Kudapadu',
          'Kurana',
          'Mahahunupitiya',
          'Munnakkarai',
          'Muruthena',
          'Nugawala',
          'Palangathura',
          'Pallansena',
          'Periyamulla',
          'Pitipana',
          'Poruthota',
          'Raheemanabad',
          'Sarakkuwa',
          'Sellakanda',
          'Thaladuwa',
          'Thalahena',
          'Thillanduwa',
          'Thimbirigaskatuwa',
          'Udyar Thoppu',
          'Welihena',
          'Wella veediya',

        ]
      },
      {
        name: 'Nuwara Eliya', districts: ['Agrapatana',
          'Ambewela',
          'Bogawantalawa',
          'Bopattalawa',
          'Dayagama Bazaar',
          'Ginigathena',
          'Haggala',
          'Hanguranketha',
          'Hapugastalawa',
          'Hatton-Dikoya UC',
          'Kandapola',
          'Kotagala',
          'Koththallena',
          'Kotmale',
          'Labukele',
          'Laxapana',
          'Lindula-Talawakele UC',
          'Maskeliya',
          'Nanu Oya',
          'Nildandahinna',
          'Norton',
          'Norton Bridge',
          'Nuwara Eliya',
          'Padiyapelella',
          'Pattipola',
          'Pundaluoya',
          'Ragala',
          'Ramboda',
          'Rikillagaskada',
          'Rozella',
          'Udapussallawa',
          'Walapane',
          'Watawala',

        ]
      },
      {
        name: 'Puttalam', districts: ['Anamaduwa',
          'Battuluoya',
          'Dankotuwa',
          'Eluvankulam',
          'Kalpitiya',
          'Katuneriya',
          'Madampe',
          'Mahawewa',
          'Marawila',
          'Mundel',
          'Nainamadama',
          'Nattandiya',
          'Nuraicholai',
          'Palavi',
          'Thillayadi',
          'Wennappuwa',
        ]
      }, {
        name: 'Sri Jayewardenepura Kotte', districts: ['Bandaranayakapura',
          'Ethulkotte',
          'Gangodavila East',
          'Gangodavila West',
          'Koswatta',
          'Meda Welikada',
          'Moragasmulla',
          'Nawala East',
          'Nawala West',
          'Nugegoda East',
          'Nugegoda West',
          'Obesekarapura',
          'Pagoda North',
          'Pagoda South',
          'Pitakotte',
          'Pitakotte East',
          'Pitakotte West',
          'Rajagiriya',
        ]
      },



      ]
    }
  ];

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const handleCountryChange = (countryId) => {
    setSelectedCountry(countryId);
    setSelectedState(null); // Reset state when country changes
    setSelectedDistrict(null); // Reset district when country changes
  };
  //------------------------------------------------------------


  //-------------------------------------------------------------------------

  // const handlepressNav = () => {
  //   if (name.trim() === '' || dob === '' || selectedGender === null || selectedCountry === null || selectedState === null || selectedDistrict === null) {
  //     alert('Name, Date Of Birth, Gender, Country and state cannot be empty.');
  //   }
  //   else {
  //     navigation.navigate("SignUpTwo", { name, editedDate, selectedGender, selectedCountry, selectedState, selectedDistrict, })
  //   }

  // }

  const handlePressNav = () => {
    let isError = false;

    // Validation for name
    if (name.trim() === '') {
      setNameError('Name cannot be empty.');
      isError = true;
    } else {
      isError = false;
      setNameError('');

    }

    // Validation for date of birth
    if (editedDate === '') {
      setDobError('Date of Birth cannot be empty.');
      isError = true;
    } else {
      setDobError('');
    }

    // Validation for gender
    if (selectedGender === null) {
      setGenderError('Please select a gender.');
      isError = true;
    } else {
      setGenderError('');
    }

    // Validation for country
    if (selectedCountry === null) {
      setCountryError('Please select a country.');
      isError = true;
    } else {
      setCountryError('');
    }

    // Validation for state
    if (selectedState === null) {
      setStateError('Please select a state.');
      isError = true;
    } else {
      setStateError('');
    }

    // Validation for district
    if (selectedDistrict === null) {
      setDistrictError('Please select a district.');
      isError = true;
    } else {
      setDistrictError('');
    }

    // Navigate to next screen if there are no errors
    if (!isError) {
      navigation.navigate('SignUpTwo', {
        name,
        editedDate,
        selectedGender,
        selectedCountry,
        selectedState,
        selectedDistrict,
      });
    }
  };


  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editedDate, setEditedDate] = useState('');

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
    setEditedDate(formatDate(currentDate)); // Update the edited date
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  console.log('date format ', editedDate)

  const onEditedDateChange = (text) => {
    // Extract year, month, and day from the edited date string
    const [year, month, day] = text.split('-').map(Number);
    // Check if month is below 12 and day is below 31
    if (month <= 12 && day <= 31) {
      setEditedDate(text);
    }
  };

  console.log('erroe dob', dobError)

  console.log(selectedCountry)
  return (
    <View style={styles.container}>

      <ScrollView>
        <View style={styles.formContainer}>


          <View style={styles.headerContainer}>
            <Image style={{
              height: responsiveHeight(21),
              width: responsiveWidth(41), alignSelf: 'center'
            }} source={require("../../../Assets/Login_page/FH_logos.png")} resizeMode="stretch" />

          </View>
          {/* <View style={styles.titleContainer}> */}
          <Text style={styles.header}>Welcome to </Text>
          {/* </View> */}
          <View style={{ height: responsiveHeight(8), width: responsiveWidth(85), marginBottom: responsiveHeight(2), justifyContent: 'center', alignItems: 'center', }}>
            <Image style={{ height: responsiveHeight(7), width: responsiveWidth(85) }} source={require('../../../Assets/Login_page/Film_hook.png')} resizeMode="stretch" />

          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.boxContent}>

              {/* <ImageBackground style={styles.inputContainer} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch"> */}
                <TextInput
                  placeholder="WHAT IS YOUR NAME?"
                  placeholderTextColor="black"
                  value={name}
                  onChangeText={handleTextChange}
                  style={styles.input}


                />
              {/* </ImageBackground> */}
            </View>
            {nameError ? <Text style={styles.errorMessage}>{nameError}</Text> : null}

            <View style={{ flexDirection: 'row', height: responsiveHeight(8.3), alignItems: 'center', justifyContent: 'center', columnGap: responsiveWidth(5.9), marginBottom: responsiveHeight(1.2) }}>

              <TouchableOpacity
                onPress={openDatePicker}
                style={styles.datePickerButton}
              >
                <Text style={styles.buttonText}>D.O.B</Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  style={{color: "#000"}}
                  mode="date"
                  display="default"
                  onChange={onChange}
                  maximumDate={new Date()} // Set maximum date to current date
                />
              )}

              <View style={styles.selectedDateContainer}>
                {/* <ImageBackground style={styles.changeinputContainer} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch"> */}
                  <TextInput style={styles.selectedDateText}
                    value={editedDate}
                    placeholder='YYYY-MM-DD'
                    onChangeText={onEditedDateChange} // Update editedDate when TextInput changes
                  />
                {/* </ImageBackground> */}
              </View>
            </View>
            {dobError ? <Text style={styles.errorMessage}>{dobError}</Text> : null}


            <View style={styles.boxContent2}>
              {/* <ImageBackground style={styles.inputContainer} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch"> */}
                <View style={styles.selectContainer}>
                  <Picker
                    style={styles.picker}
                    selectedValue={selectedGender}
                    onValueChange={(itemValue) => setSelectedGender(itemValue)}>
                    <Picker.Item label="SELECT GENDER" value={null}  />
                    <Picker.Item label="Male" value="male"  />
                    <Picker.Item label="Female" value="female" />

                    <Picker.Item label="Others" value="others" />
                  </Picker>
                </View>
              {/* </ImageBackground> */}
            </View>
            {genderError ? <Text style={styles.errorMessage}>{genderError}</Text> : null}



            <View style={styles.boxContent2}>
              {/* <ImageBackground style={styles.inputContainer} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch"> */}
                <View style={styles.selectContainer}>
                  {/* <Text>Select Country:</Text> */}
                  <Picker
                    style={styles.picker}
                    selectedValue={selectedCountry}
                    onValueChange={(itemValue) => handleCountryChange(itemValue)}>
                    <Picker.Item label="SELECT COUNTRY" value={null} />
                    {countries.map(country => (
                      <Picker.Item key={country.id} label={country.name} value={country.name} />
                    ))}
                  </Picker>
                </View>
              {/* </ImageBackground> */}
            </View>

            {countryError ? <Text style={styles.errorMessage}>{countryError}</Text> : null}
            <View style={styles.boxContent2}>
              {/* <ImageBackground style={styles.inputContainer} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch"> */}
                {selectedCountry && (
                  <View style={styles.selectContainer}>
                    {/* <Text>Select State:</Text> */}
                    <Picker
                      style={styles.picker}
                      selectedValue={selectedState}
                      onValueChange={(itemValue) => setSelectedState(itemValue)}>
                      <Picker.Item label="SELECT STATE" value={null} />
                      {countries.find(country => country.name === selectedCountry).states.map((state, index) => (
                        <Picker.Item key={index} label={state.name} value={state.name} />
                      ))}
                    </Picker>
                  </View>

                )}
              {/* </ImageBackground> */}
            </View>
            {stateError ? <Text style={styles.errorMessage}>{stateError}</Text> : null}

            <View style={styles.boxContent2}>
              {/* <ImageBackground style={styles.inputContainer} source={require('../../../Assets/Login_page/Medium_B_User_Profile.png')} resizeMode="stretch"> */}
                {selectedState && (
                  <View style={styles.selectContainer}>
                    {/* <Text>Select District:</Text> */}
                    <Picker
                      style={styles.picker}

                      selectedValue={selectedDistrict}
                      onValueChange={(itemValue) => setSelectedDistrict(itemValue)}>
                      <Picker.Item label="SELECT DISTRICT" value={null} />
                      {countries.find(country => country.name === selectedCountry).states.find(state => state.name === selectedState).districts.map((district, index) => (
                        <Picker.Item key={index} label={district} value={district} />
                      ))}
                    </Picker>
                  </View>
                )}
              {/* </ImageBackground> */}
            </View>
            {districtError ? <Text style={styles.errorMessage}>{districtError}</Text> : null}

            {selectedDistrict && (
              <View style={styles.selectContainer}>
                {/* <Text>Selected Country: {countries.find(country => country.id === selectedCountry).name}</Text>
                <Text>Selected State: {selectedState}</Text>
                <Text>Selected District: {selectedDistrict}</Text> */}
              </View>
            )}

            <View style={{ flexDirection: 'row', margin: responsiveHeight(4), columnGap: responsiveWidth(23), marginTop: responsiveHeight(3) }}>
              <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backButton}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePressNav} style={styles.nextButton}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>STEP 2</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

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
    backgroundColor: '#F0F0F0',

    width: '100%',
    height: '100%'


  },
  errorMessage: {
    color: 'red',
    right:responsiveWidth(20),
    bottom:responsiveHeight(1.8),

  //  marginBottom: 5,
  },
  selectContainer: {
    marginBottom: 20,
  },
  picker: {
    width: responsiveWidth(87),
    borderRadius: 8,
    height: responsiveHeight(7),
    borderCurve: responsiveWidth(2),
    color : "#333",
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(2)
    // backgroundColor:'red',

  },
  boxContent2: {
    height: responsiveHeight(8.3),
    width: responsiveWidth(86),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
    borderRadius: responsiveWidth(3.2),
    borderWidth: responsiveWidth(0.3),
    color: 'black',
    margin: 1,



  },
  boxContent: {
    height: responsiveHeight(8.3),
    width: responsiveWidth(86),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
    borderRadius: responsiveWidth(3.2),
     borderWidth: responsiveWidth(0.3),
    color: 'black',
    margin: 1,



  },
  selectListBackground: {
    width: responsiveWidth(86),
    height: responsiveHeight(8.3),
    marginTop: responsiveWidth(4),
    marginBottom: responsiveWidth(2),
    resizeMode: 'cover', // or 'contain' depending on your preference
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
  changeinputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(45),
    height: responsiveHeight(6.1),
    borderRadius: responsiveWidth(2),
    // borderWidth: responsiveWidth(0.2),
    color: "black",
    overflow: "hidden",

  },
  // selectinputContainer:{
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: responsiveWidth(85),
  //   height: responsiveHeight(8),
  //   marginTop:responsiveWidth(4),
  //   marginBottom:responsiveWidth(2),
  // },
  formContainer: {
    width: '100%',

    // padding: responsiveWidth(3),
    backgroundColor: '#F0F0F0',
    borderRadius: responsiveWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(3),

  },
  headerContainer: {
    height: responsiveHeight(22),
    width: responsiveWidth(35),
    bottom: responsiveHeight(1),
    // borderWidth: 1

  },

  countryPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveWidth(83),
    paddingHorizontal: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
    height: responsiveHeight(5.5),
    backgroundColor: 'transparent'


  },
  header: {
    fontSize: responsiveFontSize(3.5),
    fontWeight: 'bold',
    // bottom: responsiveHeight(8.5),
    color: '#1e1ff5',
    fontFamily: 'ArianaVioleta-dz2K',
    textAlign: 'center',

  },
  menuTrigger: {
    fontSize: 24,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {

    height: responsiveHeight(6),
    borderColor: 'black',
    width: '90%',
    fontSize: responsiveFontSize(2),
    // right: responsiveWidth(2),
    color: 'black',
    fontWeight: '500'
  },

  // inputBirth: {
  //   flexDirection: 'row',
  //   // justifyContent:'center',
  //   alignItems: 'center',
  //   marginBottom: responsiveHeight(2),

  //   borderWidth: responsiveWidth(0.5),
  //   paddingHorizontal: responsiveWidth(4),
  //   borderRadius: responsiveWidth(2.6),
  //   height: responsiveHeight(8.1),
  //   width: responsiveWidth(86.7),
  //   borderColor: 'black',
  //   margin: responsiveWidth(1),
  //   fontSize: responsiveFontSize(2),
  //   fontWeight: '500'
  // },
  datePickerButton: {

    backgroundColor: 'black',
    borderRadius: responsiveWidth(4),
    justifyContent: 'center',
    alignItems: 'center',

    width: responsiveWidth(35),
    width: '35%',
    //paddingHorizontal: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
    height: responsiveHeight(6),
    borderWidth: responsiveWidth(0.6)
  },
  selectedDateContainer: {

    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: responsiveWidth(0.3),
    borderRadius: responsiveWidth(3.2),
    height: responsiveHeight(6),
    width: responsiveWidth(43),

    // shadowOffset: { width: 1, height: 4 }, // Shadow offset
    // shadowOpacity: 0.6, // Shadow opacity
    // shadowRadius: 2, // Shadow radius
    // elevation: 1,
    // shadowColor: 'gray',

  },
  selectedDateText: {
    fontSize: responsiveFontSize(2.1),
    color: "black",
   
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
    borderWidth: responsiveWidth(0.6),
    borderColor: 'black'
    //bottom: responsiveHeight(1.5)
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
    //bottom: responsiveHeight(1.5)

  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: responsiveFontSize(2)

  },
  IndustryButton: {
    width: responsiveWidth(20),
    //bottom: responsiveHeight(3.5),
    // left: responsiveWidth(55),

  }

})