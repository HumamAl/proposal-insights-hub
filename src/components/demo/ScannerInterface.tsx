import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Scan, Volume2, VolumeX, RotateCcw, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { mockTickets, type Ticket, type Event } from '@/data/mockData';

interface ScannerInterfaceProps {
  event: Event;
  onViewStats: () => void;
}

type ScanResult = {
  ticket: Ticket;
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

    // Simulate scanning delay
    setTimeout(() => {
      // Pick a random ticket from mock data
      const ticketIndex = Math.floor(Math.random() * mockTickets.length);
      const ticket = mockTickets[ticketIndex];

      let result: ScanResult;

      if (ticket.status === 'valid') {
        result = {
          ticket,
          success: true,
          message: 'Check-in successful!',
        };
        setScanCount((prev) => prev + 1);
      } else if (ticket.status === 'used') {
        result = {
          ticket,
          success: false,
          message: 'Already checked in',
        };
      } else {
        result = {
          ticket,
          success: false,
          message: 'Invalid ticket',
        };
      }

      setScanResult(result);
      setIsScanning(false);
    }, 800);
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
          <p className="text-sm text-muted-foreground">Tap to scan tickets</p>
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
            className="relative flex aspect-square cursor-pointer items-center justify-center bg-gradient-to-br from-muted to-muted/50"
            onClick={!isScanning ? simulateScan : undefined}
          >
            {/* Camera viewfinder overlay */}
            <div className="absolute inset-8 rounded-lg border-2 border-dashed border-primary/50" />
            
            {/* Corner markers */}
            <div className="absolute left-6 top-6 h-8 w-8 border-l-4 border-t-4 border-primary" />
            <div className="absolute right-6 top-6 h-8 w-8 border-r-4 border-t-4 border-primary" />
            <div className="absolute bottom-6 left-6 h-8 w-8 border-b-4 border-l-4 border-primary" />
            <div className="absolute bottom-6 right-6 h-8 w-8 border-b-4 border-r-4 border-primary" />

            {/* Center content */}
            {!scanResult && !isScanning && (
              <div className="z-10 text-center">
                <Camera className="mx-auto h-16 w-16 text-primary/50" />
                <p className="mt-4 text-lg font-medium">Tap to Scan</p>
                <p className="text-sm text-muted-foreground">
                  Position QR code or barcode in frame
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
                <p className="mt-4 text-lg font-medium">Scanning...</p>
              </div>
            )}

            {/* Scan result overlay */}
            {scanResult && (
              <div
                className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-6 ${
                  scanResult.success
                    ? 'bg-green-500/90'
                    : scanResult.ticket.status === 'used'
                    ? 'bg-yellow-500/90'
                    : 'bg-destructive/90'
                }`}
              >
                {scanResult.success ? (
                  <CheckCircle2 className="h-20 w-20 text-white" />
                ) : scanResult.ticket.status === 'used' ? (
                  <AlertCircle className="h-20 w-20 text-white" />
                ) : (
                  <XCircle className="h-20 w-20 text-white" />
                )}
                
                <p className="mt-4 text-2xl font-bold text-white">
                  {scanResult.message}
                </p>
                
                <div className="mt-4 rounded-lg bg-white/20 p-4 text-center text-white">
                  <p className="font-semibold">{scanResult.ticket.attendeeName}</p>
                  <p className="text-sm opacity-90">{scanResult.ticket.ticketType}</p>
                  <p className="mt-1 font-mono text-xs opacity-75">
                    {scanResult.ticket.barcode}
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
            {event.ticketsCheckedIn + scanCount} / {event.ticketsSold}
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
}
