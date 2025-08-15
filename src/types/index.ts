export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'seller' | 'admin';
  email_verified_at?: string;
  phone_verified_at?: string;
  seller_package?: 'basic' | 'premium' | 'professional';
  package_expires_at?: string;
  avatar?: string;
  location?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  location: string;
  mobile_service: boolean;
  is_active: boolean;
  media: ServiceMedia[];
  seller: User;
  rating: number;
  reviews_count: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceMedia {
  id: string;
  url: string;
  type: 'image' | 'video';
  is_primary: boolean;
}

export interface Appointment {
  id: string;
  service: Service;
  customer: User;
  seller: User;
  preferred_date: string;
  preferred_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  total_amount: number;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  user: User;
  appointment?: Appointment;
  amount: number;
  type: 'service_booking' | 'package_upgrade';
  status: 'pending' | 'completed' | 'failed';
  mpesa_checkout_request_id?: string;
  mpesa_receipt_number?: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image?: string;
  author: User;
  status: 'draft' | 'published';
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'responded';
  admin_response?: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface DashboardStats {
  total_users: number;
  total_sellers: number;
  total_services: number;
  total_appointments: number;
  total_revenue: number;
  monthly_revenue: Array<{
    month: string;
    revenue: number;
  }>;
  appointment_statuses: Array<{
    status: string;
    count: number;
  }>;
}