import axios from 'axios';
import apiPaths from 'constants/api_paths';

const baseApiClient = axios.create({
  baseURL: apiPaths.baseApiUrl,
});

export default baseApiClient;
