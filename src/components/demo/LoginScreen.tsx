import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Loader2, QrCode, Barcode, Smartphone } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = () => {
    setIsLoading(true);
    // Simulate app initialization
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="flex min-h-[500px] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-lg">
            <div className="relative">
              <QrCode className="h-10 w-10 text-primary-foreground" />
              <Barcode className="absolute -bottom-1 -right-1 h-5 w-5 text-primary-foreground/80" />
            </div>
          </div>
          <CardTitle className="text-2xl">Barcode Reader</CardTitle>
          <CardDescription>Modernized scanning experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Feature highlights */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-muted/50 p-3">
              <QrCode className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-xs text-muted-foreground">QR Codes</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <Barcode className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-xs text-muted-foreground">Barcodes</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <Smartphone className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-xs text-muted-foreground">External</p>
            </div>
          </div>

          {/* Network Status */}
          <div className="flex items-center justify-center gap-2 rounded-lg bg-muted p-2">
            {isOnline ? (
              <>
                <Wifi className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4 text-amber-600" />
                <span className="text-sm text-amber-600">Offline Mode</span>
              </>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 h-6 text-xs"
              onClick={() => setIsOnline(!isOnline)}
            >
              Toggle
            </Button>
          </div>

          {!isOnline && (
            <p className="text-center text-xs text-muted-foreground">
              App works offline. Data syncs when connection returns.
            </p>
          )}

          <Button
            className="w-full"
            size="lg"
            onClick={handleStart}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Starting...
              </>
            ) : (
              'Start Scanning'
            )}
          </Button>

          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary" className="text-xs">
              Demo Mode
            </Badge>
            <span className="text-xs text-muted-foreground">
              Interactive preview
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
