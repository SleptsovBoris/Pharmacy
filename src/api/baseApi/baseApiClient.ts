import axios from 'axios';

const baseApiClient = axios.create({
  baseURL: 'http://localhost:5240',
});

export default baseApiClient;
