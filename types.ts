
export enum BookingStatus {
  UPCOMING = 'UPCOMING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  BARBER = 'BARBER',
  ADMIN = 'ADMIN'
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  image?: string;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  rating: number;
  reviewCount: number;
  image: string;
  isOnline?: boolean;
}

export interface Booking {
  id: string;
  service: Service;
  barber: Barber;
  date: string;
  time: string;
  status: BookingStatus;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export interface User {
  id: string;
  name: string;
  tier: 'Free' | 'Gold' | 'Executive';
  points: number;
  walletBalance: number;
  avatar: string;
  role: UserRole;
}

export interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'booking' | 'system' | 'reward';
}
