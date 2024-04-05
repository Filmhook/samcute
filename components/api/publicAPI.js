import axios from 'axios';

const PublicAPI = axios.create({
  baseURL: 'https://filmhook.annularprojects.com/filmhook-0.0.1',
});

export default PublicAPI;
