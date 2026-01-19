import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Package, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';
import { type ScanMode, mockScannedItems } from '@/data/mockData';

interface StatsScreenProps {
  event: ScanMode;
  onBack: () => void;
}

export function StatsScreen({ event, onBack }: StatsScreenProps) {
  const progressPercentage = Math.round(
    (event.scannedToday / event.totalItems) * 100
  );

  const stats = [
    {
      label: 'Total Items',
      value: event.totalItems.toLocaleString(),
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Scanned Today',
      value: event.scannedToday.toLocaleString(),
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Remaining',
      value: (event.totalItems - event.scannedToday).toLocaleString(),
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
    {
      label: 'Scan Rate',
      value: `${Math.round(event.scannedToday / 8)}/hr`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  // Recent scans from mock data
  const recentScans = mockScannedItems.slice(0, 4).map((item, i) => ({
    name: item.productName,
    barcode: item.barcode,
    time: `${(i + 1) * 2} min ago`,
    status: item.status,
  }));

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-lg font-bold">Session Stats</h2>
          <p className="text-sm text-muted-foreground">{event.name}</p>
        </div>
      </div>

      {/* Main Progress Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Progress</CardTitle>
          <CardDescription>Real-time scanning progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-end justify-between">
              <span className="text-4xl font-bold">{progressPercentage}%</span>
              <span className="text-sm text-muted-foreground">
                {event.scannedToday} of {event.totalItems}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
                <div className={`rounded-lg p-1.5 ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Scans */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Recent Scans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentScans.map((scan, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{scan.name}</p>
                  <p className="font-mono text-xs text-muted-foreground">{scan.barcode}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${
                    scan.status === 'success' ? 'bg-green-500' :
                    scan.status === 'duplicate' ? 'bg-amber-500' : 'bg-red-500'
                  }`} />
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{scan.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button className="w-full" onClick={onBack}>
        Back to Scanner
      </Button>
    </div>
  );
}
