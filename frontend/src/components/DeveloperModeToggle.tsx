import React from 'react';
import { useMetrics } from '@/context/MetricsContext';

export default function DeveloperModeToggle() {
  const { developerMode, toggleDeveloperMode } = useMetrics();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleDeveloperMode}
        className={`px-4 py-2 font-mono text-sm uppercase tracking-widest border transition-all ${
          developerMode 
            ? 'bg-amber-500 text-zinc-950 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]' 
            : 'bg-transparent text-zinc-500 border-zinc-700 hover:text-amber-400 hover:border-amber-400'
        }`}
      >
        [ X-Ray Mode {developerMode ? 'ON' : 'OFF'} ]
      </button>
    </div>
  );
}
