import axios from 'axios';
import Cookies from 'js-cookie';

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.themabinti.com/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token') || Cookies.get('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      Cookies.remove('auth_token');
      
      // Redirect to login if not already there
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    me: '/auth/me',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    verifyEmail: '/auth/verify-email',
    verifyPhone: '/auth/verify-phone',
    sendPhoneOtp: '/auth/send-phone-otp',
  },
  services: {
    list: '/services',
    featured: '/services/featured',
    categories: '/services/categories',
    locations: '/services/locations',
    show: (id: string) => `/services/${id}`,
    create: '/seller/services',
    update: (id: string) => `/seller/services/${id}`,
    delete: (id: string) => `/seller/services/${id}`,
    myServices: '/seller/services/my',
    toggle: (id: string) => `/seller/services/${id}/toggle`,
  },
  bookings: {
    create: '/bookings',
    list: '/bookings',
    show: (id: string) => `/bookings/${id}`,
    cancel: (id: string) => `/bookings/${id}/cancel`,
    confirm: (id: string) => `/bookings/${id}/confirm`,
    complete: (id: string) => `/bookings/${id}/complete`,
  },
  payments: {
    initiateMpesa: '/payments/mpesa/initiate',
    checkStatus: (id: string) => `/payments/${id}/status`,
    history: '/payments/history',
    upgradePackage: '/payments/upgrade-package',
  },
  profile: {
    show: '/profile',
    update: '/profile',
    uploadAvatar: '/profile/avatar',
  },
  blog: {
    list: '/blog',
    show: (slug: string) => `/blog/${slug}`,
    create: '/admin/blog',
    update: (id: string) => `/admin/blog/${id}`,
    delete: (id: string) => `/admin/blog/${id}`,
    toggle: (id: string) => `/admin/blog/${id}/toggle`,
  },
  contact: {
    send: '/contact',
    list: '/admin/contacts',
    show: (id: string) => `/admin/contacts/${id}`,
    respond: (id: string) => `/admin/contacts/${id}/respond`,
  },
  admin: {
    dashboard: '/admin/dashboard',
    users: '/admin/users',
    userToggle: (id: string) => `/admin/users/${id}/toggle`,
    userDelete: (id: string) => `/admin/users/${id}`,
    services: '/admin/services',
    serviceToggle: (id: string) => `/admin/services/${id}/toggle`,
    payments: '/admin/payments',
    appointments: '/admin/appointments',
    appointmentUpdate: (id: string) => `/admin/appointments/${id}/status`,
  },
};

// File upload helper
export const uploadFile = async (file: File, endpoint: string) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

// M-Pesa payment helper
export const initiateMpesaPayment = async (phone: string, amount: number, type: string = 'service_booking', reference?: string) => {
  const response = await api.post(endpoints.payments.initiateMpesa, {
    phone,
    amount,
    type,
    reference,
  });
  
  return response.data;
};

// Poll payment status
export const pollPaymentStatus = async (paymentId: string, maxAttempts: number = 30) => {
  let attempts = 0;
  
  return new Promise((resolve, reject) => {
    const poll = async () => {
      try {
        attempts++;
        const response = await api.get(endpoints.payments.checkStatus(paymentId));
        const { status } = response.data;
        
        if (status === 'completed' || status === 'failed') {
          resolve(response.data);
        } else if (attempts >= maxAttempts) {
          reject(new Error('Payment status check timeout'));
        } else {
          setTimeout(poll, 2000); // Poll every 2 seconds
        }
      } catch (error) {
        reject(error);
      }
    };
    
    poll();
  });
};