/**
 * API Configuration
 * This file contains the base URL for the API endpoints
 * Use this in your frontend to make API calls
 */

const API_CONFIG = {
  // Development API base URL
  development: 'http://localhost:3000/api/v1',
  
  // Production API base URL
  production: 'https://caffinity.vercel.app/api/v1',
  
  // Get the current API base URL based on environment
  getBaseURL: () => {
    const env = process.env.NODE_ENV || 'development';
    return env === 'production' 
      ? API_CONFIG.production 
      : API_CONFIG.development;
  }
};

module.exports = API_CONFIG;
