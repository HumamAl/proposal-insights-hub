import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, DollarSign } from 'lucide-react';
import { mockEvents, type Event } from '@/data/mockData';

interface EventSelectorProps {
  selectedEvent: Event | null;
  onSelectEvent: (event: Event) => void;
  onContinue: () => void;
}

export function EventSelector({ selectedEvent, onSelectEvent, onContinue }: EventSelectorProps) {
  const handleEventChange = (eventId: string) => {
    const event = mockEvents.find((e) => e.id === eventId);
    if (event) {
      onSelectEvent(event);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Select Event</h2>
        <p className="text-muted-foreground">Choose an event to start checking in attendees</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Available Events</CardTitle>
          <CardDescription>Select from your assigned events</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            value={selectedEvent?.id || ''}
            onValueChange={handleEventChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose an event..." />
            </SelectTrigger>
            <SelectContent>
              {mockEvents.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  {event.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedEvent && (
            <div className="mt-4 space-y-4 rounded-lg border bg-muted/30 p-4">
              <h3 className="font-semibold">{selectedEvent.name}</h3>
              
              <div className="grid gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(selectedEvent.date)}</span>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedEvent.venue}</span>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>
                    {selectedEvent.ticketsCheckedIn} / {selectedEvent.ticketsSold} checked in
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>{formatCurrency(selectedEvent.revenue)} revenue</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Check-in Progress</span>
                  <span>
                    {Math.round((selectedEvent.ticketsCheckedIn / selectedEvent.ticketsSold) * 100)}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{
                      width: `${(selectedEvent.ticketsCheckedIn / selectedEvent.ticketsSold) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <Button
            className="w-full"
            onClick={onContinue}
            disabled={!selectedEvent}
          >
            Start Scanning
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
