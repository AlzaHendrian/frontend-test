import axios from 'axios';


console.log(process.env.VUE_APP_API_LOCAL, "<<< API URL from .env");
const request = axios.create({
  baseURL: process.env.VUE_APP_API_LOCAL,
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