// // src/api/axios.js
// import axios from 'axios';

// const instance = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['x-auth-token'] = token;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default instance;


import axios from 'axios';

// Create an Axios instance with a default baseURL and content-type header
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api', // Using environment variable or fallback to local backend
  headers: {
    'Content-Type': 'application/json', // Default content type for the API
  },
});

// Request interceptor to add token to request headers if available
instance.interceptors.request.use(
  (config) => {
    // Get token from local storage if present
    const token = localStorage.getItem('token');
    if (token) {
      // Add token to request headers
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    // Reject the promise with error if any occurs during the request setup
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally (Optional)
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check for specific error responses and handle them (Optional)
    if (error.response && error.response.status === 401) {
      // Handle Unauthorized (e.g., token expired) here if needed
      console.log('Unauthorized access - token expired or invalid');
    }
    return Promise.reject(error);
  }
);

export default instance;
