import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  timeout: 8000,
});

request.interceptors.request.use(
    (config) => { 
      config.headers['Content-Type'] = 'application/json';
      config.headers['Accept-Language'] = 'en-US';
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
 
  request.interceptors.response.use(
    (response) => {   
      return response;
    },
    (error) => {
      if (error.response.status === 404) { 
        alert('Resource not found!');
      }
      return Promise.reject(error);
    }
  );

export default request;