

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const privateAPI = axios.create({
  baseURL: 'https://filmhook.annularprojects.com/filmhook-0.0.1-SNAPSHOT',
});

privateAPI.interceptors.request.use(async (config) => {
 const appToken = await AsyncStorage.getItem("jwt");
 console.log(appToken)
 if (appToken) {
   config.headers.Authorization = `Bearer ${appToken}`;
 }
 return config;
});

export default privateAPI;
