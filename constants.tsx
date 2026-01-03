
import { BookingStatus, Plan, Service, Barber, User, UserRole, Transaction, ChatMessage, Notification } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'أحمد الشربيني',
  tier: 'Gold',
  points: 1250,
  walletBalance: 45.000, 
  avatar: 'https://picsum.photos/seed/ahmed/200/200',
  role: UserRole.CUSTOMER
};

export interface CategorizedService extends Service {
  category: string;
}

export const SERVICES: CategorizedService[] = [
  // Haircut Services
  { id: 'h1', category: 'Haircut', name: 'Men’s Classic Haircut', description: 'Traditional cut with precision finish.', price: 8, duration: 45, image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=200' },
  { id: 'h2', category: 'Haircut', name: 'Modern Haircut (Fade / Taper)', description: 'Sharp edges and professional fading.', price: 10, duration: 60, image: 'https://images.unsplash.com/photo-1621605815841-28d944f33bb2?auto=format&fit=crop&q=80&w=200' },
  { id: 'h3', category: 'Haircut', name: 'Express Haircut', description: 'Quick trim for busy schedules.', price: 6, duration: 30, image: 'https://images.unsplash.com/photo-1593702295094-01369527339f?auto=format&fit=crop&q=80&w=200' },
  { id: 'h4', category: 'Haircut', name: 'Kids Haircut', description: 'Gentle styling for young ones.', price: 6, duration: 30, image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=200' },
  { id: 'h5', category: 'Haircut', name: 'Kids Haircut (Sensitive)', description: 'Extra care for first-time haircuts.', price: 7, duration: 40, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=200' },
  { id: 'h6', category: 'Haircut', name: 'Haircut with Style Consultation', description: 'Expert advice on your best look.', price: 12, duration: 75, image: 'https://images.unsplash.com/photo-1599351431247-f10bc1929340?auto=format&fit=crop&q=80&w=200' },
  
  // Beard & Grooming
  { id: 'b1', category: 'Beard', name: 'Beard Trim', description: 'Simple clean up and shortening.', price: 4, duration: 20, image: 'https://images.unsplash.com/photo-1621605815841-28d944f33bb2?auto=format&fit=crop&q=80&w=200' },
  { id: 'b2', category: 'Beard', name: 'Beard Shape & Line-Up', description: 'Sharp contours with razor finish.', price: 6, duration: 30, image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=200' },
  { id: 'b3', category: 'Beard', name: 'Hot Towel Beard Service', description: 'Luxury relaxing beard grooming.', price: 8, duration: 40, image: 'https://images.unsplash.com/photo-1590540179852-211d6b45e390?auto=format&fit=crop&q=80&w=200' },
  { id: 'b4', category: 'Beard', name: 'Full Beard Grooming', description: 'Deep wash, trim, and conditioning.', price: 10, duration: 50, image: 'https://images.unsplash.com/photo-1532710093739-9470acff878f?auto=format&fit=crop&q=80&w=200' },
  { id: 'b5', category: 'Beard', name: 'Mustache Trim', description: 'Detailing and shaping for your stache.', price: 3, duration: 15, image: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&q=80&w=200' },

  // Kids Special
  { id: 'k1', category: 'Kids', name: 'Cartoon Experience Haircut', description: 'Fun atmosphere with cartoons.', price: 8, duration: 45, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=200' },
  { id: 'k2', category: 'Kids', name: 'Kids Haircut + Small Gift', description: 'A reward for the brave ones.', price: 9, duration: 45, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=200' },
  { id: 'k3', category: 'Kids', name: 'Stress-Free Kids Haircut', description: 'Patient approach for nervous kids.', price: 10, duration: 60, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=200' },
  { id: 'k4', category: 'Kids', name: 'Kids Hair Styling', description: 'Gel, wax and spikes for a party.', price: 5, duration: 20, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=200' },

  // Premium & Add-Ons
  { id: 'p1', category: 'Premium', name: 'Scalp Massage', description: 'Relaxing 15 min head massage.', price: 5, duration: 15, image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=200' },
  { id: 'p2', category: 'Premium', name: 'Hair Wash & Blow Dry', description: 'Professional wash and styling.', price: 5, duration: 25, image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=200' },
  { id: 'p3', category: 'Premium', name: 'Face Clean-Up', description: 'Deep cleaning after your cut.', price: 7, duration: 30, image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=200' },
  { id: 'p4', category: 'Premium', name: 'Hair/Beard Coloring', description: 'Premium dye for a fresh look.', price: 15, duration: 90, image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=200' },

  // Packages
  { id: 'pkg1', category: 'Packages', name: 'Father & Son Package', description: 'Quality bonding time.', price: 12, duration: 90, image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=200' },
  { id: 'pkg2', category: 'Packages', name: 'Family Haircut Package', description: 'Up to 3 family members.', price: 20, duration: 150, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=200' },
  { id: 'pkg3', category: 'Packages', name: 'Special Occasion Grooming', description: 'Weddings & major events.', price: 25, duration: 120, image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=200' },
  { id: 'pkg4', category: 'Packages', name: 'Premium Grooming Package', description: 'The ultimate full treatment.', price: 30, duration: 180, image: 'https://images.unsplash.com/photo-1590540179852-211d6b45e390?auto=format&fit=crop&q=80&w=200' },
];

export const BARBERS: Barber[] = [
  { id: 'b1', name: 'معاذ محمد', role: 'Master Barber', rating: 4.9, reviewCount: 156, image: 'https://picsum.photos/seed/barber1/200/200', isOnline: true },
];

export const BOOKINGS: any[] = [
  { id: 'bk1', serviceName: 'Premium Cut', barberName: 'معاذ محمد', date: 'Today, 2:00 PM', duration: '1h', price: 12, status: BookingStatus.UPCOMING, barberImage: 'https://picsum.photos/seed/barber1/100/100' }
];

export const PLANS: Plan[] = [
  { id: 'p1', name: 'Starter', price: 10, features: ['1 Haircut/Month', 'Standard Booking'], ctaText: 'Join Now' },
  { id: 'p2', name: 'Sharpest', price: 18, features: ['2 Haircuts/Month', 'Beard Trim Included', 'Rollover Sessions'], isPopular: true, ctaText: 'Start Free Trial' }
];

export const TRANSACTIONS: Transaction[] = [
  { id: 't1', title: 'Royal Shave Payment', date: 'Oct 12, 2023', amount: -15.000, type: 'debit' },
  { id: 't2', title: 'Wallet Top-up', date: 'Oct 10, 2023', amount: 50.000, type: 'credit' },
];

export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Booking Confirmed', message: 'Your session with Muaz Mohamed is at 2:00 PM today.', time: '1h ago', isRead: false, type: 'booking' },
];

export const CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm1', senderId: 'b1', text: 'Hello! Looking forward to your visit.', timestamp: '09:00 AM' },
];
