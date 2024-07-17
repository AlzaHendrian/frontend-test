import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  timeout: 8000,
});

// Tambahkan interceptors jika diperlukan
request.interceptors.request.use(
    (config) => {
      // Tambahkan headers khusus ke config
      config.headers['Content-Type'] = 'application/json';
      config.headers['Accept-Language'] = 'en-US';
      return config;
    },
    (error) => {
      // Tangani error sebelum permintaan dikirim
      return Promise.reject(error);
    }
  );
  
  // Response interceptor
  request.interceptors.response.use(
    (response) => {
      // Modifikasi respons sebelum diteruskan ke then atau catch
      return response;
    },
    (error) => {
      // Tangani error global
      if (error.response.status === 404) {
        // Contoh: tangani not found error
        alert('Resource not found!');
      }
      return Promise.reject(error);
    }
  );

export default request;