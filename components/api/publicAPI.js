import axios from 'axios';

const PublicAPI = axios.create({
  baseURL: 'http://3.27.162.120:8080/filmhook-0.0.1-SNAPSHOT',
});

export default PublicAPI;
