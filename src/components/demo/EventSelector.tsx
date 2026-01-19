import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, ShoppingCart, Warehouse, RefreshCw, CheckCircle2 } from 'lucide-react';
import { scanModes, type ScanMode } from '@/data/mockData';

interface ModesSelectorProps {
  selectedEvent: ScanMode | null;
  onSelectEvent: (mode: ScanMode) => void;
  onContinue: () => void;
}

const iconMap = {
  inventory: Package,
  retail: ShoppingCart,
  warehouse: Warehouse,
};

export function EventSelector({ selectedEvent, onSelectEvent, onContinue }: ModesSelectorProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="space-y-4 p-4">
      <div className="text-center">
        <h2 className="text-xl font-bold">Select Scan Mode</h2>
        <p className="text-sm text-muted-foreground">Choose your scanning context</p>
      </div>

      <div className="space-y-3">
        {scanModes.map((mode) => {
          const Icon = iconMap[mode.icon];
          const isSelected = selectedEvent?.id === mode.id;
          const progress = Math.round((mode.scannedToday / mode.totalItems) * 100);

          return (
            <Card
              key={mode.id}
              className={`cursor-pointer transition-all hover:border-primary/50 ${
                isSelected ? 'border-primary ring-2 ring-primary/20' : ''
              }`}
              onClick={() => onSelectEvent(mode)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`rounded-lg p-2 ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{mode.name}</h3>
                      {isSelected && (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{mode.description}</p>

                    <div className="mt-3 space-y-2">
                      {/* Progress bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Today's Progress</span>
                          <span className="font-medium">{progress}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Stats row */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          {formatNumber(mode.scannedToday)} / {formatNumber(mode.totalItems)} items
                        </span>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <RefreshCw className="h-3 w-3" />
                          <span>{mode.lastSync}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Button
        className="w-full"
        size="lg"
        onClick={onContinue}
        disabled={!selectedEvent}
      >
        {selectedEvent ? `Start ${selectedEvent.name}` : 'Select a mode to continue'}
      </Button>
    </div>
  );
}
