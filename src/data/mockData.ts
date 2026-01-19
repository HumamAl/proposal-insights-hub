// Mock data for the ticket check-in demo

export interface Event {
  id: string;
  name: string;
  date: string;
  venue: string;
  ticketsSold: number;
  ticketsCheckedIn: number;
  revenue: number;
}

export interface Ticket {
  id: string;
  barcode: string;
  attendeeName: string;
  ticketType: string;
  status: 'valid' | 'used' | 'invalid';
  eventId: string;
}

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Summer Music Festival 2024',
    date: '2024-07-15',
    venue: 'Central Park Amphitheater',
    ticketsSold: 2500,
    ticketsCheckedIn: 1847,
    revenue: 125000,
  },
  {
    id: '2',
    name: 'Tech Conference NYC',
    date: '2024-08-20',
    venue: 'Convention Center',
    ticketsSold: 800,
    ticketsCheckedIn: 623,
    revenue: 48000,
  },
  {
    id: '3',
    name: 'Comedy Night Live',
    date: '2024-09-05',
    venue: 'Downtown Theater',
    ticketsSold: 350,
    ticketsCheckedIn: 289,
    revenue: 17500,
  },
];

export const mockTickets: Ticket[] = [
  {
    id: 't1',
    barcode: 'TKT-2024-001-ABCD',
    attendeeName: 'John Smith',
    ticketType: 'VIP Pass',
    status: 'valid',
    eventId: '1',
  },
  {
    id: 't2',
    barcode: 'TKT-2024-002-EFGH',
    attendeeName: 'Sarah Johnson',
    ticketType: 'General Admission',
    status: 'valid',
    eventId: '1',
  },
  {
    id: 't3',
    barcode: 'TKT-2024-003-IJKL',
    attendeeName: 'Mike Brown',
    ticketType: 'VIP Pass',
    status: 'used',
    eventId: '1',
  },
  {
    id: 't4',
    barcode: 'TKT-2024-004-MNOP',
    attendeeName: 'Emily Davis',
    ticketType: 'General Admission',
    status: 'invalid',
    eventId: '1',
  },
];

export interface Challenge {
  id: string;
  title: string;
  problem: string;
  whyTeamsFail: string;
  solution: string;
  techUsed: string[];
}

export const challenges: Challenge[] = [
  {
    id: '1',
    title: 'iOS & Android Parity',
    problem: 'Maintaining consistent features and UX across both mobile platforms while respecting platform conventions.',
    whyTeamsFail: 'Teams often develop platforms separately, leading to feature drift, inconsistent behavior, and doubled maintenance costs.',
    solution: 'Unified cross-platform approach with shared business logic layer. Platform-specific UI where needed, but core functionality stays synchronized.',
    techUsed: ['Flutter', 'BLoC Pattern', 'Shared Codebase'],
  },
  {
    id: '2',
    title: 'QR + Commercial Reader Support',
    problem: 'Supporting both built-in camera scanning and external commercial barcode readers for high-volume events.',
    whyTeamsFail: 'Poor hardware abstraction leads to fragile integrations. Camera APIs differ significantly between iOS and Android.',
    solution: 'Native camera APIs with unified scanning interface. HID device support for commercial readers with automatic detection and fallback.',
    techUsed: ['AVFoundation', 'ZXing', 'HID Integration', 'Camera APIs'],
  },
  {
    id: '3',
    title: 'Offline Resilience',
    problem: 'Events often have poor connectivity. App must continue functioning without internet access.',
    whyTeamsFail: 'Apps break or hang when network drops. No local caching strategy leads to data loss and frustrated staff.',
    solution: 'Local-first architecture with SQLite caching. Queue-based sync when connectivity returns. Visual indicators for sync status.',
    techUsed: ['SQLite', 'Background Sync', 'Queue Management'],
  },
  {
    id: '4',
    title: 'Auto Check-in Speed',
    problem: 'High-volume events need sub-2-second scan-to-confirm times to prevent long entry queues.',
    whyTeamsFail: 'Sequential API calls, unnecessary UI animations, and poor optimization create noticeable lag.',
    solution: 'Optimized scan-to-confirm flow with parallel API calls. Preload attendee data for selected event. Instant visual feedback.',
    techUsed: ['Parallel API Calls', 'Data Preloading', 'Optimized UI'],
  },
  {
    id: '5',
    title: 'Legacy Code Modernization',
    problem: 'Updating existing codebase without breaking current functionality or causing regressions.',
    whyTeamsFail: 'Big-bang rewrites fail. Missing tests mean changes break existing features. No rollback strategy.',
    solution: 'Incremental migration with comprehensive test coverage. Side-by-side comparison testing. Feature flags for gradual rollout.',
    techUsed: ['Unit Testing', 'Feature Flags', 'Incremental Migration'],
  },
];

export interface Experience {
  id: string;
  name: string;
  type: string;
  description: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    id: '1',
    name: 'Marlo AI',
    type: 'iOS App',
    description: 'AI-powered mobile application with sophisticated user interactions and real-time processing.',
    highlights: ['Native iOS Development', 'AI Integration', 'Real-time Processing'],
  },
  {
    id: '2',
    name: 'QuantBook',
    type: 'Web Application',
    description: 'Full-stack web application with complex data visualization and user management.',
    highlights: ['Full-Stack Development', 'Data Visualization', 'User Authentication'],
  },
  {
    id: '3',
    name: 'MapCanvas.store',
    type: 'E-commerce Platform',
    description: 'Custom e-commerce solution with product customization and payment integration.',
    highlights: ['E-commerce', 'Payment Integration', 'Custom Product Builder'],
  },
  {
    id: '4',
    name: 'Cleaning Business Tools',
    type: 'Business Automation',
    description: 'Suite of tools for automating cleaning business operations and scheduling.',
    highlights: ['Business Automation', 'Scheduling System', 'Client Management'],
  },
];

export const contactInfo = {
  name: 'Humam Al Rubaye',
  email: 'humameu4@gmail.com',
  phone: '518-965-9700',
  linkedin: 'https://linkedin.com/in/humam-alrubaye',
  github: 'https://github.com/HumamAl',
};

export const timeline = [
  {
    phase: 'Phase 1',
    title: 'Discovery & Audit',
    duration: 'Week 1-2',
    description: 'Audit existing codebase, define modernization scope, establish testing baseline.',
  },
  {
    phase: 'Phase 2',
    title: 'Core Development',
    duration: 'Week 3-6',
    description: 'Implement QR scanning, update APIs, build unified scanning interface.',
  },
  {
    phase: 'Phase 3',
    title: 'Hardware Integration',
    duration: 'Week 7-8',
    description: 'Commercial reader support, HID device integration, testing with real hardware.',
  },
  {
    phase: 'Phase 4',
    title: 'Testing & Delivery',
    duration: 'Week 9-10',
    description: 'End-to-end testing, bug fixes, documentation, and final delivery.',
  },
];
