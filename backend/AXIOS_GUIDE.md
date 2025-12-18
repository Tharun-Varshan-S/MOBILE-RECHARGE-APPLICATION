# Axios Integration Guide for Frontend

## Base Setup (`src/api/axios.js`)

Create a centralized Axios instance to handle requests and token management automatically.

```javascript
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Adjust if backend port differs
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the Token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Or from Context/State
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
```

## Usage Examples

### 1. Authentication

**Login:**
```javascript
import api from './api/axios';

const login = async (email, password) => {
    try {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('Login failed:', error.response?.data?.message);
        throw error;
    }
};
```

**Register:**
```javascript
const register = async (userData) => {
    const { data } = await api.post('/auth/register', userData);
    return data;
};
```

### 2. Plans

**Fetch All Plans:**
```javascript
const fetchPlans = async (filters = {}) => {
    // filters example: { operator: 'Airtel', type: 'Prepaid' }
    const { data } = await api.get('/plans', { params: filters });
    return data;
};
```

**Admin - Create Plan:**
```javascript
const createPlan = async (planData) => {
    const { data } = await api.post('/plans', planData);
    return data;
};
```

### 3. Recharge

**Process Recharge:**
```javascript
const recharge = async (paymentDetails) => {
    /* 
      paymentDetails: { 
        mobileNumber: '9876543210', 
        operator: 'Jio', 
        amount: 299, 
        planId: 'optional_plan_id' 
      } 
    */
    const { data } = await api.post('/recharge', paymentDetails);
    return data;
};
```

**Get History:**
```javascript
const getHistory = async () => {
    const { data } = await api.get('/recharge/history');
    return data;
};
```

### 4. Notifications

```javascript
const getNotifications = async () => {
    const { data } = await api.get('/users/notifications');
    return data;
};
```
