/**
 * API Configuration Example for Frontend
 * 
 * Copy this file to your frontend project and use it to configure API base URL
 * 
 * Example usage in React/Vue/Angular:
 * 
 * import apiConfig from './config/apiConfig';
 * 
 * const API_BASE_URL = apiConfig.getBaseURL();
 * 
 * // Then use it in your API calls:
 * fetch(`${API_BASE_URL}/products`)
 * 
 * Or create an axios instance:
 * 
 * import axios from 'axios';
 * import apiConfig from './config/apiConfig';
 * 
 * const api = axios.create({
 *   baseURL: apiConfig.getBaseURL()
 * });
 * 
 * // Then use it:
 * api.get('/products')
 */

const API_CONFIG = {
  // Development API base URL
  development: 'http://localhost:3000/api/v1',
  
  // Production API base URL
  production: 'https://caffinity.vercel.app/api/v1',
  
  // Get the current API base URL based on environment
  getBaseURL: () => {
    // For frontend, you can use window.location or environment variables
    const isDevelopment = window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1' ||
                          process.env.REACT_APP_ENV === 'development';
    
    return isDevelopment 
      ? API_CONFIG.development 
      : API_CONFIG.production;
  }
};

export default API_CONFIG;
