import { useState } from 'react';
import { LoginScreen } from './LoginScreen';
import { EventSelector } from './EventSelector';
import { ScannerInterface } from './ScannerInterface';
import { StatsScreen } from './StatsScreen';
import { type Event } from '@/data/mockData';

type DemoStep = 'login' | 'selectEvent' | 'scanner' | 'stats';

export function AppDemo() {
  const [step, setStep] = useState<DemoStep>('login');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleLogin = () => {
    setStep('selectEvent');
  };

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleContinueToScanner = () => {
    setStep('scanner');
  };

  const handleViewStats = () => {
    setStep('stats');
  };

  const handleBackToScanner = () => {
    setStep('scanner');
  };

  return (
    <div className="mx-auto max-w-md">
      {/* Phone frame */}
      <div className="overflow-hidden rounded-3xl border-4 border-primary/20 bg-background shadow-2xl">
        {/* Status bar mockup */}
        <div className="flex items-center justify-between bg-muted px-4 py-2">
          <span className="text-xs font-medium">9:41</span>
          <div className="flex items-center gap-1">
            <div className="h-2 w-4 rounded-sm bg-foreground/60" />
            <div className="h-3 w-3 rounded-full bg-foreground/60" />
          </div>
        </div>

        {/* App content */}
        <div className="min-h-[600px] bg-background">
          {step === 'login' && <LoginScreen onLogin={handleLogin} />}
          
          {step === 'selectEvent' && (
            <EventSelector
              selectedEvent={selectedEvent}
              onSelectEvent={handleEventSelect}
              onContinue={handleContinueToScanner}
            />
          )}
          
          {step === 'scanner' && selectedEvent && (
            <ScannerInterface
              event={selectedEvent}
              onViewStats={handleViewStats}
            />
          )}
          
          {step === 'stats' && selectedEvent && (
            <StatsScreen event={selectedEvent} onBack={handleBackToScanner} />
          )}
        </div>

        {/* Home indicator */}
        <div className="flex justify-center bg-muted py-2">
          <div className="h-1 w-32 rounded-full bg-foreground/30" />
        </div>
      </div>

      {/* Demo controls */}
      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => setStep('login')}
          className={`rounded-full px-3 py-1 text-xs transition-colors ${
            step === 'login' ? 'bg-primary text-primary-foreground' : 'bg-muted'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setStep('selectEvent')}
          className={`rounded-full px-3 py-1 text-xs transition-colors ${
            step === 'selectEvent' ? 'bg-primary text-primary-foreground' : 'bg-muted'
          }`}
        >
          Events
        </button>
        <button
          onClick={() => selectedEvent && setStep('scanner')}
          disabled={!selectedEvent}
          className={`rounded-full px-3 py-1 text-xs transition-colors disabled:opacity-50 ${
            step === 'scanner' ? 'bg-primary text-primary-foreground' : 'bg-muted'
          }`}
        >
          Scanner
        </button>
        <button
          onClick={() => selectedEvent && setStep('stats')}
          disabled={!selectedEvent}
          className={`rounded-full px-3 py-1 text-xs transition-colors disabled:opacity-50 ${
            step === 'stats' ? 'bg-primary text-primary-foreground' : 'bg-muted'
          }`}
        >
          Stats
        </button>
      </div>
    </div>
  );
}
