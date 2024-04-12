import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const privateAPI = axios.create({
  baseURL: 'https://filmhook.annularprojects.com/filmhook-0.0.1-SNAPSHOT',
});

privateAPI.interceptors.request.use(async (config) => {
 const jwt = await AsyncStorage.getItem("jwt");
 if (jwt) {
   config.headers.Authorization = `Bearer ${jwt}`;
 }
 return config;
});

export default privateAPI;
