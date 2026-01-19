import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Users, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { type Event } from '@/data/mockData';

interface StatsScreenProps {
  event: Event;
  onBack: () => void;
}

export function StatsScreen({ event, onBack }: StatsScreenProps) {
  const checkInPercentage = Math.round(
    (event.ticketsCheckedIn / event.ticketsSold) * 100
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    {
      label: 'Tickets Sold',
      value: event.ticketsSold.toLocaleString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Checked In',
      value: event.ticketsCheckedIn.toLocaleString(),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Revenue',
      value: formatCurrency(event.revenue),
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      label: 'Remaining',
      value: (event.ticketsSold - event.ticketsCheckedIn).toLocaleString(),
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-xl font-bold">Event Stats</h2>
          <p className="text-sm text-muted-foreground">{event.name}</p>
        </div>
      </div>

      {/* Main Progress Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Check-in Progress</CardTitle>
          <CardDescription>Real-time attendance tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-end justify-between">
              <span className="text-5xl font-bold">{checkInPercentage}%</span>
              <span className="text-muted-foreground">
                {event.ticketsCheckedIn} of {event.ticketsSold}
              </span>
            </div>
            <Progress value={checkInPercentage} className="h-4" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Check-ins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'John Smith', type: 'VIP Pass', time: '2 min ago' },
              { name: 'Sarah Johnson', type: 'General', time: '5 min ago' },
              { name: 'Mike Brown', type: 'VIP Pass', time: '8 min ago' },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">{activity.name}</p>
                  <p className="text-sm text-muted-foreground">{activity.type}</p>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
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
