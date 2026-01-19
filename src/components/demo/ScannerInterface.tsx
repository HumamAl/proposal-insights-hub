import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Scan, Volume2, VolumeX, RotateCcw, CheckCircle2, XCircle, AlertCircle, Package, MapPin } from 'lucide-react';
import { mockScannedItems, type ScannedItem, type ScanMode } from '@/data/mockData';

interface ScannerInterfaceProps {
  event: ScanMode;
  onViewStats: () => void;
}

type ScanResult = {
  item: ScannedItem;
  success: boolean;
  message: string;
} | null;

export function ScannerInterface({ event, onViewStats }: ScannerInterfaceProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [scanResult, setScanResult] = useState<ScanResult>(null);
  const [scanCount, setScanCount] = useState(0);

  const simulateScan = () => {
    setIsScanning(true);
    setScanResult(null);

    // Simulate fast scanning delay (sub-second as promised!)
    setTimeout(() => {
      // Pick a random item from mock data
      const itemIndex = Math.floor(Math.random() * mockScannedItems.length);
      const item = mockScannedItems[itemIndex];

      let result: ScanResult;

      if (item.status === 'success') {
        result = {
          item,
          success: true,
          message: 'Item Found',
        };
        setScanCount((prev) => prev + 1);
      } else if (item.status === 'duplicate') {
        result = {
          item,
          success: false,
          message: 'Already Scanned',
        };
      } else {
        result = {
          item,
          success: false,
          message: 'Not in Database',
        };
      }

      setScanResult(result);
      setIsScanning(false);
    }, 400); // Fast scan time!
  };

  const resetScanner = () => {
    setScanResult(null);
    setIsScanning(false);
  };

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{event.name}</h2>
          <p className="text-sm text-muted-foreground">Tap viewfinder to scan</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={onViewStats}>
            Stats
          </Button>
        </div>
      </div>

      {/* Scanner Viewfinder */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div
            className="relative flex aspect-square cursor-pointer items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800"
            onClick={!isScanning ? simulateScan : undefined}
          >
            {/* Scan line animation */}
            {isScanning && (
              <div className="absolute inset-x-8 top-8 h-0.5 animate-pulse bg-primary shadow-lg shadow-primary/50"
                   style={{ animation: 'scanLine 0.8s ease-in-out infinite' }} />
            )}

            {/* Camera viewfinder overlay */}
            <div className="absolute inset-8 rounded-lg border-2 border-dashed border-primary/40" />

            {/* Corner markers */}
            <div className="absolute left-6 top-6 h-8 w-8 border-l-4 border-t-4 border-primary" />
            <div className="absolute right-6 top-6 h-8 w-8 border-r-4 border-t-4 border-primary" />
            <div className="absolute bottom-6 left-6 h-8 w-8 border-b-4 border-l-4 border-primary" />
            <div className="absolute bottom-6 right-6 h-8 w-8 border-b-4 border-r-4 border-primary" />

            {/* Center content */}
            {!scanResult && !isScanning && (
              <div className="z-10 text-center">
                <Camera className="mx-auto h-16 w-16 text-primary/60" />
                <p className="mt-4 text-lg font-medium text-white">Tap to Scan</p>
                <p className="text-sm text-slate-400">
                  Position barcode or QR code in frame
                </p>
              </div>
            )}

            {/* Scanning animation */}
            {isScanning && (
              <div className="z-10 text-center">
                <div className="relative">
                  <Scan className="mx-auto h-16 w-16 animate-pulse text-primary" />
                  <div className="absolute inset-0 animate-ping">
                    <Scan className="mx-auto h-16 w-16 text-primary/30" />
                  </div>
                </div>
                <p className="mt-4 text-lg font-medium text-white">Scanning...</p>
              </div>
            )}

            {/* Scan result overlay */}
            {scanResult && (
              <div
                className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-6 ${
                  scanResult.success
                    ? 'bg-green-500/95'
                    : scanResult.item.status === 'duplicate'
                    ? 'bg-amber-500/95'
                    : 'bg-red-500/95'
                }`}
              >
                {scanResult.success ? (
                  <CheckCircle2 className="h-16 w-16 text-white" />
                ) : scanResult.item.status === 'duplicate' ? (
                  <AlertCircle className="h-16 w-16 text-white" />
                ) : (
                  <XCircle className="h-16 w-16 text-white" />
                )}

                <p className="mt-3 text-xl font-bold text-white">
                  {scanResult.message}
                </p>

                <div className="mt-4 w-full max-w-xs rounded-lg bg-white/20 p-4 text-white backdrop-blur-sm">
                  <p className="font-semibold">{scanResult.item.productName}</p>
                  <p className="text-sm opacity-90">{scanResult.item.category}</p>
                  <div className="mt-2 flex items-center gap-4 text-sm">
                    {scanResult.item.quantity && (
                      <div className="flex items-center gap-1 opacity-80">
                        <Package className="h-3 w-3" />
                        <span>Qty: {scanResult.item.quantity}</span>
                      </div>
                    )}
                    {scanResult.item.location && (
                      <div className="flex items-center gap-1 opacity-80">
                        <MapPin className="h-3 w-3" />
                        <span>{scanResult.item.location}</span>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 font-mono text-xs opacity-75">
                    {scanResult.item.barcode}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={resetScanner}
          disabled={isScanning}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button onClick={simulateScan} disabled={isScanning}>
          <Scan className="mr-2 h-4 w-4" />
          Scan Again
        </Button>
      </div>

      {/* Session stats */}
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div>
            <p className="text-sm text-muted-foreground">This Session</p>
            <p className="text-2xl font-bold">{scanCount}</p>
          </div>
          <Badge variant="secondary" className="text-lg">
            {event.scannedToday + scanCount} / {event.totalItems}
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
}
