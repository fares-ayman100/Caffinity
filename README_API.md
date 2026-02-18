# API Configuration Guide

## Base URL

جميع الـ API endpoints تبدأ بـ `/api/v1`

### Development
```
http://localhost:3000/api/v1
```

### Production
```
https://caffinity.vercel.app/api/v1
```

## كيفية استخدام API في Frontend

### 1. استخدام Environment Variables (مُوصى به)

#### React/Vue/Angular
أنشئ ملف `.env` في مشروع الـ frontend:

```env
REACT_APP_API_URL=http://localhost:3000/api/v1
```

أو للإنتاج:
```env
REACT_APP_API_URL=https://caffinity.vercel.app/api/v1
```

ثم استخدمه في الكود:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL;

fetch(`${API_BASE_URL}/products`)
```

### 2. استخدام Config File

أنشئ ملف `config/apiConfig.js` في مشروع الـ frontend:

```javascript
const API_CONFIG = {
  development: 'http://localhost:3000/api/v1',
  production: 'https://caffinity.vercel.app/api/v1',
  
  getBaseURL: () => {
    const isDev = window.location.hostname === 'localhost';
    return isDev ? API_CONFIG.development : API_CONFIG.production;
  }
};

export default API_CONFIG;
```

### 3. استخدام Axios Instance

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

## API Endpoints

جميع الـ endpoints متاحة في Swagger Documentation:
- Development: `http://localhost:3000/api-docs`
- Production: `https://caffinity.vercel.app/api-docs`

### Main Endpoints:

- **Authentication**: `/api/v1/users/signup`, `/api/v1/users/signin`, `/api/v1/users/logout`
- **Products**: `/api/v1/products`
- **Users**: `/api/v1/users`
- **Reviews**: `/api/v1/reviews`
- **Orders**: `/api/v1/orders`

## Authentication

جميع الـ endpoints المحمية تتطلب JWT token في الـ Authorization header:

```
Authorization: Bearer <your-token>
```

Token يتم إرجاعه من:
- `/api/v1/users/signup`
- `/api/v1/users/signin`
- `/api/v1/users/resetPassword/{token}`
