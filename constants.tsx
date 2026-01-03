
import { BookingStatus, Plan, Service, Barber, User, UserRole, Transaction, ChatMessage, Notification } from './types';

// Temporary Placeholder Image: Yellow background with black "DC" text
export const PLACEHOLDER_IMAGE = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNlYWIzMDgiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkludGVyLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iOTAwIiBmb250LXNpemU9IjYwIiBmaWxsPSJibGFjayIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRDPC90ZXh0Pjwvc3ZnPg==`;

export const MOCK_USER: User = {
  id: 'u1',
  name: 'أحمد الشربيني',
  tier: 'Gold',
  points: 1250,
  walletBalance: 45.000, 
  avatar: PLACEHOLDER_IMAGE,
  role: UserRole.CUSTOMER
};

export interface CategorizedService extends Service {
  category: string;
}

export const SERVICES: CategorizedService[] = [
  { 
    id: 'h1', category: 'Haircut', 
    name: 'Men’s Classic Haircut', 
    description: 'A traditional haircut using clean lines and balanced length, tailored to your head shape and personal style.',
    idealFor: 'Everyday professional and casual looks.',
    price: 8.000, duration: 45, image: PLACEHOLDER_IMAGE 
  },
  { 
    id: 'h2', category: 'Haircut', 
    name: 'Modern Haircut (Fade / Taper / Undercut)', 
    description: 'A modern style featuring smooth fades or sharp contrasts for a fresh, stylish appearance.',
    idealFor: 'Trend-focused clients who want a clean, modern look.',
    price: 10.000, duration: 60, image: PLACEHOLDER_IMAGE 
  },
  { 
    id: 'h3', category: 'Haircut', 
    name: 'Express Haircut', 
    description: 'A quick and efficient haircut focused on trimming and shaping without extra services.',
    idealFor: 'Clients with limited time.',
    price: 6.000, duration: 30, image: PLACEHOLDER_IMAGE 
  },
  { 
    id: 'h4', category: 'Haircut', 
    name: 'Kids Haircut', 
    description: 'A gentle haircut designed to keep kids comfortable and relaxed throughout the session.',
    idealFor: 'Children of all ages.',
    price: 6.000, duration: 30, image: PLACEHOLDER_IMAGE 
  },
  { 
    id: 'h5', category: 'Haircut', 
    name: 'Kids Haircut (Sensitive / First Time)', 
    description: 'A calm, patient haircut experience for kids who are nervous or getting their first haircut.',
    idealFor: 'First-time or sensitive children.',
    price: 7.000, duration: 40, image: PLACEHOLDER_IMAGE 
  },
  { 
    id: 'h6', category: 'Haircut', 
    name: 'Haircut with Style Consultation', 
    description: 'A personalized haircut combined with expert advice on the best style for your face shape and hair type.',
    idealFor: 'Clients looking for a new or improved look.',
    price: 12.000, duration: 75, image: PLACEHOLDER_IMAGE 
  },
  { 
    id: 'b1', category: 'Beard', 
    name: 'Beard Trim', 
    description: 'Careful trimming to maintain your beard’s length and natural shape.',
    idealFor: 'Regular beard maintenance.',
    price: 4.000, duration: 20, image: PLACEHOLDER_IMAGE 
  },
  { 
    id: 'b2', category: 'Beard', 
    name: 'Beard Shape & Line-Up', 
    description: 'Precise shaping and clean lines to define your beard and enhance facial features.',
    idealFor: 'Sharp, well-defined beard styles.',
    price: 6.000, duration: 30, image: PLACEHOLDER_IMAGE 
  },
  { 
    id: 'b3', category: 'Beard', 
    name: 'Hot Towel Beard Service', 
    description: 'A relaxing hot towel treatment to soften the beard and open pores before trimming.',
    idealFor: 'A premium grooming experience.',
    price: 8.000, duration: 40, image: PLACEHOLDER_IMAGE 
  },
  { 
    id: 'b4', category: 'Beard', 
    name: 'Full Beard Grooming', 
    description: 'Complete beard care including trimming, shaping, and conditioning products.',
    idealFor: 'Clients who want full beard maintenance.',
    price: 10.000, duration: 50, image: PLACEHOLDER_IMAGE 
  },
  { 
    id: 'b5', category: 'Beard', 
    name: 'Mustache Trim', 
    description: 'Detailed trimming to keep the mustache neat and well-shaped.',
    idealFor: 'Clean and polished looks.',
    price: 3.000, duration: 15, image: PLACEHOLDER_IMAGE 
  },
  { 
    id: 'k1', category: 'Kids', 
    name: 'Kids Haircut with Cartoon Experience', 
    description: 'A fun haircut experience with cartoons to keep kids entertained and relaxed.',
    idealFor: 'Kids who need distraction during haircuts.',
    price: 8.000, duration: 45, image: PLACEHOLDER_IMAGE 
  },
  { 
    id: 'k2', category: 'Kids', 
    name: 'Kids Haircut + Small Gift', 
    description: 'A friendly haircut followed by a small reward to make the experience positive.',
    idealFor: 'Encouraging kids to enjoy haircuts.',
    price: 9.000, duration: 45, image: PLACEHOLDER_IMAGE 
  },
  { 
    id: 'k3', category: 'Kids', 
    name: 'Stress-Free Kids Haircut', 
    description: 'A slow-paced, gentle haircut focused on comfort and safety.',
    idealFor: 'Kids with anxiety or sensory sensitivity.',
    price: 10.000, duration: 60, image: PLACEHOLDER_IMAGE 
  },
  { 
    id: 'k4', category: 'Kids', 
    name: 'Kids Hair Styling', 
    description: 'Light styling using kid-safe products after the haircut.',
    idealFor: 'Special occasions or photo-ready looks.',
    price: 5.000, duration: 20, image: PLACEHOLDER_IMAGE 
  },
  { 
    id: 'p1', category: 'Premium', 
    name: 'Scalp Massage', 
    description: 'A relaxing head massage to improve comfort and blood circulation.',
    idealFor: 'Stress relief and relaxation.',
    price: 5.000, duration: 15, image: PLACEHOLDER_IMAGE 
  },
  { 
    id: 'p2', category: 'Premium', 
    name: 'Hair Wash & Blow Dry', 
    description: 'Professional hair washing followed by drying for a clean finish.',
    idealFor: 'Clients who want a refreshed look.',
    price: 5.000, duration: 25, image: PLACEHOLDER_IMAGE 
  },
  { 
    id: 'p3', category: 'Premium', 
    name: 'Face Clean-Up After Haircut', 
    description: 'Gentle facial cleaning to remove hair residue and refresh the skin.',
    idealFor: 'A clean, fresh finish.',
    price: 7.000, duration: 30, image: PLACEHOLDER_IMAGE 
  },
  { 
    id: 'p4', category: 'Premium', 
    name: 'Hair Coloring / Beard Coloring', 
    description: 'Natural-looking color application to enhance or refresh hair or beard color.',
    idealFor: 'Covering gray hair or changing style.',
    price: 15.000, duration: 90, image: PLACEHOLDER_IMAGE 
  },
  { 
    id: 'pkg1', category: 'Packages', 
    name: 'Father & Son Package', 
    description: 'A bundled haircut service for fathers and their children at a special rate.',
    idealFor: 'Family grooming sessions.',
    price: 12.000, duration: 90, image: PLACEHOLDER_IMAGE 
  },
  { 
    id: 'pkg2', category: 'Packages', 
    name: 'Family Haircut Package', 
    description: 'Multiple haircuts for family members in one booking.',
    idealFor: 'Families booking together.',
    price: 20.000, duration: 150, image: PLACEHOLDER_IMAGE 
  },
  { 
    id: 'pkg3', category: 'Packages', 
    name: 'Special Occasion Grooming (Weddings / Events)', 
    description: 'Complete grooming service for important events.',
    idealFor: 'Weddings, parties, and formal occasions.',
    price: 25.000, duration: 120, image: PLACEHOLDER_IMAGE 
  },
  { 
    id: 'pkg4', category: 'Packages', 
    name: 'Premium Grooming Package', 
    description: 'A full grooming experience combining haircut, beard care, and relaxation services.',
    idealFor: 'Clients seeking a luxury experience.',
    price: 30.000, duration: 180, image: PLACEHOLDER_IMAGE 
  },
  { 
    id: 'pkg5', category: 'Packages', 
    name: 'Monthly Haircut Subscription', 
    description: 'Scheduled haircuts every month at a discounted price.',
    idealFor: 'Regular clients.',
    price: 25.000, duration: 60, image: PLACEHOLDER_IMAGE 
  },
];

export const BARBERS: Barber[] = [
  { id: 'b1', name: 'معاذ محمد', role: 'Master Barber', rating: 4.9, reviewCount: 156, image: PLACEHOLDER_IMAGE, isOnline: true },
];

export const BOOKINGS: any[] = [
  { id: 'bk1', serviceName: 'Royal Shave & Cut', barberName: 'معاذ محمد', date: '24 Oct', time: '14:00', duration: '1h', price: 12.000, status: BookingStatus.UPCOMING, barberImage: PLACEHOLDER_IMAGE },
  { id: 'bk2', serviceName: 'Beard Shape & Line-Up', barberName: 'معاذ محمد', date: '10 Oct', time: '11:30', duration: '30m', price: 6.000, status: BookingStatus.COMPLETED, barberImage: PLACEHOLDER_IMAGE },
  { id: 'bk3', serviceName: 'Express Haircut', barberName: 'معاذ محمد', date: '28 Sep', time: '16:00', duration: '30m', price: 6.000, status: BookingStatus.COMPLETED, barberImage: PLACEHOLDER_IMAGE }
];

export const PLANS: Plan[] = [
  // Individual Plans
  { id: 'p1', category: 'Individual', name: 'Starter', price: 10, features: ['1 Haircut/Month', 'Standard Booking'], ctaText: 'Join Now' },
  { id: 'p2', category: 'Individual', name: 'Essential Plus', price: 14, features: ['2 Haircuts per Month', 'Standard Booking', 'Flexible Scheduling'], ctaText: 'Join Now' },
  { id: 'p3', category: 'Individual', name: 'Sharpest', price: 18, features: ['2 Haircuts/Month', 'Beard Trim Included', 'Rollover Sessions'], isPopular: true, ctaText: 'Start Free Trial' },
  { id: 'p4', category: 'Individual', name: 'Pro Groomer', price: 25, features: ['4 Haircuts per Month', 'Beard Trim Included', 'Priority Booking', 'Rollover Sessions'], ctaText: 'Join Now' },
  { id: 'p5', category: 'Individual', name: 'Elite', price: 35, features: ['Unlimited Haircuts (Fair Use)', 'Unlimited Beard Trims', 'VIP Priority Booking', 'Dedicated Top-Rated Barbers', 'Rollover Sessions'], isVIP: true, ctaText: 'Join Now' },
  
  // Family & Kids Plans
  { id: 'f1', category: 'Family', name: 'Father & Son', price: 22, features: ['2 Adult Haircuts', '1 Kids Haircut', 'Flexible Booking'], ctaText: 'Join Now' },
  { id: 'f2', category: 'Family', name: 'Kids Club', price: 12, features: ['2 Kids Haircuts per Month', 'Stress-Free Kids Experience', 'Kids-Safe Styling Products'], ctaText: 'Join Now' },
  
  // Business Plans
  { id: 'c1', category: 'Business', name: 'Corporate Grooming', price: 'Custom', features: ['Monthly or Weekly Sessions', 'Group Discounts', 'Priority Scheduling', 'On-Site or App-Based Booking'], ctaText: 'Contact Sales' },
];

export const TRANSACTIONS: Transaction[] = [
  { id: 't1', title: 'Royal Shave Payment', date: 'Oct 12, 2023', amount: -15.000, type: 'debit' },
  { id: 't2', title: 'Wallet Top-up', date: 'Oct 10, 2023', amount: 50.000, type: 'credit' },
];

// New Mock Data for Points History
export const POINTS_HISTORY = [
  { id: 'ph1', title: 'Welcome Bonus', amount: 500, date: 'Oct 01, 2023', type: 'earn' },
  { id: 'ph2', title: 'Haircut Reward', amount: 250, date: 'Oct 24, 2023', type: 'earn' },
  { id: 'ph3', title: 'Referral Bonus', amount: 500, date: 'Oct 15, 2023', type: 'earn' },
];

// New Mock Data for Locations
export const SAVED_LOCATIONS = [
  { id: 'loc1', name: 'Home', address: 'Villa 12, Road 45, Manama, Bahrain', type: 'home' },
  { id: 'loc2', name: 'Office', address: 'Harbour Towers, West Tower, 14th Floor, Bahrain', type: 'work' },
];

export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Booking Confirmed', message: 'Your session with Muaz Mohamed is at 2:00 PM today.', time: '1h ago', isRead: false, type: 'booking' },
];

export const CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm1', senderId: 'b1', text: 'Hello! Looking forward to your visit.', timestamp: '09:00 AM' },
];
