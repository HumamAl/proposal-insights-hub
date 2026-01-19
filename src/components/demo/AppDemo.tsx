import { useState } from 'react';
import { EventSelector } from './EventSelector';
import { ScannerInterface } from './ScannerInterface';
import { StatsScreen } from './StatsScreen';
import { type ScanMode } from '@/data/mockData';

type DemoStep = 'selectEvent' | 'scanner' | 'stats';

export function AppDemo() {
  // Start directly at mode selection - no login needed for demo
  const [step, setStep] = useState<DemoStep>('selectEvent');
  const [selectedMode, setSelectedMode] = useState<ScanMode | null>(null);

  const handleModeSelect = (mode: ScanMode) => {
    setSelectedMode(mode);
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
      <div className="overflow-hidden rounded-[2.5rem] border-[6px] border-slate-800 bg-slate-800 shadow-2xl">
        {/* Status bar mockup */}
        <div className="flex items-center justify-between bg-slate-900 px-6 py-2">
          <span className="text-xs font-medium text-white">9:41</span>
          <div className="absolute left-1/2 -translate-x-1/2">
            <div className="h-6 w-20 rounded-full bg-slate-800" />
          </div>
          <div className="flex items-center gap-1">
            <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3C7.46 3 3.34 4.78.29 7.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1c1.45-.48 3-.73 4.6-.73s3.15.25 4.6.73v3.1c0 .4.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71C20.66 4.78 16.54 3 12 3z"/>
              <path d="M12 11c-1.94 0-3.81.59-5.33 1.7-.36.26-.58.69-.58 1.13v3.07c0 .81.91 1.29 1.58.84C9.07 16.58 10.5 16 12 16s2.93.58 4.33 1.74c.67.45 1.58-.03 1.58-.84v-3.07c0-.44-.22-.87-.58-1.13C15.81 11.59 13.94 11 12 11z"/>
            </svg>
            <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
            </svg>
          </div>
        </div>

        {/* App content */}
        <div className="min-h-[600px] bg-background">
          {step === 'selectEvent' && (
            <EventSelector
              selectedEvent={selectedMode}
              onSelectEvent={handleModeSelect}
              onContinue={handleContinueToScanner}
            />
          )}

          {step === 'scanner' && selectedMode && (
            <ScannerInterface
              event={selectedMode}
              onViewStats={handleViewStats}
            />
          )}

          {step === 'stats' && selectedMode && (
            <StatsScreen event={selectedMode} onBack={handleBackToScanner} />
          )}
        </div>

        {/* Home indicator */}
        <div className="flex justify-center bg-slate-900 py-2">
          <div className="h-1 w-32 rounded-full bg-white/30" />
        </div>
      </div>

      {/* Demo controls */}
      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => setStep('selectEvent')}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            step === 'selectEvent' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
          }`}
        >
          Modes
        </button>
        <button
          onClick={() => selectedMode && setStep('scanner')}
          disabled={!selectedMode}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${
            step === 'scanner' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
          }`}
        >
          Scanner
        </button>
        <button
          onClick={() => selectedMode && setStep('stats')}
          disabled={!selectedMode}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${
            step === 'stats' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
          }`}
        >
          Stats
        </button>
      </div>

      {/* Help text */}
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Click through the demo or use the buttons above to navigate
      </p>
    </div>
  );
}
