// Mock data for the Barcode Reader App Modernization demo

export interface ScanMode {
  id: string;
  name: string;
  description: string;
  icon: 'inventory' | 'retail' | 'warehouse';
  totalItems: number;
  scannedToday: number;
  lastSync: string;
}

export interface ScannedItem {
  id: string;
  barcode: string;
  productName: string;
  category: string;
  status: 'success' | 'not_found' | 'duplicate';
  quantity?: number;
  location?: string;
}

export const scanModes: ScanMode[] = [
  {
    id: '1',
    name: 'Inventory Count',
    description: 'Full warehouse inventory audit',
    icon: 'warehouse',
    totalItems: 2847,
    scannedToday: 1523,
    lastSync: '2 min ago',
  },
  {
    id: '2',
    name: 'Retail Checkout',
    description: 'Point-of-sale product scanning',
    icon: 'retail',
    totalItems: 156,
    scannedToday: 89,
    lastSync: 'Just now',
  },
  {
    id: '3',
    name: 'Receiving',
    description: 'Incoming shipment verification',
    icon: 'inventory',
    totalItems: 450,
    scannedToday: 234,
    lastSync: '5 min ago',
  },
];

export const mockScannedItems: ScannedItem[] = [
  {
    id: 's1',
    barcode: '012345678905',
    productName: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    status: 'success',
    quantity: 24,
    location: 'Aisle B-12',
  },
  {
    id: 's2',
    barcode: '987654321098',
    productName: 'Organic Green Tea (Box)',
    category: 'Beverages',
    status: 'success',
    quantity: 48,
    location: 'Aisle C-04',
  },
  {
    id: 's3',
    barcode: '456789012345',
    productName: 'USB-C Charging Cable',
    category: 'Electronics',
    status: 'duplicate',
    quantity: 12,
    location: 'Aisle B-08',
  },
  {
    id: 's4',
    barcode: '000000000000',
    productName: 'Unknown Item',
    category: 'N/A',
    status: 'not_found',
  },
  {
    id: 's5',
    barcode: '789012345678',
    productName: 'Premium Notebook Set',
    category: 'Office Supplies',
    status: 'success',
    quantity: 36,
    location: 'Aisle A-15',
  },
];

export interface Challenge {
  id: string;
  title: string;
  problem: string;
  whyTeamsFail: string;
  solution: string;
  techUsed: string[];
  codeSnippet?: {
    language: string;
    code: string;
    description: string;
  };
}

export const challenges: Challenge[] = [
  {
    id: '1',
    title: 'iOS & Android Feature Parity',
    problem: 'Your existing app needs consistent barcode/QR functionality across both platforms while respecting each platform\'s camera and scanning conventions.',
    whyTeamsFail: 'Building separate native apps doubles maintenance. Teams end up with feature drift—iOS gets QR support while Android lags behind, frustrating users.',
    solution: 'Cross-platform architecture with shared scanning logic. Platform-specific camera implementations wrapped in a unified interface. One codebase, consistent behavior.',
    techUsed: ['React Native', 'Swift/AVFoundation', 'Kotlin/CameraX', 'Platform Channels'],
    codeSnippet: {
      language: 'typescript',
      code: `// Unified scanner interface
interface BarcodeScanner {
  startScan(): Promise<void>;
  onBarcodeDetected: (barcode: string, format: BarcodeFormat) => void;
  supportedFormats: BarcodeFormat[];
}

// Platform-specific implementations abstracted away
const scanner = Platform.select({
  ios: () => new AVFoundationScanner(),
  android: () => new MLKitScanner(),
})();`,
      description: 'Platform-agnostic scanner abstraction',
    },
  },
  {
    id: '2',
    title: 'QR Code + Commercial Reader Support',
    problem: 'You need both camera-based QR scanning AND support for external commercial barcode readers (Zebra, Honeywell) for high-volume scenarios.',
    whyTeamsFail: 'Camera APIs differ drastically between iOS/Android. External readers use HID protocols that most developers don\'t handle properly, leading to missed scans.',
    solution: 'Native camera APIs for built-in scanning with ML-based detection. HID device layer for commercial readers with automatic detection, buffer management, and fallback logic.',
    techUsed: ['AVFoundation', 'ML Kit', 'HID Protocol', 'ZXing'],
    codeSnippet: {
      language: 'swift',
      code: `// iOS AVFoundation + external reader support
class ScannerManager: NSObject {
    private var captureSession: AVCaptureSession?
    private var hidDeviceMonitor: HIDDeviceMonitor?

    func startScanning() {
        // Prefer external reader if connected
        if let hidDevice = hidDeviceMonitor?.connectedDevice {
            hidDevice.startListening { barcode in
                self.handleBarcode(barcode, source: .external)
            }
        } else {
            setupCameraCapture()
        }
    }
}`,
      description: 'Intelligent scanner source selection',
    },
  },
  {
    id: '3',
    title: 'Offline-First Operation',
    problem: 'Warehouses and retail floors have spotty connectivity. Your app must work seamlessly offline and sync when connection returns.',
    whyTeamsFail: 'Apps that assume connectivity break during outages. Without proper sync queues, scanned data gets lost, causing inventory discrepancies.',
    solution: 'Local SQLite database as source of truth. Background sync queue with conflict resolution. Visual sync indicators so users always know data status.',
    techUsed: ['SQLite', 'WorkManager', 'Sync Queue', 'Conflict Resolution'],
    codeSnippet: {
      language: 'typescript',
      code: `// Offline-first scan handler
async function handleScan(barcode: string) {
  // Always save locally first
  await localDb.insertScan({
    barcode,
    timestamp: Date.now(),
    synced: false,
  });

  // Queue for background sync
  syncQueue.enqueue({
    type: 'SCAN',
    payload: { barcode },
    retryCount: 0,
  });

  // Optimistic UI update
  return localDb.getProduct(barcode);
}`,
      description: 'Local-first with background sync',
    },
  },
  {
    id: '4',
    title: 'Sub-Second Scan Performance',
    problem: 'High-volume scanning requires instant feedback. Every 100ms of lag multiplies across thousands of daily scans, killing productivity.',
    whyTeamsFail: 'Sequential API calls, heavy UI re-renders, and unoptimized camera processing create noticeable lag that compounds in high-volume environments.',
    solution: 'Parallel data lookups with local cache. Minimal UI updates using virtualization. Camera frame processing optimized for barcode detection, not full image quality.',
    techUsed: ['Local Caching', 'React.memo', 'Camera Optimization', 'Parallel Lookups'],
    codeSnippet: {
      language: 'typescript',
      code: `// Optimized scan-to-result flow
const useScanResult = (barcode: string) => {
  return useQuery({
    queryKey: ['product', barcode],
    queryFn: () => productService.lookup(barcode),
    staleTime: 5 * 60 * 1000, // 5 min cache
    placeholderData: () => localCache.get(barcode),
  });
};

// Camera config optimized for barcodes
const cameraConfig = {
  resolution: '720p', // Lower res = faster processing
  focusMode: 'continuous',
  frameRate: 30,
  barcodeFormats: ['EAN_13', 'QR_CODE', 'CODE_128'],
};`,
      description: 'Cached lookups + optimized camera config',
    },
  },
  {
    id: '5',
    title: 'Modernizing Legacy Code',
    problem: 'Your existing barcode reader works but uses outdated patterns. Modernization must not break current functionality or require a full rewrite.',
    whyTeamsFail: 'Big-bang rewrites fail 70% of the time. Teams break working features, miss edge cases the original code handled, and blow past deadlines.',
    solution: 'Strangler fig pattern—wrap legacy code with new interfaces, migrate incrementally. Comprehensive testing before touching anything. Feature flags for gradual rollout.',
    techUsed: ['Strangler Fig', 'Unit Testing', 'Feature Flags', 'CI/CD'],
    codeSnippet: {
      language: 'typescript',
      code: `// Strangler pattern: wrap legacy, migrate gradually
class ModernScannerService {
  private legacyScanner: LegacyScanner;
  private newScanner: NewScanner;

  async scan(): Promise<ScanResult> {
    if (FeatureFlags.isEnabled('new_scanner')) {
      try {
        return await this.newScanner.scan();
      } catch (e) {
        // Fallback to legacy on failure
        analytics.track('new_scanner_fallback');
        return this.legacyScanner.scan();
      }
    }
    return this.legacyScanner.scan();
  }
}`,
      description: 'Safe migration with fallback',
    },
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
    name: 'Warehouse Management System',
    type: 'Mobile App',
    description: 'Cross-platform inventory app with barcode scanning, offline sync, and Zebra scanner integration for a logistics company.',
    highlights: ['React Native', 'Barcode Scanning', 'Offline-First', 'HID Integration'],
  },
  {
    id: '2',
    name: 'Retail POS Modernization',
    type: 'iOS/Android',
    description: 'Modernized legacy point-of-sale scanner app, adding QR support and improving scan speed by 60%.',
    highlights: ['Native iOS/Android', 'QR Code Support', 'Performance Optimization'],
  },
  {
    id: '3',
    name: 'Asset Tracking Platform',
    type: 'Enterprise Mobile',
    description: 'Enterprise asset tracking with multi-format barcode support, commercial reader integration, and real-time sync.',
    highlights: ['Multi-Format Barcodes', 'Commercial Readers', 'Real-Time Sync'],
  },
  {
    id: '4',
    name: 'Marlo AI',
    type: 'iOS App',
    description: 'AI-powered mobile application with camera integration and real-time processing capabilities.',
    highlights: ['Native iOS', 'Camera APIs', 'Real-time Processing'],
  },
];

export const contactInfo = {
  name: 'Humam Al Rubaye',
  email: 'humameu4@gmail.com',
  phone: '518-965-9700',
  linkedin: 'https://linkedin.com/in/humam-alrubaye',
  github: 'https://github.com/HumamAl',
};

// Timeline with specific dates (project start: late January 2026)
export const timeline = [
  {
    phase: 'Phase 1',
    title: 'Discovery & Audit',
    duration: 'Jan 27 - Feb 7',
    weeks: 'Week 1-2',
    description: 'Review existing codebase and app specs. Document current barcode/QR functionality. Set up testing baseline and identify modernization priorities.',
    deliverables: ['Code audit report', 'Test coverage baseline', 'Modernization roadmap'],
  },
  {
    phase: 'Phase 2',
    title: 'Core QR Implementation',
    duration: 'Feb 10 - Mar 7',
    weeks: 'Week 3-6',
    description: 'Implement QR code scanning using native camera APIs. Build unified scanner interface for iOS and Android. Ensure feature parity across platforms.',
    deliverables: ['QR scanning on both platforms', 'Unified scanner interface', 'Unit test coverage'],
  },
  {
    phase: 'Phase 3',
    title: 'Commercial Reader Integration',
    duration: 'Mar 10 - Mar 21',
    weeks: 'Week 7-8',
    description: 'Add support for commercial barcode readers (Zebra, Honeywell). Implement HID device detection and handling. Test with actual hardware.',
    deliverables: ['Commercial reader support', 'Auto-detection logic', 'Hardware test results'],
  },
  {
    phase: 'Phase 4',
    title: 'Testing & Delivery',
    duration: 'Mar 24 - Apr 4',
    weeks: 'Week 9-10',
    description: 'End-to-end testing across devices. Bug fixes and performance optimization. Documentation and knowledge transfer.',
    deliverables: ['Final tested builds', 'Documentation', 'Source code handoff'],
  },
];

// Budget breakdown for $5,000 fixed price
export const budgetBreakdown = {
  total: 5000,
  phases: [
    { name: 'Discovery & Audit', amount: 500, percentage: 10 },
    { name: 'Core Development', amount: 2500, percentage: 50 },
    { name: 'Hardware Integration', amount: 1250, percentage: 25 },
    { name: 'Testing & Delivery', amount: 750, percentage: 15 },
  ],
};
