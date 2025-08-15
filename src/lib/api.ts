import axios from 'axios';

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.themabinti.com/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
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
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
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
  },
  services: {
    list: '/services',
    featured: '/services/featured',
    categories: '/services/categories',
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